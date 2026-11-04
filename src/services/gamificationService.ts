/**
 * @file gamificationService.ts
 * Motor de gamificação pedagógica: cálculo de XP, patentes acadêmicas,
 * verificação de conquistas e integração com o sistema de som.
 */

import { StudentProgress } from '../types/progress';
import { AcademicRank, Badge, GamificationState } from '../types/gamification';
import { soundService } from './soundService';

export const ACADEMIC_RANKS: AcademicRank[] = [
  {
    level: 1,
    id: 'calouro',
    title: 'Calouro de Psicologia',
    minXP: 0,
    maxXP: 199,
    iconName: 'Sparkles',
    badgeColor: 'bg-slate-700 text-slate-200 border-slate-600',
    description: 'Iniciando a exploração dos fundamentos do desenvolvimento psicossocial na disciplina.',
    motivationalQuote: '“Todo grande psicólogo começou desbravando o ciclo vital pela primeira vez.”',
  },
  {
    level: 2,
    id: 'monitor',
    title: 'Monitor em Formação',
    minXP: 200,
    maxXP: 499,
    iconName: 'BookOpen',
    badgeColor: 'bg-blue-800 text-blue-200 border-blue-600',
    description: 'Já compreende as primeiras crises do desenvolvimento e apoia os colegas nos debates.',
    motivationalQuote: '“A confiança básica e a autonomia já não têm mais segredos para você!”',
  },
  {
    level: 3,
    id: 'pesquisador',
    title: 'Pesquisador do Ciclo Vital',
    minXP: 500,
    maxXP: 849,
    iconName: 'Compass',
    badgeColor: 'bg-emerald-800 text-emerald-200 border-emerald-600',
    description: 'Domina o princípio epigenético e investiga a fundo cada transição de idade.',
    motivationalQuote: '“Compreender a crise é compreender a oportunidade do crescimento humano.”',
  },
  {
    level: 4,
    id: 'estagiario',
    title: 'Estagiário Clínico de DII',
    minXP: 850,
    maxXP: 1249,
    iconName: 'Stethoscope',
    badgeColor: 'bg-amber-800 text-amber-200 border-amber-600',
    description: 'Aplica a teoria de Erikson em estudos de caso com destreza e sensibilidade ética.',
    motivationalQuote: '“A escuta atenta diferencia um mero observador de um terapeuta em formação.”',
  },
  {
    level: 5,
    id: 'especialista',
    title: 'Especialista Epigenético',
    minXP: 1250,
    maxXP: 1699,
    iconName: 'Award',
    badgeColor: 'bg-indigo-800 text-indigo-200 border-indigo-600',
    description: 'Conecta infância, adolescência, adultez e velhice em uma visão integral da psique.',
    motivationalQuote: '“A moratória psicossocial e a fidelidade são agora ferramentas naturais do seu raciocínio.”',
  },
  {
    level: 6,
    id: 'mestre',
    title: 'Mestre do Desenvolvimento Humano',
    minXP: 1700,
    maxXP: 99999,
    iconName: 'Crown',
    badgeColor: 'bg-yellow-700 text-yellow-100 border-yellow-500',
    description: 'Alcançou o ápice do conhecimento pedagógico da disciplina!',
    motivationalQuote: '“Integridade versus Desespero: você compreendeu o ciclo vital em sua total sabedoria!”',
  },
];

export const ALL_BADGES: Badge[] = [
  {
    id: 'primeiro-passo',
    title: 'Primeiro Passo Epigenético',
    description: 'Concluiu seu primeiro módulo teórico ou estágio do ciclo vital.',
    icon: '🌱',
    category: 'teoria',
    xpReward: 30,
    requirement: 'Concluir ao menos 1 tópico teórico ou estágio.',
  },
  {
    id: 'mestre-identidade',
    title: 'Navegador da Identidade',
    description: 'Explorou a fundo a crise da adolescência e o conceito de moratória psicossocial.',
    icon: '🧭',
    category: 'teoria',
    xpReward: 50,
    requirement: 'Concluir o Estágio 5 ou o módulo de Adolescência.',
  },
  {
    id: 'perito-epigenetico',
    title: 'Ciclo Vital Completo',
    description: 'Explorou todos os 8 estágios psicossociais de Erikson, do bebê ao idoso.',
    icon: '🧬',
    category: 'teoria',
    xpReward: 100,
    requirement: 'Completar os 8 estágios psicossociais.',
  },
  {
    id: 'detetive-clinico',
    title: 'Detetive Clínico da Disciplina',
    description: 'Analisou e formulou hipóteses para os 4 estudos de caso do aplicativo.',
    icon: '🔍',
    category: 'clinica',
    xpReward: 80,
    requirement: 'Tomar decisões nos 4 casos clínicos propostos.',
  },
  {
    id: 'gabarito-quiz',
    title: 'Cérebro de Aço',
    description: 'Demonstrou alta acurácia nos exercícios de fixação com pelo menos 8 acertos.',
    icon: '🎯',
    category: 'exercicios',
    xpReward: 60,
    requirement: 'Acertar 8 ou mais questões no Quiz.',
  },
  {
    id: 'dicionario-vivo',
    title: 'Vocabulário Psicanalítico',
    description: 'Consultou pelo menos 5 conceitos teóricos fundamentais no dicionário integrado.',
    icon: '📖',
    category: 'dedicacao',
    xpReward: 40,
    requirement: 'Examinar 5 termos no glossário.',
  },
  {
    id: 'honra-ufrn',
    title: 'Conclusão Integral da Trilha',
    description: 'Atingiu a maestria total concluindo 100% de todo o conteúdo da aula guiada.',
    icon: '🎓',
    category: 'dedicacao',
    xpReward: 150,
    requirement: 'Alcançar 100% do progresso global da disciplina.',
  },
];

