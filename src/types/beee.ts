// ElectroLearn 3D - BEEE Types

export type LanguageCode = 'en' | 'hinglish' | 'hi';

export type LearningMode = 'learning' | 'exam' | 'revision';

export type GraphicsQuality = 'high' | 'medium' | 'low';

export interface TerminologyItem {
  term: string;
  simpleDefEn: string;
  simpleDefHinglish: string;
  simpleDefHi: string;
  hindiTerm?: string;
  pronunciation?: string;
  analogy: string;
}

export interface SolvedNumericalStep {
  stepNumber: number;
  description: string;
  mathExpression: string;
  explanation: string;
}

export interface SolvedNumerical {
  problemStatement: string;
  givenData: { symbol: string; label: string; value: string; unit: string }[];
  toFind: string;
  relevantFormula: string;
  steps: SolvedNumericalStep[];
  finalAnswer: { value: string; unit: string };
  whyItMakesSense: string;
}

export interface PracticeQuestion {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'true-false' | 'numerical';
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerText?: string;
  explanation: string;
  misconceptionExplanation?: string;
  hint: string;
}

export interface LessonContent {
  id: string;
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  lessonNumber: number;
  title: string;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];

  // 10-step teaching sequence
  step1EverydayIntro: {
    analogyTitle: string;
    story: string;
    realWorldObject: string;
    keyTakeaway: string;
  };
  step2SimpleDefinition: {
    definition: string;
    whatItIsReally: string;
    whyItMatters: string;
  };
  step3HowItWorks: {
    points: { step: number; title: string; detail: string }[];
    summary: string;
  };
  step4VisualSimulation: {
    simulationType: 'dc-circuit' | 'ac-waveform' | 'transformer' | 'machine' | 'semiconductor' | 'grid-safety';
    defaultParams: Record<string, number | boolean | string>;
    instructions: string[];
    whatToObserve: string;
  };
  step5Terminology: TerminologyItem[];
  step6Formula: {
    formulaName: string;
    expression: string;
    symbols: { symbol: string; name: string; siUnit: string; description: string }[];
    conditions: string;
    intuitiveMeaning: string;
  };
  step7SolvedNumerical: SolvedNumerical;
  step8PracticalApplication: {
    appliances: { name: string; role: string; icon: string }[];
    industrialUsage: string;
    safetyCaution: string;
  };
  step9Practice: PracticeQuestion[];
  step10QuickRevision: {
    keyTakeaways: string[];
    quickFormulae: string[];
    commonMistakesToAvoid: string[];
  };
}

export interface UnitOverview {
  id: string;
  unitNumber: number;
  title: string;
  shortDescription: string;
  totalLessons: number;
  iconName: string;
  colorScheme: {
    primary: string;
    badgeBg: string;
    badgeText: string;
  };
}

export interface FormulaDefinition {
  id: string;
  unitId: string;
  name: string;
  latex: string;
  description: string;
  category: string;
  variables: {
    id: string;
    symbol: string;
    name: string;
    unit: string;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
  }[];
  calculate: (inputs: Record<string, number>) => {
    outputLabel: string;
    outputSymbol: string;
    outputUnit: string;
    value: number;
    steps: string[];
    sanityCheckNotes: string;
  };
  commonMistakes: string[];
  realLifeExample: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  bookmarks: string[];
  notes: Record<string, string>;
  lastActiveLessonId: string;
  preferredLanguage: LanguageCode;
  learningMode: LearningMode;
  graphicsQuality: GraphicsQuality;
  readAloudSpeed: number;
}
