export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  const { imageUrl, style, noise, x2 } = req.body;
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

