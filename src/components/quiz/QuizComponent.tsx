/**
 * @file QuizComponent.tsx
 * Módulo de Exercícios de Fixação com gabarito comentado e persistência em cookies
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS_DATA } from '../../data/quizQuestionsData';
import { QuizQuestion, QuestionOption, TopicTag } from '../../types/quiz';
import { StyledCard, StyledButton, CalloutBox } from '../common/StyledComponents';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, BookOpen, Award, Filter, Sparkles } from 'lucide-react';
import { InteractionGuide } from '../common/InteractionGuide';
import { ProfessorCallout } from '../gamification/ProfessorCallout';
import { soundService } from '../../services/soundService';
import styled from 'styled-components';

interface QuizComponentProps {
  savedAnswers: Record<string, string>; // questionId -> optionId
  onSaveAnswer: (questionId: string, optionId: string, isCorrect: boolean) => void;
  onResetQuiz: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  savedAnswers,
  onSaveAnswer,
  onResetQuiz,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);

  const filteredQuestions = selectedTopic === 'all'
    ? QUIZ_QUESTIONS_DATA
    : QUIZ_QUESTIONS_DATA.filter((q) => q.topic === selectedTopic);

  const totalAnswered = Object.keys(savedAnswers).length;
  const correctCount = Object.entries(savedAnswers).filter(([qId, optId]) => {
    const q = QUIZ_QUESTIONS_DATA.find((item) => item.id === qId);
    return q?.options.find((o) => o.id === optId)?.isCorrect;
  }).length;

  const currentQuestion: QuizQuestion | undefined = filteredQuestions[currentIdx];
  const selectedOptionId = currentQuestion ? savedAnswers[currentQuestion.id] : undefined;
  const isCurrentAnswered = !!selectedOptionId;

  const handleSelectOption = (option: QuestionOption) => {
    if (!currentQuestion) return;
    onSaveAnswer(currentQuestion.id, option.id, option.isCorrect);

    if (option.isCorrect) {
      soundService.playSuccessTone();
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {}
    } else {
      soundService.playSelect();
    }
  };

  const nextQuestion = () => {
    soundService.playCardFlip();
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const prevQuestion = () => {
    soundService.playCardFlip();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Score Summary */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Avaliação Formativa
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
            Exercícios de Fixação & Gabarito Comentado
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            Teste seu domínio sobre os 8 estágios, o paradigma de Marcia, o modelo U-MICS, as evidências da metanálise e as diretrizes do CFP. Cada questão possui explicação detalhada de cada alternativa.
          </p>
        </div>

        {/* Card Placar */}
        <div className="flex items-center gap-4 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl">
          <Award className="w-8 h-8 text-indigo-600" />
          <div>
            <div className="text-xs text-indigo-900 font-semibold">Seu Aproveitamento</div>
            <div className="text-lg font-bold font-mono text-indigo-950">
              {correctCount} / {QUIZ_QUESTIONS_DATA.length} acertos
              <span className="text-xs font-normal text-slate-500 ml-1">
                ({Math.round((correctCount / QUIZ_QUESTIONS_DATA.length) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guia de Interação Passo a Passo */}
      <InteractionGuide
        title="Como Praticar com os Exercícios de Fixação"
        steps={[
          {
            number: 1,
            title: 'Filtre o Tópico da Aula',
            instruction: 'Escolha se deseja revisar todos os 8 estágios, James Marcia, U-MICS, Metanálise ou Normas CFP.',
          },
          {
            number: 2,
            title: 'Clique na Alternativa',
            instruction: 'Selecione a resposta desejada. O gabarito é revelado imediatamente sem penalidade para estimular a aprendizagem ativa.',
          },
          {
            number: 3,
            title: 'Analise o Comentário Pedagógico',
            instruction: 'Leia por que a sua resposta está certa ou errada, compreendendo os distratores comuns de provas e concursos.',
          },
        ]}
        tip="Seu progresso fica salvo nos cookies do navegador. Você pode refazer o simulado a qualquer momento clicando em 'Reiniciar Quiz'."
      />

      {/* Filtro por Tópicos */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filtrar por:
        </span>
        {[
          { id: 'all', label: 'Todos os Tópicos' },
          { id: 'estagios_geral', label: '8 Estágios Gerais' },
          { id: 'adolescencia_identidade', label: 'Identidade & Fidelidade' },
          { id: 'marcia_status', label: 'James Marcia' },
          { id: 'umics_ciclo', label: 'Modelo U-MICS' },
          { id: 'metanalise_potterton', label: 'Metanálise Potterton' },
          { id: 'avaliacao_satepsi', label: 'Normas SATEPSI CFP' },
          { id: 'clinica_e_contexto', label: 'Clínica & Contexto' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedTopic(f.id);
              setCurrentIdx(0);
            }}
            className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
              selectedTopic === f.id
                ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Questão Ativa */}
      {currentQuestion ? (
        <StyledCard>
          <div className="space-y-4">
            {/* Cabeçalho da Questão */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                  Questão {currentIdx + 1} de {filteredQuestions.length}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {currentQuestion.topicTitle}
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Dificuldade: {currentQuestion.difficulty}
              </span>
            </div>

            {/* Enunciado */}
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Opções de Resposta */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optionStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300';

                if (isCurrentAnswered) {
                  if (opt.isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    optionStyle = 'bg-slate-50/50 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isCurrentAnswered
                          ? opt.isCorrect
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : isSelected
                            ? 'bg-rose-600 border-rose-600 text-white'
                            : 'border-slate-300'
                          : 'border-slate-400'
                      }`}>
                        {isCurrentAnswered && opt.isCorrect && '✓'}
                        {isCurrentAnswered && isSelected && !opt.isCorrect && '✕'}
                      </div>
                      <div className="flex-1 leading-snug">
                        {opt.text}
                      </div>
                    </div>

                    {/* Explicação da alternativa após resposta */}
                    {isCurrentAnswered && (isSelected || opt.isCorrect) && (
                      <div className={`mt-2 pt-2 border-t text-xs leading-relaxed ${
                        opt.isCorrect ? 'border-emerald-200 text-emerald-900' : 'border-rose-200 text-rose-900'
                      }`}>
                        <strong>{opt.isCorrect ? 'Por que está correta?' : 'Por que está incorreta?'}</strong> {opt.rationale}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Referência da Literatura */}
            {isCurrentAnswered && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>Fundamentação Acadêmica:</strong> {currentQuestion.literatureReference}
                </span>
              </div>
            )}

            {/* Feedback Pedagógico Formativo */}
            {isCurrentAnswered && (
              <ProfessorCallout
                title={
                  currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? 'Resposta Correta · Feedback Formativo da Disciplina'
                    : 'Revisão Conceitual · Feedback Formativo da Disciplina'
                }
                message={
                  currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? 'Excelente! Sua resposta demonstra domínio consistente do conceito. O raciocínio epigenético conecta perfeitamente a crise desenvolvimental com o papel mediador do ambiente.'
                    : 'Releia com atenção a explicação do gabarito acima: na fase de estudo guiado, analisar a alternativa incorreta ajuda a compreender a sutileza da distinção conceitual.'
                }
                clinicalTip="Ao resolver questões teóricas da disciplina, identifique sempre o verbo de comando e a força do ego em jogo (Esperança, Vontade, Propósito, Competência, Fidelidade, Amor, Cuidado ou Sabedoria)."
                xpRewardBadge={currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? '+35 XP' : undefined}
              />
            )}

            {/* Navegação Entre Questões */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevQuestion}
                disabled={currentIdx === 0}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onResetQuiz}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  title="Limpar respostas e reiniciar exercícios"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar Questões</span>
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={currentIdx === filteredQuestions.length - 1}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Próxima →
                </button>
              </div>
            </div>
          </div>
        </StyledCard>
      ) : (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">Nenhuma questão encontrada para este tópico.</p>
        </div>
      )}
    </div>
  );
};
