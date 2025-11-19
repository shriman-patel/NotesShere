const express = require('express');
const Note = require('../models/NoteModel');
const upload = require('../middleware/upload'); // Multer middleware import

const router = express.Router();

// POST /api/notes: नोट अपलोड करें और DB में सेव करें
router.post('/', upload.single('noteFile'), async (req, res) => {
    // Multer फ़ाइल को req.file में और अन्य फ़ील्ड को req.body में डालेगा
    const { title, description, category } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ error: 'Note file is required.' });
    }

    if (!title || !description || !category) {
        return res.status(400).json({ error: 'Title, description, and category are required.' });
    }

    try {
        const newNote = new Note({
            title,
            description,
            category,
            filePath: req.file.path // फ़ाइल का पथ DB में सेव करें
        });
        await newNote.save(); 
        
        res.status(201).json({ message: 'Note uploaded successfully!', note: newNote });
    } catch (error) {
        console.error("Error uploading note:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/notes: सभी नोट्स या सर्च/फ़िल्टर किए गए नोट्स प्राप्त करें
router.get('/', async (req, res) => {
    const { search, category } = req.query;
    let filter = {};

    // सर्च लॉजिक
    if (search) {
        filter.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    
    // फ़िल्टर लॉजिक
    if (category && category !== 'all') {
        filter.category = category;
    }

    try {
        const notes = await Note.find(filter).sort({ uploadedAt: -1 });
        // फ़ाइल नाम/पथ को फ्रंटएंड पर वापस भेजें
        res.status(200).json(notes); 
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;