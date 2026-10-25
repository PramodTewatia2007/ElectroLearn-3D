import React, { useState } from 'react';
import { Circuit3DViewer } from '../Simulations/Circuit3DViewer';
import { Circuit2DFallback } from '../Simulations/Circuit2DFallback';
import { ACWaveform3D } from '../Simulations/ACWaveform3D';
import { Transformer3D } from '../Simulations/Transformer3D';
import { Machine3D } from '../Simulations/Machine3D';
import { DiodeSemiconductor3D } from '../Simulations/DiodeSemiconductor3D';
import { PowerGrid3D } from '../Simulations/PowerGrid3D';
import {
  FlaskConical,
  Layers,
  Gauge,
  Activity,
  RefreshCw,
  Plus,
  Trash2,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ShieldCheck,
  Radio,
  FileSpreadsheet,
} from 'lucide-react';

export type LabExperimentId =
  | 'exp1-dc-circuits'
  | 'exp2-ac-resonance'
  | 'exp3-transformer'
  | 'exp4-machines'
  | 'exp5-semiconductors'
  | 'exp6-safety-grid';

interface ObservationRecord {
  id: number;
  timestamp: string;
  param1: string;
  param2: string;
  reading1: string;
  reading2: string;
  derived: string;
  verification: string;
}

