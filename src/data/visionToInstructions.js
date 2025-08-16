// Dynamic instruction generation for any object detected by Google Vision
import { generateInstructionSkeleton } from '../utils/instructionTemplates';

export const generateInstructionsForObject = (visionData) => {
    const detectedLabel = visionData.description || visionData.name;
    const confidence = Math.round((visionData.score || 0) * 100);

    // Map common vision labels to categories
    const categoryMapping = {
        // Electronics
        'mobile phone': 'Electronics',
        'smartphone': 'Electronics', 
        'telephone': 'Electronics',
        'computer': 'Electronics',
        'laptop': 'Electronics',
        'tablet': 'Electronics',
        'camera': 'Electronics',
        'television': 'Electronics',
        'speaker': 'Electronics',
        
        // Kitchen Tools
        'knife': 'Kitchen Tools',
        'kitchen knife': 'Kitchen Tools',
        'spoon': 'Kitchen Tools',
        'fork': 'Kitchen Tools',
        'spatula': 'Kitchen Tools',
        'whisk': 'Kitchen Tools',
        'cutting board': 'Kitchen Tools',
        
        // Appliances  
        'coffee maker': 'Appliances',
        'microwave': 'Appliances',
        'toaster': 'Appliances',
        'blender': 'Appliances',
        'washing machine': 'Appliances',
        'refrigerator': 'Appliances',
        'dishwasher': 'Appliances',
        
        // Tools
        'hammer': 'Hand Tools',
        'screwdriver': 'Hand Tools',
        'wrench': 'Hand Tools',
        'drill': 'Power Tools',
        'saw': 'Power Tools',
        'pliers': 'Hand Tools',
        
        // Plants
        'plant': 'Plants',
        'flower': 'Plants',
        'tree': 'Plants',
        'succulent': 'Plants',
        'houseplant': 'Plants',
        
        // Sports
        'bicycle': 'Sports Equipment',
        'ball': 'Sports Equipment',
        'racket': 'Sports Equipment',
        'dumbbell': 'Sports Equipment',
        
        // Safety
        'fire extinguisher': 'Safety Equipment',
        'first aid kit': 'Safety Equipment',
        'helmet': 'Safety Equipment'
    };

    const category = categoryMapping[detectedLabel.toLowerCase()] || 'General Items';
    
    return {
        id: `vision-${Date.now()}`,
        name: formatObjectName(detectedLabel),
        category: category,
        tags: generateTags(detectedLabel),
        description: generateDescription(detectedLabel, category),
        difficulty: getDifficultyLevel(category),
        timeEstimate: getTimeEstimate(category),
        safetyLevel: getSafetyLevel(detectedLabel, category),
        image: null,
        commonUses: generateCommonUses(detectedLabel),
        materials: generateMaterials(detectedLabel, category),
        generalWarnings: generateWarnings(detectedLabel, category),
        instructions: generateBasicInstructions(detectedLabel, category),
        maintenance: generateMaintenance(detectedLabel, category),
        storage: generateStorage(detectedLabel, category),
        lifespan: getLifespan(category),
        ageRestrictions: getAgeRestrictions(category),
        confidence: confidence,
        source: 'Google Vision API'
    };
};