/**
 * Avalia quais badges o estudante desbloqueou com base no progresso atual
 */
export function checkUnlockedBadges(progress: StudentProgress, totalProgressPct: number): string[] {
  const unlocked: string[] = [];

  const completedStages = progress.completedTopics.filter((t) => t.startsWith('estagio-')).length;
  const completedTopics = progress.completedTopics.filter((t) => t.startsWith('topico-')).length;
  const casesCount = Object.keys(progress.caseDecisions || {}).length;
  const dictCount = (progress.reviewedDictionaryTerms || []).length;
  const hasStage5 = progress.completedTopics.includes('estagio-5') || progress.completedTopics.includes('topico-adolescencia');

  // 1. Primeiro Passo
  if (completedStages > 0 || completedTopics > 0) {
    unlocked.push('primeiro-passo');
  }

  // 2. Mestre da Identidade
  if (hasStage5) {
    unlocked.push('mestre-identidade');
  }

  // 3. Perito Epigenético (todos os 8 estágios)
  if (completedStages >= 8) {
    unlocked.push('perito-epigenetico');
  }

  // 4. Detetive Clínico (4 casos clínicos)
  if (casesCount >= 4) {
    unlocked.push('detetive-clinico');
  }

  // 5. Cérebro de Aço (pelo menos 8 acertos no quiz)
  if (progress.quizScore >= 8) {
    unlocked.push('gabarito-quiz');
  }

  // 6. Dicionário Vivo (pelo menos 5 termos)
  if (dictCount >= 5) {
    unlocked.push('dicionario-vivo');
  }

  // 7. Honra ao Mérito UFRN
  if (totalProgressPct >= 99.5) {
    unlocked.push('honra-ufrn');
  }

  return unlocked;
}

/**
 * Calcula o XP acumulado considerando ações de aprendizado e bônus de medalhas
 */
export function calculateGamificationState(
  progress: StudentProgress,
  totalProgressPct: number = 0
): GamificationState {
  if (!progress) {
    return {
      totalXP: 0,
      currentRank: ACADEMIC_RANKS[0],
      nextRank: ACADEMIC_RANKS[1],
      xpProgressInCurrentRank: 0,
      xpNeededForNextRank: 200,
      rankProgressPct: 0,
      unlockedBadgeIds: [],
    };
  }

  const completedStages = progress.completedTopics.filter((t) => t.startsWith('estagio-')).length;
  const completedTopics = progress.completedTopics.filter((t) => t.startsWith('topico-')).length;
  const casesCount = Object.keys(progress.caseDecisions || {}).length;
  const dictCount = (progress.reviewedDictionaryTerms || []).length;
  const correctQuiz = progress.quizScore || 0;

  // Pontuações base
  const stagesXP = completedStages * 25;       // até 200 XP
  const topicsXP = completedTopics * 25;       // até 150 XP
  const casesXP = casesCount * 65;             // até 260 XP
  const dictXP = Math.min(dictCount, 10) * 10; // até 100 XP
  const quizXP = correctQuiz * 35;             // até 420 XP

  // Badges desbloqueados
  const unlockedBadgeIds = checkUnlockedBadges(progress, totalProgressPct);
  const badgesXP = unlockedBadgeIds.reduce((sum, bId) => {
    const b = ALL_BADGES.find((item) => item.id === bId);
    return sum + (b ? b.xpReward : 0);
  }, 0);

  const totalXP = stagesXP + topicsXP + casesXP + dictXP + quizXP + badgesXP;

  // Determinar Patente Atual
  let currentRank = ACADEMIC_RANKS[0];
  let nextRank: AcademicRank | null = ACADEMIC_RANKS[1];

  for (let i = ACADEMIC_RANKS.length - 1; i >= 0; i--) {
    if (totalXP >= ACADEMIC_RANKS[i].minXP) {
      currentRank = ACADEMIC_RANKS[i];
      nextRank = i < ACADEMIC_RANKS.length - 1 ? ACADEMIC_RANKS[i + 1] : null;
      break;
    }
  }

  // Progresso dentro do rank atual
  let xpProgressInCurrentRank = totalXP - currentRank.minXP;
  let xpNeededForNextRank = nextRank ? nextRank.minXP - currentRank.minXP : 1;
  let rankProgressPct = nextRank
    ? Math.min(Math.round((xpProgressInCurrentRank / xpNeededForNextRank) * 100), 100)
    : 100;

  return {
    totalXP,
    currentRank,
    nextRank,
    xpProgressInCurrentRank,
    xpNeededForNextRank,
    rankProgressPct,
    unlockedBadgeIds,
  };
}

/**
 * Função utilitária para disparar feedback audiovisual ao desbloquear conquista
 */
export function triggerCelebration(isNewBadge: boolean = false, isLevelUp: boolean = false): void {
  if (isLevelUp) {
    soundService.playLevelUpFanfare();
  } else if (isNewBadge) {
    soundService.playBadgeUnlock();
  } else {
    soundService.playSuccessTone();
  }
}
