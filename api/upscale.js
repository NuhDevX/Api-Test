export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "Format JSON tidak valid" });
    }
  }

  const { imageUrl, style, noise, x2 } = body;
  
  if (!imageUrl) {
    return res.status(400).json({ error: "URL Gambar wajib diisi" });
  }

  const apiKey = "f171dfa4507049a7a2b51551d7e710cf"; 

  try {
    const response = await fetch("https://bigjpg.com/api/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      },
      body: JSON.stringify({
        style: style || "art",
        noise: noise || "3",
        x2: x2 || "1",
        input: imageUrl
      })
    });

    const data = await response.json();
  
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
  
