/**
 * @file LocalStorageService.ts
 * Implementação alternativa / complementar de IStorageService para testes unitários ou navegadores com cookies desabilitados
 */

import { IStorageService } from '../../types/storage';
import { StudentProgress } from '../../types/progress';
import { createDefaultProgress } from '../../utils/progressLogic';

export const LOCAL_STORAGE_KEY = 'facisa_ufrn_psicodev_progress_local';

export class LocalStorageService implements IStorageService {
  private key: string;
  private memoryFallback: StudentProgress;

  constructor(key: string = LOCAL_STORAGE_KEY) {
    this.key = key;
    this.memoryFallback = createDefaultProgress();
  }

  public getStorageType(): 'cookie' | 'localStorage' {
    return 'localStorage';
  }

  public getProgress(): StudentProgress {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const item = window.localStorage.getItem(this.key);
        if (item) {
          const parsed = JSON.parse(item);
          return { ...createDefaultProgress(), ...parsed };
        }
      } catch (e) {
        console.warn('Erro ao ler localStorage:', e);
      }
    }
    return this.memoryFallback;
  }

  public saveProgress(progress: StudentProgress): boolean {
    const updated = { ...progress, lastActiveTimestamp: Date.now() };
    this.memoryFallback = updated;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(this.key, JSON.stringify(updated));
        return true;
      } catch (e) {
        console.error('Erro ao salvar em localStorage:', e);
      }
    }
    return true;
  }

  public clearProgress(): boolean {
    this.memoryFallback = createDefaultProgress();
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(this.key);
        return true;
      } catch (e) {
        console.error('Erro ao remover de localStorage:', e);
      }
    }
    return true;
  }

  public exportData(): string {
    return JSON.stringify(this.getProgress(), null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const parsed = JSON.parse(jsonData);
      return this.saveProgress(parsed);
    } catch {
      return false;
    }
  }
}
