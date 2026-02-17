import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../config.js';
import { sanitizeText } from '../utils/sanitize.js';

console.log("✅ aiController.js LOADED");

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateContent = async (req, res) => {
    let { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    prompt = sanitizeText(prompt);

    try {
        // Using gemini-flash-latest
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
}
