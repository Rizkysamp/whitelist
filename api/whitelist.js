export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { name } = req.body;
    const panelUrl = "https://control.optiklink.com";
    const serverId = "e225d81e";
    const apiKey = "8rWJmHyex7De4WXP"; // Pastikan ini benar

    // Kita coba gunakan path tanpa garis miring di depan
    const filePath = `scriptfiles/whitelist/${name}.txt`;

    try {
        const response = await fetch(`${panelUrl}/api/client/servers/${serverId}/files/write?file=${encodeURIComponent(filePath)}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json'
            },
            body: "" 
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            // Jika gagal, kita ambil alasan error dari Pterodactyl
            const errorResponse = await response.json();
            let detail = "Gagal menulis file di panel";
            
            if (errorResponse.errors && errorResponse.errors.length > 0) {
                detail = errorResponse.errors[0].detail;
            }
            
            return res.status(500).json({ success: false, error: detail });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
