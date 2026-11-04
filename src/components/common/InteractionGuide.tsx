/**
 * @file InteractionGuide.tsx
 * Cartão de orientação didática explicando passo a passo como interagir com o módulo ativo
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MousePointerClick, Sliders, CheckCircle2 } from 'lucide-react';
import styled from 'styled-components';

const GuideContainer = styled.div`
  background: #f8fafc;
  border: 1px dashed #94a3b8;
  border-radius: 12px;
  padding: 0.85rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.8125rem;
  color: #334155;
`;

export interface StepItem {
  number: number;
  title?: string;
  instruction: string;
  icon?: React.ReactNode;
}

interface InteractionGuideProps {
  title: string;
  steps: StepItem[];
  tip?: string;
  defaultOpen?: boolean;
}

export const InteractionGuide: React.FC<InteractionGuideProps> = ({
  title,
  steps,
  tip,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <GuideContainer role="region" aria-label={title}>
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
          <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{title}</span>
          <span className="text-[11px] font-normal text-slate-500 hidden sm:inline">
            ({isOpen ? 'clique para ocultar' : 'clique para ver orientações de como interagir'})
          </span>
        </div>
        <button
          type="button"
          className="p-1 text-slate-500 hover:text-slate-800 focus:outline-none"
          aria-label={isOpen ? 'Recolher instruções' : 'Expandir instruções'}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {steps.map((st) => (
              <div
                key={st.number}
                className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 text-xs shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0 font-mono text-[11px] mt-0.5">
                  {st.number}
                </span>
                <div className="space-y-0.5">
                  {st.title && (
                    <div className="font-bold text-slate-900 text-xs">{st.title}</div>
                  )}
                  <p className="leading-snug text-slate-600">{st.instruction}</p>
                </div>
              </div>
            ))}
          </div>

          {tip && (
            <div className="p-2 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">💡 Dica Acadêmica:</span>
              <span className="leading-snug">{tip}</span>
            </div>
          )}
        </div>
      )}
    </GuideContainer>
  );
};
