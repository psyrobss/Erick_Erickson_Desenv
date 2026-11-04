/**
 * @file GamificationHubModal.tsx
 * Modal do Centro de Conquistas e Patentes Acadêmicas da FACISA / UFRN.
 * Exibe XP, patente atual, barra para o próximo nível e galeria de medalhas.
 */

import React, { useEffect } from 'react';
import { X, Award, Sparkles, Trophy, Lock, CheckCircle2, Volume2, VolumeX, BookOpen, Stethoscope, HelpCircle } from 'lucide-react';
import { GamificationState } from '../../types/gamification';
import { ALL_BADGES } from '../../services/gamificationService';
import { soundService } from '../../services/soundService';

interface GamificationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GamificationState;
  studentName?: string;
}

export const GamificationHubModal: React.FC<GamificationHubModalProps> = ({
  isOpen,
  onClose,
  gameState,
  studentName,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundService.isMuted());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleSound = () => {
    const newMuted = soundService.toggleMute();
    setIsMuted(newMuted);
  };

  const { currentRank, nextRank, totalXP, rankProgressPct, unlockedBadgeIds } = gameState;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gamification-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Cabeçalho com degradê festivo */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            aria-label="Fechar painel de conquistas"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-2xl shadow-lg">
              🏆
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Carreira Acadêmica · FACISA UFRN
              </span>
              <h2 id="gamification-modal-title" className="text-xl sm:text-2xl font-bold font-serif text-white">
                Patente & Conquistas
              </h2>
            </div>
          </div>
        </div>

        {/* Conteúdo com rolagem suave */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Cartão de Patente Atual */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl" role="img" aria-label="Emblema de patente">
                  {currentRank.level >= 5 ? '👑' : currentRank.level >= 3 ? '🎖️' : '🎓'}
                </span>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
                    Patente Nível {currentRank.level}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {currentRank.title}
                  </h3>
                </div>
              </div>

              {/* Placar de XP */}
              <div className="text-right">
                <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                  {totalXP} XP
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  acumulados na aula
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic">
              {currentRank.motivationalQuote}
            </p>

            {/* Barra de evolução até a próxima patente */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                <span>
                  {nextRank ? `Rumo a: ${nextRank.title}` : 'Patente Máxima Alcançada!'}
                </span>
                <span className="font-mono font-semibold">
                  {nextRank ? `${gameState.xpProgressInCurrentRank} / ${gameState.xpNeededForNextRank} XP (${rankProgressPct}%)` : '100%'}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${rankProgressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Galeria de Medalhas (Badges) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Medalhas de Conquista ({unlockedBadgeIds.length}/{ALL_BADGES.length})
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Desbloqueie explorando a aula
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_BADGES.map((badge) => {
                const isUnlocked = unlockedBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-amber-500/10 border-amber-300 dark:border-amber-700/60 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                        isUnlocked ? 'bg-amber-100 dark:bg-amber-900/60 shadow-sm' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      {isUnlocked ? badge.icon : <Lock className="w-4 h-4 text-slate-500" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {badge.title}
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-amber-700 dark:text-amber-400 shrink-0">
                          +{badge.xpReward} XP
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {isUnlocked ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Desbloqueada
                          </span>
                        ) : (
                          <span>Requisito: {badge.requirement}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Como Ganhar XP (Guia Rápido) */}
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50">
            <h5 className="text-xs sm:text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Como Ganhar XP no Aplicativo:
            </h5>
            <ul className="text-xs text-indigo-900/80 dark:text-indigo-300 space-y-1.5 list-disc list-inside">
              <li><strong>+25 XP</strong> por cada Estágio ou Módulo Teórico explorado e concluído.</li>
              <li><strong>+65 XP</strong> por cada Caso Clínico solucionado com análise fundamentada.</li>
              <li><strong>+35 XP</strong> por cada Acerto no Quiz da disciplina.</li>
              <li><strong>+10 XP</strong> por cada Termo Psicanalítico revisado no Dicionário.</li>
              <li><strong>+30 a +150 XP</strong> de Bônus por cada Medalha conquistada!</li>
            </ul>
          </div>
        </div>

        {/* Rodapé com controle de áudio e fechar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleToggleSound}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
            <span>{isMuted ? 'Áudio: Desativado (Mudo)' : 'Áudio: Ativado'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
          >
            Continuar Estudando
          </button>
        </div>

      </div>
    </div>
  );
};
