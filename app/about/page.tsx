'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const divisions = [
        {
            name: "Major Aerospace Systems",
            id: "MAS",
            logo: "/partners/masicon.png",
            desc: "Software-defined warfare, Group 1/2/3 UAS, and kinetic interceptors."
        },
        {
            name: "Major Ground Systems",
            id: "MGS",
            logo: "/partners/mgsicon.png",
            desc: "Unmanned Ground Vehicles (UGVs), Robotic Combat Vehicles (RCVs), and C-UAS."
        },
        {
            name: "Major Marine Systems",
            id: "MMS",
            logo: "/partners/mmsicon.png",
            desc: "Unmanned Surface Vehicles (USVs), Autonomous Submarines, and seabed warfare."
        }
    ];

    const leadership = [
        {
            name: "Major Sandeep (Retd)",
            role: "Founder & CEO",
            details: "12+ Years operating Autonomous Systems | Alumni of IIT J & IIM A",
            bio: "Veteran-led insight. We understand what soldiers need because we have been in their boots.",
            image: "/partners/rama.jpg"
        },
        {
            name: "Naveen Kanakadandi",
            role: "Co-Founder, MD & CFO",
            details: "18+ years steering strategy and tech execution | ex-Amazon, Google",
            bio: "Drives financial strategy and operational scaling for global growth.",
            image: "/partners/nav.jpeg"
        },
        {
            name: "Vishal Kumar Singh",
            role: "Co-Founder & CTO",
            details: "6+ Years of Product development and Engineering experience",
            bio: "Leads autonomy platform and AI system architecture.",
            image: "/partners/vish.png"
        },
        {
            name: "Major Rajesh (Retd)",
            role: "VP, Business Development & Sales",
            details: "Military veteran | Tactical Instructor | Defense Strategist | Alumni of IIM Lucknow",
            bio: "Strategic mind behind elite defense partnerships.",
            image: null
        },
        {
            name: "Anurag Madedhi",
            role: "Co-Founder, Head of Procurement & Vendor Strategy",
            details: "Masters in Material Science & Manufacturing | Biotechnology ex-COO",
            bio: "Leads production excellence and hardware precision.",
            image: null
        }
    ];

    const advisors = [
        {
            name: "Srikanth Dhuta",
            designation: "Legal Advisor",
            bio: "Ensures compliance and protects sovereign technology assets."
        }
    ];

    return (
        <div className={`about-all ${isVisible ? 'visible' : ''}`}>
            <Navbar />

            {/* Hero Section */}
            <section className="about-hero" style={{ padding: 'clamp(100px, 15vh, 160px) 0 clamp(40px, 8vh, 80px)', background: '#fff' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.6rem, 2vw, 0.8rem)', letterSpacing: '4px', marginBottom: '2rem' }}>
                        <span>[ COMPANY_IDENTITY ]</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(0, 52, 166, 0.1)' }}></div>
                    </div>

                    <img 
                        src="/partners/cdplicon.png" 
                        alt="CDPL" 
                        style={{ height: 'clamp(50px, 12vw, 100px)', marginBottom: '2.5rem', display: 'block' }} 
                    />
                    <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '900', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '4px' }}>
                        AUTONOMOUS MISSION CONTROL
                    </h1>


                </div>
            </section>

            {/* Vision & Mission */}
            <section style={{ padding: 'clamp(3rem, 8vh, 6rem) 0', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div className="vision-mission-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)' }}>
                        <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>
                            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '2px', fontWeight: '800' }}>VISION</h4>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>To create sovereign Physical Intelligence that protects India and empowers humanity through autonomous systems.</p>
                        </div>
                        <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>
                            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '2px', fontWeight: '800' }}>MISSION</h4>
                            <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>Deploy intelligent autonomous systems for defense and dual-use applications & protecting soldiers, empowering industries, and establishing India's leadership in Physical Intelligence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Divisions */}
            <section style={{ padding: 'clamp(4rem, 8vh, 8rem) 0', background: '#fff' }}>
                <div className="container">
                    <div className="leadership-title-section" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vh, 6rem)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginTop: '1rem', color: 'var(--text-primary)' }}>Core Divisions</h2>
                    </div>

                    <div className="divisions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        {divisions.map((div, i) => (
                            <div key={i} className="product-card" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#f8fafc' }}>
                                <span className="corner corner-tl"></span>
                                <span className="corner corner-tr"></span>
                                <span className="corner corner-bl"></span>
                                <span className="corner corner-br"></span>
                                <div style={{ height: '140px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
                                    <img src={div.logo} alt={div.name} style={{ maxHeight: '100%', maxWidth: '90%', objectFit: 'contain' }} />
                                </div>
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', fontWeight: '900', color: 'var(--text-primary)' }}>{div.name}</h3>
                                <div style={{ height: '2px', width: '40px', background: 'var(--accent-primary)', marginBottom: '1.5rem' }}></div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{div.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            {/* Leadership Section */}
            <section id="leadership" style={{ padding: 'clamp(4rem, 8vh, 8rem) 0', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div className="leadership-title-section" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vh, 6rem)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginTop: '1rem', color: 'var(--text-primary)' }}>Leadership</h2>
                    </div>

                    <div className="products-grid leadership-grid">
                        {leadership.map((leader, index) => (
                            <div key={index} className="product-card" style={{ padding: '2.5rem', minHeight: 'auto', background: '#fff' }}>
                                <span className="corner corner-tl"></span>
                                <span className="corner corner-tr"></span>
                                <span className="corner corner-bl"></span>
                                <span className="corner corner-br"></span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{leader.name}</h3>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: '800', lineHeight: '1.2', fontSize: '0.80rem', fontFamily: 'var(--font-mono)' }}>{leader.role.toUpperCase()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advisors Section */}
            <section id="advisors" style={{ padding: 'clamp(4rem, 8vh, 8rem) 0', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div className="leadership-title-section" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vh, 6rem)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginTop: '1rem', color: 'var(--text-primary)' }}>Advisors</h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        {advisors.map((advisor, index) => (
                            <div key={index} className="product-card" style={{ width: '100%', maxWidth: '380px', padding: '2.5rem', minHeight: 'auto', background: '#f8fafc' }}>
                                <span className="corner corner-tl"></span>
                                <span className="corner corner-tr"></span>
                                <span className="corner corner-bl"></span>
                                <span className="corner corner-br"></span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{advisor.name}</h3>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: '800', lineHeight: '1.2', fontSize: '0.80rem', fontFamily: 'var(--font-mono)' }}>{advisor.designation.toUpperCase()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .about-all { opacity: 0; transition: opacity 1s ease; }
                .about-all.visible { opacity: 1; }

                @media (max-width: 768px) {
                    .about-hero {
                        padding: 120px 0 60px !important;
                    }
                    
                    .about-hero h1 {
                        font-size: 3.5rem !important;
                        line-height: 1 !important;
                        margin-bottom: 1.5rem !important;
                    }

                    .about-hero p {
                        font-size: 1.1rem !important;
                        line-height: 1.5 !important;
                    }

                    section {
                        padding: 4rem 0 !important;
                    }

                    .container {
                        padding: 0 1.5rem !important;
                    }

                    h2 {
                        font-size: 2.2rem !important;
                        margin-bottom: 1rem !important;
                    }

                    .vision-mission-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }

                    .divisions-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }

                    .product-card {
                        padding: 2rem !important;
                        min-height: auto !important;
                    }

                    .leadership-title-section {
                        margin-bottom: 3rem !important;
                    }

                    .leadership-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .about-hero h1 {
                        font-size: 2.8rem !important;
                    }
                    
                    .about-hero p {
                        font-size: 1rem !important;
                    }

                    h2 {
                        font-size: 1.8rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
