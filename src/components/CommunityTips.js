import React, { useState, useEffect } from 'react';
import { useObject } from '../services/ObjectContext';
import { cacheService } from '../services/cacheService';

const CommunityTips = ({ objectId }) => {
    const [tips, setTips] = useState([]);
    const [newTip, setNewTip] = useState({ title: '', content: '', category: 'general' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const { addCommunityTip } = useObject();

    useEffect(() => {
        loadTips();
    }, [objectId]);

    const loadTips = async () => {
        try {
            const communityTips = await cacheService.getCommunityTips();
            const objectTips = communityTips.filter(tip => tip.objectId === objectId);
            setTips(objectTips);
        } catch (error) {
            console.error('Failed to load community tips:', error);
        }
    };

    const handleSubmitTip = async (e) => {
        e.preventDefault();
        
        if (!newTip.title.trim() || !newTip.content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        const tip = {
            ...newTip,
            objectId,
            author: 'Anonymous User',
            rating: 0,
            votes: 0,
            verified: false,
            helpful: 0,
            notHelpful: 0
        };

        try {
            const savedTip = await cacheService.saveCommunityTip(tip);
            setTips(prev => [savedTip, ...prev]);
            addCommunityTip(savedTip);
            setNewTip({ title: '', content: '', category: 'general' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Failed to save tip:', error);
            alert('Failed to save tip. Please try again.');
        }
    };

    const handleVote = async (tipId, voteType) => {
        setTips(prev => prev.map(tip => {
            if (tip.id === tipId) {
                const updated = { ...tip };
                if (voteType === 'helpful') {
                    updated.helpful = (updated.helpful || 0) + 1;
                } else {
                    updated.notHelpful = (updated.notHelpful || 0) + 1;
                }
                return updated;
            }
            return tip;
        }));
    };

    const filteredAndSortedTips = tips
        .filter(tip => filter === 'all' || tip.category === filter)
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.timestamp) - new Date(a.timestamp);
                case 'oldest':
                    return new Date(a.timestamp) - new Date(b.timestamp);
                case 'helpful':
                    return (b.helpful || 0) - (a.helpful || 0);
                case 'verified':
                    return b.verified - a.verified;
                default:
                    return 0;
            }
        });

    const tipCategories = [
        { id: 'general', label: 'General Tips', icon: '📝' },
        { id: 'safety', label: 'Safety Tips', icon: '⚠️' },
        { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
        { id: 'troubleshooting', label: 'Troubleshooting', icon: '🔍' },
        { id: 'creative', label: 'Creative Uses', icon: '🎨' }
    ];

    return (
        <div className="community-tips">
            <div className="tips-header">
                <div className="tips-title">
                    <h3>Community Tips & Tricks</h3>
                    <p>Learn from the experiences of other users</p>
                </div>
                
                <button 
                    className="add-tip-btn"
                    onClick={() => setShowAddForm(true)}
                >
                    💡 Add Tip
                </button>
            </div>

            {showAddForm && (
                <div className="add-tip-overlay">
                    <div className="add-tip-form">
                        <div className="form-header">
                            <h4>Share Your Knowledge</h4>
                            <button 
                                className="close-btn"
                                onClick={() => setShowAddForm(false)}
                            >
                                X
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitTip}>
                            <div className="form-group">
                                <label>Tip Title</label>
                                <input
                                    type="text"
                                    value={newTip.title}
                                    onChange={(e) => setNewTip({...newTip, title: e.target.value})}
                                    placeholder="Give your tip a descriptive title..."
                                    maxLength={100}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={newTip.category}
                                    onChange={(e) => setNewTip({...newTip, category: e.target.value})}
                                >
                                    {tipCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Your Tip</label>
                                <textarea
                                    value={newTip.content}
                                    onChange={(e) => setNewTip({...newTip, content: e.target.value})}
                                    placeholder="Share your experience, trick, or helpful advice..."
                                    rows={4}
                                    maxLength={500}
                                />
                                <small>{newTip.content.length}/500 characters</small>
                            </div>
                            
                            <div className="form-actions">
                                <button type="button" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="primary">
                                    🤝 Share Tip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="tips-controls">
                <div className="filter-controls">
                    <label>Filter by:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Tips</option>
                        {tipCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.label.replace(/.*?\s/, '')}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="sort-controls">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="verified">Verified First</option>
                    </select>
                </div>
            </div>

            <div className="tips-list">
                {filteredAndSortedTips.length === 0 ? (
                    <div className="no-tips">
                        <div className="no-tips-icon">?</div>
                        <h4>No tips yet!</h4>
                        <p>Be the first to share your knowledge about this object.</p>
                        <button 
                            className="add-first-tip-btn"
                            onClick={() => setShowAddForm(true)}
                        >
                            💡 Add First Tip
                        </button>
                    </div>
                ) : (
                    filteredAndSortedTips.map(tip => (
                        <div key={tip.id} className="tip-card">
                            <div className="tip-header">
                                <div className="tip-meta">
                                    <span className={`tip-category ${tip.category}`}>
                                        {tipCategories.find(cat => cat.id === tip.category)?.icon} 
                                        {tipCategories.find(cat => cat.id === tip.category)?.label.replace(/.*?\s/, '')}
                                    </span>
                                    {tip.verified && (
                                        <span className="verified-badge">Expert Verified</span>
                                    )}
                                </div>
                                <span className="tip-date">
                                    {new Date(tip.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <div className="tip-content">
                                <h4 className="tip-title">{tip.title}</h4>
                                <p className="tip-text">{tip.content}</p>
                            </div>
                            
                            <div className="tip-footer">
                                <div className="tip-author">
                                    Author: {tip.author}
                                </div>
                                
                                <div className="tip-actions">
                                    <button 
                                        className="vote-btn helpful"
                                        onClick={() => handleVote(tip.id, 'helpful')}
                                    >
                                        👍 Helpful: {tip.helpful || 0}
                                    </button>
                                    <button 
                                        className="vote-btn not-helpful"
                                        onClick={() => handleVote(tip.id, 'not-helpful')}
                                    >
                                        👎 Not Helpful: {tip.notHelpful || 0}
                                    </button>
                                    <button className="report-btn">
                                        🚨 Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="community-stats">
                <div className="stats-grid">
                    <div className="stat-card">
                        <h4>{tips.length}</h4>
                        <p>Community Tips</p>
                    </div>
                    <div className="stat-card">
                        <h4>{tips.filter(tip => tip.verified).length}</h4>
                        <p>Expert Verified</p>
                    </div>
                    <div className="stat-card">
                        <h4>{tips.reduce((sum, tip) => sum + (tip.helpful || 0), 0)}</h4>
                        <p>Helpful Votes</p>
                    </div>
                </div>
            </div>

            <div className="expert-section">
                <div className="expert-header">
                    <h4>Want Expert Verification?</h4>
                    <p>Submit your tips for review by verified experts in the field</p>
                </div>
                <div className="expert-benefits">
                    <ul>
                        <li>Get expert verification badge</li>
                        <li>Higher visibility in search results</li>
                        <li>Build your reputation in the community</li>
                        <li>Help others with verified knowledge</li>
                    </ul>
                    <button className="expert-submit-btn">
                        🎯 Submit for Expert Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityTips;