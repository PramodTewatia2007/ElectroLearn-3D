import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Zap, AlertTriangle, RefreshCw, Home, Factory } from 'lucide-react';

export const PowerGrid3D: React.FC = () => {
  const [isEarthed, setIsEarthed] = useState(true);
  const [hasFault, setHasFault] = useState(false);
  const [mcbTripped, setMcbTripped] = useState(false);

  // Fault simulation logic
  const handleTriggerFault = () => {
    setHasFault(true);
    if (isEarthed) {
      // High fault current trips MCB in 20 ms
      setTimeout(() => {
        setMcbTripped(true);
      }, 300);
    } else {
      // Dangerous! Un-earthed casing stays energized at 230 V
      setMcbTripped(false);
    }
  };

  const handleReset = () => {
    setHasFault(false);
    setMcbTripped(false);
  };

  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-5">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Grid &amp; Residential Safety Sandbox
          </span>
          <h2 className="text-base font-bold text-stone-900">
            Interactive Earthing, MCB Trip &amp; Electric Shock Simulator
          </h2>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Circuit</span>
        </button>
      </div>

      {/* SVG Interactive Power Flow Diagram */}
      <div className="relative h-64 w-full rounded-xl border border-amber-100 bg-[#fefdfa] p-3 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 600 220" className="h-full w-full max-w-xl">
          {/* Grid Transmission Path */}
          {/* 1. Power Plant */}
          <g transform="translate(40, 110)">
            <rect x="-30" y="-35" width="60" height="70" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            <text x="-22" y="-12" fontSize="10" fontWeight="bold" fill="#334155">GENERATOR</text>
            <text x="-16" y="6" fontSize="12" fontWeight="bold" fill="#0284c7">11 kV</text>
            <text x="-20" y="24" fontSize="9" fill="#64748b">3-Phase AC</text>
          </g>

          {/* Line 1: 11 kV to Step-Up */}
          <line x1="70" y1="110" x2="130" y2="110" stroke="#0284c7" strokeWidth="3" />

          {/* 2. Step-up Transformer Substation */}
          <g transform="translate(160, 110)">
            <circle cx="-12" cy="0" r="16" fill="none" stroke="#d97706" strokeWidth="3" />
            <circle cx="12" cy="0" r="16" fill="none" stroke="#d97706" strokeWidth="3" />
            <text x="-25" y="-24" fontSize="10" fontWeight="bold" fill="#b45309">STEP-UP</text>
            <text x="-24" y="32" fontSize="9" fontWeight="bold" fill="#b45309">400 kV</text>
          </g>

          {/* High Voltage Pylon Line */}
          <line x1="190" y1="110" x2="280" y2="110" stroke="#d97706" strokeWidth="4" strokeDasharray="6 4" />
          <text x="210" y="100" fontSize="10" fontWeight="bold" fill="#b45309">400 kV Transmission</text>

          {/* 3. Distribution Substation Transformer */}
          <g transform="translate(310, 110)">
            <circle cx="-12" cy="0" r="16" fill="none" stroke="#0284c7" strokeWidth="3" />
            <circle cx="12" cy="0" r="16" fill="none" stroke="#0284c7" strokeWidth="3" />
            <text x="-32" y="-24" fontSize="10" fontWeight="bold" fill="#0369a1">STEP-DOWN</text>
            <text x="-24" y="32" fontSize="9" fontWeight="bold" fill="#0369a1">230 V Home</text>
          </g>

          {/* Line to Consumer Distribution Board */}
          <line x1="340" y1="110" x2="420" y2="110" stroke="#0284c7" strokeWidth="3" />

          {/* 4. Consumer Metal Appliance & MCB */}
          <g transform="translate(480, 110)">
            {/* Appliance Metal Body */}
            <rect
              x="-40"
              y="-45"
              width="80"
              height="90"
              rx="8"
              fill={hasFault && !mcbTripped && !isEarthed ? '#fee2e2' : '#f8fafc'}
              stroke={hasFault && !mcbTripped && !isEarthed ? '#dc2626' : '#94a3b8'}
              strokeWidth={hasFault && !mcbTripped && !isEarthed ? '4' : '2'}
            />
            <text x="-32" y="-26" fontSize="10" fontWeight="bold" fill="#334155">WASHING</text>
            <text x="-30" y="-12" fontSize="10" fontWeight="bold" fill="#334155">MACHINE</text>
            <text x="-28" y="8" fontSize="9" fill="#64748b">Metal Body</text>

            {/* Live Wire internal */}
            <line x1="-60" y1="20" x2="-10" y2="20" stroke="#dc2626" strokeWidth="3" />
            {hasFault && (
              <path d="M -10 20 L 0 35 L 20 35" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="3 2" />
            )}

            {/* Earth Wire Connection */}
            {isEarthed && (
              <g>
                <line x1="0" y1="45" x2="0" y2="80" stroke="#16a34a" strokeWidth="4" />
                {/* Earth ground symbol */}
                <line x1="-15" y1="80" x2="15" y2="80" stroke="#16a34a" strokeWidth="3" />
                <line x1="-10" y1="85" x2="10" y2="85" stroke="#16a34a" strokeWidth="2.5" />
                <line x1="-5" y1="90" x2="5" y2="90" stroke="#16a34a" strokeWidth="2" />
                <text x="8" y="75" fontSize="10" fontWeight="bold" fill="#15803d">EARTH</text>
              </g>
            )}
          </g>

          {/* MCB Switch symbol on service entrance */}
          <g transform="translate(390, 110)">
            <rect x="-15" y="-18" width="30" height="36" rx="4" fill="#ffffff" stroke="#334155" strokeWidth="2" />
            <text x="-12" y="-4" fontSize="8" fontWeight="bold" fill="#334155">MCB</text>
            <text x="-10" y="8" fontSize="9" fontWeight="bold" fill={mcbTripped ? '#dc2626' : '#16a34a'}>
              {mcbTripped ? 'TRIP' : 'ON'}
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Controls & Safety Scenario Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario Controls */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-3">
          <span className="text-xs font-bold text-stone-700 uppercase">Interactive Experiment Controls:</span>

          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-800 font-semibold">Protective Earth Wire Status:</span>
            <button
              onClick={() => setIsEarthed(!isEarthed)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isEarthed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isEarthed ? 'Earth Connected (Safe)' : 'Earth Broken / Disconnected'}
            </button>
          </div>

          <button
            onClick={handleTriggerFault}
            disabled={hasFault}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-xs"
          >
            {hasFault ? 'Fault Already Triggered' : '⚡ Simulate Live Wire Touching Metal Casing'}
          </button>
        </div>

        {/* Live Safety Assessment Card */}
        <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-2">
          <span className="text-xs font-bold text-stone-700 uppercase">Live Safety Diagnosis:</span>

          {!hasFault ? (
            <div className="text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-800">Normal Operation:</span>
              <p>Current travels from Phase wire through the motor winding and returns via Neutral wire.</p>
            </div>
          ) : isEarthed ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                <span>LIFE SAVED! MCB Tripped in 18 ms.</span>
              </div>
              <p>
                Because the metal casing was securely earthed, a massive fault current (115 A) surged down the low-resistance earth wire directly into the soil. The MCB detected this instant overcurrent and tripped in under 20 milliseconds, leaving the human user completely safe!
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-950 space-y-1 animate-pulse">
              <div className="flex items-center gap-1.5 font-bold text-red-800">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span>EXTREME DANGER: LETHAL ELECTRIC SHOCK!</span>
              </div>
              <p>
                Because the earth connection was absent, the metal casing became energized at the full 230 V mains potential! If anyone touches the machine, 230 mA passes through their heart, causing fatal electric shock because current was insufficient to trip the 16 A MCB.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
