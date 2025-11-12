import React, { useState } from 'react';

const FeedbackPage = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState({ text: '', color: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !message) {
            setResponse({ text: '⚠ Please fill in all fields!', color: 'red' });
            return;
        }

        setResponse({ text: 'Sending feedback...', color: 'blue' });

        try {
            const res = await fetch('http://localhost:8080/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message: message }), 
            });

            const data = await res.json();

            if (res.ok) {
                setResponse({ text: '✅ Thank you for your feedback!', color: 'green' });
                setName('');
                setMessage('');
            } else {
                setResponse({ text: `❌ Error submitting feedback: ${data.error || 'Server issue.'}`, color: 'red' });
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            setResponse({ text: '⚠ Unable to connect to the server (Is backend running on port 8080?).', color: 'orange' });
        }
    };

    return (
        <section className="upload-section">
            <h2>💬 Share Your Feedback</h2>
            <p>Your feedback helps us make this platform better for everyone!</p>
            <form id="feedbackForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                
                <label htmlFor="feedback">Your Feedback:</label>
                <textarea 
                    id="feedback" 
                    name="feedback" 
                    rows="5" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required
                ></textarea>
                
                <button type="submit">Submit Feedback</button>
            </form>
            <p id="response" style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '15px', color: response.color }}>
                {response.text}
            </p>
        </section>
    );
};

export default FeedbackPage;