# DeepYou Server

This is the backend server for the DeepYou project, built with Express.js.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up environment variables:
    - Create a `.env` file in the root `server` directory.
    - Add your Google Gemini API key:
      ```
      API_KEY=your_api_key_here
      ```
3.  Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### `GET /hello`
Returns a simple greeting message to verify the server is running.
- **Response:** `{ "message": "Hello, World!" }`

### `POST /generate`
Generates text content using the Google Gemini AI model.
- **Body:** `{ "prompt": "Your text prompt here" }`
- **Response:** `{ "response": "Generated text from AI..." }`
