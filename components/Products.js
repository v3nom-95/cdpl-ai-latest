'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    const [titleText, setTitleText] = useState(product.title);
    const intervalRef = useRef(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    const startScramble = () => {
        let iteration = 0;
        const originalText = product.title;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setTitleText(prev =>
                originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= originalText.length) {
                clearInterval(intervalRef.current);
                setTitleText(originalText);
            }

            iteration += 1 / 2;
        }, 30);
    };

    const handleMouseEnter = () => {
        startScramble();
    };

    return (
        <div className="product-card" onMouseEnter={handleMouseEnter}>
            {/* Corner Brackets */}
            <span className="corner corner-tl"></span>
            <span className="corner corner-tr"></span>
            <span className="corner corner-bl"></span>
            <span className="corner corner-br"></span>

            <Link href={product.link} style={{ display: 'block', textDecoration: 'none' }}>
                <div className={`product-image ${product.imageClass}`} style={{ cursor: 'pointer' }}>
                    <div className="product-type-badge">{product.type}</div>
                </div>
            </Link>
            <div className="product-content">
                <span className="product-tagline">{product.tagline}</span>
                <h3>{titleText}</h3>
                <p>{product.description}</p>
                <div className="product-stats">
                    {product.stats.map((stat, index) => (
                        <div className="stat-item" key={index}>
                            <span className="stat-val">{stat.val}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
                <a href={product.link} className="btn-text">View Specifications &rarr;</a>
            </div>
        </div>
    );
};

export default function Products() {
    const products = [
        {
            id: "aot",
            title: "Aerial Observation Trainer",
            type: "TRAINER",
            tagline: "SURVEILLANCE & TRAINING",
            description: "Attritable aircraft for surveillance and pilot training, leveraging edge computing modules for seamless tactical integration.",
            stats: [
                { val: "HD", label: "Video" },
                { val: "45 Min", label: "Endurance" },
                { val: "5km", label: "Range" },
            ],
            imageClass: "product-image-aot",
            link: "/products/aot"
        },
        {
            id: "bard",
            title: "Battlefield Aerial Reconnaissance Device",
            type: "RECON",
            tagline: "TACTICAL AUTONOMY",
            description: "A Group 2 UAS built for real-time surveillance, target acquisition, and establishing a robust AI-enabled kill chain.",
            stats: [
                { val: "100km", label: "Op Range" },
                { val: "AI", label: "Vision Core" },
                { val: "IP67", label: "Rugged" },
            ],
            imageClass: "product-image-bard",
            link: "/products/bard"
        },
        {
            id: "tdfs",
            title: "UAS Tactical Flight Simulator",
            type: "SIMULATOR",
            tagline: "WAR-GAMING",
            description: "A hyper-realistic UAS piloting and air defense training simulator featuring Sensor Fusion and high-resolution immersive visuals.",
            stats: [
                { val: "4K", label: "Res" },
                { val: "0ms", label: "Lag" },
                { val: "VR", label: "Support" },
            ],
            imageClass: "product-image-tdfs",
            link: "/products/raven"
        }
    ];

    return (
        <section id="products" className="products-section">
            <div className="container">
                <h2 className="section-title">Our Products</h2>
                <p className="section-subtitle">Engineered for Defence, Disaster Relief, and Heavy Logistics.</p>

                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};
