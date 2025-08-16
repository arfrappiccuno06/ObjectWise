import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cacheService } from '../services/cacheService';

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('tips');
    const [allTips, setAllTips] = useState([]);
    const [featuredTips, setFeaturedTips] = useState([]);
    const [topContributors, setTopContributors] = useState([]);
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        loadCommunityData();
    }, []);

    const loadCommunityData = async () => {
        try {
            const tips = await cacheService.getCommunityTips();
            setAllTips(tips);
            
            const featured = tips
                .filter(tip => tip.verified || (tip.helpful || 0) >= 10)
                .sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
                .slice(0, 5);
            setFeaturedTips(featured);

            const contributors = calculateTopContributors(tips);
            setTopContributors(contributors);

            const stats = calculateUserStats(tips);
            setUserStats(stats);
        } catch (error) {
            console.error('Failed to load community data:', error);
        }
    };

    const calculateTopContributors = (tips) => {
        const authorStats = {};
        
        tips.forEach(tip => {
            if (!authorStats[tip.author]) {
                authorStats[tip.author] = {
                    name: tip.author,
                    tipCount: 0,
                    totalHelpful: 0,
                    verifiedTips: 0
                };
            }
            
            authorStats[tip.author].tipCount++;
            authorStats[tip.author].totalHelpful += (tip.helpful || 0);
            if (tip.verified) authorStats[tip.author].verifiedTips++;
        });

        return Object.values(authorStats)
            .sort((a, b) => b.totalHelpful - a.totalHelpful)
            .slice(0, 10);
    };

    const calculateUserStats = (tips) => {
        return {
            totalTips: tips.length,
            totalHelpfulVotes: tips.reduce((sum, tip) => sum + (tip.helpful || 0), 0),
            verifiedTips: tips.filter(tip => tip.verified).length,
            categories: [...new Set(tips.map(tip => tip.category))].length
        };
    };

    const tabs = [
        { id: 'tips', label: 'Latest Tips', icon: '💡' },
        { id: 'featured', label: 'Featured', icon: '⭐' },
        { id: 'contributors', label: 'Top Contributors', icon: '👑' },
        { id: 'stats', label: 'Community Stats', icon: '📊' }
    ];

    return (
        <div className="community-page">
            <div className="community-header">
                <h1>Community Hub</h1>
                <p>Connect, learn, and share knowledge with fellow ObjectWise users</p>
            </div>

            <div className="community-highlights">
                <div className="highlight-cards">
                    <div className="highlight-card">
                        <div className="highlight-icon">💡</div>
                        <div className="highlight-content">
                            <h3>{userStats.totalTips || 0}</h3>
                            <p>Community Tips</p>
                        </div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-icon">✅</div>
                        <div className="highlight-content">
                            <h3>{userStats.verifiedTips || 0}</h3>
                            <p>Expert Verified</p>
                        </div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-icon">👍</div>
                        <div className="highlight-content">
                            <h3>{userStats.totalHelpfulVotes || 0}</h3>
                            <p>Helpful Votes</p>
                        </div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-icon">📂</div>
                        <div className="highlight-content">
                            <h3>{userStats.categories || 0}</h3>
                            <p>Categories</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tab-navigation">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'tips' && (
                    <div className="latest-tips">
                        <div className="section-header">
                            <h3>🆕 Latest Community Tips</h3>
                            <p>Fresh insights from our community members</p>
                        </div>
                        
                        {allTips.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">💭</div>
                                <h4>No tips yet!</h4>
                                <p>Be the first to share your knowledge with the community.</p>
                                <Link to="/" className="start-sharing-btn">
                                    💡 Start Sharing Tips
                                </Link>
                            </div>
                        ) : (
                            <div className="tips-feed">
                                {allTips.slice(0, 20).map(tip => (
                                    <div key={tip.id} className="tip-feed-card">
                                        <div className="tip-header">
                                            <div className="tip-meta">
                                                <span className="tip-author">👤 {tip.author}</span>
                                                <span className="tip-date">
                                                    {new Date(tip.timestamp).toLocaleDateString()}
                                                </span>
                                                {tip.verified && (
                                                    <span className="verified-badge">Verified</span>
                                                )}
                                            </div>
                                            <span className="tip-category">{tip.category}</span>
                                        </div>
                                        
                                        <div className="tip-content">
                                            <h4>{tip.title}</h4>
                                            <p>{tip.content}</p>
                                        </div>
                                        
                                        <div className="tip-engagement">
                                            <span className="helpful-count">Helpful: {tip.helpful || 0}</span>
                                            <span className="not-helpful-count">👎 {tip.notHelpful || 0}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'featured' && (
                    <div className="featured-tips">
                        <div className="section-header">
                            <h3>Featured Tips</h3>
                            <p>High-quality tips verified by experts or highly rated by the community</p>
                        </div>
                        
                        <div className="featured-grid">
                            {featuredTips.map(tip => (
                                <div key={tip.id} className="featured-tip-card">
                                    <div className="featured-badge">Featured</div>
                                    <div className="tip-content">
                                        <h4>{tip.title}</h4>
                                        <p>{tip.content}</p>
                                    </div>
                                    <div className="tip-footer">
                                        <span className="tip-author">👤 {tip.author}</span>
                                        <div className="tip-stats">
                                            <span>Helpful: {tip.helpful || 0}</span>
                                            {tip.verified && <span>Verified</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'contributors' && (
                    <div className="top-contributors">
                        <div className="section-header">
                            <h3>Top Contributors</h3>
                            <p>Recognizing our most helpful community members</p>
                        </div>
                        
                        <div className="contributors-leaderboard">
                            {topContributors.map((contributor, index) => (
                                <div key={contributor.name} className="contributor-card">
                                    <div className="contributor-rank">
                                        <span className="rank-number">#{index + 1}</span>
                                        {index === 0 && <span className="rank-crown">👑</span>}
                                        {index === 1 && <span className="rank-medal">🥈</span>}
                                        {index === 2 && <span className="rank-medal">🥉</span>}
                                    </div>
                                    
                                    <div className="contributor-info">
                                        <h4>{contributor.name}</h4>
                                        <div className="contributor-stats">
                                            <span>Tips: {contributor.tipCount}</span>
                                            <span>Helpful: {contributor.totalHelpful}</span>
                                            {contributor.verifiedTips > 0 && (
                                                <span>Verified: {contributor.verifiedTips}</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="contributor-score">
                                        {contributor.totalHelpful}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="community-stats">
                        <div className="section-header">
                            <h3>Community Statistics</h3>
                            <p>Insights into our growing community</p>
                        </div>
                        
                        <div className="stats-dashboard">
                            <div className="stats-section">
                                <h4>📈 Growth Metrics</h4>
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <span className="stat-value">{userStats.totalTips || 0}</span>
                                        <span className="stat-label">Total Tips Shared</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{userStats.verifiedTips || 0}</span>
                                        <span className="stat-label">Expert Verified</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{topContributors.length}</span>
                                        <span className="stat-label">Active Contributors</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{userStats.categories || 0}</span>
                                        <span className="stat-label">Categories Covered</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="stats-section">
                                <h4>💫 Engagement</h4>
                                <div className="engagement-stats">
                                    <div className="engagement-item">
                                        <span className="engagement-icon">👍</span>
                                        <div className="engagement-info">
                                            <span className="engagement-value">{userStats.totalHelpfulVotes || 0}</span>
                                            <span className="engagement-label">Helpful Votes</span>
                                        </div>
                                    </div>
                                    <div className="engagement-item">
                                        <span className="engagement-icon">✅</span>
                                        <div className="engagement-info">
                                            <span className="engagement-value">
                                                {userStats.totalTips > 0 ? Math.round((userStats.verifiedTips / userStats.totalTips) * 100) : 0}%
                                            </span>
                                            <span className="engagement-label">Verification Rate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="community-actions">
                <div className="action-cards">
                    <div className="action-card">
                        <h4>Share Your Expertise</h4>
                        <p>Help others by sharing tips and tricks you've learned</p>
                        <Link to="/" className="action-btn">💡 Start Contributing</Link>
                    </div>
                    
                    <div className="action-card">
                        <h4>Discover Objects</h4>
                        <p>Explore our growing database of objects and instructions</p>
                        <Link to="/search" className="action-btn">📋 Browse Database</Link>
                    </div>
                    
                    <div className="action-card">
                        <h4>Identify Objects</h4>
                        <p>Use your camera to identify objects and get instructions</p>
                        <Link to="/" className="action-btn">📷 Use Camera</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;