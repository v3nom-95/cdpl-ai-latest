'use client';

import React, { useState } from 'react';
import './News.css';

const newsData = [
  {
    id: 1,
    title: "CDPL at UMEX 2026: Redefining Autonomous Borders",
    images: ["/partners/bard1.png", "/partners/bard3.png"],
    text: "At UMEX 2026, Chakravyuha Dynamics showcased its latest AI-enabled kill chain integration for border surveillance. The display highlighted BARD's autonomous patrol capabilities in desert terrains, focusing on real-time sensor fusion and GPS-denied navigation. Military delegations from eight countries reviewed the platform's multi-domain command and control (MDC2) architecture for rapid battlefield responsiveness.",
    date: "Feb 14, 2026"
  },
  {
    id: 2,
    title: "Next-Gen Stealth USV Prototype Sea Trials Successful",
    images: ["/partners/mmsicon.png", "/partners/navy.png"],
    text: "MMS Division successfully completed phase-one sea trials for its 'Jal-Kumbh' stealth USV. Designed for distributed maritime operations and seabed warfare, the platform maintained full autonomous navigation through choppy waters for 48 hours. This marks a critical milestone for indigenizing high-end naval robotics and autonomous submarines for asymmetric warfare defense strategies.",
    date: "Jan 28, 2026"
  },
  {
    id: 3,
    title: "Major Aerospace Systems (MAS) Training Hub Expansion",
    images: ["/partners/aot.png", "/partners/r1.png"],
    text: "The RAAVEN Training Hub has expanded to include advanced simulation for Group 2 UAS operations. Integrating TDFS Tactical Flight Simulators with real-world AOT hardware, the hub now offers 24/7 pilot training modules. This initiative accelerates OODA loop response training for elite drone units, ensuring software-defined warfare readiness and mission-critical hardware proficiency for our global partners.",
    date: "Jan 10, 2026"
  }
];

export default function News() {
  return (
    <section id="news" className="news-section">
      <div className="container">
        <h2 className="section-title">CDPL NEWSROOM</h2>
        <div className="news-blog-grid">
          {newsData.map((item) => (
            <div key={item.id} className="news-post">
              <span className="corner corner-tl"></span>
              <span className="corner corner-tr"></span>
              <span className="corner corner-bl"></span>
              <span className="corner corner-br"></span>
              
              <div className="news-visuals">
                {item.images.slice(0, 2).map((img, i) => (
                  <div key={i} className={`news-img-box ${i === 0 ? 'main-img' : 'sub-img'}`}>
                    <img src={img} alt={item.title} />
                  </div>
                ))}
              </div>

              <div className="news-content">
                <span className="news-date">{item.date}</span>
                <h3 className="news-post-title">{item.title}</h3>
                <p className="news-post-text">
                  {item.text.length > 300 ? item.text.slice(0, 300) + "..." : item.text}
                </p>
                <div className="news-footer">
                  <span className="word-count">{item.text.split(' ').length} WORDS</span>
                  <a href={`/resources#news-${item.id}`} className="read-more">FULL REPORT &rarr;</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
