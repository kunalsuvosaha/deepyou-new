// server.js

import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const app = express();
const PORT = 5000;

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

app.use(cors());
app.use(express.json());

// Helper to sanitize text
const sanitizeText = (text) => {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ') // remove extra spaces/newlines
    .trim();
};

app.post('/generate', async (req, res) => {
  let { prompt: userPrompt } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  userPrompt = sanitizeText(userPrompt);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(userPrompt)
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ]
    });

    const response = result.response;
    const text = response.text();
    res.json({ response: text });

  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
