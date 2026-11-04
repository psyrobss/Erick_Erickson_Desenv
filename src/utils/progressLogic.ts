/**
 * @file progressLogic.ts
 * Lógica pura de cálculo de progresso pedagógico e geração de comprovante / certificado
 * Disciplina: Psicologia do Desenvolvimento II — FACISA UFRN
 */

import { StudentProgress, ProgressBreakdown } from '../types/progress';

export const TOTAL_CURRICULUM_TOPICS = 6; // 6 módulos da aula completa
export const TOTAL_STAGES = 8;             // 8 estágios do ciclo vital
export const TOTAL_CLINICAL_CASES = 4;     // 4 casos clínicos
export const MINIMUM_SCORE_FOR_CERTIFICATE = 70; // 70% de aproveitamento nos testes

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
 * Calcula o detalhamento pedagógico balanceado:
 * - Teoria & Leituras (35%): 6 tópicos curriculares (20%) + 8 estágios explorados (15%)
 * - Casos Clínicos & Prática (35%): 4 casos clínicos (25%) + Dicionário de termos (10%)
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
      pendingTasks: ['Iniciar estudos dos módulos teóricos'],
    };
  }

  // 1. Teoria & Leituras (Peso 35%)
  // Módulos curriculares: IDs que começam com 'topico-'
  const completedCurriculum = progress.completedTopics.filter((t) => t.startsWith('topico-')).length;
  // Estágios completados: IDs que começam com 'estagio-'
  const completedStages = progress.completedTopics.filter((t) => t.startsWith('estagio-')).length;

  const curriculumRatio = Math.min(completedCurriculum / TOTAL_CURRICULUM_TOPICS, 1);
  const stagesRatio = Math.min(completedStages / TOTAL_STAGES, 1);
  const theoryPct = Number(((curriculumRatio * 20) + (stagesRatio * 15)).toFixed(1));

  // 2. Casos Clínicos & Prática (Peso 35%)
  const casesCompleted = Object.keys(progress.caseDecisions || {}).length;
  const termsReviewed = (progress.reviewedDictionaryTerms || []).length;
  const casesRatio = Math.min(casesCompleted / TOTAL_CLINICAL_CASES, 1);
  const termsRatio = Math.min(termsReviewed / 5, 1);
  const casesPct = Number(((casesRatio * 25) + (termsRatio * 10)).toFixed(1));

  // 3. Exercícios de Fixação (Peso 30%)
  const qTotal = Math.max(totalQuestions, 1);
  const answeredCount = Object.keys(progress.quizAnswers || {}).length;
  const correctCount = progress.quizScore || 0;
  
  const participationRatio = Math.min(answeredCount / qTotal, 1);
  const accuracyRatio = answeredCount > 0 ? (correctCount / qTotal) : 0;
  const quizPct = Number(((participationRatio * 15) + (accuracyRatio * 15)).toFixed(1));

  // Soma Total
  const totalPct = Math.min(100, Math.round(theoryPct + casesPct + quizPct));

  // Lista de pendências claras para o estudante
  const pendingTasks: string[] = [];
  if (completedCurriculum < TOTAL_CURRICULUM_TOPICS) {
    pendingTasks.push(`Concluir os ${TOTAL_CURRICULUM_TOPICS - completedCurriculum} módulo(s) teórico(s) restantes`);
  }
  if (completedStages < TOTAL_STAGES) {
    pendingTasks.push(`Explorar todos os 8 estágios psicossociais (${completedStages}/8 concluídos)`);
  }
  if (casesCompleted < TOTAL_CLINICAL_CASES) {
    pendingTasks.push(`Resolver os ${TOTAL_CLINICAL_CASES - casesCompleted} caso(s) clínico(s) restantes`);
  }
  if (answeredCount < totalQuestions) {
    pendingTasks.push(`Responder todas as 12 questões de fixação (${answeredCount}/${totalQuestions})`);
  }
  if (answeredCount > 0 && (correctCount / answeredCount) < (MINIMUM_SCORE_FOR_CERTIFICATE / 100)) {
    pendingTasks.push(`Melhorar índice de acertos no Quiz para atingir 70%+`);
  }
  if (termsReviewed < 3) {
    pendingTasks.push(`Consultar conceitos-chave no Dicionário Psicossocial (${termsReviewed}/3)`);
  }

  return {
    theoryPct,
    casesPct,
    quizPct,
    totalPct,
    theoryCompletedCount: completedCurriculum,
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
  const curriculumCount = progress.completedTopics.filter((t) => t.startsWith('topico-')).length;
  if (curriculumCount < TOTAL_CURRICULUM_TOPICS) {
    return {
      eligible: false,
      reason: `Complete todos os ${TOTAL_CURRICULUM_TOPICS} módulos teóricos curriculares (atual: ${curriculumCount}/${TOTAL_CURRICULUM_TOPICS}).`,
    };
  }

  const casesCount = Object.keys(progress.caseDecisions || {}).length;
  if (casesCount < 3) {
    return {
      eligible: false,
      reason: `Resolva pelo menos 3 dos 4 estudos de caso clínico (atual: ${casesCount}/4).`,
    };
  }

  const answered = Object.keys(progress.quizAnswers || {}).length;
  if (answered < Math.min(6, totalQuizQuestions)) {
    return {
      eligible: false,
      reason: `Responda a pelo menos 6 questões do quiz de fixação (atual: ${answered}/${totalQuizQuestions}).`,
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
