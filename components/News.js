'use client';

import React from 'react';
import './News.css';

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

export default function News() {
  return (
    <section id="news" className="news-section" style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="section-title">NEWSROOM</h2>
            </div>

            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
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
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.2rem', lineHeight: '1.3', color: 'var(--text-primary)', fontWeight: '800' }}>{news.title}</h3>
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
  );
}
