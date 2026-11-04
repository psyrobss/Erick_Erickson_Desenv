/**
 * @file CookieStorageService.ts
 * Implementação de IStorageService utilizando Cookies para persistência estática offline
 */

import { IStorageService } from '../../types/storage';
import { StudentProgress } from '../../types/progress';
import { getCookie, setCookie, deleteCookie, serializeForCookie, deserializeFromCookie } from '../../utils/cookieHelpers';
import { createDefaultProgress } from '../../utils/progressLogic';

export const COOKIE_KEY = 'facisa_ufrn_psicodev_progress';

export class CookieStorageService implements IStorageService {
  private cookieKey: string;
  private memoryFallback: StudentProgress | null = null;

  constructor(cookieKey: string = COOKIE_KEY) {
    this.cookieKey = cookieKey;
  }

  public getStorageType(): 'cookie' | 'localStorage' {
    return 'cookie';
  }

  public getProgress(): StudentProgress {
    try {
      const cookieValue = getCookie(this.cookieKey);
      if (cookieValue) {
        const parsed = deserializeFromCookie<StudentProgress>(cookieValue, createDefaultProgress());
        this.memoryFallback = parsed;
        return parsed;
      }
    } catch (err) {
      console.warn('Falha ao ler cookies, tentando fallback:', err);
    }

    if (this.memoryFallback) {
      return this.memoryFallback;
    }

    const initial = createDefaultProgress();
    this.saveProgress(initial);
    return initial;
  }

  public saveProgress(progress: StudentProgress): boolean {
    try {
      const updated = {
        ...progress,
        lastActiveTimestamp: Date.now(),
      };
      this.memoryFallback = updated;
      const serialized = serializeForCookie(updated);
      setCookie(this.cookieKey, serialized, 365, '/');
      return true;
    } catch (err) {
      console.error('Falha ao salvar progresso em cookies:', err);
      return false;
    }
  }

  public clearProgress(): boolean {
    try {
      this.memoryFallback = createDefaultProgress();
      deleteCookie(this.cookieKey, '/');
      return true;
    } catch (err) {
      console.error('Falha ao limpar cookie de progresso:', err);
      return false;
    }
  }

  public exportData(): string {
    const data = this.getProgress();
    return JSON.stringify(data, null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const parsed = JSON.parse(jsonData) as StudentProgress;
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.completedTopics)) {
        throw new Error('Formato de dados de backup inválido');
      }
      return this.saveProgress(parsed);
    } catch (err) {
      console.error('Erro ao importar dados para cookies:', err);
      return false;
    }
  }
}
