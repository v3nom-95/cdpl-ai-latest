'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { geoMercator, geoPath } from 'd3-geo';

/* ─── City pins ─── */
const LOCATIONS = [
    { name: 'Jammu',              lat: 32.73,  lon: 74.87,  type: 'ops' },
    { name: 'Maharashtra',        lat: 19.08,  lon: 75.72,  type: 'ops' },
    { name: 'Arunachal Pradesh',  lat: 27.10,  lon: 93.62,  type: 'ops' },
    { name: 'Himachal Pradesh',   lat: 31.10,  lon: 77.17,  type: 'ops' },
    { name: 'Uttarakhand',        lat: 30.07,  lon: 79.02,  type: 'ops' },
    { name: 'Punjab',             lat: 31.15,  lon: 75.34,  type: 'ops' },
    { name: 'Uttar Pradesh',      lat: 26.85,  lon: 80.95,  type: 'ops' },
    { name: 'Tripura',            lat: 23.94,  lon: 91.99,  type: 'ops' },
    { name: 'Chennai',            lat: 13.08,  lon: 80.27,  type: 'ops' },
    { name: 'Telangana',          lat: 17.39,  lon: 78.49,  type: 'ops' },
];

/* ─── State color palette (brand blues) ─── */
const STATE_COLORS = [
    '#0039A6','#0041b8','#0031a0','#003db0','#0035a0',
    '#0028a0','#0045c0','#002d9a','#0039b0','#003090',
    '#0042b5','#002ea5','#0038b8','#0033a8','#0040b0',
    '#002ca0','#0044b8','#0030a5','#003cb0','#0029a0',
    '#0043b5','#002fa8','#0037b0','#0034a5','#0041b0',
    '#002ba0','#0046c0','#002ea0','#003ab0','#0032a5',
];

interface GlobeMapProps { height?: number; }

/* ─── Initial view: India centered ─── */
// Mercator: India center ~(78, 22). We'll compute the initial transform
// so India fills the viewport on load.
const INDIA_CENTER_LON = 78.9;
const INDIA_CENTER_LAT = 22.5;

