# ElectroLearn 3D — Basic Electrical and Electronics Engineering (BEEE)

> An interactive, beginner-friendly 3D educational web platform engineered to teach the complete five-unit Basic Electrical and Electronics Engineering (BEEE) syllabus from absolute zero.

---

## 🌟 Key Highlights & Pedagogical Architecture

1. **Zero-Prerequisite Philosophy:**
   - Designed for students with no prior knowledge of electricity, circuits, electronics, or related mathematics.
   - Explains technical concepts using everyday analogies (water flow, bicycle chains, mountain trails, one-way turnstiles) before introducing formulas.

2. **Rigorous 10-Step Teaching Sequence:**
   Every single topic follows an identical pedagogical progression:
   - **Step 1: Everyday Introduction** (Analogy story & familiar real-world object)
   - **Step 2: Simple Definition** (Plain-English meaning & why it matters)
   - **Step 3: How It Works** (Step-by-step physical breakdown)
   - **Step 4: Interactive Visual Simulation** (Interactive 3D model + 2D schematic fallback)
   - **Step 5: Important Terminology** (Trilingual definitions: English, Hinglish, and Hindi)
   - **Step 6: Formula Explanation** (Symbols, SI units, and conditions)
   - **Step 7: Solved Numerical** (Given data, to find, step-by-step arithmetic substitution, final unit, and reason)
   - **Step 8: Practical Applications** (Appliances, industrial engineering, and vital safety cautions)
   - **Step 9: Practice Quiz** (Interactive questions with instant feedback and misconception clarification)
   - **Step 10: Quick Revision** (Summary checklist, exam mistakes to avoid, and personal note-taking)

3. **Warm & Accessible Visual Design:**
   - Adheres strictly to a pleasant, warm, and light palette: warm parchment backgrounds (`#fbf9f4`), cream cards, copper/amber electric accents, and circuit cyan touches.
   - Zero harsh dark backgrounds to ensure high contrast, readability, and comfortable long study sessions.

4. **Interactive 3D Learning Engine (Three.js & Canvas):**
   - **Unit I (DC Circuits):** 3D Battery, knife switch, resistor/lamp with filament glow, connecting wires with moving electron drift particles, and live Ohm's law multimeter.
   - **Unit II (AC Circuits):** 3D Rotating phasor vector projecting into real-time sinusoidal waveforms, and series RLC resonance explorer.
   - **Unit III (Machines & Transformers):** 3D Transformer with circulating magnetic core flux lines and turns ratio controls, plus 3D DC Motor and 3-Phase Induction Motor with rotating magnetic fields and slip.
   - **Unit IV (Semiconductors):** 3D P-N Junction with carrier diffusion, depletion barrier expansion/collapse under bias, and bridge rectifier waveforms.
   - **Unit V (Power & Safety):** Generation to residential consumer distribution grid, with interactive MCB trip and Earthing safety demonstration.
   - **2D Schematic Fallback:** Instant SVG schematic fallback for low-end devices or mobile smartphones.

5. **Formula Explorer & Numerical Solver:**
   - Interactive live calculation playground with editable input sliders.
   - Line-by-line mathematical substitution steps.
   - Physical sanity check notes and common examination mistakes.

6. **Virtual Electrical Laboratory:**
   - Experimentation bench for DC circuits, AC resonance, and transformer turns ratios.
   - Virtual Digital Multimeter (DMM) and oscilloscope power dissipation meters.

7. **Practice & Quiz Center:**
   - Multiple-choice, true/false, and numerical problems with immediate misconception explanations.
   - Persistent score tracking and confetti reward celebrations.

8. **University Examination Preparation:**
   - Unit-wise question bank categorized into 2-mark definitions, 5-mark short answers, 10-mark full derivations, and numerical problems.
   - Examiner marking schemes and high-scoring exam tips.

9. **Socratic BEEE Professor AI Tutor:**
   - Built-in rule-based conversational assistant capable of explaining concepts in Simple English or Hinglish.
   - Provides analogies, memory tricks (KCL vs KVL), and hints without giving away answers immediately.

---

## 📚 Complete Five-Unit Syllabus Coverage

