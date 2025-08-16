export const objectDatabase = [
    {
        id: 'kitchen-knife-001',
        name: 'Chef\'s Knife',
        category: 'Kitchen Tools',
        tags: ['cooking', 'cutting', 'knife', 'kitchen'],
        description: 'A versatile 8-inch chef\'s knife essential for food preparation tasks including chopping, dicing, and slicing.',
        difficulty: 'Intermediate',
        timeEstimate: '5-10 min',
        safetyLevel: 'high',
        image: '/images/chefs-knife.jpg',
        commonUses: ['Chopping vegetables', 'Slicing meat', 'Dicing onions', 'Mincing herbs'],
        materials: ['Stainless steel blade', 'Ergonomic handle'],
        requiredTools: ['Cutting board'],
        criticalWarnings: [
            {
                title: 'Sharp Blade Risk',
                description: 'This knife has an extremely sharp blade that can cause severe cuts',
                consequences: ['Deep lacerations', 'Potential nerve damage', 'Emergency room visit']
            }
        ],
        generalWarnings: [
            'Always cut away from your body',
            'Keep fingers curled and knuckles forward',
            'Never try to catch a falling knife',
            'Store in knife block or magnetic strip'
        ],
        ageRestrictions: {
            minimumAge: '12 years',
            supervisionRequired: true,
            supervisionAge: '16',
            notes: 'Adult supervision required. Proper knife handling training recommended.'
        },
        requiredSafetyEquipment: [
            {
                name: 'Cut-resistant gloves',
                purpose: 'Protect non-cutting hand',
                required: false
            }
        ],
        commonMistakes: [
            {
                mistake: 'Using a dull blade',
                reason: 'Dull blades require more pressure and are more likely to slip',
                solution: 'Keep knife properly sharpened and honed'
            }
        ],
        instructions: [
            {
                title: 'Proper Grip and Stance',
                description: 'Learn the correct way to hold the knife and position your body',
                timeEstimate: '2 min',
                substeps: [
                    'Hold knife handle firmly with dominant hand',
                    'Place thumb and index finger on blade sides near handle',
                    'Stand with feet shoulder-width apart',
                    'Keep cutting board at comfortable height'
                ],
                tips: ['Keep wrist straight and relaxed', 'Never grip the knife too tightly']
            },
            {
                title: 'Basic Chopping Technique',
                description: 'Master the fundamental rocking motion for efficient cutting',
                timeEstimate: '3 min',
                substeps: [
                    'Place knife tip on cutting board',
                    'Use rocking motion, keeping tip in contact',
                    'Guide food with knuckles of non-cutting hand',
                    'Maintain steady rhythm'
                ],
                warnings: ['Keep fingers tucked under and knuckles forward']
            }
        ],
        maintenance: [
            'Hand wash immediately after use',
            'Dry thoroughly to prevent rust',
            'Sharpen regularly with whetstone',
            'Hone before each use'
        ],
        storage: 'Store in knife block, magnetic strip, or blade guards. Never store loose in drawers.',
        lifespan: '10+ years with proper care'
    },

    {
        id: 'drill-001',
        name: 'Cordless Drill',
        category: 'Power Tools',
        tags: ['drill', 'power tool', 'construction', 'diy'],
        description: 'A versatile cordless drill for drilling holes and driving screws in various materials.',
        difficulty: 'Beginner',
        timeEstimate: '10-15 min',
        safetyLevel: 'medium',
        image: '/images/cordless-drill.jpg',
        commonUses: ['Drilling pilot holes', 'Driving screws', 'Mixing paint', 'Assembly work'],
        materials: ['Metal body', 'Plastic grip', 'Lithium battery'],
        requiredTools: ['Drill bits', 'Screwdriver bits'],
        requiredSafetyEquipment: [
            {
                name: 'Safety glasses',
                purpose: 'Protect eyes from debris',
                required: true
            },
            {
                name: 'Work gloves',
                purpose: 'Better grip and protection',
                required: false
            }
        ],
        generalWarnings: [
            'Always wear safety glasses',
            'Ensure battery is charged before use',
            'Check drill bit is secure',
            'Remove battery when changing bits'
        ],
        ageRestrictions: {
            minimumAge: '16 years',
            supervisionRequired: true,
            supervisionAge: '18',
            notes: 'Requires understanding of tool safety and proper handling techniques.'
        },
        commonMistakes: [
            {
                mistake: 'Using wrong drill bit for material',
                reason: 'Can damage material or break bit',
                solution: 'Match drill bit type to material being drilled'
            }
        ],
        instructions: [
            {
                title: 'Safety Check and Setup',
                description: 'Ensure drill is ready for safe operation',
                timeEstimate: '2 min',
                substeps: [
                    'Check battery charge level',
                    'Inspect drill bit for damage',
                    'Insert correct bit and tighten chuck',
                    'Put on safety glasses'
                ]
            },
            {
                title: 'Basic Drilling Technique',
                description: 'Learn proper drilling form and technique',
                timeEstimate: '5 min',
                substeps: [
                    'Mark drilling location with pencil',
                    'Start drill at low speed',
                    'Apply steady, moderate pressure',
                    'Keep drill perpendicular to surface',
                    'Let drill bit do the work'
                ],
                tips: ['Start with pilot hole for large screws', 'Clear debris frequently']
            }
        ],
        maintenance: [
            'Keep battery charged',
            'Clean after each use',
            'Store drill bits organized',
            'Check chuck tightness regularly'
        ],
        storage: 'Store in case with bits and charger. Keep in dry location.',
        lifespan: '5-10 years with regular maintenance'
    },

    {
        id: 'plant-001',
        name: 'Snake Plant (Sansevieria)',
        category: 'Plants',
        tags: ['houseplant', 'low-maintenance', 'air-purifying', 'succulent'],
        description: 'A hardy, low-maintenance houseplant known for its air-purifying qualities and tolerance to neglect.',
        difficulty: 'Beginner',
        timeEstimate: '5 min daily',
        safetyLevel: 'low',
        image: '/images/snake-plant.jpg',
        commonUses: ['Air purification', 'Home decoration', 'Office plant', 'Beginner plant care'],
        materials: ['Well-draining soil', 'Pot with drainage holes'],
        requiredTools: ['Watering can', 'Plant fertilizer'],
        generalWarnings: [
            'Mildly toxic to pets if ingested',
            'Overwatering can cause root rot',
            'Sharp leaf edges can cut skin'
        ],
        ageRestrictions: {
            minimumAge: '8 years',
            supervisionRequired: true,
            supervisionAge: '12',
            notes: 'Safe for children but should not be eaten. Teach proper plant handling.'
        },
        instructions: [
            {
                title: 'Proper Placement',
                description: 'Choose the ideal location for your snake plant',
                timeEstimate: '2 min',
                substeps: [
                    'Find location with bright, indirect light',
                    'Ensure adequate air circulation',
                    'Keep away from cold drafts',
                    'Choose stable surface for pot'
                ],
                tips: ['Snake plants tolerate low light but prefer bright conditions']
            },
            {
                title: 'Watering Schedule',
                description: 'Learn the proper watering technique and frequency',
                timeEstimate: '3 min',
                substeps: [
                    'Check soil moisture with finger test',
                    'Water only when top 1-2 inches are dry',
                    'Water thoroughly until drainage appears',
                    'Empty drainage tray after 30 minutes'
                ],
                warnings: ['Never let plant sit in standing water']
            }
        ],
        maintenance: [
            'Water every 2-6 weeks depending on season',
            'Fertilize monthly during growing season',
            'Dust leaves with damp cloth',
            'Repot every 2-3 years'
        ],
        storage: 'Keep in bright, indirect light. Avoid temperature extremes.',
        lifespan: '10+ years with proper care',
        environmentalConsiderations: {
            indoor: 'Excellent indoor air purifier, removes toxins from air',
            outdoor: 'Can be grown outdoors in warm climates (zones 9-11)',
            legal: 'No legal restrictions, safe for home cultivation'
        }
    },

    {
        id: 'fire-extinguisher-001',
        name: 'ABC Fire Extinguisher',
        category: 'Safety Equipment',
        tags: ['fire safety', 'emergency', 'extinguisher', 'home safety'],
        description: 'A multipurpose dry chemical fire extinguisher for Class A, B, and C fires.',
        difficulty: 'Beginner',
        timeEstimate: '30 seconds',
        safetyLevel: 'critical',
        image: '/images/fire-extinguisher.jpg',
        commonUses: ['Extinguishing fires', 'Emergency response', 'Fire prevention'],
        materials: ['Steel cylinder', 'Dry chemical powder', 'Pressure gauge'],
        criticalWarnings: [
            {
                title: 'Emergency Use Only',
                description: 'Only use in actual fire emergencies. Call fire department first.',
                consequences: ['Inadequate fire suppression', 'Personal injury', 'Property damage']
            },
            {
                title: 'Proper Fire Types Only',
                description: 'ABC extinguishers are NOT for grease/oil fires (Class K)',
                consequences: ['Fire spread', 'Explosive conditions', 'Severe burns']
            }
        ],
        generalWarnings: [
            'Always call 911 first',
            'Only fight small fires',
            'Keep escape route clear',
            'Evacuate if fire grows'
        ],
        ageRestrictions: {
            minimumAge: '16 years',
            supervisionRequired: true,
            supervisionAge: '18',
            notes: 'Emergency situations may require any age to use. Provide training to all family members.'
        },
        requiredSafetyEquipment: [
            {
                name: 'Clear escape route',
                purpose: 'Ensure you can evacuate if needed',
                required: true
            }
        ],
        emergencyProcedures: [
            {
                situation: 'Small fire outbreak',
                steps: [
                    'Call 911 immediately',
                    'Ensure you have clear escape route',
                    'Remove safety pin',
                    'Aim at base of fire',
                    'Squeeze handle firmly',
                    'Sweep side to side',
                    'Evacuate if fire doesn\'t go out quickly'
                ],
                emergencyContact: '911'
            }
        ],
        instructions: [
            {
                title: 'PASS Technique',
                description: 'Learn the standard fire extinguisher operation method',
                timeEstimate: '30 seconds',
                substeps: [
                    'PULL the safety pin',
                    'AIM at base of flames, not tips',
                    'SQUEEZE handle firmly',
                    'SWEEP from side to side'
                ],
                tips: ['Stay 6-8 feet away from fire', 'Use entire contents if needed']
            }
        ],
        maintenance: [
            'Check pressure gauge monthly',
            'Inspect for damage or corrosion',
            'Professional servicing annually',
            'Replace every 10-12 years'
        ],
        storage: 'Mount in easily accessible location away from heat sources.',
        lifespan: '10-12 years, check expiration date',
        environmentalConsiderations: {
            indoor: 'Required in kitchens, garages, and workshops',
            legal: 'Check local fire codes for placement requirements'
        }
    },

    {
        id: 'smartphone-001',
        name: 'Smartphone',
        category: 'Electronics',
        tags: ['phone', 'mobile', 'technology', 'communication', 'smartphone', 'cell phone', 'mobile phone', 'device'],
        description: 'Modern touchscreen smartphone for communication, internet access, and various applications.',
        difficulty: 'Beginner',
        timeEstimate: '15-30 min setup',
        safetyLevel: 'low',
        image: '/images/smartphone.jpg',
        commonUses: ['Phone calls', 'Text messaging', 'Internet browsing', 'Photography', 'Apps'],
        materials: ['Touchscreen display', 'Battery', 'Circuit board'],
        requiredTools: ['Charger', 'SIM card'],
        generalWarnings: [
            'Avoid exposure to water unless waterproof',
            'Don\'t use while driving',
            'Be aware of battery swelling',
            'Protect from extreme temperatures'
        ],
        ageRestrictions: {
            minimumAge: '10 years',
            supervisionRequired: true,
            supervisionAge: '13',
            notes: 'Parental controls recommended for younger users. Discuss online safety.'
        },
        instructions: [
            {
                title: 'Initial Setup',
                description: 'Configure your smartphone for first use',
                timeEstimate: '15 min',
                substeps: [
                    'Insert SIM card if required',
                    'Power on device',
                    'Connect to Wi-Fi network',
                    'Sign in with Apple ID or Google account',
                    'Set up security (PIN, fingerprint, face unlock)'
                ],
                tips: ['Use strong, unique passwords', 'Enable two-factor authentication']
            },
            {
                title: 'Basic Operation',
                description: 'Learn fundamental smartphone interactions',
                timeEstimate: '10 min',
                substeps: [
                    'Navigate home screen and app icons',
                    'Make and receive calls',
                    'Send text messages',
                    'Adjust volume and settings',
                    'Connect to Wi-Fi and Bluetooth'
                ]
            }
        ],
        maintenance: [
            'Charge battery when below 20%',
            'Update software regularly',
            'Clean screen with microfiber cloth',
            'Use protective case and screen protector'
        ],
        storage: 'Keep in protective case, avoid extreme temperatures and moisture.',
        lifespan: '2-4 years average, up to 6+ with care',
        environmentalConsiderations: {
            legal: 'Recycle responsibly at electronics recycling centers'
        }
    },

    {
        id: 'screwdriver-001',
        name: 'Phillips Head Screwdriver',
        category: 'Hand Tools',
        tags: ['screwdriver', 'hand tool', 'assembly', 'repair'],
        description: 'A manual screwdriver with Phillips head for driving screws with cross-shaped slots.',
        difficulty: 'Beginner',
        timeEstimate: '2-5 min',
        safetyLevel: 'low',
        image: '/images/phillips-screwdriver.jpg',
        commonUses: ['Assembling furniture', 'Electronic repairs', 'General maintenance', 'Toy assembly'],
        materials: ['Steel shaft', 'Plastic or rubber grip'],
        generalWarnings: [
            'Ensure screwdriver tip matches screw head size',
            'Apply steady pressure to avoid slipping',
            'Keep tip clean and sharp'
        ],
        ageRestrictions: {
            minimumAge: '8 years',
            supervisionRequired: true,
            supervisionAge: '12',
            notes: 'Safe tool for children learning basic assembly skills.'
        },
        instructions: [
            {
                title: 'Proper Grip and Positioning',
                description: 'Learn correct hand positioning for effective screwdriving',
                timeEstimate: '1 min',
                substeps: [
                    'Hold handle firmly in palm',
                    'Guide with index finger along shaft',
                    'Keep screwdriver perpendicular to screw',
                    'Align tip with screw head before turning'
                ]
            },
            {
                title: 'Driving Screws',
                description: 'Master the technique for inserting and removing screws',
                timeEstimate: '2 min',
                substeps: [
                    'Start screw by hand if possible',
                    'Apply downward pressure while turning',
                    'Turn clockwise to tighten, counter-clockwise to loosen',
                    'Stop when screw head is flush or slightly below surface'
                ],
                tips: ['Remember: Righty tighty, lefty loosey']
            }
        ],
        maintenance: [
            'Keep tip clean and free of debris',
            'Store in dry location to prevent rust',
            'Replace if tip becomes worn or damaged'
        ],
        storage: 'Store in toolbox or tool rack. Keep tips protected.',
        lifespan: '10+ years with proper care'
    },

    {
        id: 'coffee-maker-001',
        name: 'Drip Coffee Maker',
        category: 'Appliances',
        tags: ['coffee', 'appliance', 'kitchen', 'brewing'],
        description: 'Electric drip coffee maker for brewing coffee using ground coffee beans.',
        difficulty: 'Beginner',
        timeEstimate: '10-15 min',
        safetyLevel: 'medium',
        image: '/images/coffee-maker.jpg',
        commonUses: ['Brewing coffee', 'Hot water for tea', 'Morning routine'],
        materials: ['Plastic body', 'Glass carafe', 'Heating element'],
        requiredTools: ['Coffee filter', 'Ground coffee', 'Water'],
        generalWarnings: [
            'Hot surfaces and steam present during operation',
            'Use only cold water in reservoir',
            'Ensure carafe is properly positioned',
            'Never operate without water'
        ],
        ageRestrictions: {
            minimumAge: '12 years',
            supervisionRequired: true,
            supervisionAge: '16',
            notes: 'Hot liquids and surfaces require caution.'
        },
        instructions: [
            {
                title: 'Setup and Preparation',
                description: 'Prepare the coffee maker for brewing',
                timeEstimate: '3 min',
                substeps: [
                    'Ensure coffee maker is plugged in',
                    'Fill reservoir with cold water',
                    'Insert coffee filter in basket',
                    'Add ground coffee (1-2 tablespoons per cup)',
                    'Place carafe on warming plate'
                ]
            },
            {
                title: 'Brewing Process',
                description: 'Start the brewing cycle',
                timeEstimate: '5-10 min',
                substeps: [
                    'Press power button to start brewing',
                    'Wait for brewing cycle to complete',
                    'Brewing stops automatically when finished',
                    'Remove carafe carefully (it will be hot)'
                ],
                warnings: ['Carafe and coffee will be very hot']
            }
        ],
        maintenance: [
            'Clean carafe and filter basket daily',
            'Descale monthly with vinegar solution',
            'Replace water filter if equipped',
            'Wipe down exterior regularly'
        ],
        storage: 'Keep on counter or store in cabinet when not in use.',
        lifespan: '5-10 years with regular maintenance'
    },

    {
        id: 'bicycle-001',
        name: 'Mountain Bicycle',
        category: 'Sports Equipment',
        tags: ['bicycle', 'cycling', 'sports', 'transportation'],
        description: 'A rugged bicycle designed for off-road cycling with enhanced durability and control.',
        difficulty: 'Intermediate',
        timeEstimate: '30-60 min setup',
        safetyLevel: 'medium',
        image: '/images/mountain-bike.jpg',
        commonUses: ['Trail riding', 'Exercise', 'Transportation', 'Recreation'],
        materials: ['Aluminum/steel frame', 'Rubber tires', 'Steel components'],
        requiredTools: ['Bike pump', 'Basic tools for adjustments'],
        requiredSafetyEquipment: [
            {
                name: 'Helmet',
                purpose: 'Protect head in case of falls',
                required: true
            },
            {
                name: 'Reflective gear',
                purpose: 'Visibility in low light',
                required: false
            }
        ],
        generalWarnings: [
            'Always wear a helmet',
            'Check brakes before each ride',
            'Ensure tires are properly inflated',
            'Be aware of traffic and trail conditions'
        ],
        ageRestrictions: {
            minimumAge: '8 years',
            supervisionRequired: true,
            supervisionAge: '12',
            notes: 'Size bike appropriately for rider height. Adult supervision for road riding.'
        },
        instructions: [
            {
                title: 'Pre-Ride Safety Check',
                description: 'Perform essential safety checks before riding',
                timeEstimate: '5 min',
                substeps: [
                    'Check tire pressure and condition',
                    'Test front and rear brakes',
                    'Ensure seat and handlebars are secure',
                    'Check chain for proper lubrication',
                    'Verify all quick-release levers are closed'
                ]
            },
            {
                title: 'Basic Riding Technique',
                description: 'Learn fundamental cycling skills',
                timeEstimate: '15 min',
                substeps: [
                    'Mount bike from left side',
                    'Keep both hands on handlebars',
                    'Look ahead, not at front wheel',
                    'Use both brakes evenly for stopping',
                    'Shift gears appropriately for terrain'
                ],
                tips: ['Practice in safe, open area first']
            }
        ],
        maintenance: [
            'Clean bike after muddy rides',
            'Lubricate chain regularly',
            'Check tire pressure weekly',
            'Professional tune-up annually'
        ],
        storage: 'Store indoors or under cover. Hang or use bike stand to prevent flat spots.',
        lifespan: '10+ years with proper maintenance'
    },

    {
        id: 'first-aid-kit-001',
        name: 'First Aid Kit',
        category: 'Safety Equipment',
        tags: ['first aid', 'emergency', 'medical', 'safety'],
        description: 'Emergency medical supplies for treating minor injuries and wounds.',
        difficulty: 'Beginner',
        timeEstimate: '5-15 min',
        safetyLevel: 'medium',
        image: '/images/first-aid-kit.jpg',
        commonUses: ['Treating cuts and scrapes', 'Emergency response', 'Wound care', 'Pain relief'],
        materials: ['Bandages', 'Antiseptic', 'Medical tape', 'Gauze'],
        criticalWarnings: [
            {
                title: 'Serious Injuries Require Professional Care',
                description: 'First aid kits are for minor injuries only. Seek professional medical help for serious wounds.',
                consequences: ['Delayed proper treatment', 'Infection risk', 'Worsened injury']
            }
        ],
        generalWarnings: [
            'Check expiration dates regularly',
            'Replace used items immediately',
            'Keep kit clean and dry',
            'Know when to seek professional help'
        ],
        ageRestrictions: {
            minimumAge: '12 years',
            supervisionRequired: true,
            supervisionAge: '16',
            notes: 'Basic first aid training recommended for all users.'
        },
        emergencyProcedures: [
            {
                situation: 'Minor cut or scrape',
                steps: [
                    'Wash hands thoroughly',
                    'Stop bleeding with direct pressure',
                    'Clean wound with antiseptic wipe',
                    'Apply adhesive bandage',
                    'Monitor for signs of infection'
                ]
            }
        ],
        instructions: [
            {
                title: 'Basic Wound Care',
                description: 'Learn to treat minor cuts and scrapes',
                timeEstimate: '5 min',
                substeps: [
                    'Assess the injury severity',
                    'Put on disposable gloves if available',
                    'Control bleeding with direct pressure',
                    'Clean around the wound',
                    'Apply appropriate dressing'
                ],
                warnings: ['Seek professional help for deep cuts or excessive bleeding']
            }
        ],
        maintenance: [
            'Check contents monthly',
            'Replace expired items',
            'Restock used supplies',
            'Keep inventory list updated'
        ],
        storage: 'Store in cool, dry place. Keep easily accessible in emergency.',
        lifespan: 'Kit lasts indefinitely, but contents need regular replacement'
    },

    {
        id: 'washing-machine-001',
        name: 'Front-Loading Washing Machine',
        category: 'Appliances',
        tags: ['laundry', 'appliance', 'cleaning', 'household'],
        description: 'Energy-efficient front-loading washing machine for cleaning clothes and fabrics.',
        difficulty: 'Beginner',
        timeEstimate: '45-90 min per load',
        safetyLevel: 'medium',
        image: '/images/washing-machine.jpg',
        commonUses: ['Washing clothes', 'Cleaning linens', 'Delicate fabric care'],
        materials: ['Steel drum', 'Electronic controls', 'Water pumps'],
        requiredTools: ['Laundry detergent', 'Fabric softener (optional)'],
        generalWarnings: [
            'Do not overload the machine',
            'Keep door seal clean and dry',
            'Use appropriate detergent amount',
            'Check pockets for items before washing'
        ],
        ageRestrictions: {
            minimumAge: '10 years',
            supervisionRequired: true,
            supervisionAge: '14',
            notes: 'Ensure understanding of different fabric care requirements.'
        },
        instructions: [
            {
                title: 'Loading and Preparation',
                description: 'Properly prepare and load laundry',
                timeEstimate: '10 min',
                substeps: [
                    'Sort clothes by color and fabric type',
                    'Check all pockets for items',
                    'Load clothes evenly in drum',
                    'Do not pack clothes tightly',
                    'Close the door firmly'
                ]
            },
            {
                title: 'Setting Up the Wash Cycle',
                description: 'Select appropriate settings and start the wash',
                timeEstimate: '5 min',
                substeps: [
                    'Add detergent to dispenser',
                    'Select water temperature',
                    'Choose wash cycle based on fabric type',
                    'Set spin speed if adjustable',
                    'Press start button'
                ]
            }
        ],
        maintenance: [
            'Clean door seal monthly',
            'Run cleaning cycle monthly',
            'Check and clean lint filter',
            'Leave door open between uses to air dry'
        ],
        storage: 'Keep in laundry room with proper ventilation.',
        lifespan: '10-15 years with regular maintenance'
    }
];

