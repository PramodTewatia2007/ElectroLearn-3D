import React from 'react';
import { useApp } from '../context/AppContext';
import { LearningMode, LanguageCode } from '../types/beee';
import {
  Zap,
  BookOpen,
  Calculator,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Layers,
  Globe,
  Award,
} from 'lucide-react';

interface NavbarProps {
  activeView: 'lessons' | 'formulas' | 'lab' | 'quiz' | 'exam' | 'dashboard';
  setActiveView: (view: 'lessons' | 'formulas' | 'lab' | 'quiz' | 'exam' | 'dashboard') => void;
  onOpenAITutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenAITutor,
}) => {
  const { progress, setLanguage, setLearningMode } = useApp();

  const totalLessonsInCurriculum = 74; // 17 + 16 + 14 + 13 + 14
  const completedCount = progress.completedLessons.length;
  const progressPct = Math.round((completedCount / totalLessonsInCurriculum) * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveView('dashboard')}
          className="flex cursor-pointer items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm ring-2 ring-amber-200">
            <Zap className="h-5 w-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-stone-900">
                ElectroLearn <span className="text-amber-600 font-extrabold">3D</span>
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                BEEE
              </span>
            </div>
            <p className="text-[10px] font-medium text-stone-500 hidden sm:block">
              Basic Electrical &amp; Electronics Engineering
            </p>
          </div>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setActiveView('lessons')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'lessons'
                ? 'bg-amber-100/80 text-amber-900'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <BookOpen className="h-4 w-4 text-amber-600" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => setActiveView('formulas')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'formulas'
                ? 'bg-amber-100/80 text-amber-900'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Calculator className="h-4 w-4 text-sky-600" />
            <span>Formula Explorer</span>
          </button>

          <button
            onClick={() => setActiveView('lab')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'lab'
                ? 'bg-amber-100/80 text-amber-900'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FlaskConical className="h-4 w-4 text-emerald-600" />
            <span>Virtual Lab</span>
          </button>

          <button
            onClick={() => setActiveView('quiz')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'quiz'
                ? 'bg-amber-100/80 text-amber-900'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Award className="h-4 w-4 text-purple-600" />
            <span>Practice &amp; Quiz</span>
          </button>

          <button
            onClick={() => setActiveView('exam')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'exam'
                ? 'bg-amber-100/80 text-amber-900'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="h-4 w-4 text-rose-600" />
            <span>Exam Prep</span>
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'dashboard'
                ? 'bg-amber-100/80 text-amber-900'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Layers className="h-4 w-4 text-amber-700" />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* Right Utility Bar */}
        <div className="flex items-center gap-2">
          {/* AI Tutor Assistant Trigger */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-radial from-amber-50 to-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 shadow-xs hover:from-amber-100 hover:to-amber-200 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-spin" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 px-2 py-1 text-xs">
            <Globe className="h-3.5 w-3.5 text-stone-500 mr-1" />
            <select
              value={progress.preferredLanguage}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent font-semibold text-stone-700 focus:outline-hidden cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hinglish">Hinglish</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Progress Pill */}
          <div
            onClick={() => setActiveView('dashboard')}
            className="hidden sm:flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-stone-50/80 px-2.5 py-1 text-xs"
          >
            <div className="h-2 w-12 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.max(progressPct, 5)}%` }}
              />
            </div>
            <span className="font-mono-math font-bold text-stone-800 text-[11px]">
              {progressPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden items-center justify-around border-t border-stone-100 bg-[#fbf9f4] px-2 py-1 text-[11px] font-bold text-stone-600">
        <button
          onClick={() => setActiveView('lessons')}
          className={`py-1 px-2 rounded-md ${activeView === 'lessons' ? 'text-amber-800 bg-amber-100' : ''}`}
        >
          Lessons
        </button>
        <button
          onClick={() => setActiveView('formulas')}
          className={`py-1 px-2 rounded-md ${activeView === 'formulas' ? 'text-amber-800 bg-amber-100' : ''}`}
        >
          Formulas
        </button>
        <button
          onClick={() => setActiveView('lab')}
          className={`py-1 px-2 rounded-md ${activeView === 'lab' ? 'text-amber-800 bg-amber-100' : ''}`}
        >
          Lab
        </button>
        <button
          onClick={() => setActiveView('quiz')}
          className={`py-1 px-2 rounded-md ${activeView === 'quiz' ? 'text-amber-800 bg-amber-100' : ''}`}
        >
          Quiz
        </button>
        <button
          onClick={() => setActiveView('exam')}
          className={`py-1 px-2 rounded-md ${activeView === 'exam' ? 'text-amber-800 bg-amber-100' : ''}`}
        >
          Exam
        </button>
      </div>
    </header>
  );
};
