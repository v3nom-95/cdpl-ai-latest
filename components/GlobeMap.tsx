'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────
   DEFINITIVE APPROACH:
   - Standard equirectangular texture (no d3 rotation)
   - Standard Three.js sphere UV (lon=-180 at seam, wraps to +180)
   - Rotate globe group to bring India (lon=80, lat=22) to front
   
   Three.js sphere: texture center (lon=0) maps to BACK (z-)
   To bring lon=80 to FRONT (z+): rotate Y by -(80 + 180) = -260° = +100° = 1.745 rad
───────────────────────────────────────────────────────────── */

const INDIA_LON = 80;
const INDIA_LAT = 22;

const LOCATIONS = [
    { name: 'Kanchipuram HQ', lat: 12.83, lon: 79.70, type: 'hq'  },
    { name: 'New Delhi',       lat: 28.61, lon: 77.21, type: 'ops' },
    { name: 'Mumbai',          lat: 19.08, lon: 72.88, type: 'ops' },
    { name: 'Bengaluru',       lat: 12.97, lon: 77.59, type: 'ops' },
    { name: 'Hyderabad',       lat: 17.39, lon: 78.49, type: 'ops' },
    { name: 'Chennai',         lat: 13.08, lon: 80.27, type: 'ops' },
    { name: 'Pune',            lat: 18.52, lon: 73.86, type: 'ops' },
];

// Standard formula — no adjustments
function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
    const phi   = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
    );
}

async function buildGlobeTexture(size: number): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width  = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = '#040d1e';
    ctx.fillRect(0, 0, W, H);

    const { geoEquirectangular, geoPath: geoPathFn, geoGraticule } = await import('d3-geo');
    
    // Standard projection — no rotation
    const proj = geoEquirectangular()
        .scale(W / (2 * Math.PI))
        .translate([W / 2, H / 2]);
    const path = geoPathFn(proj, ctx);

    // Graticule
    ctx.beginPath();
    path(geoGraticule().step([10, 10])() as any);
    ctx.strokeStyle = 'rgba(0,57,166,0.08)';
    ctx.lineWidth   = 0.5;
    ctx.stroke();

    // World countries
    const worldRes   = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
    const worldTopo  = await worldRes.json();
    const topoClient = await import('topojson-client');
    const countries  = (topoClient.feature(worldTopo, worldTopo.objects.countries as any) as any).features;

    countries.forEach((f: any) => {
        ctx.beginPath(); path(f);
        ctx.fillStyle   = '#0a1f5c';
        ctx.fill();
        ctx.strokeStyle = '#162d7a';
        ctx.lineWidth   = 0.5;
        ctx.stroke();
    });

    // India base
    countries.forEach((f: any) => {
        if (f.id === '356') {
            ctx.beginPath(); path(f);
            ctx.fillStyle = '#0a2a8a';
            ctx.fill();
        }
    });

    // India states
    try {
        const indiaRes = await fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson');
        const indiaGeo = await indiaRes.json();

        const stateColors = ['#0039A6','#0041b8','#0035a0','#003db0','#0031a0','#0039A6','#003db0','#0041b8','#0035a0','#0039A6'];
        indiaGeo.features.forEach((f: any, i: number) => {
            ctx.beginPath(); path(f);
            ctx.fillStyle = stateColors[i % stateColors.length];
            ctx.fill();
        });
        indiaGeo.features.forEach((f: any) => {
            ctx.beginPath(); path(f);
            ctx.strokeStyle = '#5599ff';
            ctx.lineWidth   = 1.4;
            ctx.stroke();
        });
        countries.forEach((f: any) => {
            if (f.id === '356') {
                ctx.beginPath(); path(f);
                ctx.strokeStyle = '#88bbff';
                ctx.lineWidth   = 2.0;
                ctx.stroke();
            }
        });
    } catch {
        countries.forEach((f: any) => {
            if (f.id === '356') {
                ctx.beginPath(); path(f);
                ctx.fillStyle   = '#0039A6';
                ctx.fill();
                ctx.strokeStyle = '#4488ff';
                ctx.lineWidth   = 1.5;
                ctx.stroke();
            }
        });
    }

    return canvas;
}

interface GlobeMapProps { height?: number; }

const MIN_Z = 1.1;
const MAX_Z = 5.0;

