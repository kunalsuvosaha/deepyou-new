import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const app = express();
app.use(express.json());

// CORS configuration: Allow requests from all origins for testing
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
import { PORT, API_KEY } from './config.js';

const genAI = new GoogleGenerativeAI(API_KEY);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});


// Sanitize incoming text prompt
const sanitizeText = (text) => {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Content generation endpoint
app.post('/generate', async (req, res) => {
  let { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  prompt = sanitizeText(prompt);
  console.log('Prompt received:', prompt);

  try {
    // Using Gemini 1.5 Flash for faster and more cost-effective generation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = result.response.text();
    res.json({ response: text });

  } catch (error) {
    console.error('❌ Error generating content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});