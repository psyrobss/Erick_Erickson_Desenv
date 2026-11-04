import test from 'node:test';
import assert from 'node:assert/strict';
import { createLocalStorage, getStorageService, setStorageService } from './StorageFactory';
import { createDefaultProgress } from '../../utils/progressLogic';

test('LocalStorageService saves, retrieves, and clears progress', () => {
  const service = createLocalStorage('test_key');
  const initial = service.getProgress();
  assert.equal(initial.course, 'Psicologia do Desenvolvimento II');

  const modified = {
    ...initial,
    studentName: 'Estudante Teste',
    completedTopics: ['topico-1', 'topico-2'],
  };

  const saved = service.saveProgress(modified);
  assert.equal(saved, true);

  const retrieved = service.getProgress();
  assert.equal(retrieved.studentName, 'Estudante Teste');
  assert.equal(retrieved.completedTopics.length, 2);

  service.clearProgress();
  const afterClear = service.getProgress();
  assert.equal(afterClear.completedTopics.length, 0);
});

test('Dependency injection allows swapping storage service', () => {
  const customService = createLocalStorage('custom_di_key');
  setStorageService(customService);
  const active = getStorageService();
  assert.equal(active.getStorageType(), 'localStorage');
});
