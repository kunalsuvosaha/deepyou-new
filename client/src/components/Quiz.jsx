import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    "I enjoy working in teams",
    "I like to plan ahead",
    "I prefer quiet environments",
    "I make friends easily",
    "I enjoy solving complex problems",
    "I often get emotional in situations",
    "I find it easy to adapt to new environments",
    "I am more creative than analytical",
    "I trust my intuition over data",
    "I feel energized after social events"
];

const options = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree"
];

export default function Quiz({ setAnalysis }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnswer = (answer) => {
        const questionText = questions[currentQuestion];
        const newAnswers = { ...answers, [questionText]: answer };
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            submitQuiz(newAnswers);
        }
    };

    const submitQuiz = async (finalAnswers) => {
        setLoading(true);
        setError(null);

        // Construct prompt
        const prompt = `
      As a psychologist, analyze the following personality test answers: 
      ${JSON.stringify(finalAnswers, null, 2)}
      
      Provide a VERY CONCISE personality analysis in exactly 3 short bullet points.
      Keep the total response under 60 words.
      Focus on the most important traits only.
    `;

        try {
            const response = await fetch('http://localhost:5000/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to fetch analysis');
            }

            const data = await response.json();
            setAnalysis(data.response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <motion.div
                className="glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2>✨ Analyzing your responses...</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                    <div className="loading-spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ opacity: 0.7 }}>Connecting to AI...</p>
                </div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </motion.div>
        );
    }

    return (
        <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', opacity: 0.8 }}>
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)' }}
                    ></motion.div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', lineHeight: '1.3' }}>
                        {questions[currentQuestion]}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {options.map((option, index) => (
                            <motion.button
                                key={option}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleAnswer(option)}
                                style={{
                                    padding: '18px 24px',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>{option}</span>
                                <span style={{ opacity: 0.3 }}>→</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ color: '#ef4444', marginTop: '20px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}
                >
                    ⚠️ Error: {error}
                </motion.div>
            )}
        </div>
    );
}
