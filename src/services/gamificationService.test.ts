import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGamificationState, checkUnlockedBadges, ACADEMIC_RANKS } from './gamificationService';
import { createDefaultProgress } from '../utils/progressLogic';

test('calculateGamificationState returns Calouro at start', () => {
  const p = createDefaultProgress();
  const state = calculateGamificationState(p, 0);
  assert.equal(state.totalXP, 0);
  assert.equal(state.currentRank.id, 'calouro');
  assert.equal(state.nextRank?.id, 'monitor');
  assert.equal(state.unlockedBadgeIds.length, 0);
});

test('checkUnlockedBadges unlocks primeiro-passo when topic completed', () => {
  const p = createDefaultProgress();
  p.completedTopics = ['topico-1'];
  const badges = checkUnlockedBadges(p, 10);
  assert.ok(badges.includes('primeiro-passo'));
});

test('calculateGamificationState levels up as XP increases', () => {
  const p = createDefaultProgress();
  // 8 estágios = 200 XP
  p.completedTopics = Array.from({ length: 8 }, (_, i) => `estagio-${i + 1}`);
  // 4 casos = 260 XP
  p.caseDecisions = { c1: 'a', c2: 'b', c3: 'c', c4: 'd' };
  // 8 acertos quiz = 280 XP
  p.quizScore = 8;
  
  const state = calculateGamificationState(p, 90);
  assert.ok(state.totalXP >= 740);
  // Deverá estar pelo menos em Pesquisador ou Estagiário
  assert.ok(['pesquisador', 'estagiario', 'especialista', 'mestre'].includes(state.currentRank.id));
});
