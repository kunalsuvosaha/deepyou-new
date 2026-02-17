import { API_KEY } from './config.js';
import fs from 'fs';

const listModels = async () => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    console.log(`Fetching models...`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            const geminiModels = data.models
                .filter(m => m.name.includes("gemini") && m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name);

            fs.writeFileSync('models.json', JSON.stringify(geminiModels, null, 2));
            console.log("✅ Models written to models.json");
        } else {
            console.error("❌ No models found or error:", data);
        }
    } catch (error) {
        console.error("❌ Error fetching models:", error.message);
    }
};

listModels();