export default function GlobeMap({ height = 620 }: GlobeMapProps) {
    const mountRef      = useRef<HTMLDivElement>(null);
    const cameraRef     = useRef<THREE.PerspectiveCamera | null>(null);
    const globeRef      = useRef<THREE.Group | null>(null);
    const frameRef      = useRef<number>(0);
    const pinMeshes     = useRef<{ mesh: THREE.Mesh; name: string }[]>([]);
    const isDragging    = useRef(false);
    const prevMouse     = useRef({ x: 0, y: 0 });
    const velocity      = useRef({ x: 0, y: 0 });
    const prevPinchDist = useRef<number | null>(null);

    const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
    const [loaded,  setLoaded]  = useState(false);

    const zoomCamera = (delta: number) => {
        const cam = cameraRef.current;
        if (!cam) return;
        cam.position.z = Math.min(MAX_Z, Math.max(MIN_Z, cam.position.z + delta));
    };

    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;
        const W = container.clientWidth || 800;
        const H = height;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.z = 1.4;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Globe group — rotate to face India
        // Three.js sphere: lon=0 at z- (back). To bring lon=80 to z+ (front):
        const globeGroup = new THREE.Group();
        globeGroup.rotation.y = -(INDIA_LON + 90) * (Math.PI / 180);
        globeGroup.rotation.x = 0.35; // tilt globe forward to bring India down to center
        scene.add(globeGroup);
        globeRef.current = globeGroup;

        // Atmosphere
        globeGroup.add(new THREE.Mesh(
            new THREE.SphereGeometry(1.055, 64, 64),
            new THREE.MeshPhongMaterial({ color: 0x0039A6, transparent: true, opacity: 0.06 })
        ));

        // Rim
        globeGroup.add(new THREE.Mesh(
            new THREE.SphereGeometry(1.04, 64, 64),
            new THREE.ShaderMaterial({
                vertexShader:   `varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
                fragmentShader: `varying vec3 vN; void main(){ float i=pow(0.6-dot(vN,vec3(0,0,1)),3.); gl_FragColor=vec4(0.,0.22,0.65,1.)*i; }`,
                blending: THREE.AdditiveBlending, side: THREE.FrontSide, transparent: true,
            })
        ));

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const sun = new THREE.DirectionalLight(0xffffff, 1.0);
        sun.position.set(4, 3, 5);
        scene.add(sun);

        buildGlobeTexture(8192).then(texCanvas => {
            const tex = new THREE.CanvasTexture(texCanvas);
            tex.needsUpdate = true;
            globeGroup.add(new THREE.Mesh(
                new THREE.SphereGeometry(1, 128, 128),
                new THREE.MeshPhongMaterial({ map: tex, specular: new THREE.Color(0x0a1040), shininess: 5 })
            ));

            // Pins — use ORIGINAL lon/lat (no adjustment needed now)
            const pins: { mesh: THREE.Mesh; name: string }[] = [];
            LOCATIONS.forEach(loc => {
                const pos   = latLonToVec3(loc.lat, loc.lon, 1.022);
                const isHQ  = loc.type === 'hq';
                const color = isHQ ? 0x0055ff : 0xCC5D29;

                const ring = new THREE.Mesh(
                    new THREE.RingGeometry(0.016, 0.028, 24),
                    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
                );
                ring.position.copy(pos);
                ring.lookAt(pos.clone().multiplyScalar(2));
                globeGroup.add(ring);

                const dot = new THREE.Mesh(
                    new THREE.SphereGeometry(isHQ ? 0.016 : 0.011, 12, 12),
                    new THREE.MeshBasicMaterial({ color })
                );
                dot.position.copy(pos);
                globeGroup.add(dot);
                pins.push({ mesh: dot, name: loc.name });
            });
            pinMeshes.current = pins;
            setLoaded(true);
        });

        const onResize = () => {
            const w = container.clientWidth;
            camera.aspect = w / H;
            camera.updateProjectionMatrix();
            renderer.setSize(w, H);
        };
        window.addEventListener('resize', onResize);

        const onMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            prevMouse.current  = { x: e.clientX, y: e.clientY };
            velocity.current   = { x: 0, y: 0 };
            container.style.cursor = 'grabbing';
        };
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || !globeRef.current) return;
            const dx = e.clientX - prevMouse.current.x;
            const dy = e.clientY - prevMouse.current.y;
            velocity.current = { x: dy * 0.004, y: dx * 0.004 };
            globeRef.current.rotation.x += dy * 0.004;
            globeRef.current.rotation.y += dx * 0.004;
            prevMouse.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseUp = () => {
            isDragging.current = false;
            container.style.cursor = 'grab';
        };
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            zoomCamera(e.deltaY * 0.002);
        };
        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                isDragging.current = true;
                prevMouse.current  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                velocity.current   = { x: 0, y: 0 };
            } else if (e.touches.length === 2) {
                isDragging.current = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                prevPinchDist.current = Math.sqrt(dx * dx + dy * dy);
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1 && isDragging.current && globeRef.current) {
                const dx = e.touches[0].clientX - prevMouse.current.x;
                const dy = e.touches[0].clientY - prevMouse.current.y;
                velocity.current = { x: dy * 0.004, y: dx * 0.004 };
                globeRef.current.rotation.x += dy * 0.004;
                globeRef.current.rotation.y += dx * 0.004;
                prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2 && prevPinchDist.current !== null) {
                const dx   = e.touches[0].clientX - e.touches[1].clientX;
                const dy   = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                zoomCamera((prevPinchDist.current - dist) * 0.01);
                prevPinchDist.current = dist;
            }
        };
        const onTouchEnd = () => {
            isDragging.current    = false;
            prevPinchDist.current = null;
        };

        const raycaster = new THREE.Raycaster();
        const mouse2    = new THREE.Vector2();
        const onHover   = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse2.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
            mouse2.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse2, camera);
            const hits = raycaster.intersectObjects(pinMeshes.current.map(p => p.mesh));
            if (hits.length > 0) {
                const found = pinMeshes.current.find(p => p.mesh === hits[0].object);
                if (found) setTooltip({ name: found.name, x: e.clientX - rect.left, y: e.clientY - rect.top });
            } else {
                setTooltip(null);
            }
        };

        container.addEventListener('mousedown',  onMouseDown);
        window.addEventListener('mousemove',     onMouseMove);
        window.addEventListener('mouseup',       onMouseUp);
        container.addEventListener('mousemove',  onHover);
        container.addEventListener('wheel',      onWheel, { passive: false });
        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchmove',  onTouchMove,  { passive: true });
        container.addEventListener('touchend',   onTouchEnd);
        container.style.cursor = 'grab';

        let t = 0;
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            t += 0.016;
            const g = globeRef.current;
            if (g && !isDragging.current) {
                g.rotation.x += velocity.current.x;
                g.rotation.y += velocity.current.y;
                velocity.current.x *= 0.88;
                velocity.current.y *= 0.88;
            }
            pinMeshes.current.forEach(({ mesh }, i) => {
                mesh.scale.setScalar(1 + Math.sin(t * 2.5 + i * 1.1) * 0.28);
            });
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize',    onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup',   onMouseUp);
            container.removeEventListener('mousedown',  onMouseDown);
            container.removeEventListener('mousemove',  onHover);
            container.removeEventListener('wheel',      onWheel);
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove',  onTouchMove);
            container.removeEventListener('touchend',   onTouchEnd);
            renderer.dispose();
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        };
    }, [height]);

    return (
        <div style={{ position: 'relative', width: '100%', background: '#fff', overflow: 'hidden' }}>
            {!loaded && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#fff', flexDirection: 'column', gap: '1rem',
                    height: `${height}px`,
                }}>
                    <div style={{
                        width: '40px', height: '40px',
                        border: '2px solid rgba(0,57,166,0.15)',
                        borderTop: '2px solid #0039A6',
                        borderRadius: '50%',
                        animation: 'globeSpin 1s linear infinite',
                    }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '3px' }}>
                        LOADING GLOBE...
                    </span>
                </div>
            )}

            {/* Zoom buttons */}
            <div style={{
                position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
                {[{ label: '+', delta: -0.25 }, { label: '−', delta: 0.25 }].map(btn => (
                    <button key={btn.label} onClick={() => zoomCamera(btn.delta)} style={{
                        width: '36px', height: '36px', background: '#fff',
                        border: '1px solid rgba(0,57,166,0.2)', color: 'var(--accent-primary)',
                        fontSize: '1.2rem', fontWeight: '700', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        lineHeight: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        transition: 'background 0.2s ease',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f0f4ff')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >{btn.label}</button>
                ))}
            </div>

            {/* HUD corners */}
            {([
                { top: '1rem',    left: '1rem',  bt: true,  bl: true  },
                { top: '1rem',    right: '1rem', bt: true,  br: true  },
                { bottom: '1rem', left: '1rem',  bb: true,  bl: true  },
                { bottom: '1rem', right: '1rem', bb: true,  br: true  },
            ] as any[]).map((c, i) => (
                <div key={i} style={{
                    position: 'absolute', zIndex: 10, pointerEvents: 'none',
                    top: c.top, left: c.left, bottom: c.bottom, right: c.right,
                    width: '20px', height: '20px',
                    borderTop:    c.bt ? '2px solid rgba(0,57,166,0.2)' : 'none',
                    borderBottom: c.bb ? '2px solid rgba(0,57,166,0.2)' : 'none',
                    borderLeft:   c.bl ? '2px solid rgba(0,57,166,0.2)' : 'none',
                    borderRight:  c.br ? '2px solid rgba(0,57,166,0.2)' : 'none',
                }} />
            ))}

            <div ref={mountRef} style={{ width: '100%', height: `${height}px` }} />

            {tooltip && (
                <div style={{
                    position: 'absolute', left: tooltip.x + 16, top: tooltip.y - 14,
                    zIndex: 30, pointerEvents: 'none',
                    background: 'rgba(0,0,0,0.88)', border: '1px solid rgba(0,57,166,0.6)',
                    padding: '0.4rem 0.9rem',
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#fff', fontWeight: '700', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                        {tooltip.name.toUpperCase()}
                    </span>
                </div>
            )}

            <style jsx>{`
                @keyframes globeSpin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
