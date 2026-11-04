/**
 * @file GlobalTopProgressBar.tsx
 * Barra de progresso global persistente no topo com medidor em tempo real,
 * indicador de Patente Acadêmica, XP, controle de som offline e atalho para o relatório oficial.
 */

import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, ChevronRight, BookOpen, Stethoscope, HelpCircle, Trophy, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { ProgressBreakdown } from '../../types/progress';
import { GamificationState } from '../../types/gamification';
import { soundService } from '../../services/soundService';

interface GlobalTopProgressBarProps {
  breakdown: ProgressBreakdown;
  gameState: GamificationState;
  studentName?: string;
  studentId?: string;
  onOpenReportModal: () => void;
  onOpenGamificationModal: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const GlobalTopProgressBar: React.FC<GlobalTopProgressBarProps> = ({
  breakdown,
  gameState,
  studentName,
  studentId,
  onOpenReportModal,
  onOpenGamificationModal,
  onNavigateTab,
}) => {
  const [isMuted, setIsMuted] = useState(soundService.isMuted());
  const isFinished = breakdown.totalPct >= 100;

  const handleToggleSound = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <section 
      aria-label="Barra de progresso e gamificação global do curso" 
      className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800 transition-all"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Lado Esquerdo: Porcentagem e Patente Acadêmica Gamificada */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isFinished ? 'bg-emerald-400' : 'bg-indigo-400'}`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isFinished ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
              </span>
              <span className="text-xs font-semibold text-slate-300 hidden md:inline">
                Progresso:
              </span>
            </div>

            {/* Número em destaque */}
            <div className="flex items-baseline gap-1">
              <span className={`text-lg sm:text-xl font-bold font-mono tracking-tight ${isFinished ? 'text-emerald-400' : 'text-indigo-300'}`}>
                {breakdown.totalPct}%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">concluído</span>
            </div>

            {/* Botão Guia da Aula / Comece Aqui */}
            <button
              type="button"
              onClick={() => onNavigateTab('topicos')}
              title="Abrir o Comece Aqui e metas da aula"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-200 border border-indigo-700/50 shadow-sm text-xs font-medium transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Sparkles className="w-3 h-3 text-indigo-300" />
              <span className="hidden md:inline">Guia da Aula</span>
            </button>

            {/* Botão de Patente e XP (Gamificação Interativa) */}
            <button
              type="button"
              onClick={onOpenGamificationModal}
              title="Ver detalhes de Patente Acadêmica, XP e Medalhas"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-amber-300 border border-indigo-700/60 shadow-sm text-xs font-semibold transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-sans truncate max-w-[130px]">
                {gameState.currentRank.title}
              </span>
              <span className="font-mono bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded text-[11px]">
                {gameState.totalXP} XP
              </span>
            </button>

            {/* Mini identificador do aluno */}
            {studentName && (
              <span className="hidden xl:inline text-xs text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 truncate max-w-[160px]">
                {studentName} {studentId ? `(${studentId})` : ''}
              </span>
            )}
          </div>

          {/* Centro: Barra visual com detalhamento (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 flex-1 max-w-md mx-2">
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex p-0.5 border border-slate-700/60">
              {/* Segmento 1: Teoria (até 35%) */}
              <div 
                className="bg-indigo-500 h-full rounded-l-full transition-all duration-500" 
                style={{ width: `${(breakdown.theoryPct / 35) * 35}%` }}
                title={`Teoria: ${breakdown.theoryPct.toFixed(1)}% de 35%`}
              />
              {/* Segmento 2: Casos Clínicos (até 35%) */}
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${(breakdown.casesPct / 35) * 35}%` }}
                title={`Casos Clínicos: ${breakdown.casesPct.toFixed(1)}% de 35%`}
              />
              {/* Segmento 3: Quiz/Exercícios (até 30%) */}
              <div 
                className="bg-teal-400 h-full rounded-r-full transition-all duration-500" 
                style={{ width: `${(breakdown.quizPct / 30) * 30}%` }}
                title={`Exercícios: ${breakdown.quizPct.toFixed(1)}% de 30%`}
              />
            </div>

            {/* Pílulas de atalho com contadores */}
            <div className="flex items-center gap-1 shrink-0 text-[11px]">
              <button 
                onClick={() => onNavigateTab('topicos')}
                title="Ver tópicos teóricos (35%)"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-900/40 transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                <span>Teoria {breakdown.theoryCompletedCount}/6</span>
              </button>

              <button 
                onClick={() => onNavigateTab('casos')}
                title="Ver estudos de caso clínico (35%)"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-900/40 transition-colors"
              >
                <Stethoscope className="w-3 h-3" />
                <span>Casos {breakdown.casesCompletedCount}/4</span>
              </button>
            </div>
          </div>

          {/* Lado Direito: Controle de Som e Comprovante Oficial */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Botão de Som Mudo / Ativado */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={isMuted ? 'Ativar efeitos sonoros da aula' : 'Desativar efeitos sonoros da aula'}
              title={isMuted ? 'Áudio desativado (clique para ativar)' : 'Áudio ativado (clique para mutar)'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Botão de Comprovante Oficial do Aluno */}
            <button
              onClick={onOpenReportModal}
              title="Abrir gerador de comprovante acadêmico para o SIGAA"
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-medium text-xs shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                isFinished
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-400 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-400'
              }`}
            >
              {isFinished ? <Award className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Comprovante de Atividades</span>
              <span className="sm:hidden">Comprovante</span>
              <ChevronRight className="w-3 h-3 opacity-70" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
