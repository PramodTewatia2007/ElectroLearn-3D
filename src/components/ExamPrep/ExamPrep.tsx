import React, { useState } from 'react';
import { EXAM_QUESTION_BANK, ExamQuestion } from '../../data/examPrep';
import { OBJECTIVE_QUESTION_BANK, ObjectiveQuestion } from '../../data/objectiveQuestions';
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  Clock,
  Lightbulb,
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Sparkles,
  Printer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  Zap,
} from 'lucide-react';

const UNIT_INFO_MAP: Record<number, { title: string; subtitle: string; icon: string; badgeColor: string }> = {
  1: {
    title: 'Unit 1: DC Circuit Analysis & Network Theorems',
    subtitle: 'Ohm’s Law, KCL/KVL, Star-Delta, Thevenin, Norton, Superposition, Reciprocity, Transients, Two-Port Networks',
    icon: '⚡',
    badgeColor: 'border-amber-300 bg-amber-50 text-amber-900',
  },
  2: {
    title: 'Unit 2: AC Circuit Analysis & Three-Phase Systems',
    subtitle: 'Sinusoids, RMS/Average Values, Form Factor, Pure R/L/C, Series RLC, Resonance, Bandwidth, Power Triangle, 3-Phase',
    icon: '🌊',
    badgeColor: 'border-sky-300 bg-sky-50 text-sky-900',
  },
  3: {
    title: 'Unit 3: Electrical Machines, Transformers & Instruments',
    subtitle: 'Transformers, Efficiency, OC/SC Tests, Auto-Transformers, DC Motors, Alternator, PMMC, Moving Iron, Wheatstone',
    icon: '⚙️',
    badgeColor: 'border-amber-300 bg-amber-50 text-amber-900',
  },
  4: {
    title: 'Unit 4: Semiconductors, Diodes, Transistors & FETs',
    subtitle: 'Drift/Diffusion, P-N Junction, Rectifiers, Zener/Avalanche Breakdown, BJT CE Mode, JFET, MOSFET, Biasing Networks',
    icon: '🔬',
    badgeColor: 'border-purple-300 bg-purple-50 text-purple-900',
  },
  5: {
    title: 'Unit 5: Power Generation, Electrical Installations & Safety',
    subtitle: 'Hydro/Nuclear/Solar/Wind Power, Wiring Systems, Fuses, MCB/MCCB, Earthing, Power Factor Correction, Shock Safety, Tariff',
    icon: '🛡️',
    badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  },
};