export const VirtualLab: React.FC = () => {
  const [activeExp, setActiveExp] = useState<LabExperimentId>('exp1-dc-circuits');
  const [use3D, setUse3D] = useState(true);

  // Experiment 1 States (DC Circuits)
  const [dcVoltage, setDcVoltage] = useState(12);
  const [dcResistance, setDcResistance] = useState(10);
  const [dcCircuitType, setDcCircuitType] = useState<'single' | 'series' | 'parallel'>('single');
  const [dcSwitchClosed, setDcSwitchClosed] = useState(true);

  // Experiment 2 States (AC Resonance)
  const [acFreq, setAcFreq] = useState(50);
  const [acVoltage, setAcVoltage] = useState(230);

  // Experiment 3 States (Transformer)
  const [transV1, setTransV1] = useState(230);
  const [transN1, setTransN1] = useState(500);
  const [transN2, setTransN2] = useState(100);

  // Experiment 4 States (Machines)
  const [machineType, setMachineType] = useState<'dc-motor' | 'induction-motor'>('dc-motor');

  // Experiment 5 States (Semiconductor Diode)
  const [diodeBias, setDiodeBias] = useState(0.75);

  // Observations log table
  const [observations, setObservations] = useState<ObservationRecord[]>([
    {
      id: 1,
      timestamp: 'Initial Benchmark',
      param1: 'V = 12.0 V',
      param2: 'R = 10.0 Ω',
      reading1: 'I = 1.20 A',
      reading2: 'P = 14.40 W',
      derived: 'V/I = 10.0 Ω',
      verification: 'Matches R (Ohm’s Law verified)',
    },
  ]);

  // Log current reading into observation table
  const handleRecordObservation = () => {
    const time = new Date().toLocaleTimeString();
    let newRecord: ObservationRecord;

    switch (activeExp) {
      case 'exp1-dc-circuits': {
        const I = dcSwitchClosed ? dcVoltage / dcResistance : 0;
        const P = dcVoltage * I;
        newRecord = {
          id: Date.now(),
          timestamp: time,
          param1: `V = ${dcVoltage.toFixed(1)} V`,
          param2: `R = ${dcResistance.toFixed(1)} Ω (${dcCircuitType})`,
          reading1: `I = ${I.toFixed(2)} A`,
          reading2: `P = ${P.toFixed(1)} W`,
          derived: `V/I = ${I > 0 ? (dcVoltage / I).toFixed(1) : '∞'} Ω`,
          verification: I > 0 ? 'Verified V = I·R' : 'Switch Open',
        };
        break;
      }
      case 'exp2-ac-resonance': {
        const L = 0.1;
        const C = 20e-6;
        const fr = 1 / (2 * Math.PI * Math.sqrt(L * C));
        const xl = 2 * Math.PI * acFreq * L;
        const xc = 1 / (2 * Math.PI * acFreq * C);
        const Z = Math.sqrt(30 * 30 + Math.pow(xl - xc, 2));
        newRecord = {
          id: Date.now(),
          timestamp: time,
          param1: `f = ${acFreq} Hz`,
          param2: `V_rms = ${acVoltage} V`,
          reading1: `Z = ${Z.toFixed(1)} Ω`,
          reading2: `I = ${(acVoltage / Z).toFixed(2)} A`,
          derived: `f_r = ${fr.toFixed(1)} Hz`,
          verification: Math.abs(acFreq - fr) < 4 ? 'Near Resonance!' : xl > xc ? 'Inductive' : 'Capacitive',
        };
        break;
      }
      case 'exp3-transformer': {
        const K = transN2 / transN1;
        const V2 = transV1 * K;
        newRecord = {
          id: Date.now(),
          timestamp: time,
          param1: `V1 = ${transV1} V`,
          param2: `N1=${transN1}, N2=${transN2}`,
          reading1: `V2 = ${V2.toFixed(1)} V`,
          reading2: `K = ${K.toFixed(3)}`,
          derived: `V2/V1 = ${(V2 / transV1).toFixed(3)}`,
          verification: V2 > transV1 ? 'Step-Up Mode' : 'Step-Down Mode',
        };
        break;
      }
      case 'exp4-machines': {
        newRecord = {
          id: Date.now(),
          timestamp: time,
          param1: `Type: ${machineType === 'dc-motor' ? 'DC Shunt Motor' : '3-Phase Induction'}`,
          param2: 'Frequency: 50 Hz, P=4',
          reading1: 'Ns = 1500 RPM',
          reading2: 'Nr = 1440 RPM',
          derived: 'Slip s = 4.0%',
          verification: 'Rotor lags stator RMF',
        };
        break;
      }
      case 'exp5-semiconductors': {
        const iD = diodeBias <= 0 ? 0.00001 : diodeBias < 0.6 ? 0.1 : Math.exp((diodeBias - 0.6) * 15) * 5;
        newRecord = {
          id: Date.now(),
          timestamp: time,
          param1: `V_bias = ${diodeBias.toFixed(2)} V`,
          param2: diodeBias >= 0.7 ? 'Forward Conduction' : diodeBias > 0 ? 'Sub-threshold' : 'Reverse Bias',
          reading1: `I_D = ${iD < 1 ? (iD * 1000).toFixed(1) + ' µA' : iD.toFixed(1) + ' mA'}`,
          reading2: diodeBias >= 0.7 ? 'Barrier: 0.0 V' : 'Barrier: 0.7 V',
          derived: `r_d = ${diodeBias > 0.7 ? (26 / iD).toFixed(1) + ' Ω' : 'High'}`,
          verification: diodeBias >= 0.7 ? 'Knee Exceeded (ON)' : 'Depletion Blocking',
        };
        break;
      }
      case 'exp6-safety-grid': {
        newRecord = {
          id: Date.now(),
          timestamp: time,
          param1: 'Fault: Live-to-Casing Contact',
          param2: 'Earth Resistance: 2.0 Ω',
          reading1: 'Fault Current: 115 A',
          reading2: 'MCB Trip Time: 20 ms',
          derived: 'Touch Voltage: 0 V (Safe)',
          verification: 'Earthing protected user!',
        };
        break;
      }
      default:
        return;
    }

    setObservations((prev) => [newRecord, ...prev]);
  };

  const handleClearObservations = () => {
    setObservations([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Lab Banner & Experiment Selector */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 mb-2">
              <FlaskConical className="h-3.5 w-3.5 text-emerald-700" />
              ElectroLearn 3D Virtual Engineering Laboratory
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Interactive BEEE Laboratory Workstation
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Conduct official electrical engineering laboratory experiments with full 3D interactive apparatus, precision live meters, freeze/pause control, and observation data logging.
            </p>
          </div>

          {activeExp === 'exp1-dc-circuits' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUse3D(!use3D)}
                className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 px-3.5 py-2 text-xs font-bold text-stone-800 hover:bg-stone-200 transition-colors shadow-xs"
              >
                <Layers className="h-4 w-4 text-amber-700" />
                <span>{use3D ? 'View 2D Schematic' : 'View 3D Sandbox'}</span>
              </button>
            </div>
          )}
        </div>

        {/* 6 Real BEEE Laboratory Experiments Tabs */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 border-t border-stone-100 pt-4">
          {/* Exp 1 */}
          <button
            onClick={() => setActiveExp('exp1-dc-circuits')}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              activeExp === 'exp1-dc-circuits'
                ? 'border-amber-500 bg-amber-50/70 shadow-xs ring-1 ring-amber-500'
                : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Unit I • Lab 1</span>
            <span className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">Ohm's Law &amp; DC Circuits</span>
            <span className="text-[11px] text-stone-500 mt-1">Series &amp; Parallel V=IR</span>
          </button>

          {/* Exp 2 */}
          <button
            onClick={() => setActiveExp('exp2-ac-resonance')}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              activeExp === 'exp2-ac-resonance'
                ? 'border-sky-500 bg-sky-50/70 shadow-xs ring-1 ring-sky-500'
                : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Unit II • Lab 2</span>
            <span className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">AC Series RLC Resonance</span>
            <span className="text-[11px] text-stone-500 mt-1">Phasors, XL, XC, Z dip</span>
          </button>

          {/* Exp 3 */}
          <button
            onClick={() => setActiveExp('exp3-transformer')}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              activeExp === 'exp3-transformer'
                ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Unit III • Lab 3</span>
            <span className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">Transformer Voltage Ratio</span>
            <span className="text-[11px] text-stone-500 mt-1">N1/N2, Flux, Step-Up/Down</span>
          </button>

          {/* Exp 4 */}
          <button
            onClick={() => setActiveExp('exp4-machines')}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              activeExp === 'exp4-machines'
                ? 'border-purple-500 bg-purple-50/70 shadow-xs ring-1 ring-purple-500'
                : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Unit III • Lab 4</span>
            <span className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">Motor Speed &amp; Slip</span>
            <span className="text-[11px] text-stone-500 mt-1">DC Motor &amp; 3-Phase RMF</span>
          </button>

          {/* Exp 5 */}
          <button
            onClick={() => setActiveExp('exp5-semiconductors')}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              activeExp === 'exp5-semiconductors'
                ? 'border-rose-500 bg-rose-50/70 shadow-xs ring-1 ring-rose-500'
                : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Unit IV • Lab 5</span>
            <span className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">Diode V-I &amp; Rectifier</span>
            <span className="text-[11px] text-stone-500 mt-1">Depletion &amp; 0.7 V Knee</span>
          </button>

          {/* Exp 6 */}
          <button
            onClick={() => setActiveExp('exp6-safety-grid')}
            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
              activeExp === 'exp6-safety-grid'
                ? 'border-teal-500 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Unit V • Lab 6</span>
            <span className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">Earthing &amp; Safety MCB</span>
            <span className="text-[11px] text-stone-500 mt-1">Shock Prevention &amp; Grid</span>
          </button>
        </div>
      </div>

      {/* Main Active Experiment Workbench */}
      <div className="space-y-4">
        {activeExp === 'exp1-dc-circuits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              <div>
                <span className="text-xs font-bold text-amber-900 block">
                  Experiment 1: Verification of Ohm’s Law &amp; Circuit Laws (KCL &amp; KVL)
                </span>
                <span className="text-[11px] text-amber-800">
                  Aim: Measure current I across resistor R as voltage V varies from 1 V to 24 V. Verify that V/I = R.
                </span>
              </div>
              <button
                onClick={handleRecordObservation}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Measurement</span>
              </button>
            </div>

            {use3D ? (
              <Circuit3DViewer
                initialVoltage={dcVoltage}
                initialResistance={dcResistance}
                circuitType={dcCircuitType}
                onValuesChange={(v, r) => {
                  setDcVoltage(v);
                  setDcResistance(r);
                }}
              />
            ) : (
              <Circuit2DFallback
                voltage={dcVoltage}
                resistance={dcResistance}
                isSwitchClosed={dcSwitchClosed}
                onToggleSwitch={() => setDcSwitchClosed(!dcSwitchClosed)}
                onVoltageChange={setDcVoltage}
                onResistanceChange={setDcResistance}
              />
            )}
          </div>
        )}

        {activeExp === 'exp2-ac-resonance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5">
              <div>
                <span className="text-xs font-bold text-sky-900 block">
                  Experiment 2: AC Sinusoidal Waveforms &amp; Series RLC Resonance Frequency
                </span>
                <span className="text-[11px] text-sky-800">
                  Aim: Plot impedance dip and current peak as supply frequency f approaches resonant frequency fr = 1/(2π√LC).
                </span>
              </div>
              <button
                onClick={handleRecordObservation}
                className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-sky-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Measurement</span>
              </button>
            </div>

            <ACWaveform3D initialFrequency={acFreq} initialVoltage={acVoltage} />
          </div>
        )}

        {activeExp === 'exp3-transformer' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">
                  Experiment 3: Single-Phase Transformer Voltage Ratio &amp; Core Mutual Induction
                </span>
                <span className="text-[11px] text-emerald-800">
                  Aim: Verify transformation ratio K = V2 / V1 = N2 / N1 and observe magnetic flux circulation in silicon steel core.
                </span>
              </div>
              <button
                onClick={handleRecordObservation}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Measurement</span>
              </button>
            </div>

            <Transformer3D initialV1={transV1} initialN1={transN1} initialN2={transN2} />
          </div>
        )}

        {activeExp === 'exp4-machines' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5">
              <div>
                <span className="text-xs font-bold text-purple-900 block">
                  Experiment 4: DC Motor Armature Rotation &amp; 3-Phase Induction Motor Slip Analysis
                </span>
                <span className="text-[11px] text-purple-800">
                  Aim: Observe mechanical torque production via commutator/brushes in DC motor and rotating magnetic field (RMF) slip in induction motor.
                </span>
              </div>
              <button
                onClick={handleRecordObservation}
                className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Measurement</span>
              </button>
            </div>

            <Machine3D initialType={machineType} />
          </div>
        )}

        {activeExp === 'exp5-semiconductors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
              <div>
                <span className="text-xs font-bold text-rose-900 block">
                  Experiment 5: Semiconductor P-N Junction Diode V-I Characteristics &amp; Depletion Barrier
                </span>
                <span className="text-[11px] text-rose-800">
                  Aim: Observe depletion barrier collapse at 0.7 V forward bias and conduction blocking under reverse bias.
                </span>
              </div>
              <button
                onClick={handleRecordObservation}
                className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Measurement</span>
              </button>
            </div>

            <DiodeSemiconductor3D initialBias={diodeBias} />
          </div>
        )}

        {activeExp === 'exp6-safety-grid' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5">
              <div>
                <span className="text-xs font-bold text-teal-900 block">
                  Experiment 6: Earthing Protection, MCB Fault Clearing &amp; Electric Shock Hazard Bench
                </span>
                <span className="text-[11px] text-teal-800">
                  Aim: Test residential power protection. Compare touch voltage when casing is solidly earthed (2 Ω) vs un-earthed during phase-to-body fault.
                </span>
              </div>
              <button
                onClick={handleRecordObservation}
                className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Measurement</span>
              </button>
            </div>

            <PowerGrid3D />
          </div>
        )}
      </div>

      {/* Observation Table & Laboratory Report Logging Bench */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-amber-700" />
            <div>
              <h2 className="text-sm font-bold text-stone-900">
                Official Laboratory Observation Log Table
              </h2>
              <p className="text-xs text-stone-500">
                Logged values recorded during experiments for laboratory practical reports and examination viva.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRecordObservation}
              className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-stone-800 shadow-xs"
            >
              <Plus className="h-3.5 w-3.5 text-amber-400" />
              <span>Record Current Reading</span>
            </button>
            {observations.length > 0 && (
              <button
                onClick={handleClearObservations}
                className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 hover:text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Table</span>
              </button>
            )}
          </div>
        </div>

        {observations.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-400">
            No observation data recorded yet. Adjust simulation controls and click <strong>"Record Current Reading"</strong> above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
              <thead className="bg-stone-100 text-stone-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 border-b border-stone-200">#</th>
                  <th className="px-3 py-2 border-b border-stone-200">Timestamp</th>
                  <th className="px-3 py-2 border-b border-stone-200">Input Parameter 1</th>
                  <th className="px-3 py-2 border-b border-stone-200">Input Parameter 2</th>
                  <th className="px-3 py-2 border-b border-stone-200">Primary Reading</th>
                  <th className="px-3 py-2 border-b border-stone-200">Secondary Reading</th>
                  <th className="px-3 py-2 border-b border-stone-200">Calculated Value</th>
                  <th className="px-3 py-2 border-b border-stone-200">Engineering Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono-math">
                {observations.map((obs, idx) => (
                  <tr key={obs.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-stone-400">{observations.length - idx}</td>
                    <td className="px-3 py-2.5 text-stone-500 font-sans">{obs.timestamp}</td>
                    <td className="px-3 py-2.5 font-semibold text-stone-800">{obs.param1}</td>
                    <td className="px-3 py-2.5 text-stone-700">{obs.param2}</td>
                    <td className="px-3 py-2.5 font-bold text-sky-700">{obs.reading1}</td>
                    <td className="px-3 py-2.5 font-bold text-purple-700">{obs.reading2}</td>
                    <td className="px-3 py-2.5 font-bold text-emerald-700">{obs.derived}</td>
                    <td className="px-3 py-2.5 text-stone-700 font-sans text-[11px]">{obs.verification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lab Safety & Good Laboratory Practice (GLP) Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              Circuit Connections Protocol
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Always connect the ammeter in <strong>series</strong> (low internal resistance) and the voltmeter in <strong>parallel</strong> (high internal resistance) across the component under test. Never connect an ammeter directly across a voltage supply!
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              Zero Power Switch Rule
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Before altering wire connections or replacing components, verify that the main supply switch is in the <strong>OFF</strong> position. In this virtual lab, you can pause or disconnect without danger.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              Thermal &amp; Insulation Limits
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Electrical power dissipates as heat according to Joule's Law: \(P = I^2 R\). Resistors and machine windings must never exceed their rated wattage or insulation temperature class.
          </p>
        </div>
      </div>
    </div>
  );
};
