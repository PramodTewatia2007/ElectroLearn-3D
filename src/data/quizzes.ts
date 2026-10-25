import { PracticeQuestion } from '../types/beee';

export interface QuizTest {
  id: string;
  unitId: string;
  title: string;
  timeLimitMinutes: number;
  questions: PracticeQuestion[];
}

export const QUIZ_DATABASE: QuizTest[] = [
  {
    id: 'quiz-u1-mastery',
    unitId: 'unit-1',
    title: 'Unit I Comprehensive DC Circuit Mastery Test',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q-dc-1',
        difficulty: 'easy',
        type: 'mcq',
        question: 'What is the standard SI unit of electric potential difference (Voltage)?',
        options: ['Ampere (A)', 'Volt (V)', 'Coulomb (C)', 'Watt (W)'],
        correctAnswerIndex: 1,
        explanation: 'The SI unit of potential difference is the Volt (V), named after Alessandro Volta. 1 Volt = 1 Joule per Coulomb.',
        hint: 'Named after the inventor of the electric battery.',
      },
      {
        id: 'q-dc-2',
        difficulty: 'easy',
        type: 'mcq',
        question: 'According to Ohm\'s Law, what happens to the electric current if the resistance of a circuit is tripled while voltage remains constant?',
        options: ['Current triples', 'Current becomes 9 times greater', 'Current is cut to one-third', 'Current remains unchanged'],
        correctAnswerIndex: 2,
        explanation: 'Since I = V / R, current is inversely proportional to resistance. Tripling resistance cuts current to 1/3 of its original value.',
        hint: 'Review I = V / R.',
      },
      {
        id: 'q-dc-3',
        difficulty: 'medium',
        type: 'mcq',
        question: 'Kirchhoff\'s Voltage Law (KVL) is a direct consequence of which fundamental conservation principle?',
        options: ['Conservation of Electric Charge', 'Conservation of Energy', 'Conservation of Momentum', 'Conservation of Mass'],
        correctAnswerIndex: 1,
        explanation: 'KVL represents the Conservation of Energy: round-trip work done per unit charge in a closed electrostatic loop is zero.',
        hint: 'Think of elevation on a closed hiking trail.',
      },
      {
        id: 'q-dc-4',
        difficulty: 'medium',
        type: 'mcq',
        question: 'Two resistors of 20 Ω and 30 Ω are connected in parallel. What is their equivalent resistance?',
        options: ['50 Ω', '12 Ω', '10 Ω', '600 Ω'],
        correctAnswerIndex: 1,
        explanation: 'Req = (R1 · R2) / (R1 + R2) = (20 · 30) / (20 + 30) = 600 / 50 = 12 Ω.',
        hint: 'Product over sum: (20 × 30) / (20 + 30).',
      },
      {
        id: 'q-dc-5',
        difficulty: 'medium',
        type: 'mcq',
        question: 'What is the internal resistance of an IDEAL voltage source and an IDEAL current source respectively?',
        options: ['Zero and Zero', 'Infinite and Zero', 'Zero and Infinite', '100 Ω and 0 Ω'],
        correctAnswerIndex: 2,
        explanation: 'An ideal voltage source has 0 Ω internal resistance (in series); an ideal current source has infinite (∞) internal resistance (in parallel).',
        hint: 'A perfect battery drops no voltage inside.',
      },
      {
        id: 'q-dc-6',
        difficulty: 'hard',
        type: 'numerical',
        question: 'A 24 V battery supplies two series resistors of 8 Ω and 16 Ω. What is the voltage drop across the 16 Ω resistor in Volts?',
        correctAnswerText: '16',
        explanation: 'Total resistance = 8 + 16 = 24 Ω. Current I = 24 V / 24 Ω = 1 A. Voltage drop V_16Ω = 1 A × 16 Ω = 16 V (or by VDR: 24 × (16/24) = 16 V).',
        hint: 'Use the Voltage Division Rule: 24 × (16 / 24).',
      },
      {
        id: 'q-dc-7',
        difficulty: 'hard',
        type: 'mcq',
        question: 'A 10 V voltage source in series with a 2 Ω resistor is transformed into an equivalent current source. What is the value of the current source and its parallel resistance?',
        options: ['5 A in parallel with 2 Ω', '20 A in parallel with 2 Ω', '5 A in series with 2 Ω', '2 A in parallel with 5 Ω'],
        correctAnswerIndex: 0,
        explanation: 'Is = Vs / R = 10 V / 2 Ω = 5 A. The parallel resistance remains 2 Ω.',
        hint: 'Is = Vs / R, with the same resistance value in parallel.',
      },
    ],
  },
];
