/**
 * @file caseStudy.ts
 * Interfaces para os estudos de caso com tomada de decisão e análise reflexiva
 */

export interface DecisionOption {
  id: string;
  label: string;
  actionText: string;
  marciaClassification?: string;
  theoreticalRationale: string;
  clinicalFeedback: string;
  isPedagogicallyOptimal: boolean;
}

export interface CaseStudy {
  id: string;
  studentName: string;
  age: number;
  context: string;
  scenario: string;
  narrativeQuote: string;
  developmentalTension: string;
  options: DecisionOption[];
  debriefing: {
    eriksonianAnalysis: string;
    contextualAnalysis: string;
    clinicalPrecaution: string;
  };
}
