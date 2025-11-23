import React from 'react';

// प्रॉप्स में onDeleteSuccess को जोड़ें
const NoteCard = ({ note, onDeleteSuccess }) => { 
// यहाँ हमने 'onDeleteSuccess' को जोड़ा है
    
    // बैकएंड द्वारा दी गई filePath का उपयोग करें
    const fileDownloadUrl = `http://localhost:8080/${note.filePath.replace(/\\/g, '/')}`;
    
    // ब्राउज़र में सीधे फ़ाइल को प्रीव्यू करने के लिए
    const previewNote = () => {
        window.open(fileDownloadUrl, "_blank");
    };

   // NoteCard.js (handleDelete फ़ंक्शन)

    const handleDelete = async () => {
        if (!window.confirm(`क्या आप वाकई नोट "${note.title}" को डिलीट करना चाहते हैं?`)) {
            return; 
        }

        try {
            const response = await fetch(`http://localhost:8080/api/notes/${note._id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                // डिलीट सफल होने पर (स्टेटस 200)
                onDeleteSuccess(note._id); 
            } else {
                // 💡 सुधार: JSON Error को संभालने के लिए यहाँ कोड बदला गया है
                
                // 1. प्रतिक्रिया (response) को टेक्स्ट के रूप में पढ़ें
                const responseText = await response.text();
                
                let errorMessage = `डिलीट करने में त्रुटि: सर्वर स्टेटस ${response.status} (${response.statusText})`;
                
                // 2. यदि प्रतिक्रिया खाली नहीं है, तो JSON को पार्स करने का प्रयास करें
                if (responseText) {
                    try {
                        const errorData = JSON.parse(responseText);
                        errorMessage = `नोट डिलीट करने में त्रुटि: ${errorData.error || errorData.message || 'Unknown error'}`;
                    } catch (e) {
                        // यदि पार्सिंग विफल होती है (जैसे कि प्लेन टेक्स्ट/HTML मिलता है)
                        errorMessage = `डिलीट करने में त्रुटि: अमान्य सर्वर प्रतिक्रिया। स्टेटस: ${response.status}`;
                    }
                }
                
                // 3. अंतिम त्रुटि संदेश दिखाएँ
                alert(errorMessage);
            }
        } catch (error) {
            console.error("डिलीट ऑपरेशन विफल:", error);
            alert("सर्वर से कनेक्ट करने में विफल।");
        }
    };


    return (
        <div className="note-card">
            {/* ... अन्य कोड ... */}
            <div className="note-actions">
                <button className="preview-btn" onClick={previewNote}>Preview</button>
                <a href={fileDownloadUrl} download={note.title}>
                    <button className="download-btn">Download</button>
                </a>
                
                <button 
                    className="delete-btn" 
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteCard;