import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/AboutPage';
import './style.css'; 

function App() {
  return (
    <Router>
      <Header /> 
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </main>
      <footer>
        <p>© 2025 Study Notes Sharing Platform | Designed by college students</p>
      </footer>
    </Router>
  );
}

export default App;