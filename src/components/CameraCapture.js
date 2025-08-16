import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useObject } from '../services/ObjectContext';

const CameraCapture = () => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCropGuide, setShowCropGuide] = useState(true);
    const [facingMode, setFacingMode] = useState('environment');
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const { identifyObject, loading, currentObject, error } = useObject();

    useEffect(() => {
        if (currentObject) {
            navigate(`/object/${currentObject.id}`);
        }
    }, [currentObject, navigate]);

    const startCamera = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            videoRef.current.srcObject = stream;
            setIsStreaming(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please ensure you have given permission.');
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            setIsStreaming(false);
        }
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        setShowCropGuide(false);
        stopCamera();
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        setShowCropGuide(true);
        startCamera();
    };

    const analyzeImage = async () => {
        if (capturedImage) {
            await identifyObject(capturedImage);
        }
    };

    const switchCamera = () => {
        setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
        stopCamera();
        setTimeout(startCamera, 100);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedImage(e.target.result);
                setShowCropGuide(false);
                stopCamera();
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [facingMode]);

    return (
        <div className="camera-capture">
            <div className="camera-container">
                {!capturedImage ? (
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="camera-video"
                        />
                        
                        {showCropGuide && isStreaming && (
                            <div className="crop-guide">
                                <div className="crop-frame">
                                    <div className="corner corner-tl"></div>
                                    <div className="corner corner-tr"></div>
                                    <div className="corner corner-bl"></div>
                                    <div className="corner corner-br"></div>
                                </div>
                                <p className="guide-text">Center the object in the frame</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="captured-image-container">
                        <img src={capturedImage} alt="Captured object" className="captured-image" />
                        {loading && (
                            <div className="analysis-overlay">
                                <div className="spinner"></div>
                                <p>Analyzing object...</p>
                            </div>
                        )}
                        {error && (
                            <div className="error-overlay">
                                <div className="error-icon">❌</div>
                                <h4>Recognition Failed</h4>
                                <p>{error}</p>
                                <div className="error-actions">
                                    <button onClick={retakePhoto} className="retry-btn">
                                        📸 Try Again
                                    </button>
                                    <button onClick={() => navigate('/search')} className="search-btn">
                                        🔍 Search Instead
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="camera-controls">
                {!capturedImage ? (
                    <>
                        <div className="control-row">
                            <button 
                                className="control-btn secondary"
                                onClick={switchCamera}
                                disabled={!isStreaming}
                            >
                                🔄
                            </button>
                            
                            <button
                                className="capture-btn"
                                onClick={captureImage}
                                disabled={!isStreaming}
                            >
                                📸
                            </button>
                            
                            <label className="control-btn secondary upload-btn">
                                📁
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                        
                        <div className="help-text">
                            <div className="demo-banner">
                                <h4>🚀 Demo Mode</h4>
                                <p>For real object recognition, add Google Vision API key to .env file</p>
                            </div>
                            <p>📱 Point your camera at any object</p>
                            <p>🎯 Center it in the frame for best results</p>
                            <p>💡 Recognition works about 30% of the time in demo mode</p>
                        </div>
                    </>
                ) : (
                    <div className="analysis-controls">
                        <button
                            className="control-btn secondary"
                            onClick={retakePhoto}
                            disabled={loading}
                        >
                            ↩️ Retake
                        </button>
                        
                        <button
                            className="analyze-btn primary"
                            onClick={analyzeImage}
                            disabled={loading}
                        >
                            {loading ? '🔍 Analyzing...' : '🎯 Identify Object'}
                        </button>
                    </div>
                )}
            </div>

            <div className="quick-tips">
                <h3>📋 Quick Tips</h3>
                <ul>
                    <li>Ensure good lighting for better recognition</li>
                    <li>Keep the object centered and in focus</li>
                    <li>Try different angles if not recognized</li>
                    <li>Works offline with cached objects</li>
                </ul>
            </div>
        </div>
    );
};

export default CameraCapture;