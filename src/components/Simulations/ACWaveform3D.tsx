import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Zap, Sliders, Activity } from 'lucide-react';

interface ACWaveform3DProps {
  initialFrequency?: number;
  initialVoltage?: number;
}

export const ACWaveform3D: React.FC<ACWaveform3DProps> = ({
  initialFrequency = 50,
  initialVoltage = 230,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [rmsVoltage, setRmsVoltage] = useState(initialVoltage);
  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState<'phasor' | 'rlc-resonance'>('phasor');

  // RLC parameters for resonance sandbox
  const [rVal, setRVal] = useState(30);
  const [lVal, setLVal] = useState(0.1); // Henry
  const [cVal, setCVal] = useState(20); // microFarad

  // Computed values
  const peakVoltage = rmsVoltage * Math.SQRT2;
  const timePeriod = 1 / frequency;
  const omega = 2 * Math.PI * frequency;

  // Resonance calculations
  const cFarad = cVal * 1e-6;
  const fr = 1 / (2 * Math.PI * Math.sqrt(lVal * cFarad));
  const xl = 2 * Math.PI * frequency * lVal;
  const xc = 1 / (2 * Math.PI * frequency * cFarad);
  const impedanceZ = Math.sqrt(rVal * rVal + Math.pow(xl - xc, 2));
  const currentI = rmsVoltage / impedanceZ;
  const powerFactor = rVal / impedanceZ;

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const phasorArrowRef = useRef<THREE.ArrowHelper | null>(null);
  const sineCurveLineRef = useRef<THREE.Line | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Synchronize mutable states to refs for 60fps loop
  const isPausedRef = useRef(isPaused);
  const frequencyRef = useRef(frequency);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    frequencyRef.current = frequency;
  }, [frequency]);

  useEffect(() => {
    setFrequency(initialFrequency);
  }, [initialFrequency]);

  useEffect(() => {
    setRmsVoltage(initialVoltage);
  }, [initialVoltage]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfcfbf7); // Warm light

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
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
    controls.maxDistance = 25;
    controlsRef.current = controls;

    // Ambient & Directional Warm Light
    scene.add(new THREE.AmbientLight(0xfff7ed, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.5);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    // Warm reference floor grid
    const grid = new THREE.GridHelper(16, 16, 0xd5cbba, 0xe8e0d0);
    grid.position.y = -2.5;
    scene.add(grid);

    // Group for 3D Phasor & Sine Waveform
    const waveformGroup = new THREE.Group();
    scene.add(waveformGroup);

    // 1. Phasor Circle on the left (at x = -4.5)
    const circleRadius = 2.0;
    const circleGeo = new THREE.RingGeometry(circleRadius - 0.03, circleRadius + 0.03, 64);
    const circleMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, side: THREE.DoubleSide });
    const circleMesh = new THREE.Mesh(circleGeo, circleMat);
    circleMesh.position.set(-4.5, 0, 0);
    waveformGroup.add(circleMesh);

    // Phasor Center Point
    const centerPoint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xd97706 }));
    centerPoint.position.set(-4.5, 0, 0);
    waveformGroup.add(centerPoint);

    // Rotating Phasor Arrow
    const phasorDir = new THREE.Vector3(1, 0, 0);
    const phasorArrow = new THREE.ArrowHelper(phasorDir, new THREE.Vector3(-4.5, 0, 0), circleRadius, 0xd97706, 0.4, 0.2);
    waveformGroup.add(phasorArrow);
    phasorArrowRef.current = phasorArrow;

    // Connecting dashed line from phasor tip to time-axis origin
    const dashLineMat = new THREE.LineDashedMaterial({ color: 0x0284c7, dashSize: 0.2, gapSize: 0.1 });
    const dashLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5 + circleRadius, 0, 0),
      new THREE.Vector3(-2.0, 0, 0),
    ]);
    const dashLine = new THREE.Line(dashLineGeo, dashLineMat);
    dashLine.computeLineDistances();
    waveformGroup.add(dashLine);

    // 2. Sinusoidal Waveform Ribbon along X-axis
    const wavePointsCount = 200;
    const wavePoints: THREE.Vector3[] = [];
    for (let i = 0; i < wavePointsCount; i++) {
      const x = -2.0 + (i / wavePointsCount) * 7.5;
      const angle = (i / wavePointsCount) * 4 * Math.PI;
      const y = circleRadius * Math.sin(angle);
      wavePoints.push(new THREE.Vector3(x, y, 0));
    }

    const waveCurveGeo = new THREE.BufferGeometry().setFromPoints(wavePoints);
    const waveCurveMat = new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 3 });
    const waveLine = new THREE.Line(waveCurveGeo, waveCurveMat);
    waveformGroup.add(waveLine);
    sineCurveLineRef.current = waveLine;

    // Time Axis
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.0, 0, 0),
      new THREE.Vector3(5.8, 0, 0),
    ]);
    const axisLine = new THREE.Line(axisGeo, new THREE.LineBasicMaterial({ color: 0x64748b }));
    waveformGroup.add(axisLine);

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
    let phase = 0;
    let lastT = performance.now();

    const animate = (t: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const dt = (t - lastT) / 1000;
      lastT = t;

      controls.update();

      if (!isPausedRef.current) {
        // Rotate phasor with angular velocity
        phase += dt * (frequencyRef.current * 0.08); // Scaled for smooth visual tracking
        const angle = phase % (2 * Math.PI);

        if (phasorArrowRef.current) {
          const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize();
          phasorArrowRef.current.setDirection(dir);
        }

        // Shift wave curve points
        if (sineCurveLineRef.current) {
          const positions = sineCurveLineRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < wavePointsCount; i++) {
            const waveAngle = angle - (i / wavePointsCount) * 4 * Math.PI;
            positions[i * 3 + 1] = circleRadius * Math.sin(waveAngle);
          }
          sineCurveLineRef.current.geometry.attributes.position.needsUpdate = true;
        }
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
      {/* 3D Canvas Container */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-amber-100 bg-radial from-white to-amber-50/40">
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

        {/* Live HUD Readouts */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <div className="rounded-lg border border-sky-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-sky-800 uppercase block">Frequency (f)</span>
            <span className="font-mono-math text-sm font-bold text-sky-700">{frequency} Hz</span>
          </div>
          <div className="rounded-lg border border-amber-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">RMS Voltage</span>
            <span className="font-mono-math text-sm font-bold text-amber-700">{rmsVoltage} V</span>
          </div>
          <div className="rounded-lg border border-purple-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-purple-800 uppercase block">Peak Voltage (Vm)</span>
            <span className="font-mono-math text-sm font-bold text-purple-700">{peakVoltage.toFixed(1)} V</span>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Period T = 1/f</span>
            <span className="font-mono-math text-sm font-bold text-emerald-700">{(timePeriod * 1000).toFixed(1)} ms</span>
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
                cameraRef.current.position.set(0, 5, 12);
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

      {/* Sliders & Sandbox Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Frequency Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>Mains AC Frequency (f)</span>
            <span className="font-mono-math text-sky-700">{frequency} Hz</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>10 Hz</span>
            <span>50 Hz (India/EU)</span>
            <span>100 Hz</span>
          </div>
        </div>

        {/* Voltage Amplitude Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>RMS Voltage Level</span>
            <span className="font-mono-math text-amber-700">{rmsVoltage} V</span>
          </div>
          <input
            type="range"
            min="50"
            max="300"
            step="5"
            value={rmsVoltage}
            onChange={(e) => setRmsVoltage(parseInt(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400">
            <span>110 V (US)</span>
            <span>230 V (Mains)</span>
            <span>300 V</span>
          </div>
        </div>
      </div>
    </div>
  );
};
