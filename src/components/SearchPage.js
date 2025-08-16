import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useObject } from '../services/ObjectContext';
import { objectDatabase, objectCategories } from '../data/objectDatabase';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [results, setResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const { identifiedObjects } = useObject();

    useEffect(() => {
        if (searchQuery.trim()) {
            performSearch(searchQuery);
        } else {
            setResults([]);
        }
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        loadRecentSearches();
    }, []);

    const loadRecentSearches = () => {
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(recent.slice(0, 5));
    };

    const saveRecentSearch = (query) => {
        if (!query.trim()) return;
        
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const filtered = recent.filter(item => item.toLowerCase() !== query.toLowerCase());
        const updated = [query, ...filtered].slice(0, 10);
        
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        setRecentSearches(updated.slice(0, 5));
    };

    const performSearch = (query) => {
        let filtered = objectDatabase.filter(obj => {
            const matchesQuery = 
                obj.name.toLowerCase().includes(query.toLowerCase()) ||
                obj.category.toLowerCase().includes(query.toLowerCase()) ||
                obj.description.toLowerCase().includes(query.toLowerCase()) ||
                obj.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
            
            const matchesCategory = selectedCategory === 'all' || 
                obj.category.toLowerCase() === selectedCategory.toLowerCase();
            
            return matchesQuery && matchesCategory;
        });

        setResults(filtered);
        saveRecentSearch(query);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            performSearch(searchQuery);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setResults([]);
    };

    const handleRecentSearch = (query) => {
        setSearchQuery(query);
        performSearch(query);
    };

    const getSafetyLevelColor = (level) => {
        const colors = {
            low: '#10B981',
            medium: '#F59E0B', 
            high: '#EF4444',
            critical: '#DC2626'
        };
        return colors[level] || colors.medium;
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h1>Search Objects</h1>
                <p>Find instructions for any object in our database</p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for any object..."
                        className="search-input"
                    />
                    {searchQuery && (
                        <button 
                            type="button" 
                            onClick={clearSearch}
                            className="clear-btn"
                        >
                            X
                        </button>
                    )}
                    <button type="submit" className="search-btn">
                        🔍 SEARCH
                    </button>
                </div>
            </form>

            <div className="category-filter">
                <h3>Filter by Category</h3>
                <div className="category-buttons">
                    <button
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    {objectCategories.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.name)}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {!searchQuery && recentSearches.length > 0 && (
                <div className="recent-searches">
                    <h3>🕒 Recent Searches</h3>
                    <div className="recent-list">
                        {recentSearches.map((search, index) => (
                            <button
                                key={index}
                                className="recent-search-btn"
                                onClick={() => handleRecentSearch(search)}
                            >
                                {search}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {!searchQuery && identifiedObjects.length > 0 && (
                <div className="recent-identifications">
                    <h3>📸 Recently Identified</h3>
                    <div className="recent-objects-grid">
                        {identifiedObjects.slice(0, 6).map((obj, index) => (
                            <Link 
                                key={index} 
                                to={`/object/${obj.id}`}
                                className="recent-object-card"
                            >
                                <div className="object-image-placeholder">
                                    {obj.category.slice(0, 3).toUpperCase()}
                                </div>
                                <h4>{obj.name}</h4>
                                <span className="object-category">{obj.category}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {searchQuery && results.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">?</div>
                    <h3>No results found</h3>
                    <p>Try searching with different keywords or check the spelling</p>
                    <div className="search-suggestions">
                        <h4>Suggestions:</h4>
                        <ul>
                            <li>Use simpler, more general terms</li>
                            <li>Check category filters</li>
                            <li>Try searching for the object's purpose</li>
                            <li>Submit a request for this object to be added</li>
                        </ul>
                    </div>
                    <button className="request-object-btn">
                        📨 Request This Object
                    </button>
                </div>
            )}

            {results.length > 0 && (
                <div className="search-results">
                    <div className="results-header">
                        <h3>Search Results ({results.length})</h3>
                    </div>
                    
                    <div className="results-grid">
                        {results.map(obj => (
                            <Link 
                                key={obj.id} 
                                to={`/object/${obj.id}`}
                                className="result-card"
                            >
                                <div className="result-image">
                                    <div className="category-icon">
                                        {obj.category.slice(0, 3).toUpperCase()}
                                    </div>
                                    <div className="safety-indicator">
                                        <div 
                                            className="safety-dot"
                                            style={{ backgroundColor: getSafetyLevelColor(obj.safetyLevel) }}
                                        ></div>
                                    </div>
                                </div>
                                
                                <div className="result-content">
                                    <h4 className="result-title">{obj.name}</h4>
                                    <span className="result-category">{obj.category}</span>
                                    <p className="result-description">{obj.description}</p>
                                    
                                    <div className="result-meta">
                                        <span className="difficulty-badge">{obj.difficulty}</span>
                                        <span className="time-badge">Time: {obj.timeEstimate}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="search-categories-overview">
                <h3>Browse by Category</h3>
                <div className="categories-grid">
                    {objectCategories.map(category => (
                        <div key={category.id} className="category-overview-card">
                            <div className="category-header">
                                <span className="category-icon-large">{category.icon}</span>
                                <div>
                                    <h4>{category.name}</h4>
                                    <p>{category.description}</p>
                                </div>
                            </div>
                            <div className="category-stats">
                                <span>{category.objects.length} objects</span>
                                <button
                                    onClick={() => setSelectedCategory(category.name)}
                                    className="browse-category-btn"
                                >
                                    📞 Browse →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;