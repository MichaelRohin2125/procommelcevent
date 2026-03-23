import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://procommelcevent-tbj8.onrender.com');

const AdminLogin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Access Denied.');
                setShake(true);
                setTimeout(() => setShake(false), 600);
            }
        } catch (err) {
            setError('Cannot connect to server. Make sure the backend is running.');
            setShake(true);
            setTimeout(() => setShake(false), 600);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            {/* Animated background scanlines */}
            <div style={scanlinesStyle} />

            {/* Floating particles */}
            <div style={particleContainerStyle}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        ...particleStyle,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                    }} />
                ))}
            </div>

            <div 
                style={{
                    ...loginBoxStyle,
                    animation: shake ? 'shakeBox 0.6s ease' : 'portalOpen 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
            >
                {/* Top accent line */}
                <div style={accentLineStyle} />

                {/* Icon */}
                <div style={iconContainerStyle}>
                    <div style={lockIconStyle}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 style={titleStyle}>ADMIN ACCESS</h1>
                <p style={subtitleStyle}>HAWKINS LAB · RESTRICTED AREA</p>
                <div style={dividerStyle}>
                    <span style={dividerDotStyle} />
                    <span style={dividerLineStyle} />
                    <span style={dividerDotStyle} />
                </div>

                {/* Error Message */}
                {error && (
                    <div style={errorStyle}>
                        <span style={{ color: '#ff4444', fontFamily: 'var(--font-digital)', fontSize: '0.75rem' }}>
                            ⚠ {error}
                        </span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>ENTER ACCESS CODE</label>
                        <div style={inputWrapperStyle}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={inputStyle}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(231, 29, 54, 0.2), inset 0 0 20px rgba(231, 29, 54, 0.05)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#333';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={buttonStyle}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.color = '#000';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(231, 29, 54, 0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--color-primary)';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.boxShadow = '0 0 15px var(--color-primary)';
                        }}
                    >
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <span style={spinnerStyle} />
                                VERIFYING...
                            </span>
                        ) : (
                            'AUTHENTICATE'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p style={footerStyle}>
                    UNAUTHORIZED ACCESS WILL BE MONITORED
                </p>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes portalOpen {
                    0% { opacity: 0; transform: scale(0.8) translateY(30px); filter: blur(10px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
                }
                @keyframes shakeBox {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                @keyframes floatUp {
                    0% { transform: translateY(100vh); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-10vh); opacity: 0; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 20px rgba(231, 29, 54, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(231, 29, 54, 0.6); }
                }
                @keyframes accentSlide {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
};

// ─── Styles ─────────────────────────────────────────────────────────

const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
};

const scanlinesStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.3,
};

const particleContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
};

const particleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '2px',
    height: '2px',
    background: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'floatUp 6s linear infinite',
    boxShadow: '0 0 6px var(--color-primary)',
};

const loginBoxStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    background: 'rgba(10, 10, 10, 0.95)',
    border: '1px solid #222',
    padding: '3rem 2.5rem',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
    backdropFilter: 'blur(20px)',
};

const accentLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
    animation: 'accentSlide 1s ease 0.5s both',
};

const iconContainerStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
};

const lockIconStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: '2px solid var(--color-primary)',
    color: 'var(--color-primary)',
    animation: 'pulseGlow 3s infinite',
};

const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    color: '#fff',
    letterSpacing: '4px',
    marginBottom: '0.3rem',
    textShadow: '0 0 10px rgba(231, 29, 54, 0.3)',
};

const subtitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-digital)',
    fontSize: '0.7rem',
    color: '#666',
    letterSpacing: '3px',
    marginBottom: '1.5rem',
};

const dividerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'center',
    marginBottom: '2rem',
};

const dividerDotStyle: React.CSSProperties = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'var(--color-primary)',
};

const dividerLineStyle: React.CSSProperties = {
    width: '60px',
    height: '1px',
    background: '#333',
};

const errorStyle: React.CSSProperties = {
    background: 'rgba(255, 68, 68, 0.1)',
    border: '1px solid rgba(255, 68, 68, 0.3)',
    padding: '0.8rem',
    marginBottom: '1.5rem',
    animation: 'portalOpen 0.3s ease',
};

const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
};

const inputContainerStyle: React.CSSProperties = {
    textAlign: 'left',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-primary)',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
};

const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.6)',
    border: '1px solid #333',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '1.1rem',
    letterSpacing: '4px',
    outline: 'none',
    transition: 'all 0.3s ease',
};

const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    background: 'var(--color-primary)',
    color: '#000',
    border: '1px solid var(--color-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 'bold',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 15px var(--color-primary)',
};

const spinnerStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid #000',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
};

const footerStyle: React.CSSProperties = {
    fontFamily: 'var(--font-digital)',
    fontSize: '0.6rem',
    color: '#444',
    marginTop: '2rem',
    letterSpacing: '2px',
};

export default AdminLogin;
