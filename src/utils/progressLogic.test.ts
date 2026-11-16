import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDefaultProgress,
  calculateDetailedBreakdown,
  calculateCompletionPercentage,
  checkCertificateEligibility,
  generateCertificateCode,
  TOTAL_STAGES,
  TOTAL_CLINICAL_CASES,
} from './progressLogic';

test('createDefaultProgress creates valid initial state', () => {
  const p = createDefaultProgress('Maria Silva', '20261010');
  assert.equal(p.studentName, 'Maria Silva');
  assert.equal(p.studentId, '20261010');
  assert.equal(p.completedTopics.length, 0);
  assert.equal(p.quizScore, 0);
  assert.equal(p.course, 'Psicologia do Desenvolvimento II');
  assert.ok(p.institution.includes('FACISA'));
});

test('calculateCompletionPercentage returns 0 for empty progress', () => {
  const p = createDefaultProgress();
  assert.equal(calculateCompletionPercentage(p, 10), 0);
});

test('calculateDetailedBreakdown awards full 35% for 4 clinical cases and 35% for theory (Etapa 1 + 8 stages)', () => {
  const p = createDefaultProgress('João', '123456');
  // Etapa 1 concluída (7%) + 4 de 8 estágios (50% de 28 = 14%) => Teoria = 21%
  p.completedTopics = ['fundamentos-etapa-1', 'estagio-1', 'estagio-2', 'estagio-3', 'estagio-4'];

  // Todos os 4 casos clínicos resolvidos => Casos = 35% de 35%
  p.caseDecisions = { 'caso-1': 'opt-a', 'caso-2': 'opt-b', 'caso-3': 'opt-c', 'caso-4': 'opt-d' };

  // Quiz: 5 de 10 perguntas respondidas (7.5%) e 5 corretas (7.5%) => Quiz = 15%
  p.quizAnswers = { q1: 'a', q2: 'b', q3: 'c', q4: 'd', q5: 'a' };
  p.quizScore = 5;

  const breakdown = calculateDetailedBreakdown(p, 10);
  assert.equal(breakdown.theoryPct, 21);
  assert.equal(breakdown.casesPct, 35);
  assert.equal(breakdown.quizPct, 15);
  assert.equal(breakdown.totalPct, 71);
  assert.equal(calculateCompletionPercentage(p, 10), 71);
});

test('completing all 4 steps in the linear track yields exactly 100% with zero pending tasks', () => {
  const p = createDefaultProgress('Ana', '2026001');
  p.completedTopics = [
    'fundamentos-etapa-1',
    ...Array.from({ length: TOTAL_STAGES }, (_, i) => `estagio-${i + 1}`),
  ];
  p.caseDecisions = {
    'caso-lucas-16': 'opt-1-3',
    'caso-beatriz-19': 'opt-2-3',
    'caso-mateus-15': 'opt-3-3',
    'caso-juliana-17': 'opt-4-3',
  };
  p.quizAnswers = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`q-${i + 1}`, 'opt-b']));
  p.quizScore = 12;

  const breakdown = calculateDetailedBreakdown(p, 12);
  assert.equal(breakdown.theoryPct, 35);
  assert.equal(breakdown.casesPct, 35);
  assert.equal(breakdown.quizPct, 30);
  assert.equal(breakdown.totalPct, 100);
  assert.equal(breakdown.pendingTasks.length, 0);
  assert.equal(checkCertificateEligibility(p, 12).eligible, true);
});

test('checkCertificateEligibility enforces Etapa 1, 8 stages, 3+ cases, and 70%+ quiz score', () => {
  const p = createDefaultProgress('Aluno', '2026001');

  // 1. Início: Etapa 1 pendente
  const res1 = checkCertificateEligibility(p, 12);
  assert.equal(res1.eligible, false);
  assert.ok(res1.reason?.includes('Etapa 1'));

  // 2. Conclui Etapa 1, mas sem estágios
  p.completedTopics = ['fundamentos-etapa-1'];
  const res2 = checkCertificateEligibility(p, 12);
  assert.equal(res2.eligible, false);
  assert.ok(res2.reason?.includes('8 estágios'));

  // 3. Conclui os 8 estágios, mas sem casos clínicos
  p.completedTopics.push(...Array.from({ length: TOTAL_STAGES }, (_, i) => `estagio-${i + 1}`));
  const res3 = checkCertificateEligibility(p, 12);
  assert.equal(res3.eligible, false);
  assert.ok(res3.reason?.includes('caso clínico'));

  // 4. Conclui 3 dos 4 casos clínicos
  p.caseDecisions = { 'caso-1': 'a', 'caso-2': 'b', 'caso-3': 'c' };
  const res4 = checkCertificateEligibility(p, 12);
  assert.equal(res4.eligible, false);
  assert.ok(res4.reason?.includes('quiz'));

  // 5. Responde 6 questões do quiz, porém com acertos insuficientes (apenas 2 acertos = 33% < 70%)
  p.quizAnswers = { q1: 'a', q2: 'b', q3: 'c', q4: 'd', q5: 'e', q6: 'f' };
  p.quizScore = 2;
  const res5 = checkCertificateEligibility(p, 12);
  assert.equal(res5.eligible, false);
  assert.ok(res5.reason?.includes('70%'));

  // 6. Aumenta os acertos para 5 de 6 questões (83.3% >= 70%)
  p.quizScore = 5;
  const res6 = checkCertificateEligibility(p, 12);
  assert.equal(res6.eligible, true);
});

test('generateCertificateCode creates distinct formatted code with name and matricula', () => {
  const code = generateCertificateCode('Ana Beatriz', '2026-10-28T12:00:00Z', '20261234');
  assert.match(code, /^FACISA-1234-ANAB-[A-Z0-9]+$/);

  const codeWithoutMatricula = generateCertificateCode('Lucas Lima', '2026-10-28T12:00:00Z');
  assert.match(codeWithoutMatricula, /^FACISA-MATR-LUCA-[A-Z0-9]+$/);
});
