import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Result from './components/Result'
import './index.css'

function App() {
    const [view, setView] = useState('home') // home, quiz, result
    const [analysis, setAnalysis] = useState(null)

    const startQuiz = (questionCount) => {
        setView('quiz')
    }

    const handleAnalysisComplete = (result) => {
        setAnalysis(result)
        setView('result')
    }

    const resetQuiz = () => {
        setAnalysis(null)
        setView('home')
    }

    return (
        <div className="app-container">
            <AnimatePresence mode="wait">
                {view === 'home' && (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Home onStart={startQuiz} />
                    </motion.div>
                )}

                {view === 'quiz' && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Quiz setAnalysis={handleAnalysisComplete} />
                    </motion.div>
                )}

                {view === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Result analysis={analysis} onReset={resetQuiz} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default App
