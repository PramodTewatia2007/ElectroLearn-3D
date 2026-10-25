import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, LanguageCode, LearningMode, GraphicsQuality } from '../types/beee';

interface AppContextType {
  progress: UserProgress;
  activeUnitId: string;
  activeLessonId: string;
  setActiveUnitId: (unitId: string) => void;
  setActiveLessonId: (lessonId: string) => void;
  markLessonComplete: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  saveNote: (lessonId: string, note: string) => void;
  saveQuizScore: (quizId: string, score: number, total: number) => void;
  setLanguage: (lang: LanguageCode) => void;
  setLearningMode: (mode: LearningMode) => void;
  setGraphicsQuality: (quality: GraphicsQuality) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const STORAGE_KEY = 'electrolearn_3d_user_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  bookmarks: [],
  notes: {},
  lastActiveLessonId: 'u1-l1',
  preferredLanguage: 'en',
  learningMode: 'learning',
  graphicsQuality: 'high',
  readAloudSpeed: 1.0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return defaultProgress;
  });

  const [activeUnitId, setActiveUnitId] = useState<string>('unit-1');
  const [activeLessonId, setActiveLessonId] = useState<string>(progress.lastActiveLessonId || 'u1-l1');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.includes(lessonId);
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((id) => id !== lessonId)
          : [...prev.bookmarks, lessonId],
      };
    });
  };

  const saveNote = (lessonId: string, note: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: note,
      },
    }));
  };

  const saveQuizScore = (quizId: string, score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: { score, total, date: new Date().toISOString() },
      },
    }));
  };

  const setLanguage = (lang: LanguageCode) => {
    setProgress((prev) => ({ ...prev, preferredLanguage: lang }));
  };

  const setLearningMode = (mode: LearningMode) => {
    setProgress((prev) => ({ ...prev, learningMode: mode }));
  };

  const setGraphicsQuality = (quality: GraphicsQuality) => {
    setProgress((prev) => ({ ...prev, graphicsQuality: quality }));
  };

  // Web Speech API for Read-Aloud Accessibility
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = progress.readAloudSpeed || 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        activeUnitId,
        activeLessonId,
        setActiveUnitId,
        setActiveLessonId: (id: string) => {
          setActiveLessonId(id);
          setProgress((prev) => ({ ...prev, lastActiveLessonId: id }));
        },
        markLessonComplete,
        toggleBookmark,
        saveNote,
        saveQuizScore,
        setLanguage,
        setLearningMode,
        setGraphicsQuality,
        speakText,
        stopSpeaking,
        isSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
