import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/eventsData';

const API_URL = 'http://localhost:5000';

type TeamSizeRule = {
    min: number;
    max: number;
    individual?: boolean;
};

const TEAM_SIZE_RULES: Record<number, TeamSizeRule> = {
    3: { min: 3, max: 3 },
    4: { min: 2, max: 2 },
    5: { min: 3, max: 4 },
    6: { min: 3, max: 3 },
    7: { min: 2, max: 3 },
    8: { min: 1, max: 1, individual: true },
    9: { min: 2, max: 3 },
    10: { min: 2, max: 2 },
    11: { min: 3, max: 4 },
};

const getTeamSizeRule = (eventId?: number): TeamSizeRule => TEAM_SIZE_RULES[eventId ?? -1] ?? { min: 1, max: 4 };

const Registration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = eventsData.find(e => e.id === Number(id));
    const teamSizeRule = getTeamSizeRule(event?.id);
    const teamSizeOptions = Array.from(
        { length: teamSizeRule.max - teamSizeRule.min + 1 },
        (_, index) => teamSizeRule.min + index
    );
    const teamSizeSummaryText = teamSizeRule.individual
        ? 'individual registration only.'
        : teamSizeRule.min === teamSizeRule.max
            ? `${teamSizeRule.min} members only.`
            : `${teamSizeRule.min} to ${teamSizeRule.max} members allowed.`;
    const defaultTeamSize = teamSizeRule.min;
    const isIndividualEvent = teamSizeRule.individual === true;

    // Form State
    const [formData, setFormData] = useState({
        teamName: '',
        collegeName: '',
        department: '',
        branch: '',
        teamLeadName: '',
        teamLeadEmail: '',
        teamLeadPhone: '',
        teamSize: defaultTeamSize,
        abstract: '',
        transport: 'no',
        locality: '',
        memberLocalities: [] as string[]
    });

    // Dynamic State for Additional Members (Added Phone)
    const [members, setMembers] = useState<{ name: string; email: string; phone: string }[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const resizeMembersForTeamSize = (size: number) => {
        const extraMembersCount = Math.max(0, size - 1);

        setMembers(prev => {
            const newMembers = [...prev];
            if (newMembers.length < extraMembersCount) {
                while (newMembers.length < extraMembersCount) {
                    newMembers.push({ name: '', email: '', phone: '' });
                }
            } else {
                newMembers.length = extraMembersCount;
            }
            return newMembers;
        });

        setFormData(prev => ({
            ...prev,
            memberLocalities: Array(extraMembersCount).fill('')
        }));
    };

    // Handle Team Size Change (Dropdown Logic)
    const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const size = parseInt(e.target.value);
        setFormData({ ...formData, teamSize: size });
        resizeMembersForTeamSize(size);
    };

    // Handle Dynamic Member Inputs
    const handleMemberChange = (index: number, field: string, value: string) => {
        const updatedMembers = [...members];
        // @ts-ignore
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        setMembers(updatedMembers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');

        try {
            const normalizedTeamName = isIndividualEvent
                ? (formData.teamLeadName.trim() || 'Individual Registration')
                : formData.teamName;

            const payload = {
                eventId: event?.id,
                eventName: event?.title || '',
                teamName: normalizedTeamName,
                collegeName: formData.collegeName,
                department: formData.department,
                branch: formData.branch,
                teamLeadName: formData.teamLeadName,
                teamLeadEmail: formData.teamLeadEmail,
                teamLeadPhone: formData.teamLeadPhone,
                teamSize: formData.teamSize,
                members: members,
                abstract: event?.id === 11 ? formData.abstract : undefined,
                transport: formData.transport,
                locality: formData.transport === 'yes' ? formData.locality : undefined,
                memberLocalities: formData.transport === 'yes' ? formData.memberLocalities : undefined,
            };

            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccessPopup(true);
            } else {
                setSubmitError(data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setSubmitError('Cannot connect to server. Please make sure the backend is running.');
        } finally {
            setSubmitting(false);
        }
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        navigate('/');
    };

    useEffect(() => {
        const nextTeamSize = getTeamSizeRule(event?.id).min;

        setFormData(prev => {
            if (prev.teamSize === nextTeamSize) return prev;
            return { ...prev, teamSize: nextTeamSize };
        });

        resizeMembersForTeamSize(nextTeamSize);
    }, [event?.id]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (!event) return <div>Event not found</div>;

    return (
        <div className="registration-page" style={{ 
            padding: '4rem clamp(1rem, 4vw, 2rem)', 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
            {showSuccessPopup && (
                <div style={successOverlayStyle} role="dialog" aria-modal="true" aria-labelledby="success-popup-title">
                    <div className="registration-success-popup" style={successPopupStyle}>
                        <h2 id="success-popup-title" style={successTitleStyle}>REGISTRATION IS SUBMITTED</h2>
                        <p style={successTextStyle}>
                            The Event registration is successful our student coordinators will contact you for further details
                        </p>
                        <button
                            type="button"
                            className="registration-success-button"
                            style={successButtonStyle}
                            onClick={closeSuccessPopup}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.color = '#050505';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--color-primary)';
                                e.currentTarget.style.color = '#050505';
                            }}
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            )}

            <div className="hawkins-container registration-card" style={{ maxWidth: '800px', width: '100%', padding: '3rem' }}>
                
                {/* Header */}
                <div className="registration-header" style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    <h1 className="stranger-section-title" style={{ fontSize: '1.8rem', border: 'none', margin: 0 }}>
                        Registration Form
                    </h1>
                    <p style={{ color: 'var(--color-neon-blue)', fontFamily: 'var(--font-digital)', marginTop: '0.5rem' }}>
                        EVENT CODE: {event.title.toUpperCase()}
                    </p>
                </div>

                {submitError && (
                    <div className="registration-error" style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.3)', padding: '0.8rem 1rem', marginBottom: '1rem', fontFamily: 'var(--font-digital)', fontSize: '0.8rem', color: '#ff6666' }}>
                        ⚠ {submitError}
                    </div>
                )}

                <form className="registration-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Section 1: Team & College Info */}
                    <h3 style={sectionHeaderStyle}>{isIndividualEvent ? 'Individual Identity' : 'Team Identity'}</h3>
                    <div style={gridStyle}>
                        {!isIndividualEvent && (
                            <InputGroup label="Team Name" value={formData.teamName} onChange={(e: any) => setFormData({...formData, teamName: e.target.value})} />
                        )}
                        <InputGroup label="College Name" value={formData.collegeName} onChange={(e: any) => setFormData({...formData, collegeName: e.target.value})} />
                        <InputGroup label="Department" value={formData.department} onChange={(e: any) => setFormData({...formData, department: e.target.value})} />
                        <InputGroup label="Branch / Year" value={formData.branch} onChange={(e: any) => setFormData({...formData, branch: e.target.value})} />
                    </div>

                    {/* Section 2: Team Lead */}
                    <h3 style={sectionHeaderStyle}>{isIndividualEvent ? 'Participant Details' : 'Team Lead (Main Contact)'}</h3>
                    <div style={gridStyle}>
                        <InputGroup label={isIndividualEvent ? 'Participant Name' : 'Lead Name'} value={formData.teamLeadName} onChange={(e: any) => setFormData({...formData, teamLeadName: e.target.value})} />
                        <InputGroup label={isIndividualEvent ? 'Participant Phone No' : 'Lead Phone No'} type="tel" value={formData.teamLeadPhone} onChange={(e: any) => setFormData({...formData, teamLeadPhone: e.target.value})} />
                        {/* Added Lead Email */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <InputGroup label={isIndividualEvent ? 'Participant Email ID' : 'Lead Email ID'} type="email" value={formData.teamLeadEmail} onChange={(e: any) => setFormData({...formData, teamLeadEmail: e.target.value})} />
                        </div>
                    </div>

                    {/* Section 2.5: Abstract (Only for Portal of Innovations) */}
                    {event.id === 11 && (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <h3 style={sectionHeaderStyle}>Innovation Abstract</h3>
                            <div style={{ marginTop: '1rem' }}>
                                <label style={labelStyle}>Project/Idea Abstract (Max 200 words)</label>
                                <textarea 
                                    value={formData.abstract}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/).filter(Boolean);
                                        if (words.length <= 200 || e.target.value.length < formData.abstract.length) {
                                            setFormData({...formData, abstract: e.target.value});
                                        }
                                    }}
                                    required
                                    placeholder="Describe your innovative idea or project here..."
                                    style={{ 
                                        ...inputStyle, 
                                        width: '100%', 
                                        height: '150px', 
                                        marginTop: '0.5rem',
                                        resize: 'vertical'
                                    }}
                                />
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'flex-end', 
                                    marginTop: '0.5rem',
                                    fontFamily: 'var(--font-digital)',
                                    fontSize: '0.8rem',
                                    color: formData.abstract.trim().split(/\s+/).filter(Boolean).length >= 200 ? 'var(--color-primary)' : '#888'
                                }}>
                                    {formData.abstract.trim().split(/\s+/).filter(Boolean).length} / 200 words
                                </div>
                            </div>
                        </div>
                    )}

                    {!isIndividualEvent && (
                        <>
                            {/* Section 3: Team Configuration */}
                            <h3 style={sectionHeaderStyle}>Team Configuration</h3>
                            
                            <div className="registration-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
                                <label style={labelStyle}>Number of Team Members (Including Lead)</label>
                                
                                {/* Team size options are event-specific */}
                                <select 
                                    value={formData.teamSize} 
                                    onChange={handleTeamSizeChange}
                                    disabled={teamSizeOptions.length === 1}
                                    style={{
                                        ...inputStyle,
                                        width: '100%',
                                        cursor: teamSizeOptions.length === 1 ? 'not-allowed' : 'pointer',
                                        opacity: teamSizeOptions.length === 1 ? 0.8 : 1
                                    }}
                                >
                                    {teamSizeOptions.map((size) => (
                                        <option key={size} value={size}>
                                            {teamSizeRule.individual && size === 1
                                                ? 'Individual Registration'
                                                : size === 1
                                                    ? '1 Member (Lead)'
                                                    : `${size} Members`}
                                        </option>
                                    ))}
                                </select>

                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                                    *Allowed team size: {teamSizeSummaryText}
                                </p>
                            </div>

                            {/* Dynamic Member Fields */}
                            {members.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeIn 0.5s ease' }}>
                                    {members.map((member, index) => (
                                        <div className="registration-member-card" key={index} style={{ 
                                            padding: '1rem', 
                                            border: '1px dashed #444', 
                                            marginTop: '1rem',
                                            position: 'relative'
                                        }}>
                                            <span style={{ 
                                                position: 'absolute', 
                                                top: '-10px', 
                                                left: '10px', 
                                                background: '#000', 
                                                padding: '0 5px', 
                                                color: 'var(--color-neon-blue)', 
                                                fontSize: '0.8rem',
                                                fontFamily: 'var(--font-digital)'
                                            }}>
                                                MEMBER 0{index + 2} DATA
                                            </span>
                                            
                                            {/* Updated Grid to include Phone */}
                                            <div style={gridStyle}>
                                                <InputGroup 
                                                    label={`Member ${index + 2} Name`} 
                                                    value={member.name} 
                                                    onChange={(e: any) => handleMemberChange(index, 'name', e.target.value)} 
                                                />
                                                <InputGroup 
                                                    label={`Member ${index + 2} Phone No`} 
                                                    type="tel"
                                                    value={member.phone} 
                                                    onChange={(e: any) => handleMemberChange(index, 'phone', e.target.value)} 
                                                />
                                                <div style={{ gridColumn: '1 / -1' }}>
                                                    <InputGroup 
                                                        label={`Member ${index + 2} Email`} 
                                                        type="email"
                                                        value={member.email} 
                                                        onChange={(e: any) => handleMemberChange(index, 'email', e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Section 4: Transport Facility */}
                    <h3 style={sectionHeaderStyle}>Transport Facility</h3>
                    <div className="registration-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
                        <label style={labelStyle}>Do you want transport facility?</label>
                        <div className="registration-transport-options" style={{ marginTop: '1rem' }}>
                            <label className="registration-transport-option">
                                <input 
                                    type="radio" 
                                    name="transport" 
                                    value="yes" 
                                    checked={formData.transport === 'yes'}
                                    onChange={(e) => setFormData({...formData, transport: e.target.value})}
                                    className="registration-transport-radio"
                                    style={{ accentColor: 'var(--color-primary)' }}
                                /> Yes
                            </label>
                            <label className="registration-transport-option">
                                <input 
                                    type="radio" 
                                    name="transport" 
                                    value="no" 
                                    checked={formData.transport === 'no'}
                                    onChange={(e) => setFormData({...formData, transport: e.target.value})}
                                    className="registration-transport-radio"
                                    style={{ accentColor: 'var(--color-primary)' }}
                                /> No
                            </label>
                        </div>

                        {formData.transport === 'yes' && (
                            <div className="registration-locality-wrap" style={{ marginTop: '1.5rem', animation: 'fadeIn 0.4s ease' }}>
                                <InputGroup 
                                    label={isIndividualEvent ? 'Participant Locality' : 'Team Lead Locality'} 
                                    value={formData.locality} 
                                    onChange={(e: any) => setFormData({...formData, locality: e.target.value})} 
                                />

                                {members.length > 0 && (
                                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {members.map((_, index) => (
                                            <InputGroup
                                                key={index}
                                                label={`Member ${index + 2} Locality`}
                                                value={formData.memberLocalities[index] || ''}
                                                onChange={(e: any) => {
                                                    const newLocalities = [...formData.memberLocalities];
                                                    newLocalities[index] = e.target.value;
                                                    setFormData({...formData, memberLocalities: newLocalities});
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="registration-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button 
                            className="registration-action-btn"
                            type="button" 
                            onClick={() => navigate(-1)} 
                            style={cancelButtonStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#fff';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#666';
                                e.currentTarget.style.color = '#ccc';
                            }}
                        >
                            Cancel
                        </button>

                        <button 
                            className="registration-action-btn"
                            type="submit" 
                            disabled={submitting}
                            style={{ ...submitButtonStyle, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
                            onMouseEnter={(e) => {
                                if (!submitting) {
                                    e.currentTarget.style.background = '#fff';
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--color-primary)';
                                e.currentTarget.style.color = '#000';
                            }}
                        >
                            {submitting ? 'TRANSMITTING...' : 'Submit Registration'}
                        </button>
                    </div>

                </form>
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes successPopupIn {
                    from { opacity: 0; transform: translateY(16px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .registration-page {
                    width: 100%;
                }

                .registration-form input,
                .registration-form textarea,
                .registration-form select {
                    width: 100%;
                    max-width: 100%;
                }

                .registration-transport-options {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.2rem;
                    align-items: center;
                }

                .registration-transport-option {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    color: #fff;
                    cursor: pointer;
                    font-family: var(--font-body);
                    font-size: 0.96rem;
                }

                .registration-transport-radio {
                    width: auto !important;
                    max-width: none !important;
                    margin: 0;
                }

                @media (max-width: 900px) {
                    .registration-page {
                        padding-top: 3rem !important;
                        padding-bottom: 3rem !important;
                        align-items: flex-start !important;
                    }

                    .registration-card {
                        padding: 2rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .registration-page {
                        padding: 2rem 0.8rem !important;
                    }

                    .registration-card {
                        padding: 1.2rem !important;
                    }

                    .registration-header h1 {
                        font-size: 1.35rem !important;
                    }

                    .registration-header p {
                        font-size: 0.78rem;
                        line-height: 1.4;
                        word-break: break-word;
                    }

                    .registration-panel {
                        padding: 1rem !important;
                    }

                    .registration-member-card {
                        padding: 0.85rem !important;
                    }

                    .registration-transport-options {
                        flex-direction: row !important;
                        flex-wrap: wrap !important;
                        gap: 0.7rem !important;
                    }

                    .registration-transport-option {
                        width: auto;
                    }

                    .registration-locality-wrap {
                        margin-top: 1rem !important;
                    }

                    .registration-actions {
                        flex-direction: column;
                        margin-top: 1.4rem !important;
                    }

                    .registration-action-btn {
                        width: 100%;
                        font-size: 0.95rem !important;
                        padding: 0.85rem !important;
                    }

                    .registration-success-popup {
                        padding: 1.25rem !important;
                    }
                }

                @media (max-width: 420px) {
                    .registration-error {
                        font-size: 0.72rem !important;
                    }

                    .registration-success-button {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

// --- Styles & Components ---

const InputGroup = ({ label, value, onChange, type = "text" }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={labelStyle}>{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            required 
            style={inputStyle} 
        />
    </div>
);

const sectionHeaderStyle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    color: '#ccc',
    fontSize: '1.2rem',
    marginTop: '1rem',
    borderBottom: '1px solid #333'
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
};

const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--color-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const inputStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #444',
    color: '#fff',
    padding: '0.8rem',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s'
};

const buttonBaseStyle: React.CSSProperties = {
    flex: '1',
    padding: '1rem',
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    cursor: 'pointer',
    letterSpacing: '2px',
    transition: 'all 0.3s',
    textAlign: 'center'
};

const submitButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    background: 'var(--color-primary)',
    color: '#000',
    border: '1px solid var(--color-primary)',
    fontWeight: 'bold',
    boxShadow: '0 0 15px var(--color-primary)'
};

const cancelButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    background: 'transparent',
    color: '#ccc',
    border: '1px solid #666',
};

const successOverlayStyle: React.CSSProperties = {
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

const successPopupStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '560px',
    background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.96) 0%, rgba(8, 8, 8, 0.96) 100%)',
    border: '1px solid rgba(231, 29, 54, 0.5)',
    boxShadow: '0 0 30px rgba(231, 29, 54, 0.35), inset 0 0 18px rgba(231, 29, 54, 0.1)',
    padding: '2rem',
    textAlign: 'center',
    animation: 'successPopupIn 0.35s ease-out'
};

const successTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.7rem',
    letterSpacing: '2px',
    color: 'var(--color-primary)',
    textShadow: '0 0 10px rgba(231, 29, 54, 0.6)',
    marginBottom: '0.8rem'
};

const successTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-digital)',
    color: '#d6d6d6',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem'
};

const successButtonStyle: React.CSSProperties = {
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

export default Registration;