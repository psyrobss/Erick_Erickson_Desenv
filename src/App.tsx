/**
 * @file App.tsx
 * Aplicativo Educacional Estático de Estudo Guiado: Erik Erikson
 * Disciplina: Psicologia do Desenvolvimento II — FACISA UFRN
 * Trilha de Aprendizagem Linear e Direcionada em 4 Fases
 */

import React, { useState, useEffect } from 'react';
import { getStorageService } from './services/storage/StorageFactory';
import { StudentProgress } from './types/progress';
import { QUIZ_QUESTIONS_DATA } from './data/quizQuestionsData';
import { calculateDetailedBreakdown } from './utils/progressLogic';

// Layout
import { AccessibilityToolbar } from './components/layout/AccessibilityToolbar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Trilha Guiada Linear
import { GuidedLinearTrack } from './components/guided/GuidedLinearTrack';
import { StudentReportModal } from './components/progress/StudentReportModal';
import { GamificationHubModal } from './components/gamification/GamificationHubModal';
import { calculateGamificationState, triggerCelebration } from './services/gamificationService';

export default function App() {
  const storageService = getStorageService();

  // Estados de persistência local (cookies/localStorage)
  const [progress, setProgress] = useState<StudentProgress>(() => storageService.getProgress());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados de acessibilidade e modais
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'larger'>('normal');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isGamificationModalOpen, setIsGamificationModalOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sincroniza persistência nos cookies
  const saveAndSyncProgress = (newProgress: StudentProgress) => {
    setProgress(newProgress);
    storageService.saveProgress(newProgress);
  };

  // Marcar tópico ou estágio como concluído
  const handleToggleCompleteTopic = (topicId: string) => {
    const isCompleted = progress.completedTopics.includes(topicId);
    const newTopics = isCompleted
      ? progress.completedTopics.filter((id) => id !== topicId)
      : [...progress.completedTopics, topicId];

    const updated = {
      ...progress,
      completedTopics: newTopics,
    };
    saveAndSyncProgress(updated);

    if (!isCompleted) {
      triggerCelebration(false, false);
      showToast('⭐ Etapa registrada nos cookies!');
    } else {
      showToast('Etapa desmarcada.');
    }
  };

  // Salvar resposta do quiz
  const handleSaveQuizAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...progress.quizAnswers, [questionId]: optionId };

    // Recalcular pontuação
    const score = Object.entries(newAnswers).filter(([qId, optId]) => {
      const q = QUIZ_QUESTIONS_DATA.find((item) => item.id === qId);
      return q?.options.find((o) => o.id === optId)?.isCorrect;
    }).length;

    const updated = {
      ...progress,
      quizAnswers: newAnswers,
      quizScore: score,
      totalQuizAnswered: Object.keys(newAnswers).length,
    };
    saveAndSyncProgress(updated);
  };

  // Salvar decisão de caso clínico
  const handleSaveCaseDecision = (caseId: string, optionId: string) => {
    const newDecisions = { ...progress.caseDecisions, [caseId]: optionId };
    const updated = {
      ...progress,
      caseDecisions: newDecisions,
    };
    saveAndSyncProgress(updated);
    triggerCelebration(false, false);
    showToast('⭐ Análise clínica registrada nos cookies!');
  };

  // Atualizar identidade do aluno (nome e matrícula)
  const handleUpdateStudentIdentity = (name: string, studentId?: string) => {
    const updated = {
      ...progress,
      studentName: name,
      ...(studentId !== undefined ? { studentId } : {}),
    };
    saveAndSyncProgress(updated);
    showToast('Identificação salva nos cookies locais!');
  };

  const breakdown = calculateDetailedBreakdown(progress, QUIZ_QUESTIONS_DATA.length);
  const gameState = calculateGamificationState(progress, breakdown.totalPct);

  // Efeito para classe de alto contraste no body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const fontClass = fontScale === 'large' ? 'text-[17px]' : fontScale === 'larger' ? 'text-[18px]' : 'text-[15px]';

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 ${fontClass}`}>
      {/* 1. Barra de Acessibilidade */}
      <AccessibilityToolbar
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
        fontScale={fontScale}
        onChangeFontScale={setFontScale}
      />

      {/* 2. Top Bar Navigation Limpa */}
      <Navbar
        completionPercentage={breakdown.totalPct}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onResetToStart={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* 3. Conteúdo Principal: Trilha Linear Didática em 4 Etapas */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <GuidedLinearTrack
          progress={progress}
          breakdown={breakdown}
          onUpdateStudentInfo={handleUpdateStudentIdentity}
          onToggleCompleteTopic={handleToggleCompleteTopic}
          onSaveCaseDecision={handleSaveCaseDecision}
          onAnswerQuiz={handleSaveQuizAnswer}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />
      </main>

      {/* 4. Rodapé Institucional */}
      <Footer />

      {/* Modais */}
      {isReportModalOpen && (
        <StudentReportModal
          isOpen={isReportModalOpen}
          progress={progress}
          breakdown={breakdown}
          gameState={gameState}
          onClose={() => setIsReportModalOpen(false)}
          onUpdateStudentInfo={handleUpdateStudentIdentity}
        />
      )}

      {isGamificationModalOpen && (
        <GamificationHubModal
          isOpen={isGamificationModalOpen}
          gameState={gameState}
          onClose={() => setIsGamificationModalOpen(false)}
        />
      )}

      {/* Toast Notification Acessível */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 animate-fade-in flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
