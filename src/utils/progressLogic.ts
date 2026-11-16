/**
 * @file progressLogic.ts
 * Lógica pura de cálculo de progresso pedagógico e geração de comprovante / certificado
 * Disciplina: Psicologia do Desenvolvimento II — FACISA UFRN
 */

import { StudentProgress, ProgressBreakdown } from '../types/progress';

export const TOTAL_CURRICULUM_TOPICS = 1; // Etapa 1: Fundamentos da Trilha Linear
export const TOTAL_STAGES = 8;             // Etapa 2: 8 estágios do ciclo vital
export const TOTAL_CLINICAL_CASES = 4;     // Etapa 3: 4 casos clínicos
export const MINIMUM_SCORE_FOR_CERTIFICATE = 70; // 70% de aproveitamento no Quiz da Etapa 4

/**
 * Cria o estado inicial padrão de progresso do estudante
 */
export function createDefaultProgress(studentName: string = '', studentId: string = ''): StudentProgress {
  return {
    studentName,
    studentId,
    course: 'Psicologia do Desenvolvimento II',
    institution: 'FACISA - Universidade Federal do Rio Grande do Norte (UFRN)',
    completedTopics: [],
    quizAnswers: {},
    quizScore: 0,
    totalQuizAnswered: 0,
    caseDecisions: {},
    reviewedDictionaryTerms: [],
    lastActiveTimestamp: Date.now(),
    certificateEarned: false,
    personalNotes: {},
  };
}

/**
 * Verifica se a Etapa 1 (Fundamentos) foi concluída (compatível com cookies atuais e legados)
 */
export function hasCompletedFundamentals(completedTopics: string[] = []): boolean {
  return (
    completedTopics.includes('fundamentos-etapa-1') ||
    completedTopics.some((t) => t.startsWith('topico-'))
  );
}

/**
 * Calcula o detalhamento pedagógico balanceado para a Trilha Linear em 4 Etapas:
 * - Teoria & 8 Estágios (35%): Etapa 1 Fundamentos (7%) + 8 Estágios do Ciclo Vital (28%)
 * - Casos Clínicos (35%): Resolução dos 4 Casos Clínicos na Etapa 3 (35%)
 * - Exercícios de Fixação (30%): Participação no Quiz (15%) + Acurácia de Acertos (15%)
 */
export function calculateDetailedBreakdown(
  progress: StudentProgress,
  totalQuestions: number = 12
): ProgressBreakdown {
  if (!progress) {
    return {
      theoryPct: 0,
      casesPct: 0,
      quizPct: 0,
      totalPct: 0,
      theoryCompletedCount: 0,
      stagesCompletedCount: 0,
      casesCompletedCount: 0,
      dictionaryTermsCount: 0,
      quizAnsweredCount: 0,
      quizCorrectCount: 0,
      pendingTasks: ['Concluir a Etapa 1: Fundamentos da Teoria'],
    };
  }

  // 1. Teoria & 8 Estágios (Peso 35%)
  const fundamentalsDone = hasCompletedFundamentals(progress.completedTopics) ? 1 : 0;
  const completedStages = (progress.completedTopics || []).filter((t) => t.startsWith('estagio-')).length;

  const stagesRatio = Math.min(completedStages / TOTAL_STAGES, 1);
  const theoryPct = Number(((fundamentalsDone * 7) + (stagesRatio * 28)).toFixed(1));

  // 2. Casos Clínicos (Peso 35%) — 100% atribuído aos 4 casos clínicos da Etapa 3
  const casesCompleted = Object.keys(progress.caseDecisions || {}).length;
  const termsReviewed = (progress.reviewedDictionaryTerms || []).length;
  const casesRatio = Math.min(casesCompleted / TOTAL_CLINICAL_CASES, 1);
  const casesPct = Number((casesRatio * 35).toFixed(1));

  // 3. Exercícios de Fixação (Peso 30%)
  const qTotal = Math.max(totalQuestions, 1);
  const answeredCount = Object.keys(progress.quizAnswers || {}).length;
  const correctCount = progress.quizScore || 0;

  const participationRatio = Math.min(answeredCount / qTotal, 1);
  const accuracyRatio = answeredCount > 0 ? Math.min(correctCount / qTotal, 1) : 0;
  const quizPct = Number(((participationRatio * 15) + (accuracyRatio * 15)).toFixed(1));

  // Soma Total (0 a 100%)
  const totalPct = Math.min(100, Math.round(theoryPct + casesPct + quizPct));

  // Lista de pendências claras e diretamente resolvíveis na trilha
  const pendingTasks: string[] = [];
  if (!fundamentalsDone) {
    pendingTasks.push('Concluir a Etapa 1: Fundamentos (responder à mini-checagem ou avançar na trilha)');
  }
  if (completedStages < TOTAL_STAGES) {
    pendingTasks.push(`Concluir todos os 8 estágios psicossociais na Etapa 2 (${completedStages}/8 concluídos)`);
  }
  if (casesCompleted < TOTAL_CLINICAL_CASES) {
    pendingTasks.push(`Resolver os ${TOTAL_CLINICAL_CASES - casesCompleted} caso(s) clínico(s) restantes na Etapa 3`);
  }
  if (answeredCount < totalQuestions) {
    pendingTasks.push(`Responder todas as ${totalQuestions} questões de fixação na Etapa 4 (${answeredCount}/${totalQuestions})`);
  }
  if (answeredCount > 0 && (correctCount / answeredCount) < (MINIMUM_SCORE_FOR_CERTIFICATE / 100)) {
    pendingTasks.push(`Melhorar índice de acertos no Quiz da Etapa 4 para atingir 70%+`);
  }

  return {
    theoryPct,
    casesPct,
    quizPct,
    totalPct,
    theoryCompletedCount: fundamentalsDone,
    stagesCompletedCount: completedStages,
    casesCompletedCount: casesCompleted,
    dictionaryTermsCount: termsReviewed,
    quizAnsweredCount: answeredCount,
    quizCorrectCount: correctCount,
    pendingTasks,
  };
}

