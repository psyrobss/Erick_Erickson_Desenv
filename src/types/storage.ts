/**
 * @file storage.ts
 * Contrato de Injeção de Dependências para o serviço de persistência
 */

import { StudentProgress } from './progress';

export interface IStorageService {
  /** Carrega o progresso persistido */
  getProgress(): StudentProgress;
  /** Salva o progresso do aluno */
  saveProgress(progress: StudentProgress): boolean;
  /** Limpa o progresso resetando para o estado inicial */
  clearProgress(): boolean;
  /** Exporta os dados como JSON para backup */
  exportData(): string;
  /** Importa dados a partir de um backup JSON */
  importData(jsonData: string): boolean;
  /** Retorna a fonte de armazenamento ativa ('cookie' | 'localStorage') */
  getStorageType(): 'cookie' | 'localStorage';
}
