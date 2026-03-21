import { useState, useEffect } from 'react';

const CountdownClock = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set target date to March 25, 2026 at 11:59:59 AM
        const targetDate = new Date('2026-03-25T11:59:59');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeBlockStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        margin: '0 clamp(0.25rem, 2vw, 1rem)'
    };

    const numberStyle = {
        fontFamily: 'var(--font-digital)',
        fontSize: 'clamp(1.6rem, 6vw, 3rem)',
        color: '#ff0033',
        textShadow: '0 0 10px #ff0033',
        backgroundColor: '#0a0a0a',
        padding: 'clamp(0.5rem, 2.5vw, 1rem)',
        borderRadius: '4px',
        border: '1px solid #333',
        minWidth: 'clamp(64px, 22vw, 100px)'
    };

    const labelStyle = {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.66rem, 2.5vw, 0.8rem)',
        marginTop: '0.5rem',
        textTransform: 'uppercase' as const,
        letterSpacing: 'clamp(1px, 1vw, 2px)',
        color: '#888'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0', flexWrap: 'wrap' }}>
            <div style={timeBlockStyle}>
                <div style={numberStyle}>{String(timeLeft.days).padStart(2, '0')}</div>
                <div style={labelStyle}>Days</div>
            </div>
            <div style={timeBlockStyle}>
                <div style={numberStyle}>{String(timeLeft.hours).padStart(2, '0')}</div>
                <div style={labelStyle}>Hours</div>
            </div>
            <div style={timeBlockStyle}>
                <div style={numberStyle}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div style={labelStyle}>Mins</div>
            </div>
            <div style={timeBlockStyle}>
                <div style={numberStyle}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div style={labelStyle}>Secs</div>
            </div>
        </div>
    );
};

export default CountdownClock;
