'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ResourcesPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-section').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const newsItems = [
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

    const mediaItems = [
        { type: 'image', src: '/partners/bard1.png', title: 'MAS BARD Tactical Unit' },
        { type: 'image', src: '/partners/bard2.jpeg', title: 'Operational Deployment' },
        { type: 'image', src: '/partners/cdplicon.png', title: 'CDPL Institutional Identity' },
        { type: 'image', src: '/partners/bard3.png', title: 'Field Performance Data' }
    ];

    return (
        <div className="resources-page" style={{ paddingTop: '100px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <Navbar />

            {/* Header Section */}
            <section className="container" style={{ padding: '4rem 0' }}>
                <span style={{ 
                    color: 'var(--accent-primary)', 
                    fontFamily: 'var(--font-mono)', 
                    letterSpacing: '4px', 
                    fontSize: '0.9rem',
                    display: 'block',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>[ MISSIONRESOURCES_ACTIVE ]</span>
                <h1 style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                    fontWeight: '900', 
                    textTransform: 'uppercase', 
                    marginBottom: '1rem', 
                    color: 'var(--text-primary)' 
                }}>MISSION DATA HUB</h1>
                <p style={{ maxWidth: '750px', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Access official field reports, technical specifications, and mission footage from Chakravyuh Dynamics' operational deployments.
                </p>
                
                {/* Visual Anchor Bar */}
                <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', marginTop: '4rem' }}></div>
            </section>

            {/* News Room Section */}
            <section id="news-room" className="reveal-section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>FIELD REPORTS</h2>
                            <p style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', fontSize: '0.85rem' }}>// OFFICIAL DEPLOYMENT UPDATES</p>
                        </div>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)' }}></div>
                    </div>

                    <div style={{ maxWidth: '850px', margin: '0' }}>
                        {newsItems.map((news) => (
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

            {/* Photos & Videos Gallery Section */}
            <section id="photos-videos" className="reveal-section" style={{ padding: '8rem 0', background: '#f8fafc' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>SYSTEM VISUALS</h2>
                        <p style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', fontSize: '0.85rem' }}>BRAND ASSETS AND FIELD DATA</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {mediaItems.map((item, i) => (
                            <div key={i} style={{ 
                                border: '1px solid var(--border-color)', 
                                padding: '1rem',
                                background: '#fff',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ height: '200px', width: '100%', overflow: 'hidden', marginBottom: '1rem', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        src={item.src} 
                                        alt={item.title} 
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }} 
                                        className="gallery-img"
                                    />
                                </div>
                                <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', textAlign: 'center', textTransform: 'uppercase' }}>{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                
                .media-img:hover {
                    transform: scale(1.05);
                }
                
                .download-item:hover {
                    border-color: var(--accent-primary);
                    box-shadow: 0 8px 20px rgba(0, 57, 166, 0.05);
                }
                
                .download-item button:hover {
                    background: var(--accent-primary);
                    color: #fff;
                }
                
                @media (max-width: 992px) {
                    .media-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .container {
                        padding: 0 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
