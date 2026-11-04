/**
 * @file adolescence.ts
 * Interfaces para o aprofundamento da Adolescência (5º Estágio), James Marcia e Modelo U-MICS
 */

export type MarciaStatusId = 'difusao' | 'pre_fechamento' | 'moratoria' | 'identidade_alcancada';

export interface MarciaStatus {
  id: MarciaStatusId;
  name: string;
  nameEn: string;
  exploration: 'Baixa' | 'Alta' | 'Alta prévia';
  commitment: 'Baixo' | 'Alto' | 'Baixo ou instável';
  description: string;
  characteristics: string[];
  clinicalSignificance: string;
  motto: string;
  example: string;
}

export interface UMICSDimension {
  name: string;
  namePt: string;
  itemCount: number;
  description: string;
  questionPrompt: string;
  clinicalRelevance: string;
}

export interface IdentityDomain {
  domain: string;
  characteristicQuestions: string[];
  explanation: string;
  contextImpact: string;
}

export interface ContextualFactor {
  factor: string;
  title: string;
  summary: string;
  keyPoints: string[];
  scientificEvidence: string;
}
