/**
 * @file Step2LifeStages.tsx
 * Etapa 2 da Trilha Linear: Visualização direta e amigável dos 8 Estágios do Ciclo Vital
 */

import React, { useState } from 'react';
import { STAGES_DATA } from '../../../data/stagesData';
import { 
  Layers, CheckCircle2, ArrowRight, ArrowLeft, Lightbulb, 
  Sparkles, Heart, HelpCircle, Compass 
} from 'lucide-react';
import { soundService } from '../../../services/soundService';

interface Step2LifeStagesProps {
  completedTopics: string[];
  onToggleCompleteTopic: (topicId: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const Step2LifeStages: React.FC<Step2LifeStagesProps> = ({
  completedTopics,
  onToggleCompleteTopic,
  onNextStep,
  onPrevStep,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = STAGES_DATA[activeStageIndex];
  const stageTopicId = `estagio-${currentStage.id}`;
  const isCurrentStageCompleted = completedTopics.includes(stageTopicId);

  // Contagem de estágios concluídos
  const completedStagesCount = STAGES_DATA.filter((s) =>
    completedTopics.includes(`estagio-${s.id}`)
  ).length;

  const handleMarkAndNext = () => {
    if (!isCurrentStageCompleted) {
      onToggleCompleteTopic(stageTopicId);
      soundService.playSuccess();
    } else {
      soundService.playClick();
    }

    if (activeStageIndex < STAGES_DATA.length - 1) {
      setActiveStageIndex(activeStageIndex + 1);
    }
  };

  const allStagesCompleted = completedStagesCount === 8;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Cabeçalho da Etapa 2 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Etapa 2 de 4 · O Ciclo Vital Completo</span>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
            {completedStagesCount} de 8 Concluídos
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
          Os Oito Estágios do Nascimento à Velhice
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed text-sm sm:text-base">
          Erikson dividiu a vida humana em 8 grandes momentos. Em cada um deles, enfrentamos uma pergunta central e uma tensão entre dois caminhos. Clique nos botões numerados abaixo para conhecer cada fase com exemplos reais.
        </p>

        {/* 2. Seletor Linear dos 8 Estágios (1 a 8) */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Selecione o estágio para estudar:
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {STAGES_DATA.map((stage, idx) => {
              const isDone = completedTopics.includes(`estagio-${stage.id}`);
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => {
                    setActiveStageIndex(idx);
                    soundService.playClick();
                  }}
                  className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                    isActive
                      ? 'bg-indigo-700 text-white border-indigo-700 shadow-md scale-102 font-bold'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-medium'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-mono">{stage.id}º</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <span className="text-[10px] leading-tight line-clamp-1 opacity-80">
                    {stage.agePeriod.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Card do Estágio Ativo com Explicação Clara */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Identificação do Estágio */}
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-700 mb-1">
              ESTÁGIO {currentStage.id} DE 8 · {currentStage.agePeriod}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {currentStage.name}
            </h2>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Virtude Conquistada: <strong>{currentStage.virtue}</strong></span>
          </div>
        </div>

        {/* Pergunta Central do Desenvolvimento */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            A Pergunta Inconsciente desta Idade:
          </div>
          <div className="text-base sm:text-lg font-serif italic text-indigo-950 font-semibold">
            {currentStage.developmentalQuestion}
          </div>
        </div>

        {/* Os Dois Lados da Balança */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Polo Construtivo (+): {currentStage.crisis.positive}</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
              {currentStage.crisis.positiveDescription}
            </p>
          </div>

          <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Polo Desafiador (-): {currentStage.crisis.negative}</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-950/80 leading-relaxed">
              {currentStage.crisis.negativeDescription}
            </p>
          </div>
        </div>

        {/* Explicação Didática */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            O Que Acontece Nesta Fase da Vida?
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {currentStage.overview}
          </p>
        </div>

        {/* Exemplo do Cotidiano */}
        {currentStage.examples && currentStage.examples.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Exemplo no Cotidiano: {currentStage.examples[0].title}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentStage.examples[0].description}
            </p>
            <div className="pt-2 text-xs text-slate-500 border-t border-slate-200/60 font-sans">
              <strong>Reflexão Pedagógica:</strong> {currentStage.examples[0].analysis}
            </div>
          </div>
        )}

        {/* Botões de Ação para o Estágio Atual */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onToggleCompleteTopic(stageTopicId)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              isCurrentStageCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCurrentStageCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isCurrentStageCompleted ? 'Estágio Marcado como Concluído' : 'Marcar este Estágio como Concluído'}</span>
          </button>

          {activeStageIndex < STAGES_DATA.length - 1 ? (
            <button
              type="button"
              onClick={handleMarkAndNext}
              className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <span>Concluir & Ir para o Estágio {currentStage.id + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Você chegou ao 8º estágio!
            </div>
          )}
        </div>
      </div>

      {/* 4. Rodapé da Etapa: Voltar ou Avançar para a Etapa 3 */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100/80 p-5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={onPrevStep}
          className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Etapa 1</span>
        </button>

        <button
          type="button"
          onClick={onNextStep}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Avançar para Etapa 3: Adolescência & Casos Clínicos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
