import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Zap, Sliders, ArrowRight } from 'lucide-react';

interface Transformer3DProps {
  initialV1?: number;
  initialN1?: number;
  initialN2?: number;
}

export const Transformer3D: React.FC<Transformer3DProps> = ({
  initialV1 = 230,
  initialN1 = 500,
  initialN2 = 50,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [v1, setV1] = useState(initialV1);
  const [n1, setN1] = useState(initialN1);
  const [n2, setN2] = useState(initialN2);
  const [isPaused, setIsPaused] = useState(false);

  // Computed values
  const turnsRatioK = n2 / n1;
  const v2 = v1 * turnsRatioK;
  const isStepDown = v2 < v1;

  // Assume a 20 A primary full load
  const i1 = 5.0;
  const i2 = turnsRatioK > 0 ? i1 / turnsRatioK : 0;

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const fluxParticlesRef = useRef<THREE.Points | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Synchronize mutable states to refs for 60fps loop
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    setV1(initialV1);
  }, [initialV1]);

  useEffect(() => {
    setN1(initialN1);
  }, [initialN1]);

  useEffect(() => {
    setN2(initialN2);
  }, [initialN2]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfcfbf7); // Warm light

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 11);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 22;
    controlsRef.current = controls;

    // Warm Studio Lighting
    scene.add(new THREE.AmbientLight(0xfff7ed, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    // Floor Grid
    const grid = new THREE.GridHelper(16, 16, 0xd5cbba, 0xe8e0d0);
    grid.position.y = -2.5;
    scene.add(grid);

    const transformerGroup = new THREE.Group();
    scene.add(transformerGroup);

    // --- Build 3D Transformer Laminated Silicon Steel Core ---
    // Outer core frame: 6.0 wide, 5.0 high, 1.2 thick. Window: 3.2 wide, 2.6 high
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x64748b, // Laminated slate steel
      roughness: 0.4,
      metalness: 0.6,
    });

    const createCoreLimb = (w: number, h: number, d: number, pos: [number, number, number]) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, coreMat);
      mesh.position.set(...pos);
      mesh.castShadow = true;
      transformerGroup.add(mesh);
    };

    // Left limb (Primary)
    createCoreLimb(1.2, 4.4, 1.2, [-2.2, 0, 0]);
    // Right limb (Secondary)
    createCoreLimb(1.2, 4.4, 1.2, [2.2, 0, 0]);
    // Top yoke
    createCoreLimb(5.6, 1.0, 1.2, [0, 2.2, 0]);
    // Bottom yoke
    createCoreLimb(5.6, 1.0, 1.2, [0, -2.2, 0]);

    // --- Primary Winding (Copper Coils on Left Limb) ---
    const primaryCoilGroup = new THREE.Group();
    primaryCoilGroup.position.set(-2.2, 0, 0);

    const priWireMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Primary Copper Gold
      metalness: 0.85,
      roughness: 0.25,
    });

    const turnsCountPri = 14;
    for (let i = 0; i < turnsCountPri; i++) {
      const y = -1.3 + (i / turnsCountPri) * 2.6;
      const turnGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 32);
      const turnMesh = new THREE.Mesh(turnGeo, priWireMat);
      turnMesh.rotation.x = Math.PI / 2;
      turnMesh.position.y = y;
      primaryCoilGroup.add(turnMesh);
    }
    transformerGroup.add(primaryCoilGroup);

    // --- Secondary Winding (Copper Coils on Right Limb) ---
    const secondaryCoilGroup = new THREE.Group();
    secondaryCoilGroup.position.set(2.2, 0, 0);

    const secWireMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Secondary Electric Blue
      metalness: 0.85,
      roughness: 0.25,
    });

    const turnsCountSec = 8;
    for (let i = 0; i < turnsCountSec; i++) {
      const y = -1.0 + (i / turnsCountSec) * 2.0;
      const turnGeo = new THREE.TorusGeometry(0.9, 0.12, 16, 32);
      const turnMesh = new THREE.Mesh(turnGeo, secWireMat);
      turnMesh.rotation.x = Math.PI / 2;
      turnMesh.position.y = y;
      secondaryCoilGroup.add(turnMesh);
    }
    transformerGroup.add(secondaryCoilGroup);

    // --- Animated Magnetic Flux Loops Circulating Through Core ---
    const fluxPointsCount = 80;
    const fluxPositions = new Float32Array(fluxPointsCount * 3);
    const fluxProgress = new Float32Array(fluxPointsCount);

    // Core loop path: left (-2.2) -> top (2.2) -> right (2.2) -> bottom (-2.2)
    const fluxCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, -1.8, 0),
      new THREE.Vector3(-2.2, 1.8, 0),
      new THREE.Vector3(2.2, 1.8, 0),
      new THREE.Vector3(2.2, -1.8, 0),
    ], true);

    for (let i = 0; i < fluxPointsCount; i++) {
      fluxProgress[i] = i / fluxPointsCount;
      const pt = fluxCurve.getPoint(fluxProgress[i]);
      fluxPositions[i * 3] = pt.x;
      fluxPositions[i * 3 + 1] = pt.y;
      fluxPositions[i * 3 + 2] = pt.z;
    }

    const fluxGeo = new THREE.BufferGeometry();
    fluxGeo.setAttribute('position', new THREE.BufferAttribute(fluxPositions, 3));
    const fluxMat = new THREE.PointsMaterial({
      color: 0x10b981, // Glowing emerald magnetic flux
      size: 0.35,
      transparent: true,
      opacity: 0.9,
    });

    const fluxPoints = new THREE.Points(fluxGeo, fluxMat);
    transformerGroup.add(fluxPoints);
    fluxParticlesRef.current = fluxPoints;

    // Resize handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastT = performance.now();
    const animate = (t: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const dt = (t - lastT) / 1000;
      lastT = t;

      controls.update();

      if (fluxParticlesRef.current && !isPausedRef.current) {
        const pos = fluxParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < fluxPointsCount; i++) {
          fluxProgress[i] = (fluxProgress[i] + 0.25 * dt) % 1;
          const pt = fluxCurve.getPoint(fluxProgress[i]);
          pos[i * 3] = pt.x;
          pos[i * 3 + 1] = pt.y;
          pos[i * 3 + 2] = pt.z;
        }
        fluxParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-4">
      {/* 3D Canvas */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-amber-100 bg-radial from-white to-amber-50/40">
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

        {/* Live HUD Readouts */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <div className="rounded-lg border border-amber-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Primary V1 (N1={n1})</span>
            <span className="font-mono-math text-sm font-bold text-amber-700">{v1} V</span>
          </div>
          <div className="rounded-lg border border-sky-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-sky-800 uppercase block">Secondary V2 (N2={n2})</span>
            <span className="font-mono-math text-sm font-bold text-sky-700">{v2.toFixed(1)} V</span>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Turns Ratio (K)</span>
            <span className="font-mono-math text-sm font-bold text-emerald-700">{turnsRatioK.toFixed(3)}</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-3 right-3 rounded-full border border-stone-200 bg-white/95 px-3.5 py-1 text-xs font-bold shadow-sm backdrop-blur">
          {isStepDown ? (
            <span className="text-sky-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Step-Down Mode (Voltage Decreases, Current Increases)
            </span>
          ) : (
            <span className="text-amber-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Step-Up Mode (Voltage Increases, Current Decreases)
            </span>
          )}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* V1 Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>Primary Voltage (V1)</span>
            <span className="font-mono-math text-amber-700">{v1} V</span>
          </div>
          <input
            type="range"
            min="50"
            max="400"
            step="10"
            value={v1}
            onChange={(e) => setV1(parseInt(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>50 V</span>
            <span>230 V</span>
            <span>400 V</span>
          </div>
        </div>

        {/* N1 Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>Primary Turns (N1)</span>
            <span className="font-mono-math text-amber-800">{n1}</span>
          </div>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={n1}
            onChange={(e) => setN1(parseInt(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>100</span>
            <span>500</span>
            <span>1000</span>
          </div>
        </div>

        {/* N2 Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>Secondary Turns (N2)</span>
            <span className="font-mono-math text-sky-700">{n2}</span>
          </div>
          <input
            type="range"
            min="20"
            max="800"
            step="20"
            value={n2}
            onChange={(e) => setN2(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>20</span>
            <span>50 (Step-Down)</span>
            <span>800 (Step-Up)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
