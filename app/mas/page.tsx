'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useRef } from 'react';

export default function Mas() {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = 350;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="mas-page">
            <Navbar />

            {/* MAS Header Section */}
            <section className="mas-header">
                <div className="container" style={{ width: '100%', maxWidth: 'none', margin: '0' }}>
                    <div className="mas-logo-container">
                        <img
                            src="/partners/masicon.png"
                            alt="Major Aerospace Systems"
                            className="mas-main-logo"
                        />
                    </div>
                </div>
            </section>

            {/* Cinematic Mission Section & Partners */}
            <section className="mas-hero-content" style={{ marginTop: '0', padding: '1rem clamp(1.5rem, 5vw, 4rem) 2rem' }}>
                <div className="container" style={{ padding: 0 }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem',
                        lineHeight: '1.1',
                        maxWidth: '900px',
                        fontWeight: '900',
                        letterSpacing: '-1px'
                    }}>
                        REDEFINING DEFENCE WITH <br />
                        <span style={{ color: 'var(--accent-primary)' }}>INTELLIGENT AIRPOWER.</span>
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '1200px',
                        textAlign: 'left',
                        marginBottom: '1.5rem'
                    }}>
                        <div className="mission-para" style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>Major Aerospace Systems (MAS)</strong> — a Bharat-rooted global leader — stands at the forefront of software-defined warfare and Autonomous Aerial Systems (AAS). We pioneer the design and deployment of Edge AI-driven platforms and Group 1/2/3 UAVs for intelligent multi-domain command and control.
                            </p>
                        </div>
                        <div className="mission-para">
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                                Our solutions are engineered for an AI-enabled kill chain across <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>land, sea, air, and space</span>. MAS is redefining the future of national security, providing kinetic interceptors and beyond visual line of sight (BVLOS) defense architectures to protect sovereign interests.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container" id="partners" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', paddingBottom: '0' }}>
                    {/* Partner Section */}
                    <div className="partners-section" style={{ marginTop: '0' }}>
                        <h4 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '2px' }}>STRATEGIC PARTNERSHIPS</h4>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="partner-logo-grid" style={{
                                display: 'flex',
                                gap: 'clamp(2rem, 5vw, 5rem)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <div className="partner-logo-item" style={{ width: 'clamp(100px, 15vw, 140px)', display: 'flex', justifyContent: 'center' }}>
                                    <img src="/partners/d1.png" alt="Indian Army" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                </div>
                                <div className="partner-logo-item" style={{ width: 'clamp(100px, 15vw, 140px)', display: 'flex', justifyContent: 'center' }}>
                                    <img src="/partners/gunners.jpg" alt="Gunners" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                </div>
                                <div className="partner-logo-item" style={{ width: 'clamp(100px, 15vw, 140px)', display: 'flex', justifyContent: 'center' }}>
                                    <img src="/partners/navy.png" alt="Indian Navy" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAS Products */}
            <section id="products" className="products-section">
                <div className="container">
                    <div className="product-carousel-header" style={{ marginBottom: '2rem' }}>
                        <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>OUR PRODUCTS</h2>
                    </div>

                    <div className="product-carousel-container">
                        <div className="product-carousel" ref={carouselRef}>
                            {[
                                {
                                    id: 'raven',
                                    name: 'RAVEN',
                                    nickname: 'RAVEN',
                                    type: 'SIMULATOR',
                                    tagline: 'SIMULATOR',
                                    desc: '',
                                    image: '/partners/r1.png',
                                    link: '/products/raven/raven-trainer'
                                },
                                {
                                    id: 'bard',
                                    name: 'BARD Family',
                                    nickname: 'SENTINEL',
                                    type: 'GROUP 2 UAS',
                                    tagline: 'TACTICAL ISR PLATFORM',
                                    desc: 'Advanced autonomous aerial system supporting Day/Night Thermal ISR, LRF, and multi-mission payload integration.',
                                    image: '/partners/bard1.png',
                                    link: '/products/bard'
                                },
                                {
                                    id: 'horizon-vtol',
                                    name: 'HORIZON VTOL',
                                    nickname: 'OBSERVER',
                                    type: 'LONG RANGE ISR',
                                    tagline: 'FIXED WING VTOL',
                                    desc: 'Vertical Take-Off fixed-wing platform offering 40m endurance and stabilized 3-axis imagery.',
                                    image: '/partners/horizonvtol.png',
                                    link: '/products/horizon-vtol'
                                },
                                {
                                    id: 'horizon-fpv',
                                    name: 'HORIZON FPV',
                                    nickname: 'MASTER',
                                    type: 'ADVANCED TRAINER',
                                    tagline: 'FIXED WING FPV',
                                    desc: 'Large-scale 1645mm wingspan trainer for high-speed area familiarization and FPV training.',
                                    image: '/partners/horizonfpv.jpeg',
                                    link: '/products/horizon-fpv'
                                },
                                {
                                    id: 'stinger',
                                    name: 'STINGER Family',
                                    nickname: 'STRIKE',
                                    type: 'KINETIC INTERCEPT',
                                    tagline: 'LOITERING MUNITION',
                                    desc: 'Attritable, high-performance platform (7-15\") engineered for precision kinetic intercept and heavy payload strike.',
                                    image: '/partners/stinger.jpeg',
                                    link: '/products/stinger'
                                },
                                {
                                    id: 'aot',
                                    name: 'AOT (7 Inch)',
                                    nickname: 'CADET',
                                    type: 'PILOT TRAINING',
                                    tagline: 'ATTRITABLE TRAINER SYSTEM',
                                    desc: 'Shatter-resistant aerial training system with integrated guards and zero-latency hardware feedback.',
                                    image: '/partners/aot.png',
                                    link: '/products/aot'
                                }
                            ].map((product) => (
                                <div className="product-carousel-item" key={product.id}>
                                    <div className="product-card">
                                        <span className="corner corner-tl"></span>
                                        <span className="corner corner-tr"></span>
                                        <span className="corner corner-bl"></span>
                                        <span className="corner corner-br"></span>

                                        <div className="product-image" style={{ background: '#000', position: 'relative', overflow: 'hidden' }}>
                                            <div className="product-type-badge">{product.type}</div>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                    opacity: 0.9,
                                                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                                                }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                                                    (e.currentTarget as HTMLImageElement).style.opacity = '1';
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                                                    (e.currentTarget as HTMLImageElement).style.opacity = '0.9';
                                                }}
                                            />
                                        </div>
                                        <div className="product-content">
                                            <span className="product-tagline">{product.tagline}</span>
                                            <h3>{product.name}</h3>
                                            <p>{product.desc}</p>
                                            <Link href={product.link} className="btn-text">View Specifications &rarr;</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="swipe-hint">← Swipe to explore →</p>
                    <div className="carousel-controls" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            onClick={() => scrollCarousel('left')}
                            className="nav-arrow-btn"
                            aria-label="Scroll Left"
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--accent-primary)';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--accent-primary)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            &larr;
                        </button>
                        <button
                            onClick={() => scrollCarousel('right')}
                            className="nav-arrow-btn"
                            aria-label="Scroll Right"
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--accent-primary)';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--accent-primary)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            &rarr;
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .product-carousel {
                    display: flex;
                    gap: 2rem;
                    overflow-x: auto;
                    padding-bottom: 2rem;
                    scroll-behavior: smooth;
                    scrollbar-width: none;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                    padding-left: 2rem;
                    padding-right: 2rem;
                }
                .product-carousel::-webkit-scrollbar {
                    display: none;
                }
                .product-carousel-item {
                    flex: 0 0 380px;
                    scroll-snap-align: start;
                }
                .swipe-hint {
                    display: none;
                }
                @media (max-width: 768px) {
                    .product-carousel {
                        gap: 1.2rem;
                        padding-left: 1.2rem;
                        padding-right: 1.2rem;
                        padding-bottom: 1.5rem;
                    }
                    .product-carousel-item {
                        flex: 0 0 88vw;
                    }
                    .swipe-hint {
                        display: block;
                        text-align: center;
                        font-family: var(--font-mono);
                        font-size: 0.65rem;
                        color: var(--text-tertiary);
                        letter-spacing: 2px;
                        margin-bottom: 1rem;
                        text-transform: uppercase;
                    }
                    .carousel-controls {
                        display: none;
                    }
                }
                @media (max-width: 480px) {
                    .product-carousel-item {
                        flex: 0 0 92vw;
                    }
                }
            `}</style>
        </div>
    );
}
