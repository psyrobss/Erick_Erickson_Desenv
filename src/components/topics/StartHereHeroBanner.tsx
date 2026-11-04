/**
 * @file StartHereHeroBanner.tsx
 * Banner Gigante "COMECE AQUI · GUIA DA SUA AULA"
 * Ponto de partida inconfundível para o estudante na aula de Psicologia do Desenvolvimento II.
 * Inclui boas-vindas institucionais da plataforma, aviso de privacidade (100% estático, sem banco de dados),
 * formulário rápido de identificação local no navegador e botão de início imediato.
 */

import React, { useState } from 'react';
import { 
  Compass, ArrowRight, ShieldCheck, User, Sparkles, 
  CheckCircle2, BookOpen, Layers, Stethoscope, HelpCircle, FileText 
} from 'lucide-react';
import { soundService } from '../../services/soundService';

interface StartHereHeroBannerProps {
  studentName?: string;
  studentId?: string;
  onUpdateStudentInfo: (name: string, studentId: string) => void;
  onStartJourney: () => void;
  onOpenReportModal: () => void;
}

export const StartHereHeroBanner: React.FC<StartHereHeroBannerProps> = ({
  studentName = '',
  studentId = '',
  onUpdateStudentInfo,
  onStartJourney,
  onOpenReportModal,
}) => {
  const [nameInput, setNameInput] = useState(studentName);
  const [idInput, setIdInput] = useState(studentId);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudentInfo(nameInput.trim(), idInput.trim());
    soundService.playSuccessTone();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const hasIdentity = Boolean(studentName && studentName.trim().length > 0);

  return (
    <section 
      aria-label="Comece Aqui - Guia da Aula de Psicologia do Desenvolvimento II"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl border-2 border-indigo-500/40"
    >
      {/* Detalhes de iluminação sutil de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Topo do Banner: Selo de Entrada e Título Gigante */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ponto de Partida · Guia de Estudo</span>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-indigo-300 hover:text-white underline underline-offset-4 font-medium transition-colors"
            >
              {isExpanded ? 'Recolher detalhes do guia' : 'Expandir guia completo'}
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            COMECE AQUI · GUIA DA SUA AULA
          </h1>

          <p className="text-indigo-200 font-serif italic text-base sm:text-lg max-w-3xl">
            Ambiente Educacional de Estudo Guiado · Psicologia do Desenvolvimento II
          </p>
        </div>

        {isExpanded && (
          <>
            {/* Mensagem Institucional de Boas-Vindas */}
            <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed max-w-4xl">
              <p>
                Seja muito bem-vindo ao seu ambiente de estudo guiado e interativo. Esta plataforma foi desenvolvida como ferramenta de apoio direto à sua aula, permitindo que você navegue pelos oito estágios do ciclo vital de <strong>Erik Erikson</strong>, experimente simulações dialéticas da <strong>adolescência</strong> e resolva <strong>estudos de caso clínicos reais</strong> no seu próprio ritmo.
              </p>
            </div>

            {/* Caixa em Destaque: Garantia de Funcionamento Estático e Sem Banco de Dados */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-900/60 border border-indigo-400/30 text-xs sm:text-sm text-indigo-100 flex items-start gap-3.5 shadow-inner">
              <div className="p-2 rounded-xl bg-indigo-800 text-indigo-200 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <strong className="text-white block font-semibold text-sm">
                  Aplicativo 100% Estático e Seguro (Privacidade no seu Navegador):
                </strong>
                <p className="text-indigo-200/90 leading-relaxed">
                  Este aplicativo <strong>não utiliza banco de dados externo ou servidor</strong>. Suas respostas, anotações e identificação ficam armazenadas <strong>exclusivamente na memória deste navegador</strong> (cookies e armazenamento local). Isso garante funcionamento inteiramente offline e permite gerar, ao término da aula, seu <strong>relatório colorido oficial em PDF</strong> e o <strong>comprovante formatado para o SIGAA</strong>.
                </p>
              </div>
            </div>

            {/* Formulário Rápido de Identificação Local */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Identificação do Aluno para o Relatório em PDF
                  </h2>
                </div>
                {hasIdentity && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Identificado no navegador
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Preencha seu nome e matrícula abaixo. Esses dados serão inseridos diretamente no cabeçalho formal do seu relatório e no certificado para entrega ao professor.
              </p>

              <form onSubmit={handleSaveIdentity} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-6 space-y-1">
                  <label htmlFor="banner-student-name" className="block text-xs font-semibold text-slate-300">
                    Nome Completo do Estudante:
                  </label>
                  <input
                    id="banner-student-name"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Ex: Maria Clara Souza"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <label htmlFor="banner-student-id" className="block text-xs font-semibold text-slate-300">
                    Matrícula Acadêmica:
                  </label>
                  <input
                    id="banner-student-id"
                    type="text"
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    placeholder="Ex: 20240012345"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Salvar</span>
                  </button>
                </div>
              </form>

              {savedSuccess && (
                <div className="mt-3 text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dados salvos localmente com sucesso! Eles já constam no seu relatório.</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Rodapé do Banner com Botões de Ação Imediata */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-indigo-800/60">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartJourney}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-102 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>INICIAR TRILHA DE ESTUDOS</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onOpenReportModal}
              className="px-4 py-3 rounded-2xl bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 font-semibold text-xs sm:text-sm border border-indigo-700/60 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Ver Relatório Oficial & PDF</span>
            </button>
          </div>

          <div className="text-xs text-indigo-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>5 metas estruturadas para a aula</span>
          </div>
        </div>

      </div>
    </section>
  );
};
