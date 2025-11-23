import React, { useState, useEffect, useCallback } from 'react';
import NoteUploadForm from '../components/NoteUploadForm';
import NoteCard from '../components/NoteCard';

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                search: searchTerm,
                category: filterCategory
            }).toString();

            const res = await fetch(`http://localhost:8080/api/notes?${query}`);
            const data = await res.json();
            
            if (res.ok) {
                setNotes(data);
            } else {
                console.error("Failed to fetch notes:", data.error);
            }
        } catch (error) {
            console.error("Network error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filterCategory]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleNoteDeleteSuccess = (deletedNoteId) => {
        // notes राज्य से उस नोट को फ़िल्टर करके हटा दें जिसकी ID deletedNoteId है
        setNotes(prevNotes => prevNotes.filter(note => note._id !== deletedNoteId));
        alert('नोट सफलतापूर्वक डिलीट हो गया!');
    };

    return (
        <>
            <NoteUploadForm onNoteUploadSuccess={fetchNotes} />

            <section className="search-filter">
                <h2>Find Notes</h2>
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search by title..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    id="filterCategory"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="all">Filter by Category (All)</option>
                    <option value="BTech 1st Year">B.Tech 1st Year</option>
                    <option value="BTech 2nd Year">B.Tech 2nd Year</option>
                    <option value="BTech 3rd Year">B.Tech 3rd Year</option>
                    <option value="BTech 4th Year">B.Tech 4th Year</option>
                    <option value="Other">Other Courses</option>
                </select>
                {/* Search/Filter logic is triggered automatically via useEffect/fetchNotes */}
            </section>

            <section className="notes-section">
                <h2>Available Notes</h2>
                <div id="notesContainer" className="notes-container">
                    {loading ? (
                        <p style={{ width: '100%', textAlign: 'center' }}>Loading notes...</p>
                    ) : notes.length > 0 ? (
                        notes.map(note => (
                            <NoteCard
                             key={note._id} 
                             note={note}
                             onDeleteSuccess={handleNoteDeleteSuccess}
                             />
                        ))
                    ) : (
                        <p style={{ width: '100%', textAlign: 'center' }}>
                            {searchTerm || filterCategory !== 'all' ? "No results found." : "No notes uploaded yet."}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default HomePage;