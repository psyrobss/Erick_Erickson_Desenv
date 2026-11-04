/**
 * @file marciaClassifier.ts
 * Algoritmo de classificação dos 4 Estados de Identidade de James Marcia (1966)
 * baseado nas dimensões de Exploração (Crise) e Compromisso.
 */

import { MarciaStatusId } from '../types/adolescence';

export interface DimensionAssessment {
  exploration: number; // 0 a 100
  commitment: number;  // 0 a 100
}

export interface StatusClassificationResult {
  statusId: MarciaStatusId;
  name: string;
  explorationCategory: 'Baixa' | 'Alta' | 'Alta prévia';
  commitmentCategory: 'Baixo' | 'Alto' | 'Baixo ou instável';
  shortExplanation: string;
  didacticMotto: string;
  clinicalPrecaution: string;
}

/**
 * Classifica o estado de identidade de Marcia com base em pontuações de exploração e compromisso.
 * Ponto de corte: 50.
 */
export function classifyMarciaStatus(
  exploration: number,
  commitment: number
): StatusClassificationResult {
  const isHighExploration = exploration >= 50;
  const isHighCommitment = commitment >= 50;

  if (isHighExploration && isHighCommitment) {
    return {
      statusId: 'identidade_alcancada',
      name: 'Identidade Alcançada / Estabelecida (Identity Achievement)',
      explorationCategory: 'Alta prévia',
      commitmentCategory: 'Alto',
      shortExplanation: 'O indivíduo explorou ativamente alternativas significativas e consolidou compromissos próprios e autodeterminados.',
      didacticMotto: '“Experimentei opções, refleti sobre quem sou e agora sei o que é importante para mim.”',
      clinicalPrecaution: 'Não é um estado definitivo e petrificado para o resto da vida; pode passar por ciclos de revisão posteriores (ciclos MAMA).'
    };
  }

  if (isHighExploration && !isHighCommitment) {
    return {
      statusId: 'moratoria',
      name: 'Moratória Psicossocial (Moratorium)',
      explorationCategory: 'Alta',
      commitmentCategory: 'Baixo ou instável',
      shortExplanation: 'Busca ativa, questionamento e experimentação de papéis em andamento, sem compromissos definitivos estabelecidos.',
      didacticMotto: '“Estou em busca, experimentando diferentes cursos e visões de mundo antes de me comprometer.”',
      clinicalPrecaution: 'A moratória é normativamente adaptativa na adolescência; não deve ser confundida com indecisão patológica nem tratada como transtorno.'
    };
  }

  if (!isHighExploration && isHighCommitment) {
    return {
      statusId: 'pre_fechamento',
      name: 'Pré-fechamento (Foreclosure)',
      explorationCategory: 'Baixa',
      commitmentCategory: 'Alto',
      shortExplanation: 'Compromissos firmes assumidos precocemente sem exploração prévia suficiente de alternativas, geralmente reproduzindo modelos familiares.',
      didacticMotto: '“Sempre soube que faria isso porque minha família sempre fez e espera isso de mim.”',
      clinicalPrecaution: 'Aparenta certeza e ausência de ansiedade externa, mas carece de apropriação pessoal reflexiva.'
    };
  }

  // !isHighExploration && !isHighCommitment
  return {
    statusId: 'difusao',
    name: 'Difusão da Identidade (Identity Diffusion)',
    explorationCategory: 'Baixa',
    commitmentCategory: 'Baixo',
    shortExplanation: 'Ausência ou escassez de busca ativa e carência de compromissos definidos em áreas essenciais da vida.',
    didacticMotto: '“Não sei bem o que quero fazer e nem tenho pensado muito sobre isso ultimamente.”',
    clinicalPrecaution: 'Deve-se diferenciar entre falta de urgência típica do desenvolvimento e paralisia com sofrimento clínico significativo.'
  };
}
