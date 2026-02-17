import { motion } from 'framer-motion';

export default function Home({ onStart }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
        >
            <motion.div variants={item} style={{ marginBottom: '3rem' }}>
                <h1 className="floating">Welcome to DeepYou</h1>
                <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                    Discover the depths of your personality through our AI-powered analysis.
                    Your journey to self-understanding starts here. ✨
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
            }}>
                {/* Quick Mode Card */}
                <motion.div
                    variants={item}
                    className="glass-card"
                    whileHover={{ scale: 1.02 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(168, 85, 247, 0.5)' }}
                >
                    <div style={{ fontSize: '3rem' }}>⚡</div>
                    <h3>Quick Insight</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>10 Questions • ~2 Minutes</p>
                    <p style={{ flex: 1 }}>Perfect for a rapid overview of your core traits.</p>
                    <button
                        className="btn-primary"
                        onClick={() => onStart(10)}
                        style={{ width: '100%', marginTop: 'auto' }}
                    >
                        Start Journey
                    </button>
                </motion.div>

                {/* Basic Mode Card (Disabled) */}
                <motion.div
                    variants={item}
                    className="glass-card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.6 }}
                >
                    <div style={{ fontSize: '3rem' }}>🧘</div>
                    <h3>Deep Dive</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>30 Questions • Coming Soon</p>
                    <p style={{ flex: 1 }}>A balanced look at your personality behavior.</p>
                    <button disabled style={{ width: '100%', marginTop: 'auto' }}>
                        Locked
                    </button>
                </motion.div>

                {/* Deep Mode Card (Disabled) */}
                <motion.div
                    variants={item}
                    className="glass-card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.6 }}
                >
                    <div style={{ fontSize: '3rem' }}>🌌</div>
                    <h3>Complete Analysis</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>50 Questions • Coming Soon</p>
                    <p style={{ flex: 1 }}>Comprehensive scan of your psyche and potential.</p>
                    <button disabled style={{ width: '100%', marginTop: 'auto' }}>
                        Locked
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
