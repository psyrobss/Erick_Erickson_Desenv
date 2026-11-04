/**
 * @file stage.ts
 * Tipos para os 8 estágios psicossociais de Erik Erikson
 */

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface CrisisPole {
  positive: string;
  negative: string;
  positiveDescription: string;
  negativeDescription: string;
}

export interface ExampleCase {
  type: 'cotidiano' | 'clinico_hipotetico';
  title: string;
  description: string;
  analysis: string;
}

export interface PsychosocialStage {
  id: StageId;
  name: string;
  agePeriod: string;
  crisis: CrisisPole;
  virtue: string;
  virtueDescription: string;
  developmentalQuestion: string;
  healthyResolution: string;
  fragileResolution: string;
  overview: string;
  keyChallenge: string;
  epigeneticPredecessor?: string;
  epigeneticSuccessor?: string;
  examples: ExampleCase[];
  color: string;
  accentColor: string;
}
