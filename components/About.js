'use client';

import Link from 'next/link';

export default function About() {
    return (
        <section id="about" className="about-section bg-dark-soft">
            <div className="container">
                <h2 className="section-title">Corporate Overview</h2>
                <p className="section-subtitle">Chakravyuha Dynamics (CDPL) is a strategic leader in autonomous defense.</p>

                <div className="about-content">
                    <div className="about-text">
                        <h4>INDIGENOUS INNOVATION · GLOBAL IMPACT</h4>
                        <p>
                            Major Aerospace Systems (MAS), a flagship brand of CDPL, stands at the forefront of aerospace innovation. With a strong foundation in precision engineering and high-altitude flight dynamics, MAS pioneers the design, advanced manufacturing, and deployment of next-generation autonomous platforms.
                        </p>
                        <p>
                            Through strategic indigenous innovation and a commitment to self-reliance, we deliver tactical systems that are mission-ready and future-proof — enabling sovereign forces to protect their interests with unyielding precision.
                        </p>

                        <div className="about-stats" style={{ marginTop: '2rem' }}>
                            <div className="stat-card">
                                <h3>2+</h3>
                                <p>Years of R&D</p>
                            </div>
                            <div className="stat-card">
                                <h3>100%</h3>
                                <p>Indigenous Tech</p>
                            </div>
                        </div>
                        <Link href="/about" className="btn btn-outline" style={{ marginTop: '2rem' }}>Institutional Overview &rarr;</Link>
                    </div>

                    <div className="about-stats">
                        <div className="stat-card">
                            <h3>Tier 1</h3>
                            <p>Strategic Partners</p>
                        </div>
                        <div className="stat-card">
                            <h3>MIL-STD</h3>
                            <p>Rugged Systems</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
