import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Cpu, Layers } from 'lucide-react';

interface Machine3DProps {
  initialType?: 'dc-motor' | 'induction-motor';
}

export const Machine3D: React.FC<Machine3DProps> = ({
  initialType = 'dc-motor',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [machineType, setMachineType] = useState<'dc-motor' | 'induction-motor'>(initialType);
  const [speedRpm, setSpeedRpm] = useState(1440);
  const [isPaused, setIsPaused] = useState(false);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rotorMeshRef = useRef<THREE.Group | null>(null);
  const rmfMeshRef = useRef<THREE.Group | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Synchronize mutable values to refs for 60fps loop
  const isPausedRef = useRef(isPaused);
  const speedRpmRef = useRef(speedRpm);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    speedRpmRef.current = speedRpm;
  }, [speedRpm]);

  useEffect(() => {
    setMachineType(initialType);
  }, [initialType]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfcfbf7); // Warm light

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 9);
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
    controlsRef.current = controls;

    // Lighting
    scene.add(new THREE.AmbientLight(0xfff7ed, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(14, 14, 0xd5cbba, 0xe8e0d0);
    grid.position.y = -2.2;
    scene.add(grid);

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // Stator Outer Yoke Frame (Cast Iron / Steel)
    const statorYokeGeo = new THREE.CylinderGeometry(2.6, 2.6, 3.2, 32, 1, true);
    const statorYokeMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Cast steel slate
      roughness: 0.5,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });
    const statorYoke = new THREE.Mesh(statorYokeGeo, statorYokeMat);
    statorYoke.rotation.x = Math.PI / 2;
    machineGroup.add(statorYoke);

    // Stator Pole Shoes (North & South Poles)
    const poleMatNorth = new THREE.MeshStandardMaterial({ color: 0xdc2626 }); // Red (North)
    const poleMatSouth = new THREE.MeshStandardMaterial({ color: 0x0284c7 }); // Blue (South)

    const poleGeo = new THREE.BoxGeometry(0.8, 1.2, 2.6);
    const poleNorth = new THREE.Mesh(poleGeo, poleMatNorth);
    poleNorth.position.set(0, 1.9, 0);
    const poleSouth = new THREE.Mesh(poleGeo, poleMatSouth);
    poleSouth.position.set(0, -1.9, 0);
    machineGroup.add(poleNorth, poleSouth);

    // Inner Rotating Rotor / Armature
    const rotorGroup = new THREE.Group();
    machineGroup.add(rotorGroup);
    rotorMeshRef.current = rotorGroup;

    // Central Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.25, 0.25, 4.4, 24);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.rotation.x = Math.PI / 2;
    rotorGroup.add(shaft);

    // Armature Core / Squirrel Cage Rotor
    const coreCylinderGeo = new THREE.CylinderGeometry(1.4, 1.4, 2.4, 32);
    const coreCylinderMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 });
    const coreCylinder = new THREE.Mesh(coreCylinderGeo, coreCylinderMat);
    coreCylinder.rotation.x = Math.PI / 2;
    rotorGroup.add(coreCylinder);

    // Copper Rotor Bars / Armature Coils
    const barMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.3 });
    const barsCount = 16;
    for (let i = 0; i < barsCount; i++) {
      const angle = (i / barsCount) * Math.PI * 2;
      const x = 1.35 * Math.cos(angle);
      const y = 1.35 * Math.sin(angle);
      const barGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.45, 12);
      const barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.rotation.x = Math.PI / 2;
      barMesh.position.set(x, y, 0);
      rotorGroup.add(barMesh);
    }

    // Commutator segments (for DC motor)
    const commutatorGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.7, 24);
    const commutatorMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.85, roughness: 0.25 });
    const commutator = new THREE.Mesh(commutatorGeo, commutatorMat);
    commutator.rotation.x = Math.PI / 2;
    commutator.position.z = 1.6;
    rotorGroup.add(commutator);

    // Carbon Brushes (Stationary on yoke)
    const brushMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), brushMat);
    b1.position.set(0.8, 0, 1.6);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), brushMat);
    b2.position.set(-0.8, 0, 1.6);
    machineGroup.add(b1, b2);

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

      if (rotorMeshRef.current && !isPausedRef.current) {
        // Rotate shaft in radians/sec: speedRpm * 2π / 60
        const radPerSec = (speedRpmRef.current * 2 * Math.PI) / 60;
        rotorMeshRef.current.rotation.z -= radPerSec * 0.15 * dt; // visual scaling
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
  }, [machineType]);

  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-4">
      {/* 3D Canvas */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-amber-100 bg-radial from-white to-amber-50/40">
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

        {/* Live HUD Readouts */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <div className="rounded-lg border border-amber-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Machine Mode</span>
            <span className="font-bold text-sm text-stone-900">
              {machineType === 'dc-motor' ? 'DC Machine (Commutator + Brushes)' : '3-Phase Induction Motor'}
            </span>
          </div>
          <div className="rounded-lg border border-sky-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-sky-800 uppercase block">Rotor Speed</span>
            <span className="font-mono-math text-sm font-bold text-sky-700">{speedRpm} RPM</span>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white/95 p-1 shadow-sm backdrop-blur">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume' : 'Pause'}
            className="rounded p-1 text-stone-700 hover:bg-amber-100 transition-colors"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button
            onClick={() => {
              if (cameraRef.current && controlsRef.current) {
                cameraRef.current.position.set(0, 4, 9);
                controlsRef.current.target.set(0, 0, 0);
                controlsRef.current.update();
              }
            }}
            title="Reset Camera"
            className="rounded p-1 text-stone-700 hover:bg-amber-100 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Controls & Mode Switch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Machine Mode Switcher */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-2">
          <div className="text-xs font-semibold text-stone-700">Select Machine Architecture:</div>
          <div className="flex gap-2">
            <button
              onClick={() => { setMachineType('dc-motor'); setSpeedRpm(1200); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                machineType === 'dc-motor' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-700'
              }`}
            >
              DC Motor / Generator
            </button>
            <button
              onClick={() => { setMachineType('induction-motor'); setSpeedRpm(1440); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                machineType === 'induction-motor' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-700'
              }`}
            >
              3-Phase Induction Motor
            </button>
          </div>
        </div>

        {/* Speed Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>Shaft Rotational Speed</span>
            <span className="font-mono-math text-sky-700">{speedRpm} RPM</span>
          </div>
          <input
            type="range"
            min="300"
            max="3000"
            step="50"
            value={speedRpm}
            onChange={(e) => setSpeedRpm(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>300 RPM</span>
            <span>1500 RPM (Sync)</span>
            <span>3000 RPM (2-Pole)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
