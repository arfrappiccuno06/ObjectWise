import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useObject } from '../services/ObjectContext';
import InstructionViewer from './InstructionViewer';
import SafetyWarnings from './SafetyWarnings';
import CommunityTips from './CommunityTips';

const ObjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentObject, confidence } = useObject();
    const [activeTab, setActiveTab] = useState('instructions');
    const [showAllSteps, setShowAllSteps] = useState(false);

    useEffect(() => {
        if (!currentObject) {
            navigate('/');
        }
    }, [currentObject, navigate]);

    if (!currentObject) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading object details...</p>
            </div>
        );
    }

    const tabs = [
        { id: 'instructions', label: 'Instructions', icon: '📋' },
        { id: 'safety', label: 'Safety', icon: '⚠️' },
        { id: 'tips', label: 'Tips', icon: '💡' },
        { id: 'info', label: 'Info', icon: 'ℹ️' }
    ];

    return (
        <div className="object-details">
            <div className="object-header">
                <button 
                    className="back-btn"
                    onClick={() => navigate('/')}
                >
                    ← Back
                </button>
                
                <div className="object-info">
                    <div className="object-image-container">
                        <img 
                            src={currentObject.image || '/placeholder-object.png'} 
                            alt={currentObject.name}
                            className="object-image"
                        />
                        <div className="confidence-badge">
                            {confidence}% match
                        </div>
                    </div>
                    
                    <div className="object-meta">
                        <h1 className="object-name">{currentObject.name}</h1>
                        <span className="object-category">{currentObject.category}</span>
                        <div className="difficulty-indicator">
                            <span className={`difficulty ${currentObject.difficulty?.toLowerCase()}`}>
                                {currentObject.difficulty} Level
                            </span>
                            <span className="time-estimate">
                                Time: {currentObject.timeEstimate || '5-10 min'}
                            </span>
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
                        <span className="tab-label">{tab.label.replace(/.*?\s/, '')}</span>
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'instructions' && (
                    <InstructionViewer 
                        object={currentObject}
                        showAllSteps={showAllSteps}
                        onToggleSteps={() => setShowAllSteps(!showAllSteps)}
                    />
                )}
                
                {activeTab === 'safety' && (
                    <SafetyWarnings 
                        object={currentObject}
                    />
                )}
                
                {activeTab === 'tips' && (
                    <CommunityTips 
                        objectId={currentObject.id}
                    />
                )}
                
                {activeTab === 'info' && (
                    <div className="object-info-tab">
                        <div className="info-section">
                            <h3>About This Object</h3>
                            <p>{currentObject.description}</p>
                        </div>

                        <div className="info-section">
                            <h3>Details</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Category:</span>
                                    <span className="detail-value">{currentObject.category}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Common Uses:</span>
                                    <span className="detail-value">{currentObject.commonUses?.join(', ')}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Materials:</span>
                                    <span className="detail-value">{currentObject.materials?.join(', ')}</span>
                                </div>
                                {currentObject.brand && (
                                    <div className="detail-item">
                                        <span className="detail-label">Brand:</span>
                                        <span className="detail-value">{currentObject.brand}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>Maintenance</h3>
                            <ul>
                                {currentObject.maintenance?.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="info-section">
                            <h3>Storage</h3>
                            <p>{currentObject.storage}</p>
                        </div>

                        {currentObject.lifespan && (
                            <div className="info-section">
                                <h3>Expected Lifespan</h3>
                                <p>{currentObject.lifespan}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="action-buttons">
                <button className="action-btn secondary">
                    📤 Share
                </button>
                <button className="action-btn secondary">
                    🚨 Report Error
                </button>
                <button className="action-btn primary">
                    💾 Save to Library
                </button>
            </div>
        </div>
    );
};

export default ObjectDetails;