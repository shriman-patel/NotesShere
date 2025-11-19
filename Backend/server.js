const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

const feedbackRoutes = require('./routes/feedbackRoutes');
const notesRoutes = require('./routes/notesRoutes');

const app = express();

// Middleware
// Vite (React Frontend) default port 5173 से कनेक्शन के लिए
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept'] // Accept header for file uploads
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Form data handling

// STATICS: 'uploads' फ़ोल्डर से फ़ाइलों को एक्सेस करने की अनुमति दें
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection (MongoDB)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shrimanp305_db_user:shrimanpatel@cluster0.setmou6.mongodb.net/?appName=Cluster0';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
    res.send('Study Notes MERN Backend Running!');
});

// Server Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});