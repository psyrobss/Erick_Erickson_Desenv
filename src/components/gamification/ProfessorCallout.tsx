/**
 * @file ProfessorCallout.tsx
 * Componente de Orientação Pedagógica da Disciplina.
 * Apresenta dicas teóricas, reflexões clínicas e alertas formativos para a aula,
 * com tom acolhedor, rigor conceitual e total acessibilidade.
 */

import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Lightbulb, Compass, BookOpen, Award } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface ProfessorCalloutProps {
  title?: string;
  message: string;
  clinicalTip?: string;
  examInsight?: string;
  stageName?: string;
  xpRewardBadge?: string;
}

export const ProfessorCallout: React.FC<ProfessorCalloutProps> = ({
  title = 'Orientação Pedagógica da Disciplina',
  message,
  clinicalTip,
  examInsight,
  stageName,
  xpRewardBadge,
}) => {
  const [isOpenTip, setIsOpenTip] = useState(false);

  const handleToggleTip = () => {
    if (!isOpenTip) {
      soundService.playProfessorCall();
    }
    setIsOpenTip(!isOpenTip);
  };

  return (
    <aside
      aria-label="Orientação Pedagógica da Disciplina"
      className="my-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-teal-500/10 p-4 sm:p-5 border border-indigo-200/60 dark:border-indigo-800/40 shadow-xs transition-all"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Ícone Institucional da Disciplina */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-sm border border-indigo-400/40">
            <Compass className="w-6 h-6 text-amber-300" />
          </div>
          <span 
            title="Dica ativa da disciplina" 
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center"
          />
        </div>

        {/* Mensagem da Disciplina */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {title}
              </span>
              {stageName && (
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  · {stageName}
                </span>
              )}
            </div>

            {xpRewardBadge && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ⭐ {xpRewardBadge}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
            {message}
          </p>

          {/* Dicas expandíveis da disciplina */}
          {(clinicalTip || examInsight) && (
            <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-slate-700/60">
              <button
                type="button"
                onClick={handleToggleTip}
                aria-expanded={isOpenTip}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 py-0.5"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{isOpenTip ? 'Ocultar detalhes pedagógicos' : 'Ver reflexão clínica e diretriz de avaliação'}</span>
                {isOpenTip ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isOpenTip && (
                <div className="mt-2.5 p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm animate-fadeIn">
                  {clinicalTip && (
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-teal-800 dark:text-teal-400 shrink-0">
                        🩺 Reflexão Clínica:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {clinicalTip}
                      </p>
                    </div>
                  )}

                  {examInsight && (
                    <div className="flex items-start gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-amber-800 dark:text-amber-400 shrink-0">
                        📝 Atenção na Avaliação:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {examInsight}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
