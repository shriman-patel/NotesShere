import React from 'react';
// ''''''''
const AboutPage = () => {
    return (
        <>
            <section className="about-section">
                <h2>About the Platform</h2>
                <p>
                    The <strong>Study Notes Sharing Platform</strong> is a minor project created by a group of passionate college students. 
                    We designed and developed this platform as a part of our academic journey to make learning more collaborative and accessible. 
                </p>
                <p>
                    As students, we often face difficulty in organizing and finding quality notes during exam time. 
                    To solve this, we built this platform where learners can <strong>upload, explore, and download study materials</strong> 
                    based on their academic year or course. It’s a small step towards making study resources available to everyone. 
                </p>
                <p>
                    Our mission is simple — <em>“To empower students through shared knowledge.”</em> 
                    This project is a reflection of teamwork, innovation, and a shared belief that education grows stronger when shared. 
                </p>
            </section>
            <section className="team-section">
                <h2>👩‍💻 Our Team</h2>
                <p>
                    We are a team of undergraduate students who collaborated on this project as part of our college coursework. 
                    Every section — from designing the frontend to developing the backend and connecting the database — was done by us with dedication and continuous learning. 
                </p>
                <div className="team-container">
                    <div className="team-member">
                        <p><strong>We are proud to present this platform as our collective effort.</strong></p>
                        <p>Thank you for visiting and supporting our project!</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;