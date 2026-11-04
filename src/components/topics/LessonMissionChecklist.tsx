/**
 * @file LessonMissionChecklist.tsx
 * Trilha Guiada com Checklist Interativo das 5 Metas Essenciais da Aula.
 * Exibe o status de cada etapa em tempo real e fornece atalhos de 1 clique para navegar a cada módulo.
 */

import React from 'react';
import { 
  CheckCircle2, Clock, Circle, ArrowRight, BookOpen, 
  Layers, Stethoscope, HelpCircle, FileCheck, Sparkles, Award 
} from 'lucide-react';
import { ProgressBreakdown } from '../../types/progress';
import { soundService } from '../../services/soundService';

interface LessonMissionChecklistProps {
  breakdown: ProgressBreakdown;
  onNavigateTab: (tabId: string) => void;
  onOpenReportModal: () => void;
}

export const LessonMissionChecklist: React.FC<LessonMissionChecklistProps> = ({
  breakdown,
  onNavigateTab,
  onOpenReportModal,
}) => {
  // Avaliação de cada meta:
  // Meta 1: 8 Estágios do ciclo vital (pelo menos 1 para em andamento, 8 para concluída)
  const meta1Status = breakdown.stagesCompletedCount >= 8 ? 'completed' : breakdown.stagesCompletedCount > 0 ? 'in_progress' : 'pending';

  // Meta 2: Módulo de Adolescência (verificado via tópicos)
  const meta2Status = breakdown.theoryCompletedCount >= 3 ? 'completed' : breakdown.theoryCompletedCount > 0 ? 'in_progress' : 'pending';

  // Meta 3: 4 Casos Clínicos
  const meta3Status = breakdown.casesCompletedCount >= 4 ? 'completed' : breakdown.casesCompletedCount > 0 ? 'in_progress' : 'pending';

  // Meta 4: Quiz de Fixação (pelo menos 8 respondidas para concluída)
  const meta4Status = breakdown.quizAnsweredCount >= 10 ? 'completed' : breakdown.quizAnsweredCount > 0 ? 'in_progress' : 'pending';

  // Meta 5: Relatório Oficial gerado / elegível
  const meta5Status = breakdown.totalPct >= 90 ? 'completed' : breakdown.totalPct >= 40 ? 'in_progress' : 'pending';

  const missions = [
    {
      id: 'meta-1',
      title: 'Meta 1: Princípio Epigenético & Os 8 Estágios do Ciclo Vital',
      description: 'Navegar pelos 8 estágios de Erikson, identificando as crises psicossociais e as virtudes do ego (da Esperança à Sabedoria).',
      progressText: `${breakdown.stagesCompletedCount} de 8 estágios concluídos`,
      status: meta1Status,
      icon: Layers,
      color: 'indigo',
      actionLabel: 'Explorar Estágios',
      action: () => onNavigateTab('estagios'),
    },
    {
      id: 'meta-2',
      title: 'Meta 2: Adolescência, Moratória & James Marcia',
      description: 'Experimentar o simulador dialético de Exploração versus Compromisso e analisar a reconsideração da identidade (U-MICS).',
      progressText: meta2Status === 'completed' ? 'Módulo estudado' : 'Simulador interativo pendente',
      status: meta2Status,
      icon: BookOpen,
      color: 'purple',
      actionLabel: 'Acessar Adolescência',
      action: () => onNavigateTab('adolescencia'),
    },
    {
      id: 'meta-3',
      title: 'Meta 3: Análise dos 4 Casos Clínicos Aplicados',
      description: 'Examinar as entrevistas de Lucas, Beatriz, Mateus e Juliana e registrar as condutas recomendadas com fundamentação teórica.',
      progressText: `${breakdown.casesCompletedCount} de 4 casos resolvidos`,
      status: meta3Status,
      icon: Stethoscope,
      color: 'amber',
      actionLabel: 'Resolver Casos Clínicos',
      action: () => onNavigateTab('casos'),
    },
    {
      id: 'meta-4',
      title: 'Meta 4: Exercícios Formativos no Quiz com Gabarito Comentado',
      description: 'Resolver as questões formativas de fixação, testar o raciocínio diagnóstico e revisar a justificativa de cada alternativa.',
      progressText: `${breakdown.quizAnsweredCount} de 12 questões (${breakdown.quizCorrectCount} acertos)`,
      status: meta4Status,
      icon: HelpCircle,
      color: 'teal',
      actionLabel: 'Fazer Exercícios',
      action: () => onNavigateTab('quiz'),
    },
    {
      id: 'meta-5',
      title: 'Meta 5: Emissão do Relatório em PDF & Comprovante SIGAA',
      description: 'Visualizar o relatório acadêmico colorido e formal com auditoria das atividades e gerar o documento em PDF para entrega.',
      progressText: `${breakdown.totalPct}% de aproveitamento geral da aula`,
      status: meta5Status,
      icon: FileCheck,
      color: 'emerald',
      actionLabel: 'Abrir Relatório Oficial',
      action: onOpenReportModal,
    },
  ];

  const completedCount = missions.filter((m) => m.status === 'completed').length;

  const handleActionClick = (action: () => void) => {
    soundService.playSelect();
    action();
  };

  return (
    <section 
      aria-label="Checklist de Metas da Aula de Psicologia do Desenvolvimento II"
      className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5"
    >
      {/* Cabeçalho do Checklist */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Trilha de Aprendizagem da Aula
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
            Checklist de Metas da Aula
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Acompanhe o cumprimento das 5 etapas fundamentais previstas para esta sessão de estudos.
          </p>
        </div>

        {/* Medidor de Metas Cumpridas */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-xs">
            {completedCount}/5
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Metas Concluídas
            </span>
            <span className="text-xs font-bold text-indigo-900 font-mono">
              {completedCount === 5 ? 'Trilha Completa!' : `${5 - completedCount} etapas restantes`}
            </span>
          </div>
        </div>
      </div>

      {/* Lista das 5 Metas com Status Dinâmico */}
      <div className="space-y-3">
        {missions.map((m, index) => {
          const isDone = m.status === 'completed';
          const isInProgress = m.status === 'in_progress';
          const Icon = m.icon;

          return (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                  : isInProgress
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Ícone de Status da Meta */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isInProgress
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isInProgress ? (
                    <Clock className="w-4 h-4 animate-spin-slow" />
                  ) : (
                    <span className="font-mono font-bold text-xs">{index + 1}</span>
                  )}
                </div>

                {/* Conteúdo da Meta */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {m.title}
                    </h3>

                    {/* Badge de Status */}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isDone ? 'Concluída ✓' : isInProgress ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="text-[11px] font-mono text-indigo-700 font-medium">
                    Progresso: {m.progressText}
                  </div>
                </div>
              </div>

              {/* Botão de Navegação Imediata para a Meta */}
              <button
                type="button"
                onClick={() => handleActionClick(m.action)}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                  isDone
                    ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <span>{m.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

    </section>
  );
};
