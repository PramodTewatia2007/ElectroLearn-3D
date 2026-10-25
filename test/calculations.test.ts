// Unit Tests for Core BEEE Mathematical Formulas & Sanity Verification

import { FORMULA_DATABASE } from '../src/data/formulas';

function assertEqual(actual: number, expected: number, tolerance = 0.01, testName: string) {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    throw new Error(`FAIL: ${testName} - Expected ${expected}, got ${actual} (diff: ${diff})`);
  }
  console.log(`PASS: ${testName} (${actual} ≈ ${expected})`);
}

function runBEEETests() {
  console.log('--- Running BEEE Electrical Engineering Mathematical Tests ---');

  // 1. Ohm's Law Voltage test: V = 2.5 A * 10 Ω = 25 V
  const ohmsV = FORMULA_DATABASE.find((f) => f.id === 'ohms-law-v')!;
  const res1 = ohmsV.calculate({ i: 2.5, r: 10 });
  assertEqual(res1.value, 25.0, 0.001, "Ohm's Law V = I * R");

  // 2. Ohm's Law Current test: I = 12 V / 4 Ω = 3 A
  const ohmsI = FORMULA_DATABASE.find((f) => f.id === 'ohms-law-i')!;
  const res2 = ohmsI.calculate({ v: 12, r: 4 });
  assertEqual(res2.value, 3.0, 0.001, "Ohm's Law I = V / R");

  // 3. Electrical Power: P = 230 V * 5 A = 1150 W
  const pwr = FORMULA_DATABASE.find((f) => f.id === 'electrical-power')!;
  const res3 = pwr.calculate({ v: 230, i: 5 });
  assertEqual(res3.value, 1150.0, 0.01, 'Electrical Power P = V * I');

  // 4. Series Resistors: Req = 10 + 20 + 30 = 60 Ω
  const ser = FORMULA_DATABASE.find((f) => f.id === 'series-resistors')!;
  const res4 = ser.calculate({ r1: 10, r2: 20, r3: 30 });
  assertEqual(res4.value, 60.0, 0.001, 'Series Resistors Req = R1 + R2 + R3');

  // 5. Parallel Resistors: Req = (12 * 6) / (12 + 6) = 72 / 18 = 4 Ω
  const par = FORMULA_DATABASE.find((f) => f.id === 'parallel-resistors')!;
  const res5 = par.calculate({ r1: 12, r2: 6 });
  assertEqual(res5.value, 4.0, 0.001, 'Parallel Resistors Req = (R1 * R2)/(R1 + R2)');

  // 6. AC RMS from Peak: Vrms = 325.27 / √2 = 230.0 V
  const acRms = FORMULA_DATABASE.find((f) => f.id === 'ac-rms-peak')!;
  const res6 = acRms.calculate({ vm: 325.269 });
  assertEqual(res6.value, 230.0, 0.1, 'AC RMS Voltage Vrms = Vm / √2');

  // 7. Transformer Turns Ratio: V2 = 230 * (24 / 460) = 12.0 V
  const tr = FORMULA_DATABASE.find((f) => f.id === 'transformer-turns-ratio')!;
  const res7 = tr.calculate({ v1: 230, n1: 460, n2: 24 });
  assertEqual(res7.value, 12.0, 0.01, 'Transformer Secondary Voltage V2 = V1 * (N2 / N1)');

  // 8. Induction Motor Synchronous Speed: Ns = 120 * 50 / 4 = 1500 RPM, slip at 1440 RPM = 0.04 (4%)
  const im = FORMULA_DATABASE.find((f) => f.id === 'induction-motor-slip')!;
  const res8 = im.calculate({ poles: 4, freq: 50, speed: 1440 });
  assertEqual(res8.value, 0.04, 0.001, 'Induction Motor Slip s = (Ns - N)/Ns');

  console.log('--- ALL MATHEMATICAL CALCULATION TESTS PASSED SUCCESSFULLY! ---');
}

runBEEETests();
