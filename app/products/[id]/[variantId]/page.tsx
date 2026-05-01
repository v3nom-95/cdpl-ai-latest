'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { products } from '../../productData';
import Link from 'next/link';
import ProductRequest from '../../../../components/ProductRequest';

export default function VariantPage() {
    const params = useParams();
    const productId = (params.id as string) || '';
    const variantId = (params.variantId as string) || '';

    const product = products[productId as keyof typeof products] as any;
    const variant = product?.variants?.find((v: any) => v.id === variantId);

    const [activeImage, setActiveImage] = useState(0);
    const [scrollY, setScrollY] = useState(0);

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
    }, [variantId]);

    if (!product || !variant) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="section-title">Variant Not Found</h1>
                        <Link href={`/products/${productId}`} className="btn btn-primary mt-10">Back to Product</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="product-detail-page bg-white" style={{ color: 'var(--text-primary)' }}>
            <Navbar />

            {/* Tech Hero Section - Unified with Home/BARD Style */}
            <section className="hero-section tech-hero-section" style={{ background: '#000', height: '100vh', position: 'relative', padding: 0 }}>
                {productId === 'bard' ? (
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src="/partners/bardvideo.mp4" type="video/mp4" />
                    </video>
                ) : (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${variant.gallery[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.6
                    }}></div>
                )}

                <div className="hero-overlay"></div>

                {/* Persistent Back Option */}
                <div style={{ position: 'absolute', top: '140px', left: 'clamp(1.5rem, 5vw, 4rem)', zIndex: 35, opacity: 1 }} className="back-link-container">
                    <Link href={product.variants.length <= 1 ? "/mas" : `/products/${productId}`} style={{
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                    }} className="hover-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        {product.variants.length <= 1 ? "BACK TO PORTFOLIO" : `BACK TO ${product.name.replace(/\s+V[\d.]+$/i, '').replace(/\s*–\s*/, ' ').replace(/\s+\d+\s+/, ' ').trim().toUpperCase()}`}
                    </Link>
                </div>

                {/* Variant Info - Bottom Left Overlay */}
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
                        {variant.variant
                            .replace(/\s+\d+\u201d\s*/g, ' ')
                            .replace(/\s+\d+["""″']\s*/g, ' ')
                            .replace(/\s+Variant\b/gi, '')
                            .replace(/\s+\d+\s+/g, ' ')
                            .replace(/\s+\d+$/g, '')
                            .trim().toUpperCase()}
                    </h1>
                </div>

                {/* Scroll indicator removed as per request */}
            </section>

            {/* Tech Specs Strip - Similar to BARD Page */}
            <section className="reveal-section" style={{ background: '#000', padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="tech-stats-grid-mobile" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(2.5rem, 6vw, 8rem)' }}>
                        {product.heroSpecs && product.heroSpecs.map((spec: any, i: number) => (
                            <div key={i} className="tech-stat-block" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{spec.label}</div>
                                <div style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', color: '#fff' }}>{spec.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem' }} className="variant-content-grid">

                        {/* Left Column: Gallery & Highlights */}
                        <div className="reveal-section">
                            <div className="gallery-main" style={{ marginBottom: '2rem' }}>
                                <div className="gallery-frame" style={{ aspectRatio: '16/10', background: '#f5f5f5', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={variant.gallery[activeImage]}
                                        alt={variant.variant}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>

                            <div className="gallery-thumbs-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '4rem' }}>
                                {variant.gallery.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        style={{
                                            padding: 0,
                                            border: activeImage === i ? '2px solid var(--accent-primary)' : '1px solid #eee',
                                            aspectRatio: '16/10',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <img src={img} alt={`Thumb ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginBottom: '4rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>KEY HIGHLIGHTS</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {variant.keyHighlights.map((item: string, i: number) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '8px',
                                                height: '8px',
                                                background: 'var(--accent-primary)',
                                                marginTop: '0.6rem',
                                                flexShrink: 0
                                            }}></div>
                                            <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Specs & Capabilities */}
                        <div className="reveal-section" style={{
                            background: '#fff',
                            padding: '2rem',
                            position: 'relative',
                            border: '1px solid rgba(0, 57, 166, 0.05)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                        }}>
                            {/* Performance Grid - Hide for Simulators */}
                            {product.category !== 'SIMULATOR' && (
                                <div className="performance-grid-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 2rem', marginBottom: '4rem' }}>
                                    {/* Range */}
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ color: 'var(--accent-primary)', opacity: 0.9 }}>
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Range</div>
                                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>{variant.performance.range}</div>
                                        </div>
                                    </div>

                                    {/* Endurance */}
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ color: 'var(--accent-primary)', opacity: 0.9 }}>
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                                <polyline points="12 7 12 12 15 15" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Endurance</div>
                                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>{variant.performance.endurance}</div>
                                        </div>
                                    </div>

                                    {/* Payload */}
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ color: 'var(--accent-primary)', opacity: 0.9 }}>
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mission Payload</div>
                                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>{variant.performance.payload}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginTop: '2rem', padding: '0 1rem' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--accent-primary)', letterSpacing: '1px' }}>CORE CAPABILITIES</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {variant.capabilities.map((cap: string, i: number) => (
                                        <li key={i} style={{
                                            padding: '1rem 0',
                                            borderBottom: '1px solid #eee',
                                            fontSize: '0.95rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            {cap}
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </li>
                                    ))}
                                </ul>

                                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', margin: '3rem 0 1.5rem', color: 'var(--accent-primary)', letterSpacing: '1px' }}>PRIMARY APPLICATIONS</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {variant.applications.map((app: string, i: number) => (
                                        <span key={i} style={{
                                            background: '#f0f0f0',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            borderRadius: '20px'
                                        }}>{app}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: '3rem' }}>
                                <ProductRequest productName={`${product.name} - ${variant.variant}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overall Gallery Grid */}
            <section style={{ padding: '80px 0', background: '#fafafa' }}>
                <div className="container">
                    <div className="reveal-section" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>VARIANT GALLERY</h2>
                        <div style={{ width: '50px', height: '4px', background: 'var(--accent-primary)', margin: '1.5rem auto' }}></div>
                    </div>

                    <div className="gallery-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {variant.gallery.map((img: string, i: number) => (
                            <div key={i} className="reveal-section" style={{ aspectRatio: '1', overflow: 'hidden', position: 'relative' }}>
                                <img src={img} alt={`${variant.variant} ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="hover-zoom" />
                            </div>
                        ))}
                        {/* Add more from product gallery if variant gallery is small */}
                        {product.galleryImages.filter((img: string) => !variant.gallery.includes(img)).map((img: string, i: number) => (
                            <div key={`extra-${i}`} className="reveal-section" style={{ aspectRatio: '1', overflow: 'hidden' }}>
                                <img src={img} alt={`${variant.variant} extra ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="hover-zoom" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WhatsApp Contact Component */}
            <section className="reveal-section" style={{ background: '#fff', padding: '100px 0', borderTop: '1px solid #eee' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Need more info?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Directly message our specialized engineers or request a full technical datasheet.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <a
                            href={`https://wa.me/${product.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.2rem 2.5rem',
                                fontSize: '1rem',
                                borderRadius: '4px'
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.694 2.54 2.597-.682c.894.488 1.827.817 2.841.817 3.18 0 5.77-2.587 5.77-5.766 0-3.181-2.587-5.779-5.771-5.779zm3.387 8.313c-.154.433-.774.792-1.077.843-.284.048-.655.078-1.058-.052-.259-.084-.585-.198-1.018-.385-1.85-.795-3.04-2.671-3.133-2.793-.093-.123-.756-.999-.756-1.999 0-1 .512-1.493.694-1.693.182-.2.398-.246.531-.246l.383.003c.125.002.293-.047.458.353.169.41.58 1.413.63 1.516.05.103.082.222.016.354l-.249.431c-.082.133-.169.27-.072.438.096.168.428.706.918 1.143.633.565 1.166.74 1.332.825.166.084.266.07.366-.046l.329-.383c.1-.115.199-.096.332-.046l2.1.991c.133.066.221.115.253.175.032.062.032.355-.122.788z" />
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964 1.002-3.674c-.65-.118-1.782-2.181-1.782-3.351 0-4.329 3.522-7.851 7.851-7.851 4.33 0 7.852 3.522 7.852 7.851 0 4.331-3.522 7.855-7.928 7.928z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .hover-zoom:hover {
                    transform: scale(1.05);
                }
                
                @media (max-width: 1024px) {
                    .hero-section {
                        height: 75vh !important;
                        min-height: 520px;
                    }

                    .hero-info-content {
                        bottom: 1.5rem !important;
                        left: 1.5rem !important;
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

                    .back-link-container {
                        top: 80px !important;
                        left: 1.5rem !important;
                        transform: none;
                        width: auto;
                    }

                    .variant-content-grid {
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                        padding-top: 2rem !important;
                    }

                    .performance-grid-mobile {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }

                    .gallery-thumbs-mobile {
                        gap: 0.5rem !important;
                        margin-bottom: 2rem !important;
                    }

                    .gallery-frame {
                        aspect-ratio: 4/3 !important;
                    }
                }

                @media (max-width: 480px) {
                    .hero-section {
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
