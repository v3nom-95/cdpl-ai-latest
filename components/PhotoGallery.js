'use client';

import React from 'react';
import Link from 'next/link';
import './PhotoGallery.css';

const images = [
  { src: '/partners/bard1.png', alt: 'BARD ISR Mission', link: '/products/bard' },
  { src: '/partners/horizonvtol.png', alt: 'HORIZON VTOL Flight', link: '/products/horizon-vtol' },
  { src: '/partners/stinger.jpeg', alt: 'STINGER Tactical', link: '/products/stinger' },
  { src: '/partners/aot.png', alt: 'AOT Trainer', link: '/products/aot' },
  { src: '/partners/r1.png', alt: 'RAVEN Simulation', link: '/products/raven' }
];

export default function PhotoGallery() {
  return (
    <section className="photo-gallery-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <div className="gallery-track">
          {[...images, ...images].map((img, i) => (
            <Link key={i} href={img.link} style={{ textDecoration: 'none' }}>
              <div className="gallery-item" style={{ cursor: 'pointer' }}>
                <img src={img.src} alt={img.alt} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