- **Unit I: DC Circuit Analysis:**
  Electric charge, current flow, potential difference, resistance and resistivity ($R = \rho L/A$), Ohm's law ($V = IR$), electrical power and energy ($P = VI$, kWh billing), series circuits, parallel circuits, practical voltage and current sources with internal resistance, Kirchhoff's Current Law (KCL), Kirchhoff's Voltage Law (KVL), Nodal and Mesh analysis, Voltage Division Rule (VDR), Current Division Rule (CDR), Source Transformation, and DC applications.

- **Unit II: AC Circuit Analysis:**
  AC generation, sinusoidal waveforms, frequency ($f$), time period ($T$), amplitude, angular frequency ($\omega = 2\pi f$), RMS and half-cycle average values, Form Factor ($1.11$), Peak Factor ($1.414$), rotating phasors, purely resistive, inductive, and capacitive circuits, series RLC impedance ($Z = \sqrt{R^2 + (X_L - X_C)^2}$), resonance ($f_r = 1/(2\pi\sqrt{LC})$), power factor ($\cos\phi$), and 3-phase star/delta systems.

- **Unit III: Electrical Machines and Transformers:**
  Single-phase transformers, mutual induction, core vs shell construction, EMF equation ($E = 4.44 f N \Phi_m$), turns ratio ($V_2/V_1 = N_2/N_1 = I_1/I_2$), step-up and step-down operations; DC generators and motors, Lorentz force, Back EMF ($E_b = V - I_a R_a$), commutator and brushes; 3-phase induction motor, Stator Rotating Magnetic Field ($N_s = 120f/P$), squirrel cage rotor, and slip ($s = (N_s - N)/N_s$).

- **Unit IV: Semiconductors and Applications:**
  Intrinsic vs extrinsic silicon, N-type (pentavalent donors) and P-type (trivalent acceptors) doping, electrons and holes, P-N junction depletion layer, barrier potential ($0.7\text{ V}$ Si, $0.3\text{ V}$ Ge), forward and reverse bias V-I characteristics, half-wave and full-wave bridge rectifiers ($\eta_{max} = 81.2\%$), capacitor smoothing filters, and Zener diode reverse breakdown voltage regulation.

- **Unit V: Generation, Distribution and Safety:**
  Thermal, hydroelectric ($P = \eta \rho g Q H$), and solar PV power generation; high-voltage transmission ($P_{loss} \propto 1/V^2$); substations, busbars, and switchgear; residential distribution boards; fuse wire, Miniature Circuit Breakers (MCB), and Residual Current Circuit Breakers (RCCB/GFCI); pipe and plate earthing; electrical codes and shock prevention.

---

## 🚀 Direct Access & Executable File

You can directly launch **ElectroLearn 3D** without opening a terminal or manually typing commands:

### Method 1: Direct Windows Executable (Recommended)
- Double-click **`ElectroLearn-3D.exe`** in the project root directory.
- It starts the high-speed local HTTP server, automatically launches your default web browser to the platform, and displays a friendly controller window with **Open in Browser** and **Stop & Exit** buttons.

### Method 2: Batch Launcher
- Double-click **`Launch-ElectroLearn-3D.bat`** to start the application with a single click.

---

## 💻 Manual Developer Commands (Optional)

### Running the Backend Server
```bash
npm run server
# The backend API will start on http://localhost:3001
```

### Running Automated Mathematical Tests
```bash
npm test
# Verifies Ohm's law, power, series/parallel networks, RMS conversions, turns ratios, and motor slip
```

### Production Build
```bash
npm run build
```

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **3D Visualization:** Three.js with OrbitControls, custom mathematical geometries, dynamic particle physics
- **Icons & UI:** Lucide React, Canvas Confetti
- **State & Storage:** React Context API with LocalStorage / IndexedDB local-first persistence
- **Backend:** Node.js, Express, TypeScript, CORS
- **Audio:** Web Speech API for multi-lingual text-to-speech read-aloud support

---

## 📜 Standards & Compliance
- **IEEE & IEC Standards:** Standard circuit symbols, color codes (Green for Earth, Blue/Black for Neutral, Red/Brown for Phase), and SI engineering units.
- **Accessibility:** High contrast ratios, adjustable text sizes, trilingual support (English, Hinglish, Hindi), and 2D fallbacks for low-power hardware.