/**
 * Calcula a porcentagem geral de conclusão do curso usando o modelo balanceado
 */
export function calculateCompletionPercentage(progress: StudentProgress, totalQuestions: number = 12): number {
  const breakdown = calculateDetailedBreakdown(progress, totalQuestions);
  return breakdown.totalPct;
}

/**
 * Verifica se os critérios para emissão de comprovante / certificado foram cumpridos
 */
export function checkCertificateEligibility(
  progress: StudentProgress,
  totalQuizQuestions: number = 12
): { eligible: boolean; reason?: string } {
  if (!hasCompletedFundamentals(progress.completedTopics)) {
    return {
      eligible: false,
      reason: 'Conclua a Etapa 1 (Fundamentos) respondendo à mini-checagem ou avançando para a Etapa 2.',
    };
  }

  const stagesCount = (progress.completedTopics || []).filter((t) => t.startsWith('estagio-')).length;
  if (stagesCount < TOTAL_STAGES) {
    return {
      eligible: false,
      reason: `Marque os ${TOTAL_STAGES} estágios do ciclo vital como concluídos na Etapa 2 (atual: ${stagesCount}/${TOTAL_STAGES}).`,
    };
  }

  const casesCount = Object.keys(progress.caseDecisions || {}).length;
  if (casesCount < 3) {
    return {
      eligible: false,
      reason: `Resolva pelo menos 3 dos 4 estudos de caso clínico na Etapa 3 (atual: ${casesCount}/4).`,
    };
  }

  const answered = Object.keys(progress.quizAnswers || {}).length;
  const minQuizRequired = Math.min(6, totalQuizQuestions);
  if (answered < minQuizRequired) {
    return {
      eligible: false,
      reason: `Responda a pelo menos ${minQuizRequired} questões do quiz de fixação na Etapa 4 (atual: ${answered}/${totalQuizQuestions}).`,
    };
  }

  const scorePct = answered > 0 ? (progress.quizScore / answered) * 100 : 0;
  if (scorePct < MINIMUM_SCORE_FOR_CERTIFICATE) {
    return {
      eligible: false,
      reason: `Atingir aproveitamento mínimo de ${MINIMUM_SCORE_FOR_CERTIFICATE}% nos exercícios respondidos (aproveitamento atual: ${Math.round(scorePct)}%).`,
    };
  }

  return { eligible: true };
}

/**
 * Gera um código de validação determinístico e único para o certificado / relatório
 */
export function generateCertificateCode(
  studentName: string,
  dateIsoString: string,
  studentId?: string
): string {
  const cleanName = (studentName || 'ALUNO').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4) || 'UFRN';
  const cleanMatricula = (studentId || '').replace(/[^0-9A-Z]/g, '').slice(-4) || 'MATR';
  const timeHash = Math.abs(
    dateIsoString.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0)
  ).toString(36).toUpperCase().padStart(4, '0');

  return `FACISA-${cleanMatricula}-${cleanName}-${timeHash}`;
}
