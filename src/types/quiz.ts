/**
 * @file quiz.ts
 * Interfaces para os exercícios de fixação com gabarito comentado
 */

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export type TopicTag = 
  | 'estagios_geral'
  | 'adolescencia_identidade'
  | 'marcia_status'
  | 'umics_ciclo'
  | 'metanalise_potterton'
  | 'avaliacao_satepsi'
  | 'clinica_e_contexto';

export interface QuizQuestion {
  id: string;
  topic: TopicTag;
  topicTitle: string;
  question: string;
  scenario?: string;
  options: QuestionOption[];
  literatureReference: string;
  difficulty: 'facil' | 'medio' | 'avancado';
}

export interface QuizAttempt {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: number;
}
