const Footer = () => {

    return (
        <footer style={{
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            position: 'relative',
            backgroundColor: 'rgba(5, 5, 5, 0.95)',
            width: '100%',
            marginTop: 'auto',
            zIndex: 10,
            overflow: 'hidden'
        }}>
            <style>
                {`
                .footer-rail {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
                    box-shadow: 0 0 10px var(--color-primary);
                }
                .footer-rail-top { top: 0; }
                
                .footer-content {
                    max-width: 1000px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    position: relative;
                    z-index: 2;
                    justify-items: center;
                    text-align: center;
                }

                .footer-section h4 {
                    color: var(--color-primary);
                    font-family: var(--font-stranger);
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    letter-spacing: 2px;
                    text-shadow: 0 0 8px var(--color-primary);
                }

                .footer-link {
                    display: block;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 0.5rem;
                    transition: all 0.3s ease;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                }

                .footer-link:hover {
                    color: #fff;
                    text-shadow: 0 0 8px rgba(231, 29, 54, 0.6);
                    transform: translateX(5px);
                }

                .social-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border: 1px solid rgba(231, 29, 54, 0.3);
                    border-radius: 4px;
                    margin: 0 0.4rem;
                    color: var(--color-primary);
                    font-size: 0.7rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .social-icon:hover {
                    background: var(--color-primary);
                    color: #000;
                    box-shadow: 0 0 15px var(--color-primary);
                    transform: translateY(-3px);
                }

                .copyright {
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    text-align: center;
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 0.7rem;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }
                `}
            </style>

            <div className="footer-rail footer-rail-top" />

            <div className="footer-content">
                <div className="footer-section">
                    <h4 className="stranger-text" style={{ color: 'var(--color-primary)', border: 'none', fontSize: '1rem' }}>IEEE PROCOMM</h4>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: '1.5' }}>
                    Empowering communication excellence through innovation, technology, and collaboration <br /> Connecting Ideas. Inspiring Innovation.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="stranger-text" style={{ color: 'var(--color-primary)', border: 'none', fontSize: '1rem' }}>English Literary Club</h4>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: '1.5' }}>
                        Nurturing creativity, expression, and the power of words. <br /> Literary Brilliance – Infinite Spark!
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="stranger-text" style={{ color: 'var(--color-primary)', border: 'none', fontSize: '1rem' }}>Connect</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                        <a 
                            href="https://www.instagram.com/ieee.english_literary.sec?igsh=MWFubGw0MXg4YnZhbQ==" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon"
                            style={{ textDecoration: 'none' }}
                        >
                            IG
                        </a> 
                        <a 
                            href="https://www.linkedin.com/company/ssec-ieee-procomm-society/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon"
                            style={{ textDecoration: 'none' }}
                        >
                            LI
                        </a>
                     </div>
                </div>
            </div>

            <div className="copyright">
                © IEEE PROCOMM AND ELC 
            </div>
        </footer>
    );
};

export default Footer;