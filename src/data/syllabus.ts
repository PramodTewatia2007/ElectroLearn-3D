import { UnitOverview } from '../types/beee';

export const UNITS_DATA: UnitOverview[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'DC Circuit Analysis',
    shortDescription: 'Master electric charge, voltage, current, Ohm\'s law, series-parallel resistor networks, KCL, KVL, and source transformations.',
    totalLessons: 17,
    iconName: 'Zap',
    colorScheme: {
      primary: '#d97706',
      badgeBg: '#fef3c7',
      badgeText: '#92400e',
    },
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'AC Circuit Analysis',
    shortDescription: 'Explore sinusoidal waveforms, RMS/Average values, phasor representation, RLC series & parallel circuits, resonance, power factor, and 3-phase systems.',
    totalLessons: 16,
    iconName: 'Activity',
    colorScheme: {
      primary: '#0284c7',
      badgeBg: '#e0f2fe',
      badgeText: '#075985',
    },
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Electrical Machines and Transformers',
    shortDescription: 'Understand single-phase transformers, EMF equations, DC generators and motors, and three-phase induction motor rotating magnetic fields and slip.',
    totalLessons: 14,
    iconName: 'Cpu',
    colorScheme: {
      primary: '#b45309',
      badgeBg: '#fef3c7',
      badgeText: '#78350f',
    },
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Semiconductors and Their Applications',
    shortDescription: 'Demystify intrinsic/extrinsic semiconductors, P-N junction diodes, depletion regions, forward/reverse bias, V-I curves, rectifiers, and Zener regulators.',
    totalLessons: 13,
    iconName: 'Layers',
    colorScheme: {
      primary: '#7c3aed',
      badgeBg: '#ede9fe',
      badgeText: '#5b21b6',
    },
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Generation, Distribution and Electrical Safety',
    shortDescription: 'Learn thermal/hydro/solar power generation, grid transmission, substations, residential distribution boards, fuses, MCBs, earthing, and safety codes.',
    totalLessons: 14,
    iconName: 'ShieldCheck',
    colorScheme: {
      primary: '#15803d',
      badgeBg: '#dcfce7',
      badgeText: '#166534',
    },
  },
];
