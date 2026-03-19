type CommitteeMember = {
    id: string;
    name: string;
    role: string;
    subtitle: string;
    photoKey: string;
    photo: string;
};

type CommitteeSection = {
    id: string;
    title: string;
    members: CommitteeMember[];
};

const committeeSections: CommitteeSection[] = [
    {
        id: 'faculty',
        title: 'Faculty Coordinators',
        members: [
            {
                id: 'f1',
                name: 'Dr Nithya M',
                role: 'Head of Department',
                subtitle: 'Department Mentor',
                photoKey: 'f1',
                photo: 'https://i.pravatar.cc/320?img=32'
            },
            {
                id: 'f2',
                name: 'Dr. Geetha A',
                role: 'Staff Coordinator',
                subtitle: 'Operations Lead',
                photoKey: 'f2',
                photo: 'https://i.pravatar.cc/320?img=47'
            },
            {
                id: 'f3',
                name: 'Mr Yuvaraj G',
                role: 'Staff Coordinator',
                subtitle: 'Technical Mentor',
                photoKey: 'f3',
                photo: 'https://i.pravatar.cc/320?img=12'
            }
        ]
    },
    {
        id: 'student',
        title: 'Student Coordinators',
        members: [
            {
                id: 's1',
                name: 'Sanjay S',
                role: 'President',
                subtitle: 'IEEE ProComm',
                photoKey: 's1',
                photo: 'https://i.pravatar.cc/320?img=15'
            },
            {
                id: 's2',
                name: 'Meenakshi B',
                role: 'Vice President',
                subtitle: 'IEEE ProComm',
                photoKey: 's2',
                photo: 'https://i.pravatar.cc/320?img=48'
            },
            {
                id: 's3',
                name: 'Dharani G',
                role: 'Secretary',
                subtitle: 'IEEE ProComm',
                photoKey: 's3',
                photo: 'https://i.pravatar.cc/320?img=55'
            },
            {
                id: 's4',
                name: 'Harini T',
                role: 'Treasurer',
                subtitle: 'Logistics and Budget',
                photoKey: 's4',
                photo: 'https://i.pravatar.cc/320?img=25'
            }
        ]
    },
    // {
    //     id: 'web',
    //     title: 'Website Team',
    //     members: [
    //         {
    //             id: 'w1',
    //             name: 'Ragul H',
    //             role: 'Frontend Developer',
    //             subtitle: 'UI and Animations',
    //             photo: 'https://i.pravatar.cc/320?img=68'
    //         },
    //         {
    //             id: 'w2',
    //             name: 'Kavin P',
    //             role: 'Backend Developer',
    //             subtitle: 'API and Data',
    //             photo: 'https://i.pravatar.cc/320?img=6'
    //         },
    //         {
    //             id: 'w3',
    //             name: 'Shreya M',
    //             role: 'UI Designer',
    //             subtitle: 'Visual Direction',
    //             photo: 'https://i.pravatar.cc/320?img=49'
    //         },
    //         {
    //             id: 'w4',
    //             name: 'Vignesh A',
    //             role: 'QA and Support',
    //             subtitle: 'Testing and Reviews',
    //             photo: 'https://i.pravatar.cc/320?img=11'
    //         }
    //     ]
    // }
];

    const committeePhotoModules = import.meta.glob(
        '../assets/committee/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG,WEBP,AVIF,GIF}',
        { eager: true, import: 'default' }
    ) as Record<string, string>;

    const getAssetKey = (assetPath: string) => {
        const fileName = assetPath.split('/').pop() ?? '';
        const extensionIndex = fileName.lastIndexOf('.');

        if (extensionIndex === -1) {
            return fileName.toLowerCase();
        }

        return fileName.slice(0, extensionIndex).toLowerCase();
    };

    const committeePhotoByKey = Object.entries(committeePhotoModules).reduce<Record<string, string>>((acc, [path, url]) => {
        acc[getAssetKey(path)] = url;
        return acc;
    }, {});

    const resolveCommitteePhoto = (photoKey: string, fallbackPhoto: string) => {
        return committeePhotoByKey[photoKey.toLowerCase()] ?? fallbackPhoto;
    };

