export const products = {
    'bard': {
        name: "B.A.R.D. V2.0",
        tagline: "GROUP 2 UAS · TACTICAL AUTONOMY",
        brand: "MAS",
        category: "ISR",
        description: "BARD V2.0 is a compact autonomous quadcopter designed for surveillance, perimeter monitoring, and reconnaissance operations. The platform integrates stabilized electrooptical imaging with real-time transmission capability.",
        longDescription: "BARD V2.0 is a mission-critical Autonomous Aerial System engineered for persistent battlefield intelligence. The platform supports multiple variants ranging from standard day surveillance to advanced thermal imaging with Laser Range Finding (LRF) and specialized payload release capabilities.",
        heroSpecs: [
            { label: "Endurance", value: "60m" },
            { label: "Range", value: "5km" },
            { label: "Altitude", value: "800m" },
            { label: "Frame", value: "690mm" }
        ],
        performanceMetrics: [
            { label: "AUTONOMY_LOGIC", value: 95, unit: "%" },
            { label: "RELIABILITY_INDEX", value: 98, unit: "%" },
            { label: "THERMAL_ACCURACY", value: 92, unit: "%" },
            { label: "PAYLOAD_EFFICIENCY", value: 90, unit: "%" }
        ],
        featureCards: [
            {
                title: "Multi-Mission Payload",
                description: "Interchangeable payloads supporting EO/IR sensors, Laser Range Finders, and 2kg tactical release systems."
            },
            {
                title: "Rugged Design",
                description: "Optimized 690mm frame built for high-altitude deployment and mission-ready durability in contested environments."
            },
            {
                title: "Tactical ISR",
                description: "Integrated AI processing for target acquisition, tracking, and post-strike assessment in real-time."
            }
        ],
        variants: [
            { 
                id: "day-moonlight",
                variant: "Day & Moonlight Variant", 
                type: "ISR Drone", 
                description: "BARD V2.0 is a compact autonomous quadcopter designed for surveillance, perimeter monitoring, and reconnaissance operations. The platform integrates stabilized electrooptical imaging with real-time transmission capability.",
                keyHighlights: [
                    "Endurance: Up to 60 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "2K EO Camera with Hybrid Zoom",
                    "Dual GPS Navigation",
                    "3-Axis Stabilized Gimbal",
                    "Real-Time Video & Telemetry",
                    "Portable Handheld Ground Control Station"
                ],
                capabilities: ["Long endurance", "High zoom capability", "Dual GPS for redundant navigation"],
                applications: ["Surveillance", "Perimeter monitoring", "Reconnaissance"],
                performance: { endurance: "60m", range: "3-4km", payload: "EO Camera" },
                gallery: ["/partners/bard1.png", "/partners/bard2.jpeg", "/partners/bard3.png"]
            },
            { 
                id: "day-night-thermal-basic",
                variant: "Day & Night (Thermal Basic)", 
                type: "ISR Drone", 
                description: "This variant integrates electro-optical and thermal imaging systems for reliable day and night surveillance across diverse operational environments.",
                keyHighlights: [
                    "Endurance: Up to 60 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "EO + Thermal Imaging Payload",
                    "Multi-Palette Thermal Display",
                    "Dual GPS Architecture",
                    "3-Axis Stabilized Gimbal",
                    "Live Video & Telemetry Transmission"
                ],
                capabilities: ["Day/Night versatility", "Thermal payload with multi-palette display"],
                applications: ["Night surveillance", "Search and rescue", "Heat signature detection"],
                performance: { endurance: "60m", range: "3-4km", payload: "EO+Thermal" },
                gallery: ["/partners/bard2.jpeg", "/partners/bard1.png", "/partners/bard3.png"]
            },
            { 
                id: "thermal-advanced-lrf",
                variant: "Thermal Advanced + Laser Rangefinder", 
                type: "ISR Drone", 
                description: "An enhanced ISR configuration integrating advanced thermal optics with precision rangefinding for improved situational awareness and tactical observation.",
                keyHighlights: [
                    "Endurance: Up to 60 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "HD EO + Advanced Thermal Vision",
                    "Integrated Laser Rangefinding",
                    "Dual GPS Navigation",
                    "Stabilized 3-Axis Gimbal",
                    "Real-Time Mission Monitoring"
                ],
                capabilities: ["Advanced thermal optics", "Integrated Laser Rangefinding (LRF)"],
                applications: ["Precision targeting", "Tactical observation", "Distance measurement"],
                performance: { endurance: "60m", range: "3-4km", payload: "EO+Thermal+LRF" },
                gallery: ["/partners/bard3.png", "/partners/bard1.png", "/partners/bard2.jpeg"]
            },
            { 
                id: "thermal-advanced-ai",
                variant: "Thermal Advanced + AI Tracking", 
                type: "ISR Drone", 
                description: "This intelligent ISR variant combines thermal imaging with AI-assisted tracking for enhanced monitoring and object-follow capability.",
                keyHighlights: [
                    "Endurance: Up to 60 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "EO + Advanced Thermal Imaging",
                    "AI-Based Target Tracking",
                    "Dual GPS System",
                    "3-Axis Stabilization",
                    "Real-Time Video & Telemetry"
                ],
                capabilities: ["Autonomous object-follow", "AI-assisted target tracking"],
                applications: ["Asset tracking", "Persistent monitoring", "Automated patrol"],
                performance: { endurance: "60m", range: "3-4km", payload: "EO+Thermal+AI" },
                gallery: ["/partners/bard1.png", "/partners/bard3.png", "/partners/bard2.jpeg"]
            },
            { 
                id: "day-mission-configured",
                variant: "Day – Mission Configured Variant", 
                type: "Multi-Rotor Operational Platform", 
                description: "A day-optimized configuration designed for mission-specific payload integration and rapid deployment operations.",
                keyHighlights: [
                    "Endurance: Up to 30 Minutes",
                    "Operational Range: Up to 2–3 KM",
                    "4K EO Camera",
                    "Dual GPS Navigation",
                    "Stabilized Imaging System",
                    "Portable Ground Control Station"
                ],
                capabilities: ["4K high-resolution capture", "Rapid deployment configuration"],
                applications: ["Mission-specific payload tasks", "Daytime tactical support"],
                performance: { endurance: "30m", range: "2-3km", payload: "4K EO" },
                gallery: ["/partners/bard2.jpeg", "/partners/bard3.png", "/partners/bard1.png"]
            },
            { 
                id: "day-night-mission-configured-thermal",
                variant: "Day & Night – Mission Configured (Thermal)", 
                type: "Multi-Rotor Operational Platform", 
                description: "Designed for specialized day and night missions, integrating EO and thermal payloads within a compact autonomous platform.",
                keyHighlights: [
                    "Endurance: Up to 30 Minutes",
                    "Operational Range: Up to 2–3 KM",
                    "EO + Thermal Payload",
                    "Multi-Palette Thermal Imaging",
                    "Dual GPS Architecture",
                    "Real-Time Video Transmission"
                ],
                capabilities: ["Compact EO + Thermal", "Real-time transmission"],
                applications: ["Quick-response day/night ops", "Tactical ISR in compact areas"],
                performance: { endurance: "30m", range: "2-3km", payload: "EO+Thermal" },
                gallery: ["/partners/bard3.png", "/partners/bard2.jpeg", "/partners/bard1.png"]
            }
        ],
        specs: [
            { label: "Frame Size", value: "690mm" },
            { label: "Max AUW", value: "6.0kg" },
            { label: "Datalink", value: "Encrypted Secure" },
            { label: "Propulsion", value: "Electric Brushless" }
        ],
        features: [
            "Autonomous Waypoint Mission",
            "Object Tracking & Locking",
            "Target Geo-location Extraction",
            "Grenade Drop System Ready",
            "Anti-Jamming GNSS"
        ],
        imageClass: "product-image-bard",
        nickname: "SENTINEL",
        galleryImages: [
            "/partners/bard1.png",
            "/partners/bard2.jpeg",
            "/partners/bard3.png"
        ],
        whatsappNumber: "919494949698"
    },
    'horizon-vtol': {
        name: "HORIZON VTOL",
        tagline: "FIXED WING ISR · LONG RANGE",
        brand: "MAS",
        category: "ISR",
        description: "Vertical Take-Off and Landing (VTOL) ISR system for extended surveillance and tactical missions.",
        longDescription: "The HORIZON VTOL combines the efficiency of fixed-wing flight with the launch flexibility of a multirotor. It is the premier choice for long-endurance reconnaissance and beyond visual line of sight (BVLOS) defense operations, offering stable flight characteristics and advanced multi-axis stabilized sensor suites.",
        heroSpecs: [
            { label: "Endurance", value: "40m" },
            { label: "Range", value: "5km" },
            { label: "Wingspan", value: "1200mm" },
            { label: "AUW", value: "3.5kg" }
        ],
        featureCards: [
            {
                title: "VTOL Efficiency",
                description: "Seamless transition between vertical lift and efficient horizontal cruise for maximum field versatility."
            },
            {
                title: "Stabilized Imaging",
                description: "Equipped with a 3-axis gimbal system for crystal-clear ISR imagery during high-speed flight."
            },
            {
                title: "Strategic Range",
                description: "Optimized for 5km+ operational range with encrypted long-range telemetry and video feed."
            }
        ],
        variants: [
            { variant: "Day", type: "VTOL Fixed Wing ISR", endurance: "~40", range: "5", altitude: "700", agl: "300", frame: "1200mm", auw: "3.5", payload: "EO", camera: "EO 3-axis", feature: "Training/ISR" },
            { variant: "Day/Night", type: "VTOL Fixed Wing ISR", endurance: "~40", range: "5", altitude: "700", agl: "300", frame: "1200mm", auw: "3.5", payload: "EO/IR", camera: "EO/IR 3-axis", feature: "Day Night ISR" }
        ],
        specs: [
            { label: "Wingspan", value: "1200mm" },
            { label: "Flight Mode", value: "VTOL to Cruise" },
            { label: "Battery", value: "High-Density LiPo" },
            { label: "Max Speed", value: "75 KMPH" }
        ],
        features: [
            "Automatic Transition",
            "3-Axis Stabilized Gimbal",
            "NAVIC/GPS Navigation",
            "Rugged Composite Frame",
            "BVLOS Ready"
        ],
        imageClass: "product-image-aot",
        nickname: "OBSERVER",
        galleryImages: [
            "/partners/horizonvtol.png"
        ]
    },
    'horizon-fpv': {
        name: "HORIZON FPV",
        tagline: "FIXED WING TRAINER · HIGH SPEED",
        brand: "MAS",
        category: "TRAINER",
        description: "Dedicated high-endurance fixed-wing platform for advanced pilot training and FPV operations.",
        longDescription: "The HORIZON FPV is a specialized fixed-wing trainer designed for large-scale area familiarization and high-speed FPV pilot training. With a massive 1645mm wingspan, it offers exceptional glide performance and stability.",
        heroSpecs: [
            { label: "Endurance", value: "35m" },
            { label: "Range", value: "6km" },
            { label: "Wingspan", value: "1645mm" },
            { label: "AUW", value: "3.5kg" }
        ],
        featureCards: [
            {
                title: "Glider Performance",
                description: "1645mm wingspan provides superior lift-to-drag ratios for extended training sessions."
            },
            {
                title: "FPV Mastery",
                description: "Low-latency FPV camera system designed for high-speed maneuvering and pilot skill development."
            },
            {
                title: "Durable Frame",
                description: "Reinforced airframe built to withstand the rigors of repeated training cycles and field landings."
            }
        ],
        variants: [
            { variant: "FPV", type: "Fixed Wing Trainer", endurance: "~35", range: "6", altitude: "700", agl: "300", frame: "1645mm", auw: "3.5", payload: "0.5kg", camera: "FPV Camera", feature: "Trainer" }
        ],
        specs: [
            { label: "Wingspan", value: "1645mm" },
            { label: "Cruise Speed", value: "60 KMPH" },
            { label: "Max Payload", value: "0.5kg" },
            { label: "Range", value: "6km" }
        ],
        features: [
            "High Aspect Ratio Wings",
            "Low Latency FPV",
            "Modular Electronic Tray",
            "Field Repairable",
            "Precision Control Surface"
        ],
        imageClass: "product-image-sim",
        nickname: "SIMULATE",
        galleryImages: [
            "/partners/horizonfpv.jpeg"
        ]
    },
    'stinger': {
        name: "STINGER",
        tagline: "LOITERING MUNITION · KINETIC INTERCEPT",
        brand: "MAS",
        category: "TACTICAL",
        description: "High-performance attritable aircraft optimized for precision strike and loitering munition missions.",
        longDescription: "The STINGER family represents the cutting edge of kinetic interceptors and tactical loitering munitions. Ranging from 7 to 15 inches, these platforms are designed for high-speed interception, heavy payload delivery, and precision target engagement in contested environments.",
        heroSpecs: [
            { label: "Endurance", value: "40m" },
            { label: "Combat Range", value: "5km" },
            { label: "Max Payload", value: "2kg" },
            { label: "Speed", value: "120+ KPH" }
        ],
        featureCards: [
            {
                title: "Kinetic Precision",
                description: "High-KV motor configurations providing the agility needed for precise terminal phase maneuvers."
            },
            {
                title: "Heavy Payload",
                description: "Up to 2kg mission payload capacity in the 15-inch variant, suitable for a wide range of tactical roles."
            },
            {
                title: "Jam-Resistant Feed",
                description: "Optimized video links designed to maintain clarity in electronically dense environments."
            }
        ],
        variants: [
            { variant: "7 Inch Day", type: "FPV Quad Kamikaze", endurance: "~22", range: "2", altitude: "800", agl: "400", frame: "7 Inch", auw: "1.6", payload: "1kg", camera: "2K FPV", feature: "Trainer FPV" },
            { variant: "10 Inch Day/Night", type: "FPV Quad Kamikaze", endurance: "~35", range: "4", altitude: "800", agl: "400", frame: "10 Inch", auw: "2.4", payload: "1kg", camera: "EO+Thermal", feature: "Tactical FPV" },
            { variant: "15 Inch Day/Night", type: "FPV Quad Kamikaze", endurance: "~40", range: "5", altitude: "800", agl: "400", frame: "15 Inch", auw: "4.2", payload: "2kg", camera: "EO+Thermal", feature: "Heavy Lift FPV" }
        ],
        specs: [
            { label: "Frame Sizes", value: "7 / 10 / 15 Inch" },
            { label: "Max Speed", value: "140 KMPH" },
            { label: "Latency", value: "< 20ms" },
            { label: "Payload Max", value: "2.0kg" }
        ],
        features: [
            "High Discharge LiPo Support",
            "Reinforced Carbon Frame",
            "Emergency Detonate Ready",
            "Low Profile Design",
            "Extreme Agility"
        ],
        imageClass: "product-image-hydra",
        nickname: "HYDRA V4",
        galleryImages: [
            "/partners/stinger.jpeg"
        ]
    },
    'aot': {
        name: "Attritable Observation Trainer (AOT)",
        tagline: "TACTICAL TRAINER UAS · PROP GUARDED",
        brand: "MAS",
        category: "TRAINER",
        description: "Attritable Observation Trainer for tactical maneuvering and observation readiness.",
        longDescription: "The AOT 7-inch variant provides a responsive flight envelope for mastering complex tactical maneuvers and close-proximity observation fundamentals.",
        heroSpecs: [
            { label: "Endurance", value: "30m" },
            { label: "Range", value: "3km" },
            { label: "Alititude", value: "600m" },
            { label: "Frame", value: "7 Inch" }
        ],
        featureCards: [
            {
                title: "Pilot Safety",
                description: "Full-surround prop guards significantly reduce risk during indoor and close-proximity training."
            },
            {
                title: "Analog Feedback",
                description: "Zero-latency analog FPV feed for developing instant muscle memory and flight reaction speeds."
            },
            {
                title: "Indigenous Trainer",
                description: "Fully designed and serviced in-house to ensure high availability for military training commands."
            }
        ],
        variants: [
            { variant: "7 Inch Trainer", type: "Quadcopter Trainer", endurance: "~30", range: "3", altitude: "600", agl: "300", frame: "7 Inch", auw: "2", payload: "0.2kg", camera: "Analog FPV", feature: "Prop Guard Trainer" }
        ],
        specs: [
            { label: "Frame Size", value: "7 Inch" },
            { label: "Prop Guards", value: "Integrated 360" },
            { label: "AUW", value: "2.0kg" },
            { label: "Navigation", value: "Standard GPS" }
        ],
        features: [
            "Shatter-Resistant Guards",
            "High Visibility LEDs",
            "Telemetry for Instructor",
            "Modular Arm System",
            "Quick-Swap Battery"
        ],
        imageClass: "product-image-aot",
        nickname: "TRAINER",
        galleryImages: [
            "/partners/aot.png"
        ]
    },
    'raven': {
        name: "RAVEN",
        tagline: "SIMULATOR",
        brand: "MAS",
        category: "SIMULATOR",
        description: "",
        longDescription: "",
        heroSpecs: [],
        featureCards: [],
        variants: [],
        specs: [],
        features: [],
        imageClass: "product-image-sim",
        nickname: "RAVEN",
        galleryImages: [
            "/partners/r1.png",
            "/partners/r2.jpeg",
            "/partners/r3.jpeg"
        ]
    }
};
