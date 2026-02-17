import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Sparkles, Star, Zap } from 'lucide-react';

export default function Result({ analysis, onReset }) {
    // Parse bullet points
    const traits = analysis.split('\n').filter(line => line.trim()).map(line =>
        line.replace(/^[\*\-\•]\s*/, '').replace(/\*\*/g, '')
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
            }
        })
    };

    const getIcon = (index) => {
        const icons = [<Sparkles size={24} />, <Zap size={24} />, <Star size={24} />];
        return icons[index % icons.length];
    };

    const getGradient = (index) => {
        const gradients = [
            'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', // Soft Purple-Blue
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink-Red
            'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'  // Green-Blue
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h2 style={{
                    fontSize: '3.5rem',
                    marginBottom: '0.5rem',
                    background: 'var(--primary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2
                }}>
                    Your Persona Unlocked
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                    Here is what makes you uniquely <b>you</b>.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem'
            }}>
                {traits.map((trait, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -10, rotate: 1 }}
                        className="glass-card"
                        style={{
                            textAlign: 'left',
                            padding: '2rem',
                            borderTop: '4px solid transparent',
                            borderImage: `${getGradient(index)} 1`,
                            background: 'white', // Ensure clean background for cards
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div style={{
                            marginBottom: '1rem',
                            color: '#6366f1',
                            background: 'rgba(99, 102, 241, 0.1)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {getIcon(index)}
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#334155', fontWeight: '500' }}>
                            {trait}
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
            >
                <button
                    className="btn-primary"
                    onClick={onReset}
                    style={{ padding: '15px 30px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <RefreshCw size={20} /> Analyze New Trait
                </button>
            </motion.div>
        </div>
    );
}
