/**
 * @file GuidedLinearTrack.tsx
 * Componente principal da Trilha Linear de Aprendizagem em 4 Etapas Sequenciais
 */

import React, { useState } from 'react';
import { Step1Fundamentals } from './steps/Step1Fundamentals';
import { Step2LifeStages } from './steps/Step2LifeStages';
import { Step3AdolescenceCases } from './steps/Step3AdolescenceCases';
import { Step4EvaluationReport } from './steps/Step4EvaluationReport';
import { StudentProgress, ProgressBreakdown } from '../../types/progress';
import { BookOpen, Layers, Compass, Award, CheckCircle2 } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface GuidedLinearTrackProps {
  progress: StudentProgress;
  breakdown: ProgressBreakdown;
  onUpdateStudentInfo: (name: string, studentId: string) => void;
  onToggleCompleteTopic: (topicId: string) => void;
  onSaveCaseDecision: (caseId: string, optionId: string) => void;
  onAnswerQuiz: (questionId: string, optionId: string, isCorrect: boolean) => void;
  onOpenReportModal: () => void;
}

export const GuidedLinearTrack: React.FC<GuidedLinearTrackProps> = ({
  progress,
  breakdown,
  onUpdateStudentInfo,
  onToggleCompleteTopic,
  onSaveCaseDecision,
  onAnswerQuiz,
  onOpenReportModal,
}) => {
  // Etapa ativa na trilha (1, 2, 3 ou 4)
  const [activeStep, setActiveStep] = useState<number>(() => {
    // Se o aluno já concluiu estágios ou casos, podemos sugerir o avanço
    if (breakdown.casesCompletedCount >= 3) return 4;
    if (breakdown.stagesCompletedCount >= 4) return 3;
    if (progress.completedTopics.includes('fundamentos-etapa-1')) return 2;
    return 1;
  });

  const goToStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
    soundService.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsConfig = [
    {
      number: 1,
      title: 'Fundamentos',
      subtitle: 'O que é a Teoria & Crise',
      icon: BookOpen,
      isCompleted: progress.completedTopics.includes('fundamentos-etapa-1'),
    },
    {
      number: 2,
      title: 'Os 8 Estágios',
      subtitle: 'Do Berço à Velhice',
      icon: Layers,
      isCompleted: breakdown.stagesCompletedCount >= 8,
    },
    {
      number: 3,
      title: 'Adolescência & Casos',
      subtitle: 'James Marcia & 4 Casos',
      icon: Compass,
      isCompleted: breakdown.casesCompletedCount >= 4,
    },
    {
      number: 4,
      title: 'Avaliação & Relatório',
      subtitle: 'Fixação & Baixar PDF',
      icon: Award,
      isCompleted: breakdown.totalPct >= 70,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Barra de Navegação Sequencial Superior da Trilha (Passo 1 a 4) */}
      <nav 
        aria-label="Etapas da Trilha Linear de Aprendizagem" 
        className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {stepsConfig.map((s) => {
            const isActive = activeStep === s.number;
            const Icon = s.icon;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => goToStep(s.number)}
                className={`p-3 sm:p-3.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 border ${
                  isActive
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                    : s.isCompleted
                    ? 'bg-emerald-50/70 text-emerald-950 border-emerald-200 hover:bg-emerald-50'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : s.isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {s.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.number}
                </div>

                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate leading-tight">
                    {s.title}
                  </div>
                  <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {s.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Renderização do Passo Ativo */}
      <main id="trilha-conteudo">
        {activeStep === 1 && (
          <Step1Fundamentals
            studentName={progress.studentName}
            studentId={progress.studentId}
            onUpdateStudentInfo={onUpdateStudentInfo}
            onNextStep={() => goToStep(2)}
            completed={progress.completedTopics.includes('fundamentos-etapa-1')}
            onMarkCompleted={() => onToggleCompleteTopic('fundamentos-etapa-1')}
          />
        )}

        {activeStep === 2 && (
          <Step2LifeStages
            completedTopics={progress.completedTopics}
            onToggleCompleteTopic={onToggleCompleteTopic}
            onNextStep={() => goToStep(3)}
            onPrevStep={() => goToStep(1)}
          />
        )}

        {activeStep === 3 && (
          <Step3AdolescenceCases
            caseDecisions={progress.caseDecisions}
            onSaveCaseDecision={onSaveCaseDecision}
            onNextStep={() => goToStep(4)}
            onPrevStep={() => goToStep(2)}
          />
        )}

        {activeStep === 4 && (
          <Step4EvaluationReport
            quizAnswers={progress.quizAnswers}
            onAnswerQuiz={onAnswerQuiz}
            breakdown={breakdown}
            studentName={progress.studentName}
            studentId={progress.studentId}
            onOpenReportModal={onOpenReportModal}
            onPrevStep={() => goToStep(3)}
          />
        )}
      </main>
    </div>
  );
};
