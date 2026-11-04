/**
 * @file AdolescenceModule.tsx
 * Tópico 3: Adolescência em Profundidade
 * Paradigma de James Marcia interativo, Modelo U-MICS e Fatores Contextuais
 */

import React, { useState } from 'react';
import { MARCIA_STATUSES_DATA, IDENTITY_DOMAINS, UMICS_DIMENSIONS, CONTEXTUAL_FACTORS_DATA } from '../../data/adolescenceDeepData';
import { classifyMarciaStatus } from '../../utils/marciaClassifier';
import { MarciaStatusId } from '../../types/adolescence';
import { SectionHeader, StyledCard, CalloutBox } from '../common/StyledComponents';
import { InteractionGuide } from '../common/InteractionGuide';
import { Compass, Repeat, Users, ShieldAlert, BookOpen, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { ProfessorCallout } from '../gamification/ProfessorCallout';
import styled from 'styled-components';

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const QuadrantBox = styled.div<{ $active?: boolean; $color: string }>`
  padding: 1.25rem;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.$active ? props.$color : '#e2e8f0')};
  background-color: ${(props) => (props.$active ? `${props.$color}10` : '#ffffff')};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.$color};
  }
`;

interface AdolescenceModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const AdolescenceModule: React.FC<AdolescenceModuleProps> = ({
  isCompleted,
  onToggleComplete,
}) => {
  // Simulador de Marcia
  const [exploration, setExploration] = useState<number>(75);
  const [commitment, setCommitment] = useState<number>(70);
  const [activeTab, setActiveTab] = useState<'marcia' | 'umics' | 'dominios' | 'contexto'>('marcia');

  const classified = classifyMarciaStatus(exploration, commitment);

  return (
    <div className="space-y-8">
      {/* Header do Módulo */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Tópico 3 · Foco Aprofundado
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
            Adolescência: Identidade versus Confusão de Papéis
          </h2>
          <p className="text-slate-600 text-sm max-w-3xl mt-1">
            A síntese desenvolvimental entre identificações infantis, capacidades emergentes e o reconhecimento social da cultura. Compreenda o paradigma de James Marcia, o modelo de ciclo duplo da U-MICS e os determinantes socioculturais.
          </p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
          }`}
          title="Salvar conclusão do tópico 3 nos cookies"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Módulo Concluído (+25 XP)' : 'Marcar como Concluído (+25 XP)'}</span>
        </button>
      </div>

      {/* Orientação Pedagógica da Disciplina */}
      <ProfessorCallout
        title="Orientação da Disciplina · Adolescência & Paradigma de James Marcia"
        message="A crise da adolescência não representa disfunção: configura a moratória necessária para que o indivíduo experimente papéis antes de consolidar compromissos adultos. Utilize o simulador interativo abaixo para observar como os eixos de Crise (Exploração) e Compromisso interagem dinamicamente."
        clinicalTip="Na clínica de adolescentes, cuidado com o diagnóstico apressado: a oscilação entre moratória e pré-fechamento (ciclo MAMA) é sinal de plasticidade e saúde, não de transtorno de personalidade."
        examInsight="Conteúdo fundamental para avaliações teóricas: James Marcia operacionalizou Erikson em 4 status: Difusão (baixa exploração / baixo compromisso), Pré-fechamento (baixo / alto), Moratória (alto / baixo) e Identidade Alcançada (alto / alto)."
        xpRewardBadge="Conteúdo Central"
      />

      {/* Subnavegação de Abas */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl max-w-max">
        <button
          onClick={() => setActiveTab('marcia')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'marcia'
              ? 'bg-white text-indigo-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Paradigma de Marcia (Simulador)
        </button>
        <button
          onClick={() => setActiveTab('umics')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'umics'
              ? 'bg-white text-indigo-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Modelo U-MICS & Ciclo Duplo
        </button>
        <button
          onClick={() => setActiveTab('dominios')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'dominios'
              ? 'bg-white text-indigo-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Os 9 Domínios da Identidade
        </button>
        <button
          onClick={() => setActiveTab('contexto')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'contexto'
              ? 'bg-white text-indigo-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Fatores Contextuais (Classe, Raça, Redes)
        </button>
      </div>

      {/* ABA 1: PARADIGMA DE JAMES MARCIA COM SIMULADOR INTERATIVO */}
      {activeTab === 'marcia' && (
        <div className="space-y-6">
          <InteractionGuide
            title="Como Interagir com o Simulador de James Marcia"
            steps={[
              {
                number: 1,
                instruction: 'Clique nos botões de Casos Prontos abaixo ou arraste as barras de Exploração e Compromisso.',
              },
              {
                number: 2,
                instruction: 'Veja como o quadrante correspondente (Difusão, Pré-fechamento, Moratória ou Alcançada) se acende em tempo real.',
              },
              {
                number: 3,
                instruction: 'Leia a cautela clínica e o lema característico de cada estado para entender o raciocínio diagnóstico.',
              },
            ]}
          />

          <StyledCard>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">
                Laboratório Interativo: Os Quatro Estados de Identidade de Marcia (1966)
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              James Marcia operacionalizou a crise eriksoniana cruzando duas variáveis contínuas: <strong>Exploração</strong> (busca ativa e questionamento) e <strong>Compromisso</strong> (escolhas relativamente firmes).
            </p>

            {/* Botões Rápidos de Casos Estudantis */}
            <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl mb-6 space-y-2">
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                💡 Testar Casos Clínicos Prontos (Clique para classificar):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => { setExploration(80); setCommitment(20); }}
                  className="p-2 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg text-left text-xs transition-colors"
                >
                  <span className="font-bold text-sky-800 block">🔹 Caso Moratória</span>
                  <span className="text-slate-600 text-[11px]">Explorando cursos sem decidir ainda (80% / 20%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setExploration(15); setCommitment(85); }}
                  className="p-2 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg text-left text-xs transition-colors"
                >
                  <span className="font-bold text-amber-800 block">🔸 Caso Pré-fechamento</span>
                  <span className="text-slate-600 text-[11px]">Seguindo a profissão dos pais sem questionar (15% / 85%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setExploration(20); setCommitment(15); }}
                  className="p-2 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg text-left text-xs transition-colors"
                >
                  <span className="font-bold text-slate-700 block">▪️ Caso Difusão</span>
                  <span className="text-slate-600 text-[11px]">Sem rumo nem busca no momento (20% / 15%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setExploration(85); setCommitment(80); }}
                  className="p-2 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg text-left text-xs transition-colors"
                >
                  <span className="font-bold text-emerald-800 block">🟢 Identidade Alcançada</span>
                  <span className="text-slate-600 text-[11px]">Refletiu, pesquisou e firmou seu propósito (85% / 80%)</span>
                </button>
              </div>
            </div>

            <MatrixGrid>
              {/* Sliders Interativos */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-5">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <label htmlFor="exploration-slider">Dimensão 1: Exploração (Crise / Busca Ativa)</label>
                    <span className="font-mono text-indigo-700 text-sm font-bold">{exploration}%</span>
                  </div>
                  <input
                    id="exploration-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={exploration}
                    onChange={(e) => setExploration(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Baixa Exploração (&lt; 50%)</span>
                    <span>Alta Exploração (≥ 50%)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <label htmlFor="commitment-slider">Dimensão 2: Compromisso (Adesão / Decisão)</label>
                    <span className="font-mono text-teal-700 text-sm font-bold">{commitment}%</span>
                  </div>
                  <input
                    id="commitment-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={commitment}
                    onChange={(e) => setCommitment(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Baixo Compromisso (&lt; 50%)</span>
                    <span>Alto Compromisso (≥ 50%)</span>
                  </div>
                </div>

                {/* Resultado Classificado em Tempo Real */}
                <div className="p-4 bg-white border border-indigo-200 rounded-lg space-y-2">
                  <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                    Classificação Resultante
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {classified.name}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {classified.shortExplanation}
                  </p>
                  <div className="text-xs italic text-indigo-900 bg-indigo-50/70 p-2.5 rounded border border-indigo-100">
                    <strong>Lema Característico:</strong> {classified.didacticMotto}
                  </div>
                  <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                    <strong>Cautela Clínica:</strong> {classified.clinicalPrecaution}
                  </div>
                </div>
              </div>

              {/* Matriz 2x2 dos 4 Quadrantes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MARCIA_STATUSES_DATA.map((status) => {
                  const isActive = classified.statusId === status.id;
                  const colorMap = {
                    difusao: '#64748b',
                    pre_fechamento: '#d97706',
                    moratoria: '#0284c7',
                    identidade_alcancada: '#059669',
                  };
                  return (
                    <QuadrantBox
                      key={status.id}
                      $active={isActive}
                      $color={colorMap[status.id]}
                      onClick={() => {
                        if (status.id === 'difusao') { setExploration(25); setCommitment(25); }
                        if (status.id === 'pre_fechamento') { setExploration(25); setCommitment(75); }
                        if (status.id === 'moratoria') { setExploration(75); setCommitment(25); }
                        if (status.id === 'identidade_alcancada') { setExploration(75); setCommitment(75); }
                      }}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span style={{ color: colorMap[status.id] }}>
                          {status.name.split(' (')[0]}
                        </span>
                        {isActive && (
                          <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-mono">
                            ATIVO
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mb-2">
                        Exploração: <strong>{status.exploration}</strong> · Compromisso: <strong>{status.commitment}</strong>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-snug">
                        {status.description}
                      </p>
                    </QuadrantBox>
                  );
                })}
              </div>
            </MatrixGrid>
          </StyledCard>

          <CalloutBox $type="caution">
            <div className="callout-title">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Princípio Fundamental: Certeza NÃO é sinônimo de Maturidade!
            </div>
            <div className="callout-body">
              Um dos maiores erros na leitura leiga de Erikson é supor que um adolescente que parece absolutamente decidido sobre sua profissão aos 15 anos é necessariamente "mais maduro". Ele pode estar em <strong>Pré-fechamento (Foreclosure)</strong>, repetindo acriticamente um modelo familiar sem apropriação reflexiva. Da mesma forma, estar em <strong>Moratória</strong> (questionando, explorando e mudando de ideia) é um comportamento normativo e saudável, não uma patologia psiquiátrica.
            </div>
          </CalloutBox>
        </div>
      )}

      {/* ABA 2: MODELO U-MICS E CICLO DUPLO */}
      {activeTab === 'umics' && (
        <div className="space-y-6">
          <StyledCard>
            <div className="flex items-center gap-2 mb-2">
              <Repeat className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">
                Modelo U-MICS & Ciclo Duplo (Crocetti, Rubini & Meeus, 2008)
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              A pesquisa moderna superou a visão de que a identidade seria conquistada uma única vez para sempre na adolescência. O modelo U-MICS propõe que a identidade envolve dois ciclos recorrentes e três dimensões contínuas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {UMICS_DIMENSIONS.map((dim, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-xs font-mono font-bold text-indigo-700">
                    Dimensão {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{dim.namePt}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{dim.description}</p>
                  <div className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-700 italic">
                    {dim.questionPrompt}
                  </div>
                  <div className="text-[11px] text-teal-800 bg-teal-50 p-2 rounded border border-teal-100">
                    <strong>Relevância:</strong> {dim.clinicalRelevance}
                  </div>
                </div>
              ))}
            </div>

            {/* Ciclos MAMA */}
            <div className="mt-8 p-5 bg-indigo-50/50 border border-indigo-200 rounded-xl">
              <h4 className="font-bold text-indigo-950 text-sm mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-700" />
                Os Ciclos MAMA na Adultez (Moratória → Realização → Moratória → Realização)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Estudos longitudinais de acompanhamento por 11 anos (Meeus et al.) constataram que adultos passam por novos ciclos de moratória diante de transições vitais como migração, divórcio, paternidade/maternidade ou mudança de carreira. Portanto, a identidade é um <strong>processo de gestão contínua de compromissos</strong>, e não uma estrutura estática imutável.
              </p>
            </div>
          </StyledCard>
        </div>
      )}

      {/* ABA 3: OS 9 DOMÍNIOS DA IDENTIDADE */}
      {activeTab === 'dominios' && (
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            A pergunta eriksoniana central <em>“Quem sou eu?”</em> desdobra-se em 9 domínios práticos de investigação clínica e desenvolvimental:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {IDENTITY_DOMAINS.map((dom, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                <div className="text-xs font-mono font-bold text-indigo-700">
                  Domínio {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{dom.domain}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{dom.explanation}</p>
                <div className="space-y-1 pt-1">
                  {dom.characteristicQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="text-xs italic text-indigo-950 font-serif">
                      {q}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <strong>Impacto do Contexto:</strong> {dom.contextImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 4: FATORES CONTEXTUAIS */}
      {activeTab === 'contexto' && (
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Nenhuma identidade se forma no vácuo. Cultura, classe social, gênero, raça/etnia e ambiente digital condicionam quais identidades são reconhecidas, valorizadas ou estigmatizadas pela sociedade:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTEXTUAL_FACTORS_DATA.map((fac, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  {fac.title}
                </h4>
                <p className="text-xs font-semibold text-slate-700">{fac.summary}</p>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  {fac.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded text-[11px] text-slate-600">
                  <strong>Evidência Científica:</strong> {fac.scientificEvidence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
