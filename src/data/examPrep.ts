import { EXAM_QUESTIONS_PART2 } from './examQuestionsPart2';
import { EXAM_QUESTIONS_PART3 } from './examQuestionsPart3';

export interface ExamStep {
  stepNumber: number;
  title: string;
  content: string;
  formulaOrMath?: string;
  marksAllocated?: string;
}

export interface ExamQuestion {
  id: string;
  unitNumber: number;
  marks: 2 | 4 | 5 | 6 | 8 | 10;
  category: 'Definition' | 'Short Answer' | 'Long Answer / Derivation' | 'Numerical Problem';
  question: string;
  diagramTitle?: string;
  diagramSvg?: string;
  modelAnswer: string;
  steps?: ExamStep[];
  givenData?: string[];
  finalResult?: string;
  markingScheme: string[];
  examTip: string;
}

const EXAM_QUESTIONS_PART1: ExamQuestion[] = [
  // =========================================================================
  // UNIT 1: DC CIRCUIT ANALYSIS & THEOREMS
  // =========================================================================
  {
    id: 'eq-u1-1',
    unitNumber: 1,
    marks: 2,
    category: 'Definition',
    question: "State Ohm's Law. Write its mathematical equation with units and state its physical limitations.",
    diagramTitle: "Ohm's Law Circuit & Linear V-I Characteristic",
    diagramSvg: `<svg viewBox="0 0 450 160" class="w-full h-auto max-w-md mx-auto">
      <rect x="20" y="20" width="180" height="120" rx="6" fill="none" stroke="#b45309" stroke-width="2" />
      <line x1="20" y1="80" x2="60" y2="80" stroke="#b45309" stroke-width="2" />
      <line x1="60" y1="65" x2="60" y2="95" stroke="#0284c7" stroke-width="3" />
      <line x1="68" y1="72" x2="68" y2="88" stroke="#0284c7" stroke-width="1.5" />
      <text x="56" y="55" font-size="10" font-weight="bold" fill="#0284c7">+ V -</text>
      <rect x="150" y="65" width="40" height="30" rx="3" fill="#fef3c7" stroke="#b45309" stroke-width="2" />
      <text x="162" y="84" font-size="11" font-weight="bold" fill="#92400e">R</text>
      <circle cx="110" cy="20" r="14" fill="#ecfdf5" stroke="#059669" stroke-width="2" />
      <text x="105" y="24" font-size="11" font-weight="bold" fill="#059669">A</text>
      <line x1="260" y1="130" x2="420" y2="130" stroke="#78716c" stroke-width="1.5" />
      <line x1="260" y1="130" x2="260" y2="20" stroke="#78716c" stroke-width="1.5" />
      <text x="410" y="145" font-size="10" fill="#78716c">I (Amps)</text>
      <text x="235" y="25" font-size="10" fill="#78716c">V (Volts)</text>
      <line x1="260" y1="130" x2="410" y2="35" stroke="#b45309" stroke-width="2.5" />
      <text x="350" y="70" font-size="10" font-weight="bold" fill="#b45309">Slope = R = ΔV / ΔI</text>
    </svg>`,
    modelAnswer: `Statement:
Ohm's Law states that, at constant temperature and under unchanged physical conditions (such as mechanical strain and cross-sectional area), the electric current (I) flowing through a conducting material is directly proportional to the potential difference (V) applied across its terminals.

Mathematical Formulation:
V ∝ I   ==>   V = I · R
Where:
• V = Potential difference across the conductor in Volts (V)
• I = Electric current flowing through the conductor in Amperes (A)
• R = Electrical resistance of the conductor in Ohms (Ω)

Physical Limitations (Where Ohm's Law Fails):
1. Non-Ohmic / Non-Linear Devices: Semiconductor devices such as P-N junction diodes, Zener diodes, bipolar junction transistors (BJTs), and LEDs do not have a constant resistance; their V-I characteristics are non-linear curves.
2. Unilateral Elements: Devices that conduct in only one direction (e.g. diodes) violate Ohm's law.
3. Temperature Dependent Conductors: Incandescent filament lamps and carbon resistors change resistance significantly as temperature rises due to Joule heating (P = I²R).
4. Gas Discharge Tubes & Electrolytes: Gases ionized under high electric fields do not exhibit a constant linear resistance.`,
    markingScheme: [
      'Accurate statement specifying "at constant temperature and physical dimensions" (0.5 Mark)',
      'Mathematical formula V = I·R with all symbols and SI units clearly identified (0.5 Mark)',
      'Any two valid physical limitations / non-linear device examples (1.0 Mark)',
    ],
    examTip: 'Examiners strictly look for the condition "at constant temperature and physical conditions". Forgetting this condition will cost you 0.5 marks.',
  },

  {
    id: 'eq-u1-2',
    unitNumber: 1,
    marks: 2,
    category: 'Definition',
    question: "State Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL). State the fundamental conservation principles on which each is based.",
    diagramTitle: 'KCL Node & KVL Closed Loop',
    diagramSvg: `<svg viewBox="0 0 450 150" class="w-full h-auto max-w-md mx-auto">
      <circle cx="90" cy="75" r="5" fill="#b45309" />
      <line x1="20" y1="30" x2="88" y2="73" stroke="#0284c7" stroke-width="2" />
      <text x="35" y="45" font-size="10" font-weight="bold" fill="#0284c7">I1 (In)</text>
      <line x1="20" y1="120" x2="88" y2="77" stroke="#0284c7" stroke-width="2" />
      <text x="35" y="115" font-size="10" font-weight="bold" fill="#0284c7">I2 (In)</text>
      <line x1="92" y1="73" x2="160" y2="30" stroke="#b45309" stroke-width="2" />
      <text x="125" y="45" font-size="10" font-weight="bold" fill="#b45309">I3 (Out)</text>
      <line x1="92" y1="77" x2="160" y2="120" stroke="#b45309" stroke-width="2" />
      <text x="125" y="115" font-size="10" font-weight="bold" fill="#b45309">I4 (Out)</text>
      <text x="45" y="145" font-size="10" font-weight="bold" fill="#78716c">KCL: I1 + I2 = I3 + I4</text>
      <rect x="250" y="25" width="160" height="95" rx="6" fill="none" stroke="#059669" stroke-width="2" />
      <text x="235" y="75" font-size="10" font-weight="bold" fill="#0284c7">+Vs-</text>
      <text x="320" y="20" font-size="10" font-weight="bold" fill="#b45309">- I·R1 +</text>
      <text x="320" y="135" font-size="10" font-weight="bold" fill="#b45309">- I·R2 +</text>
      <text x="280" y="145" font-size="10" font-weight="bold" fill="#78716c">KVL: Σ V = 0 around loop</text>
    </svg>`,
    modelAnswer: `1. Kirchhoff's Current Law (KCL) — First Law:
• Statement: The algebraic sum of all electric currents meeting at any electrical junction or node in a circuit is identically zero.
• Alternate Statement: The sum of currents entering a node is exactly equal to the sum of currents leaving that node.
• Mathematical Equation: ∑ I_in = ∑ I_out   or   ∑_(k=1)^N I_k = 0
• Underlying Physical Principle: Law of Conservation of Electric Charge. Charge cannot accumulate or be destroyed at an infinitesimal point.

2. Kirchhoff's Voltage Law (KVL) — Second Law:
• Statement: The algebraic sum of all electromotive forces (EMFs / voltage sources) and potential differences (voltage drops across passive elements) around any closed electrical circuit loop is zero.
• Mathematical Equation: ∑_(k=1)^M V_k = 0   or   ∑ E = ∑ (I · R)
• Sign Convention: A potential rise (traversing negative to positive terminal) is taken as positive (+), while a potential drop across a resistor in the direction of current is taken as negative (-).
• Underlying Physical Principle: Law of Conservation of Energy. Electric electrostatic forces are conservative; taking a unit charge around a closed path does net zero work.`,
    markingScheme: [
      'KCL statement, equation, and Conservation of Charge (1.0 Mark)',
      'KVL statement, equation, and Conservation of Energy (1.0 Mark)',
    ],
    examTip: 'Always name the conservation laws: KCL = Conservation of Charge, KVL = Conservation of Energy. Writing just the equations without mentioning the conservation principles results in 1 mark loss.',
  },

  {
    id: 'eq-u1-active-passive',
    unitNumber: 1,
    marks: 2,
    category: 'Definition',
    question: 'Differentiate between Active and Passive circuit elements. Give two suitable examples of each.',
    diagramTitle: 'Active Energy Sources vs Passive Energy Consumers/Storers',
    diagramSvg: `<svg viewBox="0 0 450 140" class="w-full h-auto max-w-md mx-auto">
      <rect x="30" y="20" width="180" height="100" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
      <text x="50" y="45" font-size="12" font-weight="bold" fill="#1d4ed8">ACTIVE ELEMENTS</text>
      <text x="45" y="70" font-size="10" fill="#1e3a8a">• Generates energy indefinitely</text>
      <text x="45" y="90" font-size="10" fill="#1e3a8a">• Examples: Batteries, Op-Amps</text>
      <text x="45" y="110" font-size="10" font-weight="bold" fill="#0284c7">Delivers Net Power (P > 0)</text>
      <rect x="240" y="20" width="180" height="100" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="2" />
      <text x="260" y="45" font-size="12" font-weight="bold" fill="#854d0e">PASSIVE ELEMENTS</text>
      <text x="255" y="70" font-size="10" fill="#713f12">• Dissipates or stores energy</text>
      <text x="255" y="90" font-size="10" fill="#713f12">• Examples: Resistors, L, C</text>
      <text x="255" y="110" font-size="10" font-weight="bold" fill="#b45309">Absorbs Net Power (P ≥ 0)</text>
    </svg>`,
    modelAnswer: `Difference between Active and Passive Elements:

1. Active Elements:
• Definition: Circuit components that possess internal energy and are capable of generating, delivering, or continuously amplifying electrical energy in a circuit over an indefinite period.
• Energy Behavior: They act as energy donors (sources) and have the ability to control the flow of electric charge.
• Power Gain: Capable of providing electric power gain or voltage amplification (Gain > 1).
• Examples:
  1. Independent DC Voltage Sources (Electrochemical Lead-Acid battery, DC Dynamo).
  2. Independent Current Sources (Solar Photovoltaic Cell).
  3. Controlled electronic amplifiers (Bipolar Junction Transistors, Operational Amplifiers).

2. Passive Elements:
• Definition: Circuit components that cannot generate energy on their own; they either permanently dissipate electrical energy as heat or temporarily store energy in magnetic or electric fields.
• Energy Behavior: They act as energy absorbers or temporary energy reservoirs.
• Power Gain: Incapable of amplifying signals; power gain is strictly ≤ 1.
• Examples:
  1. Resistors (R): Permanently converts electrical energy into thermal heat via Joule's Law: P = I²R.
  2. Inductors (L): Stores energy in an electromagnetic field: E_L = ½ L I².
  3. Capacitors (C): Stores energy in an electrostatic field: E_C = ½ C V².`,
    markingScheme: [
      'Accurate definition of Active element with two valid examples (1.0 Mark)',
      'Accurate definition of Passive element with two valid examples (1.0 Mark)',
    ],
    examTip: 'Transistors (BJT/FET) and Op-Amps are ACTIVE elements because they can amplify signal power using external DC bias supplies.',
  },

  {
    id: 'eq-u1-dependent-sources',
    unitNumber: 1,
    marks: 5,
    category: 'Short Answer',
    question: 'Differentiate between Independent and Dependent (Controlled) electrical sources. Enumerate the four types of dependent sources with their standard symbolic diagrams and mathematical equations.',
    diagramTitle: 'Four Standard Types of Dependent (Controlled) Sources',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <!-- VCVS -->
      <polygon points="60,20 85,45 60,70 35,45" fill="#fef3c7" stroke="#b45309" stroke-width="2" />
      <text x="60" y="43" text-anchor="middle" font-size="9" font-weight="bold" fill="#0284c7">+ -</text>
      <text x="60" y="90" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">VCVS: μ·Vx</text>
      <!-- CCVS -->
      <polygon points="180,20 205,45 180,70 155,45" fill="#fef3c7" stroke="#b45309" stroke-width="2" />
      <text x="180" y="43" text-anchor="middle" font-size="9" font-weight="bold" fill="#0284c7">+ -</text>
      <text x="180" y="90" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">CCVS: r·Ix</text>
      <!-- VCCS -->
      <polygon points="300,20 325,45 300,70 275,45" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <line x1="300" y1="30" x2="300" y2="60" stroke="#0284c7" stroke-width="2" />
      <text x="300" y="90" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">VCCS: gm·Vx</text>
      <!-- CCCS -->
      <polygon points="420,20 445,45 420,70 395,45" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <line x1="420" y1="30" x2="420" y2="60" stroke="#0284c7" stroke-width="2" />
      <text x="420" y="90" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">CCCS: β·Ix</text>
    </svg>`,
    modelAnswer: `1. Independent vs Dependent Sources:
• Independent Source: An active electrical source (voltage or current) whose terminal value is completely independent of all other voltages or currents elsewhere in the network. Represented schematically by a CIRCLE.
• Dependent (Controlled) Source: An electrical source whose output voltage or current magnitude is governed, scaled, or dictated by a voltage or current existing in another branch of the circuit. Represented schematically by a DIAMOND.

--------------------------------------------------------------------------------

2. Four Classifications of Dependent Sources:

(a) Voltage-Controlled Voltage Source (VCVS):
• Output is a voltage proportional to a control voltage V_x in another branch.
• Equation: V = μ · V_x
• Scaling Factor μ: Dimensionless voltage gain constant.

(b) Current-Controlled Voltage Source (CCVS):
• Output is a voltage proportional to a control current I_x in another branch.
• Equation: V = r · I_x
• Scaling Factor r: Transresistance constant, measured in Ohms (Ω).

(c) Voltage-Controlled Current Source (VCCS):
• Output is a current proportional to a control voltage V_x in another branch.
• Equation: I = g_m · V_x
• Scaling Factor g_m: Transconductance constant, measured in Siemens (S) or mho.

(d) Current-Controlled Current Source (CCCS):
• Output is a current proportional to a control current I_x in another branch.
• Equation: I = β · I_x (or α · I_x)
• Scaling Factor β: Dimensionless current gain constant (e.g., in a BJT transistor, I_c = β · I_b).`,
    markingScheme: [
      'Clear definition distinguishing independent (circle) vs dependent (diamond) sources (1.0 Mark)',
      'Identification, sketches, equations, and scaling units for all 4 types (1.0 Mark each = 4.0 Marks)',
    ],
    examTip: 'Always draw diamond shapes for dependent sources. Drawing a circle for a dependent source is an automatic loss of marks.',
  },

  {
    id: 'eq-u1-dc-capacitor-inductor',
    unitNumber: 1,
    marks: 2,
    category: 'Short Answer',
    question: 'Point out the behavior of an ideal capacitor and an ideal inductor when connected across a steady-state DC excitation. Show their symbolic representations.',
    diagramTitle: 'Ideal Inductor & Capacitor Behavior under Steady-State DC',
    diagramSvg: `<svg viewBox="0 0 450 140" class="w-full h-auto max-w-md mx-auto">
      <rect x="20" y="20" width="190" height="100" rx="6" fill="#f0fdf4" stroke="#059669" stroke-width="1.5" />
      <text x="35" y="42" font-size="11" font-weight="bold" fill="#047857">INDUCTOR UNDER DC</text>
      <path d="M 40 75 Q 50 60 60 75 Q 70 60 80 75 Q 90 60 100 75" fill="none" stroke="#059669" stroke-width="2" />
      <line x1="120" y1="75" x2="180" y2="75" stroke="#059669" stroke-width="3" />
      <text x="35" y="105" font-size="10" font-weight="bold" fill="#047857">Acts as a SHORT CIRCUIT (V = 0)</text>
      <rect x="240" y="20" width="190" height="100" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5" />
      <text x="255" y="42" font-size="11" font-weight="bold" fill="#b91c1c">CAPACITOR UNDER DC</text>
      <line x1="260" y1="75" x2="285" y2="75" stroke="#dc2626" stroke-width="2" />
      <line x1="285" y1="65" x2="285" y2="85" stroke="#dc2626" stroke-width="2.5" />
      <line x1="295" y1="65" x2="295" y2="85" stroke="#dc2626" stroke-width="2.5" />
      <line x1="295" y1="75" x2="320" y2="75" stroke="#dc2626" stroke-width="2" />
      <text x="255" y="105" font-size="10" font-weight="bold" fill="#b91c1c">Acts as an OPEN CIRCUIT (I = 0)</text>
    </svg>`,
    modelAnswer: `1. Behavior of an Ideal Inductor under Steady-State DC:
• Governing Equation: v_L(t) = L · (di / dt)
• Under steady-state DC, current I is constant with time: di / dt = 0.
• Therefore, the voltage drop across the inductor is zero: v_L = L · (0) = 0 V.
• Conclusion: An ideal inductor acts as an electrical SHORT CIRCUIT (zero resistance wire) under steady-state DC excitation.

2. Behavior of an Ideal Capacitor under Steady-State DC:
• Governing Equation: i_C(t) = C · (dv / dt)
• Under steady-state DC, voltage V across the capacitor plates is constant: dv / dt = 0.
• Therefore, the current flowing through the dielectric is zero: i_C = C · (0) = 0 A.
• Conclusion: An ideal capacitor acts as an electrical OPEN CIRCUIT (infinite resistance break) under steady-state DC excitation once fully charged.`,
    markingScheme: [
      'Mathematical proof of inductor as short circuit v_L = L(di/dt) = 0 (1.0 Mark)',
      'Mathematical proof of capacitor as open circuit i_C = C(dv/dt) = 0 (1.0 Mark)',
    ],
    examTip: 'Remember to mention "under steady-state conditions". During transient switching instants (t = 0+), an uncharged capacitor acts as a short circuit and an un-energized inductor acts as an open circuit.',
  },

  {
    id: 'eq-u1-superposition',
    unitNumber: 1,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'State the Superposition Theorem. State its physical conditions and explain why it is NOT applicable for computing electrical power. Using the superposition theorem, find the current flowing through the 3 Ω resistor in a circuit with a 20 V voltage source in series with 5 Ω, connected to a 3 Ω shunt resistor and a 5 A current source in parallel with 10 Ω.',
    diagramTitle: 'Superposition Circuit & Sub-circuit Decompositions',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <rect x="30" y="25" width="440" height="110" rx="8" fill="#fdfbf7" stroke="#78716c" stroke-width="2" />
      <!-- Source 1 -->
      <circle cx="65" cy="80" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <text x="65" y="84" text-anchor="middle" font-size="9" font-weight="bold">20V</text>
      <!-- 5 Ohm -->
      <rect x="110" y="40" width="35" height="16" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="120" y="52" font-size="9" font-weight="bold">5Ω</text>
      <!-- 3 Ohm Target -->
      <rect x="220" y="60" width="16" height="40" fill="#fee2e2" stroke="#dc2626" stroke-width="2" />
      <text x="228" y="84" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">3Ω</text>
      <!-- 10 Ohm -->
      <rect x="330" y="40" width="35" height="16" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="340" y="52" font-size="9" font-weight="bold">10Ω</text>
      <!-- Source 2 -->
      <circle cx="430" cy="80" r="14" fill="#ecfdf5" stroke="#059669" stroke-width="2" />
      <text x="430" y="84" text-anchor="middle" font-size="9" font-weight="bold">5A</text>
      <!-- Target Arrow -->
      <text x="228" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Target: I_3Ω</text>
    </svg>`,
    modelAnswer: `1. Statement of Superposition Theorem:
In any linear, bilateral electrical network containing two or more independent sources, the response (voltage or current) in any branch is the algebraic sum of the individual responses caused by each independent source acting alone, while all other independent sources are deactivated (de-energized).

Deactivation Protocol:
• Independent Voltage Sources are replaced by their internal resistance (a SHORT CIRCUIT for ideal source, V = 0).
• Independent Current Sources are replaced by their internal resistance (an OPEN CIRCUIT for ideal source, I = 0).

Why Superposition is NOT Applicable for Power Calculations:
Superposition is strictly a LINEAR property: f(x₁ + x₂) = f(x₁) + f(x₂).
Electrical power is a QUADRATIC, non-linear relationship:
   P = I² · R   or   P = V² / R
Since (I₁ + I₂)² = I₁² + I₂² + 2·I₁·I₂ ≠ I₁² + I₂², the total power is NOT equal to the sum of individual powers!
Rule: One must first find total current I = I₁ + I₂ using superposition, and THEN calculate total power P = I²R.

--------------------------------------------------------------------------------

2. STEP-BY-STEP NUMERICAL SOLUTION:
Find current I_3Ω flowing downward through the 3 Ω resistor.

Case 1: Considering ONLY the 20 V voltage source (Deactivate 5 A current source -> Open Circuit):
• With 5 A source open-circuited, the 10 Ω resistor is in an open branch and carries zero current.
• The circuit simplifies to 20 V connected across series combination of 5 Ω and 3 Ω:
   R_total1 = 5 Ω + 3 Ω = 8 Ω
   I' = 20 V / 8 Ω = 2.50 A (flowing downward through 3 Ω).

Case 2: Considering ONLY the 5 A current source (Deactivate 20 V voltage source -> Short Circuit):
• The 5 Ω resistor is now connected in parallel with the 3 Ω resistor across ground.
• Equivalent parallel resistance of 5 Ω and 3 Ω:
   R_p = (5 · 3) / (5 + 3) = 15 / 8 = 1.875 Ω
• By Current Division Rule between (5||3) branch and other branches, the 5 A incoming current splits:
   Current through 3 Ω branch:
   I'' = 5 A · [ 5 / (5 + 3) ] = 5 · (5 / 8) = 25 / 8 = 3.125 A (flowing downward).

Case 3: Total Combined Current (Algebraic Sum):
Since both component currents I' and I'' flow in the same direction (downward):
   I_total = I' + I'' = 2.50 A + 3.125 A = 5.625 A downward.

Power in 3 Ω Resistor:
   P = (I_total)² · R = (5.625)² · 3 = 31.64 · 3 = 94.92 Watts.`,
    givenData: ['V_s = 20 V', 'I_s = 5 A', 'R₁ = 5 Ω', 'R_load = 3 Ω', 'R₂ = 10 Ω'],
    finalResult: 'I_3Ω = 5.625 A (downward), P_3Ω = 94.92 W',
    markingScheme: [
      'Statement of Superposition Theorem and source deactivation rules (1.5 Marks)',
      'Explanation of why theorem fails for non-linear power P = I²R (1.0 Mark)',
      'Sub-circuit 1 calculation (20 V alone: I\' = 2.50 A) (1.0 Mark)',
      'Sub-circuit 2 calculation (5 A alone: I\'\' = 3.125 A) (1.0 Mark)',
      'Final sum I = 5.625 A and power calculation (0.5 Mark)',
    ],
    examTip: 'Never calculate P₁ from source 1 and P₂ from source 2 and add them! Examiners deliberately test this common student pitfall.',
  },

  {
    id: 'eq-u1-thevenin-bridge-numerical',
    unitNumber: 1,
    marks: 10,
    category: 'Numerical Problem',
    question: 'Utilize Thevenin\'s Theorem to determine the current flowing through the 15 Ω load resistor connected between nodes C and D in the dual-source bridge network shown below: Left branch has 400 V source in series with 20 Ω and 80 Ω; Right branch has 200 V source in series with 10 Ω and 90 Ω; Load 15 Ω is connected between the midpoints.',
    diagramTitle: 'Dual-Source Bridge Network for Thevenin Analysis',
    diagramSvg: `<svg viewBox="0 0 500 170" class="w-full h-auto max-w-lg mx-auto">
      <rect x="40" y="20" width="420" height="130" rx="8" fill="#fdfbf7" stroke="#78716c" stroke-width="2" />
      <text x="50" y="45" font-size="10" font-weight="bold" fill="#0284c7">400 V</text>
      <rect x="120" y="25" width="40" height="18" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="130" y="38" font-size="9" font-weight="bold">20 Ω</text>
      <!-- Midpoint C -->
      <circle cx="190" cy="50" r="5" fill="#ef4444" />
      <text x="185" y="42" font-size="10" font-weight="bold" fill="#ef4444">C</text>
      <rect x="180" y="75" width="20" height="40" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="190" y="98" text-anchor="middle" font-size="9" font-weight="bold">80 Ω</text>
      <!-- Load 15 Ohm -->
      <line x1="195" y1="50" x2="305" y2="50" stroke="#dc2626" stroke-width="2.5" />
      <rect x="235" y="40" width="40" height="20" fill="#fee2e2" stroke="#dc2626" stroke-width="2" />
      <text x="245" y="54" font-size="10" font-weight="bold" fill="#dc2626">15 Ω</text>
      <!-- Midpoint D -->
      <circle cx="310" cy="50" r="5" fill="#ef4444" />
      <text x="315" y="42" font-size="10" font-weight="bold" fill="#ef4444">D</text>
      <!-- Right branch -->
      <rect x="310" y="75" width="20" height="40" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="320" y="98" text-anchor="middle" font-size="9" font-weight="bold">90 Ω</text>
      <rect x="340" y="25" width="40" height="18" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="350" y="38" font-size="9" font-weight="bold">10 Ω</text>
      <text x="410" y="45" font-size="10" font-weight="bold" fill="#0284c7">200 V</text>
    </svg>`,
    modelAnswer: `GIVEN DATA:
• Left Loop: Independent voltage source V₁ = 400 V, resistors R₁ = 20 Ω, R₂ = 80 Ω.
• Right Loop: Independent voltage source V₂ = 200 V, resistors R₃ = 10 Ω, R₄ = 90 Ω.
• Load Resistor: R_L = 15 Ω connected across terminals C and D.

STEP-BY-STEP THEVENIN SOLUTION:

Step 1: Remove Load Resistor R_L (Open Circuit terminals C-D)
Remove the 15 Ω resistor to expose open-circuit terminals C and D.

Step 2: Calculate Thevenin Open-Circuit Voltage V_th = V_CD
With C-D open:
• Left branch current:
   I_left = 400 V / (20 Ω + 80 Ω) = 400 / 100 = 4.0 A
   Potential at node C (voltage drop across 80 Ω):
   V_C = I_left · 80 Ω = 4.0 A · 80 Ω = 320.0 V

• Right branch current:
   I_right = 200 V / (10 Ω + 90 Ω) = 200 / 100 = 2.0 A
   Potential at node D (voltage drop across 90 Ω):
   V_D = I_right · 90 Ω = 2.0 A · 90 Ω = 180.0 V

Thevenin Open Circuit Voltage:
   V_th = V_CD = V_C - V_D = 320.0 V - 180.0 V = +140.0 V (Terminal C is positive w.r.t Terminal D).

Step 3: Calculate Thevenin Resistance R_th
Deactivate all independent sources:
• Replace 400 V voltage source with a SHORT CIRCUIT.
• Replace 200 V voltage source with a SHORT CIRCUIT.
Looking into open terminals C and D:
• At terminal C: 20 Ω and 80 Ω are in parallel:
   R_C = (20 · 80) / (20 + 80) = 1600 / 100 = 16.0 Ω
• At terminal D: 10 Ω and 90 Ω are in parallel:
   R_D = (10 · 90) / (10 + 90) = 900 / 100 = 9.0 Ω

Total Thevenin Equivalent Resistance R_th:
   R_th = R_C + R_D = 16.0 Ω + 9.0 Ω = 25.0 Ω.

Step 4: Connect Load Resistor R_L to Thevenin Equivalent Circuit
The circuit reduces to a single loop with:
• V_th = 140.0 V
• R_th = 25.0 Ω
• R_L = 15.0 Ω

Load Current I_L:
   I_L = V_th / (R_th + R_L) = 140.0 V / (25.0 Ω + 15.0 Ω)
   I_L = 140.0 / 40.0 = 3.50 A

Direction of Load Current:
From terminal C to terminal D (left to right through the 15 Ω resistor).`,
    givenData: ['V₁ = 400 V', 'V₂ = 200 V', 'R₁ = 20 Ω', 'R₂ = 80 Ω', 'R₃ = 10 Ω', 'R₄ = 90 Ω', 'R_L = 15 Ω'],
    finalResult: 'V_th = 140.0 V, R_th = 25.0 Ω, I_L = 3.50 A (C to D)',
    steps: [
      { stepNumber: 1, title: 'Open Circuit Terminal Voltage', content: 'Remove 15 Ω load. Find V_C = 320 V and V_D = 180 V.', formulaOrMath: 'V_th = V_C - V_D = 140.0 V', marksAllocated: '4.0 Marks' },
      { stepNumber: 2, title: 'Deactivate Sources & Find R_th', content: 'Short voltage sources. Compute parallel equivalents at C and D.', formulaOrMath: 'R_th = (20||80) + (10||90) = 16 + 9 = 25.0 Ω', marksAllocated: '3.0 Marks' },
      { stepNumber: 3, title: 'Thevenin Load Current Calculation', content: 'Connect 15 Ω load in series with V_th and R_th.', formulaOrMath: 'I_L = 140 / (25 + 15) = 3.50 A', marksAllocated: '3.0 Marks' },
    ],
    markingScheme: [
      'Removal of load and neat schematic diagram (1.0 Mark)',
      'Accurate node potential calculations V_C = 320 V, V_D = 180 V, and V_th = 140 V (3.5 Marks)',
      'Accurate Thevenin resistance calculation R_th = 25 Ω (3.0 Marks)',
      'Final Thevenin equivalent circuit and load current I_L = 3.50 A with direction (2.5 Marks)',
    ],
    examTip: 'State the direction of current (from C to D). Omitting the current direction costs 1 mark in university exams.',
  },

  {
    id: 'eq-u1-norton-theorem',
    unitNumber: 1,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'State and explain Norton\'s Theorem. Show how Norton\'s Equivalent circuit is related to Thevenin\'s Equivalent circuit through Source Transformation.',
    diagramTitle: 'Thevenin vs Norton Dual Circuit Equivalence',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <!-- Thevenin Box -->
      <rect x="30" y="20" width="190" height="110" rx="6" fill="#f8fafc" stroke="#0284c7" stroke-width="2" />
      <text x="45" y="40" font-size="10" font-weight="bold" fill="#0284c7">THEVENIN EQUIVALENT</text>
      <circle cx="65" cy="80" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <text x="65" y="84" text-anchor="middle" font-size="9" font-weight="bold">Vth</text>
      <rect x="110" y="72" width="35" height="16" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="120" y="84" font-size="9" font-weight="bold">Rth</text>
      <!-- Norton Box -->
      <rect x="280" y="20" width="190" height="110" rx="6" fill="#f8fafc" stroke="#059669" stroke-width="2" />
      <text x="295" y="40" font-size="10" font-weight="bold" fill="#059669">NORTON EQUIVALENT</text>
      <circle cx="315" cy="80" r="14" fill="#ecfdf5" stroke="#059669" stroke-width="2" />
      <text x="315" y="84" text-anchor="middle" font-size="9" font-weight="bold">In</text>
      <rect x="380" y="60" width="16" height="40" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="388" y="84" text-anchor="middle" font-size="8" font-weight="bold">Rn</text>
    </svg>`,
    modelAnswer: `1. Statement of Norton's Theorem:
Any linear, active, bilateral electrical network terminated across two load terminals A and B can be replaced by an electrically equivalent circuit comprising a single constant Current Source I_N (Norton's current) connected in PARALLEL with a single Resistance R_N (Norton's resistance).

Where:
• Norton Current (I_N or I_sc): The short-circuit current that flows between terminals A and B when they are directly connected together (V_AB = 0).
• Norton Resistance (R_N): The internal equivalent resistance measured across terminals A and B with all independent sources replaced by their internal resistances (voltage sources shorted, current sources opened). Note that R_N = R_th.

--------------------------------------------------------------------------------

2. Dual Relationship Between Thevenin and Norton Equivalents:
Thevenin's theorem and Norton's theorem are exact mathematical duals of each other linked via source transformation:
   I_N = V_th / R_th
   V_th = I_N · R_N
   R_N = R_th

Load Current Formula:
When a load resistor R_L is connected across terminals A-B:
By Current Division Rule in the Norton circuit:
   I_L = I_N · [ R_N / (R_N + R_L) ]

Substituting I_N = V_th / R_th and R_N = R_th:
   I_L = (V_th / R_th) · [ R_th / (R_th + R_L) ] = V_th / (R_th + R_L)
This proves both theorems give identical load current and voltage.`,
    markingScheme: [
      'Accurate statement of Norton\'s theorem with definitions of I_sc and R_N (2.0 Marks)',
      'Schematic diagrams of both Thevenin and Norton circuits (1.5 Marks)',
      'Mathematical proof establishing I_N = V_th / R_th and load current equivalence (1.5 Marks)',
    ],
    examTip: 'R_th and R_N are found in the exact same way. If you already have R_th, you don\'t need to recalculate R_N.',
  },

  {
    id: 'eq-u1-max-power-transfer',
    unitNumber: 1,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'State and prove Maximum Power Transfer Theorem for DC resistive circuits. Derive the condition for maximum power transfer (R_L = R_th), the expression for maximum power P_max, and explain why the efficiency at maximum power transfer is only 50%.',
    diagramTitle: 'Maximum Power Transfer Curve (P vs RL)',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <line x1="50" y1="120" x2="450" y2="120" stroke="#78716c" stroke-width="2" />
      <line x1="50" y1="120" x2="50" y2="20" stroke="#78716c" stroke-width="2" />
      <text x="430" y="135" font-size="10" fill="#78716c">RL (Ohms)</text>
      <text x="25" y="25" font-size="10" fill="#78716c">P (Watts)</text>
      <path d="M 50 120 Q 180 15 420 100" fill="none" stroke="#dc2626" stroke-width="2.5" />
      <line x1="180" y1="120" x2="180" y2="40" stroke="#78716c" stroke-width="1.5" stroke-dasharray="3,3" />
      <circle cx="180" cy="40" r="5" fill="#dc2626" />
      <text x="180" y="135" text-anchor="middle" font-size="10" font-weight="bold" fill="#0284c7">RL = Rth</text>
      <text x="195" y="40" font-size="10" font-weight="bold" fill="#dc2626">P_max = Vth² / (4 Rth)</text>
    </svg>`,
    modelAnswer: `1. Statement of Maximum Power Transfer Theorem:
In any linear, bilateral DC network, maximum electrical power is transferred from the source network to the load resistor R_L when the resistance of the load equals the Thevenin equivalent resistance of the network as viewed from the load terminals:
   R_L = R_th

--------------------------------------------------------------------------------

2. Mathematical Proof / Derivation:
Represent the source network by its Thevenin equivalent (V_th in series with R_th).
When connected to load resistor R_L:
Current in circuit:
   I = V_th / (R_th + R_L)

Power delivered to the load resistor R_L:
   P_L = I² · R_L = [ V_th / (R_th + R_L) ]² · R_L
   P_L = V_th² · [ R_L / (R_th + R_L)² ]

To find the value of R_L that maximizes P_L, differentiate P_L with respect to R_L and equate to zero:
   dP_L / dR_L = 0
Applying the quotient rule:
   d/dR_L [ R_L / (R_th + R_L)² ] = [ (R_th + R_L)² · (1) - R_L · 2(R_th + R_L) ] / (R_th + R_L)⁴ = 0
Canceling (R_th + R_L) from numerator:
   (R_th + R_L) - 2 · R_L = 0
   R_th - R_L = 0
   ==>   R_L = R_th   (Condition for Maximum Power Transfer)

3. Expression for Maximum Power:
Substitute R_L = R_th into the power formula:
   P_max = V_th² · [ R_th / (R_th + R_th)² ] = V_th² · [ R_th / (2·R_th)² ]
   P_max = V_th² / (4 · R_th)

--------------------------------------------------------------------------------

4. Why Efficiency is Only 50%:
Total power generated by source at condition R_L = R_th:
   P_total = I² · (R_th + R_L) = I² · (2 · R_th)
Power delivered to load:
   P_load = I² · R_L = I² · R_th
Efficiency η:
   η = (P_load / P_total) · 100% = [ (I² · R_th) / (2 · I² · R_th) ] · 100% = 50%
Half the power is inevitably dissipated as internal heat inside the source resistance R_th! Therefore, Maximum Power Transfer is applied in communications and electronics for maximum signal transfer, NOT in electrical power generation/grids where high efficiency (>95%) is required.`,
    markingScheme: [
      'Statement of Maximum Power Transfer Theorem (1.0 Mark)',
      'Step-by-step calculus derivation proving dP/dR_L = 0 ==> R_L = R_th (2.5 Marks)',
      'Formula for P_max = V_th² / 4R_th (0.75 Mark)',
      'Explanation of 50% efficiency limitation in power systems vs signal systems (0.75 Mark)',
    ],
    examTip: 'Mention the distinction between power grids (efficiency matters, so R_L >> R_th) and audio/communication amplifiers (signal power transfer matters, so R_L = R_th).',
  },

  {
    id: 'eq-u1-star-delta',
    unitNumber: 1,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Derive the conversion formulas for: (a) Delta to Star Transformation, and (b) Star to Delta Transformation of a three-terminal resistive network.',
    diagramTitle: 'Delta (Mesh) to Star (Wye) Transformation Geometry',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <!-- Delta Outer -->
      <polygon points="120,20 40,120 200,120" fill="none" stroke="#b45309" stroke-width="2" />
      <text x="120" y="15" text-anchor="middle" font-size="10" font-weight="bold">A</text>
      <text x="30" y="130" font-size="10" font-weight="bold">B</text>
      <text x="210" y="130" font-size="10" font-weight="bold">C</text>
      <text x="70" y="60" font-size="9" fill="#b45309">Rab</text>
      <text x="170" y="60" font-size="9" fill="#b45309">Rca</text>
      <text x="120" y="135" text-anchor="middle" font-size="9" fill="#b45309">Rbc</text>
      <!-- Star Inner -->
      <circle cx="120" cy="85" r="4" fill="#0284c7" />
      <line x1="120" y1="20" x2="120" y2="85" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="125" y="55" font-size="9" font-weight="bold" fill="#0284c7">Ra</text>
      <line x1="40" y1="120" x2="120" y2="85" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="75" y="105" font-size="9" font-weight="bold" fill="#0284c7">Rb</text>
      <line x1="200" y1="120" x2="120" y2="85" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="165" y="105" font-size="9" font-weight="bold" fill="#0284c7">Rc</text>
      <!-- Summary Box -->
      <rect x="250" y="25" width="220" height="100" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
      <text x="260" y="50" font-size="10" font-weight="bold" fill="#0284c7">Delta to Star:</text>
      <text x="260" y="68" font-size="9" font-family="monospace">Ra = (Rab · Rca) / (Rab+Rbc+Rca)</text>
      <text x="260" y="92" font-size="10" font-weight="bold" fill="#b45309">Star to Delta:</text>
      <text x="260" y="110" font-size="9" font-family="monospace">Rab = Ra + Rb + (Ra·Rb / Rc)</text>
    </svg>`,
    modelAnswer: `1. DELTA TO STAR TRANSFORMATION DERIVATION:
Consider three terminals A, B, and C.
In Delta (Δ): Resistors R_ab, R_bc, and R_ca are connected in a triangle.
In Star (Y): Resistors R_a, R_b, and R_c radiate from central star point N to terminals A, B, and C.

Equating terminal resistance between terminal pairs:
Between terminals A and B (with terminal C open):
• In Star: R_AB(Y) = R_a + R_b
• In Delta: R_ab is in parallel with series branch (R_bc + R_ca):
   R_AB(Δ) = [ R_ab · (R_bc + R_ca) ] / [ R_ab + R_bc + R_ca ]   --- (Eq 1)

Similarly between B and C:
   R_b + R_c = [ R_bc · (R_ca + R_ab) ] / [ R_ab + R_bc + R_ca ]   --- (Eq 2)

Between C and A:
   R_c + R_a = [ R_ca · (R_ab + R_bc) ] / [ R_ab + R_bc + R_ca ]   --- (Eq 3)

Subtracting Eq 2 from Eq 1, and adding Eq 3:
   R_a = (R_ab · R_ca) / (R_ab + R_bc + R_ca)
   R_b = (R_ab · R_bc) / (R_ab + R_bc + R_ca)
   R_c = (R_bc · R_ca) / (R_ab + R_bc + R_ca)

Mnemonic Rule for Delta to Star:
Any Star resistor = (Product of two adjacent Delta resistors) / (Sum of all three Delta resistors).

--------------------------------------------------------------------------------

2. STAR TO DELTA TRANSFORMATION:
By taking products of pairs (R_a·R_b + R_b·R_c + R_c·R_a) and dividing by individual star branches:
   R_ab = R_a + R_b + [ (R_a · R_b) / R_c ]
   R_bc = R_b + R_c + [ (R_b · R_c) / R_a ]
   R_ca = R_c + R_a + [ (R_c · R_a) / R_b ]

Mnemonic Rule for Star to Delta:
Any Delta resistor = Sum of two adjacent Star resistors + (Product of adjacent Star resistors / Opposing Star resistor).

Special Case (Symmetric / Balanced Network):
If all resistors are equal: R_Δ = 3 · R_Y   and   R_Y = R_Δ / 3.`,
    markingScheme: [
      'Equivalent resistance pairing equations (R_AB, R_BC, R_CA) (2.0 Marks)',
      'Derivation of Delta to Star formulas (1.5 Marks)',
      'Derivation of Star to Delta formulas (1.5 Marks)',
    ],
    examTip: 'Remember the balanced shortcut: R_star = R_delta / 3. If a question has three 30 Ω delta resistors, the equivalent star is directly 10 Ω each.',
  },

  // =========================================================================
  // UNIT 2: AC CIRCUIT ANALYSIS
  // =========================================================================
  {
    id: 'eq-u2-1',
    unitNumber: 2,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Define and derive the expressions for the Root Mean Square (RMS) value and Average value of an alternating sinusoidal voltage v(t) = V_m · sin(ωt). Calculate the Form Factor and Peak Factor.',
    diagramTitle: 'Sinusoidal Waveform with Peak, RMS, and Average Levels',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <line x1="40" y1="80" x2="450" y2="80" stroke="#78716c" stroke-width="1.5" />
      <line x1="40" y1="140" x2="40" y2="20" stroke="#78716c" stroke-width="1.5" />
      <path d="M 40 80 Q 140 -10 240 80 T 440 80" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <line x1="140" y1="35" x2="40" y2="35" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="45" y="30" font-size="10" font-weight="bold" fill="#dc2626">Vm (Peak)</text>
      <line x1="40" y1="48" x2="440" y2="48" stroke="#059669" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="280" y="44" font-size="10" font-weight="bold" fill="#059669">V_rms = 0.707 Vm</text>
      <line x1="40" y1="56" x2="440" y2="56" stroke="#b45309" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="280" y="70" font-size="10" font-weight="bold" fill="#b45309">V_avg = 0.637 Vm</text>
      <text x="230" y="95" font-size="10" fill="#78716c">π (Half Cycle)</text>
      <text x="430" y="95" font-size="10" fill="#78716c">2π (Full Cycle)</text>
    </svg>`,
    modelAnswer: `1. ROOT MEAN SQUARE (RMS) VALUE DERIVATION:
Definition: The RMS value of an alternating current/voltage is defined as that value of steady direct current (DC) which, when flowing through a given resistor for a given time, produces the same amount of heat as produced by the alternating current flowing through the same resistor for the same time.

Mathematical Definition:
   V_rms = √[ (1 / T) · ∫₀^T v²(t) dt ]

For a sinusoidal voltage v(t) = V_m · sin(θ), where θ = ωt and cycle period T = 2π:
   V_rms² = (1 / 2π) · ∫₀^(2π) [V_m · sin(θ)]² dθ
   V_rms² = (V_m² / 2π) · ∫₀^(2π) sin²(θ) dθ

Using trigonometric identity: sin²(θ) = (1 - cos(2θ)) / 2:
   V_rms² = (V_m² / 4π) · ∫₀^(2π) (1 - cos(2θ)) dθ
   V_rms² = (V_m² / 4π) · [ θ - (sin(2θ) / 2) ]₀^(2π)
   V_rms² = (V_m² / 4π) · [ (2π - 0) - (0 - 0) ]
   V_rms² = (V_m² / 4π) · 2π = V_m² / 2

Taking square root on both sides:
   V_rms = V_m / √2 = 0.7071 · V_m

--------------------------------------------------------------------------------

2. AVERAGE VALUE DERIVATION:
Definition: The average value of an alternating quantity over a half-cycle is the arithmetic mean of all instantaneous values over that half-cycle. (Note: Average over a full symmetric cycle is identically zero).

Mathematical Formulation (Half-Cycle from 0 to π):
   V_avg = (1 / π) · ∫₀^π V_m · sin(θ) dθ
   V_avg = (V_m / π) · [ -cos(θ) ]₀^π
   V_avg = (V_m / π) · [ -cos(π) - (-cos(0)) ]
   V_avg = (V_m / π) · [ -(-1) - (-1) ]
   V_avg = (V_m / π) · [ 1 + 1 ] = (2 · V_m) / π

Numerical Value:
   V_avg = (2 / π) · V_m = 0.6366 · V_m

--------------------------------------------------------------------------------

3. FORM FACTOR (K_f) & PEAK FACTOR (K_p):
• Form Factor (K_f): Ratio of RMS value to Average value.
   K_f = V_rms / V_avg = (V_m / √2) / (2 · V_m / π) = π / (2 · √2) ≈ 1.11

• Peak Factor / Crest Factor (K_p): Ratio of Maximum (Peak) value to RMS value.
   K_p = V_m / V_rms = V_m / (V_m / √2) = √2 ≈ 1.414`,
    markingScheme: [
      'Definitions of RMS and Average values based on Joule heating equivalence (1.0 Mark)',
      'Step-by-step mathematical derivation of V_rms = V_m / √2 (2.0 Marks)',
      'Step-by-step mathematical derivation of V_avg = 2·V_m / π (1.0 Mark)',
      'Form factor (1.11) and Peak factor (1.414) evaluations (1.0 Mark)',
    ],
    examTip: 'Always specify that the Average Value of a pure sine wave is calculated over a HALF-CYCLE (0 to π). If you integrate from 0 to 2π, the answer is zero, which will not receive marks.',
  },

  {
    id: 'eq-u2-2',
    unitNumber: 2,
    marks: 10,
    category: 'Long Answer / Derivation',
    question: 'For a Series RLC circuit connected across an AC supply v(t) = V_m sin(ωt): (a) Derive expressions for impedance Z, phase angle ϕ, and instantaneous current i(t). (b) Derive the condition for Electrical Resonance, Resonant Frequency f_r, and Quality Factor Q. (c) Sketch the resonance curve showing variation of current and impedance with frequency.',
    diagramTitle: 'Series RLC Circuit, Phasor Diagram, and Frequency Resonance Curve',
    diagramSvg: `<svg viewBox="0 0 500 170" class="w-full h-auto max-w-lg mx-auto">
      <line x1="20" y1="50" x2="50" y2="50" stroke="#0284c7" stroke-width="2" />
      <rect x="50" y="42" width="30" height="16" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="58" y="54" font-size="9" font-weight="bold">R</text>
      <line x1="80" y1="50" x2="105" y2="50" stroke="#0284c7" stroke-width="2" />
      <path d="M 105 50 Q 112 35 120 50 Q 127 35 135 50 Q 142 35 150 50" fill="none" stroke="#059669" stroke-width="2" />
      <text x="123" y="65" font-size="9" font-weight="bold" fill="#059669">L</text>
      <line x1="150" y1="50" x2="175" y2="50" stroke="#0284c7" stroke-width="2" />
      <line x1="175" y1="40" x2="175" y2="60" stroke="#7c3aed" stroke-width="2.5" />
      <line x1="181" y1="40" x2="181" y2="60" stroke="#7c3aed" stroke-width="2.5" />
      <text x="173" y="72" font-size="9" font-weight="bold" fill="#7c3aed">C</text>
      <line x1="230" y1="90" x2="310" y2="90" stroke="#b45309" stroke-width="2" />
      <text x="270" y="105" font-size="9" font-weight="bold" fill="#b45309">VR = I·R</text>
      <line x1="310" y1="90" x2="310" y2="30" stroke="#059669" stroke-width="2" />
      <text x="315" y="55" font-size="9" font-weight="bold" fill="#059669">(VL - VC)</text>
      <line x1="230" y1="90" x2="310" y2="30" stroke="#0284c7" stroke-width="2.5" />
      <text x="250" y="50" font-size="10" font-weight="bold" fill="#0284c7">V = I·Z</text>
      <line x1="360" y1="130" x2="480" y2="130" stroke="#78716c" stroke-width="1.5" />
      <line x1="360" y1="130" x2="360" y2="20" stroke="#78716c" stroke-width="1.5" />
      <text x="460" y="145" font-size="9" fill="#78716c">f (Hz)</text>
      <text x="340" y="25" font-size="9" fill="#78716c">I, Z</text>
      <path d="M 370 125 Q 420 20 470 125" fill="none" stroke="#059669" stroke-width="2.5" />
      <text x="405" y="30" font-size="9" font-weight="bold" fill="#059669">I_max = V/R</text>
      <path d="M 370 40 Q 420 120 470 40" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="405" y="125" font-size="8" font-weight="bold" fill="#dc2626">Z_min = R</text>
      <text x="415" y="145" font-size="9" font-weight="bold" fill="#b45309">fr</text>
    </svg>`,
    modelAnswer: `1. MATHEMATICAL DERIVATION OF IMPEDANCE & CURRENT:
Consider a resistor R, inductor L, and capacitor C connected in series across an AC sinusoidal supply:
   v(t) = V_m · sin(ωt)

Let common current flowing through the series circuit be:
   i(t) = I_m · sin(ωt - ϕ)

Voltage drops across individual elements:
• Resistor Voltage: v_R(t) = i(t) · R  ==> In phase with current i(t).
• Inductor Voltage: v_L(t) = L · (di/dt) ==> Leads current by 90° (+π/2 rad).
• Capacitor Voltage: v_C(t) = (1/C) · ∫ i dt ==> Lags current by 90° (-π/2 rad).

From the Phasor Diagram (assuming inductive circuit X_L > X_C):
   V² = V_R² + (V_L - V_C)²
   V² = (I · R)² + (I · X_L - I · X_C)²
   V² = I² · [ R² + (X_L - X_C)² ]

Therefore, Total Impedance Z:
   Z = √[ R² + (X_L - X_C)² ]   in Ohms (Ω)

Where:
• X_L = ωL = 2πfL (Inductive Reactance in Ω)
• X_C = 1 / (ωC) = 1 / (2πfC) (Capacitive Reactance in Ω)

Phase Angle (ϕ):
   tan(ϕ) = (V_L - V_C) / V_R = (X_L - X_C) / R
   ϕ = arctan [ (X_L - X_C) / R ]
   Power Factor = cos(ϕ) = R / Z

Current Equation:
   i(t) = [ V_m / Z ] · sin(ωt - ϕ)

--------------------------------------------------------------------------------

2. ELECTRICAL RESONANCE IN SERIES RLC CIRCUIT:
Definition: Series resonance occurs at a specific frequency where the inductive reactance equals the capacitive reactance, rendering the circuit purely resistive.

Condition for Resonance:
   X_L = X_C
   ω_r · L = 1 / (ω_r · C)
   ω_r² = 1 / (L · C)
   ω_r = 1 / √(L · C)   (Resonant Angular Frequency in rad/s)

Since ω_r = 2πf_r:
   f_r = 1 / [ 2π · √(L · C) ]   (Resonant Frequency in Hz)

Characteristics at Series Resonance:
1. Impedance reaches minimum: Z_min = √[ R² + (X_L - X_C)² ] = R (Purely Resistive).
2. Circuit Current reaches its maximum: I_max = V / R.
3. Phase angle is zero (ϕ = 0°); Power Factor is unity: cos(ϕ) = 1.0.
4. V_L and V_C are equal in magnitude and 180° out of phase, canceling each other completely.

Quality Factor (Q-Factor):
Definition: The ratio of reactive power stored in inductor/capacitor to average real power dissipated in resistor at resonance:
   Q = (ω_r · L) / R = 1 / (ω_r · C · R) = (1 / R) · √(L / C)

Bandwidth (BW):
   BW = f₂ - f₁ = f_r / Q = R / (2πL)
   Where f₁ and f₂ are half-power frequencies (where I = I_max / √2 = 0.707 I_max).`,
    markingScheme: [
      'Circuit diagram and phasor diagram showing V_R, V_L, V_C (2.0 Marks)',
      'Derivation of impedance Z = √[R² + (X_L - X_C)²] and phase angle ϕ (3.0 Marks)',
      'Resonance condition X_L = X_C and derivation of f_r = 1/(2π√LC) (2.5 Marks)',
      'Quality factor Q = (1/R)√(L/C) and Bandwidth explanation (1.5 Marks)',
      'Accurate resonance curve showing current peak and impedance minimum (1.0 Mark)',
    ],
    examTip: 'Examiners reward stating that series resonance is an "Acceptor Circuit" because it offers minimum impedance and accepts maximum current at frequency f_r.',
  },

  {
    id: 'eq-u2-power-triangle',
    unitNumber: 2,
    marks: 5,
    category: 'Short Answer',
    question: 'Differentiate between Real (Active/True) Power, Reactive Power, and Apparent Power. Draw the Power Triangle. Define Power Factor and explain the technical and economic importance of maintaining a high power factor in industrial distribution systems.',
    diagramTitle: 'The AC Power Triangle & Vector Relationships',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <line x1="80" y1="110" x2="300" y2="110" stroke="#059669" stroke-width="3" />
      <text x="180" y="128" font-size="11" font-weight="bold" fill="#059669">Real Power P = V·I·cos(ϕ) (kW)</text>
      <line x1="300" y1="110" x2="300" y2="30" stroke="#dc2626" stroke-width="3" />
      <text x="310" y="75" font-size="11" font-weight="bold" fill="#dc2626">Reactive Power Q = V·I·sin(ϕ) (kVAR)</text>
      <line x1="80" y1="110" x2="300" y2="30" stroke="#0284c7" stroke-width="3" />
      <text x="140" y="60" font-size="11" font-weight="bold" fill="#0284c7">Apparent Power S = V·I (kVA)</text>
      <path d="M 120 110 A 40 40 0 0 0 115 96" fill="none" stroke="#78716c" stroke-width="1.5" />
      <text x="130" y="102" font-size="10" font-weight="bold" fill="#78716c">ϕ</text>
    </svg>`,
    modelAnswer: `1. The Three Powers in AC Circuits:

(a) Real / Active / True Power (P):
• Definition: The actual electrical power converted into useful work (motion in a motor, heat in a furnace, light in a lamp).
• Formula: P = V · I · cos(ϕ)
• SI Unit: Watts (W), Kilowatts (kW), or Megawatts (MW).
• Nature: Consumed irreversibly by resistive components.

(b) Reactive Power (Q):
• Definition: The power that oscillates back and forth between the source and reactive magnetic/electric fields (magnetizing flux in motors and transformers). It performs no net work.
• Formula: Q = V · I · sin(ϕ)
• SI Unit: Volt-Amperes Reactive (VAR) or kVAR.
• Nature: Inductive loads draw lagging reactive power; capacitor banks supply leading reactive power.

(c) Apparent Power (S):
• Definition: The product of RMS voltage and RMS current. Represents the total capacity rating required for generators, cables, and transformers.
• Formula: S = V · I = √(P² + Q²)
• SI Unit: Volt-Amperes (VA) or Kilovolt-Amperes (kVA).

Power Triangle Relationship:
   S² = P² + Q²
   Power Factor = cos(ϕ) = Real Power / Apparent Power = P / S = R / Z

--------------------------------------------------------------------------------

2. Importance of Maintaining High Power Factor (cos ϕ ≈ 0.95 to 1.0):
1. Massive Reduction in Line Current:
   I = P / [ V · cos(ϕ) ]. If power factor drops from 1.0 to 0.5, current DOUBLES to deliver the same useful kW load!
2. Minimizes Cable I²R Heating Losses:
   Lower current reduces transmission and distribution losses by factor of I².
3. Prevents Voltage Droop (Regulation):
   Reduced line current leads to smaller impedance voltage drops (I·Z), improving consumer terminal voltage stability.
4. Avoids Utility Penalties:
   Electricity boards penalize industrial consumers whose power factor drops below 0.90 and give tariff rebates for maintaining power factors above 0.95.`,
    markingScheme: [
      'Definitions, formulas, and units for P (kW), Q (kVAR), and S (kVA) (2.0 Marks)',
      'Neat sketch of Power Triangle with angle ϕ (1.0 Mark)',
      'Definition of power factor cos(ϕ) = P/S (0.5 Mark)',
      'Three technical/economic reasons for power factor correction (1.5 Marks)',
    ],
    examTip: 'Always mention that power factor correction is performed by connecting static capacitor banks in parallel with inductive loads.',
  },

  {
    id: 'eq-u2-series-rl-numerical',
    unitNumber: 2,
    marks: 5,
    category: 'Numerical Problem',
    question: 'In a particular RL series circuit, an alternating voltage of 10 V at 50 Hz produces a current of 700 mA, while the same voltage of 10 V at 75 Hz produces 500 mA. Determine the resistance R and inductance L of the circuit.',
    diagramTitle: 'Series RL Circuit under Dual Frequency AC Excitation',
    diagramSvg: `<svg viewBox="0 0 450 140" class="w-full h-auto max-w-md mx-auto">
      <rect x="50" y="25" width="350" height="90" rx="8" fill="#fdfbf7" stroke="#78716c" stroke-width="2" />
      <circle cx="85" cy="70" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <text x="85" y="74" text-anchor="middle" font-size="9" font-weight="bold">10 V</text>
      <rect x="160" y="62" width="40" height="16" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      <text x="175" y="74" font-size="9" font-weight="bold">R = ?</text>
      <path d="M 240 70 Q 248 55 255 70 Q 262 55 270 70 Q 278 55 285 70" fill="none" stroke="#059669" stroke-width="2" />
      <text x="260" y="90" font-size="9" font-weight="bold" fill="#059669">L = ?</text>
      <text x="180" y="130" font-size="10" font-weight="bold" fill="#0284c7">At 50 Hz: I = 0.70 A | At 75 Hz: I = 0.50 A</text>
    </svg>`,
    modelAnswer: `GIVEN DATA:
• Voltage magnitude V = 10 V (RMS).
• Condition 1: At frequency f₁ = 50 Hz, current I₁ = 700 mA = 0.70 A.
• Condition 2: At frequency f₂ = 75 Hz, current I₂ = 500 mA = 0.50 A.

STEP-BY-STEP CALCULATION:

Step 1: Formulate Impedance Equations for Both Frequencies
In a series RL circuit:
   Z = V / I = √[ R² + (2πfL)² ]
   Z² = R² + 4π²f²L²

For Condition 1 (f₁ = 50 Hz):
   Z₁ = 10 V / 0.70 A = 14.2857 Ω
   Z₁² = (14.2857)² = 204.08 Ω²
   R² + 4π² · (50)² · L² = 204.08
   R² + 4π² · 2500 · L² = 204.08
   R² + 98696 · L² = 204.08   --- (Equation 1)

For Condition 2 (f₂ = 75 Hz):
   Z₂ = 10 V / 0.50 A = 20.0 Ω
   Z₂² = (20.0)² = 400.0 Ω²
   R² + 4π² · (75)² · L² = 400.0
   R² + 4π² · 5625 · L² = 400.0
   R² + 222066 · L² = 400.0   --- (Equation 2)

Step 2: Solve for Inductance L by Subtracting Equation 1 from Equation 2
   (R² + 222066 · L²) - (R² + 98696 · L²) = 400.0 - 204.08
   123370 · L² = 195.92
   L² = 195.92 / 123370 = 0.001588
   L = √(0.001588) = 0.03985 Henry

   Inductance L ≈ 0.0398 H = 39.85 mH

Step 3: Solve for Resistance R
Substitute L² = 0.001588 into Equation 1:
   R² + 98696 · (0.001588) = 204.08
   R² + 156.73 = 204.08
   R² = 204.08 - 156.73 = 47.35
   R = √(47.35) = 6.881 Ω

   Resistance R ≈ 6.88 Ω`,
    givenData: ['V = 10 V', 'f₁ = 50 Hz, I₁ = 0.70 A', 'f₂ = 75 Hz, I₂ = 0.50 A'],
    finalResult: 'R = 6.88 Ω, L = 0.0398 H (39.85 mH)',
    markingScheme: [
      'Formulating Z₁ = 14.29 Ω and Z₂ = 20.0 Ω (1.5 Marks)',
      'Setting up simultaneous equations in R² and L² (1.5 Marks)',
      'Solving for Inductance L = 39.85 mH (1.0 Mark)',
      'Solving for Resistance R = 6.88 Ω with units (1.0 Mark)',
    ],
    examTip: 'Keep intermediate squares (Z², f²) to 4 decimal places to prevent roundoff errors when subtracting.',
  },

  {
    id: 'eq-u2-voltage-magnification',
    unitNumber: 2,
    marks: 2,
    category: 'Short Answer',
    question: 'A Series RLC circuit is also called a "Voltage Magnification Circuit" at resonance. Justify this statement mathematically.',
    diagramTitle: 'Voltage Magnification across Reactive Components at Resonance',
    diagramSvg: `<svg viewBox="0 0 450 120" class="w-full h-auto max-w-md mx-auto">
      <rect x="30" y="20" width="390" height="80" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5" />
      <text x="50" y="45" font-size="11" font-weight="bold" fill="#b91c1c">VOLTAGE MAGNIFICATION FACTOR</text>
      <text x="50" y="68" font-size="11" font-family="monospace">V_L = V_C = Q · V_supply</text>
      <text x="50" y="88" font-size="10" fill="#7f1d1d">If Q = 20 and V = 10 V, then VL = VC = 200 Volts!</text>
    </svg>`,
    modelAnswer: `Justification of Voltage Magnification:
At series resonance, the circuit impedance is at its absolute minimum: Z = R.
Therefore, the circuit current reaches its peak value:
   I_res = V / R

The voltage drop appearing across the inductor coil at resonance is:
   V_L = I_res · X_L = (V / R) · (ω_r · L) = V · [ (ω_r · L) / R ]

Similarly, the voltage drop across the capacitor at resonance is:
   V_C = I_res · X_C = (V / R) · [ 1 / (ω_r · C) ] = V · [ 1 / (ω_r · C · R) ]

By definition, the Quality Factor Q is:
   Q = (ω_r · L) / R = 1 / (ω_r · C · R)

Therefore:
   V_L = Q · V
   V_C = Q · V

Conclusion:
In high-Q circuits (where Q typically ranges from 10 to 100), the voltage across the inductor and capacitor can be 10 to 100 times GREATER than the supply voltage V! For example, a 10 V AC input with Q = 20 produces 200 V across the capacitor. Hence, a series resonant circuit is legitimately termed a Voltage Magnification Circuit.`,
    markingScheme: [
      'Derivation showing V_L = V_C = Q · V (1.0 Mark)',
      'Physical explanation with high-Q example justifying voltage magnification (1.0 Mark)',
    ],
    examTip: 'Note that while V_L and V_C are individually huge, they are 180° out of phase and cancel out, so their series combination remains equal to supply voltage V.',
  },

  {
    id: 'eq-u2-3phase-instantaneous-power',
    unitNumber: 2,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Prove mathematically that the total instantaneous power in a balanced three-phase AC circuit is constant and equal to the average active power at every instant of time.',
    diagramTitle: 'Constant Total 3-Phase Instantaneous Power vs Pulsating 1-Phase Power',
    diagramSvg: `<svg viewBox="0 0 500 140" class="w-full h-auto max-w-lg mx-auto">
      <line x1="40" y1="100" x2="450" y2="100" stroke="#78716c" stroke-width="1.5" />
      <line x1="40" y1="100" x2="40" y2="20" stroke="#78716c" stroke-width="1.5" />
      <line x1="40" y1="40" x2="450" y2="40" stroke="#059669" stroke-width="3" />
      <text x="250" y="32" font-size="11" font-weight="bold" fill="#059669">Total 3-Phase Instantaneous Power: p(t) = CONSTANT</text>
      <path d="M 40 100 Q 80 40 120 100 Q 160 160 200 100 Q 240 40 280 100" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="310" y="80" font-size="9" fill="#64748b">Single-phase power pulses at 2f</text>
    </svg>`,
    modelAnswer: `1. Mathematical Proof:
In a balanced 3-phase system, let the phase voltages and currents be:

Phase R:
• v_R(t) = V_m · sin(ωt)
• i_R(t) = I_m · sin(ωt - ϕ)

Phase Y (lags by 120°):
• v_Y(t) = V_m · sin(ωt - 120°)
• i_Y(t) = I_m · sin(ωt - 120° - ϕ)

Phase B (lags by 240°):
• v_B(t) = V_m · sin(ωt - 240°)
• i_B(t) = I_m · sin(ωt - 240° - ϕ)

The total instantaneous power p(t) is the sum of instantaneous power in each phase:
   p(t) = p_R(t) + p_Y(t) + p_B(t) = v_R·i_R + v_Y·i_Y + v_B·i_B

Using trigonometric product identity: 2 · sin(A) · sin(B) = cos(A - B) - cos(A + B):
   v_R · i_R = ½ V_m I_m · [ cos(ϕ) - cos(2ωt - ϕ) ]
   v_Y · i_Y = ½ V_m I_m · [ cos(ϕ) - cos(2ωt - 240° - ϕ) ]
   v_B · i_B = ½ V_m I_m · [ cos(ϕ) - cos(2ωt - 480° - ϕ) ]

Summing all three phases:
   p(t) = ½ V_m I_m · [ 3 · cos(ϕ) - { cos(2ωt - ϕ) + cos(2ωt - ϕ - 120°) + cos(2ωt - ϕ - 240°) } ]

The second bracketed term consists of three equal sinusoidal vectors displaced from each other by 120°. The vector sum of three symmetrical sinusoids separated by 120° is IDENTICALLY ZERO at all times:
   cos(θ) + cos(θ - 120°) + cos(θ - 240°) = 0

Therefore:
   p(t) = ½ V_m I_m · [ 3 · cos(ϕ) - 0 ]
   p(t) = 3 · [ (V_m / √2) · (I_m / √2) · cos(ϕ) ]
   p(t) = 3 · V_ph · I_ph · cos(ϕ) = √3 · V_L · I_L · cos(ϕ) = Constant!

Conclusion:
Unlike single-phase power which pulsates at twice supply frequency (100 Hz), 3-phase electric power is completely smooth and constant at every microsecond! This produces uniform, non-vibrating mechanical torque in 3-phase electric motors.`,
    markingScheme: [
      'Writing expressions for v and i for all three phases (1.5 Marks)',
      'Applying trigonometric product formula (1.5 Marks)',
      'Proving the 120° oscillating components sum to zero (1.0 Mark)',
      'Final result p(t) = 3 V_ph I_ph cos(ϕ) = constant (1.0 Mark)',
    ],
    examTip: 'Highlight the engineering consequence: because instantaneous 3-phase power is constant, 3-phase motors run with zero torque pulsation or vibration.',
  },

  // =========================================================================
  // UNIT 3: ELECTRICAL MACHINES, TRANSFORMERS & MEASURING INSTRUMENTS
  // =========================================================================
  {
    id: 'eq-u3-1',
    unitNumber: 3,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Derive the EMF Equation of a Single-Phase Transformer: E = 4.44 · f · N · Φ_m. Define Voltage Transformation Ratio (K) and state why a transformer rating is given in kVA rather than kW.',
    diagramTitle: 'Single-Phase Transformer Core & Sinusoidal Mutual Flux',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <rect x="50" y="20" width="160" height="120" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="3" />
      <rect x="90" y="50" width="80" height="60" rx="2" fill="#ffffff" stroke="#64748b" stroke-width="2" />
      <rect x="40" y="45" width="20" height="70" fill="#fed7aa" stroke="#c2410c" stroke-width="1.5" />
      <text x="15" y="80" font-size="10" font-weight="bold" fill="#c2410c">N1 (V1)</text>
      <rect x="200" y="45" width="20" height="70" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5" />
      <text x="225" y="80" font-size="10" font-weight="bold" fill="#0284c7">N2 (V2)</text>
      <ellipse cx="130" cy="80" rx="30" ry="22" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="4,4" />
      <text x="110" y="84" font-size="9" font-weight="bold" fill="#b45309">Flux Φm</text>
      <rect x="270" y="30" width="210" height="100" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5" />
      <text x="285" y="55" font-size="11" font-weight="bold" fill="#854d0e">E1 = 4.44 · f · N1 · Φm</text>
      <text x="285" y="80" font-size="11" font-weight="bold" fill="#854d0e">E2 = 4.44 · f · N2 · Φm</text>
      <text x="285" y="105" font-size="10" font-weight="bold" fill="#0284c7">K = E2/E1 = N2/N1 = I1/I2</text>
    </svg>`,
    modelAnswer: `1. DERIVATION OF TRANSFORMER EMF EQUATION:
Let:
• N₁ = Number of primary winding turns
• N₂ = Number of secondary winding turns
• Φ_m = Maximum mutual magnetic core flux in Webers (Wb)
• f = Supply frequency in Hertz (Hz)
• B_m = Maximum magnetic flux density in Tesla (Wb/m²)
• A = Core cross-sectional area (m²), where Φ_m = B_m · A

The primary applied AC voltage produces a sinusoidal mutual flux in the core:
   ϕ(t) = Φ_m · sin(ωt) = Φ_m · sin(2πft)

According to Faraday's Law of Electromagnetic Induction, the instantaneous induced EMF e(t) in a coil of N turns is:
   e = -N · (dϕ / dt)

Differentiating flux with respect to time t:
   dϕ / dt = d/dt [ Φ_m · sin(2πft) ] = 2πf · Φ_m · cos(2πft)

Substituting into Faraday's equation:
   e = -N · [ 2πf · Φ_m · cos(2πft) ]
   e = 2πf · N · Φ_m · sin(2πft - π/2)

The maximum (peak) induced EMF is:
   E_m = 2πf · N · Φ_m

The RMS value of the induced EMF is:
   E_rms = E_m / √2 = (2π / √2) · f · N · Φ_m = √2 · π · f · N · Φ_m
   Since √2 · π ≈ 1.4142 · 3.14159 = 4.4428:

   E = 4.44 · f · N · Φ_m

Primary Induced EMF:
   E₁ = 4.44 · f · N₁ · Φ_m

Secondary Induced EMF:
   E₂ = 4.44 · f · N₂ · Φ_m

--------------------------------------------------------------------------------

2. TRANSFORMATION RATIO (K):
The ratio of secondary induced EMF to primary induced EMF is termed the Transformation Ratio K:
   K = E₂ / E₁ = N₂ / N₁ = I₁ / I₂ = V₂ / V₁

• Step-Up Transformer: K > 1  (N₂ > N₁, V₂ > V₁, I₂ < I₁)
• Step-Down Transformer: K < 1  (N₂ < N₁, V₂ < V₁, I₂ > I₁)
• Isolation Transformer: K = 1  (N₂ = N₁, V₂ = V₁)

--------------------------------------------------------------------------------

3. WHY TRANSFORMERS ARE RATED IN kVA, NOT kW:
A transformer has two primary categories of losses:
1. Core / Iron Losses: Dependent purely on voltage V and frequency f: P_core ∝ V².
2. Copper / I²R Losses: Dependent purely on current I: P_cu ∝ I².

Neither loss depends on the phase angle ϕ or power factor (cos ϕ) of the connected load!
Since manufacturer cannot know whether a customer will connect a resistive load (cos ϕ = 1.0), inductive load (cos ϕ = 0.6), or capacitive load, the total loss and heating depends on Apparent Power (S = V · I in VA or kVA), not Real Power (P = V · I · cos ϕ in kW).`,
    markingScheme: [
      'Sinusoidal flux definition and Faraday\'s law differentiation (1.5 Marks)',
      'Mathematical proof establishing E = 4.44·f·N·Φ_m (1.5 Marks)',
      'Definition of transformation ratio K with step-up/down criteria (1.0 Mark)',
      'Clear physical justification of why transformers are rated in kVA (1.0 Mark)',
    ],
    examTip: 'Writing 4.44 without showing (√2 · π = 4.44) loses 0.5 marks. Always write E_rms = (2π / √2) · f · N · Φ_m = 4.44 · f · N · Φ_m.',
  },

  {
    id: 'eq-u3-transformer-efficiency-numerical',
    unitNumber: 3,
    marks: 10,
    category: 'Numerical Problem',
    question: 'The iron loss (P_i) and full-load copper loss (P_cu) of a 25 kVA, 2000/200 V, 50 Hz single-phase transformer are 200 W and 400 W respectively. Determine: (a) Efficiency at full-load at 0.8 power factor lagging, (b) Efficiency at half-load at 0.8 power factor lagging, and (c) Maximum efficiency and the kVA load at which it occurs at 0.8 power factor.',
    diagramTitle: 'Transformer Efficiency vs Load Fraction Characteristic Curve',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <line x1="50" y1="120" x2="450" y2="120" stroke="#78716c" stroke-width="2" />
      <line x1="50" y1="120" x2="50" y2="20" stroke="#78716c" stroke-width="2" />
      <text x="410" y="135" font-size="10" fill="#78716c">Load (kVA)</text>
      <text x="20" y="25" font-size="10" fill="#78716c">η (%)</text>
      <path d="M 50 120 Q 230 15 440 45" fill="none" stroke="#059669" stroke-width="2.5" />
      <line x1="230" y1="120" x2="230" y2="35" stroke="#78716c" stroke-width="1.5" stroke-dasharray="3,3" />
      <circle cx="230" cy="35" r="5" fill="#059669" />
      <text x="230" y="135" text-anchor="middle" font-size="10" font-weight="bold" fill="#0284c7">x_max = 0.707 (17.68 kVA)</text>
      <text x="245" y="32" font-size="10" font-weight="bold" fill="#059669">η_max = 97.25%</text>
    </svg>`,
    modelAnswer: `GIVEN DATA:
• Rated Apparent Power S = 25 kVA = 25,000 VA
• Voltage rating: 2000 V / 200 V
• Iron loss P_i (constant) = 200 W = 0.20 kW
• Full-load copper loss P_cu_FL = 400 W = 0.40 kW
• Operating power factor cos(ϕ) = 0.8 lagging

General Transformer Efficiency Formula:
   η = Output Power / Input Power = Output / (Output + P_i + P_cu)
   η = [ x · S · cos(ϕ) ] / [ x · S · cos(ϕ) + P_i + x² · P_cu_FL ]
   Where x = fraction of full load.

--------------------------------------------------------------------------------

CALCULATION:

PART (a): Efficiency at Full-Load (x = 1.0) at 0.8 pf:
• Full-load Output = 1.0 · 25,000 · 0.8 = 20,000 W = 20 kW
• Iron Loss P_i = 200 W
• Copper Loss at full load P_cu = (1.0)² · 400 W = 400 W
• Total Losses = 200 W + 400 W = 600 W = 0.6 kW
• Input Power = 20 kW + 0.6 kW = 20.6 kW

   η_FL = (20 / 20.6) · 100% = 97.087%

--------------------------------------------------------------------------------

PART (b): Efficiency at Half-Load (x = 0.5) at 0.8 pf:
• Half-load Output = 0.5 · 25,000 · 0.8 = 10,000 W = 10 kW
• Iron Loss P_i = 200 W (remains constant)
• Copper Loss at half load = x² · P_cu_FL = (0.5)² · 400 W = 0.25 · 400 = 100 W
• Total Losses = 200 W + 100 W = 300 W = 0.3 kW
• Input Power = 10 kW + 0.3 kW = 10.3 kW

   η_half = (10 / 10.3) · 100% = 97.087%

--------------------------------------------------------------------------------

PART (c): Condition for Maximum Efficiency & Value:
Maximum efficiency occurs when variable copper loss equals constant iron loss:
   x² · P_cu_FL = P_i
   x_max = √(P_i / P_cu_FL) = √(200 / 400) = √(0.5) = 0.7071 (70.71% of full load)

kVA Load at Maximum Efficiency:
   kVA_max = x_max · S_rated = 0.7071 · 25 kVA = 17.678 kVA

Output Power at Maximum Efficiency (0.8 pf):
   P_out_max = 17.678 kW · 0.8 = 14.142 kW
Total Losses at Maximum Efficiency = 2 · P_i = 2 · 200 W = 400 W = 0.40 kW
Input Power = 14.142 kW + 0.40 kW = 14.542 kW

   η_max = (14.142 / 14.542) · 100% = 97.25%`,
    givenData: ['S = 25 kVA', 'P_i = 200 W', 'P_cu_FL = 400 W', 'cos(ϕ) = 0.8'],
    finalResult: 'η_FL = 97.09%, η_half = 97.09%, kVA_max = 17.68 kVA, η_max = 97.25%',
    markingScheme: [
      'Efficiency formula with load fraction x (1.5 Marks)',
      'Full load efficiency calculation η_FL = 97.09% (2.5 Marks)',
      'Half load copper loss (100 W) and efficiency η_half = 97.09% (2.5 Marks)',
      'Derivation of x_max = √(P_i/P_cu) = 0.707 and load = 17.68 kVA (2.0 Marks)',
      'Maximum efficiency η_max = 97.25% evaluation (1.5 Marks)',
    ],
    examTip: 'Note that copper loss at half load is (1/2)² = 1/4th of full load copper loss! Many students mistakenly halve the copper loss to 200 W instead of 100 W.',
  },

  {
    id: 'eq-u3-induction-motor-torque-speed',
    unitNumber: 3,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Draw and explain the Torque-Speed and Torque-Slip characteristic curves of a Three-Phase Induction Motor. Clearly explain Motoring mode, Generating mode, and Braking mode. Enlist four practical applications.',
    diagramTitle: '3-Phase Induction Motor Torque-Slip Characteristic Curve',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <line x1="50" y1="120" x2="450" y2="120" stroke="#78716c" stroke-width="2" />
      <line x1="250" y1="140" x2="250" y2="20" stroke="#78716c" stroke-width="1.5" />
      <text x="50" y="135" font-size="9" fill="#78716c">s = 2 (Braking)</text>
      <text x="240" y="135" font-size="9" font-weight="bold" fill="#0284c7">s = 1 (Standstill)</text>
      <text x="380" y="135" font-size="9" font-weight="bold" fill="#059669">s = 0 (Sync Ns)</text>
      <!-- Torque curve -->
      <path d="M 60 115 Q 150 110 240 70 Q 320 20 380 120 Q 420 150 440 145" fill="none" stroke="#b45309" stroke-width="2.5" />
      <text x="320" y="25" font-size="10" font-weight="bold" fill="#b45309">T_max (Breakdown Torque)</text>
      <text x="290" y="80" font-size="9" font-weight="bold" fill="#059669">Stable Motoring (0 < s < s_m)</text>
    </svg>`,
    modelAnswer: `1. Three Operating Regions of a 3-Phase Induction Motor:

(a) Motoring Region (0 < s < 1, 0 < N_r < N_s):
• Stator rotating magnetic field (RMF) spins at synchronous speed N_s. Rotor rotates in the same direction at speed N_r < N_s.
• Low-Slip Stable Zone (0 to s_max): Torque is directly proportional to slip (T ∝ s). Linear stable operating region.
• High-Slip Unstable Zone (s_max to 1): Torque is inversely proportional to slip (T ∝ 1/s). Motor stalls if load exceeds breakdown torque T_max.

(b) Generating Region (s < 0, N_r > N_s):
• Occurs when an external mechanical prime mover (e.g., wind turbine or downhill train) drives the rotor faster than synchronous speed N_s.
• Slip becomes negative; machine delivers active electrical power back into the AC supply grid.

(c) Braking / Plugging Region (s > 1, N_r opposite to N_s):
• Achieved by swapping any two stator supply phases while the motor is spinning.
• Reverses the direction of the rotating magnetic field, exerting a fierce counter-torque that halts the motor rapidly within seconds.

--------------------------------------------------------------------------------

2. Four Practical Industrial Applications:
1. Centrifugal Water Pumps & Agricultural Pump-sets (Squirrel-cage, high reliability).
2. Industrial Conveyor Belts & Cranes (Slip-ring induction motor with high starting torque).
3. Machine Tool Lathes & Milling Cutters (Constant speed under varying cuts).
4. Electric Locomotives & Heavy Traction (Inverter-driven 3-phase induction motors).`,
    markingScheme: [
      'Accurate sketch of Torque-Slip curve showing T_start, T_max, and operating regions (2.0 Marks)',
      'Explanation of Motoring, Generating, and Braking modes with slip ranges (2.0 Marks)',
      'Four valid industrial applications (1.0 Mark)',
    ],
    examTip: 'Remember to identify that at synchronous speed (s = 0), torque is ZERO because rotor conductors do not cut any magnetic flux.',
  },

  {
    id: 'eq-u3-pmmc-instrument',
    unitNumber: 3,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Explain the construction and working principle of a Permanent Magnet Moving Coil (PMMC / D\'Arsonval) instrument with a neat diagram. Derive the deflecting torque equation T_d = B · I · N · A. Explain why a PMMC instrument cannot measure alternating current (AC).',
    diagramTitle: 'PMMC (Permanent Magnet Moving Coil) Instrument Cross-Section',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <!-- Permanent Magnet Poles -->
      <path d="M 50 30 Q 80 75 50 120 L 20 120 L 20 30 Z" fill="#fed7aa" stroke="#c2410c" stroke-width="2" />
      <text x="30" y="80" font-size="12" font-weight="bold" fill="#c2410c">N</text>
      <path d="M 190 30 Q 160 75 190 120 L 220 120 L 220 30 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2" />
      <text x="200" y="80" font-size="12" font-weight="bold" fill="#0284c7">S</text>
      <!-- Soft Iron Core -->
      <circle cx="120" cy="75" r="30" fill="#cbd5e1" stroke="#475569" stroke-width="2" />
      <!-- Pointer & Scale -->
      <line x1="120" y1="75" x2="120" y2="20" stroke="#dc2626" stroke-width="2" />
      <path d="M 80 15 Q 120 5 160 15" fill="none" stroke="#78716c" stroke-width="1.5" />
      <!-- Formula Box -->
      <rect x="250" y="25" width="220" height="100" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
      <text x="265" y="50" font-size="11" font-weight="bold" fill="#0284c7">Deflecting Torque: Td = B·I·N·A</text>
      <text x="265" y="75" font-size="11" font-weight="bold" fill="#059669">Controlling Torque: Tc = C · θ</text>
      <text x="265" y="100" font-size="11" font-weight="bold" fill="#b45309">Linear Scale: θ ∝ I</text>
    </svg>`,
    modelAnswer: `1. Principle and Construction:
A PMMC instrument operates on the Motor Principle (Lorentz Force): when a current-carrying coil is placed in a magnetic field, it experiences a mechanical deflecting torque proportional to current.
Key Components:
1. Permanent Magnet: U-shaped Alnico magnet with curved soft iron pole shoes producing an intense radial magnetic field.
2. Moving Coil: Fine insulated copper wire wound on an aluminum former pivoted on jeweled bearings.
3. Control Springs: Two phosphor-bronze hairsprings provide controlling torque T_c and lead current into/out of the coil.
4. Eddy Current Damping: The aluminum former rotates in the magnetic field, inducing eddy currents that provide deadbeat damping without friction.

--------------------------------------------------------------------------------

2. Derivation of Deflecting Torque (T_d):
Let:
• B = Magnetic flux density in air gap (Tesla)
• I = Current flowing through moving coil (Amperes)
• L = Active length of coil vertical side (m)
• b = Width of coil (m)
• N = Number of turns on coil
• A = Effective area of coil = L · b (m²)

Force acting on each vertical side of the coil (Lorentz force F = B·I·L):
   F = N · B · I · L  Newtons

Deflecting Torque T_d = Force × Perpendicular Distance (moment arm b):
   T_d = F · b = (N · B · I · L) · b = B · I · N · (L · b)
   T_d = B · I · N · A   (or T_d = G · I, where G = B·N·A = constant)

Controlling Torque exerted by phosphor bronze hairsprings:
   T_c = C · θ
   Where C = spring torsional constant (N·m/rad) and θ = angular deflection.

At steady-state equilibrium:
   T_d = T_c
   B · I · N · A = C · θ
   θ = [ (B · N · A) / C ] · I
   ==>   θ ∝ I

Because deflection θ is directly proportional to current I, PMMC instruments have a perfectly UNIFORM (LINEAR) scale.

--------------------------------------------------------------------------------

3. Why PMMC Cannot Measure AC:
In alternating current (50 Hz), current direction reverses every 10 milliseconds. The deflecting torque reverses direction 100 times per second. Due to the high mechanical inertia of the moving coil and pointer assembly, the pointer cannot follow these rapid reversals and simply vibrates imperceptibly about zero. Hence, PMMC indicates zero on AC.`,
    markingScheme: [
      'Construction details and neat labeled cross-section sketch (2.0 Marks)',
      'Mathematical derivation of T_d = B·I·N·A and linear deflection θ ∝ I (2.0 Marks)',
      'Explanation of why PMMC reads zero on AC due to inertia (1.0 Mark)',
    ],
    examTip: 'State that PMMC scale is linear (θ ∝ I), whereas Moving Iron (MI) scale is non-linear / square-law (θ ∝ I²).',
  },

  // =========================================================================
  // UNIT 4: SEMICONDUCTORS, TRANSISTORS (BJT) & SENSORS
  // =========================================================================
  {
    id: 'eq-u4-1',
    unitNumber: 4,
    marks: 10,
    category: 'Long Answer / Derivation',
    question: 'Explain the working of a Full-Wave Bridge Rectifier with a neat circuit diagram. Describe operation during positive and negative half-cycles. Derive expressions for: (a) Rectification Efficiency (η = 81.2%), and (b) Ripple Factor (γ = 0.482). Define Peak Inverse Voltage (PIV).',
    diagramTitle: 'Full-Wave Bridge Rectifier Circuit Schematic & Waveforms',
    diagramSvg: `<svg viewBox="0 0 500 170" class="w-full h-auto max-w-lg mx-auto">
      <line x1="30" y1="50" x2="60" y2="50" stroke="#0284c7" stroke-width="2" />
      <line x1="30" y1="120" x2="60" y2="120" stroke="#0284c7" stroke-width="2" />
      <text x="15" y="90" font-size="10" font-weight="bold" fill="#0284c7">AC Vin</text>
      <polygon points="120,30 170,85 120,140 70,85" fill="#f8fafc" stroke="#b45309" stroke-width="2" />
      <text x="80" y="55" font-size="9" font-weight="bold" fill="#b45309">D1</text>
      <text x="140" y="55" font-size="9" font-weight="bold" fill="#b45309">D2</text>
      <text x="80" y="125" font-size="9" font-weight="bold" fill="#b45309">D4</text>
      <text x="140" y="125" font-size="9" font-weight="bold" fill="#b45309">D3</text>
      <line x1="170" y1="85" x2="220" y2="85" stroke="#059669" stroke-width="2" />
      <rect x="220" y="75" width="30" height="20" fill="#fef3c7" stroke="#059669" stroke-width="1.5" />
      <text x="228" y="90" font-size="10" font-weight="bold" fill="#059669">RL</text>
      <line x1="280" y1="50" x2="480" y2="50" stroke="#78716c" stroke-width="1.5" />
      <path d="M 280 50 Q 305 20 330 50 Q 355 80 380 50" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="390" y="45" font-size="9" font-weight="bold" fill="#0284c7">Input AC</text>
      <line x1="280" y1="130" x2="480" y2="130" stroke="#78716c" stroke-width="1.5" />
      <path d="M 280 130 Q 305 100 330 130 Q 355 100 380 130 Q 405 100 430 130" fill="none" stroke="#dc2626" stroke-width="2.5" />
      <text x="435" y="125" font-size="9" font-weight="bold" fill="#dc2626">Output DC</text>
    </svg>`,
    modelAnswer: `1. CIRCUIT OPERATION:
The Full-Wave Bridge Rectifier utilizes four semiconductor diodes (D₁, D₂, D₃, D₄) arranged in a closed bridge loop across a step-down transformer secondary and a load resistor R_L.

(a) During Positive Half-Cycle of Input AC:
• Diodes D₁ and D₃ are Forward Biased.
• Diodes D₂ and D₄ are Reverse Biased (act as open switches).
• Current Path: Terminal A → D₁ → Load Resistor R_L (top to bottom) → D₃ → Terminal B.

(b) During Negative Half-Cycle of Input AC:
• Diodes D₂ and D₄ are Forward Biased.
• Diodes D₁ and D₃ are Reverse Biased.
• Current Path: Terminal B → D₂ → Load Resistor R_L (top to bottom) → D₄ → Terminal A.

Crucial Observation: Current flows through load resistor R_L in the EXACT SAME DIRECTION during BOTH half-cycles, producing continuous pulsating DC.

--------------------------------------------------------------------------------

2. DERIVATION OF RECTIFICATION EFFICIENCY (η):
Definition: Ratio of DC output power delivered to load to total AC input power:
   η = P_dc / P_ac

Average / DC Output Current:
   I_dc = (2 · I_m) / π
DC Power across Load R_L:
   P_dc = (I_dc)² · R_L = [ (2 · I_m) / π ]² · R_L = (4 / π²) · I_m² · R_L

RMS Current of Full-Wave Output:
   I_rms = I_m / √2
Total AC Input Power:
   P_ac = (I_rms)² · R_L = (I_m / √2)² · R_L = (I_m² / 2) · R_L

Assuming ideal diodes (forward resistance r_f << R_L):
   η = P_dc / P_ac = [ (4 / π²) · I_m² · R_L ] / [ (I_m² / 2) · R_L ] = 8 / π² = 0.8119
   Maximum Theoretical Efficiency η = 81.2% (Double that of Half-Wave: 40.6%).

--------------------------------------------------------------------------------

3. DERIVATION OF RIPPLE FACTOR (γ):
   γ = I_ac / I_dc = √[ (I_rms / I_dc)² - 1 ]
Substituting I_rms / I_dc = (I_m / √2) / (2 · I_m / π) = π / (2 · √2) = 1.1107:
   γ = √[ (1.1107)² - 1 ] = √[ 1.2337 - 1 ] = √[ 0.2337 ] = 0.482 (48.2%).

4. PEAK INVERSE VOLTAGE (PIV):
For Bridge Rectifier: PIV = V_m (Peak secondary voltage).`,
    markingScheme: [
      'Bridge circuit schematic and operation during both half-cycles (2.5 Marks)',
      'Input AC and rectified pulsating DC waveforms (1.5 Marks)',
      'Mathematical derivation of DC current, AC power, and Efficiency η = 81.2% (3.0 Marks)',
      'Mathematical derivation of Ripple Factor γ = 0.482 (2.0 Marks)',
      'Definition and value of Peak Inverse Voltage PIV = V_m (1.0 Mark)',
    ],
    examTip: 'Emphasize that the Bridge Rectifier does NOT require an expensive center-tapped transformer and has half the PIV requirement of a center-tap rectifier.',
  },

  {
    id: 'eq-u4-bjt-ce-characteristics',
    unitNumber: 4,
    marks: 10,
    category: 'Long Answer / Derivation',
    question: 'With neat circuit diagrams, explain the operation, Input Characteristics, and Output Characteristics of an NPN Bipolar Junction Transistor (BJT) in Common Emitter (CE) configuration. Clearly define the Cut-off Region, Active Region, and Saturation Region.',
    diagramTitle: 'BJT Common Emitter Circuit & Output Characteristics (Ic vs Vce)',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <!-- Circuit (Left) -->
      <circle cx="80" cy="75" r="28" fill="#f8fafc" stroke="#334155" stroke-width="2" />
      <line x1="80" y1="60" x2="80" y2="90" stroke="#334155" stroke-width="3" />
      <line x1="80" y1="68" x2="100" y2="52" stroke="#334155" stroke-width="2" />
      <line x1="80" y1="82" x2="100" y2="98" stroke="#334155" stroke-width="2" />
      <polygon points="98,92 105,102 93,99" fill="#334155" />
      <text x="45" y="79" font-size="10" font-weight="bold">Base (B)</text>
      <text x="105" y="50" font-size="9" font-weight="bold">C</text>
      <text x="105" y="110" font-size="9" font-weight="bold">E (Gnd)</text>
      <!-- Output Curves (Right) -->
      <line x1="220" y1="130" x2="450" y2="130" stroke="#78716c" stroke-width="1.5" />
      <line x1="220" y1="130" x2="220" y2="20" stroke="#78716c" stroke-width="1.5" />
      <text x="430" y="145" font-size="9" fill="#78716c">Vce (V)</text>
      <text x="200" y="25" font-size="9" fill="#78716c">Ic (mA)</text>
      <!-- Active Curves -->
      <path d="M 220 130 L 240 50 L 440 45" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="445" y="48" font-size="8" fill="#0284c7">Ib=40μA</text>
      <path d="M 220 130 L 240 80 L 440 76" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="445" y="79" font-size="8" fill="#0284c7">Ib=20μA</text>
      <text x="270" y="70" font-size="10" font-weight="bold" fill="#0284c7">ACTIVE REGION (Linear Amp)</text>
      <text x="225" y="35" font-size="8" font-weight="bold" fill="#b45309">SATURATION</text>
      <text x="280" y="125" font-size="8" font-weight="bold" fill="#dc2626">CUT-OFF (Ib = 0)</text>
    </svg>`,
    modelAnswer: `1. COMMON EMITTER (CE) CONFIGURATION:
In the CE configuration, the Emitter terminal is common to both the input (base-emitter) and output (collector-emitter) circuits. It is the most widely utilized configuration in electronics because it provides HIGH current gain (β ≈ 50 to 300), HIGH voltage gain, and MAXIMUM power gain.

--------------------------------------------------------------------------------

2. INPUT CHARACTERISTICS (I_B vs V_BE at constant V_CE):
• Plot of Base Current I_B (in microamperes, μA) versus Base-Emitter Voltage V_BE (in Volts) for fixed values of Collector-Emitter Voltage V_CE.
• Nature: Resembles a forward-biased P-N junction diode curve. Below knee voltage (0.7 V for Silicon), base current is negligible. Beyond 0.7 V, I_B rises steeply.
• Input Dynamic Resistance (R_in):
   R_in = ΔV_BE / ΔI_B |_(V_CE = constant)  (Typically ~ 1 kΩ to 2 kΩ).

--------------------------------------------------------------------------------

3. OUTPUT CHARACTERISTICS (I_C vs V_CE at constant I_B):
Plot of Collector Current I_C (in milliamperes, mA) versus Collector-Emitter Voltage V_CE for fixed values of Base Current I_B.
It is divided into three distinct operational regions:

1. Active Region (Base-Emitter Forward Biased, Base-Collector Reverse Biased):
• The curves are nearly horizontal and flat.
• Collector current depends strictly on base current: I_C = β · I_B.
• V_CE has very little effect on I_C.
• Used exclusively for: LINEAR SIGNAL AMPLIFIERS.

2. Saturation Region (Both Junctions Forward Biased):
• Occurs at low collector voltages: V_CE < V_CE(sat) ≈ 0.2 V.
• Collector current drops steeply to zero regardless of base current.
• Used as: CLOSED (ON) SWITCH in digital logic.

3. Cut-off Region (Both Junctions Reverse Biased):
• Occurs when base current I_B = 0.
• Only a tiny reverse leakage current (I_CEO) flows.
• Used as: OPEN (OFF) SWITCH in digital logic.

Output Dynamic Resistance (R_out):
   R_out = ΔV_CE / ΔI_C |_(I_B = constant)  (Typically high: ~ 50 kΩ).`,
    markingScheme: [
      'CE circuit diagram with input and output biasing sources (2.5 Marks)',
      'Input characteristic curve with dynamic resistance formula (2.5 Marks)',
      'Output characteristic curves showing Active, Saturation, and Cut-off regions (3.0 Marks)',
      'Applications of regions (Amplifier in Active, Switch in Saturation/Cut-off) (2.0 Marks)',
    ],
    examTip: 'State the biasing conditions: Active = EB forward + CB reverse; Saturation = both forward; Cut-off = both reverse. This table earns full 2 marks.',
  },

  {
    id: 'eq-u4-transistor-alpha-beta',
    unitNumber: 4,
    marks: 2,
    category: 'Short Answer',
    question: 'Define transistor current amplification factors α, β, and γ. Derive the relationship between α and β. If a BJT has β = 100 and base current I_B = 10 μA, calculate the collector current I_C and emitter current I_E.',
    diagramTitle: 'Transistor Current Flow and Current Gain Definitions',
    diagramSvg: `<svg viewBox="0 0 450 120" class="w-full h-auto max-w-md mx-auto">
      <rect x="30" y="20" width="390" height="80" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
      <text x="50" y="45" font-size="11" font-weight="bold" fill="#0284c7">IE = IB + IC</text>
      <text x="50" y="68" font-size="11" font-family="monospace">β = α / (1 - α)   and   α = β / (1 + β)</text>
      <text x="50" y="88" font-size="10" font-weight="bold" fill="#059669">If β = 100, IB = 10 μA ==> IC = 1.0 mA, IE = 1.01 mA</text>
    </svg>`,
    modelAnswer: `1. Definitions of Current Amplification Factors:
• Common Base Current Gain (α): Ratio of collector current to emitter current: α = I_C / I_E (typically 0.95 to 0.995).
• Common Emitter Current Gain (β): Ratio of collector current to base current: β = I_C / I_B (typically 50 to 300).
• Common Collector Current Gain (γ): Ratio of emitter current to base current: γ = I_E / I_B = 1 + β.

--------------------------------------------------------------------------------

2. Derivation of Relationship between α and β:
By Kirchhoff's Current Law for any BJT:
   I_E = I_B + I_C

Divide both sides by I_C:
   I_E / I_C = (I_B / I_C) + 1
Since I_E / I_C = 1 / α and I_B / I_C = 1 / β:
   1 / α = (1 / β) + 1 = (1 + β) / β
Taking reciprocal:
   α = β / (1 + β)

Rearranging to express β in terms of α:
   β · (1 - α) = α
   β = α / (1 - α)

--------------------------------------------------------------------------------

3. Numerical Calculation:
Given: β = 100, I_B = 10 μA = 10 × 10⁻⁶ A
• Collector Current:
   I_C = β · I_B = 100 · (10 × 10⁻⁶ A) = 1000 × 10⁻⁶ A = 1.0 mA = 0.001 A

• Emitter Current:
   I_E = I_B + I_C = 10 μA + 1000 μA = 1010 μA = 1.01 mA`,
    givenData: ['β = 100', 'I_B = 10 μA'],
    finalResult: 'I_C = 1.0 mA, I_E = 1.01 mA',
    markingScheme: [
      'Definitions of α and β with formulas (0.5 Mark)',
      'Derivation proving β = α / (1 - α) (0.5 Mark)',
      'Calculation of I_C = 1.0 mA (0.5 Mark)',
      'Calculation of I_E = 1.01 mA (0.5 Mark)',
    ],
    examTip: 'Remember I_E is always the largest current in a transistor: I_E = I_B + I_C.',
  },

  {
    id: 'eq-u4-thermistor-thermocouple',
    unitNumber: 4,
    marks: 5,
    category: 'Short Answer',
    question: 'Explain the working principles, construction, and temperature-resistance characteristics of: (a) Thermistor (Negative Temperature Coefficient vs Positive Temperature Coefficient), and (b) Thermocouple (Seebeck Effect). State two applications for each.',
    diagramTitle: 'Thermistor Resistance Curve vs Thermocouple Seebeck Junction',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <!-- Thermistor -->
      <line x1="50" y1="120" x2="200" y2="120" stroke="#78716c" stroke-width="1.5" />
      <line x1="50" y1="120" x2="50" y2="20" stroke="#78716c" stroke-width="1.5" />
      <path d="M 55 30 Q 80 110 190 115" fill="none" stroke="#dc2626" stroke-width="2.5" />
      <text x="60" y="45" font-size="9" font-weight="bold" fill="#dc2626">NTC Curve: R drops with T</text>
      <!-- Thermocouple -->
      <path d="M 280 70 L 370 40 L 440 70" fill="none" stroke="#b45309" stroke-width="2.5" />
      <path d="M 280 70 L 370 100 L 440 70" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <circle cx="280" cy="70" r="4" fill="#ef4444" />
      <text x="250" y="65" font-size="9" font-weight="bold" fill="#ef4444">Hot (T1)</text>
      <circle cx="440" cy="70" r="4" fill="#0284c7" />
      <text x="445" y="65" font-size="9" font-weight="bold" fill="#0284c7">Cold (T0)</text>
      <text x="360" y="75" font-size="10" font-weight="bold" fill="#059669">EMF V = α·ΔT</text>
    </svg>`,
    modelAnswer: `1. THERMISTOR (Thermal Resistor):
• Working Principle: A temperature-sensitive semiconductor resistor fabricated from sintered metal oxides (manganese, nickel, cobalt, copper).
• Characteristics:
  - NTC (Negative Temperature Coefficient): Most common. As temperature rises, covalent bonds break, releasing millions of free electrons; resistance drops exponentially: R(T) = R₀ · e^[β(1/T - 1/T₀)].
  - PTC (Positive Temperature Coefficient): Resistance spikes abruptly above a critical switching Curie temperature.
• Applications: Inrush current limiters in power supplies, engine coolant temperature sensors, digital fever thermometers.

--------------------------------------------------------------------------------

2. THERMOCOUPLE (Thermoelectric Transducer):
• Working Principle: Operates on the Seebeck Effect. When two dissimilar metal wires (e.g., Chromel and Alumel, or Iron and Constantan) are joined at both ends to form two junctions held at different temperatures (Hot Junction T₁ and Cold Reference Junction T₀), an electromotive force (Thermoelectric EMF) is generated:
   V = α · (T₁ - T₀) + β · (T₁ - T₀)²
   Where α and β are thermoelectric coefficients of the metal couple.
• Characteristics: Self-generating (active transducer), wide temperature measurement range (-200°C to +1800°C), highly rugged.
• Applications: Blast furnace molten steel temperature measurement, gas stove flame failure pilot sensors, industrial kilns.`,
    markingScheme: [
      'Thermistor principle, NTC/PTC distinction, and curve (2.5 Marks)',
      'Thermocouple Seebeck effect principle, diagram, and equation (2.5 Marks)',
    ],
    examTip: 'Note that a Thermistor is a PASSIVE transducer (requires external DC excitation), while a Thermocouple is an ACTIVE transducer (generates its own voltage output).',
  },

  // =========================================================================
  // UNIT 5: ELECTRICAL ENERGY GENERATION, DISTRIBUTION AND SAFETY
  // =========================================================================
  {
    id: 'eq-u5-1',
    unitNumber: 5,
    marks: 10,
    category: 'Long Answer / Derivation',
    question: 'Draw and explain the Single-Line Diagram (SLD) of an Electrical Power Supply System from the Generating Station to Consumer Terminals. Specify typical voltage levels at each stage. Explain why electrical power is transmitted at high voltage.',
    diagramTitle: 'Single-Line Diagram (SLD) of AC Power Transmission and Distribution',
    diagramSvg: `<svg viewBox="0 0 500 170" class="w-full h-auto max-w-lg mx-auto">
      <circle cx="40" cy="80" r="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <text x="25" y="84" font-size="9" font-weight="bold" fill="#0284c7">GEN 11kV</text>
      <line x1="62" y1="80" x2="90" y2="80" stroke="#475569" stroke-width="2" />
      <circle cx="105" cy="80" r="14" fill="none" stroke="#b45309" stroke-width="2" />
      <circle cx="120" cy="80" r="14" fill="none" stroke="#b45309" stroke-width="2" />
      <text x="88" y="112" font-size="8" font-weight="bold" fill="#b45309">11kV / 400kV</text>
      <line x1="135" y1="80" x2="220" y2="80" stroke="#dc2626" stroke-width="3" />
      <text x="145" y="70" font-size="9" font-weight="bold" fill="#dc2626">HV Grid (400 kV)</text>
      <circle cx="235" cy="80" r="14" fill="none" stroke="#b45309" stroke-width="2" />
      <circle cx="250" cy="80" r="14" fill="none" stroke="#b45309" stroke-width="2" />
      <text x="215" y="112" font-size="8" font-weight="bold" fill="#b45309">400kV / 33kV</text>
      <line x1="265" y1="80" x2="330" y2="80" stroke="#f59e0b" stroke-width="2" />
      <circle cx="345" cy="80" r="14" fill="none" stroke="#b45309" stroke-width="2" />
      <circle cx="360" cy="80" r="14" fill="none" stroke="#b45309" stroke-width="2" />
      <text x="330" y="112" font-size="8" font-weight="bold" fill="#b45309">33kV / 11kV</text>
      <line x1="375" y1="80" x2="420" y2="80" stroke="#059669" stroke-width="2" />
      <circle cx="435" cy="80" r="12" fill="none" stroke="#059669" stroke-width="2" />
      <circle cx="447" cy="80" r="12" fill="none" stroke="#059669" stroke-width="2" />
      <text x="410" y="112" font-size="8" font-weight="bold" fill="#059669">11kV / 415V</text>
      <text x="400" y="145" font-size="9" font-weight="bold" fill="#059669">415V (3-Ph) / 230V (1-Ph)</text>
    </svg>`,
    modelAnswer: `1. SYSTEMATIC STAGES OF ELECTRICAL POWER SUPPLY:
The modern electric power network is structured into Generation, Transmission, and Distribution subsystems.

Stage 1: Electrical Power Generation (11 kV)
• 3-Phase synchronous alternators generate electric power at standard voltages of 11 kV (or 15.75 kV, 22 kV, 33 kV) at 50 Hz frequency in thermal, hydroelectric, nuclear, or solar solar plants.

Stage 2: Primary Transmission (Step-Up to 220 kV / 400 kV / 765 kV)
• Power is stepped up using 3-phase delta-star transformers at the generating station switchyard to Extra High Voltage (EHV): 220 kV, 400 kV, or 765 kV AC.
• Transmitted across long cross-country distances via steel lattice towers and bundled ACSR conductors.

Stage 3: Secondary Transmission (Step-Down to 66 kV / 33 kV)
• At the outskirts of metropolitan areas, Primary Grid Substations step down the voltage to 66 kV or 33 kV using high-capacity step-down transformers.

Stage 4: Primary Distribution (Step-Down to 11 kV)
• City substations step down 33 kV to 11 kV.
• 11 kV feeders distribute power through city streets to large industrial customers and local distribution transformers.

Stage 5: Secondary Distribution (Step-Down to 415 V Three-Phase / 230 V Single-Phase)
• Pole-mounted distribution transformers (Delta-Star, 11 kV / 415 V) convert power to consumer level:
  - 415 V, 3-Phase, 4-Wire for commercial buildings and induction motors.
  - 230 V, 1-Phase, 2-Wire between any line phase and neutral for domestic residential loads.

--------------------------------------------------------------------------------

2. REASONS FOR HIGH VOLTAGE TRANSMISSION:
Consider transmission of electric power P across distance L with line resistance R:
   P = √3 · V_L · I_L · cos(ϕ)   ==>   I_L = P / [ √3 · V_L · cos(ϕ) ]

1. Huge Reduction in Conductor Material & Copper Volume:
   Volume of conductor material V_cu ∝ 1 / (V_L² · cos²ϕ). Transmitting at 10 times higher voltage requires 100 times less copper/aluminum conductor mass!
2. Drastic Reduction in Transmission Power Losses (I²R Losses):
   Power Loss P_loss = 3 · I_L² · R ∝ 1 / V_L². Doubling transmission voltage reduces heat dissipation loss to one-fourth (25%).
3. Improved Transmission Efficiency:
   Higher voltage means lower losses and superior efficiency (> 95% at 400 kV).
4. Reduced Voltage Drop in Transmission Line:
   Line voltage drop ΔV = I_L · Z_line is smaller due to lower current.`,
    markingScheme: [
      'Neat Single-Line Diagram showing all 5 stages from Generation to Consumer (3.5 Marks)',
      'Correct voltage standards at each transformer stage (11kV → 400kV → 33kV → 11kV → 415V/230V) (2.5 Marks)',
      'Mathematical proof of I ∝ 1/V and Losses P_loss ∝ 1/V² (2.5 Marks)',
      'Proof of conductor volume reduction V_cu ∝ 1/V² (1.5 Marks)',
    ],
    examTip: 'Always write both voltage numbers at the final stage: 415 V (3-Phase line-to-line) and 230 V (1-Phase line-to-neutral). Mentioning both shows precise real-world knowledge.',
  },

  {
    id: 'eq-u5-2',
    unitNumber: 5,
    marks: 5,
    category: 'Short Answer',
    question: 'What is Electrical Earthing? Explain the differences between Pipe Earthing and Plate Earthing with neat diagrams. Explain why charcoal and salt are packed around the earth electrode.',
    diagramTitle: 'Pipe Earthing Installation Diagram & Earth Pit Cross-Section',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <line x1="40" y1="40" x2="450" y2="40" stroke="#78716c" stroke-width="2" />
      <text x="50" y="32" font-size="10" font-weight="bold" fill="#78716c">Ground Level</text>
      <polygon points="120,40 140,40 130,55" fill="#64748b" stroke="#334155" stroke-width="1.5" />
      <text x="145" y="52" font-size="9" fill="#334155">Water Funnel with Wire Mesh</text>
      <rect x="127" y="55" width="8" height="90" fill="#94a3b8" stroke="#334155" stroke-width="1.5" />
      <circle cx="131" cy="75" r="1.5" fill="#ffffff" />
      <circle cx="131" cy="95" r="1.5" fill="#ffffff" />
      <circle cx="131" cy="115" r="1.5" fill="#ffffff" />
      <circle cx="131" cy="130" r="1.5" fill="#ffffff" />
      <rect x="100" y="60" width="62" height="85" fill="#fef3c7" fill-opacity="0.5" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="175" y="85" font-size="10" font-weight="bold" fill="#b45309">Alternate Layers of</text>
      <text x="175" y="100" font-size="10" font-weight="bold" fill="#b45309">Charcoal &amp; Salt (15 cm each)</text>
      <text x="175" y="130" font-size="9" font-weight="bold" fill="#059669">Perforated GI Pipe (38 mm dia, 2.5 m length)</text>
    </svg>`,
    modelAnswer: `1. DEFINITION AND NECESSITY OF ELECTRICAL EARTHING:
Electrical Earthing is the process of connecting the non-current-carrying metallic parts of electrical equipment (appliances, transformer tanks, motor casings) to the general mass of the Earth through a very low resistance conducting path (typically < 1 to 2 Ω).

Primary Purpose:
1. Safety of Human Life: During insulation breakdown, if a live phase wire contacts metallic chassis, the earthing wire diverts fault current into the ground, tripping the MCB or blowing the fuse within 20 milliseconds to prevent fatal shock.
2. Lightning & Surge Protection: Safely discharges atmospheric surges to ground.
3. System Voltage Stabilization: Maintains neutral point voltage at 0 V potential.

--------------------------------------------------------------------------------

2. COMPARISON: PIPE EARTHING VS PLATE EARTHING:
| Feature | Pipe Earthing | Plate Earthing |
|---|---|---|
| Earth Electrode | Perforated Galvanized Iron (GI) pipe, 38 mm diameter, 2.5 m long | GI or Copper plate (60 cm × 60 cm × 3.18 mm Copper or 6.35 mm GI) |
| Installation | Driven vertically into earth pit at depth ≥ 2.5 to 3.75 m | Buried vertically at depth ≥ 3.0 m |
| Soil Suitability | Standard soils, sandy soils, residences, substations | Low-resistivity soils, heavy industrial plants, generating stations |
| Cost & Installation | Economical, simple, easily watered via funnel | More expensive, requires deep excavation pit |

--------------------------------------------------------------------------------

3. PURPOSE OF CHARCOAL AND COMMON SALT IN EARTH PIT:
The earth electrode is surrounded by alternate layers of crushed charcoal (or coke) and common salt (sodium chloride, NaCl) of approximately 15 cm thickness:
1. Reduction of Soil Resistivity: Salt dissolves in soil moisture to create free sodium (Na⁺) and chloride (Cl⁻) ions, exponentially enhancing ionic conductivity.
2. Long-Term Moisture Retention: Charcoal is porous and retains water for prolonged periods, preventing the earth pit from drying out.
Together, they maintain earth resistance well below the safety threshold of 2 to 5 Ohms.`,
    markingScheme: [
      'Definition of earthing and life-safety mechanism (1.0 Mark)',
      'Neat labeled sketch of Pipe Earthing with depth and dimensions (1.5 Marks)',
      'Comparison between Pipe and Plate earthing methods (1.0 Mark)',
      'Technical explanation of charcoal (moisture) and salt (ionic conductivity) (1.5 Marks)',
    ],
    examTip: 'Mention the acceptable earth resistance limits: Domestic installations < 5 Ω; Large electrical substations < 1 Ω.',
  },

  {
    id: 'eq-u5-batteries',
    unitNumber: 5,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Classify electrical storage batteries into Primary and Secondary categories. Explain the construction, chemical reactions during charge/discharge, and characteristics of: (a) Lead-Acid Battery, and (b) Lithium-Ion Battery. Define Ampere-Hour (Ah) rating and State of Charge (SoC).',
    diagramTitle: 'Lead-Acid Cell & Lithium-Ion Intercalation Mechanisms',
    diagramSvg: `<svg viewBox="0 0 500 150" class="w-full h-auto max-w-lg mx-auto">
      <!-- Lead Acid -->
      <rect x="40" y="25" width="180" height="100" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="2" />
      <text x="50" y="45" font-size="10" font-weight="bold" fill="#0284c7">LEAD-ACID CELL (2.1 V)</text>
      <rect x="65" y="55" width="12" height="50" fill="#991b1b" />
      <text x="60" y="118" font-size="8" font-weight="bold">PbO2 (+)</text>
      <rect x="100" y="55" width="12" height="50" fill="#475569" />
      <text x="100" y="118" font-size="8" font-weight="bold">Pb (-)</text>
      <text x="125" y="80" font-size="9" fill="#0369a1">H2SO4 Electrolyte</text>
      <!-- Lithium Ion -->
      <rect x="260" y="25" width="200" height="100" rx="6" fill="#f0fdf4" stroke="#059669" stroke-width="2" />
      <text x="275" y="45" font-size="10" font-weight="bold" fill="#059669">LITHIUM-ION CELL (3.7 V)</text>
      <rect x="285" y="55" width="14" height="50" fill="#15803d" />
      <text x="275" y="118" font-size="8" font-weight="bold">LiCoO2 (+)</text>
      <rect x="350" y="55" width="14" height="50" fill="#1e293b" />
      <text x="345" y="118" font-size="8" font-weight="bold">Graphite (-)</text>
      <text x="375" y="80" font-size="9" font-weight="bold" fill="#059669">Li⁺ Shuttle</text>
    </svg>`,
    modelAnswer: `1. CLASSIFICATION OF BATTERIES:
• Primary Batteries (Non-Rechargeable): Chemical reactions are irreversible. Once active chemical reactants are depleted, battery is dead. Examples: Zinc-Carbon, Alkaline AA, Lithium metal coin cells.
• Secondary Batteries (Rechargeable / Accumulators): Chemical reactions are electrically reversible. Applying external DC current in reverse restores active chemicals to original state. Examples: Lead-Acid, Lithium-Ion, Ni-MH.

--------------------------------------------------------------------------------

2. LEAD-ACID BATTERY (Automotive & Inverter Workhorse):
• Positive Plate: Lead Dioxide (PbO₂), dark brown sponge.
• Negative Plate: Pure Spongy Lead (Pb), slate gray.
• Electrolyte: Dilute Sulfuric Acid (H₂SO₄) with specific gravity ~ 1.280 when fully charged.
• Nominal Cell Voltage: 2.1 V per cell (12 V battery contains 6 cells in series).

Reversible Chemical Reaction:
   Discharge  ==>
   PbO₂ + Pb + 2 H₂SO₄  ⇌  2 PbSO₄ + 2 H₂O
   <==  Charge
• During Discharge: Both plates convert to Lead Sulfate (PbSO₄), consuming acid and producing water (specific gravity drops to 1.150).
• During Charge: PbSO₄ reconverts into PbO₂ at positive and Pb at negative; sulfuric acid regenerated.

--------------------------------------------------------------------------------

3. LITHIUM-ION BATTERY (High Energy Density):
• Positive Cathode: Lithium Cobalt Oxide (LiCoO₂) or Lithium Iron Phosphate (LiFePO₄).
• Negative Anode: Layered porous Graphite (Carbon).
• Electrolyte: Non-aqueous Lithium hexafluorophosphate (LiPF₆) in organic carbonate solvent.
• Working Principle: "Rocking-Chair" mechanism. Li⁺ ions de-intercalate from cathode and intercalate into anode layers during charging; reversed during discharge.
• Nominal Cell Voltage: 3.6 V to 3.7 V per cell. High energy density (150-250 Wh/kg), zero memory effect.

--------------------------------------------------------------------------------

4. KEY BATTERY SPECIFICATIONS:
• Ampere-Hour (Ah) Capacity: Quantity of charge a battery can deliver at its rated discharge current for a specified time: Capacity = I (Amps) × t (Hours). A 100 Ah battery can supply 5 A for 20 hours.
• State of Charge (SoC): Available capacity expressed as a percentage of its rated capacity (100% = full, 20% = discharged).
• Depth of Discharge (DoD): Percentage of capacity that has been discharged (DoD = 100% - SoC).`,
    markingScheme: [
      'Primary vs Secondary classification with examples (1.0 Mark)',
      'Lead-acid construction, reversible chemical equation, and specific gravity (2.0 Marks)',
      'Lithium-ion cell chemistry, rocking-chair mechanism, and voltage (1.0 Mark)',
      'Definitions of Ampere-Hour (Ah) rating and State of Charge (SoC) (1.0 Mark)',
    ],
    examTip: 'Mention the specific gravity measurement tool for Lead-Acid batteries: a Hydrometer. High specific gravity (1.28) indicates full charge; low (1.15) indicates discharge.',
  },

  {
    id: 'eq-u5-elcb-rccb',
    unitNumber: 5,
    marks: 5,
    category: 'Long Answer / Derivation',
    question: 'Draw and explain the schematic circuit diagram of a Current-Operated Earth Leakage Circuit Breaker (ELCB / RCCB / RCD). Explain how the Core Balance Current Transformer (CBCT) senses minute leakage currents and trips the circuit to prevent fatal electric shock.',
    diagramTitle: 'Current-Operated RCCB / ELCB Internal Circuit with CBCT Sensing Core',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <!-- Toroidal Sensing Core -->
      <ellipse cx="200" cy="80" rx="35" ry="50" fill="none" stroke="#64748b" stroke-width="8" />
      <text x="200" y="85" text-anchor="middle" font-size="8" font-weight="bold" fill="#334155">CBCT Core</text>
      <!-- Phase Wire -->
      <line x1="50" y1="50" x2="350" y2="50" stroke="#dc2626" stroke-width="3" />
      <text x="60" y="42" font-size="10" font-weight="bold" fill="#dc2626">Phase Wire (I_L)</text>
      <!-- Neutral Wire -->
      <line x1="50" y1="110" x2="350" y2="110" stroke="#0284c7" stroke-width="3" />
      <text x="60" y="125" font-size="10" font-weight="bold" fill="#0284c7">Neutral Wire (I_N)</text>
      <!-- Secondary Sensing Coil -->
      <path d="M 195 130 Q 200 145 205 130" fill="none" stroke="#b45309" stroke-width="2" />
      <line x1="200" y1="135" x2="200" y2="155" stroke="#b45309" stroke-width="1.5" />
      <!-- Trip Relay -->
      <rect x="250" y="125" width="60" height="25" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" />
      <text x="280" y="141" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">Trip Solenoid</text>
      <!-- Appliance Load -->
      <rect x="350" y="40" width="70" height="80" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="2" />
      <text x="385" y="85" text-anchor="middle" font-size="10" font-weight="bold">Appliance</text>
    </svg>`,
    modelAnswer: `1. PURPOSE AND IMPORTANCE OF RCCB / CURRENT ELCB:
An MCB or fuse only protects against heavy overcurrents and short-circuits (e.g., > 16 A). However, a tiny leakage current of merely 30 to 50 milliamperes (0.03 A to 0.05 A) passing through the human heart can cause fatal ventricular fibrillation!
The Residual Current Circuit Breaker (RCCB / ELCB) is designed specifically for personal life protection by detecting minuscule residual leakage currents (typically 30 mA) and disconnecting supply in under 30 milliseconds.

--------------------------------------------------------------------------------

2. OPERATING PRINCIPLE VIA CORE BALANCE CURRENT TRANSFORMER (CBCT):
The device consists of a high-permeability toroidal magnetic core through which BOTH the Phase wire and Neutral wire pass, acting as primary single-turn windings. A secondary sensing coil is wound around the ring and connected to an ultra-sensitive electromechanical trip relay.

(a) Normal Healthy Operation:
• Current entering through Phase wire exactly equals current returning through Neutral wire: I_L = I_N.
• The magnetic fluxes produced in the toroidal core by I_L and I_N are equal in magnitude and OPPOSITE in direction:
   Φ_net = Φ_L - Φ_N = 0
• Net flux in the core is zero. No EMF is induced in secondary sensing coil. Trip relay remains idle; contacts remain closed.

(b) Earth Fault / Electric Shock Condition:
• If a person touches a live faulty appliance casing, a fraction of the current (leakage current I_leakage ≥ 30 mA) flows through the human body into the ground:
   I_L ≠ I_N   ==>   I_L = I_N + I_leakage
• The opposing fluxes no longer cancel:
   Φ_net = Φ_leakage ≠ 0
• This alternating residual flux induces an instantaneous voltage in the secondary sensing winding.
• Current energizes the sensitive trip solenoid, releasing the spring-loaded latch and snapping open the main contacts within 20 to 30 milliseconds, saving the victim's life.`,
    markingScheme: [
      'Circuit schematic diagram showing Phase, Neutral, CBCT toroidal core, and trip coil (2.0 Marks)',
      'Mathematical flux cancellation proof under normal condition (Φ_net = 0) (1.5 Marks)',
      'Explanation of residual flux triggering trip solenoid under 30 mA leakage (1.5 Marks)',
    ],
    examTip: 'Mention the standard sensitivity rating: 30 mA for domestic human life safety, and 100-300 mA for industrial fire prevention.',
  },

  {
    id: 'eq-u5-nuclear-power-plant',
    unitNumber: 5,
    marks: 10,
    category: 'Long Answer / Derivation',
    question: 'Explain the layout and working of a Nuclear Power Plant with a neat schematic diagram. Describe the functions of: (a) Nuclear Reactor Core, (b) Control Rods, (c) Moderator, (d) Coolant, and (e) Steam Generator Heat Exchanger.',
    diagramTitle: 'Nuclear Power Plant Layout: Primary Coolant Loop & Steam Turbine',
    diagramSvg: `<svg viewBox="0 0 500 160" class="w-full h-auto max-w-lg mx-auto">
      <!-- Reactor Vessel -->
      <rect x="40" y="30" width="80" height="100" rx="10" fill="#f1f5f9" stroke="#334155" stroke-width="3" />
      <text x="80" y="50" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1">Reactor Core</text>
      <!-- Fuel & Control Rods -->
      <rect x="60" y="60" width="8" height="50" fill="#dc2626" />
      <rect x="75" y="55" width="8" height="55" fill="#475569" />
      <rect x="90" y="60" width="8" height="50" fill="#dc2626" />
      <text x="80" y="125" text-anchor="middle" font-size="7" font-weight="bold">Control Rods</text>
      <!-- Steam Generator -->
      <rect x="170" y="30" width="70" height="100" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <text x="205" y="50" text-anchor="middle" font-size="8" font-weight="bold" fill="#0284c7">Heat Exchanger</text>
      <!-- Steam line to Turbine -->
      <line x1="240" y1="50" x2="310" y2="50" stroke="#94a3b8" stroke-width="3" />
      <!-- Turbine -->
      <polygon points="310,35 360,45 360,75 310,85" fill="#fef3c7" stroke="#b45309" stroke-width="2" />
      <text x="335" y="65" text-anchor="middle" font-size="9" font-weight="bold">Turbine</text>
      <!-- Alternator -->
      <circle cx="410" cy="60" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <text x="410" y="64" text-anchor="middle" font-size="8" font-weight="bold">GEN 11kV</text>
    </svg>`,
    modelAnswer: `1. PRINCIPLE OF NUCLEAR POWER GENERATION:
Operates on Controlled Nuclear Fission. When a heavy fissile nucleus (such as Uranium-235 or Plutonium-239) absorbs a thermal neutron, it splits into two lighter fission fragments, releasing 2 to 3 fast neutrons and an enormous quantity of thermal energy (~ 200 MeV per fission event according to Einstein's mass-energy equation E = Δm · c²).

--------------------------------------------------------------------------------

2. MAIN COMPONENTS AND THEIR FUNCTIONS:

(a) Nuclear Reactor Core & Pressure Vessel:
• Heavy steel cylinder housing the nuclear fuel assemblies.
• Fuel: Enriched Uranium dioxide (UO₂) pellets stacked in zirconium alloy (zircaloy) fuel rods.

(b) Control Rods (Cadmium or Boron):
• Strong neutron-absorbing materials.
• Function: Controls the rate of fission chain reaction or shuts down the reactor. Inserting control rods absorbs neutrons, slowing the reaction; withdrawing them increases power. In an emergency, safety control rods drop automatically (SCRAM) to halt fission within 2 seconds.

(c) Moderator (Heavy Water D₂O or High-Purity Graphite):
• Function: Fission releases "fast" neutrons (~ 2 MeV) which escape without causing further fission. The moderator slows down fast neutrons to "thermal" speeds (~ 0.025 eV) through elastic collisions with light nuclei, dramatically increasing the probability of fission capture by U-235.

(d) Coolant (Heavy Water, Light Water, or Liquid Sodium):
• Function: Circulates through the reactor core at high pressure, absorbing the intense heat generated by fission and transporting it to the steam generator.

(e) Steam Generator (Heat Exchanger):
• Separates the radioactive primary coolant loop from the non-radioactive secondary steam loop.
• High-pressure primary water transfers thermal energy to secondary feedwater, boiling it into dry saturated steam at 280°C and 60 atmospheres to drive the steam turbine.

(f) Turbine, Alternator & Condenser:
• Steam expands through multi-stage high/low pressure turbines, converting heat energy into mechanical rotary power.
• The 3-phase synchronous alternator converts mechanical torque into electrical power at 11 kV, 50 Hz. Exhaust steam is condensed back to water by cooling water from cooling towers.`,
    markingScheme: [
      'Neat schematic layout diagram of Nuclear Power Plant with primary and secondary loops (3.5 Marks)',
      'Functions of Reactor Core and Control Rods (Boron/Cadmium) (2.0 Marks)',
      'Function of Moderator (slowing fast neutrons to thermal speeds) (2.0 Marks)',
      'Function of Coolant and Heat Exchanger (1.5 Marks)',
      'Energy conversion sequence: Nuclear → Heat → Mechanical → Electrical (1.0 Mark)',
    ],
    examTip: 'Explicitly explain WHY a moderator is needed: "Fast neutrons must be slowed to thermal neutrons (0.025 eV) to sustain the chain reaction".',
  },

  {
    id: 'eq-u5-electricity-bill-numerical',
    unitNumber: 5,
    marks: 5,
    category: 'Numerical Problem',
    question: 'A domestic consumer uses the following electrical appliances daily: (a) 4 tube lights of 40 W each for 6 hours, (b) 3 ceiling fans of 80 W each for 10 hours, (c) 1 electric water geyser of 1500 W for 1.5 hours, and (d) 1 refrigerator of 200 W running continuously for 24 hours with an automatic compressor duty cycle of 50%. Calculate: (i) Total energy consumed per day in kWh, (ii) Total energy consumed in a 30-day month, and (iii) Monthly electricity bill if energy charge is ₹6.50 per unit (kWh) plus fixed meter charges of ₹120.',
    diagramTitle: 'Domestic Appliance Energy Consumption Distribution',
    diagramSvg: `<svg viewBox="0 0 450 140" class="w-full h-auto max-w-md mx-auto">
      <rect x="30" y="20" width="390" height="100" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
      <text x="50" y="42" font-size="11" font-weight="bold" fill="#0284c7">DAILY DOMESTIC LOAD AUDIT</text>
      <text x="50" y="62" font-size="10" fill="#334155">• Lights (4x40W, 6h) = 0.96 kWh</text>
      <text x="50" y="78" font-size="10" fill="#334155">• Fans (3x80W, 10h) = 2.40 kWh</text>
      <text x="50" y="94" font-size="10" fill="#334155">• Geyser (1500W, 1.5h) = 2.25 kWh | Fridge (200W, 12h) = 2.40 kWh</text>
      <text x="50" y="112" font-size="10" font-weight="bold" fill="#059669">Daily Total = 8.01 kWh | Monthly Total = 240.3 kWh</text>
    </svg>`,
    modelAnswer: `GIVEN DATA & TARIFF PARAMETERS:
• 1 Unit of Electrical Energy = 1 Kilowatt-Hour (kWh) = 1000 Watt-Hours
• Energy rate = ₹6.50 per kWh
• Fixed monthly charge = ₹120.00
• Month duration = 30 days

--------------------------------------------------------------------------------

STEP-BY-STEP ENERGY CONSUMPTION CALCULATION:
Energy (kWh) = [ Power (Watts) × Quantity × Operating Hours (h) ] / 1000

1. Tube Lights:
   E₁ = (40 W × 4 lamps × 6 hours) / 1000 = 960 / 1000 = 0.960 kWh/day

2. Ceiling Fans:
   E₂ = (80 W × 3 fans × 10 hours) / 1000 = 2400 / 1000 = 2.400 kWh/day

3. Water Geyser:
   E₃ = (1500 W × 1 unit × 1.5 hours) / 1000 = 2250 / 1000 = 2.250 kWh/day

4. Refrigerator:
   Note: Compressor duty cycle is 50%, so it actively runs for 24 h × 0.50 = 12 hours/day:
   E₄ = (200 W × 1 unit × 12 hours) / 1000 = 2400 / 1000 = 2.400 kWh/day

--------------------------------------------------------------------------------

TOTALS & MONTHLY BILL:
(i) Total Energy Consumed per Day:
   E_day = E₁ + E₂ + E₃ + E₄
   E_day = 0.960 + 2.400 + 2.250 + 2.400 = 8.010 kWh/day

(ii) Total Energy Consumed in 30-Day Month:
   E_month = 8.010 kWh/day × 30 days = 240.30 kWh (Units)

(iii) Monthly Electricity Bill Calculation (Two-Part Tariff):
• Energy Consumption Charges:
   Cost_energy = 240.30 units × ₹6.50/unit = ₹1,561.95
• Fixed Service Charges:
   Cost_fixed = ₹120.00

Total Monthly Electricity Bill:
   Total Bill = ₹1,561.95 + ₹120.00 = ₹1,681.95`,
    givenData: ['4 lights 40W 6h', '3 fans 80W 10h', '1 geyser 1500W 1.5h', '1 fridge 200W 24h (50% duty)', 'Rate = ₹6.50/kWh', 'Fixed = ₹120'],
    finalResult: 'Daily = 8.01 kWh, Monthly = 240.3 Units, Total Bill = ₹1,681.95',
    markingScheme: [
      'Daily energy calculation for each individual appliance (2.0 Marks)',
      'Total daily energy (8.01 kWh) and monthly units (240.30 kWh) (1.5 Marks)',
      'Two-part tariff calculation with fixed charges to get ₹1,681.95 (1.5 Marks)',
    ],
    examTip: 'Pay special attention to the refrigerator compressor duty cycle (50% of 24h = 12h). Neglecting duty cycle doubles refrigerator consumption and loses marks.',
  },
];

const ALL_EXAM_QUESTIONS_UNSORTED: ExamQuestion[] = [
  ...EXAM_QUESTIONS_PART1,
  ...EXAM_QUESTIONS_PART2,
  ...EXAM_QUESTIONS_PART3,
];

// Strictly organized and grouped by Unit (Unit 1 -> Unit 2 -> Unit 3 -> Unit 4 -> Unit 5)
export const EXAM_QUESTION_BANK: ExamQuestion[] = [
  ...ALL_EXAM_QUESTIONS_UNSORTED.filter((q) => q.unitNumber === 1),
  ...ALL_EXAM_QUESTIONS_UNSORTED.filter((q) => q.unitNumber === 2),
  ...ALL_EXAM_QUESTIONS_UNSORTED.filter((q) => q.unitNumber === 3),
  ...ALL_EXAM_QUESTIONS_UNSORTED.filter((q) => q.unitNumber === 4),
  ...ALL_EXAM_QUESTIONS_UNSORTED.filter((q) => q.unitNumber === 5),
];
