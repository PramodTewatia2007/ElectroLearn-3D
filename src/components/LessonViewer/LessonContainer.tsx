import React, { useState } from 'react';
import { LessonContent, LanguageCode } from '../../types/beee';
import { useApp } from '../../context/AppContext';
import { Circuit3DViewer } from '../Simulations/Circuit3DViewer';
import { Circuit2DFallback } from '../Simulations/Circuit2DFallback';
import { ACWaveform3D } from '../Simulations/ACWaveform3D';
import { Transformer3D } from '../Simulations/Transformer3D';
import { Machine3D } from '../Simulations/Machine3D';
import { DiodeSemiconductor3D } from '../Simulations/DiodeSemiconductor3D';
import { PowerGrid3D } from '../Simulations/PowerGrid3D';
import { LessonSpecificSimulation } from '../Simulations/LessonSpecificSimulation';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Zap,
  Sparkles,
  Layers,
  FileText,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface LessonContainerProps {
  lesson: LessonContent;
  allLessonsInUnit: LessonContent[];
  onSelectLesson: (lessonId: string) => void;
}

export const LessonContainer: React.FC<LessonContainerProps> = ({
  lesson,
  allLessonsInUnit,
  onSelectLesson,
}) => {
  const {
    progress,
    markLessonComplete,
    toggleBookmark,
    saveNote,
    speakText,
    stopSpeaking,
    isSpeaking,
  } = useApp();

  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [use2DFallback, setUse2DFallback] = useState<boolean>(false);
  const [selectedTermLang, setSelectedTermLang] = useState<LanguageCode>('en');
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<string, number | string>>({});
  const [showPracticeExplanations, setShowPracticeExplanations] = useState<Record<string, boolean>>({});
  const [userNote, setUserNote] = useState<string>(progress.notes[lesson.id] || '');

  const isCompleted = progress.completedLessons.includes(lesson.id);
  const isBookmarked = progress.bookmarks.includes(lesson.id);

  // Lesson navigation
  const currentIndex = allLessonsInUnit.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessonsInUnit[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessonsInUnit.length - 1 ? allLessonsInUnit[currentIndex + 1] : null;

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d97706', '#0284c7', '#15803d'],
    });
  };

  const handleNoteBlur = () => {
    saveNote(lesson.id, userNote);
  };

  const handleSelectPracticeOption = (questionId: string, optionIndex: number) => {
    setUserPracticeAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowPracticeExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  const stepsList = [
    { num: 1, label: 'Everyday Intro' },
    { num: 2, label: 'Definition' },
    { num: 3, label: 'How It Works' },
    { num: 4, label: 'Visual Simulation' },
    { num: 5, label: 'Terminology' },
    { num: 6, label: 'Formula' },
    { num: 7, label: 'Solved Numerical' },
    { num: 8, label: 'Applications' },
    { num: 9, label: 'Practice Quiz' },
    { num: 10, label: 'Revision' },
  ];

  // Render the appropriate simulation customized specifically for each lesson
  const renderSimulationComponent = () => {
    return (
      <LessonSpecificSimulation
        lessonId={lesson.id}
        lesson={lesson}
        use2DFallback={use2DFallback}
      />
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                Unit {lesson.unitNumber} • Lesson {lesson.lessonNumber}
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                {lesson.difficulty}
              </span>
              <span className="text-xs text-stone-400">⏱ ~{lesson.estimatedMinutes} mins</span>
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Action buttons (Read Aloud, Bookmark, Complete) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speakText(`${lesson.title}. ${lesson.step1EverydayIntro.story}`);
                }
              }}
              title={isSpeaking ? 'Stop Read-Aloud' : 'Read Aloud (Text to Speech)'}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                isSpeaking
                  ? 'border-amber-400 bg-amber-100 text-amber-900 animate-pulse'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud'}</span>
            </button>

            <button
              onClick={() => toggleBookmark(lesson.id)}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Lesson'}
              className={`rounded-xl border p-2 transition-all ${
                isBookmarked
                  ? 'border-amber-400 bg-amber-100 text-amber-800'
                  : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleMarkComplete}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              <span>{isCompleted ? 'Completed!' : 'Mark Complete'}</span>
            </button>
          </div>
        </div>

        {/* 10-Step Horizontal Progress Navigation Tabs */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {stepsList.map((st) => {
            const isActive = activeStepTab === st.num;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStepTab(st.num)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                  isActive ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {st.num}
                </span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Content Container */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
        {/* STEP 1: Everyday Introduction */}
        {activeStepTab === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                1
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 1: Everyday Introduction</h2>
                <p className="text-xs text-stone-500">Connecting engineering concepts to familiar real-world experiences</p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                <Sparkles className="h-4 w-4 text-amber-600" />
                {lesson.step1EverydayIntro.analogyTitle}
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {lesson.step1EverydayIntro.story}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Familiar Object</span>
                <p className="text-sm font-semibold text-stone-800">
                  {lesson.step1EverydayIntro.realWorldObject}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Core Takeaway</span>
                <p className="text-sm font-semibold text-emerald-900">
                  {lesson.step1EverydayIntro.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Simple Definition */}
        {activeStepTab === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                2
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 2: Simple Definition</h2>
                <p className="text-xs text-stone-500">Accurate, beginner-friendly definitions without confusing jargon</p>
              </div>
            </div>

            <div className="rounded-xl border-l-4 border-l-amber-500 border border-stone-200 bg-amber-50/40 p-5">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                Formal Academic Definition
              </span>
              <p className="text-base font-semibold text-stone-900 leading-relaxed">
                "{lesson.step2SimpleDefinition.definition}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 bg-[#fbf9f4] p-4 space-y-1.5">
                <span className="text-xs font-bold text-stone-700 uppercase">What It Is Really (In Plain English)</span>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {lesson.step2SimpleDefinition.whatItIsReally}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-[#fbf9f4] p-4 space-y-1.5">
                <span className="text-xs font-bold text-stone-700 uppercase">Why It Matters</span>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {lesson.step2SimpleDefinition.whyItMatters}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: How It Works */}
        {activeStepTab === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                3
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 3: How It Works</h2>
                <p className="text-xs text-stone-500">Underlying physics and processes explained step-by-step</p>
              </div>
            </div>

            <div className="space-y-3">
              {lesson.step3HowItWorks.points.map((pt) => (
                <div key={pt.step} className="flex items-start gap-3.5 rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 font-bold text-white text-xs">
                    {pt.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{pt.title}</h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">{pt.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
              <span className="text-xs font-bold text-sky-900 block mb-1">Summary of Mechanism</span>
              <p className="text-xs text-stone-700">{lesson.step3HowItWorks.summary}</p>
            </div>
          </div>
        )}

        {/* STEP 4: Visual Explanation */}
        {activeStepTab === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                  4
                </span>
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Step 4: Interactive Visual Simulation</h2>
                  <p className="text-xs text-stone-500">Live 3D educational model with mathematical consistency</p>
                </div>
              </div>

              {/* 3D vs 2D Fallback Switcher */}
              <button
                onClick={() => setUse2DFallback(!use2DFallback)}
                className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-800 hover:bg-stone-200 transition-colors"
              >
                <Layers className="h-3.5 w-3.5 text-amber-700" />
                <span>{use2DFallback ? 'Switch to 3D View' : 'Switch to 2D Fallback'}</span>
              </button>
            </div>

            {/* Simulation Instructions */}
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-xs text-stone-700 space-y-1">
              <span className="font-bold text-stone-900">Interactive Lab Instructions:</span>
              <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                {lesson.step4VisualSimulation.instructions.map((inst, iIdx) => (
                  <li key={iIdx}>{inst}</li>
                ))}
              </ul>
            </div>

            {/* Dynamic 3D / 2D Simulation Engine Component */}
            {renderSimulationComponent()}

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900">
              <strong>What to Observe:</strong> {lesson.step4VisualSimulation.whatToObserve}
            </div>
          </div>
        )}

        {/* STEP 5: Important Terminology */}
        {activeStepTab === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                  5
                </span>
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Step 5: Important Terminology</h2>
                  <p className="text-xs text-stone-500">Key technical vocabulary in English, Hinglish, and Hindi</p>
                </div>
              </div>

              {/* Language Selector for Terms */}
              <div className="flex items-center rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs">
                <button
                  onClick={() => setSelectedTermLang('en')}
                  className={`rounded-md px-2.5 py-1 font-bold ${
                    selectedTermLang === 'en' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setSelectedTermLang('hinglish')}
                  className={`rounded-md px-2.5 py-1 font-bold ${
                    selectedTermLang === 'hinglish' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Hinglish
                </button>
                <button
                  onClick={() => setSelectedTermLang('hi')}
                  className={`rounded-md px-2.5 py-1 font-bold ${
                    selectedTermLang === 'hi' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.step5Terminology.map((term, tIdx) => (
                <div key={tIdx} className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-stone-900">{term.term}</h3>
                    {term.hindiTerm && (
                      <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {term.hindiTerm}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    {selectedTermLang === 'en' && term.simpleDefEn}
                    {selectedTermLang === 'hinglish' && term.simpleDefHinglish}
                    {selectedTermLang === 'hi' && term.simpleDefHi}
                  </p>

                  <div className="rounded-lg bg-stone-50 border border-stone-100 p-2 text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-700">Analogy: </span>
                    {term.analogy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Formula Explanation */}
        {activeStepTab === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                6
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 6: Formula Explanation</h2>
                <p className="text-xs text-stone-500">Mathematical symbols, SI units, and conditions for use</p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-center space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {lesson.step6Formula.formulaName}
              </span>
              <div className="font-mono-math text-2xl font-black text-amber-950">
                {lesson.step6Formula.expression}
              </div>
              <p className="text-xs text-stone-600 max-w-xl mx-auto">
                {lesson.step6Formula.intuitiveMeaning}
              </p>
            </div>

            {/* Symbols Table */}
            <div className="rounded-xl border border-stone-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3">Symbol</th>
                    <th className="p-3">Quantity Name</th>
                    <th className="p-3">SI Unit</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {lesson.step6Formula.symbols.map((sym, sIdx) => (
                    <tr key={sIdx} className="hover:bg-stone-50/60">
                      <td className="p-3 font-mono-math font-bold text-amber-800">{sym.symbol}</td>
                      <td className="p-3 font-semibold text-stone-800">{sym.name}</td>
                      <td className="p-3 text-stone-600">{sym.siUnit}</td>
                      <td className="p-3 text-stone-500">{sym.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-600">
              <span className="font-bold text-stone-800">Conditions &amp; Limitations: </span>
              {lesson.step6Formula.conditions}
            </div>
          </div>
        )}

        {/* STEP 7: Solved Numerical Problem */}
        {activeStepTab === 7 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                7
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 7: Line-by-Line Solved Numerical</h2>
                <p className="text-xs text-stone-500">Fully worked university exam numerical with step-by-step arithmetic</p>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                Problem Statement
              </span>
              <p className="text-sm font-semibold text-stone-800 leading-relaxed">
                {lesson.step7SolvedNumerical.problemStatement}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase">Given Data</span>
                <ul className="text-xs text-stone-700 space-y-0.5">
                  {lesson.step7SolvedNumerical.givenData.map((d, dIdx) => (
                    <li key={dIdx}>
                      <span className="font-mono-math font-bold">{d.symbol}</span> ({d.label}) = <strong>{d.value} {d.unit}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase">To Calculate</span>
                <p className="text-xs font-semibold text-stone-800">{lesson.step7SolvedNumerical.toFind}</p>
                <div className="text-xs text-amber-800 font-mono-math font-bold">
                  Formula: {lesson.step7SolvedNumerical.relevantFormula}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wide block">
                Line-by-Line Solution
              </span>
              {lesson.step7SolvedNumerical.steps.map((st) => (
                <div key={st.stepNumber} className="rounded-xl border border-stone-200 bg-[#fbf9f4] p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">
                      Step {st.stepNumber}: {st.description}
                    </span>
                  </div>
                  <div className="rounded-lg bg-white border border-stone-200 p-2 font-mono-math text-xs font-bold text-amber-900">
                    {st.mathExpression}
                  </div>
                  <p className="text-xs text-stone-600">{st.explanation}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase block">Final Calculated Answer</span>
                <div className="font-mono-math text-xl font-black text-emerald-900">
                  {lesson.step7SolvedNumerical.finalAnswer.value} {lesson.step7SolvedNumerical.finalAnswer.unit}
                </div>
              </div>
              <div className="text-xs text-stone-600 max-w-md">
                <strong>Why this makes sense:</strong> {lesson.step7SolvedNumerical.whyItMakesSense}
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Practical Applications */}
        {activeStepTab === 8 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                8
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 8: Practical Applications &amp; Safety</h2>
                <p className="text-xs text-stone-500">Real-world devices, industrial engineering, and vital safety precautions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {lesson.step8PracticalApplication.appliances.map((app, aIdx) => (
                <div key={aIdx} className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 font-bold">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900">{app.name}</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{app.role}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 space-y-1">
              <span className="text-xs font-bold text-sky-900 uppercase">Industrial Engineering Usage</span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lesson.step8PracticalApplication.industrialUsage}
              </p>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50/60 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                Electrical Safety Caution &amp; Code of Practice
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                {lesson.step8PracticalApplication.safetyCaution}
              </p>
            </div>
          </div>
        )}

        {/* STEP 9: Practice Quiz */}
        {activeStepTab === 9 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                9
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 9: Practice Questions</h2>
                <p className="text-xs text-stone-500">Test your understanding with instant feedback and misconception clarification</p>
              </div>
            </div>

            <div className="space-y-6">
              {lesson.step9Practice.map((q, qIdx) => {
                const selectedOption = userPracticeAnswers[q.id];
                const showExplanation = showPracticeExplanations[q.id];
                const isCorrect = selectedOption === q.correctAnswerIndex;

                return (
                  <div key={q.id} className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-500 uppercase">Question {qIdx + 1}</span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                        q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                        q.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900">{q.question}</h4>

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOption === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectPracticeOption(q.id, oIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                                isSelected
                                  ? isCorrect
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                                    : 'border-red-500 bg-red-50 text-red-900'
                                  : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                              }`}
                            >
                              <span className="mr-2 inline-block font-mono-math font-bold">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {showExplanation && (
                      <div className={`rounded-xl p-4 text-xs space-y-1.5 ${
                        isCorrect ? 'border border-emerald-200 bg-emerald-50/70 text-emerald-900' : 'border border-amber-200 bg-amber-50/70 text-stone-800'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>Correct! Great job.</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-amber-600" />
                              <span>Not quite right. Let's look at why:</span>
                            </>
                          )}
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 10: Quick Revision */}
        {activeStepTab === 10 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-900 text-sm">
                10
              </span>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Step 10: Quick Revision &amp; Summary</h2>
                <p className="text-xs text-stone-500">Essential takeaway points and common mistakes before moving forward</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">Core Revision Points</span>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside">
                  {lesson.step10QuickRevision.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-2">
                <span className="text-xs font-bold text-red-900 uppercase">Exam Mistakes to Avoid</span>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside">
                  {lesson.step10QuickRevision.commonMistakesToAvoid.map((mistake, mIdx) => (
                    <li key={mIdx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Student Personal Notes */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-amber-600" />
                Your Personal Study Notes (Saved Automatically)
              </span>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                onBlur={handleNoteBlur}
                placeholder="Write your personal reminders or doubt notes here..."
                rows={3}
                className="w-full rounded-lg border border-stone-300 bg-white p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleMarkComplete}
                className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm px-8 py-3 shadow-md flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Mark Lesson {lesson.lessonNumber} as Complete &amp; Earn Progress</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step Navigation Bottom Bar */}
      <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-3 shadow-xs">
        <button
          onClick={() => {
            if (activeStepTab > 1) {
              setActiveStepTab(activeStepTab - 1);
            } else if (prevLesson) {
              onSelectLesson(prevLesson.id);
            }
          }}
          className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{activeStepTab > 1 ? `Step ${activeStepTab - 1}` : 'Previous Lesson'}</span>
        </button>

        <span className="text-xs font-semibold text-stone-500">
          Step {activeStepTab} of 10
        </span>

        <button
          onClick={() => {
            if (activeStepTab < 10) {
              setActiveStepTab(activeStepTab + 1);
            } else if (nextLesson) {
              onSelectLesson(nextLesson.id);
            }
          }}
          className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-amber-700"
        >
          <span>{activeStepTab < 10 ? `Step ${activeStepTab + 1}` : 'Next Lesson'}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
