document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const answers = {};
  
    for (let [key, value] of formData.entries()) {
      answers[key] = value;
    }
  
    // Prepare custom prompt string
    const prompt = `
    Here are the user’s answers:
    1. I enjoy working in teams — ${answers.q1}
    2. I like to plan ahead — ${answers.q2}
    3. I prefer quiet environments — ${answers.q3}
    4. I make friends easily — ${answers.q4}
    5. I enjoy solving complex problems — ${answers.q5}
  
    Based on these, provide a short personality analysis in 5 lines.
    `;
  
    // Send to backend
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
  
    const data = await response.json();
    document.getElementById('result').textContent = data.response;
    document.getElementById('resultCard').style.display = 'block';

  });
  