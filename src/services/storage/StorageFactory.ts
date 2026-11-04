/**
 * @file StorageFactory.ts
 * Provedor de Injeção de Dependência (DI) para os serviços de armazenamento
 */

import { IStorageService } from '../../types/storage';
import { CookieStorageService } from './CookieStorageService';
import { LocalStorageService } from './LocalStorageService';

let activeStorageService: IStorageService | null = null;

/**
 * Retorna a instância ativa do serviço de armazenamento (Padrão: CookieStorageService)
 */
export function getStorageService(): IStorageService {
  if (!activeStorageService) {
    // Por padrão atende ao requisito: "salvamento por cookies para progresso do aluno sem necessidade de banco de dados"
    activeStorageService = new CookieStorageService();
  }
  return activeStorageService;
}

/**
 * Permite injetar uma implementação alternativa (ex.: para testes automatizados unitários ou mocks)
 */
export function setStorageService(customService: IStorageService): void {
  activeStorageService = customService;
}

/**
 * Cria uma nova instância de CookieStorageService
 */
export function createCookieStorage(key?: string): IStorageService {
  return new CookieStorageService(key);
}

/**
 * Cria uma nova instância de LocalStorageService
 */
export function createLocalStorage(key?: string): IStorageService {
  return new LocalStorageService(key);
}
