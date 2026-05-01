'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { products } from './productData';

export default function ProductsPage() {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const productList = Object.entries(products).map(([id, data]) => ({
        id,
        ...data
    }));

    const filteredProducts = activeFilter === 'ALL' 
        ? productList 
        : productList.filter(p => p.brand === activeFilter);

    const filters = [
        { id: 'ALL', label: 'ALL SYSTEMS', icon: null },
        { id: 'MAS', label: 'MAS', icon: '/partners/masicon.png', color: 'var(--team-mas)' },
        { id: 'MGS', label: 'MGS', icon: '/partners/mgsicon.png', color: 'var(--team-mgs)' },
        { id: 'MMS', label: 'MMS', icon: '/partners/mmsicon.png', color: 'var(--team-mms)' }
    ];

    return (
        <div className="products-page">
            <Navbar />
            
            <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '100px' }}>
                {/* Hero Section */}
                <section className="products-hero" style={{ 
                    padding: '4rem 0',
                    textAlign: 'center',
                    background: 'linear-gradient(to bottom, #f8faff, #fff)',
                    borderBottom: '1px solid var(--border-color)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div className="container">
                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            lineHeight: '1',
                            letterSpacing: '-2px'
                        }}>OUR <span style={{ color: 'var(--accent-primary)' }}>PRODUCTS</span></h1>
                    </div>

                    {/* Decorative pattern */}
                    <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        width: '300px', 
                        height: '300px', 
                        opacity: 0.05,
                        pointerEvents: 'none'
                    }}>
                        <img src="/partners/masicon.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                </section>

                {/* Filters Section */}
                <section style={{ padding: '2rem 0', position: 'sticky', top: '70px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
                    <div className="container">
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '1rem', 
                            flexWrap: 'wrap'
                        }}>
                            {filters.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '50px',
                                        border: '1px solid ' + (activeFilter === filter.id ? filter.color || 'var(--accent-primary)' : 'rgba(0,0,0,0.1)'),
                                        background: activeFilter === filter.id ? filter.color || 'var(--accent-primary)' : 'transparent',
                                        color: activeFilter === filter.id ? '#fff' : 'var(--text-secondary)',
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: activeFilter === filter.id ? `0 4px 15px ${filter.id === 'ALL' ? 'rgba(0, 57, 166, 0.2)' : 'rgba(0,0,0,0.1)'}` : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (activeFilter !== filter.id) {
                                            e.currentTarget.style.borderColor = filter.color || 'var(--accent-primary)';
                                            e.currentTarget.style.color = filter.color || 'var(--accent-primary)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeFilter !== filter.id) {
                                            e.currentTarget.style.borderColor = 'var(--border-color)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }
                                    }}
                                >
                                    {filter.icon && (
                                        <img 
                                            src={filter.icon} 
                                            alt="" 
                                            style={{ 
                                                height: '14px', 
                                                filter: activeFilter === filter.id ? 'brightness(0) invert(1)' : 'grayscale(1)' 
                                            }} 
                                        />
                                    )}
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Grid */}
                <section style={{ padding: '5rem 0 10rem' }}>
                    <div className="container">
                        <div className="products-grid" style={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2.5rem',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease'
                        }}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <div key={product.id} className="product-card" style={{ height: 'auto', borderRadius: '4px' }}>
                                        <span className="corner corner-tl"></span>
                                        <span className="corner corner-tr"></span>
                                        <span className="corner corner-bl"></span>
                                        <span className="corner corner-br"></span>

                                        <div className="product-image" style={{ 
                                            height: '240px', 
                                            width: '100%',
                                            background: '#ffffff', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            overflow: 'hidden', 
                                            position: 'relative',
                                            borderBottom: '1px solid rgba(0, 57, 166, 0.05)'
                                        }}>
                                             {product.galleryImages?.[0] ? (
                                                 <img 
                                                    src={product.galleryImages[0]} 
                                                    alt={product.name} 
                                                    style={{ 
                                                        width: '100%', 
                                                        height: '100%', 
                                                        objectFit: 'contain', 
                                                        display: 'block',
                                                        transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)' 
                                                    }} 
                                                    className="product-img-hover"
                                                 />
                                             ) : (
                                                 <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                                                     [ {product.nickname || 'SYSTEM'} ASSET PENDING ]
                                                 </div>
                                             )}
                                        </div>

                                        <div className="product-content" style={{ padding: '2rem' }}>
                                            <span style={{ 
                                                display: 'block', 
                                                fontFamily: 'var(--font-mono)', 
                                                fontSize: '0.7rem', 
                                                color: 'var(--accent-primary)', 
                                                marginBottom: '0.5rem',
                                                letterSpacing: '2px'
                                            }}>{product.tagline}</span>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{product.name}</h3>
                                            <p style={{ 
                                                color: 'var(--text-secondary)', 
                                                fontSize: '0.9rem', 
                                                marginBottom: '2rem',
                                                lineHeight: '1.6',
                                                minHeight: '3em'
                                            }}>
                                                {product.description}
                                            </p>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                                {product.heroSpecs?.slice(0, 2).map((spec, i) => (
                                                    <div key={i} style={{ border: '1px solid var(--border-color)', padding: '0.8rem', textAlign: 'center' }}>
                                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>{spec.label}</div>
                                                        <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{spec.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link href={`/products/${product.id}`} className="btn-text" style={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                gap: '0.5rem',
                                                fontWeight: '700',
                                                fontSize: '0.85rem',
                                                color: 'var(--accent-primary)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                EXPLORE SYSTEM <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Coming Soon / R&D Placeholders for MGS / MMS
                                <div style={{ 
                                    gridColumn: '1 / -1', 
                                    textAlign: 'center', 
                                    padding: '5rem 2rem',
                                    border: '1px dashed var(--border-color)',
                                    background: 'rgba(0, 57, 166, 0.02)'
                                }}>
                                    <div style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        margin: '0 auto 2rem', 
                                        padding: '1rem', 
                                        background: '#fff', 
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        borderRadius: '4px'
                                    }}>
                                        <img 
                                            src={activeFilter === 'MGS' ? '/partners/mgsicon.png' : '/partners/mmsicon.png'} 
                                            alt="" 
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                                        />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>UNDER RESEARCH & <span style={{ color: 'var(--accent-primary)' }}>DEVELOPMENT</span></h2>
                                    <p style={{ 
                                        fontFamily: 'var(--font-mono)', 
                                        color: 'var(--text-secondary)', 
                                        maxWidth: '600px', 
                                        margin: '0 auto 2rem' 
                                    }}>
                                        The {activeFilter === 'MGS' ? 'Major Ground Systems' : 'Major Marine Systems'} division is currently developing 
                                        next-generation autonomous solutions. Advanced field trials are in progress.
                                    </p>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        gap: '2rem', 
                                        fontFamily: 'var(--font-mono)', 
                                        fontSize: '0.7rem', 
                                        color: 'var(--text-tertiary)', 
                                        letterSpacing: '2px' 
                                    }}>
                                        <span>STATUS: CLASSIFIED</span>
                                        <span>PHASE: ACTIVE R&D</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .product-card {
                    overflow: visible !important;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .product-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 30px 60px rgba(0, 57, 166, 0.1);
                    border-color: var(--accent-primary);
                }
                .product-card:hover .product-img-hover {
                    transform: scale(1.05);
                }
                .product-card:hover .btn-text {
                    gap: 1rem !important;
                }
                .btn-text {
                    transition: gap 0.3s ease;
                }
                @media (max-width: 768px) {
                    .products-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    .products-hero {
                        padding: 3rem 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
