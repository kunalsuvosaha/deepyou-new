import 'dotenv/config';

export const PORT = process.env.PORT || 5000;
export const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("❌ API_KEY environment variable not set.");
    process.exit(1);
}