export default function GlobeMap({ height = 620 }: GlobeMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef       = useRef<SVGSVGElement>(null);

    const [dims,    setDims]    = useState({ w: 800, h: height });
    const [worldPaths,  setWorldPaths]  = useState<{ d: string; id: string }[]>([]);
    const [indiaPaths,  setIndiaPaths]  = useState<{ d: string; stateIdx: number }[]>([]);
    const [pins,        setPins]        = useState<{ x: number; y: number; name: string; type: string }[]>([]);
    const [loaded,      setLoaded]      = useState(false);
    const [tooltip,     setTooltip]     = useState<{ name: string; x: number; y: number } | null>(null);

    // Pan/zoom transform
    const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });

    // Drag state (refs to avoid stale closures)
    const isDragging  = useRef(false);
    const lastMouse   = useRef({ x: 0, y: 0 });
    const lastPinch   = useRef<number | null>(null);

    // Shared Mercator projection (world scale)
    // We use a world-scale projection and compute initial transform to center India
    const projRef = useRef<ReturnType<typeof geoMercator> | null>(null);

    /* ── Measure container ── */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setDims({ w: el.clientWidth || 800, h: height });
        });
        ro.observe(el);
        setDims({ w: el.clientWidth || 800, h: height });
        return () => ro.disconnect();
    }, [height]);

    /* ── Load GeoJSON data ── */
    useEffect(() => {
        if (!dims.w) return;

        const W = dims.w, H = dims.h;

        // World-scale Mercator: scale so full world fits in W×H
        const worldScale = W / (2 * Math.PI);
        const proj = geoMercator()
            .scale(worldScale)
            .translate([W / 2, H / 2]);
        projRef.current = proj;

        const pathGen = geoPath(proj);

        // Compute initial transform to center India and zoom in
        // India center in projected coords
        const [cx, cy] = proj([INDIA_CENTER_LON, INDIA_CENTER_LAT]) as [number, number];
        // We want India to fill ~60% of the viewport height
        // India spans roughly 30° lat → at worldScale that's about worldScale*30*π/180 px
        const indiaHeightPx = worldScale * 30 * Math.PI / 180;
        const targetK = (H * 0.65) / indiaHeightPx;
        const initX = W / 2 - cx * targetK;
        const initY = H / 2 - cy * targetK;
        setTransform({ x: initX, y: initY, k: targetK });

        Promise.all([
            fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(r => r.json()),
            fetch('/india.geojson').then(r => r.json()),
        ]).then(([worldTopo, indiaGeo]) => {
            // World countries
            import('topojson-client').then(topo => {
                const countries = (topo.feature(worldTopo, worldTopo.objects.countries as any) as any).features;
                const wPaths = countries.map((f: any) => ({
                    d: pathGen(f) || '',
                    id: f.id,
                }));
                setWorldPaths(wPaths);
            });

            // India districts — group by state for coloring
            const stateIndex: Record<string, number> = {};
            let si = 0;
            indiaGeo.features.forEach((f: any) => {
                const s = f.properties.st_nm;
                if (!(s in stateIndex)) stateIndex[s] = si++;
            });
            const iPaths = indiaGeo.features.map((f: any) => ({
                d: pathGen(f) || '',
                stateIdx: stateIndex[f.properties.st_nm],
            }));
            setIndiaPaths(iPaths);

            // City pins
            const cityPins = LOCATIONS.map(loc => {
                const [x, y] = proj([loc.lon, loc.lat]) as [number, number];
                return { x, y, name: loc.name, type: loc.type };
            });
            setPins(cityPins);
            setLoaded(true);
        });
    }, [dims.w, dims.h]);

    /* ── Zoom helper ── */
    const zoom = useCallback((factor: number, pivotX?: number, pivotY?: number) => {
        setTransform(t => {
            const newK = Math.min(40, Math.max(0.5, t.k * factor));
            const px = pivotX ?? dims.w / 2;
            const py = pivotY ?? dims.h / 2;
            return {
                k: newK,
                x: px - (px - t.x) * (newK / t.k),
                y: py - (py - t.y) * (newK / t.k),
            };
        });
    }, [dims.w, dims.h]);

    /* ── Mouse handlers ── */
    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMouse.current  = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
        lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };

    const onWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const rect = svgRef.current!.getBoundingClientRect();
        zoom(e.deltaY < 0 ? 1.12 : 0.89, e.clientX - rect.left, e.clientY - rect.top);
    };

    /* ── Touch handlers ── */
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            isDragging.current = true;
            lastMouse.current  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
            isDragging.current = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastPinch.current = Math.sqrt(dx * dx + dy * dy);
        }
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1 && isDragging.current) {
            const dx = e.touches[0].clientX - lastMouse.current.x;
            const dy = e.touches[0].clientY - lastMouse.current.y;
            setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
            lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2 && lastPinch.current !== null) {
            const dx   = e.touches[0].clientX - e.touches[1].clientX;
            const dy   = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            zoom(dist / lastPinch.current);
            lastPinch.current = dist;
        }
    };
    const onTouchEnd = () => { isDragging.current = false; lastPinch.current = null; };

    const strokeW = Math.max(0.3, 0.5 / transform.k);
    const pinScale = 1 / transform.k;

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', background: '#e8f0ff', border: '1px solid rgba(0,57,166,0.1)', overflow: 'hidden' }}>

            {/* Loading */}
            {!loaded && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#e8f0ff', flexDirection: 'column', gap: '1rem',
                    height: `${height}px`,
                }}>
                    <div style={{
                        width: '36px', height: '36px',
                        border: '2px solid rgba(0,57,166,0.15)',
                        borderTop: '2px solid #0039A6',
                        borderRadius: '50%',
                        animation: 'mapSpin 1s linear infinite',
                    }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '3px' }}>
                        LOADING MAP...
                    </span>
                </div>
            )}

            {/* Zoom buttons */}
            <div style={{
                position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
                {[{ label: '+', f: 1.3 }, { label: '−', f: 0.77 }].map(btn => (
                    <button key={btn.label} onClick={() => zoom(btn.f)} style={{
                        width: '34px', height: '34px', background: '#fff',
                        border: '1px solid rgba(0,57,166,0.2)', color: 'var(--accent-primary)',
                        fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        lineHeight: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        transition: 'background 0.2s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#e8eeff')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >{btn.label}</button>
                ))}
                {/* Reset to India view */}
                <button onClick={() => {
                    if (!projRef.current) return;
                    const W = dims.w, H = dims.h;
                    const worldScale = W / (2 * Math.PI);
                    const [cx, cy] = projRef.current([INDIA_CENTER_LON, INDIA_CENTER_LAT]) as [number, number];
                    const indiaHeightPx = worldScale * 30 * Math.PI / 180;
                    const targetK = (H * 0.65) / indiaHeightPx;
                    setTransform({ x: W / 2 - cx * targetK, y: H / 2 - cy * targetK, k: targetK });
                }} style={{
                    width: '34px', height: '34px', background: '#fff',
                    border: '1px solid rgba(0,57,166,0.2)', color: 'var(--accent-primary)',
                    fontSize: '0.6rem', fontWeight: '800', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    letterSpacing: '0.5px', transition: 'background 0.2s',
                    marginTop: '8px',
                }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#e8eeff')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    title="Reset to India"
                >IN</button>
            </div>

            {/* HUD corners */}
            {([
                { top: '0.8rem',    left: '0.8rem',  bt: true, bl: true  },
                { top: '0.8rem',    right: '0.8rem', bt: true, br: true  },
                { bottom: '0.8rem', left: '0.8rem',  bb: true, bl: true  },
                { bottom: '0.8rem', right: '0.8rem', bb: true, br: true  },
            ] as any[]).map((c, i) => (
                <div key={i} style={{
                    position: 'absolute', zIndex: 10, pointerEvents: 'none',
                    top: c.top, left: c.left, bottom: c.bottom, right: c.right,
                    width: '18px', height: '18px',
                    borderTop:    c.bt ? '2px solid rgba(0,57,166,0.3)' : 'none',
                    borderBottom: c.bb ? '2px solid rgba(0,57,166,0.3)' : 'none',
                    borderLeft:   c.bl ? '2px solid rgba(0,57,166,0.3)' : 'none',
                    borderRight:  c.br ? '2px solid rgba(0,57,166,0.3)' : 'none',
                }} />
            ))}

            {/* SVG */}
            <svg
                ref={svgRef}
                width={dims.w}
                height={height}
                style={{ display: 'block', cursor: isDragging.current ? 'grabbing' : 'grab', userSelect: 'none' }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onWheel={onWheel}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>

                    {/* ── World countries (base layer) ── */}
                    {worldPaths.map((p, i) => (
                        <path
                            key={i}
                            d={p.d}
                            fill={p.id === '356' ? 'none' : '#0a1f5c'}  /* India = transparent (overridden by district layer) */
                            stroke="#162d7a"
                            strokeWidth={strokeW}
                            opacity={0.85}
                        />
                    ))}

                    {/* ── India district layer (detailed, on top) ── */}
                    {indiaPaths.map((p, i) => (
                        <path
                            key={i}
                            d={p.d}
                            fill={STATE_COLORS[p.stateIdx % STATE_COLORS.length]}
                            stroke="#88bbff"
                            strokeWidth={strokeW * 0.8}
                            opacity={0.95}
                        />
                    ))}

                    {/* ── City pins — masicon.png ── */}
                    {pins.map((pin, i) => {
                        const isHQ = pin.type === 'hq';
                        const size = (isHQ ? 28 : 22) * pinScale;
                        return (
                            <g key={i} style={{ cursor: 'pointer' }}
                                onMouseEnter={e => {
                                    const rect = svgRef.current!.getBoundingClientRect();
                                    setTooltip({ name: pin.name, x: e.clientX - rect.left, y: e.clientY - rect.top });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                {/* Drop shadow circle */}
                                <circle
                                    cx={pin.x} cy={pin.y + size * 0.55}
                                    r={size * 0.28}
                                    fill="rgba(0,0,0,0.25)"
                                    style={{ filter: 'blur(2px)' }}
                                />
                                {/* masicon image centered on pin point */}
                                <image
                                    href="/maspointer.png"
                                    x={pin.x - size / 2}
                                    y={pin.y - size}
                                    width={size}
                                    height={size}
                                    style={{ filter: isHQ ? 'drop-shadow(0 0 4px #0055ff)' : 'none' }}
                                />
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* Tooltip */}
            {tooltip && (
                <div style={{
                    position: 'absolute',
                    left: tooltip.x + 14, top: tooltip.y - 12,
                    zIndex: 30, pointerEvents: 'none',
                    background: 'rgba(0,0,0,0.88)',
                    border: '1px solid rgba(0,57,166,0.6)',
                    padding: '0.35rem 0.8rem',
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#fff', fontWeight: '700', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                        {tooltip.name.toUpperCase()}
                    </span>
                </div>
            )}

            <style jsx>{`
                @keyframes mapSpin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
