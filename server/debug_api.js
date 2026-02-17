import 'dotenv/config';

const apiKey = process.env.API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("Fetching models from:", url.replace(apiKey, "HIDDEN_KEY"));

async function listModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log("✅ API Key works! Available models:");
            if (data.models) {
                data.models.forEach(m => console.log(` - ${m.name} (${m.supportedGenerationMethods.join(', ')})`));
            } else {
                console.log("No models found in response:", data);
            }
        } else {
            console.error("❌ Error response:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("❌ Fetch error:", error);
    }
}

listModels();