const formatObjectName = (label) => {
    return label.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const generateTags = (label) => {
    const words = label.toLowerCase().split(' ');
    const synonyms = {
        'mobile phone': ['smartphone', 'cell phone', 'phone', 'device'],
        'knife': ['blade', 'cutting tool', 'kitchen knife'],
        'computer': ['laptop', 'pc', 'desktop', 'device'],
        'plant': ['houseplant', 'green', 'botanical']
    };
    
    return [...words, ...(synonyms[label.toLowerCase()] || [])];
};

const generateDescription = (label, category) => {
    const templates = {
        'Electronics': `A ${label} commonly used for communication, entertainment, or productivity tasks.`,
        'Kitchen Tools': `A ${label} used for food preparation and cooking tasks.`,
        'Appliances': `A ${label} household appliance for daily living tasks.`,
        'Hand Tools': `A ${label} manual tool for various repair and construction tasks.`,
        'Power Tools': `A ${label} power tool for construction, repair, and DIY projects.`,
        'Plants': `A ${label} that requires care, watering, and proper lighting conditions.`,
        'Sports Equipment': `A ${label} used for athletic activities and exercise.`,
        'Safety Equipment': `A ${label} designed for protection and emergency situations.`,
        'General Items': `A ${label} with various practical applications.`
    };
    
    return templates[category] || templates['General Items'];
};

const getDifficultyLevel = (category) => {
    const levels = {
        'Electronics': 'Beginner',
        'Kitchen Tools': 'Intermediate', 
        'Appliances': 'Beginner',
        'Hand Tools': 'Beginner',
        'Power Tools': 'Intermediate',
        'Plants': 'Beginner',
        'Sports Equipment': 'Beginner',
        'Safety Equipment': 'Intermediate'
    };
    
    return levels[category] || 'Beginner';
};

const getTimeEstimate = (category) => {
    const times = {
        'Electronics': '5-15 min',
        'Kitchen Tools': '5-10 min',
        'Appliances': '10-30 min',
        'Hand Tools': '2-5 min',
        'Power Tools': '10-20 min',
        'Plants': '5-10 min daily',
        'Sports Equipment': '15-30 min',
        'Safety Equipment': '5-10 min'
    };
    
    return times[category] || '5-10 min';
};

const getSafetyLevel = (label, category) => {
    const dangerousItems = ['knife', 'saw', 'drill', 'fire', 'chemical'];
    const isDangerous = dangerousItems.some(item => label.toLowerCase().includes(item));
    
    if (isDangerous) return 'high';
    if (category === 'Power Tools') return 'medium';
    if (category === 'Safety Equipment') return 'medium';
    return 'low';
};

const generateCommonUses = (label) => {
    const useCases = {
        'mobile phone': ['Making calls', 'Sending messages', 'Internet browsing', 'Taking photos'],
        'knife': ['Cutting food', 'Chopping vegetables', 'Food preparation'],
        'computer': ['Work tasks', 'Entertainment', 'Communication', 'Learning'],
        'plant': ['Air purification', 'Home decoration', 'Stress relief']
    };
    
    return useCases[label.toLowerCase()] || [`Using ${label}`, 'General purpose tasks'];
};

const generateMaterials = (label, category) => {
    const materials = {
        'Electronics': ['Plastic housing', 'Electronic components', 'Battery'],
        'Kitchen Tools': ['Stainless steel', 'Plastic handle'],
        'Appliances': ['Metal housing', 'Electronic controls'],
        'Plants': ['Soil', 'Pot', 'Water']
    };
    
    return materials[category] || ['Various materials'];
};

const generateWarnings = (label, category) => {
    const warnings = {
        'knife': ['Keep blade sharp and clean', 'Always cut away from body', 'Store safely'],
        'mobile phone': ['Avoid water damage', 'Don\'t use while driving', 'Keep away from extreme heat'],
        'computer': ['Ensure proper ventilation', 'Use surge protection', 'Keep liquids away'],
        'plant': ['Check for toxicity to pets', 'Avoid overwatering', 'Provide adequate light']
    };
    
    return warnings[label.toLowerCase()] || ['Use as intended', 'Follow safety guidelines'];
};

const generateBasicInstructions = (label, category) => {
    return [
        {
            title: 'Basic Setup',
            description: `Learn how to properly set up and prepare your ${label}`,
            timeEstimate: '5 min',
            substeps: [
                `Inspect the ${label} for any damage`,
                'Read any included instructions or labels',
                'Ensure you have proper lighting and space',
                'Gather any additional tools needed'
            ]
        },
        {
            title: 'Safe Operation',
            description: `How to use your ${label} safely and effectively`,
            timeEstimate: '10 min',
            substeps: [
                'Follow proper safety precautions',
                `Use the ${label} as intended`,
                'Monitor for any issues during use',
                'Stop if anything seems unsafe'
            ]
        }
    ];
};

const generateMaintenance = (label, category) => {
    const maintenance = {
        'Electronics': ['Keep clean and dry', 'Update software regularly', 'Store properly'],
        'Kitchen Tools': ['Clean after each use', 'Dry thoroughly', 'Store safely'],
        'Plants': ['Water regularly', 'Prune as needed', 'Check for pests']
    };
    
    return maintenance[category] || ['Clean regularly', 'Store properly', 'Inspect for damage'];
};

const generateStorage = (label, category) => {
    const storage = {
        'Electronics': 'Store in dry place away from extreme temperatures',
        'Kitchen Tools': 'Store in knife block or secure drawer',
        'Plants': 'Keep in appropriate lighting conditions'
    };
    
    return storage[category] || 'Store in clean, dry place when not in use';
};

const getLifespan = (category) => {
    const lifespans = {
        'Electronics': '3-5 years average',
        'Kitchen Tools': '5-10 years with proper care',
        'Appliances': '10-15 years with maintenance',
        'Plants': 'Varies by species and care'
    };
    
    return lifespans[category] || '5+ years with proper care';
};

const getAgeRestrictions = (category) => {
    const restrictions = {
        'Kitchen Tools': { minimumAge: '12 years', supervisionRequired: true, supervisionAge: '16' },
        'Power Tools': { minimumAge: '16 years', supervisionRequired: true, supervisionAge: '18' },
        'Safety Equipment': { minimumAge: '10 years', supervisionRequired: true, supervisionAge: '14' }
    };
    
    return restrictions[category] || { 
        minimumAge: '8 years', 
        supervisionRequired: false, 
        notes: 'Adult guidance recommended for first use' 
    };
};