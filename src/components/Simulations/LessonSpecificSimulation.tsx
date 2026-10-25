import React, { useState, useEffect } from 'react';
import { LessonContent } from '../../types/beee';
import { Circuit3DViewer } from './Circuit3DViewer';
import { Circuit2DFallback } from './Circuit2DFallback';
import { ACWaveform3D } from './ACWaveform3D';
import { Transformer3D } from './Transformer3D';
import { Machine3D } from './Machine3D';
import { DiodeSemiconductor3D } from './DiodeSemiconductor3D';
import { PowerGrid3D } from './PowerGrid3D';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Zap,
  Activity,
  Gauge,
  Layers,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface LessonSpecificSimulationProps {
  lessonId: string;
  lesson: LessonContent;
  use2DFallback?: boolean;
}

export const LessonSpecificSimulation: React.FC<LessonSpecificSimulationProps> = ({
  lessonId,
  lesson,
  use2DFallback = false,
}) => {
  // Global simulation controls
  const [isPaused, setIsPaused] = useState(false);

  // Lesson-specific states
  // u1-l1: Simple Circuit
  const [l1Switch, setL1Switch] = useState(true);
  const [l1Voltage, setL1Voltage] = useState(9);

  // u1-l2: Charge & Bohr Atom
  const [l2Distance, setL2Distance] = useState(4);
  const [l2ChargeQ1, setL2ChargeQ1] = useState(2);
  const [l2ChargeQ2, setL2ChargeQ2] = useState(-2);

  // u1-l3: Current & Flow Direction
  const [l3Field, setL3Field] = useState(5);
  const [l3ShowConventional, setL3ShowConventional] = useState(true);

  // u1-l4: Voltage & Water Tank
  const [l4Height, setL4Height] = useState(12);

  // u1-l5: Resistance & Resistivity
  const [l5Length, setL5Length] = useState(5);
  const [l5Area, setL5Area] = useState(2);
  const [l5Material, setL5Material] = useState<'copper' | 'aluminum' | 'nichrome' | 'carbon'>('copper');

  // u1-l6: Ohm's Law
  const [l6Voltage, setL6Voltage] = useState(12);
  const [l6Resistance, setL6Resistance] = useState(10);

  // u1-l7: Power & Joule Heating
  const [l7Voltage, setL7Voltage] = useState(24);
  const [l7Resistance, setL7Resistance] = useState(8);

  // u1-l8: Series Resistors
  const [l8R1, setL8R1] = useState(10);
  const [l8R2, setL8R2] = useState(20);
  const [l8R3, setL8R3] = useState(30);
  const [l8V, setL8V] = useState(24);

  // u1-l9: Parallel Resistors
  const [l9R1, setL9R1] = useState(10);
  const [l9R2, setL9R2] = useState(20);
  const [l9R3, setL9R3] = useState(30);
  const [l9V, setL9V] = useState(12);

  // u1-l10: DC Sources & Internal Resistance
  const [l10Es, setL10Es] = useState(12);
  const [l10Rs, setL10Rs] = useState(1.5);
  const [l10RL, setL10RL] = useState(10);

  // u1-l11: KCL Node
  const [l11I1, setL11I1] = useState(6);
  const [l11I2, setL11I2] = useState(4);
  const [l11I3, setL11I3] = useState(3);
  const [l11I4, setL11I4] = useState(5);

  // u1-l12: KVL Loop
  const [l12Vs1, setL12Vs1] = useState(20);
  const [l12R1, setL12R1] = useState(4);
  const [l12R2, setL12R2] = useState(6);

  // u1-l13: Nodal & Mesh Analysis
  const [l13Vs, setL13Vs] = useState(24);
  const [l13R1, setL13R1] = useState(4);
  const [l13R2, setL13R2] = useState(8);
  const [l13R3, setL13R3] = useState(12);

  // u1-l14: Voltage Division Rule
  const [l14Vin, setL14Vin] = useState(24);
  const [l14R1, setL14R1] = useState(10);
  const [l14R2, setL14R2] = useState(30);

  // u1-l15: Current Division Rule
  const [l15Itotal, setL15Itotal] = useState(10);
  const [l15R1, setL15R1] = useState(6);
  const [l15R2, setL15R2] = useState(12);

  // u1-l16: Source Transformation
  const [l16Mode, setL16Mode] = useState<'voltage' | 'current'>('voltage');
  const [l16Vs, setL16Vs] = useState(18);
  const [l16Rs, setL16Rs] = useState(6);
  const [l16RL, setL16RL] = useState(9);

  // u1-l17: DC Applications (Automobile Circuit)
  const [l17Headlights, setL17Headlights] = useState(true);
  const [l17StarterMotor, setL17StarterMotor] = useState(false);
  const [l17Horn, setL17Horn] = useState(false);

  // Animation frame counter for 60fps dynamic visualizers
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 3600);
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  // =========================================================================
  // RENDER LESSON-SPECIFIC SIMULATION DISPATCHER
  // =========================================================================

  // 1. LESSON 1: Introduction to Electrical Circuits
  if (lessonId === 'u1-l1') {
    return (
      <div className="w-full space-y-4">
        {use2DFallback ? (
          <Circuit2DFallback
            voltage={l1Voltage}
            resistance={15}
            isSwitchClosed={l1Switch}
            onToggleSwitch={() => setL1Switch(!l1Switch)}
            onVoltageChange={setL1Voltage}
          />
        ) : (
          <Circuit3DViewer initialVoltage={l1Voltage} initialResistance={15} />
        )}
      </div>
    );
  }

  // 2. LESSON 2: Electric Charge & Atomic Structure (Coulomb's Law & Bohr Model)
  if (lessonId === 'u1-l2') {
    const k = 8.99;
    const force = (k * Math.abs(l2ChargeQ1 * l2ChargeQ2)) / (l2Distance * l2Distance);
    const isAttraction = (l2ChargeQ1 > 0 && l2ChargeQ2 < 0) || (l2ChargeQ1 < 0 && l2ChargeQ2 > 0);

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific 3D/2D Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Atomic Charge &amp; Coulomb's Law Electrostatic Visualizer</h2>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-bold text-stone-700 hover:bg-stone-100"
          >
            {isPaused ? <Play className="h-3.5 w-3.5 text-emerald-600" /> : <Pause className="h-3.5 w-3.5 text-amber-600" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>

        {/* Visual Canvas: Charges in Space */}
        <div className="relative h-64 w-full rounded-xl border border-amber-100 bg-radial from-white via-amber-50/20 to-stone-50 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 200" className="w-full h-full max-w-lg">
            <g stroke="#cbd5e1" strokeDasharray="3,3" opacity="0.6">
              <line x1="50" y1="100" x2="450" y2="100" />
              <line x1="250" y1="20" x2="250" y2="180" />
            </g>

            {/* Charge 1 */}
            <g transform={`translate(${160 - l2Distance * 8}, 100)`}>
              <circle cx="0" cy="0" r={16 + Math.abs(l2ChargeQ1) * 3} fill={l2ChargeQ1 > 0 ? '#ef4444' : '#0284c7'} opacity="0.9" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
                {l2ChargeQ1 > 0 ? `+${l2ChargeQ1}C` : `${l2ChargeQ1}C`}
              </text>
              <text x="0" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Charge q₁</text>
              <line
                x1="0"
                y1="0"
                x2={isAttraction ? 35 : -35}
                y2="0"
                stroke={isAttraction ? '#059669' : '#dc2626'}
                strokeWidth="3"
              />
            </g>

            {/* Charge 2 */}
            <g transform={`translate(${340 + l2Distance * 8}, 100)`}>
              <circle cx="0" cy="0" r={16 + Math.abs(l2ChargeQ2) * 3} fill={l2ChargeQ2 > 0 ? '#ef4444' : '#0284c7'} opacity="0.9" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
                {l2ChargeQ2 > 0 ? `+${l2ChargeQ2}C` : `${l2ChargeQ2}C`}
              </text>
              <text x="0" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Charge q₂</text>
              <line
                x1="0"
                y1="0"
                x2={isAttraction ? -35 : 35}
                y2="0"
                stroke={isAttraction ? '#059669' : '#dc2626'}
                strokeWidth="3"
              />
            </g>

            {/* Distance Marker */}
            <line x1={160 - l2Distance * 8} y1="160" x2={340 + l2Distance * 8} y2="160" stroke="#78716c" strokeWidth="1.5" />
            <text x="250" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78716c">
              Separation Distance r = {l2Distance.toFixed(1)} meters
            </text>
          </svg>

          {/* Result Badge */}
          <div className="absolute top-3 right-3 rounded-lg border border-stone-200 bg-white/95 px-3 py-1.5 shadow-xs backdrop-blur font-mono-math text-xs">
            <span className="text-stone-500 block text-[10px] uppercase font-bold">Coulomb Electrostatic Force</span>
            <span className="text-sm font-bold text-amber-800">{force.toFixed(2)} × 10⁹ N</span>
            <span className={`block text-[10px] font-bold ${isAttraction ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isAttraction ? 'Mutual ATTRACTION (Opposites Attract)' : 'Mutual REPULSION (Like Charges Repel)'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Charge q₁ (Coulombs)</span>
              <span className="font-mono-math font-bold text-red-700">{l2ChargeQ1 > 0 ? `+${l2ChargeQ1}` : l2ChargeQ1} C</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={l2ChargeQ1}
              onChange={(e) => setL2ChargeQ1(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Charge q₂ (Coulombs)</span>
              <span className="font-mono-math font-bold text-sky-700">{l2ChargeQ2 > 0 ? `+${l2ChargeQ2}` : l2ChargeQ2} C</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={l2ChargeQ2}
              onChange={(e) => setL2ChargeQ2(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Distance r (m)</span>
              <span className="font-mono-math font-bold text-stone-900">{l2Distance} m</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={l2Distance}
              onChange={(e) => setL2Distance(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. LESSON 3: Electric Current & Flow Direction (Conventional vs Electron Drift)
  if (lessonId === 'u1-l3') {
    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Wire Conductor Cross-Section: Electron Drift vs Conventional Flow</h2>
          </div>
          <button
            onClick={() => setL3ShowConventional(!l3ShowConventional)}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              l3ShowConventional ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {l3ShowConventional ? 'Viewing Conventional Current (+ to -)' : 'Viewing Actual Electron Drift (- to +)'}
          </button>
        </div>

        {/* Dynamic Wire Animation Canvas */}
        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fefdfa] p-3 flex flex-col justify-center items-center overflow-hidden">
          <svg viewBox="0 0 500 160" className="w-full h-full max-w-lg">
            <rect x="50" y="40" width="400" height="80" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <ellipse cx="50" cy="80" rx="14" ry="40" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            <ellipse cx="450" cy="80" rx="14" ry="40" fill="#fde68a" stroke="#b45309" strokeWidth="2" />

            <text x="35" y="25" fontSize="13" fontWeight="bold" fill="#ef4444">NEGATIVE (-) TERMINAL</text>
            <text x="320" y="25" fontSize="13" fontWeight="bold" fill="#0284c7">POSITIVE (+) TERMINAL</text>

            {Array.from({ length: 18 }).map((_, i) => {
              const speed = l3Field * 0.8;
              const xPos = 60 + ((i * 22 + (l3ShowConventional ? -tick * speed : tick * speed)) % 370 + 370) % 370;
              const yPos = 55 + (i % 3) * 22;
              return (
                <g key={i} transform={`translate(${xPos}, ${yPos})`}>
                  <circle cx="0" cy="0" r="7" fill={l3ShowConventional ? '#ef4444' : '#0284c7'} />
                  <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">
                    {l3ShowConventional ? '+' : 'e⁻'}
                  </text>
                </g>
              );
            })}

            <line
              x1={l3ShowConventional ? 100 : 400}
              y1="140"
              x2={l3ShowConventional ? 400 : 100}
              y2="140"
              stroke={l3ShowConventional ? '#b45309' : '#0284c7'}
              strokeWidth="3"
            />
            <text x="250" y="155" textAnchor="middle" fontSize="11" fontWeight="bold" fill={l3ShowConventional ? '#b45309' : '#0284c7'}>
              {l3ShowConventional
                ? 'CONVENTIONAL CURRENT (Franklin: Flows from + to -)'
                : 'ACTUAL PHYSICAL DRIFT (Free Electrons Flow from - to +)'}
            </text>
          </svg>
        </div>

        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>Applied Electric Field (E = V/L) &amp; Drift Velocity</span>
            <span className="font-mono-math font-bold text-amber-800">{l3Field} V/m (vd ≈ {(l3Field * 0.05).toFixed(3)} mm/s)</span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            value={l3Field}
            onChange={(e) => setL3Field(parseInt(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 4. LESSON 4: Voltage & Potential Difference (Water Tank Pressure Analogy)
  if (lessonId === 'u1-l4') {
    const flowRate = Math.sqrt(2 * 9.8 * l4Height);
    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Hydraulic Head Pressure vs Electrical Potential Difference (V = W/Q)</h2>
          </div>
        </div>

        <div className="relative h-64 w-full rounded-xl border border-sky-100 bg-sky-50/20 p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 200" className="w-full h-full max-w-lg">
            <rect x="60" y={150 - l4Height * 8} width="90" height={l4Height * 8} rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <text x="105" y={145 - l4Height * 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
              Water Tank (Height h = {l4Height} m)
            </text>

            <path d={`M 150 150 L 320 150 L 320 180`} fill="none" stroke="#64748b" strokeWidth="12" />
            <path d={`M 150 150 L 320 150 L 320 180`} fill="none" stroke="#38bdf8" strokeWidth="6" />

            <ellipse cx="320" cy="185" rx={4 + flowRate * 0.4} ry="3" fill="#0284c7" />

            <circle cx="320" cy="180" r="14" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="320" y="184" textAnchor="middle" fontSize="9" fontWeight="bold">Turbine</text>

            <rect x="220" y="30" width="240" height="90" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="235" y="55" fontSize="11" fontWeight="bold" fill="#0284c7">Potential Difference: V = {l4Height} Volts</text>
            <text x="235" y="75" fontSize="10" fill="#475569">Gravitational Head Pressure: P = ρ·g·h</text>
            <text x="235" y="95" fontSize="10" font-weight="bold" fill="#059669">Efflux Speed: v = √(2gh) = {flowRate.toFixed(1)} m/s</text>
          </svg>
        </div>

        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-1">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>Water Tank Height (Electric Potential Difference V)</span>
            <span className="font-mono-math font-bold text-sky-700">{l4Height} Volts (Joules per Coulomb)</span>
          </div>
          <input
            type="range"
            min="2"
            max="16"
            value={l4Height}
            onChange={(e) => setL4Height(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 5. LESSON 5: Resistance & Resistivity (R = ρL/A)
  if (lessonId === 'u1-l5') {
    const rhoMap = {
      copper: 1.68e-8,
      aluminum: 2.82e-8,
      nichrome: 1.1e-6,
      carbon: 3.5e-5,
    };
    const rho = rhoMap[l5Material];
    const resValue = (rho * l5Length * 1e6) / (l5Area * 1e-6) * 1e-6;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Physical Resistance Law: R = ρ · L / A</h2>
          </div>
        </div>

        <div className="relative h-56 w-full rounded-xl border border-stone-200 bg-[#fdfcfa] p-4 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 160" className="w-full h-full max-w-lg">
            <rect
              x="60"
              y={80 - l5Area * 3}
              width={l5Length * 35}
              height={l5Area * 6}
              rx="4"
              fill={l5Material === 'copper' ? '#fed7aa' : l5Material === 'aluminum' ? '#e2e8f0' : '#cbd5e1'}
              stroke={l5Material === 'copper' ? '#b45309' : '#64748b'}
              strokeWidth="2.5"
            />
            <text x="60" y="40" fontSize="11" fontWeight="bold" fill="#b45309">
              Length L = {l5Length} m
            </text>
            <line x1="60" y1="45" x2={60 + l5Length * 35} y2="45" stroke="#b45309" strokeWidth="2" />
            <text x={70 + l5Length * 35} y="85" fontSize="10" fontWeight="bold" fill="#0284c7">
              Cross-section A = {l5Area} mm²
            </text>
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-amber-200 bg-white/95 px-3 py-1.5 shadow-xs font-mono-math text-xs">
            <span className="text-stone-500 block text-[10px] uppercase font-bold">Computed Resistance R</span>
            <span className="text-base font-bold text-amber-800">{resValue.toFixed(3)} Ω</span>
            <span className="text-[10px] text-stone-500 block">Material: {l5Material.toUpperCase()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700 block">Conductor Material</span>
            <select
              value={l5Material}
              onChange={(e) => setL5Material(e.target.value as any)}
              className="w-full rounded-lg border border-stone-300 bg-white px-2 py-1 text-xs font-bold text-stone-800"
            >
              <option value="copper">Copper (ρ = 1.68 × 10⁻⁸ Ω·m)</option>
              <option value="aluminum">Aluminum (ρ = 2.82 × 10⁻⁸ Ω·m)</option>
              <option value="nichrome">Nichrome (ρ = 1.1 × 10⁻⁶ Ω·m)</option>
              <option value="carbon">Carbon (ρ = 3.5 × 10⁻⁵ Ω·m)</option>
            </select>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Length L (m)</span>
              <span className="font-mono-math font-bold text-amber-800">{l5Length} m</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={l5Length}
              onChange={(e) => setL5Length(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Area A (mm²)</span>
              <span className="font-mono-math font-bold text-sky-800">{l5Area} mm²</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={l5Area}
              onChange={(e) => setL5Area(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // 6. LESSON 6: Ohm's Law
  if (lessonId === 'u1-l6') {
    const current = l6Resistance > 0 ? l6Voltage / l6Resistance : 0;
    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Ohm's Law Precision Linear V-I Characteristic Plotter</h2>
          </div>
        </div>

        <div className="relative h-64 w-full rounded-xl border border-amber-100 bg-[#fefdfa] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 200" className="w-full h-full max-w-lg">
            <line x1="60" y1="160" x2="440" y2="160" stroke="#64748b" strokeWidth="2" />
            <line x1="60" y1="160" x2="60" y2="20" stroke="#64748b" strokeWidth="2" />
            <text x="420" y="175" fontSize="10" fontWeight="bold" fill="#64748b">Current I (A)</text>
            <text x="35" y="25" fontSize="10" fontWeight="bold" fill="#64748b">V (V)</text>

            <line x1="60" y1="160" x2={60 + 3.5 * 100} y2={160 - (3.5 * l6Resistance / 30) * 120} stroke="#b45309" strokeWidth="2" strokeDasharray="3,3" />

            <circle
              cx={60 + Math.min(current * 100, 370)}
              cy={160 - Math.min((l6Voltage / 30) * 130, 130)}
              r="7"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              x={75 + Math.min(current * 100, 350)}
              y={155 - Math.min((l6Voltage / 30) * 130, 130)}
              fontSize="11"
              fontWeight="bold"
              fill="#b45309"
            >
              ({current.toFixed(2)} A, {l6Voltage} V)
            </text>
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-stone-200 bg-white/95 p-2 shadow-xs font-mono-math text-xs">
            <div className="text-stone-500 uppercase text-[10px] font-bold">Ohmic Verification</div>
            <div className="text-sm font-bold text-emerald-700">I = V/R = {current.toFixed(2)} A</div>
            <div className="text-[10px] text-stone-600">Slope = R = {l6Resistance.toFixed(1)} Ω</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Voltage V (Volts)</span>
              <span className="font-mono-math font-bold text-sky-700">{l6Voltage} V</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={l6Voltage}
              onChange={(e) => setL6Voltage(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Resistance R (Ohms)</span>
              <span className="font-mono-math font-bold text-amber-700">{l6Resistance} Ω</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={l6Resistance}
              onChange={(e) => setL6Resistance(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // 7. LESSON 7: Electrical Power and Energy (P = I²R)
  if (lessonId === 'u1-l7') {
    const power = (l7Voltage * l7Voltage) / l7Resistance;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Joule Heating Dissipation &amp; Electricity Energy Consumption (P = I²R)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative">
              <Thermometer className={`h-16 w-16 transition-colors ${power > 50 ? 'text-red-600 animate-pulse' : 'text-amber-500'}`} />
              <div className="absolute inset-0 flex items-center justify-center font-mono-math text-xs font-bold text-stone-900 pt-3">
                {(power).toFixed(0)} W
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">Joule Thermal Dissipation</span>
              <span className="text-[11px] text-stone-500">Heat energy generated = P · t = {power.toFixed(1)} Joules/sec</span>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 flex flex-col items-center justify-center text-center space-y-2">
            <div className="h-16 w-16 rounded-full border-4 border-dashed border-emerald-600 flex items-center justify-center" style={{ transform: `rotate(${tick * (power / 5)}deg)` }}>
              <div className="h-4 w-4 rounded-full bg-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">Commercial Energy Meter</span>
              <span className="font-mono-math text-xs font-bold text-emerald-800">1 Hour = {(power / 1000).toFixed(4)} kWh</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Applied Voltage V</span>
              <span className="font-mono-math font-bold text-sky-700">{l7Voltage} V</span>
            </div>
            <input
              type="range"
              min="5"
              max="48"
              value={l7Voltage}
              onChange={(e) => setL7Voltage(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Heating Resistor R</span>
              <span className="font-mono-math font-bold text-amber-700">{l7Resistance} Ω</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={l7Resistance}
              onChange={(e) => setL7Resistance(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // 8. LESSON 8: Series Resistor Circuits
  if (lessonId === 'u1-l8') {
    const rTotal = l8R1 + l8R2 + l8R3;
    const current = l8V / rTotal;
    const v1 = current * l8R1;
    const v2 = current * l8R2;
    const v3 = current * l8R3;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">3-Resistor Series Chain (Common Current I, Distributed Voltages)</h2>
          </div>
        </div>

        <div className="relative h-56 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 150" className="w-full h-full max-w-lg">
            <rect x="50" y="30" width="400" height="90" rx="8" fill="none" stroke="#78716c" strokeWidth="2" />
            <text x="35" y="80" fontSize="11" fontWeight="bold" fill="#0284c7">{l8V}V</text>

            <rect x="110" y="20" width="50" height="20" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="125" y="34" fontSize="10" fontWeight="bold">R1={l8R1}Ω</text>
            <text x="115" y="58" fontSize="9" fontWeight="bold" fill="#0284c7">V1={v1.toFixed(1)}V</text>

            <rect x="220" y="20" width="50" height="20" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="235" y="34" fontSize="10" fontWeight="bold">R2={l8R2}Ω</text>
            <text x="225" y="58" fontSize="9" fontWeight="bold" fill="#0284c7">V2={v2.toFixed(1)}V</text>

            <rect x="330" y="20" width="50" height="20" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="345" y="34" fontSize="10" fontWeight="bold">R3={l8R3}Ω</text>
            <text x="335" y="58" fontSize="9" fontWeight="bold" fill="#0284c7">V3={v3.toFixed(1)}V</text>

            <text x="250" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#059669">
              Common Current I = {current.toFixed(2)} A (Req = {rTotal} Ω)
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R1 ({l8R1}Ω)</span>
            <input type="range" min="5" max="50" value={l8R1} onChange={(e) => setL8R1(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R2 ({l8R2}Ω)</span>
            <input type="range" min="5" max="50" value={l8R2} onChange={(e) => setL8R2(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R3 ({l8R3}Ω)</span>
            <input type="range" min="5" max="50" value={l8R3} onChange={(e) => setL8R3(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">V ({l8V}V)</span>
            <input type="range" min="6" max="48" value={l8V} onChange={(e) => setL8V(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 9. LESSON 9: Parallel Resistors
  if (lessonId === 'u1-l9') {
    const invReq = 1 / l9R1 + 1 / l9R2 + 1 / l9R3;
    const req = 1 / invReq;
    const i1 = l9V / l9R1;
    const i2 = l9V / l9R2;
    const i3 = l9V / l9R3;
    const iTotal = i1 + i2 + i3;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">3-Resistor Parallel Network (Common Voltage V, Splitting Currents)</h2>
          </div>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            <line x1="60" y1="35" x2="60" y2="135" stroke="#0284c7" strokeWidth="3" />
            <line x1="440" y1="35" x2="440" y2="135" stroke="#0284c7" strokeWidth="3" />
            <text x="25" y="85" fontSize="11" fontWeight="bold" fill="#0284c7">{l9V}V</text>

            <line x1="60" y1="45" x2="200" y2="45" stroke="#059669" strokeWidth="1.5" />
            <rect x="200" y="37" width="50" height="16" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="210" y="49" fontSize="9" fontWeight="bold">R1={l9R1}Ω</text>
            <line x1="250" y1="45" x2="440" y2="45" stroke="#059669" strokeWidth="1.5" />
            <text x="270" y="42" fontSize="9" fontWeight="bold" fill="#059669">I1={i1.toFixed(2)}A</text>

            <line x1="60" y1="85" x2="200" y2="85" stroke="#b45309" strokeWidth="1.5" />
            <rect x="200" y="77" width="50" height="16" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="210" y="89" fontSize="9" fontWeight="bold">R2={l9R2}Ω</text>
            <line x1="250" y1="85" x2="440" y2="85" stroke="#b45309" strokeWidth="1.5" />
            <text x="270" y="82" fontSize="9" fontWeight="bold" fill="#b45309">I2={i2.toFixed(2)}A</text>

            <line x1="60" y1="125" x2="200" y2="125" stroke="#7c3aed" strokeWidth="1.5" />
            <rect x="200" y="117" width="50" height="16" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="210" y="129" fontSize="9" fontWeight="bold">R3={l9R3}Ω</text>
            <line x1="250" y1="125" x2="440" y2="125" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="270" y="122" fontSize="9" fontWeight="bold" fill="#7c3aed">I3={i3.toFixed(2)}A</text>
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-stone-200 bg-white/95 px-3 py-1 shadow-xs font-mono-math text-xs">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">Equivalent Parallel Resistance</span>
            <span className="text-sm font-bold text-emerald-700">Req = {req.toFixed(2)} Ω</span>
            <span className="text-[10px] text-stone-600 block">Total I = {iTotal.toFixed(2)} A</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R1 ({l9R1}Ω)</span>
            <input type="range" min="5" max="50" value={l9R1} onChange={(e) => setL9R1(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R2 ({l9R2}Ω)</span>
            <input type="range" min="5" max="50" value={l9R2} onChange={(e) => setL9R2(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R3 ({l9R3}Ω)</span>
            <input type="range" min="5" max="50" value={l9R3} onChange={(e) => setL9R3(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">V ({l9V}V)</span>
            <input type="range" min="6" max="36" value={l9V} onChange={(e) => setL9V(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 10. LESSON 10: DC Voltage Sources & Internal Resistance
  if (lessonId === 'u1-l10') {
    const current = l10Es / (l10Rs + l10RL);
    const vTerminal = current * l10RL;
    const vInternal = current * l10Rs;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Practical Voltage Source Model with Internal Resistance Droop (V_t = E_s - I·r_s)</h2>
          </div>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            <rect x="50" y="30" width="180" height="110" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="60" y="50" fontSize="9" fontWeight="bold" fill="#64748b">PRACTICAL BATTERY</text>

            <circle cx="95" cy="85" r="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="95" y="89" textAnchor="middle" fontSize="10" fontWeight="bold">Es={l10Es}V</text>

            <line x1="111" y1="85" x2="160" y2="85" stroke="#78716c" strokeWidth="2" />
            <rect x="160" y="77" width="40" height="16" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="170" y="89" fontSize="9" fontWeight="bold">rs={l10Rs}Ω</text>

            <circle cx="230" cy="85" r="4" fill="#0284c7" />
            <text x="235" y="80" fontSize="10" fontWeight="bold" fill="#0284c7">A (+)</text>
            <circle cx="50" cy="85" r="4" fill="#0284c7" />
            <text x="35" y="80" fontSize="10" fontWeight="bold" fill="#0284c7">B (-)</text>

            <line x1="230" y1="85" x2="350" y2="85" stroke="#059669" strokeWidth="2" />
            <rect x="350" y="60" width="30" height="50" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
            <text x="365" y="88" textAnchor="middle" fontSize="10" fontWeight="bold">RL={l10RL}Ω</text>
            <line x1="365" y1="110" x2="365" y2="135" stroke="#059669" strokeWidth="2" />
            <line x1="365" y1="135" x2="50" y2="135" stroke="#78716c" strokeWidth="2" />
            <line x1="50" y1="135" x2="50" y2="85" stroke="#78716c" strokeWidth="2" />
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-sky-200 bg-white/95 px-3 py-1.5 shadow-xs font-mono-math text-xs">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">Terminal Voltage vs EMF</span>
            <span className="text-sm font-bold text-sky-800">Vt = {vTerminal.toFixed(2)} V</span>
            <span className="text-[11px] text-rose-700 block">Internal Drop = {vInternal.toFixed(2)} V</span>
            <span className="text-[11px] text-emerald-700 block">Load Current I = {current.toFixed(2)} A</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Open-Circuit EMF Es ({l10Es} V)</span>
            <input type="range" min="6" max="24" value={l10Es} onChange={(e) => setL10Es(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Internal Resistance rs ({l10Rs} Ω)</span>
            <input type="range" min="0.2" max="5" step="0.1" value={l10Rs} onChange={(e) => setL10Rs(parseFloat(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Load Resistance RL ({l10RL} Ω)</span>
            <input type="range" min="1" max="40" value={l10RL} onChange={(e) => setL10RL(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 11. LESSON 11: Kirchhoff's Current Law (KCL)
  if (lessonId === 'u1-l11') {
    const sumIn = l11I1 + l11I2;
    const sumOut = l11I3 + l11I4;
    const isBalanced = sumIn === sumOut;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">KCL Multi-Branch Node Balance Simulator (Σ I_in = Σ I_out)</h2>
          </div>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fefdfa] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            <circle cx="250" cy="85" r="9" fill="#b45309" />
            <text x="250" y="105" textAnchor="middle" fontSize="10" fontWeight="bold">Junction Node</text>

            <line x1="80" y1="35" x2="242" y2="80" stroke="#0284c7" strokeWidth="2.5" />
            <text x="90" y="50" fontSize="10" fontWeight="bold" fill="#0284c7">I1 = +{l11I1} A (In)</text>

            <line x1="80" y1="135" x2="242" y2="90" stroke="#0284c7" strokeWidth="2.5" />
            <text x="90" y="130" fontSize="10" fontWeight="bold" fill="#0284c7">I2 = +{l11I2} A (In)</text>

            <line x1="258" y1="80" x2="420" y2="35" stroke="#ef4444" strokeWidth="2.5" />
            <text x="360" y="50" fontSize="10" fontWeight="bold" fill="#ef4444">I3 = -{l11I3} A (Out)</text>

            <line x1="258" y1="90" x2="420" y2="135" stroke="#ef4444" strokeWidth="2.5" />
            <text x="360" y="130" fontSize="10" fontWeight="bold" fill="#ef4444">I4 = -{l11I4} A (Out)</text>
          </svg>

          <div className={`absolute top-3 right-3 rounded-lg border px-3 py-1.5 shadow-xs font-mono-math text-xs ${isBalanced ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`}>
            <span className="font-bold block">{isBalanced ? '✓ KCL SATISFIED (Σ I = 0)' : '⚠ UNBALANCED NODE'}</span>
            <span>Total In: {sumIn} A | Total Out: {sumOut} A</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">I1 In ({l11I1}A)</span>
            <input type="range" min="1" max="15" value={l11I1} onChange={(e) => setL11I1(parseInt(e.target.value))} className="w-full accent-sky-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">I2 In ({l11I2}A)</span>
            <input type="range" min="1" max="15" value={l11I2} onChange={(e) => setL11I2(parseInt(e.target.value))} className="w-full accent-sky-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">I3 Out ({l11I3}A)</span>
            <input type="range" min="1" max="15" value={l11I3} onChange={(e) => setL11I3(parseInt(e.target.value))} className="w-full accent-rose-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">I4 Out ({l11I4}A)</span>
            <input type="range" min="1" max="15" value={l11I4} onChange={(e) => setL11I4(parseInt(e.target.value))} className="w-full accent-rose-600" />
          </div>
        </div>
      </div>
    );
  }

  // 12. LESSON 12: Kirchhoff's Voltage Law (KVL)
  if (lessonId === 'u1-l12') {
    const iLoop = l12Vs1 / (l12R1 + l12R2);
    const drop1 = iLoop * l12R1;
    const drop2 = iLoop * l12R2;
    const sumVoltages = l12Vs1 - drop1 - drop2;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">KVL Closed Loop Algebraic Voltage Balance (Σ V_rise - Σ V_drop = 0)</h2>
          </div>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            <rect x="70" y="30" width="360" height="100" rx="8" fill="none" stroke="#059669" strokeWidth="2.5" />

            <circle cx="70" cy="80" r="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="70" y="84" textAnchor="middle" fontSize="10" fontWeight="bold">+ {l12Vs1}V -</text>

            <rect x="220" y="20" width="50" height="20" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="235" y="34" fontSize="10" fontWeight="bold">R1={l12R1}Ω</text>
            <text x="225" y="58" fontSize="9" fontWeight="bold" fill="#dc2626">- {drop1.toFixed(1)} V Drop</text>

            <rect x="405" y="65" width="20" height="45" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="415" y="90" textAnchor="middle" fontSize="9" fontWeight="bold">R2={l12R2}Ω</text>
            <text x="360" y="90" fontSize="9" fontWeight="bold" fill="#dc2626">- {drop2.toFixed(1)} V</text>

            <path d="M 230 75 A 25 25 0 1 1 270 75" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="3,3" />
            <text x="250" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669">Loop Current I = {iLoop.toFixed(2)} A</text>
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-emerald-300 bg-white/95 px-3 py-1.5 shadow-xs font-mono-math text-xs">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">KVL Loop Equation</span>
            <span className="text-sm font-bold text-emerald-800">+{l12Vs1}V - {drop1.toFixed(1)}V - {drop2.toFixed(1)}V = {sumVoltages.toFixed(2)} V</span>
            <span className="text-[10px] text-emerald-700 block">✓ Exact Zero Potential Difference</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Source V_s ({l12Vs1} V)</span>
            <input type="range" min="6" max="48" value={l12Vs1} onChange={(e) => setL12Vs1(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">R1 ({l12R1} Ω)</span>
            <input type="range" min="1" max="25" value={l12R1} onChange={(e) => setL12R1(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">R2 ({l12R2} Ω)</span>
            <input type="range" min="1" max="25" value={l12R2} onChange={(e) => setL12R2(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 13. LESSON 13: Nodal & Mesh Analysis
  if (lessonId === 'u1-l13') {
    const gTotal = 1 / l13R1 + 1 / l13R2 + 1 / l13R3;
    const vNode1 = (l13Vs / l13R1) / gTotal;
    const iBranch1 = (l13Vs - vNode1) / l13R1;
    const iBranch2 = vNode1 / l13R2;
    const iBranch3 = vNode1 / l13R3;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Nodal Analysis Circuit Solver (Node Voltages &amp; Matrix Formulation)</h2>
          </div>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            <line x1="80" y1="140" x2="420" y2="140" stroke="#0284c7" strokeWidth="2.5" />
            <text x="250" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0284c7">Reference Ground Node (0 V)</text>

            <line x1="80" y1="140" x2="80" y2="40" stroke="#78716c" strokeWidth="2" />
            <circle cx="80" cy="90" r="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="80" y="94" textAnchor="middle" fontSize="9" fontWeight="bold">Vs={l13Vs}V</text>

            <line x1="80" y1="40" x2="180" y2="40" stroke="#78716c" strokeWidth="2" />
            <rect x="180" y="32" width="45" height="16" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="195" y="44" fontSize="9" fontWeight="bold">R1={l13R1}Ω</text>
            <line x1="225" y1="40" x2="280" y2="40" stroke="#78716c" strokeWidth="2" />

            <circle cx="280" cy="40" r="8" fill="#ef4444" />
            <text x="280" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ef4444">Node 1 (V1 = {vNode1.toFixed(2)} V)</text>

            <line x1="280" y1="40" x2="280" y2="70" stroke="#78716c" strokeWidth="2" />
            <rect x="272" y="70" width="16" height="40" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="280" y="94" textAnchor="middle" fontSize="8" fontWeight="bold">R2={l13R2}Ω</text>
            <line x1="280" y1="110" x2="280" y2="140" stroke="#78716c" strokeWidth="2" />

            <line x1="280" y1="40" x2="380" y2="40" stroke="#78716c" strokeWidth="2" />
            <line x1="380" y1="40" x2="380" y2="70" stroke="#78716c" strokeWidth="2" />
            <rect x="372" y="70" width="16" height="40" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="380" y="94" textAnchor="middle" fontSize="8" fontWeight="bold">R3={l13R3}Ω</text>
            <line x1="380" y1="110" x2="380" y2="140" stroke="#78716c" strokeWidth="2" />
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-stone-200 bg-white/95 px-3 py-1.5 shadow-xs font-mono-math text-xs">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">Nodal KCL Equations</span>
            <span className="text-sm font-bold text-purple-800">V1 = {vNode1.toFixed(2)} Volts</span>
            <span className="text-[10px] text-stone-600 block">I1 = {iBranch1.toFixed(2)} A | I2 = {iBranch2.toFixed(2)} A | I3 = {iBranch3.toFixed(2)} A</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">Vs ({l13Vs} V)</span>
            <input type="range" min="6" max="36" value={l13Vs} onChange={(e) => setL13Vs(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R1 ({l13R1} Ω)</span>
            <input type="range" min="2" max="25" value={l13R1} onChange={(e) => setL13R1(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R2 ({l13R2} Ω)</span>
            <input type="range" min="2" max="25" value={l13R2} onChange={(e) => setL13R2(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 space-y-1">
            <span className="text-[11px] font-semibold text-stone-700">R3 ({l13R3} Ω)</span>
            <input type="range" min="2" max="25" value={l13R3} onChange={(e) => setL13R3(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 14. LESSON 14: Voltage Division Rule
  if (lessonId === 'u1-l14') {
    const vOut = l14Vin * (l14R2 / (l14R1 + l14R2));
    const v1 = l14Vin - vOut;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Voltage Division Potentiometer: V_out = V_in · [ R2 / (R1 + R2) ]</h2>
          </div>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            <line x1="80" y1="30" x2="80" y2="140" stroke="#0284c7" strokeWidth="2.5" />
            <text x="35" y="85" fontSize="11" fontWeight="bold" fill="#0284c7">Vin = {l14Vin}V</text>

            <line x1="80" y1="30" x2="250" y2="30" stroke="#78716c" strokeWidth="2" />
            <rect x="250" y="20" width="30" height="40" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="290" y="45" fontSize="10" fontWeight="bold">R1 = {l14R1}Ω (Drop = {v1.toFixed(1)}V)</text>

            <circle cx="265" cy="85" r="5" fill="#ef4444" />
            <line x1="265" y1="85" x2="400" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />

            <rect x="250" y="90" width="30" height="40" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="290" y="115" fontSize="10" fontWeight="bold">R2 = {l14R2}Ω</text>

            <text x="410" y="90" fontSize="12" fontWeight="bold" fill="#ef4444">Vout = {vOut.toFixed(2)} V</text>
            <line x1="250" y1="140" x2="80" y2="140" stroke="#78716c" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Input Vin ({l14Vin}V)</span>
            <input type="range" min="5" max="48" value={l14Vin} onChange={(e) => setL14Vin(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">R1 ({l14R1}Ω)</span>
            <input type="range" min="5" max="100" value={l14R1} onChange={(e) => setL14R1(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">R2 ({l14R2}Ω)</span>
            <input type="range" min="5" max="100" value={l14R2} onChange={(e) => setL14R2(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 15. LESSON 15: Current Division Rule
  if (lessonId === 'u1-l15') {
    const i1 = l15Itotal * (l15R2 / (l15R1 + l15R2));
    const i2 = l15Itotal - i1;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Current Division Rule: I₁ = I_total · [ R₂ / (R₁ + R₂) ]</h2>
          </div>
        </div>

        <div className="relative h-56 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 160" className="w-full h-full max-w-lg">
            <line x1="40" y1="80" x2="160" y2="80" stroke="#b45309" strokeWidth="3" />
            <text x="60" y="65" fontSize="11" fontWeight="bold" fill="#b45309">I_total = {l15Itotal} A</text>

            <line x1="160" y1="80" x2="160" y2="40" stroke="#78716c" strokeWidth="2" />
            <line x1="160" y1="80" x2="160" y2="120" stroke="#78716c" strokeWidth="2" />

            <line x1="160" y1="40" x2="230" y2="40" stroke="#0284c7" strokeWidth="2" />
            <rect x="230" y="30" width="50" height="20" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="240" y="44" fontSize="9" fontWeight="bold">R1={l15R1}Ω</text>
            <line x1="280" y1="40" x2="360" y2="40" stroke="#0284c7" strokeWidth="2" />
            <text x="375" y="44" fontSize="11" fontWeight="bold" fill="#0284c7">I₁ = {i1.toFixed(2)} A</text>

            <line x1="160" y1="120" x2="230" y2="120" stroke="#059669" strokeWidth="2" />
            <rect x="230" y="110" width="50" height="20" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="240" y="124" fontSize="9" fontWeight="bold">R2={l15R2}Ω</text>
            <line x1="280" y1="120" x2="360" y2="120" stroke="#059669" strokeWidth="2" />
            <text x="375" y="124" fontSize="11" fontWeight="bold" fill="#059669">I₂ = {i2.toFixed(2)} A</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Total Inflow I ({l15Itotal} A)</span>
            <input type="range" min="2" max="25" value={l15Itotal} onChange={(e) => setL15Itotal(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">R1 ({l15R1} Ω)</span>
            <input type="range" min="1" max="30" value={l15R1} onChange={(e) => setL15R1(parseInt(e.target.value))} className="w-full accent-sky-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">R2 ({l15R2} Ω)</span>
            <input type="range" min="1" max="30" value={l15R2} onChange={(e) => setL15R2(parseInt(e.target.value))} className="w-full accent-emerald-600" />
          </div>
        </div>
      </div>
    );
  }

  // 16. LESSON 16: Source Transformation (Thevenin <-> Norton Equivalence)
  if (lessonId === 'u1-l16') {
    const isCurrent = l16Vs / l16Rs;
    const vL = l16Vs * (l16RL / (l16Rs + l16RL));
    const iL = vL / l16RL;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Source Transformation: Thevenin Voltage Source ⟷ Norton Current Source</h2>
          </div>
          <button
            onClick={() => setL16Mode(l16Mode === 'voltage' ? 'current' : 'voltage')}
            className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-amber-700"
          >
            Toggle to {l16Mode === 'voltage' ? 'Norton Current Source Model' : 'Thevenin Voltage Source Model'}
          </button>
        </div>

        <div className="relative h-60 w-full rounded-xl border border-amber-100 bg-[#fdfbf7] p-3 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 170" className="w-full h-full max-w-lg">
            {l16Mode === 'voltage' ? (
              <g>
                <circle cx="90" cy="85" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                <text x="90" y="89" textAnchor="middle" fontSize="10" fontWeight="bold">Vs={l16Vs}V</text>
                <line x1="90" y1="67" x2="180" y2="67" stroke="#78716c" strokeWidth="2" />
                <rect x="180" y="59" width="40" height="16" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
                <text x="190" y="71" fontSize="9" fontWeight="bold">Rs={l16Rs}Ω</text>
                <line x1="220" y1="67" x2="320" y2="67" stroke="#78716c" strokeWidth="2" />
                <line x1="90" y1="103" x2="320" y2="103" stroke="#78716c" strokeWidth="2" />
                <rect x="320" y="55" width="25" height="55" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                <text x="332" y="85" textAnchor="middle" fontSize="9" fontWeight="bold">RL={l16RL}Ω</text>
                <text x="210" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284c7">
                  THEVENIN: Vs = {l16Vs} V in SERIES with Rs = {l16Rs} Ω
                </text>
              </g>
            ) : (
              <g>
                <circle cx="90" cy="85" r="18" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                <text x="90" y="89" textAnchor="middle" fontSize="10" fontWeight="bold">Is={isCurrent.toFixed(1)}A</text>
                <line x1="90" y1="67" x2="210" y2="67" stroke="#78716c" strokeWidth="2" />
                <line x1="90" y1="103" x2="210" y2="103" stroke="#78716c" strokeWidth="2" />
                <rect x="200" y="55" width="20" height="55" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
                <text x="210" y="85" textAnchor="middle" fontSize="8" fontWeight="bold">Rs={l16Rs}Ω</text>
                <line x1="220" y1="67" x2="320" y2="67" stroke="#78716c" strokeWidth="2" />
                <line x1="220" y1="103" x2="320" y2="103" stroke="#78716c" strokeWidth="2" />
                <rect x="320" y="55" width="25" height="55" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                <text x="332" y="85" textAnchor="middle" fontSize="9" fontWeight="bold">RL={l16RL}Ω</text>
                <text x="210" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#059669">
                  NORTON: Is = Vs/Rs = {isCurrent.toFixed(2)} A in PARALLEL with Rs = {l16Rs} Ω
                </text>
              </g>
            )}
          </svg>

          <div className="absolute top-3 right-3 rounded-lg border border-emerald-300 bg-white/95 px-3 py-1.5 shadow-xs font-mono-math text-xs">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">Load Voltage &amp; Current</span>
            <span className="text-sm font-bold text-emerald-800">VL = {vL.toFixed(2)} V</span>
            <span className="text-xs text-stone-700 block">IL = {iL.toFixed(2)} A (Identical in both models!)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Source Vs ({l16Vs} V)</span>
            <input type="range" min="6" max="36" value={l16Vs} onChange={(e) => setL16Vs(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Internal Rs ({l16Rs} Ω)</span>
            <input type="range" min="2" max="20" value={l16Rs} onChange={(e) => setL16Rs(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 space-y-1">
            <span className="text-xs font-semibold text-stone-700">Load RL ({l16RL} Ω)</span>
            <input type="range" min="2" max="30" value={l16RL} onChange={(e) => setL16RL(parseInt(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>
      </div>
    );
  }

  // 17. LESSON 17: Applications of DC Circuits (Automobile Electrical System)
  if (lessonId === 'u1-l17') {
    const batteryCapacity = 12.6;
    const headlightWatts = l17Headlights ? 110 : 0;
    const starterWatts = l17StarterMotor ? 1200 : 0;
    const hornWatts = l17Horn ? 40 : 0;
    const totalWatts = headlightWatts + starterWatts + hornWatts;
    const totalAmps = totalWatts / 12;
    const vDroop = batteryCapacity - totalAmps * 0.02;

    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Automobile 12V DC Vehicle Electrical Distribution Network</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setL17Headlights(!l17Headlights)}
            className={`p-4 rounded-xl border text-left transition-all ${l17Headlights ? 'border-amber-400 bg-amber-50/80 shadow-xs ring-1 ring-amber-400' : 'border-stone-200 bg-stone-50'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Dual Headlights (Parallel)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${l17Headlights ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-600'}`}>
                {l17Headlights ? 'ON (110 W)' : 'OFF'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Draws ~9.1 A current across chassis ground.</p>
          </button>

          <button
            onClick={() => setL17StarterMotor(!l17StarterMotor)}
            className={`p-4 rounded-xl border text-left transition-all ${l17StarterMotor ? 'border-rose-400 bg-rose-50/80 shadow-xs ring-1 ring-rose-400' : 'border-stone-200 bg-stone-50'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Heavy Starter Motor</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${l17StarterMotor ? 'bg-rose-200 text-rose-900' : 'bg-stone-200 text-stone-600'}`}>
                {l17StarterMotor ? 'CRANKING (1.2 kW)' : 'IDLE'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">High inrush current (~100 A) causes battery voltage dip!</p>
          </button>

          <button
            onClick={() => setL17Horn(!l17Horn)}
            className={`p-4 rounded-xl border text-left transition-all ${l17Horn ? 'border-purple-400 bg-purple-50/80 shadow-xs ring-1 ring-purple-400' : 'border-stone-200 bg-stone-50'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Electric Vehicle Horn</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${l17Horn ? 'bg-purple-200 text-purple-900' : 'bg-stone-200 text-stone-600'}`}>
                {l17Horn ? 'BLOWING (40 W)' : 'SILENT'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Momentary solenoid vibration load (~3.3 A).</p>
          </button>
        </div>

        <div className="rounded-xl border border-stone-200 bg-stone-900 p-4 font-mono-math text-emerald-400 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-stone-400 text-xs block">BATTERY TERMINAL VOLTAGE:</span>
            <span className="text-2xl font-bold">{vDroop.toFixed(2)} V</span>
          </div>
          <div>
            <span className="text-stone-400 text-xs block">TOTAL DISCHARGE CURRENT:</span>
            <span className="text-2xl font-bold">{totalAmps.toFixed(1)} A</span>
          </div>
          <div>
            <span className="text-stone-400 text-xs block">TOTAL APPARENT POWER:</span>
            <span className="text-2xl font-bold">{totalWatts} Watts</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // UNIT 2: AC CIRCUIT ANALYSIS LESSONS
  // =========================================================================

  // 18. LESSON u2-l1: AC vs DC
  if (lessonId === 'u2-l1') {
    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">Direct Current (DC) vs Alternating Current (AC) Dual-Waveform Bench</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-sky-200 bg-sky-50/30 p-4 space-y-2">
            <span className="text-xs font-bold text-sky-900 block">Direct Current (DC): Unidirectional Flow</span>
            <svg viewBox="0 0 240 100" className="w-full h-24">
              <line x1="20" y1="50" x2="220" y2="50" stroke="#0284c7" strokeWidth="2.5" />
              <text x="30" y="40" fontSize="10" fontWeight="bold" fill="#0284c7">Constant V = 12 V</text>
            </svg>
            <p className="text-[11px] text-stone-600">Frequency f = 0 Hz. Electrons drift continuously in one single direction.</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-4 space-y-2">
            <span className="text-xs font-bold text-amber-900 block">Alternating Current (AC): 50 Hz Sinusoidal Oscillation</span>
            <svg viewBox="0 0 240 100" className="w-full h-24">
              <path d="M 20 50 Q 70 0 120 50 Q 170 100 220 50" fill="none" stroke="#b45309" strokeWidth="2.5" />
              <text x="30" y="25" fontSize="10" fontWeight="bold" fill="#b45309">50 Hz Sine Wave</text>
            </svg>
            <p className="text-[11px] text-stone-600">Polarity flips 100 times every second. Electrons oscillate back and forth.</p>
          </div>
        </div>

        <ACWaveform3D initialFrequency={50} initialVoltage={230} />
      </div>
    );
  }

  // 19. LESSON u2-l2: RMS and Average Values
  if (lessonId === 'u2-l2') {
    return (
      <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Topic-Specific Simulator</span>
            <h2 className="text-base font-bold text-stone-900">AC Waveform RMS &amp; Average Value Geometric Integrator</h2>
          </div>
        </div>
        <ACWaveform3D initialFrequency={50} initialVoltage={230} />
      </div>
    );
  }

  // 20. LESSON u2-l3: Series RLC & Resonance
  if (lessonId === 'u2-l3') {
    return <ACWaveform3D initialFrequency={50} initialVoltage={230} />;
  }

  // =========================================================================
  // UNIT 3: ELECTRICAL MACHINES AND TRANSFORMERS
  // =========================================================================

  // 21. LESSON u3-l1: Single-Phase Transformers
  if (lessonId === 'u3-l1') {
    return <Transformer3D initialV1={230} initialN1={500} initialN2={100} />;
  }

  // 22. LESSON u3-l2: DC Motors and Generators
  if (lessonId === 'u3-l2') {
    return <Machine3D initialType="dc-motor" />;
  }

  // 23. LESSON u3-l3: Three-Phase Induction Motors
  if (lessonId === 'u3-l3') {
    return <Machine3D initialType="induction-motor" />;
  }

  // =========================================================================
  // UNIT 4: SEMICONDUCTORS AND DEVICES
  // =========================================================================

  // 24. LESSON u4-l1: Semiconductor Physics (Lattice)
  if (lessonId === 'u4-l1') {
    return <DiodeSemiconductor3D initialBias={0.7} />;
  }

  // 25. LESSON u4-l2: P-N Junction Diode Biasing
  if (lessonId === 'u4-l2') {
    return <DiodeSemiconductor3D initialBias={0.75} />;
  }

  // 26. LESSON u4-l3: Rectifiers and Zener Regulators
  if (lessonId === 'u4-l3') {
    return <DiodeSemiconductor3D initialBias={0.8} />;
  }

  // =========================================================================
  // UNIT 5: ELECTRICAL ENERGY GENERATION, DISTRIBUTION AND SAFETY
  // =========================================================================

  // 27. LESSON u5-l1: Power Generation
  if (lessonId === 'u5-l1') {
    return <PowerGrid3D />;
  }

  // 28. LESSON u5-l2: Transmission & Distribution Grid
  if (lessonId === 'u5-l2') {
    return <PowerGrid3D />;
  }

  // 29. LESSON u5-l3: Electrical Safety, Earthing & MCB
  if (lessonId === 'u5-l3') {
    return <PowerGrid3D />;
  }

  // Default fallback
  return <Circuit3DViewer initialVoltage={12} initialResistance={10} />;
};
