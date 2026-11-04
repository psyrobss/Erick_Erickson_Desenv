/**
 * @file StudentReportModal.tsx
 * Modal com Relatório Acadêmico Completo, Bonito, Colorido e Formal de Atividades do Aluno,
 * Gerador de Comprovante em PDF e Cópia Formatada para o SIGAA.
 * FACISA / UFRN — Psicologia do Desenvolvimento II
 */

import React, { useState } from 'react';
import { 
  X, Printer, Copy, Check, Award, ShieldCheck, User, 
  FileCheck, AlertCircle, Calendar, GraduationCap, ChevronRight,
  BookOpen, Stethoscope, HelpCircle, Sparkles, CheckCircle2, Clock,
  Layers, Circle
} from 'lucide-react';
import { StudentProgress, ProgressBreakdown } from '../../types/progress';
import { 
  generateCertificateCode, 
  checkCertificateEligibility,
  TOTAL_CURRICULUM_TOPICS,
  TOTAL_STAGES,
  TOTAL_CLINICAL_CASES 
} from '../../utils/progressLogic';
import { CURRICULUM_TOPICS } from '../../data/curriculumTopics';
import { STAGES_DATA } from '../../data/stagesData';
import { CASE_STUDIES_DATA } from '../../data/caseStudiesData';
import { QUIZ_QUESTIONS_DATA } from '../../data/quizQuestionsData';
import { GamificationState } from '../../types/gamification';
import { soundService } from '../../services/soundService';
import styled from 'styled-components';

