'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function ResourcesPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeGallery, setActiveGallery] = useState<string | null>(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeGallery) return;
            if (e.key === 'Escape') setActiveGallery(null);
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.querySelectorAll('.reveal-section').forEach(section => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeGallery, currentImgIndex]);

    const nextSlide = () => {
        const items = activeGallery === 'training' ? trainingItems : [];
        setCurrentImgIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        const items = activeGallery === 'training' ? trainingItems : [];
        setCurrentImgIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const newsData = [
        {
            id: 1,
            date: "FEB 18, 2026",
            category: "FIELD DEPLOYMENT",
            title: "MAS BARD Deployed at Exercise Topchi 2026",
            excerpt: "Chakravyuh Dynamics' BARD system successfully completed high-altitude surveillance and target acquisition missions during the recent Exercise Topchi demonstration.",
            link: "https://www.youtube.com/watch?v=PWX3_uDB7z4"
        }
    ];

    const downloads = [
        { title: "BARD V2.0 System Overview", type: "PDF", size: "2.8 MB" },
        { title: "RAVEN Simulator Technical Manual", type: "PDF", size: "4.2 MB" },
        { title: "HORIZON VTOL Deployment Specs", type: "PDF", size: "2.5 MB" },
        { title: "Tactical ISR Integration Guide", type: "PDF", size: "1.5 MB" },
        { title: "CDPL Corporate Capability Document", type: "PDF", size: "3.4 MB" }
    ];

    const trainingItems = [
        { src: '/training/t1.jpeg', title: 'Tactical Reconnaissance Mission' },
        { src: '/training/t2.jpeg', title: 'High-Altitude Surveillance' },
        { src: '/training/t3.jpeg', title: 'Field Unit Deployment' },
        { src: '/training/t4.jpeg', title: 'Strategic Point Training' },
        { src: '/training/t5.jpeg', title: 'Operational Readiness Drill' },
        { src: '/training/t6.jpeg', title: 'Mission-Ready Assets' }
    ];

    return (
        <div className="resources-page" style={{ paddingTop: '100px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <Navbar />



            {/* News Room Section */}
            <section id="news-room" className="reveal-section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>NEWSROOM</h2>
                        </div>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)' }}></div>
                    </div>

                    <div style={{ maxWidth: '850px', margin: '0' }}>
                        {newsData.map((news) => (
                            <div key={news.id} className="news-card" style={{ 
                                padding: '3rem', 
                                border: '1px solid var(--border-color)',
                                background: '#fff',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}>
                                <span className="corner corner-tl"></span>
                                <span className="corner corner-br"></span>
                                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: '800' }}>{news.category}</span>
                                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{news.date}</span>
                                </div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1.2rem', lineHeight: '1.3' }}>{news.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>{news.excerpt}</p>
                                
                                <div style={{ border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <iframe
                                        width="100%"
                                        height="450"
                                        src={`https://www.youtube.com/embed/${news.link.split('=')[1]}?rel=0`}
                                        title={news.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>

                                <a href={news.link} target="_blank" rel="noopener noreferrer" className="btn-text" style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                                    VIEW ON YOUTUBE CHANNEL →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training & Deployment Category Section */}
            <section id="visual-assets" className="reveal-section" style={{ padding: '6rem 0', background: '#f8fafc' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>PHOTOS & VIDEOS</h2>
                        </div>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                        {/* Training & Deployment Card */}
                        <div 
                            className="category-card" 
                            onClick={() => { setActiveGallery('training'); setCurrentImgIndex(0); }}
                            style={{
                                padding: '2.5rem',
                                border: '1px solid var(--border-color)',
                                background: '#fff',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                transition: 'all 0.4s ease'
                            }}
                        >
                            <span className="corner corner-tl"></span>
                            <span className="corner corner-br"></span>
                            <div style={{ width: '120px', height: '120px', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <img src="/training/t1.jpeg" alt="Training" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>TRAINING & DEPLOYMENT</h3>
                                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1rem' }}>6 Tactical Field Assets • High-Altitude Ops</p>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '800' }}>OPEN_GALLERY →</span>
                            </div>
                        </div>

                        {/* Future Categories (Placeholders for Structure) */}
                        <div 
                            style={{
                                padding: '2.5rem',
                                border: '1px dashed var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.5
                            }}
                        >
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>[ ADDITIONAL CATEGORIES ARCHIVING... ]</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Overlay Carousel with Swiper */}
            {activeGallery && (
                <div className="gallery-overlay" style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 5, 15, 0.98)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(20px)',
                    animation: 'fadeIn 0.4s ease'
                }}>
                    <button 
                        className="close-btn" 
                        onClick={() => setActiveGallery(null)}
                        style={{
                            position: 'absolute',
                            top: '40px',
                            right: '40px',
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: '2.5rem',
                            cursor: 'pointer',
                            zIndex: 10001,
                            opacity: 0.6,
                            transition: 'all 0.3s ease'
                        }}
                    >✕</button>

                    <div className="carousel-wrapper" style={{ width: '100%', maxWidth: '1400px', height: '80vh', display: 'flex', alignItems: 'center' }}>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            initialSlide={currentImgIndex}
                            coverflowEffect={{
                                rotate: 30,
                                stretch: 0,
                                depth: 100,
                                modifier: 1.5,
                                slideShadows: true,
                            }}
                            keyboard={{ enabled: true }}
                            navigation={true}
                            pagination={{ clickable: true }}
                            modules={[EffectCoverflow, Pagination, Navigation, Keyboard, Autoplay]}
                            style={{ padding: '50px 0', width: '100%' }}
                            onSlideChange={(swiper) => setCurrentImgIndex(swiper.activeIndex)}
                        >
                            {(activeGallery === 'training' ? trainingItems : []).map((img, i) => (
                                <SwiperSlide key={i} style={{ width: 'min(90%, 800px)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                    <div className="slide-box" style={{ 
                                        position: 'relative', 
                                        borderRadius: '4px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        overflow: 'hidden',
                                        boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
                                    }}>
                                        <img 
                                            src={img.src} 
                                            alt={img.title}
                                            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '70vh', objectFit: 'contain' }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {/* Technical Downloads Section */}
            <section id="downloads" className="reveal-section" style={{ padding: '8rem 0 12rem', background: '#fcfcfc' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr', gap: '6rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>SYSTEM SPECIFICATIONS</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.7' }}>
                                Download detailed technical documentation and mission capabilities or request access to the secure partner portal for full system diagnostics.
                            </p>
                            <div style={{ padding: '2.5rem', background: '#fff', border: '1px solid var(--border-color)', position: 'relative' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '800' }}>[ PARTNER PORTAL ]</span>
                                <h4 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>SECURE ACCESS</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Confidential engineering data and API documentation requires verified military-grade credentials.</p>
                                <Link href="/contact" className="btn-text" style={{ fontSize: '0.8rem', fontWeight: '800' }}>CONTACT FOR CLEARANCE →</Link>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {downloads.map((doc, i) => (
                                <div key={i} className="download-item" style={{
                                    padding: '1.5rem 2rem',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: '#fff',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ width: '40px', height: '40px', border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontWeight: '800', fontSize: '0.65rem' }}>{doc.type}</div>
                                        <div>
                                            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{doc.title}</h4>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{doc.size}</span>
                                        </div>
                                    </div>
                                    <button style={{
                                        padding: '0.6rem 1.2rem',
                                        background: 'transparent',
                                        border: '1px solid var(--accent-primary)',
                                        color: 'var(--accent-primary)',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}>FILE_GET</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <Footer />

            <style jsx>{`
                .news-card:hover {
                    border-color: var(--accent-primary);
                    box-shadow: 0 15px 40px rgba(0, 57, 166, 0.08);
                    transform: translateY(-5px);
                }
                
                :global(.swiper) {
                    padding: 40px 0 !important;
                }
                
                :global(.swiper-pagination-bullet) {
                    background: #fff !important;
                    opacity: 0.3;
                }
                
                :global(.swiper-pagination-bullet-active) {
                    background: var(--accent-primary) !important;
                    opacity: 1;
                    width: 30px !important;
                    border-radius: 4px !important;
                    transition: all 0.3s ease;
                }
                
                :global(.swiper-button-next), :global(.swiper-button-prev) {
                    color: var(--accent-primary) !important;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    width: 60px !important;
                    height: 60px !important;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                :global(.swiper-button-next::after), :global(.swiper-button-prev::after) {
                    font-size: 1.5rem !important;
                    font-weight: bold;
                }

                .close-btn:hover {
                    opacity: 1;
                    transform: rotate(90deg);
                }

                .category-card:hover {
                    border-color: var(--accent-primary);
                    box-shadow: 0 30px 60px rgba(0, 57, 166, 0.1);
                    transform: translateY(-5px);
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                
                @media (max-width: 992px) {
                    .category-card { flex-direction: column; text-align: center; }
                    .category-card img { width: 100% !important; }
                }
            `}</style>
        </div>
    );
}
