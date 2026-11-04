/**
 * @file dictionary.ts
 * Interfaces para o dicionário psicossocial de Erik Erikson
 */

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Conceito Fundamental' | 'Estados de Marcia' | 'Processos Modernos' | 'Metodologia & Clínica' | 'Contexto Sociocultural';
  shortDefinition: string;
  detailedExplanation: string;
  whatItMeans: string;
  whatItDoesNotMean: string;
  academicCitation: string;
  crossReferences?: string[];
}
