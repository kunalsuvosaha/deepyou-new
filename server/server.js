import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const app = express();
app.use(express.json());
const PORT = 5000;
// CORS configuration: Allow requests from all origins for testing
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("❌ API_KEY environment variable not set.");
  process.exit(1);
}

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
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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