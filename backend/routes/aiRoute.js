import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await fetch(
      "https://router.huggingface.co/api/models/microsoft/phi-2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          inputs: message,
          options: { wait_for_model: true }, // wait until model spins up
          parameters: { max_new_tokens: 150, temperature: 0.7 },
        }),
      }
    );

    // Parse JSON safely
    const data = await response.json();
    console.log("HF raw response:", data);

    // Router returns an object with 'generated_text'
    const reply = data?.generated_text;

    if (!reply) {
      return res.status(500).json({ error: "AI did not respond" });
    }

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

export default router;
