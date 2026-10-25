export interface ObjectiveQuestion {
  id: string;
  unitNumber: number;
  questionNumber: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  topic: string;
}

export const OBJECTIVE_QUESTION_BANK: ObjectiveQuestion[] = [
  {
    "id": "mcq-u1-1",
    "unitNumber": 1,
    "questionNumber": 1,
    "question": "In a metallic conductor, electrical current conduction results primarily from the directed drift of:",
    "options": [
      {
        "key": "A",
        "text": "Positive ions"
      },
      {
        "key": "B",
        "text": "Free valence electrons"
      },
      {
        "key": "C",
        "text": "Protons"
      },
      {
        "key": "D",
        "text": "Neutral atoms or molecules"
      }
    ],
    "correctAnswer": "B",
    "explanation": "In metals, positive ions remain fixed in the crystal lattice. Current is carried exclusively by free conduction-band electrons drifting under an electric field.",
    "topic": "Electric Charge & Current"
  },
  {
    "id": "mcq-u1-2",
    "unitNumber": 1,
    "questionNumber": 2,
    "question": "Electrical resistance of a conductor is measured in units of:",
    "options": [
      {
        "key": "A",
        "text": "Ohms (Ω)"
      },
      {
        "key": "B",
        "text": "Coulombs (C)"
      },
      {
        "key": "C",
        "text": "Amperes (A)"
      },
      {
        "key": "D",
        "text": "Henrys (H)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Resistance opposes current flow and is measured in Ohms (Ω). One Ohm produces 1 Ampere of current under 1 Volt potential difference.",
    "topic": "Resistance & Ohm's Law"
  },
  {
    "id": "mcq-u1-3",
    "unitNumber": 1,
    "questionNumber": 3,
    "question": "In an electric circuit, if the current flows through only one sequential path without branching, the circuit is called a:",
    "options": [
      {
        "key": "A",
        "text": "Parallel circuit"
      },
      {
        "key": "B",
        "text": "Series circuit"
      },
      {
        "key": "C",
        "text": "Series-parallel circuit"
      },
      {
        "key": "D",
        "text": "Bridge circuit"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A series circuit provides only one continuous path for charge carriers; the exact same current flows sequentially through every series element.",
    "topic": "Series Circuits"
  },
  {
    "id": "mcq-u1-4",
    "unitNumber": 1,
    "questionNumber": 4,
    "question": "According to Kirchhoff’s Voltage Law (KVL), the algebraic sum of the potential drops around any closed loop is equal to:",
    "options": [
      {
        "key": "A",
        "text": "The current in the circuit"
      },
      {
        "key": "B",
        "text": "The algebraic sum of applied EMFs in that loop"
      },
      {
        "key": "C",
        "text": "Total circuit resistance"
      },
      {
        "key": "D",
        "text": "Total power dissipation"
      }
    ],
    "correctAnswer": "B",
    "explanation": "KVL represents conservation of energy: the algebraic sum of all EMF sources equals the algebraic sum of all IR voltage drops: Σ E = Σ (I·R).",
    "topic": "Kirchhoff's Laws"
  },
  {
    "id": "mcq-u1-5",
    "unitNumber": 1,
    "questionNumber": 5,
    "question": "The electrical resistance of a 1 kW electric heater when energized by a 230 V single-phase AC supply is:",
    "options": [
      {
        "key": "A",
        "text": "52.9 Ω"
      },
      {
        "key": "B",
        "text": "230 Ω"
      },
      {
        "key": "C",
        "text": "1000 Ω"
      },
      {
        "key": "D",
        "text": "4.2 Ω"
      }
    ],
    "correctAnswer": "A",
    "explanation": "R = V² / P = (230)² / 1000 = 52,900 / 1000 = 52.9 Ω.",
    "topic": "Electrical Power"
  },
  {
    "id": "mcq-u1-6",
    "unitNumber": 1,
    "questionNumber": 6,
    "question": "Determine the electric current if a charge of 10 Coulombs passes a point in a conductor in 0.5 seconds:",
    "options": [
      {
        "key": "A",
        "text": "10 A"
      },
      {
        "key": "B",
        "text": "20 A"
      },
      {
        "key": "C",
        "text": "0.5 A"
      },
      {
        "key": "D",
        "text": "2 A"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Current I = Q / t = 10 Coulombs / 0.5 seconds = 20 Amperes.",
    "topic": "Electric Current"
  },
  {
    "id": "mcq-u1-7",
    "unitNumber": 1,
    "questionNumber": 7,
    "question": "Kirchhoff’s circuit laws (KCL and KVL) are NOT applicable to circuits containing:",
    "options": [
      {
        "key": "A",
        "text": "Lumped parameters"
      },
      {
        "key": "B",
        "text": "Passive linear elements"
      },
      {
        "key": "C",
        "text": "Distributed parameters (e.g. high-frequency transmission lines)"
      },
      {
        "key": "D",
        "text": "Linear resistances"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Kirchhoff's laws assume lumped parameters where physical dimensions are much smaller than wavelength (d << λ). Long transmission lines require Maxwell's wave equations.",
    "topic": "Kirchhoff's Limitations"
  },
  {
    "id": "mcq-u1-8",
    "unitNumber": 1,
    "questionNumber": 8,
    "question": "Electrical conductance (G = 1/R) is expressed in units of:",
    "options": [
      {
        "key": "A",
        "text": "Siemens (S) or Mho (℧)"
      },
      {
        "key": "B",
        "text": "Mho / metre"
      },
      {
        "key": "C",
        "text": "Ohm / metre"
      },
      {
        "key": "D",
        "text": "Henry"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Conductance is the reciprocal of resistance (G = 1/R). Its SI unit is the Siemens (S), historically also called Mho.",
    "topic": "Conductance"
  },
  {
    "id": "mcq-u1-9",
    "unitNumber": 1,
    "questionNumber": 9,
    "question": "Superposition Theorem is strictly valid only for circuits that are:",
    "options": [
      {
        "key": "A",
        "text": "Linear networks"
      },
      {
        "key": "B",
        "text": "Non-linear networks"
      },
      {
        "key": "C",
        "text": "Both linear and non-linear"
      },
      {
        "key": "D",
        "text": "Rectifier diode circuits"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Superposition relies on the mathematical linearity (homogeneity and additivity) of the circuit differential equations. Hence, it applies strictly to linear systems.",
    "topic": "Superposition Theorem"
  },
  {
    "id": "mcq-u1-10",
    "unitNumber": 1,
    "questionNumber": 10,
    "question": "Superposition Theorem CANNOT be used directly to calculate:",
    "options": [
      {
        "key": "A",
        "text": "Branch voltages"
      },
      {
        "key": "B",
        "text": "Branch currents"
      },
      {
        "key": "C",
        "text": "Power dissipation in resistors"
      },
      {
        "key": "D",
        "text": "Node potentials"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Power is a non-linear (quadratic) function of current and voltage (P = I²R). Since (I₁ + I₂)² ≠ I₁² + I₂², superposition fails for power.",
    "topic": "Superposition Limitations"
  },
  {
    "id": "mcq-u2-11",
    "unitNumber": 2,
    "questionNumber": 11,
    "question": "How many complete cycles does a sinusoidal AC wave go through in 10 seconds if its frequency is 60 Hz?",
    "options": [
      {
        "key": "A",
        "text": "10 cycles"
      },
      {
        "key": "B",
        "text": "60 cycles"
      },
      {
        "key": "C",
        "text": "600 cycles"
      },
      {
        "key": "D",
        "text": "6 cycles"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Frequency f = 60 Hz means 60 complete cycles every second. In 10 seconds, total cycles = 60 × 10 = 600 cycles.",
    "topic": "AC Frequency"
  },
  {
    "id": "mcq-u2-12",
    "unitNumber": 2,
    "questionNumber": 12,
    "question": "For an alternating supply with a frequency of 200 Hz, the time period (T) of one complete cycle is:",
    "options": [
      {
        "key": "A",
        "text": "0.05 s"
      },
      {
        "key": "B",
        "text": "0.005 s (5 ms)"
      },
      {
        "key": "C",
        "text": "0.0005 s"
      },
      {
        "key": "D",
        "text": "0.5 s"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Time period T = 1 / f = 1 / 200 Hz = 0.005 seconds = 5 milliseconds.",
    "topic": "AC Time Period"
  },
  {
    "id": "mcq-u2-13",
    "unitNumber": 2,
    "questionNumber": 13,
    "question": "For a sinusoidal current with peak amplitude Imax, the effective Root Mean Square (RMS) value is:",
    "options": [
      {
        "key": "A",
        "text": "0.500 · Imax"
      },
      {
        "key": "B",
        "text": "0.707 · Imax (Imax / √2)"
      },
      {
        "key": "C",
        "text": "0.900 · Imax"
      },
      {
        "key": "D",
        "text": "1.414 · Imax"
      }
    ],
    "correctAnswer": "B",
    "explanation": "For a pure sine wave: I_rms = Imax / √2 = 0.7071 · Imax.",
    "topic": "RMS Values"
  },
  {
    "id": "mcq-u2-14",
    "unitNumber": 2,
    "questionNumber": 14,
    "question": "The Form Factor of a pure sinusoidal AC waveform is equal to:",
    "options": [
      {
        "key": "A",
        "text": "1.00"
      },
      {
        "key": "B",
        "text": "1.11"
      },
      {
        "key": "C",
        "text": "1.414"
      },
      {
        "key": "D",
        "text": "0.707"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Form Factor = RMS Value / Average Value = (Im / √2) / (2Im / π) = π / (2√2) ≈ 1.11.",
    "topic": "Form Factor"
  },
  {
    "id": "mcq-u2-15",
    "unitNumber": 2,
    "questionNumber": 15,
    "question": "In a purely resistive AC circuit, the alternating current and applied voltage are:",
    "options": [
      {
        "key": "A",
        "text": "Current lags voltage by 90°"
      },
      {
        "key": "B",
        "text": "Current leads voltage by 90°"
      },
      {
        "key": "C",
        "text": "Completely in phase with each other (phase angle φ = 0°)"
      },
      {
        "key": "D",
        "text": "Out of phase by 180°"
      }
    ],
    "correctAnswer": "C",
    "explanation": "In a pure resistor, current tracks instantaneous voltage according to Ohm's law without phase delay; hence phase difference φ = 0° and power factor = 1.0 (unity).",
    "topic": "Resistive AC Circuits"
  },
  {
    "id": "mcq-u2-16",
    "unitNumber": 2,
    "questionNumber": 16,
    "question": "In a purely inductive AC circuit, the alternating current:",
    "options": [
      {
        "key": "A",
        "text": "Is in phase with voltage"
      },
      {
        "key": "B",
        "text": "Lags behind voltage by 90° (π/2 radians)"
      },
      {
        "key": "C",
        "text": "Leads voltage by 90°"
      },
      {
        "key": "D",
        "text": "Lags by 45°"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Self-induced back EMF opposes current rise (v = L di/dt), causing the current in a pure inductor to lag applied voltage by exactly 90° (cos 90° = 0 lagging).",
    "topic": "Inductive AC Circuits"
  },
  {
    "id": "mcq-u2-17",
    "unitNumber": 2,
    "questionNumber": 17,
    "question": "In an AC circuit containing R, L, and C components, real active power dissipation occurs ONLY in the:",
    "options": [
      {
        "key": "A",
        "text": "Capacitor (C) only"
      },
      {
        "key": "B",
        "text": "Inductor (L) only"
      },
      {
        "key": "C",
        "text": "Resistor (R) only"
      },
      {
        "key": "D",
        "text": "All three components equally"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Ideal inductors and capacitors store reactive energy reversibly in magnetic and electric fields without consuming real active power (P_avg = 0). Energy dissipation (I²R) occurs solely in the resistance.",
    "topic": "AC Power Dissipation"
  },
  {
    "id": "mcq-u2-18",
    "unitNumber": 2,
    "questionNumber": 18,
    "question": "Which of the following circuit components directly opposes any sudden change in voltage across its terminals?",
    "options": [
      {
        "key": "A",
        "text": "Inductance"
      },
      {
        "key": "B",
        "text": "Capacitance"
      },
      {
        "key": "C",
        "text": "Resistance"
      },
      {
        "key": "D",
        "text": "Conductance"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Because capacitor current is proportional to the rate of voltage change (i = C·dv/dt), an instantaneous change in voltage requires infinite current, which is physically impossible. Therefore, capacitors oppose sudden voltage changes.",
    "topic": "Capacitor Fundamentals"
  },
  {
    "id": "mcq-u2-19",
    "unitNumber": 2,
    "questionNumber": 19,
    "question": "The Power Factor of an AC circuit is defined mathematically as:",
    "options": [
      {
        "key": "A",
        "text": "R / Z"
      },
      {
        "key": "B",
        "text": "Cosine of phase angle difference cos(φ)"
      },
      {
        "key": "C",
        "text": "Active Power / Apparent Power (kW / kVA)"
      },
      {
        "key": "D",
        "text": "All of the above"
      }
    ],
    "correctAnswer": "D",
    "explanation": "All three expressions represent the power factor: cos φ = R/Z = Active Power (kW) / Apparent Power (kVA).",
    "topic": "Power Factor"
  },
  {
    "id": "mcq-u2-20",
    "unitNumber": 2,
    "questionNumber": 20,
    "question": "In a Series RLC circuit at resonance, the total circuit impedance is:",
    "options": [
      {
        "key": "A",
        "text": "Purely resistive and at its minimum value (Z = R)"
      },
      {
        "key": "B",
        "text": "Maximum and inductive"
      },
      {
        "key": "C",
        "text": "Zero"
      },
      {
        "key": "D",
        "text": "Infinite"
      }
    ],
    "correctAnswer": "A",
    "explanation": "At resonance, inductive reactance equals capacitive reactance (XL = XC), so net reactance cancels to zero. The impedance is purely resistive and at its minimum: Z_min = R.",
    "topic": "Series Resonance"
  },
  {
    "id": "mcq-u3-21",
    "unitNumber": 3,
    "questionNumber": 21,
    "question": "A DC Generator operates on the fundamental physical principle of:",
    "options": [
      {
        "key": "A",
        "text": "Fleming’s Left-Hand Rule"
      },
      {
        "key": "B",
        "text": "Ampere’s Circuital Law"
      },
      {
        "key": "C",
        "text": "Faraday’s Law of Electromagnetic Induction"
      },
      {
        "key": "D",
        "text": "Coulomb’s Law"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Faraday's Law dictates that whenever rotating armature conductors cut magnetic flux lines, an electromotive force (EMF) is induced across their terminals (e = B·l·v).",
    "topic": "DC Generators"
  },
  {
    "id": "mcq-u3-22",
    "unitNumber": 3,
    "questionNumber": 22,
    "question": "Laminated magnetic cores are used in DC machines and transformers in order to reduce:",
    "options": [
      {
        "key": "A",
        "text": "Eddy current losses"
      },
      {
        "key": "B",
        "text": "Hysteresis losses"
      },
      {
        "key": "C",
        "text": "Copper losses"
      },
      {
        "key": "D",
        "text": "Mechanical friction"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Eddy current loss is proportional to the square of lamination thickness (P_e ∝ t²). Slicing the core into insulated thin sheets restricts circular eddy current loops, dramatically reducing core heating.",
    "topic": "Magnetic Core Losses"
  },
  {
    "id": "mcq-u3-23",
    "unitNumber": 3,
    "questionNumber": 23,
    "question": "The primary operational purpose of the split-ring Commutator in a DC generator is to:",
    "options": [
      {
        "key": "A",
        "text": "Reduce sparking at brushes"
      },
      {
        "key": "B",
        "text": "Convert the internally induced AC into unidirectional DC at the output terminals"
      },
      {
        "key": "C",
        "text": "Increase output voltage magnitude"
      },
      {
        "key": "D",
        "text": "Provide mechanical balance"
      }
    ],
    "correctAnswer": "B",
    "explanation": "The armature coils generate alternating current (AC) naturally. The commutator acts as a mechanical synchronous rectifier that reverses coil connections every half-revolution to deliver direct current (DC) to the external brushes.",
    "topic": "Commutator Operation"
  },
  {
    "id": "mcq-u3-24",
    "unitNumber": 3,
    "questionNumber": 24,
    "question": "Transformer power ratings are universally expressed in terms of kVA (or MVA) rather than kW because:",
    "options": [
      {
        "key": "A",
        "text": "Transformers cannot carry active power"
      },
      {
        "key": "B",
        "text": "Total transformer losses (iron loss and copper loss) depend on voltage and current, not on load power factor"
      },
      {
        "key": "C",
        "text": "Power factor is always zero"
      },
      {
        "key": "D",
        "text": "kW is too small a unit"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Iron loss depends on operating voltage (P_i ∝ V²), while copper loss depends on current (P_cu ∝ I²). Neither loss depends on the power factor (cos φ) of the connected load. Therefore, manufacturers rate transformers in Apparent Power (kVA = V × I / 1000).",
    "topic": "Transformer Ratings"
  },
  {
    "id": "mcq-u3-25",
    "unitNumber": 3,
    "questionNumber": 25,
    "question": "Which of the following electrical quantities remains absolutely UNCHANGED between primary and secondary windings of an ideal transformer?",
    "options": [
      {
        "key": "A",
        "text": "Voltage"
      },
      {
        "key": "B",
        "text": "Current"
      },
      {
        "key": "C",
        "text": "Frequency and Power"
      },
      {
        "key": "D",
        "text": "Impedance"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A transformer changes voltage and current levels inversely (V₁I₁ = V₂I₂), but CANNOT alter the frequency (f₁ = f₂) or increase real power (P_in = P_out for 100% ideal).",
    "topic": "Transformer Principles"
  },
  {
    "id": "mcq-u3-26",
    "unitNumber": 3,
    "questionNumber": 26,
    "question": "A single-phase transformer achieves its MAXIMUM operating efficiency when:",
    "options": [
      {
        "key": "A",
        "text": "Copper loss equals twice the iron loss"
      },
      {
        "key": "B",
        "text": "Variable copper loss equals constant iron loss (P_cu = P_i)"
      },
      {
        "key": "C",
        "text": "Iron loss is zero"
      },
      {
        "key": "D",
        "text": "Load power factor is zero"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Differentiating transformer efficiency with respect to load current I₂ yields the condition for maximum efficiency: Variable Copper Loss (I₂²R₀₂) = Constant Core Loss (P_i).",
    "topic": "Transformer Efficiency"
  },
  {
    "id": "mcq-u3-27",
    "unitNumber": 3,
    "questionNumber": 27,
    "question": "A Permanent Magnet Moving Coil (PMMC) instrument can be adapted to measure high DC currents by connecting:",
    "options": [
      {
        "key": "A",
        "text": "A low resistance in parallel (Shunt)"
      },
      {
        "key": "B",
        "text": "A high resistance in series (Multiplier)"
      },
      {
        "key": "C",
        "text": "A capacitor in parallel"
      },
      {
        "key": "D",
        "text": "An inductor in series"
      }
    ],
    "correctAnswer": "A",
    "explanation": "To measure larger currents without burning the delicate moving coil (which carries only ~mA), a precision low-resistance manganin shunt (R_sh) is connected in parallel to bypass the bulk of the line current.",
    "topic": "PMMC Instruments"
  },
  {
    "id": "mcq-u3-28",
    "unitNumber": 3,
    "questionNumber": 28,
    "question": "A Moving Iron (MI) type electrical measuring instrument can be used to measure:",
    "options": [
      {
        "key": "A",
        "text": "DC quantities only"
      },
      {
        "key": "B",
        "text": "AC quantities only"
      },
      {
        "key": "C",
        "text": "Both AC and DC quantities"
      },
      {
        "key": "D",
        "text": "Radio frequency signals above 10 MHz only"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Because deflecting torque is proportional to the square of current (T_d ∝ I²), the deflection direction is independent of current polarity. Hence, MI instruments operate on BOTH AC and DC, reading true RMS.",
    "topic": "Moving Iron Instruments"
  },
  {
    "id": "mcq-u3-29",
    "unitNumber": 3,
    "questionNumber": 29,
    "question": "Why can a 3-Phase Induction Motor NEVER run at synchronous speed (Ns)?",
    "options": [
      {
        "key": "A",
        "text": "Because mechanical friction stops it"
      },
      {
        "key": "B",
        "text": "Because at N = Ns, relative speed is zero, inducing zero rotor EMF and zero torque"
      },
      {
        "key": "C",
        "text": "Because supply frequency decreases"
      },
      {
        "key": "D",
        "text": "Because rotor resistance becomes infinite"
      }
    ],
    "correctAnswer": "B",
    "explanation": "If the rotor reached synchronous speed N = Ns, rotor conductors would move synchronously with the rotating magnetic field, cutting zero magnetic flux lines. Induced rotor EMF and current would drop to zero, producing zero electromagnetic torque.",
    "topic": "Induction Motor Slip"
  },
  {
    "id": "mcq-u3-30",
    "unitNumber": 3,
    "questionNumber": 30,
    "question": "In a 3-Phase Induction Motor, the ratio of rotor slip frequency (fr) to stator supply frequency (f) is equal to:",
    "options": [
      {
        "key": "A",
        "text": "Slip (s)"
      },
      {
        "key": "B",
        "text": "1 - s"
      },
      {
        "key": "C",
        "text": "1 / s"
      },
      {
        "key": "D",
        "text": "s²"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Rotor frequency depends on the relative speed between stator field and rotor: fr = s · f, where s is the rotor fractional slip.",
    "topic": "Induction Motor Rotor Frequency"
  },
  {
    "id": "mcq-u4-31",
    "unitNumber": 4,
    "questionNumber": 31,
    "question": "The forbidden energy bandgap (Eg) for Silicon and Germanium semiconductors at room temperature (300 K) is approximately:",
    "options": [
      {
        "key": "A",
        "text": "1.12 eV for Si and 0.72 eV for Ge"
      },
      {
        "key": "B",
        "text": "5.0 eV for Si and 3.0 eV for Ge"
      },
      {
        "key": "C",
        "text": "0.1 eV for Si and 0.05 eV for Ge"
      },
      {
        "key": "D",
        "text": "Zero for both"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Silicon has an energy bandgap of 1.12 eV, while Germanium has a narrower bandgap of 0.72 eV. Insulators have bandgaps > 5 eV, while conductors have overlapping bands (0 eV).",
    "topic": "Semiconductor Bandgap"
  },
  {
    "id": "mcq-u4-32",
    "unitNumber": 4,
    "questionNumber": 32,
    "question": "To produce a P-type extrinsic semiconductor, pure intrinsic Silicon must be doped with:",
    "options": [
      {
        "key": "A",
        "text": "Pentavalent impurity atoms (e.g. Phosphorus, Arsenic)"
      },
      {
        "key": "B",
        "text": "Trivalent impurity atoms (e.g. Boron, Indium, Gallium)"
      },
      {
        "key": "C",
        "text": "Carbon atoms"
      },
      {
        "key": "D",
        "text": "Copper atoms"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Trivalent elements have 3 valence electrons. When substituting into a 4-valence silicon lattice, they leave one covalent bond incomplete, creating a positive hole (acceptor).",
    "topic": "Semiconductor Doping"
  },
  {
    "id": "mcq-u4-33",
    "unitNumber": 4,
    "questionNumber": 33,
    "question": "The barrier potential (knee voltage) of a standard Silicon P-N junction diode at room temperature is approximately:",
    "options": [
      {
        "key": "A",
        "text": "0.3 V"
      },
      {
        "key": "B",
        "text": "0.7 V"
      },
      {
        "key": "C",
        "text": "1.5 V"
      },
      {
        "key": "D",
        "text": "2.0 V"
      }
    ],
    "correctAnswer": "B",
    "explanation": "The internal contact potential across the depletion layer of a Silicon diode is ~0.7 V (~0.3 V for Germanium). Forward conduction starts once external forward bias exceeds 0.7 V.",
    "topic": "P-N Junction Barrier"
  },
  {
    "id": "mcq-u4-34",
    "unitNumber": 4,
    "questionNumber": 34,
    "question": "When a P-N junction diode is subjected to Reverse Bias, the width of the depletion region:",
    "options": [
      {
        "key": "A",
        "text": "Decreases and current increases"
      },
      {
        "key": "B",
        "text": "Widens and prevents majority carrier conduction"
      },
      {
        "key": "C",
        "text": "Remains strictly unchanged"
      },
      {
        "key": "D",
        "text": "Collapses to zero"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Negative terminal on P-side attracts holes away from the junction, and positive on N-side attracts electrons, widening the uncompensated ion depletion layer and blocking majority carriers.",
    "topic": "Diode Biasing"
  },
  {
    "id": "mcq-u4-35",
    "unitNumber": 4,
    "questionNumber": 35,
    "question": "A Zener Diode is specifically designed to operate in which region of its V-I characteristics?",
    "options": [
      {
        "key": "A",
        "text": "Forward conduction region"
      },
      {
        "key": "B",
        "text": "Reverse Breakdown region under reverse bias"
      },
      {
        "key": "C",
        "text": "Cut-off region only"
      },
      {
        "key": "D",
        "text": "Active linear region"
      }
    ],
    "correctAnswer": "B",
    "explanation": "In the reverse breakdown region, a Zener diode maintains an almost constant terminal voltage across wide variations in reverse current, making it an ideal voltage regulator.",
    "topic": "Zener Diode Operation"
  },
  {
    "id": "mcq-u4-36",
    "unitNumber": 4,
    "questionNumber": 36,
    "question": "The Ripple Factor (γ) and Rectification Efficiency (η) of a Full-Wave Bridge Rectifier are:",
    "options": [
      {
        "key": "A",
        "text": "γ = 1.21, η = 40.6%"
      },
      {
        "key": "B",
        "text": "γ = 0.482, η = 81.2%"
      },
      {
        "key": "C",
        "text": "γ = 0.10, η = 99.0%"
      },
      {
        "key": "D",
        "text": "γ = 2.00, η = 50.0%"
      }
    ],
    "correctAnswer": "B",
    "explanation": "For full-wave rectifiers, ripple factor is 0.482 (compared to 1.21 for half-wave), and maximum theoretical efficiency is 8 / π² ≈ 81.2% (twice that of half-wave).",
    "topic": "Rectifier Performance"
  },
  {
    "id": "mcq-u4-37",
    "unitNumber": 4,
    "questionNumber": 37,
    "question": "For a Bipolar Junction Transistor (BJT), the relationship between Common-Base gain (α) and Common-Emitter gain (β) is:",
    "options": [
      {
        "key": "A",
        "text": "β = α / (1 - α)"
      },
      {
        "key": "B",
        "text": "α = β / (1 - β)"
      },
      {
        "key": "C",
        "text": "β = 1 + α"
      },
      {
        "key": "D",
        "text": "β = α²"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Since I_E = I_B + I_C and I_C = α·I_E = β·I_B, substituting yields β = α / (1 - α) and α = β / (1 + β).",
    "topic": "BJT Current Gains"
  },
  {
    "id": "mcq-u4-38",
    "unitNumber": 4,
    "questionNumber": 38,
    "question": "In a Junction Field Effect Transistor (JFET), the Gate-Source junction is ALWAYS operated under:",
    "options": [
      {
        "key": "A",
        "text": "Forward bias"
      },
      {
        "key": "B",
        "text": "Reverse bias"
      },
      {
        "key": "C",
        "text": "Zero bias only"
      },
      {
        "key": "D",
        "text": "Alternating square wave bias"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Reverse biasing the gate junction controls the depletion layer width without drawing gate current, giving the JFET its characteristic ultra-high input resistance (~10⁸ Ω).",
    "topic": "JFET Operation"
  },
  {
    "id": "mcq-u4-39",
    "unitNumber": 4,
    "questionNumber": 39,
    "question": "The Pinch-off Voltage (VP) of a JFET is defined as the drain-to-source voltage (at VGS = 0) at which:",
    "options": [
      {
        "key": "A",
        "text": "Gate current becomes infinite"
      },
      {
        "key": "B",
        "text": "Depletion layers touch and drain current saturates to IDSS"
      },
      {
        "key": "C",
        "text": "Drain current drops to zero"
      },
      {
        "key": "D",
        "text": "The transistor burns out"
      }
    ],
    "correctAnswer": "B",
    "explanation": "At V_DS = |V_P|, the depletion regions constrict the channel completely at the drain end. Beyond this voltage, current saturates to a constant level I_DSS.",
    "topic": "JFET Pinch-off"
  },
  {
    "id": "mcq-u4-40",
    "unitNumber": 4,
    "questionNumber": 40,
    "question": "In an N-Channel Enhancement MOSFET (E-MOSFET), a conducting channel between source and drain is created ONLY when:",
    "options": [
      {
        "key": "A",
        "text": "Gate-to-source voltage VGS exceeds a positive Threshold Voltage VGS(th)"
      },
      {
        "key": "B",
        "text": "VGS is negative"
      },
      {
        "key": "C",
        "text": "VDS is zero"
      },
      {
        "key": "D",
        "text": "The substrate is grounded without gate voltage"
      }
    ],
    "correctAnswer": "A",
    "explanation": "E-MOSFET is a normally-OFF device. Applying V_GS > V_GS(th) repels holes and attracts minority electrons under the gate oxide, inducing an N-type inversion channel.",
    "topic": "MOSFET Operation"
  },
  {
    "id": "mcq-u5-41",
    "unitNumber": 5,
    "questionNumber": 41,
    "question": "In a hydroelectric power station, the Surge Tank is located:",
    "options": [
      {
        "key": "A",
        "text": "Near the tailrace canal"
      },
      {
        "key": "B",
        "text": "Near the powerhouse on the penstock"
      },
      {
        "key": "C",
        "text": "Inside the reservoir lake"
      },
      {
        "key": "D",
        "text": "Behind the downstream spillway"
      }
    ],
    "correctAnswer": "B",
    "explanation": "The surge tank is placed on the penstock pipe close to the powerhouse to absorb water hammer shockwaves during emergency governor valve closure.",
    "topic": "Hydroelectric Stations"
  },
  {
    "id": "mcq-u5-42",
    "unitNumber": 5,
    "questionNumber": 42,
    "question": "The function of a Moderator (e.g. graphite, heavy water D₂O) in a nuclear power reactor is to:",
    "options": [
      {
        "key": "A",
        "text": "Slow down fast-moving fission neutrons to thermal energy levels"
      },
      {
        "key": "B",
        "text": "Absorb all neutrons to stop the reaction"
      },
      {
        "key": "C",
        "text": "Extract steam from the reactor"
      },
      {
        "key": "D",
        "text": "Shield radiation"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fast neutrons (2 MeV) released by uranium fission have a low probability of causing further fission. Collisions with moderator atoms slow them to thermal speeds (0.025 eV), sustaining the controlled chain reaction.",
    "topic": "Nuclear Power Plants"
  },
  {
    "id": "mcq-u5-43",
    "unitNumber": 5,
    "questionNumber": 43,
    "question": "Which material is commonly used to manufacture Control Rods in a nuclear reactor?",
    "options": [
      {
        "key": "A",
        "text": "Cadmium or Boron"
      },
      {
        "key": "B",
        "text": "Cast iron"
      },
      {
        "key": "C",
        "text": "Graphite"
      },
      {
        "key": "D",
        "text": "Heavy water"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Boron and Cadmium have extraordinarily high neutron-absorption cross-sections. Inserting these rods absorbs neutrons, slowing or halting the nuclear chain reaction.",
    "topic": "Nuclear Control Rods"
  },
  {
    "id": "mcq-u5-44",
    "unitNumber": 5,
    "questionNumber": 44,
    "question": "In domestic electrical installation wiring, a protective fuse or MCB is NEVER inserted in the:",
    "options": [
      {
        "key": "A",
        "text": "Neutral conductor"
      },
      {
        "key": "B",
        "text": "Phase (Live) conductor"
      },
      {
        "key": "C",
        "text": "Sub-circuit live wire"
      },
      {
        "key": "D",
        "text": "DC positive busbar"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fuses must ALWAYS be installed on the Phase (Live) wire. If a fuse is placed in the neutral wire and blows, the appliance remains energized at 230 V live potential, posing a severe fatal shock risk to anyone touching it.",
    "topic": "Electrical Safety Rules"
  },
  {
    "id": "mcq-u5-45",
    "unitNumber": 5,
    "questionNumber": 45,
    "question": "Destructive \"Water Hammer\" phenomenon in a hydroelectric plant occurs inside the:",
    "options": [
      {
        "key": "A",
        "text": "Penstock pipe"
      },
      {
        "key": "B",
        "text": "Surge tank"
      },
      {
        "key": "C",
        "text": "Draft tube"
      },
      {
        "key": "D",
        "text": "Spillway"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Rapid closure of turbine inlet guide vanes abruptly halts the high-inertia water column in the penstock, creating dangerous acoustic pressure spikes known as water hammer.",
    "topic": "Hydroelectric Safety"
  },
  {
    "id": "mcq-u5-46",
    "unitNumber": 5,
    "questionNumber": 46,
    "question": "An ideal earth electrode in an electrical grounding system must possess:",
    "options": [
      {
        "key": "A",
        "text": "High resistance and high capacitance"
      },
      {
        "key": "B",
        "text": "Very low electrical resistance (ideally < 1 to 5 Ω)"
      },
      {
        "key": "C",
        "text": "Low thermal conductivity"
      },
      {
        "key": "D",
        "text": "Insulating coating"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Earth electrodes must have very low resistance (below 5 Ω for homes, below 1 Ω for substations) so that fault leakage currents can safely discharge to earth without generating lethal touch voltages.",
    "topic": "Earthing Systems"
  },
  {
    "id": "mcq-u5-47",
    "unitNumber": 5,
    "questionNumber": 47,
    "question": "Which of the following represents the primary operating characteristic required of an electric fuse element wire?",
    "options": [
      {
        "key": "A",
        "text": "Low melting point and high electrical conductivity"
      },
      {
        "key": "B",
        "text": "High melting point and high resistance"
      },
      {
        "key": "C",
        "text": "High tensile strength and zero conductivity"
      },
      {
        "key": "D",
        "text": "Ferromagnetic permeability"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A fuse element wire (e.g. tin-lead alloy or silver) requires a low melting point so it melts rapidly during overloads, and high electrical conductivity so it exhibits minimal voltage drop during normal load operation.",
    "topic": "Protective Fuses"
  },
  {
    "id": "mcq-u5-48",
    "unitNumber": 5,
    "questionNumber": 48,
    "question": "According to Betz’s Law, the maximum theoretical kinetic energy that any wind turbine can extract from wind is:",
    "options": [
      {
        "key": "A",
        "text": "16/27 (59.3%)"
      },
      {
        "key": "B",
        "text": "100%"
      },
      {
        "key": "C",
        "text": "85%"
      },
      {
        "key": "D",
        "text": "25%"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Betz's limit dictates that air passing through a wind turbine cannot be brought to a complete standstill without blocking downstream airflow. Maximum aerodynamic extraction is 16/27 ≈ 59.26%.",
    "topic": "Wind Energy Betz Limit"
  },
  {
    "id": "mcq-u5-49",
    "unitNumber": 5,
    "questionNumber": 49,
    "question": "In domestic power systems, low power factor can be corrected and improved by connecting:",
    "options": [
      {
        "key": "A",
        "text": "Shunt (parallel) static capacitors across the inductive load"
      },
      {
        "key": "B",
        "text": "Series inductors"
      },
      {
        "key": "C",
        "text": "Series resistors"
      },
      {
        "key": "D",
        "text": "Rheostats"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Inductive loads draw lagging reactive power. Parallel shunt capacitors draw leading reactive current that cancels out the lagging component, pulling power factor close to unity.",
    "topic": "Power Factor Improvement"
  },
  {
    "id": "mcq-u5-50",
    "unitNumber": 5,
    "questionNumber": 50,
    "question": "The electric current threshold at 50 Hz AC that causes involuntary muscular clamping (\"Let-Go\" threshold) in humans is approximately:",
    "options": [
      {
        "key": "A",
        "text": "1 mA"
      },
      {
        "key": "B",
        "text": "10 mA to 20 mA"
      },
      {
        "key": "C",
        "text": "500 mA"
      },
      {
        "key": "D",
        "text": "5 A"
      }
    ],
    "correctAnswer": "B",
    "explanation": "At 10 to 20 mA, involuntary contraction of human forearm flexor muscles prevents the victim from releasing the live conductor. Ventricular fibrillation occurs at 50 to 100 mA.",
    "topic": "Electric Shock Thresholds"
  }
];
