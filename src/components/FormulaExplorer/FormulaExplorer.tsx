import React, { useState } from 'react';
import { FORMULA_DATABASE } from '../../data/formulas';
import { FormulaDefinition } from '../../types/beee';
import { Calculator, AlertTriangle, Lightbulb, CheckCircle2, Search, Sliders, ArrowRight } from 'lucide-react';

export const FormulaExplorer: React.FC = () => {
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>(FORMULA_DATABASE[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValues, setInputValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FORMULA_DATABASE[0].variables.forEach((v) => {
      initial[v.id] = v.defaultValue;
    });
    return initial;
  });

  const selectedFormula = FORMULA_DATABASE.find((f) => f.id === selectedFormulaId) || FORMULA_DATABASE[0];

  // When formula changes, reseed default values
  const handleSelectFormula = (formula: FormulaDefinition) => {
    setSelectedFormulaId(formula.id);
    const defaults: Record<string, number> = {};
    formula.variables.forEach((v) => {
      defaults[v.id] = v.defaultValue;
    });
    setInputValues(defaults);
  };

  const handleInputChange = (varId: string, val: number) => {
    setInputValues((prev) => ({
      ...prev,
      [varId]: val,
    }));
  };

  // Compute live result
  const result = selectedFormula.calculate(inputValues);

  const filteredFormulas = FORMULA_DATABASE.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-amber-200/80 bg-radial from-amber-50/80 via-white to-amber-50/40 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 mb-2">
              <Calculator className="h-3.5 w-3.5" />
              Interactive Formula Explorer &amp; Numerical Solver
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Master Electrical Formulas Step by Step
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Adjust parameters in real-time, inspect line-by-line mathematical substitutions, learn SI units, and avoid common examination pitfalls.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search formulas (e.g. Ohm, Power)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-200 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Formula Selector Sidebar + Interactive Solver */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Formula List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
            Available Formulas ({filteredFormulas.length})
          </div>
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredFormulas.map((formula) => {
              const isSelected = formula.id === selectedFormulaId;
              return (
                <button
                  key={formula.id}
                  onClick={() => handleSelectFormula(formula)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-sm ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/80 shadow-xs ring-1 ring-amber-400'
                      : 'border-stone-200 bg-white hover:border-amber-200 hover:bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">{formula.name}</span>
                    <span className="text-[10px] rounded-md bg-stone-100 px-2 py-0.5 font-medium text-stone-600">
                      {formula.category}
                    </span>
                  </div>
                  <div className="mt-1 font-mono-math text-xs font-semibold text-amber-800">
                    {formula.latex}
                  </div>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                    {formula.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Solver & Step-by-Step Breakdown */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Formula Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-2">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                  {selectedFormula.category}
                </span>
                <h2 className="text-xl font-bold text-stone-900">{selectedFormula.name}</h2>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-2 text-center">
                <span className="text-[10px] text-amber-800 uppercase font-semibold block">Formula</span>
                <span className="font-mono-math text-lg font-extrabold text-amber-900">{selectedFormula.latex}</span>
              </div>
            </div>

            {/* Variable Adjustment Sliders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wide">
                <Sliders className="h-4 w-4 text-amber-600" />
                Adjust Input Parameters
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFormula.variables.map((variable) => {
                  const currentValue = inputValues[variable.id] ?? variable.defaultValue;
                  return (
                    <div key={variable.id} className="rounded-xl border border-stone-200 bg-[#fbf9f4] p-3.5 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-stone-700">
                          {variable.name} ({variable.symbol})
                        </span>
                        <div className="flex items-center gap-1 font-mono-math font-bold text-stone-900">
                          <input
                            type="number"
                            min={variable.min}
                            max={variable.max}
                            step={variable.step}
                            value={currentValue}
                            onChange={(e) => handleInputChange(variable.id, parseFloat(e.target.value) || 0)}
                            className="w-20 rounded border border-stone-300 bg-white px-2 py-0.5 text-right text-xs font-bold focus:border-amber-500 focus:outline-hidden"
                          />
                          <span className="text-[11px] text-stone-500">{variable.unit}</span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={variable.min}
                        max={variable.max}
                        step={variable.step}
                        value={currentValue}
                        onChange={(e) => handleInputChange(variable.id, parseFloat(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />

                      <div className="flex justify-between text-[10px] text-stone-400">
                        <span>Min: {variable.min}</span>
                        <span>Max: {variable.max}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/40 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Calculated Result ({result.outputLabel})
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono-math text-3xl font-black text-emerald-700">
                      {result.value}
                    </span>
                    <span className="text-sm font-bold text-emerald-800">{result.outputUnit}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-white/80 border border-emerald-100 px-3 py-2 text-xs text-stone-600 max-w-sm">
                  <span className="font-bold text-stone-800">Physical Insight:</span> {result.sanityCheckNotes}
                </div>
              </div>
            </div>

            {/* Line-by-Line Math Calculation Steps */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Line-by-Line Calculation Breakdown
              </h3>
              <div className="space-y-2 rounded-xl border border-stone-200 bg-stone-50/50 p-4 font-mono-math text-xs">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-stone-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-800">
                      {idx + 1}
                    </span>
                    <span className="py-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Life & Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Real World Example */}
              <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                  <Lightbulb className="h-4 w-4 text-sky-600" />
                  Real-World Example
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selectedFormula.realLifeExample}
                </p>
              </div>

              {/* Common Exam Mistakes */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Common Exam Mistakes
                </div>
                <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                  {selectedFormula.commonMistakes.map((mistake, mIdx) => (
                    <li key={mIdx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
