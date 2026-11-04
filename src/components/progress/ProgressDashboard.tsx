/**
 * @file ProgressDashboard.tsx
 * Painel de controle do progresso do aluno salvo por Cookies,
 * com cálculo balanceado pedagógico e emissão de comprovante/certificado acadêmico para a FACISA/UFRN.
 */

import React, { useState } from 'react';
import { StudentProgress, ProgressBreakdown } from '../../types/progress';
import { 
  calculateDetailedBreakdown, 
  checkCertificateEligibility, 
  generateCertificateCode, 
  TOTAL_CURRICULUM_TOPICS,
  TOTAL_STAGES,
  TOTAL_CLINICAL_CASES
} from '../../utils/progressLogic';
import { QUIZ_QUESTIONS_DATA } from '../../data/quizQuestionsData';
import { StyledCard } from '../common/StyledComponents';
import { 
  Award, Cookie, Download, Upload, RotateCcw, 
  Printer, User, FileText, CheckCircle2, AlertCircle, BookOpen, Stethoscope, HelpCircle 
} from 'lucide-react';
import styled from 'styled-components';

const CertificatePaper = styled.div`
  background: #ffffff;
  border: 8px double #1e1b4b;
  padding: 3rem 2rem;
  border-radius: 4px;
  text-align: center;
  color: #0f172a;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 780px;
  margin: 0 auto;

  @media print {
    border: 4px double #000000;
    box-shadow: none;
    padding: 2rem;
  }
`;

