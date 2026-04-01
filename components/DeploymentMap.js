'use client';

import React, { useEffect, useRef } from 'react';

// Removed pins as per user request to remove blinking and hovering nodes

export default function DeploymentMap({ isCompact = false }) {
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!mapRef.current || !wrapperRef.current) return;

            const rect = mapRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress: 0 when map enters the bottom of the viewport, 1 when it's well into the screen
            const rawProgress = (windowHeight - rect.top) / (windowHeight * 0.6);
            const progress = Math.max(0, Math.min(1, rawProgress));

            // Smoothly scale from 0.8 to 1.0, and fade from 0.3 to 1.0
            const scale = 0.8 + (0.2 * progress);
            const opacity = 0.3 + (0.7 * progress);

            wrapperRef.current.style.transform = `scale(${scale})`;
            wrapperRef.current.style.opacity = opacity;

            if (titleRef.current) {
                titleRef.current.style.opacity = progress;
                titleRef.current.style.transform = `translateY(${20 - (progress * 20)}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial setup
        setTimeout(handleScroll, 50);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={mapRef} className={`deployment-map-container ${isCompact ? 'compact' : ''}`}>
            {!isCompact && <h3 ref={titleRef} className="map-title" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' }}>[ STRATEGIC_NETWORK_MATRIX ]</h3>}
            <div
                ref={wrapperRef}
                className="map-wrapper shadow-premium"
                style={{
                    transform: 'scale(0.8)',
                    opacity: 0.3,
                    transformOrigin: 'center top',
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                }}
            >
                <div className="map-hud-ortho">
                    <span className="hud-metric top-l">PROJECTION: ORTHOGRAPHIC_3D</span>
                    <span className="hud-metric top-r">DATA_POINTS: CLASSIFIED</span>
                    <span className="hud-metric bot-l">V_ACCURACY: 100%</span>
                </div>

                <div className="image-container-v3">
                    <img src="/images/india_top_3d.png" alt="Tactical Top-Down View of India" className="map-image-top" />
                    <div className="terrain-gloss"></div>
                </div>

                {/* Nodes removed as requested */}
            </div>

            <style jsx>{`
                .deployment-map-container {
                    margin-top: 2rem;
                    text-align: center;
                    width: 100%;
                }
                .deployment-map-container.compact {
                    margin-top: 0;
                }
                .map-title {
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    letter-spacing: 6px;
                    color: var(--accent-primary);
                    margin-bottom: 3.5rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }
                .map-wrapper {
                    position: relative;
                    max-width: 1100px;
                    margin: 0 auto;
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 40px 120px rgba(0, 57, 166, 0.08);
                }
                .image-container-v3 {
                    position: relative;
                    padding: 1rem;
                }
                .map-image-top {
                    width: 100%;
                    height: auto;
                    display: block;
                    filter: saturate(0.9) contrast(1.02);
                }
                .terrain-gloss {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.02) 100%);
                    pointer-events: none;
                }

                /* Ortho HUD */
                .map-hud-ortho {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    pointer-events: none;
                }
                .hud-metric {
                    position: absolute;
                    font-family: var(--font-mono);
                    font-size: 0.5rem;
                    color: #64748b;
                    background: rgba(255,255,255,0.8);
                    padding: 4px 12px;
                    border: 1px solid #cbd5e1;
                    font-weight: 600;
                }
                .top-l { top: 2.5rem; left: 2.5rem; }
                .top-r { top: 2.5rem; right: 2.5rem; }
                .bot-l { bottom: 2.5rem; left: 2.5rem; }

                .orbital-scan {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(to right, transparent, transparent 48%, rgba(0, 57, 166, 0.05) 50%, transparent 52%);
                    background-size: 200% 100%;
                    animation: sweep 12s linear infinite;
                    opacity: 0.1;
                }

                .node-anchor {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    z-index: 20;
                    cursor: crosshair;
                }
                .node-base-v3 {
                    width: 8px;
                    height: 8px;
                    background: #e11d48;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 15px rgba(225, 29, 72, 0.4);
                    transition: all 0.25s ease;
                }
                .active-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 24px;
                    height: 24px;
                    border: 1px solid rgba(225, 29, 72, 0.2);
                    border-radius: 50%;
                    animation: pulseOrtho 2.5s infinite;
                }
                .node-anchor:hover .node-base-v3 {
                    transform: scale(2);
                    background: #0f172a;
                    border-color: #e11d48;
                    z-index: 30;
                }

                /* Holographic labels */
                .holographic-label {
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%) translateX(15px);
                    background: white;
                    border: 1px solid #e11d48;
                    padding: 8px 16px;
                    display: flex;
                    flex-direction: column;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 8px 8px 25px rgba(0,0,0,0.1);
                }
                .node-anchor:hover .holographic-label {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(-50%) translateX(10px);
                }
                .label-city {
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: 2px;
                }
                .label-state {
                    font-family: var(--font-mono);
                    font-size: 0.5rem;
                    font-weight: 600;
                    color: #e11d48;
                }

                @keyframes pulseOrtho {
                    0% { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
                }
                @keyframes sweep {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @media (max-width: 768px) {
                    .map-wrapper { border-radius: 0; padding: 0.5rem; }
                    .hud-metric { display: none; }
                    .holographic-label { 
                        transform: translateY(-130%) translateX(-50%);
                        left: 50%;
                    }
                }
            `}</style>
        </div>
    );
}


