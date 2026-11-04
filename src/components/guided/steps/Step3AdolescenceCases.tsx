/**
 * @file Step3AdolescenceCases.tsx
 * Etapa 3 da Trilha Linear: Adolescência em profundidade, James Marcia e 4 Casos Clínicos aplicados
 */

import React, { useState } from 'react';
import { CASE_STUDIES_DATA } from '../../../data/caseStudiesData';
import { 
  Compass, UserCheck, Stethoscope, ArrowRight, ArrowLeft, 
  CheckCircle2, Lightbulb, AlertCircle, Sparkles, MessageSquare 
} from 'lucide-react';
import { soundService } from '../../../services/soundService';

interface Step3AdolescenceCasesProps {
  caseDecisions: Record<string, string>;
  onSaveCaseDecision: (caseId: string, optionId: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const Step3AdolescenceCases: React.FC<Step3AdolescenceCasesProps> = ({
  caseDecisions,
  onSaveCaseDecision,
  onNextStep,
  onPrevStep,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = CASE_STUDIES_DATA[activeCaseIndex];
  const selectedOptionId = caseDecisions[currentCase.id];

  // Contagem de casos resolvidos
  const resolvedCasesCount = CASE_STUDIES_DATA.filter(
    (c) => Boolean(caseDecisions[c.id])
  ).length;

  const handleSelectOption = (optionId: string) => {
    onSaveCaseDecision(currentCase.id, optionId);
    const chosen = currentCase.options.find((opt) => opt.id === optionId);
    if (chosen?.isPedagogicallyOptimal) {
      soundService.playSuccess();
    } else {
      soundService.playClick();
    }
  };

  const handleNextCase = () => {
    if (activeCaseIndex < CASE_STUDIES_DATA.length - 1) {
      setActiveCaseIndex(activeCaseIndex + 1);
      soundService.playClick();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Cabeçalho da Etapa 3 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Etapa 3 de 4 · O Ponto Alto da Teoria</span>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
            {resolvedCasesCount} de 4 Casos Resolvidos
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
          Adolescência: "Quem Sou Eu?" & Casos Clínicos
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed text-sm sm:text-base">
          O 5º estágio de Erikson é o momento em que deixamos de ser crianças e precisamos construir nossa própria identidade. Aqui você entenderá como funciona a <strong>moratória psicossocial</strong> e ajudará 4 jovens em situações reais da clínica psicológica.
        </p>
      </div>

      {/* 2. Bloco Conceitual Simples: Moratória e Fidelidade */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Dois Conceitos Fundamentais que Você Precisa Conhecer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider">
              1. Moratória Psicossocial
            </h3>
            <p className="text-xs sm:text-sm text-indigo-900/80 leading-relaxed">
              É uma "pausa consentida pela sociedade". Significa que o adolescente tem o direito saudável de testar estilos, cursos e amizades sem ser cobrado para decidir tudo imediatamente. Experimentar faz parte do amadurecimento!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-2">
            <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
              2. A Virtude da Fidelidade
            </h3>
            <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
              Quando a identidade começa a se firmar, o jovem conquista a <strong>fidelidade</strong>: a capacidade de ser leal aos seus valores, causas e amigos, mesmo quando houver contradições ou pressões externas.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Os 4 Status de Identidade de James Marcia (Didático e Resumido) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 font-display">
            A Matriz de James Marcia: Como as Pessoas Lidam com a Identidade?
          </h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          O psicólogo James Marcia descobriu que qualquer jovem pode estar em uma de 4 situações, dependendo de duas perguntas: <strong>Você explorou opções?</strong> e <strong>Você assumiu um compromisso?</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">1. Difusão de Identidade</span>
              <span className="text-[10px] font-mono text-slate-500">Sem Exploração · Sem Compromisso</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              O jovem não sabe o que quer e nem está procurando saber. Deixa as coisas correrem no vazio ("tanto faz").
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-amber-950">2. Pré-Fechamento (Foreclosure)</span>
              <span className="text-[10px] font-mono text-amber-800">Sem Exploração · COM Compromisso</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              O jovem aceitou a escolha dos pais ou da religião sem nunca questionar ou experimentar outras ideias por conta própria.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-950">3. Moratória Ativa</span>
              <span className="text-[10px] font-mono text-indigo-800">COM Exploração · Sem Compromisso ainda</span>
            </div>
            <p className="text-xs text-indigo-900/90 leading-relaxed">
              O jovem está no meio da busca: pesquisando profissões, testando opiniões e refletindo ativamente sobre quem ele é.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-950">4. Identidade Conquistada</span>
              <span className="text-[10px] font-mono text-emerald-800">COM Exploração · COM Compromisso</span>
            </div>
            <p className="text-xs text-emerald-900/90 leading-relaxed">
              O jovem passou pela busca, enfrentou dúvidas e assumiu compromissos autênticos que realmente fazem sentido para ele.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Laboratório Prático: 4 Casos Clínicos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-700 mb-1">
              LABORATÓRIO CLÍNICO DA DISCIPLINA
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Caso {activeCaseIndex + 1} de 4: {currentCase.studentName} ({currentCase.age} anos)
            </h2>
          </div>

          {/* Seletor Rápido dos 4 Casos */}
          <div className="flex items-center gap-1.5">
            {CASE_STUDIES_DATA.map((c, idx) => {
              const isResolved = Boolean(caseDecisions[c.id]);
              const isCurrent = idx === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCaseIndex(idx);
                    soundService.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                    isCurrent
                      ? 'bg-indigo-700 text-white border-indigo-700'
                      : isResolved
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {c.studentName} {isResolved ? '✓' : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Depoimento Real do Adolescente */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Depoimento em Sessão:</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-serif italic leading-relaxed">
            {currentCase.narrativeQuote}
          </p>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/60">
            <strong>Contexto:</strong> {currentCase.context} {currentCase.scenario}
          </div>
        </div>

        {/* Tensão Desenvolvimental */}
        <div className="text-xs font-semibold text-slate-600 bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
          <span className="text-indigo-900 font-bold">Dilema Teórico:</span> {currentCase.developmentalTension}
        </div>

        {/* Tomada de Decisão: Escolha a Conduta */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Qual Conduta Profissional Você Recomenda?
          </h3>

          <div className="space-y-3">
            {currentCase.options.map((option, oIdx) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <div key={option.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? option.isPedagogicallyOptimal
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                          : 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                      isSelected
                        ? option.isPedagogicallyOptimal
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-amber-600 text-white border-amber-600'
                        : 'border-slate-400 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div className="text-xs text-slate-600 leading-relaxed">{option.actionText}</div>
                    </div>
                  </button>

                  {/* Feedback Didático Explicativo quando selecionado */}
                  {isSelected && (
                    <div className={`p-4 rounded-xl text-xs space-y-1.5 ${
                      option.isPedagogicallyOptimal
                        ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-950'
                        : 'bg-amber-100/70 border border-amber-300 text-amber-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        {option.isPedagogicallyOptimal ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Conduta Recomendada pela Teoria de Erikson!</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-amber-700" />
                            <span>Atenção aos Riscos desta Abordagem:</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">{option.clinicalFeedback}</p>
                      <div className="pt-1 text-[11px] opacity-80 border-t border-slate-300/40">
                        <strong>Justificativa Conceitual:</strong> {option.theoreticalRationale}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Avanço entre casos */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            {selectedOptionId ? '✓ Decisão gravada nos cookies locais!' : 'Selecione uma conduta acima para registrar.'}
          </span>

          {activeCaseIndex < CASE_STUDIES_DATA.length - 1 ? (
            <button
              type="button"
              onClick={handleNextCase}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <span>Próximo Caso Clínico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Todos os 4 casos estão disponíveis!
            </span>
          )}
        </div>
      </div>

      {/* 5. Rodapé da Etapa: Voltar ou Avançar para a Etapa 4 */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100/80 p-5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={onPrevStep}
          className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Etapa 2 (Os 8 Estágios)</span>
        </button>

        <button
          type="button"
          onClick={onNextStep}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Avançar para Etapa 4: Avaliação & Relatório Final</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
