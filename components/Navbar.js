'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const HackerLink = ({ href, text, children, className = "", isActive = false, onClick }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef(null);
    const chars = "01";

    useEffect(() => {
        setDisplayText(text);
    }, [text]);

    const startScramble = () => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
                setDisplayText(text);
            }
            iteration += 1 / 3;
        }, 30);
    };

    const handleMouseEnter = () => {
        // Disable scramble on mobile
        if (typeof window !== 'undefined' && window.innerWidth > 992) {
            startScramble();
        }
    };

    return (
        <Link
            href={href}
            className={`hacker-link ${className} ${isActive ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
        >
            <div className="hacker-text-wrapper">
                <span className="hacker-text">{displayText}</span>
                <span className="static-text-placeholder">{text}</span>
            </div>
            {children}
            <span className="corner corner-tl"></span>
            <span className="corner corner-tr"></span>
            <span className="corner corner-bl"></span>
            <span className="corner corner-br"></span>
            <style jsx>{`
                .hacker-text-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hacker-text {
                    position: absolute;
                    white-space: nowrap;
                    z-index: 2;
                }
                .static-text-placeholder {
                    visibility: hidden;
                    white-space: nowrap;
                    pointer-events: none;
                }
                @media (max-width: 992px) {
                    .hacker-text { 
                        position: relative !important;
                        display: inline-block !important; 
                        color: #0a0b0d !important; 
                        width: 100%; 
                        text-align: center; 
                    }
                    .static-text-placeholder { display: none !important; }
                    .corner { display: none !important; }
                }
            `}</style>
        </Link>
    );
};

const Navbar = () => {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeTimerRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isBardPage = pathname.startsWith('/products/bard');
    const isCareersPage = pathname === '/careers';
    const hasDarkHero = isHomePage || isBardPage || isCareersPage;

    useEffect(() => {
        const handleScroll = () => {
            // Use 5px threshold so navbar snaps to solid almost immediately.
            // This prevents white text on white background when scrolling from
            // the dark hero to the light products section.
            const isScrolled = window.scrollY > 5;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Run once on mount in case page is loaded mid-scroll
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Close mobile menu and mega-menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsMegaMenuOpen(false);
    }, [pathname]);

    const openMegaMenu = () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setIsMegaMenuOpen(true);
    };

    const closeMegaMenuDelayed = () => {
        closeTimerRef.current = setTimeout(() => setIsMegaMenuOpen(false), 150);
    };

    const handleMegaLinkClick = () => {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''} ${!hasDarkHero ? 'solid' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''} ${isMegaMenuOpen ? 'mega-open' : ''}`}
            onMouseLeave={closeMegaMenuDelayed}
        >
            <div className="container nav-container">
                <Link href="/" className="logo-container" onClick={() => setIsMegaMenuOpen(false)}>
                    <img
                        src={(scrolled || !hasDarkHero || isMobileMenuOpen) ? "/partners/cdpliconbl.png" : "/partners/cdplicon.png"}
                        alt="CDPL Logo"
                        className="nav-logo"
                    />
                </Link>

                <button
                    className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <div className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
                    <HackerLink href="/" text="Home" isActive={pathname === '/'} onClick={() => setIsMegaMenuOpen(false)} />
                    <div className="dropdown">
                        <HackerLink href="/about" text="About CDPL" isActive={pathname === '/about'} onClick={() => setIsMegaMenuOpen(false)} />
                        <div className="dropdown-content">
                            <Link href="/about" onClick={() => setIsMegaMenuOpen(false)}>Company Overview</Link>
                            <Link href="/about#leadership" onClick={() => setIsMegaMenuOpen(false)}>Leadership</Link>
                        </div>
                    </div>
                    <div
                        className="dropdown mega-dropdown"
                        onMouseEnter={openMegaMenu}
                        onMouseLeave={closeMegaMenuDelayed}
                    >
                        <HackerLink href="/products" text="Products" isActive={pathname.startsWith('/products') || pathname === '/mas' || pathname === '/mgs' || pathname === '/mms'} />
                        <div className={`mega-menu ${isMegaMenuOpen ? 'active' : ''}`}>
                            <div className="mega-menu-container">
                                <div className="mega-column" style={{ borderRight: '1px solid rgba(0, 57, 166, 0.1)' }}>
                                    <Link href="/mas" onClick={handleMegaLinkClick} className={`mega-header ${pathname === '/mas' || pathname.startsWith('/products/mas') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', textDecoration: 'none', cursor: 'pointer', position: 'relative', padding: '10px' }}>
                                        <div style={{ height: '30px', width: '40px', background: '#ffffff', border: '1px solid var(--team-mas)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: '2', overflow: 'hidden' }}>
                                            <img src="/partners/masicon.png" alt="MAS" style={{ height: '26px', width: '36px', objectFit: 'contain' }} />
                                        </div>
                                        <span className="mega-category" style={{ color: 'var(--team-mas)', position: 'relative', zIndex: '2' }}>Major Aerospace Systems</span>
                                        <span className="corner corner-tl"></span>
                                        <span className="corner corner-tr"></span>
                                        <span className="corner corner-bl"></span>
                                        <span className="corner corner-br"></span>
                                    </Link>
                                    <div className="mega-links">
                                        <Link href="/products/raven" onClick={handleMegaLinkClick} className="mega-link-item team-mas" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '44px', height: '44px', background: '#f8f9fa', border: '1px solid rgba(0, 57, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src="/partners/r1.png" alt="RAVEN" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="link-title">RAVEN</span>
                                                <span className="link-desc">Simulator</span>
                                            </div>
                                        </Link>
                                        <Link href="/products/bard" onClick={handleMegaLinkClick} className="mega-link-item team-mas" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '44px', height: '44px', background: '#f8f9fa', border: '1px solid rgba(0, 57, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src="/partners/bard1.png" alt="BARD" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="link-title">BARD </span>
                                                <span className="link-desc">Strategic Quad ISR</span>
                                            </div>
                                        </Link>
                                        <Link href="/products/horizon-vtol" onClick={handleMegaLinkClick} className="mega-link-item team-mas" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '44px', height: '44px', background: '#f8f9fa', border: '1px solid rgba(0, 57, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src="/partners/horizonvtol.png" alt="HORIZON VTOL" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="link-title">HORIZON VTOL</span>
                                                <span className="link-desc">Long Range Fixed-Wing</span>
                                            </div>
                                        </Link>
                                        <Link href="/products/horizon-fpv" onClick={handleMegaLinkClick} className="mega-link-item team-mas" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '44px', height: '44px', background: '#f8f9fa', border: '1px solid rgba(0, 57, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src="/partners/horizonfpv.jpeg" alt="HORIZON FPV" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="link-title">HORIZON FPV</span>
                                                <span className="link-desc">Advanced Trainer</span>
                                            </div>
                                        </Link>
                                        <Link href="/products/stinger" onClick={handleMegaLinkClick} className="mega-link-item team-mas" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '44px', height: '44px', background: '#f8f9fa', border: '1px solid rgba(0, 57, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src="/partners/stinger.jpeg" alt="STINGER" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="link-title">STINGER </span>
                                                <span className="link-desc">Tactical Strike</span>
                                            </div>
                                        </Link>
                                        <Link href="/products/aot" onClick={handleMegaLinkClick} className="mega-link-item team-mas" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '44px', height: '44px', background: '#f8f9fa', border: '1px solid rgba(0, 57, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src="/partners/aot.png" alt="AOT Trainer" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="link-title">AOT Trainer</span>
                                                <span className="link-desc">Pilot Training</span>
                                            </div>
                                        </Link>
                                        <Link href="/mas" onClick={handleMegaLinkClick} className="view-all-link" style={{ color: 'var(--team-mas)', marginTop: '0.5rem' }}>View MAS Portfolio &rarr;</Link>
                                    </div>
                                </div>

                                <div className="mega-column" style={{ borderRight: '1px solid rgba(75, 83, 32, 0.1)' }}>
                                    <Link href="/mgs" onClick={handleMegaLinkClick} className={`mega-header ${pathname === '/mgs' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', textDecoration: 'none', cursor: 'pointer', position: 'relative', padding: '10px' }}>
                                        <div style={{ height: '30px', width: '40px', background: '#ffffff', border: '1px solid var(--team-mgs)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: '2', overflow: 'hidden' }}>
                                            <img src="/partners/mgsicon.png" alt="MGS" style={{ height: '26px', width: '36px', objectFit: 'contain' }} />
                                        </div>
                                        <span className="mega-category" style={{ color: 'var(--team-mgs)', position: 'relative', zIndex: '2' }}>Major Ground Systems</span>
                                        <span className="corner corner-tl"></span>
                                        <span className="corner corner-tr"></span>
                                        <span className="corner corner-bl"></span>
                                        <span className="corner corner-br"></span>
                                    </Link>
                                    <div className="mega-links">
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                                            [ Under research and development ]
                                        </p>
                                        <Link href="/mgs" onClick={handleMegaLinkClick} className="view-all-link" style={{ color: 'var(--team-mgs)', marginTop: '1rem', display: 'block' }}>View MGS Portfolio &rarr;</Link>
                                    </div>
                                </div>

                                <div className="mega-column">
                                    <Link href="/mms" onClick={handleMegaLinkClick} className={`mega-header ${pathname === '/mms' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', textDecoration: 'none', cursor: 'pointer', position: 'relative', padding: '10px' }}>
                                        <div style={{ height: '30px', width: '40px', background: '#ffffff', border: '1px solid var(--team-mms)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: '2', overflow: 'hidden' }}>
                                            <img src="/partners/mmsicon.png" alt="MMS" style={{ height: '26px', width: '36px', objectFit: 'contain' }} />
                                        </div>
                                        <span className="mega-category" style={{ color: 'var(--team-mms)', position: 'relative', zIndex: '2' }}>Major Marine Systems</span>
                                        <span className="corner corner-tl"></span>
                                        <span className="corner corner-tr"></span>
                                        <span className="corner corner-bl"></span>
                                        <span className="corner corner-br"></span>
                                    </Link>
                                    <div className="mega-links">
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                                            [ Under research and development ]
                                        </p>
                                        <Link href="/mms" onClick={handleMegaLinkClick} className="view-all-link" style={{ color: 'var(--team-mms)', marginTop: '1rem', display: 'block' }}>View MMS Portfolio &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <HackerLink href="/resources" text="Resources" isActive={pathname === '/resources'} onClick={() => setIsMegaMenuOpen(false)} />
                        <div className="dropdown-content">
                            <Link href="/resources#news-room" onClick={() => setIsMegaMenuOpen(false)}>News Room</Link>
                            <Link href="/resources#photos-videos" onClick={() => setIsMegaMenuOpen(false)}>Photos & Videos</Link>
                            <Link href="/resources#downloads" onClick={() => setIsMegaMenuOpen(false)}>Downloads</Link>
                        </div>
                    </div>
                    <HackerLink href="/careers" text="Careers" isActive={pathname === '/careers'} onClick={() => setIsMegaMenuOpen(false)} />
                    <Link href="/contact" className="btn btn-primary nav-btn" onClick={() => setIsMegaMenuOpen(false)}>Contact</Link>
                </div>
            </div>

            <style jsx>{`
                .mobile-toggle {
                    display: none;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 30px;
                    height: 21px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    padding: 0;
                    z-index: 2001;
                }

                .bar {
                    width: 100%;
                    height: 2px;
                    background-color: ${(scrolled || !hasDarkHero || isMobileMenuOpen) ? 'var(--text-primary)' : '#fff'};
                    transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.45s ease, opacity 0.45s ease;
                }

                /* Force dark cross on white mobile menu */
                .mobile-toggle.active .bar {
                    background-color: var(--text-primary) !important;
                }

                .mobile-toggle.active .bar:nth-child(1) {
                    transform: translateY(9.5px) rotate(45deg);
                }

                .mobile-toggle.active .bar:nth-child(2) {
                    opacity: 0;
                }

                .mobile-toggle.active .bar:nth-child(3) {
                    transform: translateY(-9.5px) rotate(-45deg);
                }

                @media (max-width: 992px) {
                    .mobile-toggle {
                        display: flex;
                    }

                    .nav-links {
                        position: fixed;
                        top: 0;
                        right: 0;
                        width: 85%;
                        height: 100vh;
                        background: #ffffff !important;
                        display: flex !important;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        gap: 1.5rem; /* Reduced gap from 2rem */
                        transform: translateX(100%);
                        transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
                        box-shadow: -10px 0 40px rgba(0,0,0,0.15);
                        z-index: 2000;
                        padding: 7rem 2rem 4rem; /* Adjusted top padding */
                        overflow-y: auto;
                        opacity: 1;
                    }

                    .nav-links.show {
                        transform: translateX(0) !important;
                    }

                    :global(.navbar.solid .nav-links) {
                        background: #fff;
                    }

                    .nav-links .hacker-link {
                         color: #0a0b0d !important;
                         font-size: 1.25rem !important;
                         width: 100%;
                         text-align: center;
                         height: auto !important;
                         min-height: 40px; /* Reduced specific height */
                         padding: 0.5rem 0; /* Reduced padding */
                         display: flex !important;
                         justify-content: center;
                         align-items: center;
                         position: relative;
                         opacity: 1 !important;
                         margin: 0;
                    }
                    
                    .nav-links .hacker-link .hacker-text {
                        color: #0a0b0d !important;
                        display: inline-block !important;
                        opacity: 1 !important;
                        position: relative;
                        z-index: 10;
                        min-width: 50px;
                    }


                    .dropdown {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 0;
                    }

                    .dropdown-content {
                        position: static;
                        box-shadow: none;
                        background: transparent;
                        padding: 0;
                        margin-top: 0.5rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    
                    .dropdown-content a {
                        font-size: 0.9rem;
                        color: #555;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    /* Mega Menu Mobile Styles */
                    .mega-menu {
                        display: flex !important; /* Enable on mobile */
                        position: static;
                        box-shadow: none;
                        background: transparent;
                        padding: 0;
                        margin-top: 0.5rem;
                        width: 100%;
                        opacity: 1 !important;
                        visibility: visible !important;
                        border: none;
                    }

                    .mega-menu-container {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        gap: 0.5rem;
                        padding: 0;
                    }

                    .mega-column {
                        border: none !important;
                        padding: 0 !important;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    }

                    /* Force a uniform flex row for the headers on mobile */
                    .mega-header {
                        display: flex !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        justify-content: flex-start !important;
                        margin-bottom: 0.5rem !important;
                        padding: 0.5rem 1rem !important; /* Adding side padding to pull it in */
                        text-align: left !important;
                        width: 100%;
                        max-width: 300px; /* Constrain width to keep it clustered */
                    }
                    
                    /* Create a fixed-width housing for all three mobile images */
                    .mega-header > div,
                    .mega-header > img { 
                         display: flex !important; 
                         width: 56px !important;
                         height: 36px !important;
                         margin: 0 15px 0 0 !important; /* Push text to the right uniformly */
                         object-fit: contain;
                         flex-shrink: 0;
                         align-items: center;
                         justify-content: center;
                    }

                    /* Only for the MGS/MMS divs: Hide their borders in mobile view, just show the transparent icon */
                    .mega-header div[style*="border: 1px solid"] {
                         border: none !important;
                         background: transparent !important;
                    }
                    
                    .mega-category {
                        font-family: var(--font-mono); 
                        font-size: 0.85rem; /* Slightly smaller for mobile */
                        color: #555 !important; 
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        display: block;
                        text-align: left !important; /* Force left alignment */
                        line-height: 1.2;
                    }

                    /* Hide specific sub-links and descriptions on mobile to reduce clutter */
                    .mega-links {
                        display: none !important;
                    }
                    
                    /* Show corners on hover for desktop only */
                    .nav-links .hacker-link:hover,
                    .nav-links .hacker-link:hover .hacker-text {
                         color: var(--accent-primary) !important;
                    }

                    .nav-btn {
                        width: 100%;
                        margin-top: 1rem;
                    }
                }
                @media (max-width: 768px) {
                    .nav-container {
                        padding: 1rem 1.5rem !important;
                    }
                    .nav-logo {
                        max-width: 140px !important;
                        height: auto;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
