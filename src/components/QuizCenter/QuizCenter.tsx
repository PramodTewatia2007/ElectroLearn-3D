import React, { useState } from 'react';
import { QUIZ_DATABASE, QuizTest } from '../../data/quizzes';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, ArrowRight } from 'lucide-react';

export const QuizCenter: React.FC = () => {
  const { progress, saveQuizScore } = useApp();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizTest>(QUIZ_DATABASE[0]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = selectedQuiz.questions[currentQIndex];

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleNumericalAnswer = (qId: string, val: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    selectedQuiz.questions.forEach((q) => {
      const userAns = selectedAnswers[q.id];
      if (q.type === 'numerical') {
        if (String(userAns).trim() === String(q.correctAnswerText).trim()) {
          correctCount++;
        }
      } else {
        if (userAns === q.correctAnswerIndex) {
          correctCount++;
        }
      }
    });

    saveQuizScore(selectedQuiz.id, correctCount, selectedQuiz.questions.length);

    if (correctCount >= selectedQuiz.questions.length * 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d97706', '#0284c7', '#15803d'],
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQIndex(0);
  };

  // Compute final score if submitted
  const score = selectedQuiz.questions.reduce((acc, q) => {
    const userAns = selectedAnswers[q.id];
    if (q.type === 'numerical') {
      return acc + (String(userAns).trim() === String(q.correctAnswerText).trim() ? 1 : 0);
    }
    return acc + (userAns === q.correctAnswerIndex ? 1 : 0);
  }, 0);

  const prevBest = progress.quizScores[selectedQuiz.id];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-purple-200 bg-radial from-purple-50/70 via-white to-purple-50/30 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-900 mb-2">
              <Award className="h-3.5 w-3.5" />
              Practice &amp; Quiz Examination Center
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              {selectedQuiz.title}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Verify your conceptual clarity with realistic examination questions. Immediate feedback reveals misconceptions.
            </p>
          </div>

          {prevBest && (
            <div className="rounded-xl border border-stone-200 bg-white p-3 text-center shadow-xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Your Best Score</span>
              <span className="font-mono-math text-lg font-bold text-emerald-700">
                {prevBest.score} / {prevBest.total}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Progress & Question Box */}
      {!isSubmitted ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
          {/* Question Stepper */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 text-xs">
            <span className="font-bold text-stone-700">
              Question {currentQIndex + 1} of {selectedQuiz.questions.length}
            </span>
            <span className="rounded-md bg-stone-100 px-2 py-0.5 font-semibold text-stone-600">
              {currentQuestion.difficulty.toUpperCase()}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base font-bold text-stone-900 leading-snug">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          {currentQuestion.options && (
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQuestion.id, oIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-medium flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/70 text-purple-950 font-bold shadow-xs'
                        : 'border-stone-200 bg-stone-50/60 hover:border-stone-300 hover:bg-stone-100/70 text-stone-800'
                    }`}
                  >
                    <span>
                      <span className="inline-block w-6 font-mono-math font-bold">
                        {String.fromCharCode(65 + oIdx)}.
                      </span>
                      {option}
                    </span>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-stone-300'
                    }`}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Numerical Input */}
          {currentQuestion.type === 'numerical' && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-stone-700 block">
                Type your calculated numerical answer:
              </label>
              <input
                type="text"
                placeholder="e.g. 16"
                value={String(selectedAnswers[currentQuestion.id] || '')}
                onChange={(e) => handleNumericalAnswer(currentQuestion.id, e.target.value)}
                className="w-48 rounded-xl border border-stone-300 bg-white p-2.5 text-sm font-mono-math font-bold text-stone-900 focus:border-purple-500 focus:outline-hidden"
              />
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-4">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(currentQIndex - 1)}
              className="rounded-lg border border-stone-200 px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-40"
            >
              Previous
            </button>

            {currentQIndex < selectedQuiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(currentQIndex + 1)}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-amber-700"
              >
                <span>Next Question</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
              >
                Submit Quiz &amp; Calculate Score
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Summary Card */
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
          <div className="text-center space-y-2 border-b border-stone-100 pb-5">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Quiz Completed</span>
            <div className="font-mono-math text-4xl font-black text-amber-700">
              {score} / {selectedQuiz.questions.length}
            </div>
            <p className="text-sm font-semibold text-stone-700">
              {score >= selectedQuiz.questions.length * 0.7
                ? '🎉 Excellent understanding! You are ready for university exams on this topic.'
                : '📚 Good attempt! Review the explanations below to clarify tricky concepts.'}
            </p>
            <button
              onClick={handleResetQuiz}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-900">Detailed Answer Review:</h3>
            {selectedQuiz.questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = q.type === 'numerical'
                ? String(userAns).trim() === String(q.correctAnswerText).trim()
                : userAns === q.correctAnswerIndex;

              return (
                <div key={q.id} className="rounded-xl border border-stone-200 bg-[#fbf9f4] p-4 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-stone-900">
                      Q{idx + 1}: {q.question}
                    </span>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold shrink-0">
                        <CheckCircle2 className="h-4 w-4" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-700 font-bold shrink-0">
                        <XCircle className="h-4 w-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
