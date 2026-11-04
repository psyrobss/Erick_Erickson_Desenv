import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDefaultProgress,
  calculateDetailedBreakdown,
  calculateCompletionPercentage,
  checkCertificateEligibility,
  generateCertificateCode,
  TOTAL_CURRICULUM_TOPICS,
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

test('calculateDetailedBreakdown calculates balanced weights for theory, cases, and quiz', () => {
  const p = createDefaultProgress('João', '123456');
  // 3 de 6 tópicos curriculares (50% de 20 = 10%)
  p.completedTopics = ['topico-1', 'topico-2', 'topico-3'];
  // 4 de 8 estágios (50% de 15 = 7.5%)
  p.completedTopics.push('estagio-1', 'estagio-2', 'estagio-3', 'estagio-4');
  // Teoria total = 10 + 7.5 = 17.5%

  // 2 de 4 casos clínicos (50% de 25 = 12.5%)
  p.caseDecisions = { 'caso-1': 'opt-a', 'caso-2': 'opt-b' };
  // 5 termos de dicionário (100% de 10 = 10%)
  p.reviewedDictionaryTerms = ['termo-1', 'termo-2', 'termo-3', 'termo-4', 'termo-5'];
  // Casos total = 12.5 + 10 = 22.5%

  // Quiz: 5 de 10 perguntas respondidas (50% de 15 = 7.5%)
  p.quizAnswers = { q1: 'a', q2: 'b', q3: 'c', q4: 'd', q5: 'a' };
  // 5 corretas (5 / 10 = 50% de 15 = 7.5%)
  p.quizScore = 5;
  // Quiz total = 7.5 + 7.5 = 15%

  const breakdown = calculateDetailedBreakdown(p, 10);
  assert.equal(breakdown.theoryPct, 17.5);
  assert.equal(breakdown.casesPct, 22.5);
  assert.equal(breakdown.quizPct, 15);
  // Total = 17.5 + 22.5 + 15 = 55%
  assert.equal(breakdown.totalPct, 55);
  assert.equal(calculateCompletionPercentage(p, 10), 55);
});

test('checkCertificateEligibility enforces curriculum completion, cases, and quiz score threshold', () => {
  const p = createDefaultProgress('Aluno', '2026001');
  
  // 1. Início: não elegível
  const res1 = checkCertificateEligibility(p, 12);
  assert.equal(res1.eligible, false);

  // 2. Conclui todos os 6 tópicos teóricos, mas ainda sem casos nem quiz
  p.completedTopics = Array.from({ length: TOTAL_CURRICULUM_TOPICS }, (_, i) => `topico-${i + 1}`);
  const res2 = checkCertificateEligibility(p, 12);
  assert.equal(res2.eligible, false);
  assert.ok(res2.reason?.includes('estudos de caso clínico'));

  // 3. Conclui 3 dos 4 casos clínicos
  p.caseDecisions = { 'caso-1': 'a', 'caso-2': 'b', 'caso-3': 'c' };
  const res3 = checkCertificateEligibility(p, 12);
  assert.equal(res3.eligible, false);
  assert.ok(res3.reason?.includes('quiz'));

  // 4. Responde 6 questões do quiz, porém com acertos insuficientes (apenas 2 acertos = 33% < 70%)
  p.quizAnswers = { q1: 'a', q2: 'b', q3: 'c', q4: 'd', q5: 'e', q6: 'f' };
  p.quizScore = 2;
  const res4 = checkCertificateEligibility(p, 12);
  assert.equal(res4.eligible, false);
  assert.ok(res4.reason?.includes('70%'));

  // 5. Aumenta os acertos para 5 de 6 questões (83.3% >= 70%)
  p.quizScore = 5;
  const res5 = checkCertificateEligibility(p, 12);
  assert.equal(res5.eligible, true);
});

test('generateCertificateCode creates distinct formatted code with name and matricula', () => {
  const code = generateCertificateCode('Ana Beatriz', '2026-10-28T12:00:00Z', '20261234');
  assert.match(code, /^FACISA-1234-ANAB-[A-Z0-9]+$/);

  const codeWithoutMatricula = generateCertificateCode('Lucas Lima', '2026-10-28T12:00:00Z');
  assert.match(codeWithoutMatricula, /^FACISA-MATR-LUCA-[A-Z0-9]+$/);
});