export const ExamPrep: React.FC = () => {
  const [examMode, setExamMode] = useState<'descriptive' | 'objective'>('descriptive');
  const [selectedUnit, setSelectedUnit] = useState<number | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(
    new Set([EXAM_QUESTION_BANK[0]?.id || ''])
  );
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  const units = [
    { id: 'All', label: 'All Units (1 to 5)' },
    { id: 1, label: 'Unit 1: DC Circuits' },
    { id: 2, label: 'Unit 2: AC Circuits' },
    { id: 3, label: 'Unit 3: Machines & Transformers' },
    { id: 4, label: 'Unit 4: Semiconductors' },
    { id: 5, label: 'Unit 5: Power & Safety' },
  ];

  const categories = [
    'All',
    'Definition',
    'Short Answer',
    'Long Answer / Derivation',
    'Numerical Problem',
  ];

  // Filtering for Descriptive questions (strictly arranged by unit 1 -> 5)
  const filteredQuestions = EXAM_QUESTION_BANK.filter((q) => {
    const matchUnit = selectedUnit === 'All' || q.unitNumber === selectedUnit;
    const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
    return matchUnit && matchCat;
  });

  // Filtering for Objective MCQs (strictly arranged by unit 1 -> 5)
  const filteredMCQs = OBJECTIVE_QUESTION_BANK.filter((mcq) => {
    return selectedUnit === 'All' || mcq.unitNumber === selectedUnit;
  });

  const toggleQuestion = (id: string) => {
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedQuestionIds(new Set(filteredQuestions.map((q) => q.id)));
  };

  const handleCollapseAll = () => {
    setExpandedQuestionIds(new Set());
  };

  const handleSelectMCQ = (mcqId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [mcqId]: optionKey,
    }));
  };

  const handleResetMCQ = () => {
    setUserAnswers({});
  };

  // Score statistics for MCQs
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([id, ans]) => {
    const q = OBJECTIVE_QUESTION_BANK.find((item) => item.id === id);
    return q && q.correctAnswer === ans;
  }).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 px-4">
      {/* Header Banner */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50/90 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-300">
                <GraduationCap className="h-3.5 w-3.5" />
                University Examination Prep &amp; Official Question Bank
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-300">
                <Sparkles className="h-3 w-3" />
                Arranged Unit-by-Unit (Units 1 to 5)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
              BEEE Examination Model Answers &amp; Objective Question Bank
            </h1>
            <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
              Every question is strictly categorized and grouped by its corresponding syllabus unit.
              Answers feature line-by-line calculations, Given Data, vector SVG schematics, and
              examiner marking schemes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 shadow-xs transition"
              title="Print Questions for Offline Study"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200 pt-5">
          <button
            onClick={() => setExamMode('descriptive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              examMode === 'descriptive'
                ? 'bg-amber-600 text-white border border-amber-700'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Descriptive Model Answers ({EXAM_QUESTION_BANK.length} Questions across Units 1–5)
          </button>
          <button
            onClick={() => setExamMode('objective')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              examMode === 'objective'
                ? 'bg-amber-600 text-white border border-amber-700'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            Objective Multiple-Choice Quiz ({OBJECTIVE_QUESTION_BANK.length} MCQs across Units 1–5)
          </button>
        </div>
      </div>

      {/* Unit Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-600 uppercase tracking-wider mr-1">
          Filter by Unit:
        </span>
        {units.map((u) => (
          <button
            key={u.id}
            onClick={() => setSelectedUnit(u.id as number | 'All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              selectedUnit === u.id
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {u.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: DESCRIPTIVE QUESTIONS VIEW */}
      {/* ========================================================================= */}
      {examMode === 'descriptive' && (
        <>
          {/* Secondary Filter & Expand/Collapse Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-stone-500 mr-1">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-stone-800 text-white shadow-2xs'
                      : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">
                Showing <strong>{filteredQuestions.length}</strong> of {EXAM_QUESTION_BANK.length} questions
              </span>
              <button
                onClick={handleExpandAll}
                className="px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-md bg-white hover:bg-stone-100"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-md bg-white hover:bg-stone-100"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Question List Accordion Grouped by Unit */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-stone-500">
                <BookOpen className="h-8 w-8 mx-auto text-stone-400 mb-2" />
                <p className="text-sm font-semibold">No questions match the selected filters.</p>
                <p className="text-xs text-stone-400 mt-1">
                  Try selecting &quot;All Units&quot; or &quot;All Categories&quot;.
                </p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const isExpanded = expandedQuestionIds.has(q.id);
                const prevQ = idx > 0 ? filteredQuestions[idx - 1] : null;
                const isFirstOfUnit = selectedUnit === 'All' && (!prevQ || prevQ.unitNumber !== q.unitNumber);
                const unitInfo = UNIT_INFO_MAP[q.unitNumber];

                return (
                  <React.Fragment key={q.id}>
                    {/* Unit Section Divider Banner when viewing all units */}
                    {isFirstOfUnit && unitInfo && (
                      <div className="mt-8 mb-4 pt-4 border-t-2 border-stone-200">
                        <div className="flex items-center gap-3 bg-stone-100/70 p-3.5 rounded-xl border border-stone-200">
                          <span className="text-2xl">{unitInfo.icon}</span>
                          <div>
                            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
                              {unitInfo.title}
                            </h2>
                            <p className="text-xs text-stone-600 font-medium mt-0.5">
                              {unitInfo.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      id={q.id}
                      className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden transition-all duration-200 hover:border-amber-300"
                    >
                      {/* Question Header Card */}
                      <div
                        onClick={() => toggleQuestion(q.id)}
                        className="p-5 cursor-pointer select-none flex items-start justify-between gap-4 bg-stone-50/40 hover:bg-amber-50/30 transition-colors"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                                q.marks === 10
                                  ? 'bg-purple-100 text-purple-900 border-purple-200'
                                  : q.marks === 5
                                  ? 'bg-sky-100 text-sky-900 border-sky-200'
                                  : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                              }`}
                            >
                              [{q.marks} Marks]
                            </span>

                            <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              Unit {q.unitNumber}
                            </span>

                            <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                              {q.category}
                            </span>

                            {q.finalResult && (
                              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/70 border border-amber-300 px-2 py-0.5 rounded-md">
                                Result: {q.finalResult.split(',')[0]}
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-stone-900 leading-snug">
                            {q.question}
                          </h3>
                        </div>

                        <div className="text-stone-400 p-1 rounded-lg hover:bg-stone-200/60 transition shrink-0 mt-1">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-stone-700" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-stone-700" />
                          )}
                        </div>
                      </div>

                      {/* Collapsible Answer & Derivation Body */}
                      {isExpanded && (
                        <div className="p-6 border-t border-stone-100 bg-white space-y-6">
                          {/* Vector SVG Schematic Diagram */}
                          {q.diagramSvg && (
                            <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 text-center">
                              {q.diagramTitle && (
                                <p className="text-xs font-semibold text-stone-600 uppercase tracking-wider mb-3">
                                  {q.diagramTitle}
                                </p>
                              )}
                              <div
                                dangerouslySetInnerHTML={{ __html: q.diagramSvg }}
                                className="overflow-x-auto py-2"
                              />
                            </div>
                          )}

                          {/* Given Data Section */}
                          {q.givenData && q.givenData.length > 0 && (
                            <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-2">
                              <span className="text-xs font-bold text-sky-900 uppercase tracking-wide flex items-center gap-1.5">
                                <BookOpen className="h-4 w-4 text-sky-700" />
                                Given Data &amp; Numerical Parameters:
                              </span>
                              <div className="flex flex-wrap gap-2 text-xs font-mono text-sky-950">
                                {q.givenData.map((d, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className="bg-white/80 border border-sky-200 px-2.5 py-1 rounded-md"
                                  >
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Model Solution / Step-by-Step Derivation */}
                          <div className="rounded-xl border border-stone-200 bg-stone-50/30 p-5 space-y-3 font-mono text-xs">
                            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 font-sans">
                              <FileText className="h-4 w-4 text-amber-700" />
                              Complete University Model Answer (100% Full-Credit Structure)
                            </span>
                            <div className="whitespace-pre-line text-xs text-stone-800 leading-relaxed font-sans space-y-2">
                              {q.modelAnswer}
                            </div>
                          </div>

                          {/* Examiner Marking Scheme Breakdown */}
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                              <Award className="h-4 w-4 text-emerald-700" />
                              Official Examiner Step-Wise Marking Scheme Breakdown ({q.marks} Marks Total)
                            </span>
                            <ul className="text-xs text-emerald-950 space-y-1.5 list-disc list-inside">
                              {q.markingScheme.map((item, mIdx) => (
                                <li key={mIdx} className="leading-snug">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Examiner High-Scoring Tip */}
                          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 flex items-start gap-2.5 text-xs text-amber-950">
                            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Examiner&apos;s Secret Tip for Max Marks:</strong> {q.examTip}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: OBJECTIVE MULTIPLE-CHOICE QUIZ VIEW */}
      {/* ========================================================================= */}
      {examMode === 'objective' && (
        <div className="space-y-6">
          {/* Score Counter & Stats */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-500 text-white p-3 shadow-xs">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  MCQ Practice Score: {correctCount} / {answeredCount}
                </h3>
                <p className="text-xs text-stone-600">
                  {answeredCount === 0
                    ? 'Select an option for each question to see immediate feedback & explanation.'
                    : `Accuracy: ${Math.round((correctCount / (answeredCount || 1)) * 100)}% (${answeredCount} of ${filteredMCQs.length} attempted in this view)`}
                </p>
              </div>
            </div>

            <button
              onClick={handleResetMCQ}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 shadow-2xs transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All Answers
            </button>
          </div>

          {/* MCQ Question List Grouped by Unit */}
          <div className="space-y-4">
            {filteredMCQs.map((mcq, idx) => {
              const selectedOption = userAnswers[mcq.id];
              const isAnswered = selectedOption !== undefined;
              const isCorrect = selectedOption === mcq.correctAnswer;
              const prevMCQ = idx > 0 ? filteredMCQs[idx - 1] : null;
              const isFirstOfUnit = selectedUnit === 'All' && (!prevMCQ || prevMCQ.unitNumber !== mcq.unitNumber);
              const unitInfo = UNIT_INFO_MAP[mcq.unitNumber];

              return (
                <React.Fragment key={mcq.id}>
                  {/* Unit Section Divider Banner when viewing all units */}
                  {isFirstOfUnit && unitInfo && (
                    <div className="mt-8 mb-4 pt-4 border-t-2 border-stone-200">
                      <div className="flex items-center gap-3 bg-stone-100/70 p-3 rounded-xl border border-stone-200">
                        <span className="text-2xl">{unitInfo.icon}</span>
                        <div>
                          <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
                            {unitInfo.title}
                          </h2>
                          <p className="text-xs text-stone-600 font-medium">
                            10 Multiple-Choice Questions (MCQs)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl border bg-white p-6 shadow-xs transition ${
                      isAnswered
                        ? isCorrect
                          ? 'border-emerald-300 ring-1 ring-emerald-200'
                          : 'border-rose-300 ring-1 ring-rose-200'
                        : 'border-stone-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                          Q{mcq.questionNumber}
                        </span>
                        <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          Unit {mcq.unitNumber}
                        </span>
                        <span className="text-xs font-medium text-stone-500 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
                          {mcq.topic}
                        </span>
                      </div>

                      {isAnswered && (
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" /> Correct Answer
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" /> Incorrect (Option {mcq.correctAnswer} is correct)
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-stone-900 leading-snug mb-4">
                      {mcq.question}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {mcq.options.map((opt) => {
                        const isThisSelected = selectedOption === opt.key;
                        const isThisCorrectAnswer = mcq.correctAnswer === opt.key;

                        let btnStyle =
                          'border-stone-200 bg-stone-50/60 hover:bg-stone-100 text-stone-800';

                        if (isAnswered) {
                          if (isThisCorrectAnswer) {
                            btnStyle =
                              'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-300';
                          } else if (isThisSelected) {
                            btnStyle =
                              'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-1 ring-rose-300';
                          } else {
                            btnStyle = 'border-stone-200 bg-stone-50/30 text-stone-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectMCQ(mcq.id, opt.key)}
                            className={`flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                isAnswered && isThisCorrectAnswer
                                  ? 'bg-emerald-600 text-white'
                                  : isAnswered && isThisSelected
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-stone-200 text-stone-700'
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation card upon answering */}
                    {isAnswered && (
                      <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50/80 p-3.5 text-xs text-stone-700 space-y-1">
                        <span className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                          Explanation &amp; Technical Principle:
                        </span>
                        <p className="leading-relaxed text-stone-600">{mcq.explanation}</p>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
