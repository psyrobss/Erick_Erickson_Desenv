/**
 * @file Step4EvaluationReport.tsx
 * Etapa 4 da Trilha Linear: Exercícios formativos com gabarito comentado e emissão do Relatório Oficial / PDF
 */

import React, { useState } from 'react';
import { QUIZ_QUESTIONS_DATA } from '../../../data/quizQuestionsData';
import { ProgressBreakdown } from '../../../types/progress';
import { 
  FileText, Award, CheckCircle2, ArrowLeft, Printer, 
  HelpCircle, Sparkles, BookOpen, Stethoscope, Copy, Check 
} from 'lucide-react';
import { soundService } from '../../../services/soundService';

interface Step4EvaluationReportProps {
  quizAnswers: Record<string, string>;
  onAnswerQuiz: (questionId: string, optionId: string, isCorrect: boolean) => void;
  breakdown: ProgressBreakdown;
  studentName?: string;
  studentId?: string;
  onOpenReportModal: () => void;
  onPrevStep: () => void;
}

export const Step4EvaluationReport: React.FC<Step4EvaluationReportProps> = ({
  quizAnswers,
  onAnswerQuiz,
  breakdown,
  studentName = '',
  studentId = '',
  onOpenReportModal,
  onPrevStep,
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const currentQuestion = QUIZ_QUESTIONS_DATA[activeQuestionIndex];
  const selectedOptionId = quizAnswers[currentQuestion.id];

  const totalAnswered = Object.keys(quizAnswers).length;
  const correctCount = breakdown.quizCorrectCount;

  const handleSelectAnswer = (optionId: string, isCorrect: boolean) => {
    onAnswerQuiz(currentQuestion.id, optionId, isCorrect);
    if (isCorrect) {
      soundService.playSuccess();
    } else {
      soundService.playClick();
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < QUIZ_QUESTIONS_DATA.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
      soundService.playClick();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Cabeçalho da Etapa 4 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Etapa 4 de 4 · Avaliação Formativa & Relatório</span>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
            {breakdown.totalPct}% de Conclusão Geral
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
          Fixação do Conhecimento & Comprovante Oficial
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed text-sm sm:text-base">
          Parabéns por chegar à reta final da aula! Responda às perguntas formativas para testar seu raciocínio com explicações imediatas e, em seguida, gere seu <strong>Relatório Acadêmico em PDF</strong> e o texto formatado para o <strong>SIGAA</strong>.
        </p>
      </div>

      {/* 2. Painel dos Três Pilares de Aproveitamento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>1. Teoria & 8 Estágios</span>
          </div>
          <div className="text-xl font-bold font-mono text-indigo-950">
            {breakdown.theoryPct}% <span className="text-xs font-normal text-slate-500 font-sans">de 35%</span>
          </div>
          <div className="text-xs text-indigo-900/80">
            {breakdown.stagesCompletedCount} de 8 estágios explorados
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" />
            <span>2. Casos Clínicos</span>
          </div>
          <div className="text-xl font-bold font-mono text-amber-950">
            {breakdown.casesPct}% <span className="text-xs font-normal text-slate-500 font-sans">de 35%</span>
          </div>
          <div className="text-xs text-amber-900/80">
            {breakdown.casesCompletedCount} de 4 casos resolvidos
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>3. Fixação / Quiz</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-950">
            {breakdown.quizPct}% <span className="text-xs font-normal text-slate-500 font-sans">de 30%</span>
          </div>
          <div className="text-xs text-emerald-900/80">
            {correctCount} acertos em {totalAnswered} respondidas
          </div>
        </div>
      </div>

      {/* 3. Quiz Formativo Guiado com Explicação Instantânea */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-700 mb-0.5">
              QUESTÃO {activeQuestionIndex + 1} DE {QUIZ_QUESTIONS_DATA.length}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {currentQuestion.topicTitle}
            </h2>
          </div>

          {/* Navegador de Perguntas */}
          <div className="flex items-center gap-1 flex-wrap">
            {QUIZ_QUESTIONS_DATA.slice(0, 6).map((q, idx) => {
              const isAnswered = Boolean(quizAnswers[q.id]);
              const isCurrent = idx === activeQuestionIndex;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setActiveQuestionIndex(idx);
                    soundService.playClick();
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all border ${
                    isCurrent
                      ? 'bg-indigo-700 text-white border-indigo-700'
                      : isAnswered
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Texto da Questão */}
        <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
          {currentQuestion.question}
        </p>

        {/* Alternativas com Justificativa */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, oIdx) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <div key={option.id} className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleSelectAnswer(option.id, option.isCorrect)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? option.isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                    isSelected
                      ? option.isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-600 text-white border-rose-600'
                      : 'border-slate-400 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">{option.text}</span>
                </button>

                {/* Feedback Explicativo */}
                {isSelected && (
                  <div className={`p-3.5 rounded-xl text-xs space-y-1 ${
                    option.isCorrect
                      ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-950'
                      : 'bg-rose-100/70 border border-rose-300 text-rose-950'
                  }`}>
                    <div className="font-bold">
                      {option.isCorrect ? '✓ Alternativa Correta!' : '✕ Alternativa Incorreta:'}
                    </div>
                    <p className="leading-relaxed">{option.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Próxima Questão */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            {selectedOptionId ? '✓ Resposta salva!' : 'Clique em uma das alternativas acima.'}
          </span>

          {activeQuestionIndex < QUIZ_QUESTIONS_DATA.length - 1 && (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs active:scale-95"
            >
              Próxima Questão →
            </button>
          )}
        </div>
      </div>

      {/* 4. Emissão de Relatório Oficial e PDF */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Comprovante Acadêmico Oficial</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
          Seu Relatório de Conclusão da Aula Está Pronto!
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
          O relatório reúne sua identificação, a auditoria detalhada de cada estágio e caso clínico concluído, sua pontuação final e o código de autenticidade para comprovação perante os docentes.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenReportModal}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Abrir Relatório Oficial & Baixar PDF</span>
          </button>
        </div>
      </div>

      {/* 5. Rodapé: Voltar para a Etapa 3 */}
      <div className="pt-2 flex items-center justify-start bg-slate-100/80 p-5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Etapa 3 (Adolescência & Casos Clínicos)</span>
        </button>
      </div>
    </div>
  );
};
