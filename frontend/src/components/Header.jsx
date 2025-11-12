import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const getActiveClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header>
            <h1>📘 Study Notes Sharing Platform</h1>
            <nav>
                <Link to="/" className={getActiveClass('/')}>Home</Link>
                <Link to="/about" className={getActiveClass('/about')}>About Us</Link>
                <Link to="/feedback" className={getActiveClass('/feedback')}>Feedback</Link>
            </nav>
        </header>
    );
};

export default Header;