interface ProgressDashboardProps {
  progress: StudentProgress;
  onUpdateName: (name: string, studentId?: string) => void;
  onClearProgress: () => void;
  onExportData: () => void;
  onImportData: (json: string) => void;
  onOpenReportModal: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onUpdateName,
  onClearProgress,
  onExportData,
  onImportData,
  onOpenReportModal,
}) => {
  const [studentInputName, setStudentInputName] = useState(progress.studentName || '');
  const [studentInputId, setStudentInputId] = useState(progress.studentId || '');
  const [showCertificate, setShowCertificate] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS_DATA.length;
  const breakdown: ProgressBreakdown = calculateDetailedBreakdown(progress, totalQuestions);
  const eligibility = checkCertificateEligibility(progress, totalQuestions);

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(studentInputName, studentInputId);
  };

  const handlePrint = () => {
    window.print();
  };

  const certificateCode = generateCertificateCode(
    progress.studentName || 'ALUNO',
    new Date(progress.lastActiveTimestamp).toISOString(),
    progress.studentId
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Acompanhamento Individual & Comprovação
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
            Painel de Progresso & Comprovante
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            Seu progresso é gravado diretamente nos cookies do seu navegador móvel ou computador, funcionando de forma 100% offline e privada.
          </p>
        </div>

        {/* Botão de Destaque para abrir o Relatório Completo */}
        <button
          onClick={onOpenReportModal}
          className="px-4 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-sm font-semibold shadow-md flex items-center gap-2 transition-all hover:shadow-lg active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Abrir Relatório & Comprovante SIGAA</span>
        </button>
      </div>

      {/* Formulário de Identificação do Aluno (Nome + Matrícula) */}
      <StyledCard>
        <form onSubmit={handleSaveIdentity} className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Identificação do Estudante (FACISA / UFRN)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Preencha seu nome completo e matrícula para que apareçam devidamente identificados no comprovante e no certificado emitido para os docentes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="student-name-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Nome Completo:
              </label>
              <input
                id="student-name-input"
                type="text"
                value={studentInputName}
                onChange={(e) => setStudentInputName(e.target.value)}
                placeholder="Ex: Maria Clara de Medeiros Souza"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="student-id-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Matrícula UFRN:
              </label>
              <input
                id="student-id-input"
                type="text"
                value={studentInputId}
                onChange={(e) => setStudentInputId(e.target.value)}
                placeholder="Ex: 20240098765"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-700 text-white rounded-lg text-sm font-semibold hover:bg-indigo-800 transition-colors"
            >
              Salvar Identificação nos Cookies
            </button>
          </div>
        </form>
      </StyledCard>

      {/* Métricas de Progresso com Fórmula Balanceada (35% Teoria, 35% Casos, 30% Exercícios) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-slate-900">
            Fórmula de Avaliação Formativa Balanceada
          </h3>
          <span className="text-xs text-slate-500">
            Ponderação pedagógica acordada com a coordenação
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card Total */}
          <div className="p-4 bg-white border-2 border-indigo-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Aproveitamento Total</span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">100% Total</span>
            </div>
            <div className="text-3xl font-bold font-mono text-indigo-800">
              {breakdown.totalPct}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
              <div 
                className="bg-indigo-600 h-2" 
                style={{ width: `${(breakdown.theoryPct / 35) * 35}%` }} 
                title={`Teoria: ${breakdown.theoryPct}%`}
              />
              <div 
                className="bg-amber-500 h-2" 
                style={{ width: `${(breakdown.casesPct / 35) * 35}%` }} 
                title={`Casos: ${breakdown.casesPct}%`}
              />
              <div 
                className="bg-teal-500 h-2" 
                style={{ width: `${(breakdown.quizPct / 30) * 30}%` }} 
                title={`Quiz: ${breakdown.quizPct}%`}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {breakdown.totalPct >= 100 ? 'Todas as metas concluídas!' : `${breakdown.pendingTasks.length} pendência(s)`}
            </p>
          </div>

          {/* Card Teoria */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                1. Teoria & Leituras
              </span>
              <span className="text-[11px] font-bold text-indigo-600">Peso: 35%</span>
            </div>
            <div className="text-2xl font-bold font-mono text-indigo-700">
              {breakdown.theoryPct}% <span className="text-xs font-normal text-slate-400">/ 35%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(breakdown.theoryPct / 35) * 100}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">
              {breakdown.theoryCompletedCount}/{TOTAL_CURRICULUM_TOPICS} módulos · {breakdown.stagesCompletedCount}/{TOTAL_STAGES} estágios
            </p>
          </div>

          {/* Card Casos Clínicos */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-amber-600" />
                2. Casos Clínicos
              </span>
              <span className="text-[11px] font-bold text-amber-600">Peso: 35%</span>
            </div>
            <div className="text-2xl font-bold font-mono text-amber-700">
              {breakdown.casesPct}% <span className="text-xs font-normal text-slate-400">/ 35%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(breakdown.casesPct / 35) * 100}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">
              {breakdown.casesCompletedCount}/{TOTAL_CLINICAL_CASES} casos · {breakdown.dictionaryTermsCount} termos
            </p>
          </div>

          {/* Card Quiz */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                3. Exercícios & Fixação
              </span>
              <span className="text-[11px] font-bold text-teal-600">Peso: 30%</span>
            </div>
            <div className="text-2xl font-bold font-mono text-teal-700">
              {breakdown.quizPct}% <span className="text-xs font-normal text-slate-400">/ 30%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${(breakdown.quizPct / 30) * 100}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">
              {breakdown.quizAnsweredCount}/{totalQuestions} respondidas ({breakdown.quizCorrectCount} acertos)
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Pendências Formativas (se houver) */}
      {breakdown.pendingTasks.length > 0 && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Pendências para Concluir 100% da Carga de Estudo:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {breakdown.pendingTasks.map((task, i) => (
              <li key={i} className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certificado de Conclusão */}
      <StyledCard>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" />
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Certificado de Estudo Guiado · FACISA UFRN
              </h3>
              <p className="text-xs text-slate-500">
                Emissão formativa para comprovação de dedicação acadêmica no módulo de Erik Erikson.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReportModal}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Relatório Completo</span>
            </button>

            <button
              onClick={() => setShowCertificate(!showCertificate)}
              disabled={!eligibility.eligible}
              className="px-4 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-semibold hover:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {showCertificate ? 'Ocultar Certificado' : 'Visualizar Certificado'}
            </button>
          </div>
        </div>

        {!eligibility.eligible && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
            <strong>Requisito pendente para liberar certificado:</strong> {eligibility.reason}
          </div>
        )}

        {showCertificate && eligibility.eligible && (
          <div className="mt-6 space-y-4">
            <CertificatePaper id="certificate-print-area">
              <div className="space-y-4">
                <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                  Universidade Federal do Rio Grande do Norte — UFRN
                  <br />
                  Faculdade de Ciências da Saúde do Trairi — FACISA
                </div>

                <div className="text-2xl sm:text-3xl font-display font-bold text-indigo-950 uppercase tracking-tight pt-2">
                  Certificado de Estudo Guiado
                </div>

                <p className="text-xs text-slate-500 font-serif italic">
                  Certificamos para os devidos fins acadêmicos que
                </p>

                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900 border-b border-slate-300 pb-2 max-w-md mx-auto">
                  {progress.studentName || 'Estudante de Psicologia'}
                </div>

                {progress.studentId && (
                  <div className="text-xs font-mono text-slate-600">
                    Matrícula UFRN: {progress.studentId}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                  concluiu com êxito o programa de estudo guiado e laboratório prático da <strong>Teoria do Desenvolvimento Psicossocial de Erik Erikson</strong>, abordando os oito estágios do ciclo vital, aprofundamento na adolescência e identidade, modelo de James Marcia, U-MICS, metanálise contemporânea e normas do CFP, no âmbito da disciplina de <strong>Psicologia do Desenvolvimento II</strong>.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 max-w-md mx-auto text-xs text-slate-600 border-t border-slate-200">
                  <div>
                    <span className="block font-bold text-slate-800">Aproveitamento Total:</span>
                    <span>{breakdown.totalPct}% ponderado ({breakdown.quizCorrectCount} acertos nos exercícios)</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800">Código de Validação:</span>
                    <span className="font-mono text-[11px]">{certificateCode}</span>
                  </div>
                </div>

                <div className="pt-6 text-[10px] text-slate-400">
                  FACISA / UFRN · Santa Cruz/RN · Documento emitido localmente de forma estática e autêntica.
                </div>
              </div>
            </CertificatePaper>

            <div className="flex justify-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 inline-flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Salvar como PDF</span>
              </button>
            </div>
          </div>
        )}
      </StyledCard>

      {/* Gestão de Dados e Cookies */}
      <StyledCard>
        <div className="flex items-center gap-2 mb-2">
          <Cookie className="w-5 h-5 text-indigo-600" />
          <h3 className="font-display font-bold text-base text-slate-900">
            Gerenciamento do Armazenamento por Cookies (Offline)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          O aplicativo opera sem banco de dados externo ou servidor central. Seus dados estão salvos no cookie do seu navegador (chave: <code>facisa_ufrn_psicodev_progress</code>). Você pode exportar um backup para carregar em outro celular ou computador:
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onExportData}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Backup (JSON)</span>
          </button>

          <button
            onClick={() => setShowImportBox(!showImportBox)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restaurar Backup</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Tem certeza de que deseja resetar todo o seu progresso? Essa ação não pode ser desfeita.')) {
                onClearProgress();
              }
            }}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-rose-200 ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar Progresso</span>
          </button>
        </div>

        {showImportBox && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Cole o conteúdo JSON do seu backup aqui:
            </label>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full p-2 text-xs font-mono bg-white border border-slate-300 rounded focus:outline-none focus:border-indigo-500"
              placeholder="Cole o JSON exportado..."
            />
            <button
              onClick={() => {
                if (importJsonText) {
                  onImportData(importJsonText);
                  setShowImportBox(false);
                  setImportJsonText('');
                }
              }}
              className="px-3 py-1.5 bg-indigo-700 text-white text-xs font-semibold rounded hover:bg-indigo-800"
            >
              Aplicar Restauração
            </button>
          </div>
        )}
      </StyledCard>
    </div>
  );
};
