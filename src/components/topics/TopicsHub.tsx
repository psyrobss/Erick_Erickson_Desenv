/**
 * @file TopicsHub.tsx
 * Hub principal de tópicos de estudo da disciplina Psicologia do Desenvolvimento II
 */

import React, { useState } from 'react';
import { CURRICULUM_TOPICS, CurriculumTopic } from '../../data/curriculumTopics';
import { POTTERTON_METANALYSIS } from '../../data/metaAnalysisData';
import { CLINICAL_INTERVIEW_QUESTIONS, PARENTING_RECOMMENDATIONS } from '../../data/clinicalPracticeData';
import { StyledCard, CalloutBox } from '../common/StyledComponents';
import { 
  Compass, Layers, UserCheck, BarChart2, Briefcase, Award, 
  CheckCircle2, ArrowRight, ShieldAlert, Sparkles, BookOpen, HeartHandshake, HelpCircle
} from 'lucide-react';
import { ProfessorCallout } from '../gamification/ProfessorCallout';
import { StartHereHeroBanner } from './StartHereHeroBanner';
import { LessonMissionChecklist } from './LessonMissionChecklist';
import { ProgressBreakdown } from '../../types/progress';
import styled from 'styled-components';

const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

interface TopicsHubProps {
  completedTopics: string[];
  breakdown: ProgressBreakdown;
  studentName?: string;
  studentId?: string;
  onUpdateStudentInfo: (name: string, studentId: string) => void;
  onToggleCompleteTopic: (topicId: string) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenReportModal: () => void;
}

export const TopicsHub: React.FC<TopicsHubProps> = ({
  completedTopics,
  breakdown,
  studentName,
  studentId,
  onUpdateStudentInfo,
  onToggleCompleteTopic,
  onNavigateTab,
  onOpenReportModal,
}) => {
  const [selectedSubtopic, setSelectedSubtopic] = useState<'geral' | 'topico-1' | 'topico-4' | 'topico-5'>('geral');

  const getTopicIcon = (order: number) => {
    switch (order) {
      case 1: return <Compass className="w-5 h-5 text-indigo-600" />;
      case 2: return <Layers className="w-5 h-5 text-teal-600" />;
      case 3: return <UserCheck className="w-5 h-5 text-amber-600" />;
      case 4: return <BarChart2 className="w-5 h-5 text-rose-600" />;
      case 5: return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 6: return <Award className="w-5 h-5 text-emerald-600" />;
      default: return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  const handleTopicAction = (topic: CurriculumTopic) => {
    if (topic.id === 'topico-2') {
      onNavigateTab('estagios');
    } else if (topic.id === 'topico-3') {
      onNavigateTab('adolescencia');
    } else if (topic.id === 'topico-6') {
      onNavigateTab('casos');
    } else if (topic.id === 'topico-1' || topic.id === 'topico-4' || topic.id === 'topico-5') {
      setSelectedSubtopic(topic.id as any);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. BANNER GIGANTE: COMECE AQUI · GUIA DA SUA AULA */}
      <StartHereHeroBanner
        studentName={studentName}
        studentId={studentId}
        onUpdateStudentInfo={onUpdateStudentInfo}
        onStartJourney={() => onNavigateTab('estagios')}
        onOpenReportModal={onOpenReportModal}
      />

      {/* 2. TRILHA GUIADA COM CHECKLIST DE METAS DA AULA */}
      <LessonMissionChecklist
        breakdown={breakdown}
        onNavigateTab={onNavigateTab}
        onOpenReportModal={onOpenReportModal}
      />

      {/* 3. Orientação Pedagógica da Disciplina */}
      <ProfessorCallout
        title="Orientação de Estudo da Disciplina · Dinâmica da Aula"
        message="Seja bem-vindo à aula interativa de Psicologia do Desenvolvimento II! Esta plataforma foi estruturada para apoiar sua aprendizagem ativa: cada estágio estudado, caso clínico resolvido e exercício formativo garante pontos de XP e contribui para a sua auditoria no relatório final em PDF. Siga o checklist de metas acima para cumprir todas as etapas da aula."
        clinicalTip="Ao estudar cada crise psicossocial, pergunte-se: 'Como essa força ou fragilidade apareceria na queixa de um paciente que procura a clínica hoje?'. Essa ponte teórico-prática é o grande objetivo formativo da disciplina."
        examInsight="Atenção especial com o Princípio Epigenético: crises anteriores não desaparecem quando o sujeito avança de idade; elas permanecem ativas como alicerce de sustentação de todo o ciclo vital."
        xpRewardBadge="Rumo ao Nível 2"
      />

      {/* Guia Visual da Trilha em 4 Passos */}
      <div className="p-4 sm:p-5 bg-white border border-indigo-200/80 rounded-2xl shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
            Como Estudar nesta Aula: Trilha Recomendada em 4 Passos
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => onNavigateTab('estagios')}
            className="p-3 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-xl space-y-1 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 font-mono block">Passo 1 · 8 Estágios</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-slate-600 leading-snug">
              Explore o ciclo vital e teste a proporção dialética nos botões rápidos de 1 clique.
            </p>
            <span className="text-[11px] font-semibold text-indigo-600 group-hover:underline inline-block pt-1">
              Abrir Estágios & Simulador →
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('adolescencia')}
            className="p-3 bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-300 rounded-xl space-y-1 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-700 font-mono block">Passo 2 · James Marcia</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-slate-600 leading-snug">
              Teste os 4 casos prontos (Moratória, Pré-fechamento, Difusão e Conquista) e o ciclo U-MICS.
            </p>
            <span className="text-[11px] font-semibold text-teal-700 group-hover:underline inline-block pt-1">
              Abrir Matriz de Marcia →
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('casos')}
            className="p-3 bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 rounded-xl space-y-1 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-700 font-mono block">Passo 3 · Casos Clínicos</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-slate-600 leading-snug">
              Analise depoimentos de adolescentes e escolha a conduta clínica com feedback fundamentado.
            </p>
            <span className="text-[11px] font-semibold text-amber-700 group-hover:underline inline-block pt-1">
              Resolver Casos Clínicos →
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('flashcards')}
            className="p-3 bg-slate-50 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 rounded-xl space-y-1 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-700 font-mono block">Passo 4 · Revisão Ativa</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-slate-600 leading-snug">
              Vire os flashcards, responda ao simulado e gere seu certificado de aproveitamento salvo em cookies.
            </p>
            <span className="text-[11px] font-semibold text-purple-700 group-hover:underline inline-block pt-1">
              Praticar com Flashcards →
            </span>
          </button>
        </div>
      </div>

      {/* Grid dos 6 Módulos Curriculares */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-slate-900">
            Módulos Curriculares Detalhados
          </h2>
          <span className="text-xs text-slate-500">
            {completedTopics.length} de {CURRICULUM_TOPICS.length} concluídos
          </span>
        </div>

        <TopicGrid>
          {CURRICULUM_TOPICS.map((topic) => {
            const isCompleted = completedTopics.includes(topic.id);
            return (
              <StyledCard key={topic.id} $interactive onClick={() => handleTopicAction(topic)}>
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-50">
                        {topic.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompleteTopic(topic.id);
                        }}
                        className={`text-xs p-1 rounded-full ${
                          isCompleted ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={isCompleted ? 'Tópico concluído' : 'Marcar como concluído'}
                        aria-label={`Marcar tópico ${topic.order} como concluído`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {getTopicIcon(topic.order)}
                      <h3 className="font-display font-bold text-slate-900 text-base leading-snug">
                        {topic.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {topic.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Duração: ~{topic.durationMinutes} min</span>
                    <span className="font-semibold text-indigo-600 flex items-center gap-1">
                      Acessar <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </StyledCard>
            );
          })}
        </TopicGrid>
      </div>

      {/* Subseções Específicas: Tópico 1 (Fundamentos) */}
      {(selectedSubtopic === 'topico-1' || selectedSubtopic === 'geral') && (
        <StyledCard>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">
                Módulo 1: Fundamentos Históricos & Arquitetura Epigenética
              </h3>
            </div>
            <button
              onClick={() => onToggleCompleteTopic('topico-1')}
              className={`text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1 ${
                completedTopics.includes('topico-1')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedTopics.includes('topico-1') ? 'Concluído' : 'Concluir Módulo'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">
                A Ruptura Desenvolvimental com Freud
              </h4>
              <p>
                Erik Homburger Erikson (1902–1994) propôs que o desenvolvimento não termina na infância, estendendo-se por todo o ciclo vital. Em contraste com a visão preponderantemente pulsional e intrapsíquica da tradição freudiana, Erikson atribuiu peso central às relações sociais, à história, às exigências da cultura e aos modos como cada sociedade acolhe o indivíduo.
              </p>
              <p>
                Em Yale e Berkeley, o contato com a antropologia cultural e suas observações dos povos <em>Oglala Sioux</em> consolidaram a certeza de que a psicologia humana não pode ser compreendida descolada de suas condições ambientais e socioculturais.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">
                O Princípio Epigenético e a Definição de Crise
              </h4>
              <p>
                A palavra <strong>“crise”</strong> em Erikson não é equivalente a doença psiquiátrica ou colapso. É uma <strong>tensão desenvolvimental estruturante</strong> entre dois polos dialéticos. A resolução adaptativa não elimina o polo negativo: o objetivo é alcançar um equilíbrio dinâmico favorável que permita a emergência de uma <strong>virtude ou força do ego</strong> (esperança, vontade, propósito, competência, fidelidade, amor, cuidado e sabedoria).
              </p>
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-indigo-950">
                <strong>Heurística, não determinismo:</strong> As idades associadas aos estágios são aproximações pedagógicas; problemas de confiança, identidade ou intimidade podem ser revisitados e reestruturados mais tarde na vida.
              </div>
            </div>
          </div>
        </StyledCard>
      )}

      {/* Subseções Específicas: Tópico 4 (Evidências & Metanálise) */}
      {(selectedSubtopic === 'topico-4' || selectedSubtopic === 'geral') && (
        <StyledCard>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-rose-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">
                Módulo 4: Evidências Científicas & Metanálise de Potterton et al. (2022)
              </h3>
            </div>
            <button
              onClick={() => onToggleCompleteTopic('topico-4')}
              className={`text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1 ${
                completedTopics.includes('topico-4')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedTopics.includes('topico-4') ? 'Concluído' : 'Concluir Módulo'}
            </button>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
            A revisão sistemática e metanálise de Potterton et al. (2022), publicada no <em>Journal of Youth and Adolescence</em>, investigou longitudinalmente 20 estudos envolvendo 13.787 participantes sobre a síntese/confusão de identidade e sintomas de depressão, ansiedade e transtornos alimentares.
          </p>

          {/* Métricas da Metanálise em Cards Didáticos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {POTTERTON_METANALYSIS.metrics.map((m, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  {m.studyCount} estudos ({m.participantsCount.toLocaleString('pt-BR')} sujeitos)
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{m.outcome}</h4>
                <div className="text-base font-bold font-mono text-indigo-700">
                  SMD = {m.smd > 0 ? `+${m.smd}` : m.smd}
                  <span className="text-xs text-slate-500 font-normal ml-1">
                    (IC95% [{m.ciLower}; {m.ciUpper}])
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  <strong>Interpretação:</strong> {m.interpretation}
                </div>
                <div className="text-[11px] text-indigo-950 bg-indigo-50/50 p-2 rounded">
                  {m.scientificMeaning}
                </div>
              </div>
            ))}
          </div>

          {/* Cautelas Epistemológicas Fundamentais */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Cautelas Epistemológicas para Estudantes de Psicologia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {POTTERTON_METANALYSIS.epistemologicalCautions.map((c, idx) => (
                <div key={idx} className="p-3 bg-rose-50/60 border border-rose-200 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-rose-900 block">{c.rule}</span>
                  <p className="text-rose-950/80 leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </StyledCard>
      )}

      {/* Subseções Específicas: Tópico 5 (Prática Clínica & Pais) */}
      {(selectedSubtopic === 'topico-5' || selectedSubtopic === 'geral') && (
        <StyledCard>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">
                Módulo 5: Prática Clínica, Educadores & Orientações Parentais
              </h3>
            </div>
            <button
              onClick={() => onToggleCompleteTopic('topico-5')}
              className={`text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1 ${
                completedTopics.includes('topico-5')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedTopics.includes('topico-5') ? 'Concluído' : 'Concluir Módulo'}
            </button>
          </div>

          {/* Roteiro Clínico em 7 Dimensões */}
          <div className="space-y-3 mb-6">
            <h4 className="font-bold text-slate-900 text-sm">
              Roteiro de Investigação Clínica: O que perguntar em vez de "em qual estágio está?"
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CLINICAL_INTERVIEW_QUESTIONS.map((cq) => (
                <div key={cq.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900 text-xs">{cq.dimension}</span>
                  </div>
                  <p className="font-serif italic text-slate-800 text-sm">{cq.question}</p>
                  <p className="text-slate-600 leading-snug">
                    <strong>Objetivo:</strong> {cq.clinicalObjective}
                  </p>
                  <div className="text-[11px] text-rose-800 bg-rose-50 p-1.5 rounded">
                    <strong>Alerta Clínico:</strong> {cq.redFlags}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendações Parentais */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">
              Guia Prático para Pais e Educadores: Substituições Desenvolvimentais Produtivas
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="p-2.5">Em vez de...</th>
                    <th className="p-2.5">É mais produtivo...</th>
                    <th className="p-2.5">Justificativa Desenvolvimental</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {PARENTING_RECOMMENDATIONS.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 text-rose-900 font-medium">{r.insteadOf}</td>
                      <td className="p-2.5 text-emerald-900 font-medium">{r.moreProductive}</td>
                      <td className="p-2.5 text-slate-600">{r.developmentalRationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </StyledCard>
      )}
    </div>
  );
};
