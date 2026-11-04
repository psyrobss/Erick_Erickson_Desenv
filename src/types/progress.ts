/**
 * @file progress.ts
 * Interfaces para controle de progresso do estudante, salvo inteiramente via cookies
 */

export interface TopicProgress {
  topicId: string;
  completed: boolean;
  timeSpentSeconds: number;
  lastVisitedTimestamp: number;
}

export interface StudentProgress {
  studentName?: string;
  studentId?: string; // Matrícula UFRN
  course: string;
  institution: string;
  completedTopics: string[]; // IDs dos tópicos concluídos
  quizAnswers: Record<string, string>; // questionId -> selectedOptionId
  quizScore: number;
  totalQuizAnswered: number;
  caseDecisions: Record<string, string>; // caseId -> optionId
  reviewedDictionaryTerms: string[];
  lastActiveTimestamp: number;
  certificateEarned: boolean;
  certificateCode?: string;
  personalNotes?: Record<string, string>; // topicId -> note text
}

export interface ProgressBreakdown {
  theoryPct: number;            // Peso 35%: Módulos curriculares (20%) + 8 Estágios explorados (15%)
  casesPct: number;             // Peso 35%: Casos Clínicos (25%) + Dicionário de Termos (10%)
  quizPct: number;              // Peso 30%: Exercícios e acertos no Quiz
  totalPct: number;             // Soma 0 - 100%
  theoryCompletedCount: number; // Módulos curriculares concluídos (de 6)
  stagesCompletedCount: number; // Estágios explorados (de 8)
  casesCompletedCount: number;  // Casos clínicos resolvidos (de 4)
  dictionaryTermsCount: number; // Termos do glossário examinados
  quizAnsweredCount: number;    // Questões respondidas (de 12)
  quizCorrectCount: number;     // Acertos no quiz
  pendingTasks: string[];       // Lista de tarefas pendentes para 100%
}

export interface CertificateData {
  studentName: string;
  studentId?: string;
  course: string;
  institution: string;
  completionDate: string;
  validationCode: string;
  scorePercentage: number;
  topicsCompletedCount: number;
}

