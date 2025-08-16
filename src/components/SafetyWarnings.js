import React, { useState } from 'react';

const SafetyWarnings = ({ object }) => {
    const [acknowledgedWarnings, setAcknowledgedWarnings] = useState(new Set());

    const acknowledgeWarning = (warningIndex) => {
        const newAcknowledged = new Set(acknowledgedWarnings);
        newAcknowledged.add(warningIndex);
        setAcknowledgedWarnings(newAcknowledged);
    };

    const getSafetyLevel = (level) => {
        const levels = {
            low: { color: '#10B981', icon: '🟢', text: 'Low Risk' },
            medium: { color: '#F59E0B', icon: '🟡', text: 'Medium Risk' },
            high: { color: '#EF4444', icon: '🟠', text: 'High Risk' },
            critical: { color: '#DC2626', icon: '🔴', text: 'Critical Risk' }
        };
        return levels[level] || levels.medium;
    };

    const safetyLevel = getSafetyLevel(object.safetyLevel || 'medium');

    return (
        <div className="safety-warnings">
            <div className="safety-header">
                <div className="safety-level-indicator" style={{ borderColor: safetyLevel.color }}>
                    <span className="safety-icon">{safetyLevel.icon}</span>
                    <div className="safety-level-text">
                        <h3>Safety Level</h3>
                        <span style={{ color: safetyLevel.color }}>{safetyLevel.text}</span>
                    </div>
                </div>
            </div>

            {object.criticalWarnings && object.criticalWarnings.length > 0 && (
                <div className="critical-warnings-section">
                    <div className="section-header critical">
                        <h3>CRITICAL SAFETY WARNINGS</h3>
                        <p>Read and acknowledge all warnings before proceeding</p>
                    </div>
                    
                    {object.criticalWarnings.map((warning, index) => (
                        <div key={index} className="warning-card critical">
                            <div className="warning-header">
                                <span className="warning-icon">WARN</span>
                                <h4>{warning.title}</h4>
                            </div>
                            <div className="warning-content">
                                <p>{warning.description}</p>
                                {warning.consequences && (
                                    <div className="consequences">
                                        <strong>Potential consequences:</strong>
                                        <ul>
                                            {warning.consequences.map((consequence, i) => (
                                                <li key={i}>{consequence}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="acknowledgment">
                                <label className="acknowledge-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acknowledgedWarnings.has(`critical-${index}`)}
                                        onChange={() => acknowledgeWarning(`critical-${index}`)}
                                    />
                                    <span className="checkmark"></span>
                                    I understand this warning and will take proper precautions
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {object.generalWarnings && object.generalWarnings.length > 0 && (
                <div className="general-warnings-section">
                    <div className="section-header warning">
                        <h3>General Safety Warnings</h3>
                    </div>
                    
                    {object.generalWarnings.map((warning, index) => (
                        <div key={index} className="warning-card general">
                            <div className="warning-header">
                                <span className="warning-icon">WARN</span>
                                <h4>{warning.title || 'Safety Notice'}</h4>
                            </div>
                            <div className="warning-content">
                                <p>{warning.description || warning}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {object.ageRestrictions && (
                <div className="age-restrictions-section">
                    <div className="section-header info">
                        <h3>Age Restrictions & Supervision</h3>
                    </div>
                    
                    <div className="restriction-card">
                        <div className="restriction-details">
                            <div className="age-requirement">
                                <span className="age-icon">🔞</span>
                                <div>
                                    <strong>Minimum Age:</strong> {object.ageRestrictions.minimumAge}
                                    {object.ageRestrictions.supervisionRequired && (
                                        <p>Adult supervision required until age {object.ageRestrictions.supervisionAge || '18'}</p>
                                    )}
                                </div>
                            </div>
                            
                            {object.ageRestrictions.notes && (
                                <div className="age-notes">
                                    <p>{object.ageRestrictions.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {object.requiredSafetyEquipment && object.requiredSafetyEquipment.length > 0 && (
                <div className="safety-equipment-section">
                    <div className="section-header equipment">
                        <h3>Required Safety Equipment</h3>
                    </div>
                    
                    <div className="equipment-grid">
                        {object.requiredSafetyEquipment.map((equipment, index) => (
                            <div key={index} className="equipment-card">
                                <div className="equipment-icon">EQUIP</div>
                                <div className="equipment-info">
                                    <h4>{equipment.name}</h4>
                                    <p>{equipment.purpose}</p>
                                    {equipment.required && (
                                        <span className="required-badge">Required</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {object.commonMistakes && object.commonMistakes.length > 0 && (
                <div className="common-mistakes-section">
                    <div className="section-header mistakes">
                        <h3>Common Mistakes to Avoid</h3>
                    </div>
                    
                    {object.commonMistakes.map((mistake, index) => (
                        <div key={index} className="mistake-card">
                            <div className="mistake-header">
                                <span className="mistake-icon">X</span>
                                <h4>{mistake.mistake}</h4>
                            </div>
                            <div className="mistake-content">
                                <p><strong>Why it's dangerous:</strong> {mistake.reason}</p>
                                <p><strong>Instead, do this:</strong> {mistake.solution}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {object.emergencyProcedures && (
                <div className="emergency-procedures-section">
                    <div className="section-header emergency">
                        <h3>Emergency Procedures</h3>
                    </div>
                    
                    <div className="emergency-procedures">
                        {object.emergencyProcedures.map((procedure, index) => (
                            <div key={index} className="procedure-card">
                                <div className="procedure-header">
                                    <span className="procedure-icon">EMRG</span>
                                    <h4>{procedure.situation}</h4>
                                </div>
                                <div className="procedure-steps">
                                    <ol>
                                        {procedure.steps.map((step, stepIndex) => (
                                            <li key={stepIndex}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                                {procedure.emergencyContact && (
                                    <div className="emergency-contact">
                                        <strong>Emergency Contact:</strong> {procedure.emergencyContact}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {object.environmentalConsiderations && (
                <div className="environmental-section">
                    <div className="section-header environmental">
                        <h3>Environmental & Legal Considerations</h3>
                    </div>
                    
                    <div className="environmental-considerations">
                        {object.environmentalConsiderations.indoor && (
                            <div className="environment-card">
                                <h4>Indoor Use</h4>
                                <p>{object.environmentalConsiderations.indoor}</p>
                            </div>
                        )}
                        
                        {object.environmentalConsiderations.outdoor && (
                            <div className="environment-card">
                                <h4>Outdoor Use</h4>
                                <p>{object.environmentalConsiderations.outdoor}</p>
                            </div>
                        )}
                        
                        {object.environmentalConsiderations.legal && (
                            <div className="environment-card legal">
                                <h4>Legal Requirements</h4>
                                <p>{object.environmentalConsiderations.legal}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="safety-footer">
                <div className="safety-reminder">
                    <h4>Remember:</h4>
                    <ul>
                        <li>Always read all safety information before use</li>
                        <li>When in doubt, ask for help from an expert</li>
                        <li>Keep emergency contacts readily available</li>
                        <li>Stop immediately if something feels unsafe</li>
                    </ul>
                </div>
                
                <div className="emergency-contacts">
                    <h4>Emergency Numbers:</h4>
                    <div className="contacts-grid">
                        <div className="contact-item">
                            <strong>Emergency:</strong> 911 (US) / 999 (UK) / 112 (EU)
                        </div>
                        <div className="contact-item">
                            <strong>Poison Control:</strong> 1-800-222-1222 (US)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyWarnings;