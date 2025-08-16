import React, { useState, useRef } from 'react';
import { fabric } from 'fabric';

const InstructionViewer = ({ object, showAllSteps, onToggleSteps }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showAnnotations, setShowAnnotations] = useState(true);
    const canvasRef = useRef(null);

    const instructions = object?.instructions || [];
    const totalSteps = instructions.length;

    const handleStepNavigation = (direction) => {
        if (direction === 'next' && currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else if (direction === 'prev' && currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const createAnnotationCanvas = (step) => {
        if (!step.annotations || !canvasRef.current) return;

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: 400,
            height: 300,
            backgroundColor: 'transparent'
        });

        step.annotations.forEach(annotation => {
            switch (annotation.type) {
                case 'arrow':
                    const arrow = new fabric.Path(
                        'M 10 10 L 30 10 L 25 5 M 30 10 L 25 15',
                        {
                            left: annotation.x,
                            top: annotation.y,
                            stroke: '#ff4444',
                            strokeWidth: 3,
                            fill: '',
                            selectable: false
                        }
                    );
                    canvas.add(arrow);
                    break;
                
                case 'highlight':
                    const highlight = new fabric.Circle({
                        left: annotation.x,
                        top: annotation.y,
                        radius: annotation.radius || 20,
                        fill: 'rgba(255, 255, 0, 0.3)',
                        stroke: '#ffcc00',
                        strokeWidth: 2,
                        selectable: false
                    });
                    canvas.add(highlight);
                    break;
                
                case 'text':
                    const text = new fabric.Text(annotation.text, {
                        left: annotation.x,
                        top: annotation.y,
                        fontSize: 14,
                        fill: '#333',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        selectable: false
                    });
                    canvas.add(text);
                    break;
            }
        });
    };

    return (
        <div className="instruction-viewer">
            {object.requiredTools && object.requiredTools.length > 0 && (
                <div className="required-tools">
                    <h3>Required Tools</h3>
                    <div className="tools-grid">
                        {object.requiredTools.map((tool, index) => (
                            <div key={index} className="tool-item">
                                <span className="tool-icon">TOOL</span>
                                <span className="tool-name">{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {object.materials && object.materials.length > 0 && (
                <div className="required-materials">
                    <h3>Materials Needed</h3>
                    <div className="materials-list">
                        {object.materials.map((material, index) => (
                            <div key={index} className="material-item">
                                <span className="material-icon">MAT</span>
                                <span className="material-name">{material}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="instructions-container">
                <div className="instruction-header">
                    <h3>Step-by-Step Instructions</h3>
                    <div className="instruction-controls">
                        <button
                            className="toggle-btn"
                            onClick={() => setShowAnnotations(!showAnnotations)}
                        >
                            {showAnnotations ? '🚫 Hide Guides' : '📋 Show Guides'}
                        </button>
                        <button
                            className="toggle-btn"
                            onClick={onToggleSteps}
                        >
                            {showAllSteps ? '📎 Step View' : '📋 List View'}
                        </button>
                    </div>
                </div>

                {showAllSteps ? (
                    <div className="all-steps-view">
                        {instructions.map((step, index) => (
                            <div key={index} className="step-card">
                                <div className="step-number">Step {index + 1}</div>
                                <div className="step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                    
                                    {step.image && (
                                        <div className="step-image-container">
                                            <img 
                                                src={step.image} 
                                                alt={`Step ${index + 1}`}
                                                className="step-image"
                                            />
                                        </div>
                                    )}

                                    {step.tips && step.tips.length > 0 && (
                                        <div className="step-tips">
                                            <strong>Tips:</strong>
                                            <ul>
                                                {step.tips.map((tip, tipIndex) => (
                                                    <li key={tipIndex}>{tip}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {step.warnings && step.warnings.length > 0 && (
                                        <div className="step-warnings">
                                            <strong>Caution:</strong>
                                            <ul>
                                                {step.warnings.map((warning, warnIndex) => (
                                                    <li key={warnIndex}>{warning}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="single-step-view">
                        {instructions.length > 0 && (
                            <>
                                <div className="step-progress">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill"
                                            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">
                                        Step {currentStep + 1} of {totalSteps}
                                    </span>
                                </div>

                                <div className="current-step">
                                    <div className="step-header">
                                        <h4>{instructions[currentStep].title}</h4>
                                        <div className="step-meta">
                                            <span className="step-time">
                                                Time: {instructions[currentStep].timeEstimate || '2-3 min'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="step-content">
                                        <p className="step-description">
                                            {instructions[currentStep].description}
                                        </p>

                                        {instructions[currentStep].image && (
                                            <div className="step-visual">
                                                <img 
                                                    src={instructions[currentStep].image}
                                                    alt={`Step ${currentStep + 1}`}
                                                    className="step-image"
                                                />
                                                {showAnnotations && (
                                                    <canvas 
                                                        ref={canvasRef}
                                                        className="annotation-canvas"
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {instructions[currentStep].substeps && (
                                            <div className="substeps">
                                                <h5>Detailed Steps:</h5>
                                                <ol>
                                                    {instructions[currentStep].substeps.map((substep, index) => (
                                                        <li key={index}>{substep}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}

                                        {instructions[currentStep].tips && (
                                            <div className="step-tips">
                                                <h5>Pro Tips:</h5>
                                                <ul>
                                                    {instructions[currentStep].tips.map((tip, index) => (
                                                        <li key={index}>{tip}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="step-navigation">
                                    <button
                                        className="nav-btn secondary"
                                        onClick={() => handleStepNavigation('prev')}
                                        disabled={currentStep === 0}
                                    >
                                        ← Previous
                                    </button>
                                    
                                    <div className="step-indicators">
                                        {instructions.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                                                onClick={() => setCurrentStep(index)}
                                            >
                                                {index < currentStep ? '✓' : index + 1}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <button
                                        className="nav-btn primary"
                                        onClick={() => handleStepNavigation('next')}
                                        disabled={currentStep === totalSteps - 1}
                                    >
                                        {currentStep === totalSteps - 1 ? '✅ Complete' : 'Next →'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {object.alternatives && object.alternatives.length > 0 && (
                <div className="alternative-methods">
                    <h3>Alternative Methods</h3>
                    {object.alternatives.map((alt, index) => (
                        <div key={index} className="alternative-card">
                            <h4>{alt.title}</h4>
                            <p>{alt.description}</p>
                            <span className="difficulty-tag">{alt.difficulty}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstructionViewer;