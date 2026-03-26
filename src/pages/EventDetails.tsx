import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { eventsData, type EventCategory } from '../data/eventsData'; 

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const event = eventsData.find(e => e.id === Number(id));
    
    // State to handle image load error
    const [imageError, setImageError] = useState(false);
    const [showRegistrationClosedPopup, setShowRegistrationClosedPopup] = useState(false);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!event) {
        return (
            <div style={{ padding: 'clamp(2rem, 7vw, 5rem)', textAlign: 'center', color: '#fff' }}>
                <h1 className="stranger-title">404</h1>
                <p>Event not found in this dimension.</p>
                <button onClick={() => navigate('/events')} style={{ marginTop: '2rem', background: 'var(--color-primary)', border: 'none', padding: '1rem', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    const locationState = location.state as { fromCategory?: EventCategory } | null;
    const backCategory: EventCategory =
        locationState?.fromCategory === 'technical' || locationState?.fromCategory === 'non-technical'
            ? locationState.fromCategory
            : event.category;

    const handleBackToEvents = () => {
        navigate(`/events?category=${backCategory}`);
    };

    return (
        <div className="event-details-page" style={{ padding: 'clamp(1rem, 4vw, 2rem)', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            
            <div className="hawkins-container event-details-container" style={{ 
                maxWidth: '1000px', 
                width: '100%', 
                position: 'relative', 
                padding: 'clamp(1.2rem, 4vw, 3rem)',
                border: '1px solid #444',
                // FIX: Ensure overflow is visible so the rotated image isn't clipped
                overflow: 'visible' 
            }}>
                
                {/* 1. Header with Back Button */}
                <div className="event-details-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '1rem' }}>
                    <button 
                        className="event-details-back-button"
                        onClick={handleBackToEvents}
                        style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            color: 'var(--color-primary)', 
                            fontSize: '2rem', 
                            cursor: 'pointer',
                            marginRight: '1rem'
                        }}
                    >
                        ←
                    </button>
                    <h1 className="event-details-title" style={{ 
                        fontFamily: 'var(--font-heading)', 
                        fontSize: 'clamp(1.5rem, 5vw, 3rem)', 
                        color: '#fff', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px',
                        textShadow: '0 0 10px var(--color-primary)'
                    }}>
                        {event.title}
                    </h1>
                </div>

                {/* 2. Top Section: Details & Image */}
                <div className="event-details-top" style={{ display: 'flex', flexDirection: 'row', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    
                    {/* Left: Text Details */}
                    <div className="event-details-copy" style={{ flex: '1 1 400px' }}>
                        <h2 className="stranger-section-title">Event Details</h2>
                        <p className="stranger-text" style={{ marginBottom: '1.5rem', color: '#ccc' }}>
                            {event.fullDescription || event.description}
                        </p>
                        
                        <div className="event-details-meta" style={{ fontFamily: 'var(--font-digital)', color: 'var(--color-neon-blue)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                            <p><strong>Team Size:</strong> {event.teamSize}</p>
                            <p><strong>Venue:</strong> {event.venue}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Registration Fee:</strong> ₹{event.eventFee}{event.id === 8 ? '' : ' /per team'}</p>
                        </div>
                    </div>

                    {/* Right: Poster/Image - FIXED VISIBILITY */}
                    <div className="event-details-poster-col" style={{ flex: '1 1 300px', minWidth: 0 }}>
                        <div style={{ 
                            border: '4px solid #fff', 
                            padding: '5px', 
                            background: '#000', 
                            transform: 'rotate(2deg)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                            transition: 'transform 0.3s ease'
                        }}
                        className="event-image-container"
                        >
                            <img 
                                src={imageError ? 'https://via.placeholder.com/400x600/000000/ff0000?text=TOP+SECRET' : event.image} 
                                alt={event.title} 
                                onError={() => setImageError(true)}
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    minHeight: '200px',
                                    display: 'block', 
                                    filter: 'sepia(30%) contrast(110%)',
                                    objectFit: 'cover'
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Instructions & Eligibility */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 className="stranger-section-title">Instructions</h2>
                    <p className="stranger-text" style={{ marginBottom: '2rem' }}>{event.instructions}</p>

                    <h2 className="stranger-section-title">Eligibility</h2>
                    <p className="stranger-text">{event.eligibility}</p>
                </div>

                {/* 4. Rounds */}
                <h2 className="stranger-section-title">Rounds</h2>
                <div className="event-details-rounds" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {event.rounds && event.rounds.map((round: any, idx: number) => (
                        <div key={idx} style={{ 
                            border: '1px solid var(--color-primary)', 
                            padding: '1.5rem', 
                            background: 'rgba(231, 29, 54, 0.05)',
                            position: 'relative'
                        }}>
                            <h3 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                color: 'var(--color-primary)', 
                                marginBottom: '0.5rem', 
                                fontSize: '1.5rem' 
                            }}>
                                {round.name}
                            </h3>
                            <p style={{ fontFamily: 'var(--font-digital)', color: 'var(--color-neon-blue)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Mode: {round.mode} | Date: {round.date}
                            </p>
                            <p className="stranger-text" style={{ fontSize: '0.95rem' }}>{round.desc}</p>
                        </div>
                    ))}
                </div>

                {/* 5. Registration Buttons */}
                    <div className="event-details-actions" style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button 
                            className="event-details-action"
                        onClick={() => setShowRegistrationClosedPopup(true)}
                        style={buttonStyle}
                    >
                        Register Now
                    </button>
                        {/* <button className="event-details-action" style={{ ...buttonStyle, background: 'transparent', color: '#fff', borderColor: '#fff' }}>
                        Event Brochure
                    </button> */}
                </div>

                {showRegistrationClosedPopup && (
                    <div style={closedOverlayStyle} role="dialog" aria-modal="true" aria-labelledby="registration-closed-title">
                        <div className="event-details-closed-popup" style={closedPopupStyle}>
                            <h2 id="registration-closed-title" style={closedTitleStyle}>REGISTRATION CLOSED</h2>
                            <p style={closedTextStyle}>
                                Registration is closed for all events. Thank you.
                            </p>
                            <button
                                type="button"
                                style={closedButtonStyle}
                                onClick={() => setShowRegistrationClosedPopup(false)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.color = '#050505';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--color-primary)';
                                    e.currentTarget.style.color = '#050505';
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* 6. Coordinators */}
                    <div className="event-details-coordinators" style={{ borderTop: '1px dashed #666', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                    <div>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Student Coordinators</h3>
                        {event.coordinators && event.coordinators.student.map((c: string, i: number) => (
                            <p key={i} className="stranger-text" style={{ fontSize: '0.9rem' }}>{c}</p>
                        ))}
                    </div>
                    <div className={`event-details-staff ${event.id === 8 ? 'event-details-staff-parallel' : ''}`}>
                        <h3
                            className={event.id === 8 ? 'event-details-staff-title-survivox' : ''}
                            style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}
                        >
                            {event.id === 8 ? 'Staff Coordinators' : 'Staff Coordinator'}
                        </h3>
                        <div className="event-details-staff-list">
                            {event.coordinators && event.coordinators.staff.map((c: string, i: number) => (
                                <p key={i} className="stranger-text event-details-staff-entry" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line', lineHeight: 1.65 }}>{c}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                    .event-details-page {
                        width: 100%;
                    }

                    .event-details-staff {
                        margin-left: auto;
                        text-align: right;
                    }

                    .event-details-staff-list {
                        display: flex;
                        flex-direction: column;
                        gap: 0.45rem;
                    }

                    .event-details-staff-entry {
                        margin: 0;
                    }

                    .event-details-staff-title-survivox {
                        text-align: center;
                    }

                    .event-details-staff-parallel .event-details-staff-list {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(220px, 1fr));
                        gap: 0.9rem 1.2rem;
                        text-align: left;
                    }

                    .event-details-staff-parallel .event-details-staff-entry {
                        padding: 0.55rem 0.7rem;
                        // border: 1px dashed rgba(231, 29, 54, 0.45);
                        // background: rgba(231, 29, 54, 0.08);
                    }

                    .event-details-action {
                        min-width: 170px;
                    }

                    @media (max-width: 900px) {
                        .event-details-top {
                            gap: 1.6rem !important;
                            margin-bottom: 2.1rem !important;
                        }

                        .event-details-copy {
                            flex: 1 1 100% !important;
                        }

                        .event-details-poster-col {
                            flex: 1 1 100% !important;
                        }

                        .event-details-poster-col .event-image-container {
                            max-width: 440px;
                            margin: 0 auto;
                        }

                        .event-details-rounds {
                            gap: 1.3rem !important;
                        }

                        .event-details-staff-parallel .event-details-staff-list {
                            grid-template-columns: 1fr;
                        }
                    }

                    @media (max-width: 640px) {
                        .event-details-page {
                            padding: 1rem 0.7rem !important;
                        }

                        .event-details-container {
                            padding: 1.05rem !important;
                        }

                        .event-details-header {
                            margin-bottom: 1.2rem !important;
                            padding-bottom: 0.7rem !important;
                        }

                        .event-details-back-button {
                            font-size: 1.55rem !important;
                            margin-right: 0.65rem !important;
                        }

                        .event-details-title {
                            letter-spacing: 1px !important;
                            line-height: 1.15;
                        }

                        .event-details-meta {
                            font-size: 0.92rem !important;
                            line-height: 1.62 !important;
                        }

                        .event-details-rounds {
                            grid-template-columns: 1fr !important;
                            margin-bottom: 2rem !important;
                        }

                        .event-details-actions {
                            flex-direction: column;
                            margin-bottom: 2rem !important;
                        }

                        .event-details-action {
                            width: 100%;
                            font-size: 0.95rem !important;
                            padding: 0.85rem 1rem !important;
                            text-align: center;
                        }

                        .event-details-coordinators {
                            gap: 1.2rem !important;
                        }
                    }
                `}</style>

            </div>
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    background: 'var(--color-primary)',
    color: '#000',
    border: '1px solid var(--color-primary)',
    padding: '1rem 2rem',
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 0 10px var(--color-primary)',
    transition: 'all 0.3s ease'
};

const closedOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem'
};

const closedPopupStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '560px',
    background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.96) 0%, rgba(8, 8, 8, 0.96) 100%)',
    border: '1px solid rgba(231, 29, 54, 0.5)',
    boxShadow: '0 0 30px rgba(231, 29, 54, 0.35), inset 0 0 18px rgba(231, 29, 54, 0.1)',
    padding: '2rem',
    textAlign: 'center'
};

const closedTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.7rem',
    letterSpacing: '2px',
    color: 'var(--color-primary)',
    textShadow: '0 0 10px rgba(231, 29, 54, 0.6)',
    marginBottom: '0.8rem'
};

const closedTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-digital)',
    color: '#d6d6d6',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem'
};

const closedButtonStyle: React.CSSProperties = {
    background: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    color: '#050505',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '0.95rem',
    fontWeight: 700,
    padding: '0.8rem 1.4rem',
    cursor: 'pointer',
    transition: 'all 0.25s ease'
};

export default EventDetails;