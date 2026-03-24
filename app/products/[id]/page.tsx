'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductRequest from '../../../components/ProductRequest';
import { products } from '../productData';
import Link from 'next/link';

export default function ProductPage() {
    const params = useParams();
    const id = (params.id as string) || '';
    const product = products[id as keyof typeof products] as any;
    const [activeImage, setActiveImage] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const isBard = id === 'bard';

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        document.querySelectorAll('.reveal-section').forEach(section => {
            observer.observe(section);
        });

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="section-title">Product Not Found</h1>
                        <Link href="/" className="btn btn-primary mt-10">Back to Home</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isBard) {
        return (
            <div className="product-detail-page bg-white" style={{ color: 'var(--text-primary)' }}>
                <Navbar />

                {/* Tech Hero Section - Unified with Home Style */}
                <section className="hero-section tech-hero-section" style={{ background: '#000', height: '100vh', position: 'relative', padding: 0 }}>
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src="/partners/bardvideo.mp4" type="video/mp4" />
                    </video>

                    <div className="hero-overlay"></div>

                    {/* Product Info - Bottom Left Overlay */}
                    <div className="hero-info-content" style={{
                        position: 'absolute',
                        bottom: 'clamp(2rem, 6vh, 4rem)',
                        left: 'clamp(1.5rem, 5vw, 4rem)',
                        zIndex: 25,
                        maxWidth: '480px',
                        textAlign: 'left',
                        opacity: Math.max(1 - scrollY / 600, 0),
                        transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
                        transition: 'opacity 0.2s cubic-bezier(0.1, 0.5, 0.5, 1), transform 0.2s cubic-bezier(0.1, 0.5, 0.5, 1)',
                        willChange: 'transform, opacity',
                        borderLeft: '2px solid var(--accent-primary)',
                        paddingLeft: 'clamp(0.8rem, 1.5vw, 1.2rem)'
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                            fontWeight: '900',
                            lineHeight: '1',
                            marginBottom: '0.6rem',
                            color: '#ffffff',
                            letterSpacing: '-1px',
                            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                        }}>
                            {product.name.toUpperCase()}
                        </h1>

                        <p style={{
                            fontSize: 'clamp(0.65rem, 1.2vw, 0.78rem)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            maxWidth: '360px',
                            margin: '0',
                            fontWeight: '600',
                            lineHeight: '1.6',
                            letterSpacing: '2.5px',
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                            fontFamily: 'var(--font-mono)',
                            textTransform: 'uppercase'
                        }}>
                            {product.tagline}
                        </p>
                    </div>

                    {/* Scroll indicator removed as per request */}
                </section>

                {/* Simplified Specs Section (Visible on scroll) */}
                <section className="reveal-section" style={{ background: '#000', padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="tech-stats-grid-mobile" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 6rem)' }}>
                            {product.heroSpecs.map((spec: any, i: number) => (
                                <div key={i} className="tech-stat-block" style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{spec.label}</div>
                                    <div style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '900', color: '#fff' }}>{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tactical Context Section */}
                <section className="reveal-section bard-context-section" style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#fff' }}>
                    <div className="scanline-v2"></div>
                    <div className="container bard-context-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 6vw, 4rem)', alignItems: 'center', padding: 'clamp(4rem, 10vh, 8rem) 1.5rem' }}>
                        <div>
                            <span style={{ color: 'var(--accent-primary)', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '700' }}>[ MISSION_READY ]</span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 4rem)', fontWeight: '800', margin: '1.5rem 0', lineHeight: '1.1', color: 'var(--text-primary)' }}>TACTICAL ISR</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', marginBottom: '3rem' }}>
                                Every system is a modular node in a vast, autonomous network. {product.description}
                            </p>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className="gallery-frame" style={{ aspectRatio: '16/10', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <img src={product.galleryImages[0]} alt="Bard Action" className="main-gallery-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="gallery-overlay-tech">
                                    <div className="tech-tag top-left" style={{ background: 'var(--accent-primary)', color: '#000' }}>AERIAL_RECON</div>
                                    <div className="tech-tag bottom-right" style={{ background: 'var(--accent-primary)', color: '#000' }}>360_SENSORY_SWEEP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Factor Breakdown */}
                <section className="reveal-section" style={{ background: '#fafafa', padding: 'clamp(4rem, 8vh, 10rem) 0', borderTop: '1px solid #eee' }}>
                    <div className="container">
                        <div style={{ marginBottom: 'clamp(2.5rem, 6vh, 6rem)' }}>
                            <span style={{ color: 'var(--accent-primary)', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '700' }}>[ VARIANTS ]</span>
                            <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 5rem)', fontWeight: '900', marginTop: '1rem', letterSpacing: '-1px', color: 'var(--text-primary)' }}>THE BARD FAMILY</h2>
                        </div>

                        <div className="form-factor-container">
                            {product.variants.map((v: any, i: number) => {
                                // Unified color palette from provided theme - Applied to accents on white cards
                                const themes = [
                                    { color: '#0039A6', label: 'STD_UNIT' },
                                    { color: '#005C9E', label: 'THERMAL_OPTIC' },
                                    { color: '#584E41', label: 'LRF_TARGETING' },
                                    { color: '#CC5D29', label: 'AI_INTEGRATED' },
                                    { color: '#960606', label: 'MISSION_CFG' },
                                    { color: '#000000', label: 'CFG_THERMAL' }
                                ];
                                const theme = themes[i % themes.length];

                                return (
                                    <Link key={i} href={`/products/${id}/${v.id}`} className="form-factor-card" style={{
                                        background: '#fff',
                                        borderColor: 'rgba(0,0,0,0.08)',
                                        color: 'var(--text-primary)',
                                        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                                        position: 'relative',
                                        textDecoration: 'none',
                                        transition: 'transform 0.3s ease, border-color 0.3s ease'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '2rem',
                                            right: '2rem',
                                            fontSize: '0.6rem',
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--text-tertiary)',
                                            letterSpacing: '2px'
                                        }}>
                                            [ {theme.label} ]
                                        </div>

                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '4px',
                                            height: '100%',
                                            background: theme.color
                                        }}></div>

                                        <h3 style={{ color: 'var(--text-primary)', fontSize: '2rem', letterSpacing: '-1px' }}>{v.variant}</h3>
                                        <p style={{ color: theme.color, marginBottom: '3rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: '700' }}>
                                            {v.type}
                                        </p>

                                        <ul className="spec-list" style={{ marginTop: '2rem' }}>
                                            <li style={{ borderBottomColor: '#f1f5f9' }}><span style={{ color: 'var(--text-tertiary)' }}>ENDURANCE</span><span style={{ color: 'var(--text-primary)' }}>{v.performance.endurance}</span></li>
                                            <li style={{ borderBottomColor: '#f1f5f9' }}><span style={{ color: 'var(--text-tertiary)' }}>RANGE</span><span style={{ color: 'var(--text-primary)' }}>{v.performance.range}</span></li>
                                            <li style={{ borderBottomColor: '#f1f5f9' }}><span style={{ color: 'var(--text-tertiary)' }}>PAYLOAD</span><span style={{ color: 'var(--text-primary)' }}>{v.performance.payload}</span></li>
                                        </ul>

                                        <div style={{ marginTop: 'clamp(2rem, 4vh, 4rem)' }}>
                                            <div className="btn btn-outline" style={{
                                                borderColor: 'var(--border-color)',
                                                color: 'var(--text-primary)',
                                                width: '100%',
                                                borderRadius: '0',
                                                fontSize: '0.75rem',
                                                letterSpacing: '2px',
                                                textTransform: 'uppercase',
                                                textAlign: 'center'
                                            }}>View Variant Details</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* WhatsApp Contact Component */}
                <section className="reveal-section" style={{ background: '#fff', padding: '100px 0', borderTop: '1px solid #eee' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Interested in custom BARD configurations?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                            Our team can help you configure the perfect ISR platform for your specific mission requirements.
                        </p>
                        <ProductRequest productName="BARD SYSTEM" />

                    </div>
                </section>

                {/* Tactical Capabilities Matrix
                <section className="reveal-section" style={{ background: '#fff', padding: 'clamp(4rem, 8vh, 10rem) 0', borderTop: '1px solid #eee' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem, 6vw, 8rem)' }}>
                            <div>
                                <h4 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.1', color: 'var(--text-primary)' }}>SOFTWARE-DEFINED AUTONOMY</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', lineHeight: '1.6' }}>
                                    Lattice-powered edge processing enables Bard to identify targets, categorize threats, and execute mission-critical decisions without human intervention.
                                </p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
                                {product.featureCards.map((card: any, i: number) => (
                                    <div key={i}>
                                        <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>[ 0{i + 1} // {card.title.toUpperCase()} ]</div>
                                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{card.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section> */}

                <Footer />

                <style jsx>{`
                    @media (max-width: 1024px) {
                        .tech-hero-section {
                            height: 75vh !important;
                            min-height: 520px;
                        }

                        .hero-info-content {
                            bottom: 1.5rem !important;
                            left: 1.5rem !important;
                            right: auto !important;
                            max-width: calc(100% - 3rem) !important;
                        }

                        .hero-info-content h1 {
                            font-size: clamp(1.4rem, 6vw, 2rem) !important;
                            letter-spacing: -0.5px !important;
                            margin-bottom: 0.4rem !important;
                        }

                        .hero-info-content p {
                            font-size: 0.65rem !important;
                            line-height: 1.5 !important;
                            letter-spacing: 2px !important;
                        }

                        .tech-stats-grid-mobile {
                            display: flex !important;
                            flex-direction: column !important;
                            gap: 3rem !important;
                            padding: 2rem 0 !important;
                        }

                        .tech-stat-block {
                            width: 100% !important;
                        }
                        
                        .bard-context-grid {
                            grid-template-columns: 1fr !important;
                            gap: 3rem !important;
                            padding: 4rem 1.5rem !important;
                        }

                        .form-factor-container {
                            grid-template-columns: 1fr !important;
                            gap: 2rem !important;
                        }

                        .spec-hero {
                             padding-top: 120px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .tech-hero-section {
                            height: 70vh !important;
                        }
                        .hero-info-content {
                            bottom: 1rem !important;
                        }
                        .hero-info-content h1 {
                            font-size: 1.3rem !important;
                            letter-spacing: 0px !important;
                        }
                        .hero-info-content p {
                            font-size: 0.6rem !important;
                            letter-spacing: 1.5px !important;
                        }
                    }
                `}</style>
            </div>
        );
    }

    // Default High-End Template for other products
    return (
        <div className="product-detail-page bg-white">
            <Navbar />

            {/* Premium Hero Section */}
            <section style={{ background: '#000', height: '100vh', position: 'relative', padding: 0 }}>
                {/* Background image */}
                {product.galleryImages?.[0] && (
                    <img
                        src={product.galleryImages[0]}
                        alt={product.name}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.5
                        }}
                    />
                )}

                {/* Dark overlay */}
                <div className="hero-overlay"></div>

                {/* Product Info - Bottom Left */}
                <div className="default-hero-content" style={{
                    position: 'absolute',
                    bottom: 'clamp(2rem, 6vh, 4rem)',
                    left: 'clamp(1.5rem, 5vw, 4rem)',
                    zIndex: 25,
                    maxWidth: '480px',
                    textAlign: 'left',
                    borderLeft: '2px solid var(--accent-primary)',
                    paddingLeft: 'clamp(0.8rem, 1.5vw, 1.2rem)'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                        fontWeight: '900',
                        lineHeight: '1',
                        marginBottom: '0.6rem',
                        color: '#ffffff',
                        letterSpacing: '-1px',
                        textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                    }}>
                        {product.name.toUpperCase()}
                    </h1>

                    <p style={{
                        fontSize: 'clamp(0.65rem, 1.2vw, 0.78rem)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxWidth: '360px',
                        margin: '0',
                        fontWeight: '600',
                        lineHeight: '1.6',
                        letterSpacing: '2.5px',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase'
                    }}>
                        {product.tagline}
                    </p>
                </div>
            </section>

            {/* Specs Strip */}
            {product.heroSpecs && product.heroSpecs.length > 0 && (
                <section style={{ background: '#000', padding: '60px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 6rem)' }}>
                            {product.heroSpecs.map((spec: { label: string, value: string }, i: number) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{spec.label}</div>
                                    <div style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', color: '#fff' }}>{spec.value}</div>
                                </div>
                            ))}
                        </div>
                        <ProductRequest productName={product.name} />
                    </div>
                </section>
            )}


            {/* Futuristic Product Gallery */}
            {product.galleryImages && product.galleryImages.length > 0 && (
                <section className="product-gallery-section reveal-section" style={{ background: 'var(--bg-tactical)', padding: '5rem 0' }}>
                    <div className="container">
                        <div className="gallery-layout">
                            <div className="gallery-main-display">
                                <div className="gallery-frame">
                                    <span className="corner corner-tl"></span>
                                    <span className="corner corner-tr"></span>
                                    <span className="corner corner-bl"></span>
                                    <span className="corner corner-br"></span>

                                    <div className="gallery-overlay-tech">
                                        <div className="tech-tag top-left">SYSTEM_VIEW_{activeImage + 1}</div>
                                        <div className="tech-tag top-right">MAS_ID_{id.toUpperCase()}_0{activeImage + 1}</div>
                                        <div className="tech-tag bottom-left">RADAR_LOCK: STABLE</div>
                                        <div className="tech-tag bottom-right">RECON_MODE: ACTIVE</div>
                                        <div className="scan-line"></div>
                                    </div>

                                    <img
                                        key={activeImage}
                                        src={product.galleryImages[activeImage]}
                                        alt={`${product.name} view ${activeImage + 1}`}
                                        className="main-gallery-image"
                                    />
                                </div>
                            </div>

                            <div className="gallery-sidebar">
                                <div className="gallery-info">
                                    <h4 style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px', marginBottom: '1rem' }}>SENSORY FEED</h4>
                                    <div className="gallery-thumbnails">
                                        {product.galleryImages.map((img: string, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImage(i)}
                                                className={`thumbnail-item ${activeImage === i ? 'active' : ''}`}
                                            >
                                                <img src={img} alt={`Thumbnail ${i + 1}`} />
                                                <div className="thumb-index">0{i + 1}</div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="tech-specs-sidebar" style={{ marginTop: '2rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div className="mini-stat">
                                                <span className="mini-label">LATITUDE</span>
                                                <span className="mini-value">28.6139° N</span>
                                            </div>
                                            <div className="mini-stat">
                                                <span className="mini-label">LONGITUDE</span>
                                                <span className="mini-value">77.2090° E</span>
                                            </div>
                                            <div className="mini-stat">
                                                <span className="mini-label">ALTITUDE</span>
                                                <span className="mini-value">HEO_STABLE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Mission Profile Section 
            <section className="about-section blueprint-bg reveal-section">
                <div className="container">
                    <div className="about-content" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
                        <div className="about-text">
                            <h4>MISSION PROFILE</h4>
                            <p style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '600', lineHeight: '1.3' }}>
                                {product.description}
                            </p>
                            <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
                                {product.longDescription}
                            </p>

                            <div style={{ marginTop: '4rem' }}>
                                <Link href="/contact" className="btn btn-primary">Inquire for Deployment</Link>
                            </div>
                        </div>

                        <div className="specs-list-panel">
                            <h4 className="spec-category-title">SYSTEM DATA</h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {product.specs.map((spec: { label: string, value: string }, i: number) => (
                                    <div key={i} className="spec-list-item">
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="product-card" style={{ marginTop: '3rem', height: '250px' }}>
                                <div className={`product-image ${product.imageClass}`} style={{ height: '100%' }}>
                                    <span style={{ color: 'rgba(0,0,0,0.1)', fontSize: '1.5rem', fontWeight: '800' }}>[ SCHEMATIC ]</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Variant Breakdown Section */}
            {product.variants && product.variants.length > 0 && (
                <section className="about-section reveal-section" style={{ borderTop: '1px solid var(--border-color)', background: '#fff' }}>
                    <div className="container">
                        <h4 className="spec-category-title" style={{ marginBottom: '3rem' }}>VARIANT CONFIGURATIONS</h4>
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <table className="variant-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-tactical)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>Variant</th>
                                        <th style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>Type</th>
                                        <th style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>Endurance</th>
                                        <th style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>Range</th>
                                        <th style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>Payload</th>
                                        <th style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>Feature</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.variants.map((v: any, i: number) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem', border: '1px solid var(--border-color)', fontWeight: '700', color: 'var(--accent-primary)' }}>{v.variant}</td>
                                            <td style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>{v.type}</td>
                                            <td style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>{v.endurance}</td>
                                            <td style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>{v.range}</td>
                                            <td style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>{v.payload}</td>
                                            <td style={{ padding: '1rem', border: '1px solid var(--border-color)' }}>{v.feature}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* Sub-system Analysis Section
            <section className="about-section reveal-section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>SUB-SYSTEM ANALYSIS</h2>
                    <p style={{ color: 'var(--text-tertiary)', marginBottom: '4rem' }}>Operational Advantage & Technical Superiority</p>

                    <div className="feature-grid-v2">
                        {product.featureCards.map((card: { title: string, description: string }, i: number) => (
                            <div key={i} className="feature-card-v2">
                                <span className="tech-stat-label" style={{ color: 'var(--accent-secondary)', marginBottom: '1rem', display: 'block' }}>0{i + 1} // CAPABILITY</span>
                                <h5>{card.title}</h5>
                                <p>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            <Footer />

            <style jsx>{`
                @media (max-width: 1024px) {
                    .default-hero-content {
                        bottom: 1.5rem !important;
                        left: 1.5rem !important;
                        max-width: calc(100% - 3rem) !important;
                    }
                    .default-hero-content h1 {
                        font-size: clamp(1.4rem, 6vw, 2rem) !important;
                        letter-spacing: -0.5px !important;
                        margin-bottom: 0.4rem !important;
                    }
                    .default-hero-content p {
                        font-size: 0.65rem !important;
                        letter-spacing: 2px !important;
                    }

                    .tech-stats-grid {
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                    }

                    .gallery-layout {
                        grid-template-columns: 1fr !important;
                    }

                    .about-content {
                        grid-template-columns: 1fr !important;
                        gap: 4rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .default-hero-content {
                        bottom: 1rem !important;
                    }
                    .default-hero-content h1 {
                        font-size: 1.3rem !important;
                    }
                    .default-hero-content p {
                        font-size: 0.6rem !important;
                        letter-spacing: 1.5px !important;
                    }
                }
            `}</style>
        </div>
    );
}