export const objectCategories = [
    {
        id: 'kitchen',
        name: 'Kitchen Tools',
        icon: 'KITCHEN',
        description: 'Cooking and food preparation equipment',
        objects: ['kitchen-knife-001']
    },
    {
        id: 'power-tools',
        name: 'Power Tools',
        icon: 'POWER',
        description: 'Electric and battery-powered tools',
        objects: ['drill-001']
    },
    {
        id: 'plants',
        name: 'Plants',
        icon: 'PLANT',
        description: 'Indoor and outdoor plants care',
        objects: ['plant-001']
    },
    {
        id: 'safety',
        name: 'Safety Equipment',
        icon: 'SAFETY',
        description: 'Safety and emergency equipment',
        objects: ['fire-extinguisher-001', 'first-aid-kit-001']
    },
    {
        id: 'electronics',
        name: 'Electronics',
        icon: 'TECH',
        description: 'Electronic devices and gadgets',
        objects: ['smartphone-001']
    },
    {
        id: 'hand-tools',
        name: 'Hand Tools',
        icon: 'HAND',
        description: 'Manual tools and hardware',
        objects: ['screwdriver-001']
    },
    {
        id: 'appliances',
        name: 'Appliances',
        icon: 'HOME',
        description: 'Household appliances and devices',
        objects: ['coffee-maker-001', 'washing-machine-001']
    },
    {
        id: 'sports',
        name: 'Sports Equipment',
        icon: 'SPORT',
        description: 'Athletic and recreational equipment',
        objects: ['bicycle-001']
    }
];