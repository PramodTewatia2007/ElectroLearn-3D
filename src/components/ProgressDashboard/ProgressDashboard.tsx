import React from 'react';
import { useApp } from '../../context/AppContext';
import { UNITS_DATA } from '../../data/syllabus';
import { UNIT_1_LESSONS } from '../../data/unit1_dc_circuits';
import {
  Layers,
  Award,
  BookOpen,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ProgressDashboardProps {
  onSelectLesson: (lessonId: string) => void;
  onOpenUnit: (unitId: string) => void;
  onOpenLab: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  onSelectLesson,
  onOpenUnit,
  onOpenLab,
}) => {
  const { progress } = useApp();

  const totalLessons = 74;
  const completedCount = progress.completedLessons.length;
  const percentage = Math.round((completedCount / totalLessons) * 100);

  // Find bookmarked lessons
  const bookmarkedLessons = UNIT_1_LESSONS.filter((l) =>
    progress.bookmarks.includes(l.id)
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-amber-200/90 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              Welcome to ElectroLearn 3D
            </div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              Your Personal Electrical Engineering Journey
            </h1>
            <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
              Designed from absolute zero. Learn concepts through interactive 3D simulations, step-by-step numerical calculations, and university exam preparation.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectLesson(progress.lastActiveLessonId || 'u1-l1')}
                className="flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 shadow-sm transition-all"
              >
                <span>Continue Learning</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenLab}
                className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs px-4 py-2.5 transition-all"
              >
                <Zap className="h-4 w-4 text-amber-600" />
                <span>Open 3D Virtual Lab</span>
              </button>
            </div>
          </div>

          {/* Progress Circular Gauge Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs text-center min-w-[200px]">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
              Overall Course Progress
            </span>
            <div className="font-mono-math text-4xl font-black text-amber-600">
              {percentage}%
            </div>
            <p className="text-xs font-semibold text-stone-600 mt-1">
              {completedCount} of {totalLessons} Lessons Done
            </p>
            <div className="mt-3 h-2 w-full rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.max(percentage, 4)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5 Syllabus Units Overview Cards */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-amber-600" />
          Five-Unit BEEE Curriculum
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UNITS_DATA.map((unit) => {
            const isUnit1 = unit.id === 'unit-1';
            const unitCompleted = UNIT_1_LESSONS.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;

            return (
              <div
                key={unit.id}
                onClick={() => onOpenUnit(unit.id)}
                className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-700">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-xs font-semibold text-amber-700">
                      {unit.totalLessons} Lessons
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition-colors">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {unit.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  {isUnit1 ? (
                    <span className="text-emerald-700 font-bold">
                      {unitCompleted} / {unit.totalLessons} Completed
                    </span>
                  ) : (
                    <span className="text-stone-400 font-medium">Ready to explore</span>
                  )}
                  <span className="font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore Unit <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarked Lessons Section */}
      {bookmarkedLessons.length > 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-amber-600" />
            Bookmarked Lessons ({bookmarkedLessons.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {bookmarkedLessons.map((l) => (
              <button
                key={l.id}
                onClick={() => onSelectLesson(l.id)}
                className="rounded-xl border border-stone-200 p-3 text-left hover:border-amber-300 hover:bg-stone-50/80 transition-all text-xs"
              >
                <div className="text-[10px] text-amber-800 font-bold">Lesson {l.lessonNumber}</div>
                <div className="font-bold text-stone-800 line-clamp-1">{l.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
