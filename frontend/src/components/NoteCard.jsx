import React from 'react';

const NoteCard = ({ note }) => {
    // बैकएंड द्वारा दी गई filePath का उपयोग करें
    const fileDownloadUrl = `http://localhost:8080/${note.filePath.replace(/\\/g, '/')}`;
    
    // ब्राउज़र में सीधे फ़ाइल को प्रीव्यू करने के लिए
    const previewNote = () => {
        window.open(fileDownloadUrl, "_blank");
    };

    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p><strong>Description:</strong> {note.description}</p>
            <p><strong>Category:</strong> {note.category}</p>
            <p><strong>ID:</strong> {note._id}</p>
            <div className="note-actions">
                <button className="preview-btn" onClick={previewNote}>Preview</button>
                <a href={fileDownloadUrl} download={note.title}>
                    <button className="download-btn">Download</button>
                </a>
            </div>
        </div>
    );
};

export default NoteCard;