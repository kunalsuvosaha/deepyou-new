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

import { PORT } from './config.js';
import generateRouter from './routes/generate.js';

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use('/generate', generateRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});