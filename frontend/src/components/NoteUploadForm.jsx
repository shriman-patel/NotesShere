import React, { useState } from 'react';

const NoteUploadForm = ({ onNoteUploadSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Uploading...');

        if (!title || !description || !category || !file) {
            setStatus("⚠ Please fill all fields and select a file!");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('noteFile', file); // 'noteFile' Multer middleware में उपयोग किया गया फ़ील्ड नाम है

        try {
            const res = await fetch('http://localhost:8080/api/notes', {
                method: 'POST',
                // FormData का उपयोग करते समय Content-Type header सेट न करें, 
                // ब्राउज़र इसे बाउंड्री के साथ अपने आप सेट कर देगा।
                body: formData, 
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('✅ Note uploaded successfully!');
                setTitle('');
                setDescription('');
                setCategory('');
                setFile(null);
                document.getElementById("file").value = '';
                // होमपेज को रीफ़्रेश करने के लिए कॉल करें
                onNoteUploadSuccess(); 
            } else {
                setStatus(`❌ Error: ${data.error || 'Failed to upload note.'}`);
            }

        } catch (error) {
            console.error("Upload Error:", error);
            setStatus('⚠ Unable to connect to the server.');
        }
    };

    return (
        <section className="upload-section">
            <h2>Upload Your Notes</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" id="title" placeholder="Enter note title" required 
                       value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" id="description" placeholder="Short description" required 
                       value={description} onChange={(e) => setDescription(e.target.value)} />
                <select id="category" required value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="BTech 1st Year">B.Tech 1st Year</option>
                    <option value="BTech 2nd Year">B.Tech 2nd Year</option>
                    <option value="BTech 3rd Year">B.Tech 3rd Year</option>
                    <option value="BTech 4th Year">B.Tech 4th Year</option>
                    <option value="Other">Other Courses</option>
                </select>
                <input type="file" id="file" accept=".pdf, image/*" required 
                       onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>{status}</p>
        </section>
    );
};

export default NoteUploadForm;