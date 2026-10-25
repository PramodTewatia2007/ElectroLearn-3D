import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Eye, Layers, Zap, Info, Maximize2 } from 'lucide-react';

interface Circuit3DViewerProps {
  initialVoltage?: number;
  initialResistance?: number;
  circuitType?: 'single' | 'series' | 'parallel';
  onValuesChange?: (v: number, r: number, i: number, p: number) => void;
}

export const Circuit3DViewer: React.FC<Circuit3DViewerProps> = ({
  initialVoltage = 12,
  initialResistance = 10,
  circuitType = 'single',
  onValuesChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [voltage, setVoltage] = useState(initialVoltage);
  const [resistance, setResistance] = useState(initialResistance);
  const [isSwitchClosed, setIsSwitchClosed] = useState(true);
  const [activeCircuitType, setActiveCircuitType] = useState<'single' | 'series' | 'parallel'>(circuitType);
  const [isPaused, setIsPaused] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [showElectrons, setShowElectrons] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Computed electrical parameters
  const current = isSwitchClosed ? (resistance > 0 ? voltage / resistance : 0) : 0;
  const power = voltage * current;

  // Synchronize when parent passes new initial props
  useEffect(() => {
    setVoltage(initialVoltage);
  }, [initialVoltage]);

  useEffect(() => {
    setResistance(initialResistance);
  }, [initialResistance]);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(voltage, resistance, current, power);
    }
  }, [voltage, resistance, current, power, onValuesChange]);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const bulbLightRef = useRef<THREE.PointLight | null>(null);
  const bulbMeshRef = useRef<THREE.Mesh | null>(null);
  const switchLeverRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const explodedGroupsRef = useRef<THREE.Group[]>([]);

  // Synchronize live mutable state to refs for the 60fps animation loop (prevents stale closure & canvas remounts)
  const isPausedRef = useRef(isPaused);
  const isSwitchClosedRef = useRef(isSwitchClosed);
  const currentRef = useRef(current);
  const powerRef = useRef(power);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isSwitchClosedRef.current = isSwitchClosed;
  }, [isSwitchClosed]);

  useEffect(() => {
    currentRef.current = current;
    powerRef.current = power;
  }, [current, power]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfcfbf7); // Warm light background

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 14);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera going under floor
    controls.minDistance = 4;
    controls.maxDistance = 25;
    controlsRef.current = controls;

    // 5. Lighting (Warm studio lighting)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2); // Warm daylight
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    dirLight.position.set(8, 15, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.6); // Subtle cool fill
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    // 6. Workbench / Floor Surface
    const floorGeo = new THREE.PlaneGeometry(24, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf3ede2, // Warm cream lab table
      roughness: 0.8,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid on floor for measurement reference
    const gridHelper = new THREE.GridHelper(20, 20, 0xd5cbba, 0xe8e0d0);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // --- Build 3D Circuit Elements ---
    const circuitGroup = new THREE.Group();
    scene.add(circuitGroup);

    // A. 3D Battery (Cylindrical with brass caps)
    const batteryGroup = new THREE.Group();
    batteryGroup.position.set(-4.5, 0.6, 0);
    batteryGroup.name = 'Battery (DC Voltage Source)';

    const batBodyGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.6, 32);
    const batBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vibrant electric blue
      roughness: 0.3,
      metalness: 0.4,
    });
    const batBody = new THREE.Mesh(batBodyGeo, batBodyMat);
    batBody.rotation.z = Math.PI / 2;
    batBody.castShadow = true;
    batteryGroup.add(batBody);

    // Positive terminal (+)
    const posCapGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 24);
    const posCapMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }); // Gold/Brass
    const posCap = new THREE.Mesh(posCapGeo, posCapMat);
    posCap.rotation.z = Math.PI / 2;
    posCap.position.x = 1.45;
    batteryGroup.add(posCap);

    // Negative terminal (-)
    const negCapGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.1, 24);
    const negCapMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const negCap = new THREE.Mesh(negCapGeo, negCapMat);
    negCap.rotation.z = Math.PI / 2;
    negCap.position.x = -1.35;
    batteryGroup.add(negCap);

    circuitGroup.add(batteryGroup);

    // B. 3D Knife Switch (Interactive toggle)
    const switchGroup = new THREE.Group();
    switchGroup.position.set(0, 0.2, -3.5);
    switchGroup.name = 'Knife Switch';

    const switchBaseGeo = new THREE.BoxGeometry(2.4, 0.2, 1.0);
    const switchBaseMat = new THREE.MeshStandardMaterial({ color: 0xd6c7b2, roughness: 0.6 });
    const switchBase = new THREE.Mesh(switchBaseGeo, switchBaseMat);
    switchBase.castShadow = true;
    switchGroup.add(switchBase);

    // Switch terminals
    const termMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8, roughness: 0.3 }); // Copper
    const term1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.5), termMat);
    term1.position.set(-0.8, 0.3, 0);
    const term2 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.5), termMat);
    term2.position.set(0.8, 0.3, 0);
    switchGroup.add(term1, term2);

    // Moving lever
    const leverGroup = new THREE.Group();
    leverGroup.position.set(-0.8, 0.4, 0);
    const leverBlade = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.2), termMat);
    leverBlade.position.x = 0.8;
    const leverHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.5), new THREE.MeshStandardMaterial({ color: 0x991b1b }));
    leverHandle.position.set(1.5, 0.25, 0);
    leverGroup.add(leverBlade, leverHandle);
    switchGroup.add(leverGroup);
    switchLeverRef.current = leverGroup;

    circuitGroup.add(switchGroup);

    // C. 3D Load (Incandescent Bulb & Ceramic Resistor)
    const loadGroup = new THREE.Group();
    loadGroup.position.set(4.5, 0.2, 0);
    loadGroup.name = 'Electrical Load (Resistor & Lamp)';

    // Ceramic socket base
    const socketGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.5, 32);
    const socketMat = new THREE.MeshStandardMaterial({ color: 0xe2d9cc, roughness: 0.7 });
    const socket = new THREE.Mesh(socketGeo, socketMat);
    socket.position.y = 0.25;
    socket.castShadow = true;
    loadGroup.add(socket);

    // Glass bulb
    const bulbGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.position.y = 1.1;
    loadGroup.add(bulbMesh);
    bulbMeshRef.current = bulbMesh;

    // Internal point light for bulb illumination
    const bulbLight = new THREE.PointLight(0xfbbf24, 2.5, 12);
    bulbLight.position.y = 1.1;
    loadGroup.add(bulbLight);
    bulbLightRef.current = bulbLight;

    // Resistor color code cylinder
    const resGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.4, 24);
    const resMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.5 }); // Carbon film beige
    const resMesh = new THREE.Mesh(resGeo, resMat);
    resMesh.position.set(0, 0.3, 1.8);
    resMesh.rotation.z = Math.PI / 2;
    loadGroup.add(resMesh);

    // Resistor color bands
    const bandMat1 = new THREE.MeshBasicMaterial({ color: 0x92400e }); // Brown (1)
    const bandMat2 = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black (0)
    const bandMat3 = new THREE.MeshBasicMaterial({ color: 0xb91c1c }); // Red (×100)
    const bandMat4 = new THREE.MeshBasicMaterial({ color: 0xd97706 }); // Gold (5%)
    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.1, 24), bandMat1);
    b1.rotation.z = Math.PI / 2;
    b1.position.set(-0.4, 0.3, 1.8);
    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.1, 24), bandMat2);
    b2.rotation.z = Math.PI / 2;
    b2.position.set(-0.15, 0.3, 1.8);
    const b3 = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.1, 24), bandMat3);
    b3.rotation.z = Math.PI / 2;
    b3.position.set(0.15, 0.3, 1.8);
    const b4 = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.08, 24), bandMat4);
    b4.rotation.z = Math.PI / 2;
    b4.position.set(0.45, 0.3, 1.8);
    loadGroup.add(b1, b2, b3, b4);

    circuitGroup.add(loadGroup);

    // D. 3D Connecting Copper Wires
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Pure polished copper
      metalness: 0.85,
      roughness: 0.25,
    });

    const createWire = (points: THREE.Vector3[]) => {
      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.1);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.08, 12, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, wireMat);
      tubeMesh.castShadow = true;
      return tubeMesh;
    };

    // Wire path 1: Battery (+) to Switch
    const wire1 = createWire([
      new THREE.Vector3(-3.0, 0.6, 0),
      new THREE.Vector3(-3.0, 0.2, -3.5),
      new THREE.Vector3(-0.8, 0.2, -3.5),
    ]);
    // Wire path 2: Switch to Load
    const wire2 = createWire([
      new THREE.Vector3(0.8, 0.2, -3.5),
      new THREE.Vector3(4.5, 0.2, -3.5),
      new THREE.Vector3(4.5, 0.3, -0.6),
    ]);
    // Wire path 3: Load to Battery (-)
    const wire3 = createWire([
      new THREE.Vector3(4.5, 0.3, 0.6),
      new THREE.Vector3(4.5, 0.2, 3.5),
      new THREE.Vector3(-4.5, 0.2, 3.5),
      new THREE.Vector3(-4.5, 0.6, 0.8),
      new THREE.Vector3(-5.8, 0.6, 0),
    ]);

    circuitGroup.add(wire1, wire2, wire3);

    // E. Animated Electron Particles drifting along wire loop
    const loopPoints: THREE.Vector3[] = [
      new THREE.Vector3(-3.0, 0.6, 0),
      new THREE.Vector3(-3.0, 0.25, -3.5),
      new THREE.Vector3(4.5, 0.25, -3.5),
      new THREE.Vector3(4.5, 0.35, 0),
      new THREE.Vector3(4.5, 0.25, 3.5),
      new THREE.Vector3(-4.5, 0.25, 3.5),
      new THREE.Vector3(-4.5, 0.6, 0),
    ];
    const loopCurve = new THREE.CatmullRomCurve3(loopPoints, true);

    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleProgress = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particleProgress[i] = i / particleCount;
      const pt = loopCurve.getPoint(particleProgress[i]);
      particlePositions[i * 3] = pt.x;
      particlePositions[i * 3 + 1] = pt.y + 0.05;
      particlePositions[i * 3 + 2] = pt.z;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0284c7, // Glowing blue electron charge
      size: 0.35,
      transparent: true,
      opacity: 0.95,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    circuitGroup.add(particles);
    particlesRef.current = particles;

    explodedGroupsRef.current = [batteryGroup, switchGroup, loadGroup];

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

    // Raycaster for clicking components
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([batteryGroup, switchGroup, loadGroup], true);
      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== circuitGroup && root.parent !== scene) {
          root = root.parent;
        }
        setSelectedComponent(root.name || 'Component');
      }
    };
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      controls.update();

      // Animate electrons along loop if switch is closed and simulation is not paused
      if (particlesRef.current && isSwitchClosedRef.current && !isPausedRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        // Drift speed proportional to current
        const speed = Math.min(Math.max(currentRef.current * 0.08, 0.02), 0.5);

        for (let i = 0; i < particleCount; i++) {
          particleProgress[i] = (particleProgress[i] + speed * delta) % 1;
          const pt = loopCurve.getPoint(particleProgress[i]);
          positions[i * 3] = pt.x;
          positions[i * 3 + 1] = pt.y + 0.05;
          positions[i * 3 + 2] = pt.z;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  // Update visual states when parameters change
  useEffect(() => {
    // 1. Switch lever angle
    if (switchLeverRef.current) {
      switchLeverRef.current.rotation.z = isSwitchClosed ? 0 : -Math.PI / 4;
    }

    // 2. Bulb brightness & glow
    if (bulbLightRef.current && bulbMeshRef.current) {
      if (isSwitchClosed && power > 0) {
        const brightness = Math.min(Math.max(power / 10, 0.2), 3.5);
        bulbLightRef.current.intensity = brightness * 2.5;
        (bulbMeshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = brightness;
      } else {
        bulbLightRef.current.intensity = 0;
        (bulbMeshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.05;
      }
    }

    // 3. Electron particles visibility
    if (particlesRef.current) {
      particlesRef.current.visible = isSwitchClosed && showElectrons;
    }
  }, [isSwitchClosed, power, showElectrons]);

  // Exploded view animation
  useEffect(() => {
    if (!explodedGroupsRef.current.length) return;
    const [bat, sw, ld] = explodedGroupsRef.current;
    if (isExploded) {
      bat.position.x = -6.5;
      sw.position.z = -5.5;
      ld.position.x = 6.5;
    } else {
      bat.position.x = -4.5;
      sw.position.z = -3.5;
      ld.position.x = 4.5;
    }
  }, [isExploded]);

  // Reset Camera View
  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 10, 14);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      {/* 3D Canvas Area */}
      <div className="relative h-[440px] w-full overflow-hidden rounded-xl border border-amber-100 bg-radial from-white to-amber-50/40">
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

        {/* HUD Overlay - Live Readings */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <div className="rounded-lg border border-sky-200 bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
            <div className="text-[10px] font-semibold tracking-wider text-sky-800 uppercase">Voltage (V)</div>
            <div className="font-mono-math text-base font-bold text-sky-700">{voltage.toFixed(1)} V</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
            <div className="text-[10px] font-semibold tracking-wider text-amber-800 uppercase">Resistance (R)</div>
            <div className="font-mono-math text-base font-bold text-amber-700">{resistance.toFixed(1)} Ω</div>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
            <div className="text-[10px] font-semibold tracking-wider text-emerald-800 uppercase">Current (I = V/R)</div>
            <div className="font-mono-math text-base font-bold text-emerald-700">{current.toFixed(2)} A</div>
          </div>
          <div className="rounded-lg border border-purple-200 bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
            <div className="text-[10px] font-semibold tracking-wider text-purple-800 uppercase">Power (P = V·I)</div>
            <div className="font-mono-math text-base font-bold text-purple-700">{power.toFixed(1)} W</div>
          </div>
        </div>

        {/* Interactive 3D Toolbar Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 rounded-lg border border-stone-200 bg-white/95 p-1.5 shadow-sm backdrop-blur">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume Simulation' : 'Pause Simulation'}
            className="rounded p-1.5 text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition-colors"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button
            onClick={handleResetCamera}
            title="Reset Camera View"
            className="rounded p-1.5 text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExploded(!isExploded)}
            title={isExploded ? 'Assembled View' : 'Exploded View'}
            className={`rounded p-1.5 transition-colors ${isExploded ? 'bg-amber-200 text-amber-900 font-bold' : 'text-stone-700 hover:bg-amber-100'}`}
          >
            <Layers className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowElectrons(!showElectrons)}
            title={showElectrons ? 'Hide Electrons' : 'Show Electrons'}
            className={`rounded p-1.5 transition-colors ${showElectrons ? 'text-sky-700 bg-sky-100' : 'text-stone-400 hover:bg-stone-100'}`}
          >
            <Zap className="h-4 w-4" />
          </button>
        </div>

        {/* Selected Component Inspection Badge */}
        {selectedComponent && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-stone-300 bg-white/95 px-3 py-1.5 text-xs text-stone-800 shadow backdrop-blur">
            <Info className="h-3.5 w-3.5 text-amber-600" />
            <span>Selected: <strong>{selectedComponent}</strong></span>
            <button
              onClick={() => setSelectedComponent(null)}
              className="ml-2 text-stone-400 hover:text-stone-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-3 right-3 rounded-full border border-stone-200 bg-white/95 px-3 py-1 text-xs font-medium text-stone-700 shadow-sm backdrop-blur">
          {isSwitchClosed ? (
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Circuit Closed (Current Flowing)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Circuit Open (I = 0.00 A)
            </span>
          )}
        </div>
      </div>

      {/* Control Panel Below Canvas */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Voltage Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
            <span>Battery Voltage (V)</span>
            <span className="font-mono-math text-sky-700">{voltage} V</span>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            step="0.5"
            value={voltage}
            onChange={(e) => setVoltage(parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-500 mt-1">
            <span>1 V</span>
            <span>12 V</span>
            <span>24 V</span>
          </div>
        </div>

        {/* Resistance Slider */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-1">
            <span>Load Resistance (R)</span>
            <span className="font-mono-math text-amber-700">{resistance} Ω</span>
          </div>
          <input
            type="range"
            min="2"
            max="40"
            step="1"
            value={resistance}
            onChange={(e) => setResistance(parseFloat(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-500 mt-1">
            <span>2 Ω</span>
            <span>20 Ω</span>
            <span>40 Ω</span>
          </div>
        </div>

        {/* Switch & Mode Toggle */}
        <div className="flex flex-col justify-between rounded-xl border border-stone-200 bg-stone-50/70 p-3">
          <div className="text-xs font-semibold text-stone-700 mb-1">Knife Switch Control</div>
          <button
            onClick={() => setIsSwitchClosed(!isSwitchClosed)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-xs ${
              isSwitchClosed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
            }`}
          >
            {isSwitchClosed ? 'Switch is CLOSED (Click to Open)' : 'Switch is OPEN (Click to Close)'}
          </button>
        </div>
      </div>
    </div>
  );
};
