// src/pages/Events.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { eventsData, type EventCategory } from '../data/eventsData'; 
const Events = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState<EventCategory>(() => {
        const categoryParam = searchParams.get('category');
        return categoryParam === 'non-technical' ? 'non-technical' : 'technical';
    });

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const normalizedCategory: EventCategory = categoryParam === 'non-technical' ? 'non-technical' : 'technical';

        if (normalizedCategory !== activeCategory) {
            setActiveCategory(normalizedCategory);
        }
    }, [searchParams, activeCategory]);

    const handleCategoryChange = (category: EventCategory) => {
        setActiveCategory(category);
        setSearchParams({ category });
    };

    const categoryEvents = eventsData.filter((event) => event.category === activeCategory);

    return (
        <div className="events-page" style={{ 
            padding: '4rem clamp(1rem, 4vw, 2rem)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
        }}>
            <section className="title-neon-frame">
                <p className="title-neon-eyebrow">Where every event sparks creativity and fuels innovation.</p>
                <h1 className="stranger-title committee-like-title title-neon-heading">
                    Events
                </h1>
                <p className="title-neon-subtext">Experience moments that inspire, challenge, and leave a lasting impact</p>
            </section>

            <div
                className="events-filter-row"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '2.5rem'
                }}
            >
                <button
                    className="events-filter-btn"
                    type="button"
                    onClick={() => handleCategoryChange('technical')}
                    style={{
                        background: activeCategory === 'technical'
                            ? 'linear-gradient(180deg, rgba(231, 29, 54, 0.96) 0%, rgba(205, 18, 45, 0.96) 100%)'
                            : 'linear-gradient(180deg, rgba(12, 12, 12, 0.88) 0%, rgba(4, 4, 4, 0.88) 100%)',
                        border: '1px solid var(--color-primary)',
                        color: activeCategory === 'technical' ? '#050505' : 'var(--color-primary)',
                        padding: '0.7rem 1.4rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        textShadow: activeCategory === 'technical' ? 'none' : '0 0 8px rgba(231, 29, 54, 0.4)',
                        boxShadow: activeCategory === 'technical'
                            ? '0 0 14px rgba(231, 29, 54, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
                            : '0 10px 28px rgba(0, 0, 0, 0.55), inset 0 0 16px rgba(0, 0, 0, 0.55)'
                    }}
                >
                    Technical Events
                </button>
                <button
                    className="events-filter-btn"
                    type="button"
                    onClick={() => handleCategoryChange('non-technical')}
                    style={{
                        background: activeCategory === 'non-technical'
                            ? 'linear-gradient(180deg, rgba(231, 29, 54, 0.96) 0%, rgba(205, 18, 45, 0.96) 100%)'
                            : 'linear-gradient(180deg, rgba(12, 12, 12, 0.88) 0%, rgba(4, 4, 4, 0.88) 100%)',
                        border: '1px solid var(--color-primary)',
                        color: activeCategory === 'non-technical' ? '#050505' : 'var(--color-primary)',
                        padding: '0.7rem 1.4rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        textShadow: activeCategory === 'non-technical' ? 'none' : '0 0 8px rgba(231, 29, 54, 0.4)',
                        boxShadow: activeCategory === 'non-technical'
                            ? '0 0 14px rgba(231, 29, 54, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
                            : '0 10px 28px rgba(0, 0, 0, 0.55), inset 0 0 16px rgba(0, 0, 0, 0.55)'
                    }}
                >
                    Non-Technical Events
                </button>
            </div>

            <div
                className="events-info-note"
                style={{
                    marginTop: '0.85rem',
                    color: 'rgba(225, 225, 225, 0.85)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.4px',
                    fontSize: 'clamp(0.82rem, 1.7vw, 0.98rem)',
                    paddingBottom: '1.5rem',
                    textTransform: 'none',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    marginBottom: '2.5rem'
                }}
            >
                ✦ Participants are allowed to register for a maximum of one event only ✦ <br /> ✦ Registration fee is applicable Only for shortlisted teams ✦
            </div>

            <div className="events-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '2.5rem', 
                maxWidth: '1200px',     
                width: '100%' 
            }}>
                {categoryEvents.map((event, index) => (
                    <div 
                        key={event.id} 
                        className="hawkins-container event-card events-card"
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            height: '100%',
                            animationDelay: `${index * 0.1}s` 
                        }}
                    >
                        <div>
                            <h2 className="stranger-section-title" style={{ 
                                fontSize: '1.5rem', 
                                marginBottom: '1rem',
                                borderBottom: '2px solid rgba(231, 29, 54, 0.5)',
                                transition: 'border-color 0.3s ease'
                            }}>
                                {event.title}
                            </h2>
                            <p style={{ 
                                color: 'var(--color-neon-blue)', 
                                fontFamily: 'var(--font-digital)', 
                                marginBottom: '1rem',
                                letterSpacing: '1px',
                                fontSize: '0.9rem'
                            }} className="events-meta">
                                📅 {event.date} <br/> <br />
                                📍 {event.location} <br/> <br />
                                💰 Registration Fee: ₹{event.eventFee}{event.id === 8 ? '' : ' /per team'}
                            </p>
                            <p className="stranger-text" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                                {event.description}
                            </p>
                        </div>
                        
                        <button 
                            className="events-join-btn"
                            onClick={() => navigate(`/events/${event.id}`, { state: { fromCategory: activeCategory } })}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--color-primary)',
                                color: 'var(--color-primary)',
                                padding: '0.8rem 1.5rem',
                                fontFamily: 'var(--font-heading)',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                marginTop: 'auto',
                                alignSelf: 'flex-start',
                                transition: 'all 0.3s ease',
                                letterSpacing: '1px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--color-primary)';
                                e.currentTarget.style.color = '#000';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--color-primary)';
                            }}
                        >
                            Join Party
                        </button>
                    </div>
                ))}

                {categoryEvents.length === 0 && (
                    <div className="hawkins-container" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <p className="stranger-text">No events are available in this category yet.</p>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes pulse-glow {
                    0%, 100% {
                        opacity: 0.8;
                        textShadow: 0 0 12px rgba(231, 29, 54, 0.6), 0 0 24px rgba(231, 29, 54, 0.25);
                    }
                    50% {
                        opacity: 1;
                        textShadow: 0 0 18px rgba(231, 29, 54, 0.8), 0 0 36px rgba(231, 29, 54, 0.4);
                    }
                }

                .events-page {
                    width: 100%;
                }

                .events-info-note {
                    animation: pulse-glow 3s ease-in-out infinite;
                }

                .events-filter-btn {
                    min-width: 220px;
                }

                @media (max-width: 768px) {
                    .events-page {
                        padding-top: 3rem !important;
                        padding-bottom: 3rem !important;
                    }

                    .events-filter-row {
                        width: 100%;
                        margin-bottom: 2rem !important;
                    }

                    .events-filter-btn {
                        flex: 1 1 220px;
                        min-width: 0;
                    }

                    .events-grid {
                        gap: 1.4rem !important;
                    }
                }

                @media (max-width: 540px) {
                    .events-filter-row {
                        gap: 0.7rem !important;
                    }

                    .events-info-note {
                        font-size: 0.8rem !important;
                        margin-top: 1rem !important;
                        margin-bottom: 1.8rem !important;
                        padding: 0 0.8rem;
                    }

                    .events-filter-btn {
                        width: 100%;
                        padding: 0.65rem 0.8rem !important;
                        font-size: 0.82rem !important;
                        letter-spacing: 0.7px !important;
                    }

                    .events-grid {
                        grid-template-columns: 1fr !important;
                    }

                    .events-card {
                        padding: 1.1rem !important;
                    }

                    .events-card .stranger-section-title {
                        font-size: 1.2rem !important;
                    }

                    .events-meta {
                        font-size: 0.8rem !important;
                        line-height: 1.65;
                    }

                    .events-join-btn {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default Events;