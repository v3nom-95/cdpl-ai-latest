'use client';

import React from 'react';
import './PhotoGallery.css';

const images = [
  { src: '/partners/bard1.png', alt: 'BARD ISR Mission' },
  { src: '/partners/horizonvtol.png', alt: 'HORIZON VTOL Flight' },
  { src: '/partners/stinger.jpeg', alt: 'STINGER Tactical' },
  { src: '/partners/aot.png', alt: 'AOT Trainer' },
  { src: '/partners/r1.png', alt: 'RAVEN Simulation' }
];

export default function PhotoGallery() {
  return (
    <section className="photo-gallery-section">
      <div className="container">
        <h2 className="section-title">MISSION IN FOCUS</h2>
        <div className="gallery-track">
          {[...images, ...images].map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
