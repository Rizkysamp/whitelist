export default async function handler(req, res) {
    // 1. Setting Panel Lu
    const panelUrl = "https://cx.galaxyhost.biz.id";
    const serverId = "c3a6f2ed";
    const apiKey = "ptlc_5J2dxXOlwNxmiQIofjqSCuDNfyctfESju4YyxwhGcoO"; 

    // Header untuk bypass CORS dan memberi tahu kalau ini adalah JSON
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    try {
        // 2. Nembak API Pterodactyl untuk ambil Resource Server
        const response = await fetch(`${panelUrl}/api/client/servers/${serverId}/resources`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/vnd.pterodactyl.v1+json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Panel Error: ${response.status}`);
        }

        const data = await response.json();
        
        // 3. Ambil data player online
        // Pada Pterodactyl, letaknya di attributes -> resources -> current_players
        const onlinePlayers = data.attributes?.resources?.current_players || 0;

        // 4. Kirim hasil ke Website lu
        return res.status(200).json({ 
            success: true, 
            online: onlinePlayers, 
            max: 100 // Ganti 100 dengan total slot server lu
        });

    } catch (error) {
        console.error("Fetch Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            online: 0, 
            max: 100,
            error: error.message 
        });
    }
}
