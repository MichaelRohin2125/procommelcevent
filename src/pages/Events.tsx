// src/pages/Events.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsData, type EventCategory } from '../data/eventsData'; 
const Events = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState<EventCategory>('technical');

    const categoryEvents = eventsData.filter((event) => event.category === activeCategory);

    return (
        <div style={{ 
            padding: '4rem 2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
        }}>
            <section className="title-neon-frame">
                <h1 className="stranger-title committee-like-title title-neon-heading">
                    Events
                </h1>
            </section>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '2.5rem'
                }}
            >
                <button
                    type="button"
                    onClick={() => setActiveCategory('technical')}
                    style={{
                        background: activeCategory === 'technical' ? 'var(--color-primary)' : 'transparent',
                        border: '1px solid var(--color-primary)',
                        color: activeCategory === 'technical' ? '#050505' : 'var(--color-primary)',
                        padding: '0.7rem 1.4rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: activeCategory === 'technical' ? '0 0 14px rgba(231, 29, 54, 0.45)' : 'none'
                    }}
                >
                    Technical Events
                </button>
                <button
                    type="button"
                    onClick={() => setActiveCategory('non-technical')}
                    style={{
                        background: activeCategory === 'non-technical' ? 'var(--color-primary)' : 'transparent',
                        border: '1px solid var(--color-primary)',
                        color: activeCategory === 'non-technical' ? '#050505' : 'var(--color-primary)',
                        padding: '0.7rem 1.4rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: activeCategory === 'non-technical' ? '0 0 14px rgba(231, 29, 54, 0.45)' : 'none'
                    }}
                >
                    Non-Technical Events
                </button>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2.5rem', 
                maxWidth: '1200px', 
                width: '100%' 
            }}>
                {categoryEvents.map((event, index) => (
                    <div 
                        key={event.id} 
                        className="hawkins-container event-card"
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
                            }}>
                                📅 {event.date} <br/> 
                                📍 {event.location} <br/>
                                💰 Registration Fee: ₹{event.eventFee}
                            </p>
                            <p className="stranger-text" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                                {event.description}
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => navigate(`/events/${event.id}`)}
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
        </div>
    );
};

export default Events;