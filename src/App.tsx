import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonContainer } from './components/LessonViewer/LessonContainer';
import { FormulaExplorer } from './components/FormulaExplorer/FormulaExplorer';
import { VirtualLab } from './components/VirtualLab/VirtualLab';
import { QuizCenter } from './components/QuizCenter/QuizCenter';
import { ExamPrep } from './components/ExamPrep/ExamPrep';
import { ProgressDashboard } from './components/ProgressDashboard/ProgressDashboard';
import { AITutorModal } from './components/AITutor/AITutorModal';
import { UNIT_1_LESSONS } from './data/unit1_dc_circuits';
import { UNIT_2_LESSONS } from './data/unit2_ac_circuits';
import { UNIT_3_LESSONS } from './data/unit3_machines';
import { UNIT_4_LESSONS } from './data/unit4_semiconductors';
import { UNIT_5_LESSONS } from './data/unit5_power_safety';
import { LessonContent } from './types/beee';
import './App.css';

const MainAppContent: React.FC = () => {
  const { activeUnitId, activeLessonId, setActiveUnitId, setActiveLessonId } = useApp();
  const [activeView, setActiveView] = useState<'lessons' | 'formulas' | 'lab' | 'quiz' | 'exam' | 'dashboard'>('lessons');
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);

  // Map unitId to its lessons
  const getLessonsForUnit = (uId: string): LessonContent[] => {
    switch (uId) {
      case 'unit-2':
        return UNIT_2_LESSONS;
      case 'unit-3':
        return UNIT_3_LESSONS;
      case 'unit-4':
        return UNIT_4_LESSONS;
      case 'unit-5':
        return UNIT_5_LESSONS;
      case 'unit-1':
      default:
        return UNIT_1_LESSONS;
    }
  };

  const currentUnitLessons = getLessonsForUnit(activeUnitId);
  const currentLesson = currentUnitLessons.find((l) => l.id === activeLessonId) || currentUnitLessons[0];

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveView('lessons');
  };

  const handleSelectUnit = (unitId: string) => {
    setActiveUnitId(unitId);
    const lessonsInUnit = getLessonsForUnit(unitId);
    if (lessonsInUnit.length > 0) {
      setActiveLessonId(lessonsInUnit[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-stone-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeView === 'lessons' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <Sidebar
              allLessonsInCurrentUnit={currentUnitLessons}
              onSelectLesson={handleSelectLesson}
              onSelectUnit={handleSelectUnit}
            />
            <div className="flex-1 w-full min-w-0">
              <LessonContainer
                lesson={currentLesson}
                allLessonsInUnit={currentUnitLessons}
                onSelectLesson={handleSelectLesson}
              />
            </div>
          </div>
        )}

        {activeView === 'formulas' && <FormulaExplorer />}

        {activeView === 'lab' && <VirtualLab />}

        {activeView === 'quiz' && <QuizCenter />}

        {activeView === 'exam' && <ExamPrep />}

        {activeView === 'dashboard' && (
          <ProgressDashboard
            onSelectLesson={handleSelectLesson}
            onOpenUnit={(uId) => {
              handleSelectUnit(uId);
              setActiveView('lessons');
            }}
            onOpenLab={() => setActiveView('lab')}
          />
        )}
      </main>

      {/* Warm & Clean Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © ElectroLearn 3D • Basic Electrical and Electronics Engineering
          </span>
          <div className="flex items-center gap-4 text-stone-400">
            <span>IEEE / IEC Standards</span>
            <span>•</span>
            <span>Zero Prerequisites BEEE Platform</span>
          </div>
        </div>
      </footer>

      {/* Socratic BEEE Professor AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        currentLessonTitle={currentLesson.title}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
