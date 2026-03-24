'use client';

import Link from 'next/link';

const CategoryCard = ({ category }) => {
    return (
        <div
            className="product-card"
            style={category.cardBg ? { backgroundColor: category.cardBg, borderColor: 'rgba(255,255,255,0.1)' } : {}}
        >
            <span className="corner corner-tl"></span>
            <span className="corner corner-tr"></span>
            <span className="corner corner-bl"></span>
            <span className="corner corner-br"></span>

            {/* Image slot — always white background for logos */}
            <div
                className="product-image"
                style={{
                    background: '#ffffff',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem'
                }}
            >

                {category.logo && (
                    <img
                        src={category.logo}
                        alt={category.title}
                        style={{
                            maxHeight: '130px',
                            maxWidth: '80%',
                            objectFit: 'contain',
                            display: 'block'
                        }}
                    />
                )}
                {!category.logo && (
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'rgba(0,0,0,0.2)',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        [ LOGO PENDING ]
                    </div>
                )}
            </div>

            <div className="product-content">
                <span
                    className="product-tagline"
                    style={category.textColor ? { color: 'rgba(255,255,255,0.6)' } : {}}
                >
                    {category.tagline}
                </span>
                <h3 style={category.textColor ? { color: category.textColor } : {}}>
                    {category.title}
                </h3>
                <p style={category.textColor ? { color: 'rgba(255,255,255,0.8)' } : {}}>
                    {category.description}
                </p>
                <Link
                    href={category.link}
                    className="btn-text"
                    style={category.textColor ? { color: '#FFFFFF' } : {}}
                >
                    Explore Systems &rarr;
                </Link>
            </div>
        </div>
    );
};

export default function ProductCategories() {
    const categories = [
        {
            id: "mas",
            title: "Major Aerospace Systems",
            tagline: "A BRAND OF CDPL",
            description: "Dedicated to the design and development of advanced Autonomous Aerial Systems (AAS) and Group 1/2/3 UAS, delivering software-defined warfare supremacy for defense and institutional surveillance.",
            logo: "/partners/masicon.png",
            link: "/mas",
            cardBg: "#000052",
            textColor: "#FFFFFF"
        },
        {
            id: "mms",
            title: "Major Marine Systems",
            tagline: "CDPL MARINE DIVISION",
            description: "Pioneering distributed maritime operations and seabed warfare, delivering Autonomous Submarines and Unmanned Surface Vehicles (USVs) for asymmetric naval warfare.",
            logo: "/partners/mmsicon.png",
            link: "/mms",
            cardBg: "#000052",
            textColor: "#FFFFFF"
        },
        {
            id: "mgs",
            title: "Major Ground Systems",
            tagline: "CDPL GROUND DIVISION",
            description: "Developing advanced Unmanned Ground Vehicles (UGVs) and Defense Robotics engineered for complex counter-UAS (C-UAS), human-machine teaming, and resilient logistics.",
            logo: "/partners/mgsicon.png",
            link: "/mgs",
            cardBg: "#000052",
            textColor: "#FFFFFF"
        }
    ];

    return (
        <section id="products" className="products-section">
            <div className="container">
                <h2 className="section-title">Brand Hierarchy</h2>
                <p className="section-subtitle">Pioneering Autonomy across Air, Sea, and Land domains.</p>

                <div className="products-grid">
                    {categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}

