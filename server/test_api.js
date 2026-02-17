import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error("❌ API_KEY not found in environment variables.");
    process.exit(1);
}

console.log(`🔑 Testing API Key: ${apiKey.slice(0, 5)}...${apiKey.slice(-5)}`);

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
    console.log(`\n🤖 Testing model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        const text = response.text();
        console.log(`✅ Success! Response: ${text.slice(0, 50)}...`);
        return true;
    } catch (error) {
        console.error(`❌ Failed with ${modelName}:`, error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Status Text:", error.response.statusText);
        }
        return false;
    }
}

async function runTests() {
    // Try common available models
    const models = ["gemini-2.0-flash", "gemini-flash-latest"];

    let success = false;
    for (const model of models) {
        if (await testModel(model)) {
            success = true;
            break; // Stop after first success
        }
    }

    if (!success) {
        console.error("\n🚫 All model tests failed. Please check your API Key.");
    }
}

runTests();
