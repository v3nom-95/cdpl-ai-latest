'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const images = [
  { src: '/partners/r1.png',         alt: 'RAVEN Simulation',    link: '/products/raven',        label: 'RAVEN SIMULATOR',      tag: 'UAV SIMULATOR' },
  { src: '/partners/bard1.png',      alt: 'BARD ISR Mission',    link: '/products/bard',         label: 'B.A.R.D. V2.0',       tag: 'ISR · GROUP 2 UAS' },
  { src: '/partners/horizonvtol.png',alt: 'HORIZON VTOL Flight', link: '/products/horizon-vtol', label: 'HORIZON 120 VTOL',     tag: 'FIXED WING · TRAINER' },
  { src: '/partners/stinger.jpeg',   alt: 'STINGER Tactical',    link: '/products/stinger',      label: 'STINGER SERIES',       tag: 'TACTICAL · FPV' },
  { src: '/partners/aot.png',        alt: 'AOT Trainer',         link: '/products/aot',          label: 'A.O.T. TRAINER',       tag: 'MULTI-ROTOR · TRAINER' },
];

export default function PhotoGallery() {
  const trackRef    = useRef(null);
  const rafRef      = useRef(null);
  const [active, setActive]     = useState(0);
  const [isDrag, setIsDrag]     = useState(false);
  const [progress, setProgress] = useState(0);
  const dragStart   = useRef(0);
  const scrollStart = useRef(0);
  const velocity    = useRef(0);
  const lastX       = useRef(0);
  const lastT       = useRef(0);

  // Update active card + progress bar based on scroll position
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector('.pg-card')?.offsetWidth + 24 || 374;
    const idx = Math.round(el.scrollLeft / cardW);
    setActive(Math.min(idx, images.length - 1));
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Momentum scroll
  const applyMomentum = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (Math.abs(velocity.current) < 0.5) { velocity.current = 0; return; }
    el.scrollLeft += velocity.current;
    velocity.current *= 0.92;
    rafRef.current = requestAnimationFrame(applyMomentum);
  }, []);

  // Mouse drag
  const onMouseDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDrag(true);
    dragStart.current  = e.clientX;
    scrollStart.current = el.scrollLeft;
    lastX.current = e.clientX;
    lastT.current = Date.now();
    velocity.current = 0;
    cancelAnimationFrame(rafRef.current);
    el.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDrag) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragStart.current;
    el.scrollLeft = scrollStart.current - dx;
    const now = Date.now();
    const dt  = now - lastT.current || 1;
    velocity.current = -(e.clientX - lastX.current) / dt * 16;
    lastX.current = e.clientX;
    lastT.current = now;
  };
  const onMouseUp = () => {
    setIsDrag(false);
    const el = trackRef.current;
    if (el) el.style.cursor = 'grab';
    rafRef.current = requestAnimationFrame(applyMomentum);
  };

  // Touch
  const onTouchStart = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragStart.current   = e.touches[0].clientX;
    scrollStart.current = el.scrollLeft;
    lastX.current = e.touches[0].clientX;
    lastT.current = Date.now();
    velocity.current = 0;
    cancelAnimationFrame(rafRef.current);
  };
  const onTouchMove = (e) => {
    const el = trackRef.current;
    if (!el) return;
    const dx = e.touches[0].clientX - dragStart.current;
    el.scrollLeft = scrollStart.current - dx;
    const now = Date.now();
    const dt  = now - lastT.current || 1;
    velocity.current = -(e.touches[0].clientX - lastX.current) / dt * 16;
    lastX.current = e.touches[0].clientX;
    lastT.current = now;
  };
  const onTouchEnd = () => {
    rafRef.current = requestAnimationFrame(applyMomentum);
  };

  // Dot / arrow navigation
  const scrollTo = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector('.pg-card')?.offsetWidth + 24 || 374;
    el.scrollTo({ left: idx * cardW, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: 'clamp(4rem,8vh,8rem) 0', background: '#f8fafc', overflow: 'hidden' }}>
      <div className="container">

        {/* Header row */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0' }}>Our Products</h2>
        </div>

        {/* Progress bar */}
        <div style={{ height: '2px', background: 'rgba(0,57,166,0.1)', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${progress * 100}%`,
            background: 'var(--accent-primary)',
            transition: 'width 0.1s ease',
          }} />
        </div>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: '1.5rem',
            overflowX: 'auto', scrollbarWidth: 'none',
            cursor: 'grab', userSelect: 'none',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <style>{`.pg-track::-webkit-scrollbar{display:none}`}</style>
          {images.map((img, i) => {
            const isActive = i === active;
            return (
              <Link key={i} href={img.link} style={{ textDecoration: 'none', flexShrink: 0 }}
                onClick={e => { if (isDrag) e.preventDefault(); }}
              >
                <div className="pg-card" style={{
                  width: 'clamp(280px, 32vw, 420px)',
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease',
                  transform: isActive ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: isActive
                    ? '0 24px 60px rgba(0,57,166,0.18), 0 8px 20px rgba(0,0,0,0.1)'
                    : '0 4px 20px rgba(0,0,0,0.06)',
                  background: '#000',
                  cursor: 'pointer',
                }}>
                  {/* Image */}
                  <div style={{ height: 'clamp(200px, 22vw, 300px)', overflow: 'hidden', position: 'relative' }}>
                    <img src={img.src} alt={img.alt} style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
                      transform: isActive ? 'scale(1.06)' : 'scale(1)',
                      opacity: isActive ? 1 : 0.75,
                      display: 'block',
                    }} />
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                    }} />
                    {/* Active indicator dot */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#fff', boxShadow: '0 0 0 3px rgba(255,255,255,0.3)',
                        animation: 'pgPulse 1.5s ease-in-out infinite',
                      }} />
                    )}
                  </div>

                  {/* Label bar */}
                  <div style={{
                    padding: '1.2rem 1.4rem',
                    background: isActive ? '#000' : '#111',
                    transition: 'background 0.4s ease',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-title)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                        fontWeight: '800', color: '#fff', letterSpacing: '1px',
                        marginBottom: '0.2rem',
                      }}>{img.label}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        color: isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.4)',
                        letterSpacing: '2px', transition: 'color 0.4s ease',
                      }}>VIEW SPECS →</div>
                    </div>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: `1px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.4)',
                      fontSize: '0.9rem', transition: 'all 0.4s ease',
                    }}>→</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', marginTop: '2rem' }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} style={{
              width: i === active ? '24px' : '8px',
              height: '8px', borderRadius: '4px',
              background: i === active ? 'var(--accent-primary)' : 'rgba(0,57,166,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* Arrow controls below dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.2rem' }}>
          {['←', '→'].map((arrow, i) => (
            <button key={arrow} onClick={() => scrollTo(Math.max(0, Math.min(images.length - 1, active + (i === 0 ? -1 : 1))))}
              style={{
                width: '44px', height: '44px', background: '#fff',
                border: '1px solid rgba(0,57,166,0.2)', color: 'var(--accent-primary)',
                fontSize: '1.1rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0039A6'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
            >{arrow}</button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pgPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
