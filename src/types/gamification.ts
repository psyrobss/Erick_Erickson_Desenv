/**
 * @file gamification.ts
 * Definições de tipos para o sistema de gamificação, patentes acadêmicas e medalhas.
 */

export interface AcademicRank {
  id: string;
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  iconName: string;
  badgeColor: string;
  description: string;
  motivationalQuote: string;
}

export type BadgeCategory = 'teoria' | 'clinica' | 'exercicios' | 'dedicacao';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  xpReward: number;
  requirement: string;
  unlockedAt?: number;
}

export interface GamificationState {
  totalXP: number;
  currentRank: AcademicRank;
  nextRank: AcademicRank | null;
  xpProgressInCurrentRank: number;
  xpNeededForNextRank: number;
  rankProgressPct: number;
  unlockedBadgeIds: string[];
}

export type XPActionType =
  | 'stage_completed'
  | 'topic_completed'
  | 'case_solved'
  | 'flashcard_learned'
  | 'quiz_correct'
  | 'dictionary_reviewed'
  | 'badge_unlocked';
