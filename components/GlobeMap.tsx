'use client';

import { useEffect, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';

const LOCATIONS = [
    { name: 'Kanchipuram HQ', lat: 12.83, lon: 79.70, type: 'hq'  },
    { name: 'New Delhi',       lat: 28.61, lon: 77.21, type: 'ops' },
    { name: 'Mumbai',          lat: 19.08, lon: 72.88, type: 'ops' },
    { name: 'Bengaluru',       lat: 12.97, lon: 77.59, type: 'ops' },
    { name: 'Hyderabad',       lat: 17.39, lon: 78.49, type: 'ops' },
    { name: 'Chennai',         lat: 13.08, lon: 80.27, type: 'ops' },
    { name: 'Pune',            lat: 18.52, lon: 73.86, type: 'ops' },
];

interface GlobeMapProps { height?: number; }

export default function GlobeMap({ height = 620 }: GlobeMapProps) {
    const svgRef  = useRef<SVGSVGElement>(null);
    const [paths, setPaths]     = useState<{ d: string; state: string; i: number }[]>([]);
    const [pins,  setPins]      = useState<{ x: number; y: number; name: string; type: string }[]>([]);
    const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
    const [loaded, setLoaded]   = useState(false);
    const [dims,   setDims]     = useState({ w: 800, h: height });

    // Zoom / pan state
    const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
    const isDragging  = useRef(false);
    const lastMouse   = useRef({ x: 0, y: 0 });
    const lastPinch   = useRef<number | null>(null);

    useEffect(() => {
        const el = svgRef.current;
        if (!el) return;
        const ro = new ResizeObserver(entries => {
            const { width } = entries[0].contentRect;
            setDims({ w: width, h: height });
        });
        ro.observe(el.parentElement!);
        setDims({ w: el.parentElement!.clientWidth || 800, h: height });
        return () => ro.disconnect();
    }, [height]);

    useEffect(() => {
        if (!dims.w) return;
        fetch('/india.geojson')
            .then(r => r.json())
            .then(geo => {
                // Build projection fitted to the GeoJSON bounds
                const proj = geoMercator().fitSize([dims.w, dims.h], geo);
                const pathGen = geoPath(proj);

                // Group districts by state for coloring
                const stateIndex: Record<string, number> = {};
                let si = 0;
                geo.features.forEach((f: any) => {
                    const s = f.properties.st_nm;
                    if (!(s in stateIndex)) stateIndex[s] = si++;
                });

                const districtPaths = geo.features.map((f: any, i: number) => ({
                    d: pathGen(f) || '',
                    state: f.properties.st_nm,
                    i: stateIndex[f.properties.st_nm],
                }));

                // Project city pins
                const cityPins = LOCATIONS.map(loc => {
                    const [x, y] = proj([loc.lon, loc.lat]) as [number, number];
                    return { x, y, name: loc.name, type: loc.type };
                });

                setPaths(districtPaths);
                setPins(cityPins);
                setLoaded(true);
            });
    }, [dims.w, dims.h]);

    // Color palette — shades of blue matching brand
    const stateColors = [
        '#0039A6','#0041b8','#0031a0','#003db0','#0035a0',
        '#0028a0','#0045c0','#002d9a','#0039b0','#003090',
        '#0042b5','#002ea5','#0038b8','#0033a8','#0040b0',
        '#002ca0','#0044b8','#0030a5','#003cb0','#0029a0',
        '#0043b5','#002fa8','#0037b0','#0034a5','#0041b0',
        '#002ba0','#0046c0','#002ea0','#003ab0','#0032a5',
    ];

    // Drag handlers
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
        const factor = e.deltaY < 0 ? 1.12 : 0.89;
        setTransform(t => {
            const newK = Math.min(8, Math.max(0.5, t.k * factor));
            // Zoom toward mouse position
            const rect = svgRef.current!.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            return {
                k: newK,
                x: mx - (mx - t.x) * (newK / t.k),
                y: my - (my - t.y) * (newK / t.k),
            };
        });
    };

    // Touch
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
            const factor = dist / lastPinch.current;
            setTransform(t => ({ ...t, k: Math.min(8, Math.max(0.5, t.k * factor)) }));
            lastPinch.current = dist;
        }
    };
    const onTouchEnd = () => { isDragging.current = false; lastPinch.current = null; };

    const zoom = (delta: number) => {
        setTransform(t => {
            const newK = Math.min(8, Math.max(0.5, t.k * delta));
            const cx = dims.w / 2, cy = dims.h / 2;
            return {
                k: newK,
                x: cx - (cx - t.x) * (newK / t.k),
                y: cy - (cy - t.y) * (newK / t.k),
            };
        });
    };

    return (
        <div style={{ position: 'relative', width: '100%', background: '#f0f4ff', border: '1px solid rgba(0,57,166,0.1)', overflow: 'hidden' }}>

            {/* Loading */}
            {!loaded && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#f0f4ff', flexDirection: 'column', gap: '1rem',
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

            {/* Zoom controls */}
            <div style={{
                position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
                {[{ label: '+', d: 1.25 }, { label: '−', d: 0.8 }].map(btn => (
                    <button key={btn.label} onClick={() => zoom(btn.d)} style={{
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
            </div>

            {/* HUD corners */}
            {([
                { top: '0.8rem', left: '0.8rem',  bt: true, bl: true  },
                { top: '0.8rem', right: '0.8rem', bt: true, br: true  },
                { bottom: '0.8rem', left: '0.8rem',  bb: true, bl: true },
                { bottom: '0.8rem', right: '0.8rem', bb: true, br: true },
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

            {/* SVG Map */}
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
                    {/* Districts */}
                    {paths.map((p, idx) => (
                        <path
                            key={idx}
                            d={p.d}
                            fill={stateColors[p.i % stateColors.length]}
                            stroke="#88bbff"
                            strokeWidth={0.5 / transform.k}
                            opacity={0.92}
                        />
                    ))}

                    {/* City pins */}
                    {pins.map((pin, idx) => {
                        const isHQ = pin.type === 'hq';
                        const r    = (isHQ ? 7 : 5) / transform.k;
                        const rOuter = (isHQ ? 13 : 10) / transform.k;
                        return (
                            <g key={idx}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={e => {
                                    const rect = svgRef.current!.getBoundingClientRect();
                                    setTooltip({ name: pin.name, x: e.clientX - rect.left, y: e.clientY - rect.top });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                {/* Outer ring */}
                                <circle
                                    cx={pin.x} cy={pin.y} r={rOuter}
                                    fill="none"
                                    stroke={isHQ ? '#0055ff' : '#CC5D29'}
                                    strokeWidth={1.5 / transform.k}
                                    opacity={0.5}
                                />
                                {/* Core dot */}
                                <circle
                                    cx={pin.x} cy={pin.y} r={r}
                                    fill={isHQ ? '#0055ff' : '#CC5D29'}
                                    stroke="#fff"
                                    strokeWidth={1.5 / transform.k}
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
