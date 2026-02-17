import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../config.js';
import { sanitizeText } from '../utils/sanitize.js';

const router = express.Router();
const genAI = new GoogleGenerativeAI(API_KEY);

// Content generation endpoint
router.post('/', async (req, res) => {
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

export default router;
