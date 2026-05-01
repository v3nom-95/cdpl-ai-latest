'use client';

import React from 'react';

export default function Contact() {
    const [result, setResult] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending Transmission...");
        const formData = new FormData(event.target);

        // User must create a key at web3forms.com and put it here
        formData.append("access_key", "21d20e0a-b1c6-4345-ba1e-95bb42b5b932");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Transmission Successful. We will contact you shortly.");
                event.target.reset();
            } else {
                console.log("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            setResult("Mission Aborted: Network Error.");
        }
        setIsSubmitting(false);
    };
    const cards = [
        {
            id: 'phone',
            label: 'Phone',
            value: '+91 9494949698',
            href: 'tel:+919494949698',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
        },
        {
            id: 'email',
            label: 'Email',
            value: 'info@cdpl.ai',
            href: 'mailto:info@cdpl.ai',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            value: 'Connect with us',
            href: 'https://linkedin.com/company/cdpl-ai',
            external: true,
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            id: 'x',
            label: 'X (Twitter)',
            value: '@chakravyuha',
            href: 'https://x.com/cdpl',
            external: true,
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            ),
        },
        {
            id: 'location',
            label: 'HQ_LOCATION',
            value: 'Madhapur, Hyderabad, India',
            href: 'https://www.google.com/maps/place/Chakravyuha+Dynamics+Private+Limited+-+CDPL+(formerly+MAS)/@17.4461847,78.3890188,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb91991df605d3:0xae337cba48305f9d!8m2!3d17.4461847!4d78.3915937!16s%2Fg%2F11zjzl4lwn',
            external: true,
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
        },
    ];

    return (
        <section id="contact" className="contact-main-section" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
            <div className="container">
                <div className="contact-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                    {/* Info Cards Below - Now on Left */}
                    <div className="contact-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {cards.map((card) => (
                            <a key={card.id} href={card.href} className="contact-status-card" target={card.external ? '_blank' : undefined} rel={card.external ? 'noopener noreferrer' : undefined} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '1.5rem',
                                background: '#fff',
                                border: '1px solid var(--border-color)',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                textDecoration: 'none'
                            }}>
                                <span className="corner corner-tl"></span>
                                <span className="corner corner-tr"></span>
                                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{card.icon}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '2px', marginBottom: '0.5rem' }}>{card.label}</div>
                                <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.85rem' }}>{card.value}</div>
                            </a>
                        ))}
                    </div>

                    {/* Form on Right */}
                    <div className="form-column" style={{ background: '#f8fafc', padding: '3rem', border: '1px solid var(--border-color)', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span className="corner corner-tl"></span>
                        <span className="corner corner-tr"></span>
                        <span className="corner corner-bl"></span>
                        <span className="corner corner-br"></span>
                        
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>GET IN TOUCH</h3>
                        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>FULL_NAME</label>
                                <input type="text" name="name" required placeholder="NAME" className="hacker-input" style={{ width: '100%', padding: '1rem', background: '#fff', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>EMAIL</label>
                                <input type="email" name="email" required placeholder="EMAIL" className="hacker-input" style={{ width: '100%', padding: '1rem', background: '#fff', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>MESSAGE</label>
                                <textarea name="message" required placeholder="MESSAGE" className="hacker-input" rows={4} style={{ width: '100%', padding: '1rem', background: '#fff', border: '1px solid var(--border-color)', resize: 'none' }}></textarea>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                            {result && (
                                <p style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: result.includes('Aborted') || result.includes('Failed') ? '#e11d48' : 'var(--accent-primary)', textAlign: 'center', marginTop: '0.5rem' }}>
                                    {result}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Mini Map Section */}
                <div className="map-wrapper" style={{ marginTop: '4rem', position: 'relative' }}>
                    <div className="map-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-primary)' }}></div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '3px' }}>GEO_LOCATION_LOCK</span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>[ 17.4461° N, 78.3916° E ]</span>
                    </div>
                    
                    <div className="map-container" style={{ 
                        border: '1px solid var(--border-color)', 
                        position: 'relative', 
                        overflow: 'hidden', 
                        height: '400px',
                        background: '#f8fafc'
                    }}>
                        <span className="corner corner-tl"></span>
                        <span className="corner corner-tr"></span>
                        <span className="corner corner-bl"></span>
                        <span className="corner corner-br"></span>
                        
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.282564902478!2d78.3915937!3d17.4461847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91991df605d3%3A0xae337cba48305f9d!2sChakravyuha%20Dynamics%20Private%20Limited%20-%20CDPL%20(formerly%20MAS)!5e0!3m2!1sen!2sin!4v1774414085935!5m2!1sen!2sin"
                            width="100%" 
                            height="100%" 
                            style={{ 
                                border: 0
                            }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contact-status-card:hover {
                    border-color: var(--accent-primary);
                    background: var(--bg-tactical) !important;
                    transform: translateY(-5px);
                }
                .hacker-input:focus {
                    outline: none;
                    border-color: var(--accent-primary) !important;
                }

            `}</style>
        </section>
    );
}
