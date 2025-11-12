const express = require('express');
const Feedback = require('../models/FeedbackModel'); 

const router = express.Router();

// POST /api/feedback: फीडबैक सबमिट करता है
router.post('/', async (req, res) => {
    const { name, message } = req.body;
    
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required.' });
    }

    try {
        const newFeedback = new Feedback({ name, message });
        await newFeedback.save(); 
        
        res.status(201).json({ message: 'Thank you for your feedback!', feedback: newFeedback });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;