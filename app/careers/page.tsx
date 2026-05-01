'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import GlobeMap from '../../components/GlobeMap';

export default function CareersPage() {
    const [heroVisible, setHeroVisible] = useState(false);
    const [activePillar, setActivePillar] = useState(0);
    const pillarTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Hero entrance
        const t = setTimeout(() => setHeroVisible(true), 100);

        // Scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal-section').forEach(s => observer.observe(s));

        // Auto-cycle pillars
        pillarTimerRef.current = setInterval(() => {
            setActivePillar(p => (p + 1) % 4);
        }, 3000);

        return () => {
            clearTimeout(t);
            observer.disconnect();
            if (pillarTimerRef.current) clearInterval(pillarTimerRef.current);
        };
    }, []);

    const pillars = [
        {
            num: '01',
            title: 'AUTONOMY',
            desc: 'We build systems that think, adapt, and act — reducing human risk on the battlefield through intelligent autonomy.',
        },
        {
            num: '02',
            title: 'SPEED',
            desc: 'From concept to flight test in weeks. We move fast, iterate relentlessly, and ship mission-ready hardware.',
        },
        {
            num: '03',
            title: 'PRECISION',
            desc: 'Every gram, every line of code, every weld is optimised for the mission. Precision is non-negotiable.',
        },
        {
            num: '04',
            title: 'IMPACT',
            desc: 'Your work protects soldiers and secures India\'s sovereignty. The stakes are real — so is the purpose.',
        },
    ];

    const values = [
        { title: 'Technical Excellence', desc: 'We hold engineering to the highest standard — no shortcuts, no compromises.' },
        { title: 'Ownership', desc: 'You own outcomes, not just tasks. Every team member drives results end-to-end.' },
        { title: 'Radical Transparency', desc: 'We share hard truths openly. Honest feedback accelerates growth.' },
        { title: 'Mission First', desc: 'Every decision is filtered through one question: does this serve the mission?' },
        { title: 'Continuous Learning', desc: 'We treat failure as data. Curiosity and iteration are core competencies.' },
        { title: 'National Commitment', desc: 'We are building India\'s sovereign defense capability — that responsibility drives us.' },
    ];

    const jobOpenings = [
        {
            id: 1,
            title: 'UAV Systems Engineer',
            division: 'MAS · Aerospace',
            location: 'Kanchipuram, TN',
            type: 'Full-Time',
            desc: 'Lead design and integration of next-generation flight control systems for VTOL and STOL platforms.',
        },
        {
            id: 2,
            title: 'Embedded Systems Developer',
            division: 'Tactical Computing',
            location: 'Kanchipuram, TN',
            type: 'Full-Time',
            desc: 'Develop low-latency, mission-critical firmware for autonomous navigation and edge-AI processing.',
        },
        {
            id: 3,
            title: 'Composite Structures Specialist',
            division: 'Manufacturing',
            location: 'Kanchipuram, TN',
            type: 'Full-Time',
            desc: 'Work with advanced carbon fibre and composite materials to optimise airframe strength-to-weight ratio.',
        },
        {
            id: 4,
            title: 'Ground Systems Architect',
            division: 'MGS · Ground',
            location: 'Remote / Hybrid',
            type: 'Full-Time',
            desc: 'Design autonomous navigation stacks for tactical ground vehicles and robotic combat systems.',
        },
    ];

    return (
        <div className="careers-page" style={{ background: '#fff', color: 'var(--text-primary)', overflowX: 'hidden' }}>
            <Navbar />

            {/* ── HERO ── */}
            <section style={{
                height: '100vh',
                background: '#000',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
            }}>
                <video autoPlay loop muted playsInline style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', opacity: 0.45,
                }}>
                    <source src="/partners/bardvideo.mp4" type="video/mp4" />
                </video>

                {/* gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                    zIndex: 2,
                }} />

                {/* scan-line texture */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 3,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
                    pointerEvents: 'none',
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: 'clamp(3rem, 8vh, 6rem)', width: '100%' }}>
                    {/* tag */}
                    <div style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        marginBottom: '1.5rem',
                    }}>
                    </div>

                    {/* headline */}
                    <h1 style={{
                        fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                        color: '#fff',
                        lineHeight: '0.95',
                        fontWeight: '900',
                        letterSpacing: '-3px',
                        textTransform: 'uppercase',
                        marginBottom: '2rem',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.25s',
                    }}>
                        BUILD THE<br />
                        <span style={{ color: 'var(--accent-primary)' }}>DEFENSE</span><br />
                        OF TOMORROW.
                    </h1>

                    {/* sub */}
                    <p style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                        color: 'rgba(255,255,255,0.65)',
                        maxWidth: '520px',
                        lineHeight: '1.7',
                        marginBottom: '3rem',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.4s',
                    }}>
                        We are looking for engineers, designers, and visionaries to push the boundaries of autonomous systems and national security.
                    </p>

                    <div style={{
                        display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.55s',
                    }}>
                        <a href="mailto:careers@cdpl.co.in" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                            GENERAL APPLICATION
                        </a>
                    </div>
                </div>

                {/* scroll hint */}
                <div style={{
                    position: 'absolute', bottom: '2rem', right: '3rem', zIndex: 10,
                    opacity: heroVisible ? 0.5 : 0,
                    transition: 'opacity 1s ease 1.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                }}>
                    <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))', animation: 'scrollLine 2s ease-in-out infinite' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', writingMode: 'vertical-rl' }}>SCROLL</span>
                </div>
            </section>

            {/* ── HOW WE WORK ── */}
            <section className="reveal-section" style={{ padding: 'clamp(5rem, 10vh, 9rem) 0', background: '#fff' }}>
                <div className="container">
                    <div style={{ marginBottom: '4rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '4px', color: 'var(--accent-primary)', fontWeight: '800' }}>HOW WE WORK</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginTop: '1rem', letterSpacing: '-1px' }}>WE ARE BUILT DIFFERENT.</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', border: '1px solid var(--border-color)' }} className="pillars-grid">
                        {pillars.map((p, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setActivePillar(i);
                                    if (pillarTimerRef.current) clearInterval(pillarTimerRef.current);
                                }}
                                style={{
                                    padding: 'clamp(2rem, 4vw, 3rem)',
                                    borderRight: i < 3 ? '1px solid var(--border-color)' : 'none',
                                    cursor: 'pointer',
                                    background: activePillar === i ? '#000' : '#fff',
                                    transition: 'background 0.5s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* active bar */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0,
                                    width: activePillar === i ? '100%' : '0%',
                                    height: '3px',
                                    background: 'var(--accent-primary)',
                                    transition: 'width 3s linear',
                                }} />
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: activePillar === i ? 'rgba(255,255,255,0.4)' : 'var(--text-tertiary)',
                                    letterSpacing: '2px',
                                    marginBottom: '1.5rem',
                                    transition: 'color 0.4s ease',
                                }}>{p.num}</div>
                                <h3 style={{
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                    fontWeight: '900',
                                    letterSpacing: '-0.5px',
                                    marginBottom: '1rem',
                                    color: activePillar === i ? '#fff' : 'var(--text-primary)',
                                    transition: 'color 0.4s ease',
                                }}>{p.title}</h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    lineHeight: '1.7',
                                    color: activePillar === i ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)',
                                    maxHeight: activePillar === i ? '200px' : '0px',
                                    overflow: 'hidden',
                                    opacity: activePillar === i ? 1 : 0,
                                    transition: 'all 0.5s ease',
                                }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="reveal-section" style={{ padding: 'clamp(5rem, 10vh, 9rem) 0', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '4px', color: 'var(--accent-primary)', fontWeight: '800' }}>OUR CULTURE</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginTop: '1rem', letterSpacing: '-1px' }}>WHAT WE STAND FOR.</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {values.map((v, i) => (
                            <div key={i} className="value-card" style={{
                                padding: '2.5rem',
                                background: '#fff',
                                border: '1px solid var(--border-color)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                            }}>
                                <span className="corner corner-tl" /><span className="corner corner-tr" />
                                <span className="corner corner-bl" /><span className="corner corner-br" />
                                <div style={{
                                    width: '32px', height: '3px',
                                    background: 'var(--accent-primary)',
                                    marginBottom: '1.5rem',
                                    transition: 'width 0.4s ease',
                                }} className="value-bar" />
                                <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.8rem', letterSpacing: '0.5px' }}>{v.title.toUpperCase()}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── APPLY CTA ── */}
            <section className="reveal-section" style={{ padding: 'clamp(5rem, 10vh, 9rem) 0', background: '#fff' }}>
                <div className="container">
                    <div style={{
                        padding: '4rem',
                        background: '#fff',
                        border: '2px solid rgba(0,57,166,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,57,166,0.06) 1px, transparent 0)',
                            backgroundSize: '28px 28px',
                        }} />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '4px', color: 'var(--accent-primary)', fontWeight: '800' }}>JOIN US</span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '900', color: 'var(--text-primary)', margin: '1rem 0', letterSpacing: '-0.5px' }}>READY TO BUILD THE FUTURE?</h2>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                Send us your CV and a brief note on how you can contribute to India's autonomous defense mission.
                            </p>
                            <a href="mailto:careers@cdpl.co.in" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>
                                APPLY NOW →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                @keyframes scrollLine {
                    0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
                    50% { opacity: 1; transform: scaleY(1); }
                }

                .value-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--accent-primary);
                    box-shadow: 0 12px 40px rgba(0, 57, 166, 0.08);
                }
                .value-card:hover .value-bar {
                    width: 60px;
                }
                .value-card:hover .corner {
                    opacity: 1;
                    transform: scale(1);
                }

                .job-row:hover {
                    background: #fafbff;
                    transform: translateX(6px);
                }
                .job-row:hover .job-accent {
                    transform: scaleY(1);
                }

                .pillars-grid {
                    overflow: hidden;
                }

                @media (max-width: 900px) {
                    .pillars-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                    .pillars-grid > div:nth-child(2) {
                        border-right: none !important;
                    }
                    .pillars-grid > div:nth-child(1),
                    .pillars-grid > div:nth-child(2) {
                        border-bottom: 1px solid var(--border-color);
                    }
                }

                @media (max-width: 600px) {
                    .pillars-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .pillars-grid > div {
                        border-right: none !important;
                        border-bottom: 1px solid var(--border-color) !important;
                    }
                    .job-row {
                        grid-template-columns: 1fr !important;
                    }
                    .job-row .btn {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
}
