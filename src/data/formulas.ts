import { FormulaDefinition } from '../types/beee';

export const FORMULA_DATABASE: FormulaDefinition[] = [
  // --- Unit 1: DC Circuits ---
  {
    id: 'ohms-law-v',
    unitId: 'unit-1',
    name: 'Ohm\'s Law (Voltage Calculation)',
    latex: 'V = I \\times R',
    description: 'Calculates the potential difference across a conductor given current and resistance.',
    category: 'Unit 1: DC Circuits',
    variables: [
      { id: 'i', symbol: 'I', name: 'Electric Current', unit: 'A (Amperes)', defaultValue: 2.5, min: 0.1, max: 100, step: 0.1 },
      { id: 'r', symbol: 'R', name: 'Resistance', unit: 'Ω (Ohms)', defaultValue: 10, min: 0.5, max: 500, step: 0.5 },
    ],
    calculate: (inputs) => {
      const i = inputs.i || 0;
      const r = inputs.r || 0;
      const v = i * r;
      return {
        outputLabel: 'Potential Difference (Voltage)',
        outputSymbol: 'V',
        outputUnit: 'Volts (V)',
        value: Number(v.toFixed(3)),
        steps: [
          `Given Current I = ${i} A and Resistance R = ${r} Ω`,
          `Formula: V = I × R`,
          `Substitution: V = (${i} A) × (${r} Ω)`,
          `Calculation: V = ${v.toFixed(3)} Volts`,
        ],
        sanityCheckNotes: `A current of ${i} A through a ${r} Ω resistor requires a potential difference of ${v.toFixed(2)} V.`,
      };
    },
    commonMistakes: [
      'Mixing up mA with A (e.g. 50 mA must be entered as 0.05 A).',
      'Applying to non-ohmic devices like diodes or transistors.',
    ],
    realLifeExample: 'Calculating battery voltage needed to power an LED headlight drawing 0.75 A through a 16 Ω circuit.',
  },
  {
    id: 'ohms-law-i',
    unitId: 'unit-1',
    name: 'Ohm\'s Law (Current Calculation)',
    latex: 'I = \\frac{V}{R}',
    description: 'Calculates the electric current flowing through a resistor when a voltage is applied.',
    category: 'Unit 1: DC Circuits',
    variables: [
      { id: 'v', symbol: 'V', name: 'Applied Voltage', unit: 'V (Volts)', defaultValue: 12, min: 0.5, max: 500, step: 0.5 },
      { id: 'r', symbol: 'R', name: 'Resistance', unit: 'Ω (Ohms)', defaultValue: 4, min: 0.1, max: 500, step: 0.1 },
    ],
    calculate: (inputs) => {
      const v = inputs.v || 0;
      const r = inputs.r || 1;
      const i = v / r;
      return {
        outputLabel: 'Electric Current',
        outputSymbol: 'I',
        outputUnit: 'Amperes (A)',
        value: Number(i.toFixed(4)),
        steps: [
          `Given Voltage V = ${v} V and Resistance R = ${r} Ω`,
          `Formula: I = V / R`,
          `Substitution: I = (${v} V) / (${r} Ω)`,
          `Calculation: I = ${i.toFixed(4)} Amperes (${(i * 1000).toFixed(1)} mA)`,
        ],
        sanityCheckNotes: `Connecting ${v} V across ${r} Ω draws ${i.toFixed(3)} A. If resistance approaches zero, current approaches dangerous infinity!`,
      };
    },
    commonMistakes: [
      'Entering 0 Ω resistance: this causes division by zero and simulates a short circuit.',
    ],
    realLifeExample: 'Determining the current drawn by a 12 V car audio amplifier connected to a 4 Ω loudspeaker.',
  },
  {
    id: 'electrical-power',
    unitId: 'unit-1',
    name: 'Electrical Power (P = VI)',
    latex: 'P = V \\times I = I^2 R = \\frac{V^2}{R}',
    description: 'Calculates the rate of energy dissipation or work done by an electrical load.',
    category: 'Unit 1: DC Circuits',
    variables: [
      { id: 'v', symbol: 'V', name: 'Voltage', unit: 'V (Volts)', defaultValue: 230, min: 1, max: 500, step: 1 },
      { id: 'i', symbol: 'I', name: 'Current', unit: 'A (Amperes)', defaultValue: 5, min: 0.1, max: 100, step: 0.1 },
    ],
    calculate: (inputs) => {
      const v = inputs.v || 0;
      const i = inputs.i || 0;
      const p = v * i;
      const r = i > 0 ? v / i : 0;
      return {
        outputLabel: 'Electrical Power',
        outputSymbol: 'P',
        outputUnit: 'Watts (W)',
        value: Number(p.toFixed(2)),
        steps: [
          `Given Voltage V = ${v} V and Current I = ${i} A`,
          `Formula: P = V × I`,
          `Substitution: P = (${v} V) × (${i} A)`,
          `Calculation: P = ${p.toFixed(2)} Watts (${(p / 1000).toFixed(3)} kW)`,
          `Equivalent resistance: R = V / I = ${r.toFixed(2)} Ω`,
        ],
        sanityCheckNotes: `At ${v} V and ${i} A, the device converts ${p.toFixed(1)} Joules of energy per second.`,
      };
    },
    commonMistakes: [
      'Confusing Power in Watts with Energy in Watt-hours.',
    ],
    realLifeExample: 'Checking if an electric kettle drawing 9 A on 230 V exceeds a 16 A socket rating.',
  },
  {
    id: 'series-resistors',
    unitId: 'unit-1',
    name: 'Series Resistor Equivalent',
    latex: 'R_{eq} = R_1 + R_2 + R_3',
    description: 'Calculates the equivalent total resistance of three resistors connected in series.',
    category: 'Unit 1: DC Circuits',
    variables: [
      { id: 'r1', symbol: 'R1', name: 'Resistor 1', unit: 'Ω', defaultValue: 10, min: 0.1, max: 1000, step: 1 },
      { id: 'r2', symbol: 'R2', name: 'Resistor 2', unit: 'Ω', defaultValue: 20, min: 0.1, max: 1000, step: 1 },
      { id: 'r3', symbol: 'R3', name: 'Resistor 3', unit: 'Ω', defaultValue: 30, min: 0.1, max: 1000, step: 1 },
    ],
    calculate: (inputs) => {
      const r1 = inputs.r1 || 0;
      const r2 = inputs.r2 || 0;
      const r3 = inputs.r3 || 0;
      const req = r1 + r2 + r3;
      return {
        outputLabel: 'Equivalent Resistance',
        outputSymbol: 'Req',
        outputUnit: 'Ohms (Ω)',
        value: Number(req.toFixed(2)),
        steps: [
          `Given R1 = ${r1} Ω, R2 = ${r2} Ω, R3 = ${r3} Ω in series`,
          `Formula: Req = R1 + R2 + R3`,
          `Calculation: Req = ${r1} + ${r2} + ${r3} = ${req.toFixed(2)} Ω`,
        ],
        sanityCheckNotes: `Req (${req} Ω) is strictly greater than the largest individual resistor (${Math.max(r1, r2, r3)} Ω).`,
      };
    },
    commonMistakes: [
      'Applying the series formula when there is a junction or branch between the resistors.',
    ],
    realLifeExample: 'Calculating total resistance of an extension cable and heating element wired in series.',
  },
  {
    id: 'parallel-resistors',
    unitId: 'unit-1',
    name: 'Parallel Resistor Equivalent (2 Resistors)',
    latex: 'R_{eq} = \\frac{R_1 \\times R_2}{R_1 + R_2}',
    description: 'Calculates equivalent resistance for two resistors connected in parallel across common nodes.',
    category: 'Unit 1: DC Circuits',
    variables: [
      { id: 'r1', symbol: 'R1', name: 'Branch 1 Resistor', unit: 'Ω', defaultValue: 12, min: 0.5, max: 1000, step: 0.5 },
      { id: 'r2', symbol: 'R2', name: 'Branch 2 Resistor', unit: 'Ω', defaultValue: 6, min: 0.5, max: 1000, step: 0.5 },
    ],
    calculate: (inputs) => {
      const r1 = inputs.r1 || 1;
      const r2 = inputs.r2 || 1;
      const req = (r1 * r2) / (r1 + r2);
      return {
        outputLabel: 'Parallel Equivalent Resistance',
        outputSymbol: 'Req',
        outputUnit: 'Ohms (Ω)',
        value: Number(req.toFixed(3)),
        steps: [
          `Given R1 = ${r1} Ω and R2 = ${r2} Ω in parallel`,
          `Formula: Req = (R1 × R2) / (R1 + R2)`,
          `Calculation: Req = (${r1} × ${r2}) / (${r1} + ${r2}) = ${req.toFixed(3)} Ω`,
        ],
        sanityCheckNotes: `Req (${req.toFixed(2)} Ω) is strictly LESS than the smaller individual resistor (${Math.min(r1, r2)} Ω).`,
      };
    },
    commonMistakes: [
      'Adding parallel resistances directly (R1 + R2).',
    ],
    realLifeExample: 'Finding equivalent resistance when two car headlamp bulbs are switched on in parallel.',
  },

  // --- Unit 2: AC Circuits ---
  {
    id: 'ac-rms-peak',
    unitId: 'unit-2',
    name: 'AC RMS & Peak Voltage Relation',
    latex: 'V_{rms} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 V_m',
    description: 'Calculates RMS voltage from peak amplitude or vice versa.',
    category: 'Unit 2: AC Circuits',
    variables: [
      { id: 'vm', symbol: 'Vm', name: 'Peak Voltage (Vm)', unit: 'V', defaultValue: 325.27, min: 10, max: 1000, step: 5 },
    ],
    calculate: (inputs) => {
      const vm = inputs.vm || 0;
      const vrms = vm / Math.SQRT2;
      const vavg = (2 / Math.PI) * vm;
      return {
        outputLabel: 'RMS Voltage (Vrms)',
        outputSymbol: 'Vrms',
        outputUnit: 'Volts (V)',
        value: Number(vrms.toFixed(2)),
        steps: [
          `Given Peak Voltage Vm = ${vm} V`,
          `Formula: Vrms = Vm / √2`,
          `Substitution: Vrms = ${vm} / 1.4142 = ${vrms.toFixed(2)} V`,
          `Half-cycle Average: Vavg = (2/π) × Vm = ${vavg.toFixed(2)} V`,
          `Form Factor: Kf = Vrms / Vavg = 1.11`,
        ],
        sanityCheckNotes: `Peak amplitude of ${vm} V delivers the exact same heating power as a steady DC supply of ${vrms.toFixed(2)} V.`,
      };
    },
    commonMistakes: [
      'Assuming 230 V household sockets peak at 230 V. They actually peak at 325 V!',
    ],
    realLifeExample: 'Sizing capacitor dielectric voltage ratings for a 230 V AC household power supply.',
  },
  {
    id: 'rlc-resonance',
    unitId: 'unit-2',
    name: 'RLC Series Resonant Frequency',
    latex: 'f_r = \\frac{1}{2\\pi \\sqrt{L C}}',
    description: 'Calculates the resonant frequency where XL = XC and impedance is at minimum.',
    category: 'Unit 2: AC Circuits',
    variables: [
      { id: 'l_mH', symbol: 'L', name: 'Inductance', unit: 'mH (milliHenry)', defaultValue: 100, min: 1, max: 2000, step: 10 },
      { id: 'c_uF', symbol: 'C', name: 'Capacitance', unit: 'µF (microFarad)', defaultValue: 10, min: 0.1, max: 500, step: 0.5 },
    ],
    calculate: (inputs) => {
      const l = (inputs.l_mH || 100) * 1e-3;
      const c = (inputs.c_uF || 10) * 1e-6;
      const fr = 1 / (2 * Math.PI * Math.sqrt(l * c));
      return {
        outputLabel: 'Resonant Frequency (fr)',
        outputSymbol: 'fr',
        outputUnit: 'Hertz (Hz)',
        value: Number(fr.toFixed(2)),
        steps: [
          `Inductance L = ${inputs.l_mH} mH = ${l} H`,
          `Capacitance C = ${inputs.c_uF} µF = ${c} F`,
          `Formula: fr = 1 / (2π√(LC))`,
          `Denominator: 2π√( ${l} × ${c} ) = ${(2 * Math.PI * Math.sqrt(l * c)).toExponential(4)}`,
          `Calculation: fr = ${fr.toFixed(2)} Hz`,
        ],
        sanityCheckNotes: `At ${fr.toFixed(1)} Hz, the circuit impedance collapses to pure resistance R, maximizing current!`,
      };
    },
    commonMistakes: [
      'Forgetting to convert milliHenry (10⁻³) and microFarad (10⁻⁶) into base Henry and Farad units.',
    ],
    realLifeExample: 'Tuning an LC radio antenna circuit to lock onto a 1 MHz AM radio transmission.',
  },

  // --- Unit 3: Transformers & Machines ---
  {
    id: 'transformer-turns-ratio',
    unitId: 'unit-3',
    name: 'Transformer Voltage & Turns Ratio',
    latex: '\\frac{V_2}{V_1} = \\frac{N_2}{N_1} = \\frac{I_1}{I_2}',
    description: 'Calculates secondary voltage and current given primary ratings and turns count.',
    category: 'Unit 3: Electrical Machines',
    variables: [
      { id: 'v1', symbol: 'V1', name: 'Primary Voltage', unit: 'V', defaultValue: 230, min: 10, max: 11000, step: 10 },
      { id: 'n1', symbol: 'N1', name: 'Primary Turns', unit: 'turns', defaultValue: 460, min: 10, max: 5000, step: 10 },
      { id: 'n2', symbol: 'N2', name: 'Secondary Turns', unit: 'turns', defaultValue: 24, min: 2, max: 5000, step: 2 },
    ],
    calculate: (inputs) => {
      const v1 = inputs.v1 || 230;
      const n1 = inputs.n1 || 1;
      const n2 = inputs.n2 || 1;
      const k = n2 / n1;
      const v2 = v1 * k;
      return {
        outputLabel: 'Secondary Voltage (V2)',
        outputSymbol: 'V2',
        outputUnit: 'Volts (V)',
        value: Number(v2.toFixed(2)),
        steps: [
          `Given V1 = ${v1} V, N1 = ${n1} turns, N2 = ${n2} turns`,
          `Transformation Ratio K = N2 / N1 = ${n2} / ${n1} = ${k.toFixed(4)}`,
          `Formula: V2 = V1 × K`,
          `Calculation: V2 = ${v1} × ${k.toFixed(4)} = ${v2.toFixed(2)} V`,
          `Operating Mode: ${v2 < v1 ? 'STEP-DOWN (Voltage decreases, Current increases)' : 'STEP-UP (Voltage increases, Current decreases)'}`,
        ],
        sanityCheckNotes: `Power is conserved: V1 × I1 ≈ V2 × I2. A step-down transformer delivers higher output current.`,
      };
    },
    commonMistakes: [
      'Inverting the ratio (N1/N2 instead of N2/N1).',
      'Thinking a transformer can step up voltage and current simultaneously.',
    ],
    realLifeExample: 'Stepping down 230 V household AC down to 12 V for smart doorbell or landscape lighting.',
  },
  {
    id: 'induction-motor-slip',
    unitId: 'unit-3',
    name: 'Induction Motor Speed & Slip',
    latex: 'N_s = \\frac{120 f}{P} \\quad \\text{and} \\quad s = \\frac{N_s - N}{N_s}',
    description: 'Calculates synchronous speed, slip, and actual rotor speed for a 3-phase induction motor.',
    category: 'Unit 3: Electrical Machines',
    variables: [
      { id: 'poles', symbol: 'P', name: 'Stator Poles (Even)', unit: 'poles', defaultValue: 4, min: 2, max: 12, step: 2 },
      { id: 'freq', symbol: 'f', name: 'Supply Frequency', unit: 'Hz', defaultValue: 50, min: 25, max: 100, step: 5 },
      { id: 'speed', symbol: 'N', name: 'Rotor Speed', unit: 'RPM', defaultValue: 1440, min: 200, max: 3600, step: 10 },
    ],
    calculate: (inputs) => {
      const p = inputs.poles || 4;
      const f = inputs.freq || 50;
      const n = inputs.speed || 1440;
      const ns = (120 * f) / p;
      const s = (ns - n) / ns;
      const fr = s * f;
      return {
        outputLabel: 'Motor Slip (s)',
        outputSymbol: 's',
        outputUnit: 'Fraction (% in steps)',
        value: Number(s.toFixed(4)),
        steps: [
          `Synchronous Speed: Ns = 120 × f / P = (120 × ${f}) / ${p} = ${ns} RPM`,
          `Actual Rotor Speed: N = ${n} RPM`,
          `Slip: s = (Ns - N) / Ns = (${ns} - ${n}) / ${ns} = ${s.toFixed(4)} (${(s * 100).toFixed(2)}%)`,
          `Rotor Current Frequency: fr = s × f = ${(s * f).toFixed(2)} Hz`,
        ],
        sanityCheckNotes: `Normal induction motors operate with 2% to 5% slip. If the rotor ever reached synchronous speed (${ns} RPM), torque would drop to zero.`,
      };
    },
    commonMistakes: [
      'Assuming synchronous speed is the actual speed of the shaft. The shaft always lags behind due to slip.',
    ],
    realLifeExample: 'A 4-pole 50 Hz industrial water pump motor rated for 1440 RPM has 4% full-load slip.',
  },

  // --- Unit 4: Semiconductors ---
  {
    id: 'diode-rectifier-dc',
    unitId: 'unit-4',
    name: 'Full-Wave Bridge Rectifier Output',
    latex: 'V_{dc} = \\frac{2 V_m}{\\pi} \\approx 0.637 V_m',
    description: 'Calculates the DC average output voltage produced by a full-wave diode bridge.',
    category: 'Unit 4: Semiconductors',
    variables: [
      { id: 'vrms', symbol: 'Vrms', name: 'Transformer Secondary Voltage', unit: 'V', defaultValue: 24, min: 2, max: 230, step: 1 },
    ],
    calculate: (inputs) => {
      const vrms = inputs.vrms || 24;
      const vm = vrms * Math.SQRT2;
      const vdc = (2 * vm) / Math.PI;
      const rippleFreq = 100; // 2 * 50Hz
      return {
        outputLabel: 'Average DC Output Voltage',
        outputSymbol: 'Vdc',
        outputUnit: 'Volts (V)',
        value: Number(vdc.toFixed(2)),
        steps: [
          `AC Secondary RMS Voltage: Vrms = ${vrms} V`,
          `Peak AC Voltage: Vm = Vrms × √2 = ${vrms} × 1.414 = ${vm.toFixed(2)} V`,
          `Full-Wave Formula: Vdc = 2Vm / π = (2 × ${vm.toFixed(2)}) / 3.1416 = ${vdc.toFixed(2)} V`,
          `Maximum Theoretical Efficiency: 81.2%`,
          `Ripple Frequency: 2 × 50 Hz = ${rippleFreq} Hz`,
        ],
        sanityCheckNotes: `Accounting for the ~1.4 V silicon diode pair drop, practical DC output will be approximately ${(vdc - 1.4).toFixed(2)} V.`,
      };
    },
    commonMistakes: [
      'Forgetting that full-wave ripple frequency doubles (100 Hz for 50 Hz mains).',
    ],
    realLifeExample: 'Converting 24 V AC transformer output into 21.6 V DC inside an audio power amplifier.',
  },

  // --- Unit 5: Generation & Safety ---
  {
    id: 'hydro-power-gen',
    unitId: 'unit-5',
    name: 'Hydroelectric Power Output',
    latex: 'P = \\eta \\cdot \\rho \\cdot g \\cdot Q \\cdot H',
    description: 'Calculates generated electrical power from water head and volumetric flow rate.',
    category: 'Unit 5: Power & Safety',
    variables: [
      { id: 'head_h', symbol: 'H', name: 'Water Head (Height)', unit: 'm', defaultValue: 80, min: 5, max: 500, step: 5 },
      { id: 'flow_q', symbol: 'Q', name: 'Flow Rate', unit: 'm³/s', defaultValue: 35, min: 1, max: 500, step: 5 },
      { id: 'eff', symbol: 'η', name: 'Overall Efficiency', unit: '%', defaultValue: 85, min: 50, max: 98, step: 1 },
    ],
    calculate: (inputs) => {
      const h = inputs.head_h || 80;
      const q = inputs.flow_q || 35;
      const eff = (inputs.eff || 85) / 100;
      const rho = 1000;
      const g = 9.81;
      const pWatts = eff * rho * g * q * h;
      const pMw = pWatts / 1e6;
      return {
        outputLabel: 'Electrical Power Output',
        outputSymbol: 'P',
        outputUnit: 'Megawatts (MW)',
        value: Number(pMw.toFixed(3)),
        steps: [
          `Water Head H = ${h} m, Flow Q = ${q} m³/s, Efficiency η = ${(eff * 100)}%`,
          `Formula: P = η × ρ × g × Q × H`,
          `Calculation: P = ${eff} × 1000 × 9.81 × ${q} × ${h} = ${pWatts.toFixed(0)} Watts`,
          `In Megawatts: P = ${pMw.toFixed(3)} MW`,
        ],
        sanityCheckNotes: `A ${pMw.toFixed(1)} MW plant can continuously power roughly ${(pMw * 1000).toFixed(0)} homes.`,
      };
    },
    commonMistakes: [
      'Entering efficiency as a whole number (85) without dividing by 100 (0.85).',
    ],
    realLifeExample: 'Calculating electrical power generated by a dam turbine installation.',
  },
];
