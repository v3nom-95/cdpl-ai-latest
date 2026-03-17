'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CareersPage() {
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

    const jobOpenings = [
        {
            id: 1,
            title: "UAV Systems Engineer",
            division: "MAS (Aerospace)",
            location: "Kanchipuram, TN",
            type: "Full-Time",
            description: "Lead the design and integration of next-generation flight control systems for our VTOL and STOL platforms."
        },
        {
            id: 2,
            title: "Embedded Systems Developer",
            division: "Tactical Computing",
            location: "Kanchipuram, TN",
            type: "Full-Time",
            description: "Develop low-latency, mission-critical firmware for autonomous navigation and edge-AI processing."
        },
        {
            id: 3,
            title: "Composite Structures Specialist",
            division: "Manufacturing",
            location: "Kanchipuram, TN",
            type: "Full-Time",
            description: "Work with advanced carbon fiber and composite materials to optimize airframe strength and weight ratio."
        },
        {
            id: 4,
            title: "Ground Systems Architect",
            division: "MGS (Ground)",
            location: "Remote / Hybrid",
            type: "Full-Time",
            description: "Design autonomous navigation stacks for tactical ground vehicles and robotics."
        }
    ];

    return (
        <div className="careers-page bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section" style={{ 
                height: '75vh', 
                background: '#000', 
                position: 'relative', 
                display: 'flex', 
                alignItems: 'center', 
                overflow: 'hidden',
                paddingTop: '100px'
            }}>
                <video autoPlay loop muted playsInline className="hero-video" style={{ opacity: 0.5 }}>
                    <source src="/partners/bardvideo.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))' }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '900px' }}>
                        <span style={{ 
                            color: '#0039A6', 
                            fontFamily: 'var(--font-mono)', 
                            letterSpacing: '4px', 
                            fontSize: '0.9rem',
                            display: 'block',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            fontWeight: '800'
                        }}>[ RECRUITMENT_PHASE_ACTIVE ]</span>
                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
                            color: '#fff', 
                            lineHeight: '1', 
                            marginBottom: '2rem',
                            fontWeight: '900',
                            letterSpacing: '-2px'
                        }}>BUILD THE <span style={{ color: '#0055ff', textShadow: '0 0 30px rgba(0, 85, 255, 0.4)' }}>DEFENSE</span> OF TOMORROW.</h1>
                        <p style={{ 
                            fontSize: '1.25rem', 
                            color: 'rgba(255,255,255,0.8)', 
                            maxWidth: '600px',
                            lineHeight: '1.6'
                        }}>
                            We are looking for engineers, designers, and visionaries to join our mission of pushing the boundaries of autonomous systems and national security.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why CDPL Section */}
            <section className="reveal-section" style={{ padding: '10rem 0', background: '#fcfcfc' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>WHY JOIN CDPL?</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                                At Chakravyuh Dynamics, you aren't just building products; you're building solutions for critical missions. We foster a culture of rapid innovation, technical excellence, and deep engineering honesty.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem', fontSize: '1rem' }}>RAPID PROTOTYPING</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>From design to flight test in weeks, not months. We value speed and iteration.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem', fontSize: '1rem' }}>MISSION FIRST</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Every line of code and every rivet is dedicated to the success of the mission.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ 
                                padding: '3rem', 
                                background: '#fff', 
                                border: '1px solid var(--border-color)',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                <span className="corner corner-tl"></span>
                                <span className="corner corner-br"></span>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>OUR CULTURE</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "Technical Excellence above all.",
                                        "Ownership of outcomes, not just tasks.",
                                        "Radical transparency in engineering.",
                                        "Continuous learning through failure.",
                                        "Commitment to National Security."
                                    ].map((item, i) => (
                                        <li key={i} style={{ 
                                            padding: '1rem 0', 
                                            borderBottom: '1px solid #eee',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            fontSize: '0.95rem',
                                            fontWeight: '600'
                                        }}>
                                            <span style={{ width: '6px', height: '6px', background: 'var(--accent-primary)' }}></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ 
                                position: 'absolute', 
                                top: '20px', 
                                left: '20px', 
                                width: '100%', 
                                height: '100%', 
                                border: '2px solid var(--accent-primary)', 
                                zIndex: 1,
                                opacity: 0.1
                            }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Openings Section */}
            <section id="openings" className="reveal-section" style={{ padding: '8rem 0 12rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>OPEN POSITIONS</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)', margin: '0 auto' }}></div>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {jobOpenings.map((job) => (
                            <div key={job.id} className="job-card" style={{ 
                                padding: '2.5rem', 
                                border: '1px solid var(--border-color)',
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                                alignItems: 'center',
                                gap: '2rem',
                                transition: 'all 0.3s ease',
                                background: '#fff'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                                        <span style={{ 
                                            background: 'var(--accent-dim)', 
                                            color: 'var(--accent-primary)', 
                                            fontSize: '0.7rem', 
                                            padding: '0.3rem 0.8rem', 
                                            fontFamily: 'var(--font-mono)',
                                            fontWeight: '700',
                                            border: '1px solid rgba(0, 57, 166, 0.1)'
                                        }}>{job.division}</span>
                                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{job.location} • {job.type}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{job.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '800px' }}>{job.description}</p>
                                </div>
                                <Link 
                                    href="mailto:careers@cdpl.co.in" 
                                    className="btn btn-outline"
                                    style={{ padding: '1rem 2rem' }}
                                >
                                    APPLY NOW
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem', textAlign: 'center', padding: '4rem', background: 'var(--bg-tactical)', border: '1px dashed var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1rem' }}>DON'T SEE A FIT?</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>We are always looking for exceptional talent. Send us your CV and a brief note on how you can contribute.</p>
                        <a href="mailto:careers@cdpl.co.in" className="btn btn-primary">GENERAL APPLICATION</a>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .job-card:hover {
                    border-color: var(--accent-primary);
                    box-shadow: 0 10px 30px rgba(0, 57, 166, 0.05);
                    transform: translateX(10px);
                }
                
                @media (max-width: 768px) {
                    .job-card {
                        grid-template-columns: 1fr;
                        padding: 1.5rem;
                    }
                    .job-card .btn {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
