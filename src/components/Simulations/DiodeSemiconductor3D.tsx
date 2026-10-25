import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Sliders, Zap } from 'lucide-react';

interface DiodeSemiconductor3DProps {
  initialBias?: number;
}

export const DiodeSemiconductor3D: React.FC<DiodeSemiconductor3DProps> = ({
  initialBias = 0.75,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [biasVoltage, setBiasVoltage] = useState(initialBias);
  const [isPaused, setIsPaused] = useState(false);

  // Computed Diode physical parameters
  const isForward = biasVoltage > 0;
  const isConduction = biasVoltage >= 0.65;
  // Depletion width decreases under forward bias, expands under reverse bias
  const depletionWidth = Math.max(0.1, Math.min(2.8, 1.2 - biasVoltage * 0.8));

  // Shockley approximation for current display
  const currentMa = biasVoltage <= 0 ? 0.00001 : (biasVoltage < 0.6 ? 0.1 : Math.exp((biasVoltage - 0.6) * 15) * 5);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const depletionMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Synchronize mutable states to refs for 60fps loop
  const isPausedRef = useRef(isPaused);
  const depletionWidthRef = useRef(depletionWidth);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    depletionWidthRef.current = depletionWidth;
  }, [depletionWidth]);

  useEffect(() => {
    setBiasVoltage(initialBias);
  }, [initialBias]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfcfbf7); // Warm light

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 10);
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

    scene.add(new THREE.AmbientLight(0xfff7ed, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(14, 14, 0xd5cbba, 0xe8e0d0);
    grid.position.y = -2.2;
    scene.add(grid);

    const pnGroup = new THREE.Group();
    scene.add(pnGroup);

    // P-Type Region (Left block, ruby/rose hue for majority holes)
    const pBlockGeo = new THREE.BoxGeometry(3.0, 2.2, 2.0);
    const pBlockMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48, // Rose Red
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const pBlock = new THREE.Mesh(pBlockGeo, pBlockMat);
    pBlock.position.set(-2.2, 0, 0);
    pnGroup.add(pBlock);

    // N-Type Region (Right block, electric blue hue for majority electrons)
    const nBlockGeo = new THREE.BoxGeometry(3.0, 2.2, 2.0);
    const nBlockMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Sky Blue
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const nBlock = new THREE.Mesh(nBlockGeo, nBlockMat);
    nBlock.position.set(2.2, 0, 0);
    pnGroup.add(nBlock);

    // Central Depletion Region (Insulating gray / barrier layer)
    const depGeo = new THREE.BoxGeometry(1.2, 2.24, 2.04);
    const depMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Amber barrier zone
      roughness: 0.5,
      metalness: 0.1,
      transparent: true,
      opacity: 0.5,
    });
    const depMesh = new THREE.Mesh(depGeo, depMat);
    depMesh.position.set(0, 0, 0);
    pnGroup.add(depMesh);
    depletionMeshRef.current = depMesh;

    // Metal Anode Terminal (+)
    const termMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const anode = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8), termMat);
    anode.rotation.z = Math.PI / 2;
    anode.position.set(-4.5, 0, 0);
    pnGroup.add(anode);

    // Metal Cathode Terminal (-)
    const cathode = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8), termMat);
    cathode.rotation.z = Math.PI / 2;
    cathode.position.set(4.5, 0, 0);
    pnGroup.add(cathode);

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

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();

      if (depletionMeshRef.current) {
        depletionMeshRef.current.scale.x = depletionWidthRef.current;
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
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Bias Voltage</span>
            <span className="font-mono-math text-sm font-bold text-amber-700">{biasVoltage.toFixed(2)} V</span>
          </div>
          <div className="rounded-lg border border-sky-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-sky-800 uppercase block">State</span>
            <span className="font-bold text-sm text-stone-900">
              {biasVoltage < 0 ? 'Reverse Bias (Blocking)' : isConduction ? 'Forward Conduction (ON)' : 'Forward Sub-threshold (OFF)'}
            </span>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Diode Current</span>
            <span className="font-mono-math text-sm font-bold text-emerald-700">
              {currentMa < 1 ? `${(currentMa * 1000).toFixed(1)} µA` : `${currentMa.toFixed(1)} mA`}
            </span>
          </div>
        </div>

        {/* Top-Right Simulation Controls */}
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
                cameraRef.current.position.set(0, 4, 10);
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

        {/* Status Indicator */}
        <div className="absolute bottom-3 right-3 rounded-full border border-stone-200 bg-white/95 px-3.5 py-1 text-xs font-bold shadow-sm backdrop-blur">
          {isConduction ? (
            <span className="text-emerald-700 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Depletion Barrier Collapsed (0.7 V exceeded)
            </span>
          ) : (
            <span className="text-rose-700 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Depletion Barrier Intact (Current Blocked)
            </span>
          )}
        </div>
      </div>

      {/* Bias Voltage Slider */}
      <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
        <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
          <span>Applied Bias Voltage Across Diode Terminals (Anode to Cathode)</span>
          <span className="font-mono-math text-amber-800 font-bold">{biasVoltage.toFixed(2)} V</span>
        </div>
        <input
          type="range"
          min="-5.0"
          max="1.2"
          step="0.05"
          value={biasVoltage}
          onChange={(e) => setBiasVoltage(parseFloat(e.target.value))}
          className="w-full accent-amber-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400">
          <span>-5.0 V (Deep Reverse)</span>
          <span>0 V (Zero Bias)</span>
          <span>0.7 V (Silicon Knee)</span>
          <span>+1.2 V (Heavy Conduction)</span>
        </div>
      </div>
    </div>
  );
};
