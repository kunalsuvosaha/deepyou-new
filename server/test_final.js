const testEndpoint = async () => {
    console.log('🚀 Testing POST /generate endpoint on port 5000...');
    try {
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: 'Hello, are you working?' }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ Success! Server Response:', data);
    } catch (error) {
        console.error('❌ Test Failed:', error.message);
        process.exit(1);
    }
};

testEndpoint();
