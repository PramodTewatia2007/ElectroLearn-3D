import React from 'react';
import { UNITS_DATA } from '../data/syllabus';
import { LessonContent } from '../types/beee';
import { useApp } from '../context/AppContext';
import {
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Zap,
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
  Bookmark,
} from 'lucide-react';

interface SidebarProps {
  allLessonsInCurrentUnit: LessonContent[];
  onSelectLesson: (lessonId: string) => void;
  onSelectUnit: (unitId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  allLessonsInCurrentUnit,
  onSelectLesson,
  onSelectUnit,
}) => {
  const { progress, activeUnitId, activeLessonId } = useApp();
  const [isUnitSelectorOpen, setIsUnitSelectorOpen] = React.useState(false);

  const activeUnit = UNITS_DATA.find((u) => u.id === activeUnitId) || UNITS_DATA[0];

  const getUnitIcon = (unitNum: number) => {
    switch (unitNum) {
      case 1: return <Zap className="h-4 w-4" />;
      case 2: return <Activity className="h-4 w-4" />;
      case 3: return <Cpu className="h-4 w-4" />;
      case 4: return <Layers className="h-4 w-4" />;
      case 5: return <ShieldCheck className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      {/* Unit Selector Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 px-1">
          Select Syllabus Unit
        </div>

        <button
          onClick={() => setIsUnitSelectorOpen(!isUnitSelectorOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 text-left transition-all hover:bg-amber-100/70"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white font-bold text-xs shadow-xs">
              {activeUnit.unitNumber}
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Unit {activeUnit.unitNumber}</div>
              <div className="text-xs text-amber-900 font-semibold line-clamp-1">{activeUnit.title}</div>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-amber-700 transition-transform ${isUnitSelectorOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown for All 5 Units */}
        {isUnitSelectorOpen && (
          <div className="mt-2 space-y-1.5 border-t border-stone-100 pt-2 animate-in fade-in duration-150">
            {UNITS_DATA.map((u) => {
              const isSelected = u.id === activeUnitId;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    onSelectUnit(u.id);
                    setIsUnitSelectorOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs transition-all ${
                    isSelected
                      ? 'border border-amber-400 bg-amber-100/80 font-bold text-amber-950 shadow-xs'
                      : 'border border-transparent hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-stone-100 text-[10px] font-bold text-stone-700">
                      U{u.unitNumber}
                    </span>
                    <span className="line-clamp-1">{u.title}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">{u.totalLessons} lessons</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lesson Tree / List for Selected Unit */}
      <div className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs space-y-2">
        <div className="flex items-center justify-between px-1 border-b border-stone-100 pb-2">
          <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-amber-600" />
            <span>Unit {activeUnit.unitNumber} Lessons ({allLessonsInCurrentUnit.length})</span>
          </div>
        </div>

        <div className="space-y-1 max-h-[580px] overflow-y-auto pr-1">
          {allLessonsInCurrentUnit.map((lesson) => {
            const isSelected = lesson.id === activeLessonId;
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isBookmarked = progress.bookmarks.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`group flex w-full items-start gap-2.5 rounded-xl p-2.5 text-left transition-all text-xs ${
                  isSelected
                    ? 'border border-amber-400 bg-amber-50 font-bold text-amber-950 shadow-xs'
                    : 'border border-transparent hover:border-stone-200 hover:bg-stone-50/80 text-stone-700'
                }`}
              >
                {/* Completion Status Indicator */}
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Circle className={`h-4 w-4 ${isSelected ? 'text-amber-500' : 'text-stone-300'}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-stone-400">Lesson {lesson.lessonNumber}</span>
                    {isBookmarked && <Bookmark className="h-3 w-3 text-amber-600 shrink-0" fill="currentColor" />}
                  </div>
                  <div className={`line-clamp-2 mt-0.5 ${isSelected ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                    {lesson.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1">
                    <span>{lesson.difficulty}</span>
                    <span>•</span>
                    <span>{lesson.estimatedMinutes}m</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
