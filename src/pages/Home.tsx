import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountdownClock from '../components/CountdownClock/CountdownClock';
import literixLogo from '../assets/LITERIX copy.png';

type SignalItem = {
    title: string;
    content: string;
    date: string;
    side: 'left' | 'right';
};

const homeSignals: SignalItem[] = [
    { title: 'Signal Received', content: 'Registration Starts', date: '21st March 2026 - 12:00 AM', side: 'left' },
    { title: 'Portal Closes', content: 'Registration Ends', date: '25th March 2026 - 11:59 PM', side: 'right' },
    { title: 'Chosen Ones Revealed', content: 'Shortlisted Teams Announcement', date: '26th March 2026 - 6:00 PM', side: 'left' },
    { title: 'Checkpoint Locked', content: 'Payment Confirmation Slot Booking', date: '27th March 2026 - 8.00 PM', side: 'right' },
    { title: 'The Event Begins', content: '', date: '30th March - 9:00 AM', side: 'right' }
];

const Home = () => {
    return (
        <div className="home-page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            overflowX: 'hidden'
        }}>
            {/* Main Hero Section - Vertically Centered */}
            <div className="home-hero" style={{
                minHeight: '85vh', // Centering content within the fold
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                textAlign: 'center',
                perspective: '1000px',
                width: '100%',
                marginTop: '-2rem' // Pulling hero content slightly higher towards navbar
            }}>
                {/* Logo Section - 3D Floating Layer */}
                <motion.div 
                    initial={{ scale: 0.7, opacity: 0, z: -100 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1, 
                        z: 0,
                        rotateX: [0, 5, -5, 0],
                        rotateY: [0, -5, 5, 0]
                    }}
                    transition={{
                        scale: { duration: 1.2, ease: "easeOut" },
                        opacity: { duration: 1 },
                        z: { duration: 1.2 },
                        rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                        rotateY: { repeat: Infinity, duration: 8, ease: "easeInOut" }
                    }}
                    className="home-logo-layer"
                    style={{ 
                        width: '100%', 
                        maxWidth: '520px', 
                        marginBottom: '1rem', // Compact gap to tagline
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        zIndex: 10
                    }}
                >
                    <motion.img 
                        src={literixLogo}
                        alt="LITERIX 1.0 Logo" 
                        className="home-logo-image"
                        animate={{ 
                            filter: [
                                'drop-shadow(0 0 10px rgba(251, 29, 54, 0.4))',
                                'drop-shadow(0 0 25px rgba(231, 29, 54, 0.7))',
                                'drop-shadow(0 0 10px rgba(251, 29, 54, 0.4))'
                            ]
                        }}
                        transition={{ filter: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto',
                            transform: 'translateZ(50px)'
                        }} 
                    />
                    
                    {/* 3D Shimmer Sweep Effect */}
                    <motion.div 
                                            className="home-logo-shimmer"
                        animate={{ left: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: '30%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                            transform: 'skewX(-20deg)',
                            pointerEvents: 'none',
                            zIndex: 11
                        }}
                    />
                </motion.div>

                {/* Tagline - Staggered Reveal */}
                <motion.div 
                    className="home-tagline-wrap"
                    style={{ 
                        marginBottom: '2rem', // Reduced gap to countdown
                        transform: 'translateZ(20px)',
                        zIndex: 9
                    }}
                >
                    {"LITERARY BRILLIANCE, INFINITE SPARK.".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.8 + index * 0.03, duration: 0.4 }}
                            className="home-tagline-char"
                            style={{
                                fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                                fontFamily: 'var(--font-heading)',
                                letterSpacing: 'clamp(2px, 0.8vw, 4.5px)',
                                fontWeight: 600,
                                color: '#fff',
                                display: 'inline-block',
                                whiteSpace: char === " " ? "pre" : "normal",
                                textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Countdown Section - Back Layer */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="home-countdown-wrap"
                    style={{ 
                        marginBottom: '1rem',
                        transform: 'translateZ(0px)',
                        opacity: 0.85,
                        zIndex: 8,
                        width: '100%'
                    }}
                >
                    <CountdownClock />
                </motion.div>
            </div>

            {/* Content Sections */}
            <div className="home-content" style={{ 
                padding: '0 1rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: '100%'
            }}>
                <section className="home-signals-section" style={{ width: '100%', maxWidth: '1000px', marginTop: '4rem', paddingBottom: '4rem', position: 'relative' }}>
                    <div className="title-neon-frame">
                        <p className="title-neon-eyebrow">Hawkins Public Archive // Transmission Locked: 1986</p>
                        <h2 className="stranger-title title-neon-heading" style={{ 
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            marginBottom: '0.3rem',
                            width: '100%',
                            filter: 'drop-shadow(0 0 15px var(--color-primary))' 
                        }}>
                            UPSIDE DOWN SIGNALS
                        </h2>
                        <p className="title-neon-subtext">Classified signals recovered from the upside down channel.</p>
                    </div>
                    
                    {/* Vertical Signal Line */}
                    <div className="home-signal-line" style={{
                        position: 'absolute',
                        left: '50%',
                        top: '12rem',
                        bottom: '6rem',
                        width: '2px',
                        background: 'linear-gradient(180deg, transparent, var(--color-primary), var(--color-primary), transparent)',
                        boxShadow: '0 0 15px var(--color-primary)',
                        transform: 'translateX(-50%)',
                        zIndex: 0
                    }} />

                    <div className="home-signals-list" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative', zIndex: 1 }}>
                        {homeSignals.map((signal, idx) => (
                            <div key={idx} className={`home-signal-row home-signal-row-${signal.side}`} style={{ 
                                display: 'flex', 
                                justifyContent: signal.side === 'left' ? 'flex-start' : 'flex-end', 
                                width: '100%',
                                padding: '0 20px',
                                boxSizing: 'border-box'
                            }}>
                                <motion.div
                                    className="home-signal-card"
                                    initial={{ opacity: 0, x: signal.side === 'left' ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        width: '100%',
                                        maxWidth: '400px',
                                        background: 'rgba(5, 5, 5, 0.95)',
                                        border: '1px solid var(--color-primary)',
                                        borderRadius: '4px',
                                        padding: '1.5rem',
                                        position: 'relative',
                                        boxShadow: '0 0 20px rgba(231, 29, 54, 0.1), inset 0 0 10px rgba(231, 29, 54, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'default'
                                    }}
                                >
                                    {/* Node Dot on the central line */}
                                    <div className="home-signal-node" style={{
                                        position: 'absolute',
                                        width: '12px',
                                        height: '12px',
                                        background: 'var(--color-primary)',
                                        borderRadius: '50%',
                                        top: '50%',
                                        [signal.side === 'left' ? 'right' : 'left']: '-56px',
                                        transform: 'translateY(-50%)',
                                        boxShadow: '0 0 15px var(--color-primary)',
                                        zIndex: 2
                                    }} />

                                    <h3 style={{ 
                                        fontFamily: 'var(--font-heading)', 
                                        color: 'var(--color-primary)', 
                                        fontSize: '1.2rem', 
                                        marginBottom: '0.8rem',
                                        letterSpacing: '2px',
                                        textShadow: '0 0 8px var(--color-primary)'
                                    }} className={idx % 2 === 0 ? "flicker-slow" : "flicker-fast"}>
                                        {signal.title.toUpperCase()}
                                    </h3>
                                    
                                    <p className="stranger-text" style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>
                                        {signal.content}
                                    </p>
                                    
                                    <div className="home-signal-date" style={{ 
                                        fontFamily: 'var(--font-digital)', 
                                        color: 'var(--color-neon-blue)', 
                                        fontSize: '1.1rem',
                                        opacity: 0.9
                                    }}>
                                        {signal.date}
                                    </div>

                                    {/* Decorative Corner Accents */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)' }} />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }} />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="home-cta-wrap" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
                    <Link to="/events" className="home-cta-link" style={{
                        display: 'inline-block',
                        background: 'var(--color-primary)',
                        color: 'black',
                        padding: '1rem 3rem',
                        fontFamily: 'var(--font-stranger)',
                        fontSize: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        boxShadow: '0 0 20px var(--color-primary)',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                    }}
                    onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px var(--color-primary)';
                    }}
                    onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px var(--color-primary)';
                    }}
                    >
                        CLICK HERE TO REGISTER EVENTS
                    </Link>
                </div>
            </div>

            <style>{`
                .home-page {
                    width: 100%;
                }

                @media (max-width: 900px) {
                    .home-hero {
                        min-height: auto !important;
                        margin-top: 0 !important;
                        padding-top: 2.2rem !important;
                        padding-bottom: 1.6rem !important;
                    }

                    .home-signals-section {
                        margin-top: 3rem !important;
                    }

                    .home-signals-list {
                        gap: 2.4rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .home-content {
                        padding: 0 0.85rem !important;
                    }

                    .home-logo-layer {
                        max-width: 420px !important;
                    }

                    .home-tagline-wrap {
                        margin-bottom: 1.3rem !important;
                    }

                    .home-signals-section {
                        margin-top: 2.3rem !important;
                        padding-bottom: 2.4rem !important;
                    }

                    .home-signal-line {
                        display: none !important;
                    }

                    .home-signals-list {
                        gap: 1.3rem !important;
                    }

                    .home-signal-row {
                        justify-content: flex-start !important;
                        padding: 0 !important;
                    }

                    .home-signal-card {
                        max-width: 100% !important;
                        width: 100% !important;
                        padding: 1rem !important;
                    }

                    .home-signal-node {
                        left: -7px !important;
                        right: auto !important;
                        top: 1rem !important;
                        transform: none !important;
                        width: 10px !important;
                        height: 10px !important;
                    }

                    .home-cta-wrap {
                        width: 100%;
                        margin-top: 1.4rem !important;
                        margin-bottom: 2.8rem !important;
                    }

                    .home-cta-link {
                        width: 100%;
                        text-align: center;
                        padding: 0.9rem 1rem !important;
                        font-size: 1.05rem !important;
                        letter-spacing: 1.7px !important;
                    }
                }

                @media (max-width: 480px) {
                    .home-hero {
                        padding-top: 1.4rem !important;
                    }

                    .home-logo-layer {
                        max-width: 320px !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .home-tagline-char {
                        font-size: 0.8rem !important;
                        letter-spacing: 1.5px !important;
                    }

                    .home-signal-card h3 {
                        font-size: 1rem !important;
                        letter-spacing: 1px !important;
                    }

                    .home-signal-date {
                        font-size: 0.94rem !important;
                    }

                    .home-cta-link {
                        font-size: 0.9rem !important;
                        letter-spacing: 1px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;