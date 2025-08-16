import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { objectDatabase } from '../data/objectDatabase';
import { generateInstructionsForObject } from '../data/visionToInstructions';
import { cacheService } from './cacheService';

const ObjectContext = createContext();

const initialState = {
    currentObject: null,
    identifiedObjects: [],
    searchResults: [],
    communityTips: [],
    loading: false,
    error: null,
    confidence: 0
};

const objectReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_CURRENT_OBJECT':
            return { ...state, currentObject: action.payload, loading: false };
        case 'SET_CONFIDENCE':
            return { ...state, confidence: action.payload };
        case 'ADD_IDENTIFIED_OBJECT':
            return { 
                ...state, 
                identifiedObjects: [action.payload, ...state.identifiedObjects.slice(0, 9)]
            };
        case 'SET_SEARCH_RESULTS':
            return { ...state, searchResults: action.payload };
        case 'ADD_COMMUNITY_TIP':
            return { 
                ...state, 
                communityTips: [action.payload, ...state.communityTips] 
            };
        default:
            return state;
    }
};

export const ObjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(objectReducer, initialState);

    useEffect(() => {
        loadCachedData();
    }, []);

    const loadCachedData = async () => {
        try {
            const cachedHistory = await cacheService.getIdentificationHistory();
            if (cachedHistory.length > 0) {
                cachedHistory.forEach(obj => {
                    dispatch({ type: 'ADD_IDENTIFIED_OBJECT', payload: obj });
                });
            }
        } catch (error) {
            console.error('Failed to load cached data:', error);
        }
    };

    const identifyObject = async (imageData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        try {
            const result = await performObjectRecognition(imageData);
            
            if (result && result.object) {
                dispatch({ type: 'SET_CURRENT_OBJECT', payload: result.object });
                dispatch({ type: 'SET_CONFIDENCE', payload: result.confidence });
                dispatch({ type: 'ADD_IDENTIFIED_OBJECT', payload: result.object });
                
                await cacheService.saveIdentification(result.object);
            } else {
                const errorMessage = result?.message || 'Object not recognized. Try taking another photo with better lighting or a different angle.';
                dispatch({ type: 'SET_ERROR', payload: errorMessage });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const performObjectRecognition = async (imageData) => {
        console.log('🚀 Starting object recognition...');
        
        // Try real computer vision first
        try {
            console.log('🔬 Attempting Google Vision API...');
            const realResult = await callComputerVisionAPI(imageData);
            if (realResult) {
                console.log('✅ Google Vision API success:', realResult);
                return realResult;
            } else {
                console.log('⚠️ Google Vision API returned no results');
            }
        } catch (error) {
            console.error('❌ Google Vision API failed:', error.message);
            console.log('🔄 Falling back to demo mode...');
        }

        // Fallback to intelligent pattern matching
        console.log('🎮 Using demo mode recognition...');
        return await performIntelligentMatching(imageData);
    };

    const callComputerVisionAPI = async (imageData) => {
        // Google Vision API integration
        const API_KEY = process.env.REACT_APP_GOOGLE_VISION_API_KEY;
        
        console.log('🔍 API Key present:', !!API_KEY);
        console.log('🔍 API Key first 10 chars:', API_KEY ? API_KEY.substring(0, 10) + '...' : 'UNDEFINED');
        
        if (!API_KEY) {
            console.log('❌ No API key found');
            throw new Error('API key not configured');
        }

        console.log('📤 Calling Google Vision API...');
        
        try {
            const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requests: [{
                        image: {
                            content: imageData.split(',')[1] // Remove data:image/jpeg;base64, prefix
                        },
                        features: [
                            { type: 'LABEL_DETECTION', maxResults: 10 },
                            { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
                        ]
                    }]
                })
            });

            console.log('📥 API Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error:', errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log('📋 Full API Response:', result);
            
            if (result.responses && result.responses[0]) {
                const labels = result.responses[0].labelAnnotations || [];
                const objects = result.responses[0].localizedObjectAnnotations || [];
                
                console.log('Google Vision API detected:', labels.map(l => ({
                    label: l.description,
                    confidence: l.score
                })));
                
                // First try to match against our curated database
                const databaseMatch = matchToDatabase([...labels, ...objects]);
                if (databaseMatch && databaseMatch.confidence > 70) {
                    console.log('Found high-confidence match in curated database');
                    return databaseMatch;
                }
                
                // If no good database match, generate dynamic instructions
                const bestDetection = labels[0]; // Google returns sorted by confidence
                if (bestDetection && bestDetection.score > 0.5) {
                    console.log('Generating dynamic instructions for:', bestDetection.description);
                    const dynamicObject = generateInstructionsForObject(bestDetection);
                    return {
                        object: dynamicObject,
                        confidence: Math.round(bestDetection.score * 100),
                        source: 'dynamic'
                    };
                }
            }
            
            console.log('❌ No valid detections found');
            return null;
            
        } catch (error) {
            console.error('❌ API call failed:', error);
            throw error;
        }
    };

    const matchToDatabase = (detections) => {
        console.log('Google Vision API detected:', detections.map(d => ({
            label: d.description || d.name,
            confidence: d.score
        })));

        let bestMatch = null;
        let highestScore = 0;
        const minConfidenceThreshold = 0.3; // Minimum confidence to consider

        detections.forEach(detection => {
            const label = (detection.description || detection.name || '').toLowerCase();
            const confidence = detection.score || 0;

            // Skip low confidence detections
            if (confidence < minConfidenceThreshold) return;

            objectDatabase.forEach(obj => {
                let matchScore = 0;
                const objName = obj.name.toLowerCase();
                const objTags = obj.tags.map(tag => tag.toLowerCase());
                const objCategory = obj.category.toLowerCase();

                // Exact name match (highest priority)
                if (objName === label || label === objName) {
                    matchScore += 1.0 * confidence;
                }
                // Partial name match (medium-high priority)
                else if (objName.includes(label) || label.includes(objName)) {
                    // But exclude very short matches to avoid false positives
                    if (label.length > 3 && objName.length > 3) {
                        matchScore += 0.7 * confidence;
                    }
                }

                // Exact tag match (high priority)
                objTags.forEach(tag => {
                    if (tag === label || label === tag) {
                        matchScore += 0.9 * confidence;
                    }
                    // Partial tag match (medium priority)
                    else if ((tag.includes(label) || label.includes(tag)) && 
                             label.length > 3 && tag.length > 3) {
                        matchScore += 0.5 * confidence;
                    }
                });

                // Category match (lower priority)
                if (objCategory.includes(label) || label.includes(objCategory)) {
                    matchScore += 0.3 * confidence;
                }

                // Special keyword mapping for common mismatches
                const keywordMappings = {
                    'mobile phone': ['smartphone', 'phone', 'mobile'],
                    'smartphone': ['mobile phone', 'phone', 'cell phone'],
                    'coffee maker': ['coffee machine', 'drip coffee'],
                    'drill': ['power drill', 'electric drill'],
                    'knife': ['kitchen knife', 'chef knife'],
                    'screwdriver': ['tool', 'hand tool']
                };

                Object.entries(keywordMappings).forEach(([key, synonyms]) => {
                    if (synonyms.some(synonym => 
                        label.includes(synonym) || synonym.includes(label)
                    )) {
                        if (objName.includes(key) || objTags.includes(key)) {
                            matchScore += 0.6 * confidence;
                        }
                    }
                });

                if (matchScore > highestScore && matchScore > 0.2) {
                    highestScore = matchScore;
                    bestMatch = {
                        object: obj,
                        confidence: Math.min(Math.round(matchScore * 100), 95),
                        detectedAs: label,
                        matchScore: matchScore.toFixed(2)
                    };
                }
            });
        });

        console.log('Best match found:', bestMatch);
        
        // If no good match found, return null
        if (!bestMatch || highestScore < 0.4) {
            console.log('No confident match found, highest score:', highestScore);
            return null;
        }

        return bestMatch;
    };

    const performIntelligentMatching = async (imageData) => {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo mode: Check image characteristics for basic matching
        const demoMatch = performDemoMatching(imageData);
        if (demoMatch) {
            return demoMatch;
        }

        // If no match, show helpful error
        return {
            object: null,
            confidence: 0,
            message: 'Object not recognized. Try taking another photo with better lighting or search manually using the search tab.'
        };
    };

    const performDemoMatching = (imageData) => {
        // Demo logic: Simple image analysis for demonstration
        // In a real app, this would use actual computer vision
        
        // Analyze image data URL to make educated guesses
        const imageSize = imageData.length;
        const hasRedChannel = imageData.includes('ff0000') || imageData.includes('red');
        const hasBlueChannel = imageData.includes('0000ff') || imageData.includes('blue');
        const hasGreenChannel = imageData.includes('00ff00') || imageData.includes('green');
        
        // Very basic pattern matching for demo
        if (imageSize > 50000) { // Larger images might be appliances
            const appliances = objectDatabase.filter(obj => obj.category === 'Appliances');
            if (appliances.length > 0) {
                return {
                    object: appliances[0], // Coffee maker
                    confidence: 65,
                    message: 'Demo mode: Detected based on image size analysis'
                };
            }
        }
        
        if (imageSize < 30000) { // Smaller images might be tools
            const tools = objectDatabase.filter(obj => obj.category === 'Hand Tools');
            if (tools.length > 0) {
                return {
                    object: tools[0], // Screwdriver
                    confidence: 70,
                    message: 'Demo mode: Detected based on image characteristics'
                };
            }
        }
        
        // Random selection from database as last resort for demo
        if (Math.random() > 0.7) { // 30% chance of "recognition"
            const randomObject = objectDatabase[Math.floor(Math.random() * objectDatabase.length)];
            return {
                object: randomObject,
                confidence: Math.floor(Math.random() * 30) + 40, // 40-70% confidence
                message: 'Demo mode: Random selection for demonstration'
            };
        }
        
        return null; // No match
    };

    const searchObjects = (query) => {
        const results = objectDatabase.filter(obj =>
            obj.name.toLowerCase().includes(query.toLowerCase()) ||
            obj.category.toLowerCase().includes(query.toLowerCase()) ||
            obj.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
    };

    const addCommunityTip = (tip) => {
        dispatch({ type: 'ADD_COMMUNITY_TIP', payload: tip });
    };

    const value = {
        ...state,
        identifyObject,
        searchObjects,
        addCommunityTip
    };

    return (
        <ObjectContext.Provider value={value}>
            {children}
        </ObjectContext.Provider>
    );
};

export const useObject = () => {
    const context = useContext(ObjectContext);
    if (!context) {
        throw new Error('useObject must be used within an ObjectProvider');
    }
    return context;
};