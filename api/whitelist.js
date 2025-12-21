export default async function handler(req, res) {
    // Hanya izinkan metode POST
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { name } = req.body;
    
    // Konfigurasi Pterodactyl kamu
    const panelUrl = "https://control.optiklink.com";
    const serverId = "e225d81e";
    const apiKey = "8rWJmHyex7De4WXP"; // Masukkan API Key asli kamu

    try {
        const response = await fetch(`${panelUrl}/api/client/servers/${serverId}/files/write?file=/scriptfiles/whitelist/${name}.txt`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json'
            },
            body: "" // Membuat file kosong .txt
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ success: false, error: "Gagal menulis file di panel" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
