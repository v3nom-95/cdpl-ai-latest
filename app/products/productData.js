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
        name: "HORIZON 120 – VTOL",
        tagline: "FIXED WING VTOL · TRAINER & ISR",
        brand: "MAS",
        category: "ISR",
        description: "VTOL Fixed-Wing platform combining vertical takeoff with efficient cruise for extended reconnaissance.",
        longDescription: "HORIZON 120 VTOL combines vertical takeoff capability with efficient fixed-wing cruise performance. Designed for training and ISR applications, the platform supports autonomous waypoint navigation and stabilized observation. It is the premier choice for long-endurance missions without the need for runways.",
        heroSpecs: [
            { label: "Endurance", value: "40m" },
            { label: "Range", value: "4km" },
            { label: "Wingspan", value: "1200mm" },
            { label: "AUW", value: "3.5kg" }
        ],
        performanceMetrics: [
            { label: "CRUISE_STABILITY", value: 92, unit: "%" },
            { label: "VTOL_PRECISION", value: 95, unit: "%" },
            { label: "ENDURANCE_RATING", value: 88, unit: "%" },
            { label: "IMAGE_STABILITY", value: 94, unit: "%" }
        ],
        featureCards: [
            {
                title: "VTOL Hybrid Configuration",
                description: "Seamless vertical takeoff and landing with the efficiency of fixed-wing horizontal cruise."
            },
            {
                title: "Stabilized Observations",
                description: "3-axis stabilized gimbal system ensures vibration-free imagery for precision reconnaissance."
            },
            {
                title: "Rapid Deployment",
                description: "Lightweight composite airframe designed for quick assembly and hand-launched/VTOL operations."
            }
        ],
        variants: [
            { 
                id: "day",
                variant: "Day Variant", 
                type: "VTOL Fixed Wing ISR", 
                description: "Designed for stabilized day observation and training with autonomous waypoint navigation.",
                keyHighlights: [
                    "VTOL Fixed-Wing Configuration",
                    "Endurance: Up to 30–40 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "3-Axis Stabilized Day EO Gimbal",
                    "Wingspan: 1200 mm",
                    "Lightweight Composite Airframe",
                    "Portable Ground Control Station (7” Display)"
                ],
                capabilities: ["Vertical Takeoff", "Fixed-Wing Cruise", "Autonomous Navigation"],
                applications: ["Daytime ISR", "UAV Pilot Training", "Perimeter Surveillance"],
                performance: { endurance: "30-40m", range: "3-4km", payload: "Day EO" },
                gallery: ["/partners/horizonvtol.png"]
            },
            { 
                id: "day-night",
                variant: "Day/Night EO/IR Variant", 
                type: "VTOL Fixed Wing ISR", 
                description: "Modular VTOL UAV designed for extended aerial observation in both day and night conditions.",
                keyHighlights: [
                    "VTOL Fixed-Wing Platform",
                    "Endurance: Up to 30–40 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "3-Axis Stabilized EO/IR Gimbal",
                    "1200 mm Wingspan",
                    "Low Visual & Acoustic Signature",
                    "Integrated Handheld Ground Control Station"
                ],
                capabilities: ["Thermal Imaging", "Night Operations", "Signature Mitigation"],
                applications: ["Night Reconnaissance", "Tactical ISR", "BVLOS Operations"],
                performance: { endurance: "30-40m", range: "3-4km", payload: "EO/IR" },
                gallery: ["/partners/horizonvtol.png"]
            }
        ],
        specs: [
            { label: "Wingspan", value: "1200mm" },
            { label: "Flight Mode", value: "VTOL to Cruise" },
            { label: "Airframe", value: "Composite Material" },
            { label: "Max Speed", value: "75 KMPH" }
        ],
        features: [
            "Autonomous Waypoint Navigation",
            "3-Axis Stabilized Gimbal",
            "NAVIC/GPS Integration",
            "Low Acoustic Signature",
            "Portable GCS System"
        ],
        imageClass: "product-image-aot",
        nickname: "OBSERVER",
        galleryImages: [
            "/partners/horizonvtol.png"
        ],
        whatsappNumber: "919494949698"
    },
    'horizon-fpv': {
        name: "HORIZON 160 FPV",
        tagline: "FIXED WING TRAINER · FPV SERIES",
        brand: "MAS",
        category: "TRAINER",
        description: "Hand-launched delta-wing trainer for realistic UAV flight and FPV mission familiarization.",
        longDescription: "Horizon 160 FPV is a lightweight delta-wing fixed-wing trainer designed for realistic UAV flight training and FPV mission familiarization. The hand-launch configuration enables rapid deployment without runway dependency, supporting operator skill development in navigation, recovery, and mission execution.",
        heroSpecs: [
            { label: "Endurance", value: "45m" },
            { label: "Range", value: "4km" },
            { label: "Wingspan", value: "1600mm" },
            { label: "Speed", value: "16m/s" }
        ],
        performanceMetrics: [
            { label: "AGILITY_INDEX", value: 95, unit: "%" },
            { label: "DEPLOYMENT_SPEED", value: 98, unit: "%" },
            { label: "FPV_CLARITY", value: 90, unit: "%" },
            { label: "TRAINER_RATING", value: 96, unit: "%" }
        ],
        featureCards: [
            {
                title: "Hand-Launched Efficiency",
                description: "Rapid deployment delta configuration, eliminating the need for runways or launch gear."
            },
            {
                title: "FPV Mission Skills",
                description: "2K FPV camera system designed for high-fidelity pilot training and navigation drills."
            },
            {
                title: "Safety First",
                description: "Integrated Geo-Fencing and Return-to-Home (RTH) features for safe training environments."
            }
        ],
        variants: [
            { 
                id: "160-fpv",
                variant: "Horizon 160 FPV", 
                type: "Fixed Wing Trainer", 
                description: "Hand-launched delta wing for advanced pilot mastery.",
                keyHighlights: [
                    "Hand-Launched Delta Configuration",
                    "Wingspan: 1600 mm",
                    "Endurance: Up to 35–45 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "Cruise Speed: 14–16 m/s",
                    "2K FPV Camera System",
                    "Manual Flight + Return-to-Home (RTH)",
                    "Geo-Fencing Enabled",
                    "Low Visual & Acoustic Signature"
                ],
                capabilities: ["Manual/Acro Flight", "Long Range Telemetry", "Delta-Wing Aerodynamics"],
                applications: ["FPV Pilot Training", "Area Familiarization", "Skill Development"],
                performance: { endurance: "35-45m", range: "3-4km", payload: "2K FPV" },
                gallery: ["/partners/horizonfpv.jpeg"]
            }
        ],
        specs: [
            { label: "Wingspan", value: "1600mm" },
            { label: "Cruise Speed", value: "14-16 m/s" },
            { label: "Launch", value: "Hand Launch" },
            { label: "Safety", value: "Geo-Fencing/RTH" }
        ],
        features: [
            "2K Low-Latency FPV",
            "Automatic RTH on Lost Link",
            "Eco-friendly Materials",
            "Field Repairable Delta Wing",
            "Low Operational Signature"
        ],
        imageClass: "product-image-sim",
        nickname: "MASTER",
        galleryImages: [
            "/partners/horizonfpv.jpeg"
        ],
        whatsappNumber: "919494949698"
    },
    'stinger': {
        name: "STINGER SERIES",
        tagline: "TACTICAL TRAINER · FPV PLATFORM",
        brand: "MAS",
        category: "TACTICAL",
        description: "High-agility FPV tactical training platforms optimized for speed, precision, and mission rehearsal.",
        longDescription: "The STINGER family represents the peak of FPV tactical training systems. Engineered for high-speed maneuvering and precision control, these platforms allow pilots to rehearse complex mission profiles in a cost-effective, high-performance architecture ranging from 7 to 15 inches.",
        heroSpecs: [
            { label: "Max Endurance", value: "35m" },
            { label: "Max Range", value: "5km" },
            { label: "Top Speed", value: "26m/s" },
            { label: "Frame Sizes", value: "7\"-15\"" }
        ],
        performanceMetrics: [
            { label: "REACTION_SPEED", value: 99, unit: "%" },
            { label: "WIND_RESISTANCE", value: 94, unit: "%" },
            { label: "SIGNAL_STABILITY", value: 92, unit: "%" },
            { label: "MANEUVERABILITY", value: 98, unit: "%" }
        ],
        featureCards: [
            {
                title: "Exceptional Agility",
                description: "High-KV power systems enabling extreme acrobatic maneuvers and tactical intercepts."
            },
            {
                title: "Modular Payload",
                description: "Support for diverse imaging systems from 2K FPV to advanced Dual EO/Thermal gimbals."
            },
            {
                title: "Safety & Recovery",
                description: "Standard integrated Return-to-Home and Geo-Fencing protocols to protect training assets."
            }
        ],
        variants: [
            { 
                id: "stinger-7",
                variant: "STINGER 7” – Day Variant", 
                type: "Compact FPV Tactical Trainer", 
                description: "High-agility platform for precision maneuver drills and reflex-based pilot development.",
                keyHighlights: [
                    "7” Frame Configuration",
                    "Endurance: Up to 20–22 Minutes",
                    "Operational Range: Up to 1–2 KM",
                    "Top Speed: 22–24 m/s",
                    "2K FPV Camera",
                    "Stabilized / Acro / Manual Modes",
                    "Return-to-Home & Geo-Fencing",
                    "Modular Payload Architecture",
                    "Low Visual & Acoustic Signature"
                ],
                capabilities: ["Precision Maneuvering", "Acro Support", "Low Latency Feed"],
                applications: ["Pilot Skill Drills", "Obstacle Navigation", "Reflex Training"],
                performance: { endurance: "20-22m", range: "1-2km", payload: "2K FPV" },
                gallery: ["/partners/stinger.jpeg"]
            },
            { 
                id: "stinger-10",
                variant: "STINGER 10” – Day/Night Variant", 
                type: "Extended-Endurance FPV Platform", 
                description: "Designed for advanced FPV training and extended-range tactical simulations.",
                keyHighlights: [
                    "10” Frame Configuration",
                    "Endurance: Up to 25–30 Minutes",
                    "Operational Range: Up to 3–4 KM",
                    "HD Day + Thermal Imaging",
                    "Top Speed: 24–26 m/s",
                    "Multiple Flight Modes",
                    "Return-to-Home & Geo-Fencing",
                    "Modular Payload Support",
                    "Low Operational Signature"
                ],
                capabilities: ["Thermal Navigation", "Extended Range", "Multi-Mode Flight"],
                applications: ["Night Familiarization", "Tactical Simulations", "Search Drills"],
                performance: { endurance: "25-30m", range: "3-4km", payload: "EO/IR" },
                gallery: ["/partners/stinger.jpeg"]
            },
            { 
                id: "stinger-15",
                variant: "STINGER 15” – Day/Night Gimbal Variant", 
                type: "Heavy-Lift FPV Tactical Platform", 
                description: "High-endurance platform engineered for advanced operational training and heavier payload integration.",
                keyHighlights: [
                    "15” Reinforced Frame",
                    "Endurance: Up to 30–35 Minutes",
                    "Operational Range: Up to 4–5 KM",
                    "HD Day + Thermal Imaging",
                    "Enhanced Lift Capability",
                    "Multiple Flight Modes",
                    "Return-to-Home & Geo-Fencing",
                    "Low Visual & Acoustic Signature"
                ],
                capabilities: ["Heavy Lift Support", "Gimbal Stabilization", "Persistent Recon"],
                applications: ["Heavy Payload Training", "Mission Rehearsal", "Enhanced Surveillance"],
                performance: { endurance: "30-35m", range: "4-5km", payload: "EO/IR Gimbal" },
                gallery: ["/partners/stinger.jpeg"]
            }
        ],
        specs: [
            { label: "Frame Sizes", value: "7 / 10 / 15 Inch" },
            { label: "Top Speed", value: "26 m/s (93 KPH)" },
            { label: "Datalink", value: "Long Range ELRS/Ghost" },
            { label: "Link Latency", value: "< 20ms" }
        ],
        features: [
            "Reinforced Carbon Fiber Frame",
            "High-Output ESC Architecture",
            "Stabilized/Acro/Manual Modes",
            "Return-to-Home Protocols",
            "Rugged Field Design"
        ],
        imageClass: "product-image-hydra",
        nickname: "STRIKE",
        galleryImages: [
            "/partners/stinger.jpeg"
        ],
        whatsappNumber: "919494949698"
    },
    'aot': {
        name: "A.O.T. (Air Observer Trainer)",
        tagline: "MULTI-ROTOR · PROP GUARD SERIES",
        brand: "MAS",
        category: "TRAINER",
        description: "Compact quadcopter with integrated propeller guards for safe indoor and confined-area pilot training.",
        longDescription: "AOT (Air Observer Trainer) is a compact 7” quadcopter designed for structured FPV pilot training and close-proximity maneuver drills. The integrated propeller guard system enhances safety during indoor and confined-area operations, making it ideal for foundational and intermediate-level operator development.",
        heroSpecs: [
            { label: "Endurance", value: "30m" },
            { label: "Range", value: "2km" },
            { label: "Frame", value: "7\" Rugged" },
            { label: "Safety", value: "Prop Guards" }
        ],
        performanceMetrics: [
            { label: "SAFETY_RATING", value: 99, unit: "%" },
            { label: "INDOOR_AGILITY", value: 95, unit: "%" },
            { label: "DURABILITY", value: 98, unit: "%" },
            { label: "STABILITY", value: 92, unit: "%" }
        ],
        featureCards: [
            {
                title: "Safety-First Architecture",
                description: "Rugged wrap-around propeller guards designed to protect both the platform and the environment."
            },
            {
                title: "Confined Space Mastery",
                description: "Small footprint and high stability for mastering flight in GPS-denied and indoor environments."
            },
            {
                title: "Progressive Learning",
                description: "Multiple flight modes from full stabilization to manual acro for comprehensive skill building."
            }
        ],
        variants: [
            { 
                id: "aot-7",
                variant: "A.O.T. 7” Variant", 
                type: "Prop-Guarded Trainer", 
                description: "7” quadcopter designed for close-proximity maneuver training.",
                keyHighlights: [
                    "7” Rugged Frame with Prop Guard",
                    "Endurance: Up to 30 Minutes",
                    "Operational Range: Up to 1–2 KM",
                    "Cruise Speed: 10–12 m/s",
                    "2K FPV Camera",
                    "Stabilized / Acro / Manual Modes",
                    "Return-to-Home & Geo-Fencing",
                    "Low Visual & Acoustic Signature"
                ],
                capabilities: ["Indoor Stability", "Crash Resilience", "Obstacle Proximity"],
                applications: ["Foundational Training", "CQB Maneuvering", "Safety Familiarization"],
                performance: { endurance: "30m", range: "1-2km", payload: "2K FPV" },
                gallery: ["/partners/aot.png"]
            }
        ],
        specs: [
            { label: "Frame", value: "7 Inch Rugged Carbon" },
            { label: "Safety", value: "360 Prop Guard" },
            { label: "Propulsion", value: "Brushless Electric" },
            { label: "Video", value: "Zero-Latency 2K" }
        ],
        features: [
            "Rugged Propeller Guards",
            "Multiple Flight Skill Modes",
            "High-Intensity Visibility LED",
            "Compact Modular Build",
            "Safe Indoor Deployment"
        ],
        imageClass: "product-image-aot",
        nickname: "CADET",
        galleryImages: [
            "/partners/aot.png"
        ],
        whatsappNumber: "919494949698"
    },
    'raven': {
        name: "RAVEN UAV Simulator",
        tagline: "UAV SIMULATOR · TRAINER SERIES",
        brand: "MAS",
        category: "SIMULATOR",
        description: "Plug-and-play UAV simulation system for structured multi-platform drone training.",
        longDescription: "RAVEN is a plug-and-play UAV simulation system designed for structured multi-platform drone training. The system supports FPV, rotary, and fixed-wing mission environments with realistic terrain rendering and physics-based simulation, enabling risk-free mastery of complex aerial maneuvers.",
        heroSpecs: [
            { label: "Display", value: "27\" Curved" },
            { label: "Computing", value: "14th Gen i5" },
            { label: "Graphics", value: "RTX 3050" },
            { label: "System", value: "Plug-and-Play" }
        ],
        performanceMetrics: [
            { label: "PHYSICS_ACCURACY", value: 98, unit: "%" },
            { label: "LATENCY", value: 2, unit: "ms" },
            { label: "RENDER_QUALITY", value: 95, unit: "%" },
            { label: "TRAINING_ROI", value: 100, unit: "%" }
        ],
        featureCards: [
            {
                title: "Immersive Visuals",
                description: "27” Curved High-Refresh Display for tactical environmental awareness and depth perception."
            },
            {
                title: "High-Core Performance",
                description: "Powered by 14th Gen Intel i5 and NVIDIA RTX 3050 for lag-free, high-fidelity physics."
            },
            {
                title: "Complete Training Kit",
                description: "Integrated FPV goggles, radio transmitter, and built-in UPS backup for uninterrupted sessions."
            }
        ],
        variants: [
            { 
                id: "raven-trainer",
                variant: "RAVEN Simulator System", 
                type: "Professional UAV Trainer", 
                description: "The complete simulation solution for modern UAV operators.",
                keyHighlights: [
                    "27” Curved High-Refresh Display",
                    "Intel i5 (14th Gen) Performance Core",
                    "NVIDIA RTX 3050 (8GB Graphics)",
                    "16GB RAM | 1TB SSD",
                    "Integrated FPV Goggles & Radio Transmitter",
                    "Built-in UPS Backup",
                    "Pre-Loaded Licensed Simulation Software"
                ],
                capabilities: ["Multi-Platform Sim", "FPV Mastery", "Mission Planning"],
                applications: ["New Pilot Training", "Mission Profile Testing", "Advanced Acro Drills"],
                performance: { endurance: "Unlimited", range: "N/A", payload: "Software" },
                gallery: ["/partners/r1.png", "/partners/r2.jpeg", "/partners/r3.jpeg"]
            }
        ],
        specs: [
            { label: "Display", value: "27\" Curved Refresh" },
            { label: "Controller", value: "Integrated Radio" },
            { label: "Backup", value: "Built-in UPS" },
            { label: "Software", value: "Multi-UAV Licensed" }
        ],
        features: [
            "Realistic Physics Engine",
            "Support for FPV/Fixed/Rotary",
            "High-Fidelity Terrain Rendering",
            "Plug-and-Play Setup",
            "Comprehensive Mission Log"
        ],
        imageClass: "product-image-sim",
        nickname: "MAESTRO",
        galleryImages: [
            "/partners/r1.png",
            "/partners/r2.jpeg",
            "/partners/r3.jpeg"
        ],
        whatsappNumber: "919494949698"
    }
};