const getFallbackAvatar = (name: string) => {
    const encodedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encodedName}&background=0d0d0d&color=eec77d&size=256&bold=true`;
};

const Committee = () => {
    return (
        <div className="committee-page">
            {/* <Navbar /> */}

            <section className="committee-hero">
                <p className="committee-eyebrow">Hawkins Public Archive // Transmission Locked: 1986</p>
                <h1 className="stranger-title committee-main-title">Committee Files</h1>
                <p className="committee-subtext">
                    Classified profiles recovered from the upside down signal.
                </p>
            </section>

            <div className="committee-sections">
                {committeeSections.map((section, sectionIndex) => (
                    <section key={section.id} className="hawkins-container committee-section-card">
                        <header className="committee-section-header">
                            <span className="committee-section-index">{String(sectionIndex + 1).padStart(2, '0')}</span>
                            <h2 className="stranger-section-title committee-section-title">{section.title}</h2>
                        </header>

                        <div className="committee-members-grid">
                            {section.members.map((member) => (
                                <article key={member.id} className="committee-member-card">
                                    <div className="member-photo-frame">
                                        <div className="member-photo-wrap">
                                            <img
                                                src={resolveCommitteePhoto(member.photoKey, member.photo)}
                                                alt={member.name}
                                                loading="lazy"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null;
                                                    target.src = getFallbackAvatar(member.name);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* <span className="member-role-chip">Record Active</span> */}
                                    <h3 className="member-name">{member.name}</h3>
                                    <p className="member-role">{member.role}</p>
                                    <p className="member-subtitle">{member.subtitle}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <style>{`
                .committee-page {
                    padding: 3.5rem 1.2rem 5rem;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    isolation: isolate;
                    overflow: hidden;
                }

                .committee-page::before {
                    content: '';
                    position: absolute;
                    inset: -12% -8% auto;
                    height: 95%;
                    background:
                        radial-gradient(circle at 12% 10%, rgba(231, 29, 54, 0.24), transparent 42%),
                        radial-gradient(circle at 84% 12%, rgba(0, 243, 255, 0.09), transparent 34%),
                        linear-gradient(180deg, rgba(8, 8, 8, 0.1), rgba(3, 3, 3, 0.78));
                    z-index: -1;
                    pointer-events: none;
                }

                .committee-page::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: repeating-linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.04),
                        rgba(255, 255, 255, 0.04) 1px,
                        transparent 1px,
                        transparent 3px
                    );
                    opacity: 0.12;
                    z-index: -1;
                    pointer-events: none;
                }

                .committee-hero {
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto 2.7rem;
                    text-align: center;
                    border: 1px solid rgba(231, 29, 54, 0.5);
                    padding: 1.5rem 1rem 1.15rem;
                    background: linear-gradient(180deg, rgba(26, 6, 10, 0.72), rgba(8, 8, 8, 0.82));
                    box-shadow:
                        0 0 26px rgba(231, 29, 54, 0.2),
                        inset 0 0 18px rgba(231, 29, 54, 0.16);
                    animation: heroPulse 5.4s ease-in-out infinite;
                }

                .committee-eyebrow {
                    margin-bottom: 0.65rem;
                    color: var(--color-neon-blue);
                    font-family: var(--font-digital);
                    font-size: 0.74rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    text-shadow: 0 0 8px rgba(0, 243, 255, 0.45);
                }

                .committee-main-title {
                    margin: 0;
                    font-size: clamp(2.45rem, 9vw, 5.5rem);
                    line-height: 0.95;
                }

                .committee-subtext {
                    margin-top: 0.85rem;
                    color: rgba(225, 225, 225, 0.85);
                    font-family: var(--font-body);
                    letter-spacing: 0.4px;
                    font-size: 0.98rem;
                }

                .committee-sections {
                    width: 100%;
                    max-width: 1200px;
                    display: grid;
                    gap: 1.65rem;
                }

                .committee-section-card {
                    border: 1px solid rgba(231, 29,  54, 0.28);
                    background: linear-gradient(180deg, rgba(19, 19, 19, 0.84), rgba(8, 8, 8, 0.88));
                    box-shadow:
                        0 18px 35px rgba(0, 0, 0, 0.42),
                        inset 0 0 18px rgba(231, 29, 54, 0.08);
                    padding: 1.45rem;
                }

                .committee-section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.9rem;
                    margin-bottom: 1.2rem;
                    border-bottom: 1px solid rgba(231, 29, 54, 0.32);
                    padding-bottom: 0.85rem;
                }

                .committee-section-index {
                    width: 2.4rem;
                    height: 2.4rem;
                    border: 1px solid rgba(231, 29, 54, 0.7);
                    display: grid;
                    place-items: center;
                    color: var(--color-primary);
                    font-family: var(--font-digital);
                    font-size: 0.82rem;
                    box-shadow: 0 0 10px rgba(231, 29, 54, 0.28);
                }

                .committee-section-title {
                    margin: 0;
                    border-bottom: none;
                    padding-bottom: 0;
                    box-shadow: none;
                    font-size: clamp(1.3rem, 3vw, 2rem);
                }

                .committee-members-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }

                .committee-member-card {
                    position: relative;
                    text-align: center;
                    padding: 1.05rem 0.82rem 0.9rem;
                    background: linear-gradient(180deg, rgba(22, 22, 22, 0.95), rgba(9, 9, 9, 0.95));
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-left: 3px solid rgba(231, 29, 54, 0.64);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                    opacity: 0;
                    animation: dossierEnter 0.65s ease forwards;
                }

                .committee-member-card:nth-child(2) {
                    animation-delay: 0.08s;
                }

                .committee-member-card:nth-child(3) {
                    animation-delay: 0.16s;
                }

                .committee-member-card:nth-child(4) {
                    animation-delay: 0.24s;
                }

                .committee-member-card:nth-child(5) {
                    animation-delay: 0.32s;
                }

                .committee-member-card:nth-child(6) {
                    animation-delay: 0.4s;
                }

                .committee-member-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -110%;
                    width: 65%;
                    height: 100%;
                    transform: skewX(-22deg);
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.22),
                        transparent
                    );
                    transition: left 0.45s ease;
                    pointer-events: none;
                    opacity: 0.5;
                }

                .committee-member-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(231, 29, 54, 0.7);
                    box-shadow:
                        0 12px 30px rgba(0, 0, 0, 0.5),
                        0 0 18px rgba(231, 29, 54, 0.24);
                }

                .committee-member-card:hover::before {
                    left: 145%;
                }

                .member-photo-frame {
                    width: 102px;
                    height: 102px;
                    margin: 0 auto 0.82rem;
                    border-radius: 50%;
                    padding: 3px;
                    background: linear-gradient(145deg, #6b0f1f 0%, var(--color-primary) 52%, #f7c2ca 100%);
                    box-shadow: 0 0 16px rgba(231, 29, 54, 0.45);
                }

                .member-photo-wrap {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid rgba(0, 0, 0, 0.62);
                    background: #121212;
                }

                .member-photo-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(0.1) contrast(1.08);
                }

                .member-role-chip {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.18rem 0.52rem;
                    margin-bottom: 0.45rem;
                    background: rgba(0, 243, 255, 0.84);
                    color: #051018;
                    text-transform: uppercase;
                    font-family: var(--font-digital);
                    letter-spacing: 0.8px;
                    font-size: 0.62rem;
                    font-weight: 700;
                }

                .member-name {
                    font-family: var(--font-heading);
                    font-size: 1.18rem;
                    color: #f0f0f0;
                    letter-spacing: 0.4px;
                    margin-bottom: 0.2rem;
                    text-transform: none;
                }

                .member-role {
                    font-family: var(--font-digital);
                    color: rgba(231, 29, 54, 0.95);
                    text-shadow: 0 0 12px rgba(231, 29, 54, 0.35);
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 0.28rem;
                }

                .member-subtitle {
                    font-family: var(--font-body);
                    font-size: 0.86rem;
                    line-height: 1.45;
                    color: rgba(228, 228, 228, 0.86);
                }

                @keyframes heroPulse {
                    0%,
                    100% {
                        box-shadow:
                            0 0 26px rgba(231, 29, 54, 0.2),
                            inset 0 0 18px rgba(231, 29, 54, 0.16);
                    }
                    50% {
                        box-shadow:
                            0 0 36px rgba(231, 29, 54, 0.35),
                            inset 0 0 24px rgba(231, 29, 54, 0.2);
                    }
                }

                @keyframes dossierEnter {
                    0% {
                        opacity: 0;
                        transform: translateY(16px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @media (max-width: 860px) {
                    .committee-page {
                        padding-top: 2.8rem;
                    }

                    .committee-hero {
                        margin-bottom: 2.2rem;
                    }

                    .committee-section-card {
                        padding: 1.2rem;
                    }
                }

                @media (max-width: 640px) {
                    .committee-page {
                        padding: 2.5rem 0.9rem 4rem;
                    }

                    .committee-eyebrow {
                        font-size: 0.66rem;
                        letter-spacing: 1.4px;
                    }

                    .committee-main-title {
                        letter-spacing: 0;
                    }

                    .committee-subtext {
                        font-size: 0.9rem;
                    }

                    .committee-section-header {
                        gap: 0.65rem;
                    }

                    .committee-section-index {
                        width: 2.15rem;
                        height: 2.15rem;
                        font-size: 0.74rem;
                    }

                    .committee-members-grid {
                        grid-template-columns: repeat(auto-fit, minmax(154px, 1fr));
                        gap: 0.8rem;
                    }

                    .committee-member-card {
                        padding: 0.9rem 0.7rem 0.78rem;
                    }

                    .member-photo-frame {
                        width: 86px;
                        height: 86px;
                    }

                    .member-name {
                        font-size: 1.02rem;
                    }

                    .member-role {
                        font-size: 0.72rem;
                    }

                    .member-subtitle {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Committee;