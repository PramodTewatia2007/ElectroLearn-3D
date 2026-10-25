import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';

interface Circuit2DFallbackProps {
  voltage: number;
  resistance: number;
  isSwitchClosed: boolean;
  onToggleSwitch?: () => void;
  onVoltageChange?: (v: number) => void;
  onResistanceChange?: (r: number) => void;
}

export const Circuit2DFallback: React.FC<Circuit2DFallbackProps> = ({
  voltage,
  resistance,
  isSwitchClosed,
  onToggleSwitch,
  onVoltageChange,
  onResistanceChange,
}) => {
  const current = isSwitchClosed ? (resistance > 0 ? voltage / resistance : 0) : 0;
  const power = voltage * current;

  return (
    <div className="w-full rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
          <h3 className="text-sm font-bold text-stone-800">2D Electrical Schematic Diagram (Standard Fallback)</h3>
        </div>
        <span className="text-[11px] font-medium text-stone-500">IEEE / IEC Standard Symbols</span>
      </div>

      {/* SVG Circuit Schematic */}
      <div className="relative h-64 w-full rounded-xl border border-amber-100 bg-[#fefdfa] p-2 flex items-center justify-center">
        <svg viewBox="0 0 500 240" className="h-full w-full max-w-lg">
          {/* Defs for markers and dashes */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
            </marker>
          </defs>

          {/* Circuit Loop Wires (Copper Warm) */}
          <rect
            x="80"
            y="40"
            width="340"
            height="160"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
            rx="8"
          />

          {/* Animated Current Path when closed */}
          {isSwitchClosed && current > 0 && (
            <rect
              x="80"
              y="40"
              width="340"
              height="160"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="animate-[dash_1.5s_linear_infinite]"
              rx="8"
            />
          )}

          {/* Left Branch: DC Battery Symbol */}
          <g transform="translate(80, 120)">
            {/* Clear wire break behind battery */}
            <line x1="0" y1="-30" x2="0" y2="30" stroke="#fefdfa" strokeWidth="6" />
            {/* Long thin plate (+) */}
            <line x1="-16" y1="-10" x2="16" y2="-10" stroke="#dc2626" strokeWidth="3" />
            <text x="-28" y="-7" fill="#dc2626" fontSize="12" fontWeight="bold">+</text>
            {/* Short thick plate (-) */}
            <line x1="-9" y1="10" x2="9" y2="10" stroke="#1e293b" strokeWidth="5" />
            <text x="-26" y="14" fill="#1e293b" fontSize="14" fontWeight="bold">-</text>
            <text x="24" y="3" fill="#0369a1" fontSize="12" fontWeight="bold">{voltage} V</text>
          </g>

          {/* Top Branch: Knife Switch */}
          <g transform="translate(250, 40)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#fefdfa" strokeWidth="6" />
            {/* Contact terminals */}
            <circle cx="-20" cy="0" r="3.5" fill="#b45309" />
            <circle cx="20" cy="0" r="3.5" fill="#b45309" />
            {/* Lever Blade */}
            {isSwitchClosed ? (
              <line x1="-20" y1="0" x2="19" y2="0" stroke="#15803d" strokeWidth="3.5" />
            ) : (
              <line x1="-20" y1="0" x2="10" y2="-18" stroke="#dc2626" strokeWidth="3.5" />
            )}
            <text x="-12" y="-14" fill="#576375" fontSize="11" fontWeight="bold">SW1</text>
          </g>

          {/* Right Branch: Resistor / Load */}
          <g transform="translate(420, 120)">
            <line x1="0" y1="-35" x2="0" y2="35" stroke="#fefdfa" strokeWidth="6" />
            {/* Zig-zag resistor symbol */}
            <path
              d="M 0 -30 L 8 -22 L -8 -14 L 8 -6 L -8 2 L 8 10 L -8 18 L 0 26 L 0 30"
              fill="none"
              stroke="#d97706"
              strokeWidth="2.5"
            />
            <text x="14" y="4" fill="#b45309" fontSize="12" fontWeight="bold">{resistance} Ω</text>
          </g>

          {/* Bottom Branch: Ammeter */}
          <g transform="translate(250, 200)">
            <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <text x="-4" y="5" fill="#0284c7" fontSize="14" fontWeight="bold">A</text>
            <text x="-25" y="28" fill="#0369a1" fontSize="11" fontWeight="bold">
              {current.toFixed(2)} A
            </text>
          </g>

          {/* Current Flow Direction Indicator Arrows */}
          {isSwitchClosed && current > 0 && (
            <g>
              <line x1="140" y1="40" x2="180" y2="40" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="420" y1="160" x2="420" y2="180" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="360" y1="200" x2="320" y2="200" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="135" y="32" fill="#d97706" fontSize="10" fontWeight="bold">I (Conventional)</text>
            </g>
          )}
        </svg>
      </div>

      {/* Numerical Summary & Toggles */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="rounded-lg border border-sky-100 bg-sky-50/50 p-2">
          <div className="text-[10px] text-sky-800 font-semibold">Voltage (V)</div>
          <div className="font-mono-math text-sm font-bold text-sky-700">{voltage.toFixed(1)} V</div>
        </div>
        <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-2">
          <div className="text-[10px] text-amber-800 font-semibold">Resistance (R)</div>
          <div className="font-mono-math text-sm font-bold text-amber-700">{resistance.toFixed(1)} Ω</div>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-2">
          <div className="text-[10px] text-emerald-800 font-semibold">Current (I = V/R)</div>
          <div className="font-mono-math text-sm font-bold text-emerald-700">{current.toFixed(2)} A</div>
        </div>
        <div className="rounded-lg border border-purple-100 bg-purple-50/50 p-2">
          <div className="text-[10px] text-purple-800 font-semibold">Power (P = V·I)</div>
          <div className="font-mono-math text-sm font-bold text-purple-700">{power.toFixed(1)} W</div>
        </div>
      </div>
    </div>
  );
};
