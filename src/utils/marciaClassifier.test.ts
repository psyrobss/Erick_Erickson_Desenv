import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyMarciaStatus } from './marciaClassifier';

test('classifyMarciaStatus correctly identifies Identidade Alcançada (high exploration, high commitment)', () => {
  const res = classifyMarciaStatus(75, 80);
  assert.equal(res.statusId, 'identidade_alcancada');
  assert.equal(res.explorationCategory, 'Alta prévia');
  assert.equal(res.commitmentCategory, 'Alto');
});

test('classifyMarciaStatus correctly identifies Moratória (high exploration, low commitment)', () => {
  const res = classifyMarciaStatus(85, 20);
  assert.equal(res.statusId, 'moratoria');
  assert.equal(res.explorationCategory, 'Alta');
  assert.equal(res.commitmentCategory, 'Baixo ou instável');
});

test('classifyMarciaStatus correctly identifies Pré-fechamento (low exploration, high commitment)', () => {
  const res = classifyMarciaStatus(20, 90);
  assert.equal(res.statusId, 'pre_fechamento');
  assert.equal(res.explorationCategory, 'Baixa');
  assert.equal(res.commitmentCategory, 'Alto');
});

test('classifyMarciaStatus correctly identifies Difusão (low exploration, low commitment)', () => {
  const res = classifyMarciaStatus(15, 10);
  assert.equal(res.statusId, 'difusao');
  assert.equal(res.explorationCategory, 'Baixa');
  assert.equal(res.commitmentCategory, 'Baixo');
});