const PrintReportContainer = styled.div`
  @media print {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 999999;
    padding: 1.5rem;
    overflow: visible;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;

interface StudentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: StudentProgress;
  breakdown: ProgressBreakdown;
  gameState?: GamificationState;
  onUpdateStudentInfo: (name: string, studentId: string) => void;
}

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  isOpen,
  onClose,
  progress,
  breakdown,
  gameState,
  onUpdateStudentInfo,
}) => {
  const [nameInput, setNameInput] = useState(progress.studentName || '');
  const [idInput, setIdInput] = useState(progress.studentId || '');
  const [copiedToSigaa, setCopiedToSigaa] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'relatorio' | 'certificado'>('relatorio');

  if (!isOpen) return null;

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudentInfo(nameInput.trim(), idInput.trim());
    soundService.playSuccessTone();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const validationCode = generateCertificateCode(
    progress.studentName || 'ALUNO',
    new Date(progress.lastActiveTimestamp).toISOString(),
    progress.studentId
  );

  const eligibility = checkCertificateEligibility(progress, QUIZ_QUESTIONS_DATA.length);
  const currentDateFormatted = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Texto formatado para o SIGAA UFRN
  const handleCopyForSigaa = () => {
    const lines = [
      `=======================================================`,
      `COMPROVANTE DE ATIVIDADES DE ESTUDO GUIADO`,
      `Universidade Federal do Rio Grande do Norte — FACISA / UFRN`,
      `Disciplina: Psicologia do Desenvolvimento II`,
      `Tema: Teoria do Desenvolvimento Psicossocial (Erik Erikson)`,
      `=======================================================`,
      `DADOS DO ESTUDANTE:`,
      `Nome: ${progress.studentName || 'Não informado'}`,
      `Matrícula: ${progress.studentId || 'Não informada'}`,
      `Data de Emissão: ${currentDateFormatted}`,
      `Código de Autenticação: ${validationCode}`,
      ``,
      `RESUMO DE APROVEITAMENTO:`,
      `• Aproveitamento Geral: ${breakdown.totalPct}% de 100%`,
      `• Módulos Teóricos: ${breakdown.theoryCompletedCount} de ${TOTAL_CURRICULUM_TOPICS} concluídos (${breakdown.theoryPct}% de 35% ponderado)`,
      `• Estágios Explorados: ${breakdown.stagesCompletedCount} de ${TOTAL_STAGES}`,
      `• Casos Clínicos Resolvidos: ${breakdown.casesCompletedCount} de ${TOTAL_CLINICAL_CASES} (${breakdown.casesPct}% de 35% ponderado)`,
      `• Exercícios de Fixação: ${breakdown.quizAnsweredCount} respondidos com ${breakdown.quizCorrectCount} acertos (${breakdown.quizPct}% de 30% ponderado)`,
      `• Termos no Dicionário Consultados: ${breakdown.dictionaryTermsCount}`,
      ``,
      `ENGAJAMENTO & GAMIFICAÇÃO:`,
      `• Patente Acadêmica: ${gameState?.currentRank.title || 'Iniciante'} (Nível ${gameState?.currentRank.level || 1})`,
      `• Pontos de Experiência (XP): ${gameState?.totalXP || 0} XP`,
      `• Medalhas Conquistadas: ${gameState?.unlockedBadgeIds.length || 0} de 7`,
      ``,
      `CASOS CLÍNICOS E DECISÕES REGISTRADAS:`,
      ...CASE_STUDIES_DATA.map((c, idx) => {
        const decisionId = progress.caseDecisions[c.id];
        const selectedOpt = c.options.find(o => o.id === decisionId);
        return `  ${idx + 1}. Caso ${c.studentName} (${c.age} anos): ${selectedOpt ? selectedOpt.label : 'Pendente de análise'}`;
      }),
      ``,
      `STATUS:`,
      eligibility.eligible 
        ? `[CONCLUÍDO] Todos os critérios de aproveitamento pedagógico cumpridos com êxito.`
        : `[EM ANDAMENTO] Pendências: ${eligibility.reason || 'Concluir atividades pendentes.'}`,
      `=======================================================`,
      `Documento gerado localmente pelo aplicativo estático offline`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    soundService.playSuccessTone();
    setCopiedToSigaa(true);
    setTimeout(() => setCopiedToSigaa(false), 3000);
  };

  const handlePrint = () => {
    soundService.playSelect();
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        
        {/* Cabeçalho do Modal */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/40 rounded-xl border border-indigo-500/30">
              <GraduationCap className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest block">
                Comprovante Acadêmico Oficial · UFRN / FACISA
              </span>
              <h2 id="report-modal-title" className="text-base sm:text-xl font-bold font-serif text-white">
                Relatório de Atividades de Estudo Guiado
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Salvar em PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Abas do Modal */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('relatorio')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'relatorio'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 Relatório Completo das Etapas
            </button>
            <button
              onClick={() => setActiveTab('certificado')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'certificado'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Certificado de Conclusão
            </button>
          </div>

          <span className="text-xs font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 hidden md:inline">
            Aproveitamento: {breakdown.totalPct}%
          </span>
        </div>

        {/* Conteúdo com Rolagem */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* Caixa de Identificação do Aluno (Armazenamento Local) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <form onSubmit={handleSaveIdentity} className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Dados do Aluno (Armazenados exclusivamente no navegador para este PDF)</span>
                </div>
                {savedSuccess && (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Salvo no navegador!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-6 space-y-1">
                  <label htmlFor="modal-name-input" className="block text-[11px] font-semibold text-slate-600">
                    Nome Completo do Estudante:
                  </label>
                  <input
                    id="modal-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Ex: João da Silva Santos"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <label htmlFor="modal-id-input" className="block text-[11px] font-semibold text-slate-600">
                    Matrícula Acadêmica:
                  </label>
                  <input
                    id="modal-id-input"
                    type="text"
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    placeholder="Ex: 20240012345"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-1.5 px-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    Salvar Dados
                  </button>
                </div>
              </div>
            </form>
          </div>

          {activeTab === 'relatorio' && (
            <PrintReportContainer className="space-y-6">
              
              {/* Cabeçalho Institucional do Relatório */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                      Universidade Federal do Rio Grande do Norte · FACISA
                    </span>
                    <h3 className="text-lg font-bold font-serif text-slate-900">
                      Boletim de Auditoria do Estudo Guiado
                    </h3>
                    <p className="text-xs text-slate-600">
                      Disciplina: Psicologia do Desenvolvimento II · Teoria do Desenvolvimento Psicossocial (Erikson)
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-indigo-700 block bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Código: {validationCode}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Data: {currentDateFormatted}
                    </span>
                  </div>
                </div>

                {/* Dados do Aluno em Destaque */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Estudante:</span>
                    <strong className="text-slate-900 text-sm">{progress.studentName || 'Estudante Não Identificado'}</strong>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Matrícula Acadêmica:</span>
                    <strong className="text-slate-900 text-sm font-mono">{progress.studentId || 'Não informada'}</strong>
                  </div>
                </div>
              </div>

              {/* Os 3 Pilares com Cores Marcantes e Barras de Progresso */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Pilar 1: Teoria (Indigo) */}
                <div className="p-4 rounded-2xl border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/80 to-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>1. Teoria & Leituras</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono text-indigo-700 bg-indigo-100 px-1.5 py-0.2 rounded">
                      Peso 35%
                    </span>
                  </div>
                  <div className="text-2xl font-black font-mono text-indigo-900">
                    {breakdown.theoryPct}%
                  </div>
                  <div className="w-full bg-indigo-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${(breakdown.theoryPct / 35) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {breakdown.theoryCompletedCount} de 6 tópicos e {breakdown.stagesCompletedCount} de 8 estágios explorados.
                  </p>
                </div>

                {/* Pilar 2: Casos Clínicos (Âmbar) */}
                <div className="p-4 rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50/80 to-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <Stethoscope className="w-4 h-4 text-amber-600" />
                      <span>2. Casos Clínicos</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                      Peso 35%
                    </span>
                  </div>
                  <div className="text-2xl font-black font-mono text-amber-900">
                    {breakdown.casesPct}%
                  </div>
                  <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 h-full rounded-full transition-all"
                      style={{ width: `${(breakdown.casesPct / 35) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {breakdown.casesCompletedCount} de 4 casos clínicos resolvidos com fundamentação teórica.
                  </p>
                </div>

                {/* Pilar 3: Quiz e Exercícios (Verde Esmeralda) */}
                <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50/80 to-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>3. Exercícios & Quiz</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Peso 30%
                    </span>
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-900">
                    {breakdown.quizPct}%
                  </div>
                  <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${(breakdown.quizPct / 30) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {breakdown.quizAnsweredCount} de 12 questões respondidas ({breakdown.quizCorrectCount} acertos).
                  </p>
                </div>
              </div>

              {/* Card de Engajamento e Patente Acadêmica */}
              {gameState && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-purple-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center text-xl shadow-xs">
                      🏆
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
                        Patente Acadêmica Conquistada na Aula
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {gameState.currentRank.title} (Nível {gameState.currentRank.level})
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">TOTAL DE XP</span>
                      <strong className="text-indigo-700 font-bold text-sm">{gameState.totalXP} XP</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">MEDALHAS</span>
                      <strong className="text-amber-700 font-bold text-sm">{gameState.unlockedBadgeIds.length} / 7</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Matriz dos 8 Estágios do Ciclo Vital Concluídos */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                      Matriz dos 8 Estágios do Ciclo Vital
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-mono text-indigo-700">
                    {breakdown.stagesCompletedCount} / 8 Estudados
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {STAGES_DATA.map((s) => {
                    const isDone = progress.completedTopics.includes(`estagio-${s.id}`);
                    return (
                      <div
                        key={s.id}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isDone 
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-2xs' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-[10px] text-slate-500">
                            {s.id}º Estágio
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Circle className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                        <div className="font-bold truncate text-[11px]">{s.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-serif italic truncate">
                          Virtude: {s.virtue}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tabela dos 4 Casos Clínicos Resolvidos */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                      Resolução dos Estudos de Caso Clínico-Desenvolvimentais
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-mono text-amber-700">
                    {breakdown.casesCompletedCount} / 4 Resolvidos
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {CASE_STUDIES_DATA.map((c) => {
                    const decisionId = progress.caseDecisions[c.id];
                    const selectedOpt = c.options.find(o => o.id === decisionId);
                    const isSolved = Boolean(selectedOpt);

                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isSolved
                            ? selectedOpt?.isPedagogicallyOptimal
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                              : 'bg-amber-50/60 border-amber-200 text-amber-950'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900">
                            Caso {c.studentName} ({c.age} anos) · <span className="font-normal text-slate-600">{c.developmentalTension}</span>
                          </div>
                          <div className="text-[11px] text-slate-600">
                            {isSolved ? (
                              <span>Conduta selecionada: <strong>{selectedOpt?.label}</strong></span>
                            ) : (
                              <span className="italic text-slate-400">Pendente de resolução no laboratório</span>
                            )}
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 self-start sm:self-center ${
                          isSolved ? 'bg-white text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isSolved ? 'Decisão Registrada' : 'Pendente'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </PrintReportContainer>
          )}

          {activeTab === 'certificado' && (
            <div className="space-y-4">
              {!eligibility.eligible ? (
                <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span>Critérios Mínimos para Certificação</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Para emitir o certificado formal de conclusão da disciplina, explore os 8 estágios do ciclo vital, solucione pelo menos 3 dos 4 casos clínicos e responda às questões formativas do quiz.
                  </p>
                  <p className="text-xs text-amber-950 font-bold">
                    Pendência atual: {eligibility.reason}
                  </p>
                </div>
              ) : (
                <div className="bg-white border-8 border-double border-indigo-950 p-6 sm:p-10 rounded-2xl text-center space-y-4 shadow-md max-w-xl mx-auto my-2">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-slate-500 leading-tight">
                    Universidade Federal do Rio Grande do Norte — UFRN
                    <br />
                    Faculdade de Ciências da Saúde do Trairi — FACISA
                  </div>

                  <div className="text-xl sm:text-2xl font-display font-bold text-indigo-950 uppercase tracking-tight pt-1">
                    Certificado de Estudo Guiado
                  </div>

                  <p className="text-xs text-slate-500 font-serif italic">
                    Certificamos para os devidos fins acadêmicos que
                  </p>

                  <div className="text-lg sm:text-xl font-display font-bold text-slate-900 border-b border-slate-300 pb-1 max-w-sm mx-auto">
                    {progress.studentName || 'Estudante de Psicologia'}
                  </div>

                  {progress.studentId && (
                    <div className="text-xs text-slate-500 font-mono">
                      Matrícula Acadêmica: {progress.studentId}
                    </div>
                  )}

                  <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                    concluiu com êxito as atividades práticas e teóricas de estudo guiado sobre a <strong>Teoria do Desenvolvimento Psicossocial de Erik Erikson</strong>, compreendendo os oito estágios do ciclo vital, os paradigmas de identidade da adolescência (Marcia & U-MICS) e o manejo ético de dilemas clínicos na disciplina de <strong>Psicologia do Desenvolvimento II</strong>.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-3 text-[11px] text-slate-600 border-t border-slate-200">
                    <div>
                      <span className="block font-bold text-slate-800">Aproveitamento:</span>
                      <span>{breakdown.totalPct}% ponderado</span>
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800">Código de Validação:</span>
                      <span className="font-mono text-[10px]">{validationCode}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-slate-400">
                    Emitido em {currentDateFormatted} · Documento gerado localmente
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Rodapé do Modal com Ações */}
        <div className="p-4 bg-slate-900 text-white border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyForSigaa}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors shadow-xs"
              title="Copiar texto formatado para submeter no SIGAA"
            >
              {copiedToSigaa ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedToSigaa ? 'Copiado para a Área de Transferência!' : 'Copiar Texto para o SIGAA'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar em PDF</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-colors"
          >
            Fechar Relatório
          </button>
        </div>

      </div>
    </div>
  );
};
