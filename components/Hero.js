'use client';

import { useState, useEffect } from 'react';

    export default function Hero() {

    return (
        <section id="home" className="hero-section">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
            >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-overlay"></div>
        </section>
    );
}
