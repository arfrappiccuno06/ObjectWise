import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const navItems = [
        {
            path: '/',
            icon: '📷',
            label: 'Camera',
            description: 'Scan objects'
        },
        {
            path: '/search',
            icon: '🔍',
            label: 'Search',
            description: 'Find objects'
        },
        {
            path: '/community',
            icon: '👥',
            label: 'Community',
            description: 'Tips & tricks'
        }
    ];

    return (
        <nav className="top-navigation">
            {navItems.map(item => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                    <div className="nav-icon">{item.icon}</div>
                    <div className="nav-label">{item.label}</div>
                    <div className="nav-description">{item.description}</div>
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;