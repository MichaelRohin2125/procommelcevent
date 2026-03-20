const About = () => {
    return (
        <div className="about-page" style={{ padding: '4rem clamp(1rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <section className="title-neon-frame">
                <p className="title-neon-eyebrow">Hawkins Public Archive // Profile Transmission: Active</p>
                <h1 className="stranger-title committee-like-title title-neon-heading">About Us</h1>
                <p className="title-neon-subtext">Classified details recovered from the upside down signal.</p>
            </section>

            <div className="hawkins-container about-container" style={{ maxWidth: '800px', width: '100%' }}>
                <section className="about-block" style={{ marginBottom: '4rem' }}>
                    <h2 className="stranger-section-title">
                        IEEE PROCOMM
                    </h2>
                    <p className="stranger-text" style={{ marginBottom: '1.5rem' }}>
                        The IEEE Professional Communication Society (IEEE ProComm) is a professional society of the IEEE. Its primary goals include helping engineers and technical writers to pursue further education and research in their fields, in addition to development of standards in technical communication. The society runs the annual IEEE International Professional Communication Conference, known as ProComm.
                    </p>
                    <p className="stranger-text">
                        The society states on its website that its field of interest includes "the study, preparation, production, delivery, use, improvement, and promotion of human communication in all media in engineering and other technical and professional environments". Its mission, related to this field, is to "foster a community dedicated to understanding and promoting effective communication in engineering, scientific, and other technical environments".
                    </p>
                </section>

                <section className="about-block">
                    <h2 className="stranger-section-title">
                        ENGLISH LITERACY CLUB
                    </h2>
                    <p className="stranger-text" style={{ marginBottom: '1.5rem' }}>
                        The English Literacy Club (ELC) is a student-run organization that aims to enhance the English language skills of its members and the broader student community. The club typically organizes a range of activities, including workshops, seminars, reading groups, and cultural events, all designed to promote proficiency in English.
                    </p>
                    <p className="stranger-text">
                        The ELC provides a platform for students to practice their speaking, listening, reading, and writing skills in English through interactive sessions and peer-to-peer learning. By fostering a supportive environment, the English Literacy Club helps students improve their communication skills, which are essential for academic success and future career opportunities in a globalized world.
                    </p>
                </section>
            </div>

            <style>{`
                .about-page {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .about-page {
                        padding-top: 3rem !important;
                        padding-bottom: 3rem !important;
                    }

                    .about-container {
                        padding: 1.2rem !important;
                    }

                    .about-block {
                        margin-bottom: 2.3rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .about-container {
                        padding: 1rem !important;
                    }

                    .about-page .stranger-section-title {
                        font-size: 1.25rem !important;
                        margin-bottom: 0.95rem !important;
                    }

                    .about-page .stranger-text {
                        font-size: 0.95rem !important;
                        line-height: 1.55;
                    }
                }
            `}</style>
        </div>
    );
};

export default About;
