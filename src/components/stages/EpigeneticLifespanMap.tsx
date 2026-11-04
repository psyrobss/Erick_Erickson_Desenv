/**
 * @file EpigeneticLifespanMap.tsx
 * Mapa Interativo do Ciclo Vital e Simulador Dialético de Tensão Psicossocial
 * Substitui o 3D por uma experiência pedagógica altamente atrativa, funcional e relevante
 */

import React, { useState } from 'react';
import { STAGES_DATA } from '../../data/stagesData';
import { PsychosocialStage, StageId } from '../../types/stage';
import { InteractionGuide } from '../common/InteractionGuide';
import { 
  Sliders, ArrowRight, CheckCircle2, HeartHandshake, HelpCircle, 
  Sparkles, GitCompare, RefreshCw, Layers, ShieldCheck, MousePointerClick
} from 'lucide-react';
import styled, { css } from 'styled-components';

const MapContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
`;

const StageTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const StageStepButton = styled.button<{ $active: boolean; $color: string; $isDone: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? props.$color : '#e2e8f0')};
  background-color: ${(props) => (props.$active ? `${props.$color}12` : '#f8fafc')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 100px;
  position: relative;

  &:hover {
    border-color: ${(props) => props.$color};
    background-color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  .step-num {
    font-size: 0.75rem;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    color: ${(props) => (props.$active ? props.$color : '#64748b')};
  }

  .step-title {
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.25;
    color: #0f172a;
    margin: 0.25rem 0;
  }

  .step-virtue {
    font-size: 0.6875rem;
    font-weight: 600;
    color: ${(props) => props.$color};
    background-color: #ffffff;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }
`;

const SimulatorBox = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 14px;
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

interface EpigeneticLifespanMapProps {
  selectedStageId: StageId;
  onSelectStage: (id: StageId) => void;
  completedStages: string[];
}

export const EpigeneticLifespanMap: React.FC<EpigeneticLifespanMapProps> = ({
  selectedStageId,
  onSelectStage,
  completedStages,
}) => {
  // Simulador de Tensão Dialética (0 a 100% no polo positivo)
  const [balance, setBalance] = useState<number>(75);
  const [comparisonStageId, setComparisonStageId] = useState<StageId>(1);
  const [activeSubMode, setActiveSubMode] = useState<'simulador' | 'comparador'>('simulador');

  const currentStage = STAGES_DATA.find((s) => s.id === selectedStageId) || STAGES_DATA[4];
  const comparisonStage = STAGES_DATA.find((s) => s.id === comparisonStageId) || STAGES_DATA[0];

  // Cálculo da síntese dialética em Erikson
  const getDialecticalFeedback = (ratio: number) => {
    if (ratio >= 65 && ratio <= 85) {
      return {
        status: 'Ótimo / Equilíbrio Adaptativo',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        virtueActive: true,
        summary: `Predomínio suficientemente adaptativo do polo positivo (${currentStage.crisis.positive}) acompanhado de cautela adaptativa (${currentStage.crisis.negative}).`,
        consequence: `Permite a emergência estável da virtude do ego: "${currentStage.virtue}". O sujeito desenvolve segurança sem ingenuidade absoluta.`,
      };
    }
    if (ratio > 85) {
      return {
        status: 'Polo Positivo Exagerado / Risco de Ingenuidade',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        virtueActive: false,
        summary: `Tentativa ilusória de eliminar 100% da ${currentStage.crisis.negative}. Erikson ressalta que o polo negativo nunca é zero.`,
        consequence: `Gera vulnerabilidade e impulsividade desprotegida (ex: confiar cegamente em qualquer estranho ou agir sem limites realistas).`,
      };
    }
    return {
      status: 'Polo Negativo Predominante / Fragilidade Desenvolvimental',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      virtueActive: false,
      summary: `A tensão inclinou-se excessivamente para ${currentStage.crisis.negative} (${100 - ratio}%).`,
      consequence: `Dificuldade na emergência da virtude "${currentStage.virtue}". Pode manifestar-se como medo, inibição, vergonha ou paralisia da agência.`,
    };
  };

  const dialectics = getDialecticalFeedback(balance);

  return (
    <MapContainer>
      {/* 1. Instruções Claras de Como Interagir */}
      <InteractionGuide
        title="Como interagir nesta seção (Guia Rápido)"
        steps={[
          {
            number: 1,
            instruction: 'Clique em um dos 8 cartões coloridos abaixo para carregar o estágio que deseja estudar.',
          },
          {
            number: 2,
            instruction: 'No Simulador de Tensão, arraste o controle deslizante (ou clique nos botões de atalho) para testar o equilíbrio entre os dois polos.',
          },
          {
            number: 3,
            instruction: 'Role a página para ler os exemplos do cotidiano e os casos hipotéticos clínicos daquele estágio.',
          },
        ]}
      />

      {/* Cabeçalho da Trilha */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            Passo 1: Selecione o Estágio do Ciclo Vital
          </span>
          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mt-0.5">
            Trilha Epigenética dos 8 Estágios
          </h3>
          <p className="text-xs text-slate-500">
            Clique em qualquer cartão abaixo para inspecionar os detalhes pedagógicos:
          </p>
        </div>

        {/* Alternador de ferramentas pedagógicas */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveSubMode('simulador')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeSubMode === 'simulador'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulador de Tensão</span>
          </button>
          <button
            onClick={() => setActiveSubMode('comparador')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeSubMode === 'comparador'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Comparador Epigenético</span>
          </button>
        </div>
      </div>

      {/* Grade dos 8 Estágios em Formato de Trilha */}
      <StageTrack role="tablist" aria-label="Estágios de Erikson">
        {STAGES_DATA.map((stage) => {
          const isActive = stage.id === selectedStageId;
          const isDone = completedStages.includes(`estagio-${stage.id}`);
          const shortName = stage.name.split(' versus ')[0];

          return (
            <StageStepButton
              key={stage.id}
              role="tab"
              aria-selected={isActive}
              $active={isActive}
              $color={stage.color}
              $isDone={isDone}
              onClick={() => {
                onSelectStage(stage.id);
                setBalance(75);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="step-num">{stage.id}º</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {stage.agePeriod.split(' ')[0]}
                  </span>
                )}
              </div>
              <div className="step-title">
                {shortName}
              </div>
              <div className="step-virtue">
                {stage.virtue}
              </div>
            </StageStepButton>
          );
        })}
      </StageTrack>

      {/* FERRAMENTA 1: SIMULADOR DIALÉTICO DE TENSÃO COM BOTÕES PRÉ-DEFINIDOS */}
      {activeSubMode === 'simulador' && (
        <SimulatorBox>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 mb-3">
            <div>
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Passo 2: Simule a Tensão Dialética do {currentStage.id}º Estágio
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                {currentStage.crisis.positive} × {currentStage.crisis.negative}
              </h4>
            </div>

            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dialectics.badgeColor}`}>
              {dialectics.status}
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Uma crise psicossocial é uma <strong>tensão dinâmica</strong> entre dois polos, nunca a eliminação cega de um deles. Arraste a barra ou use os atalhos abaixo para experimentar os diferentes equilíbrios:
          </p>

          {/* Atalhos Rápidos com 1 Clique */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-700">Testar Cenários com 1 Clique:</span>
            <button
              type="button"
              onClick={() => setBalance(30)}
              className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                balance === 30 ? 'bg-rose-100 text-rose-800 border-rose-400 font-bold' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              🚨 Fragilidade (30% Positivo / 70% Negativo)
            </button>
            <button
              type="button"
              onClick={() => setBalance(75)}
              className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                balance === 75 ? 'bg-emerald-100 text-emerald-800 border-emerald-400 font-bold' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              ✨ Equilíbrio Ótimo (75% Positivo / 25% Negativo)
            </button>
            <button
              type="button"
              onClick={() => setBalance(95)}
              className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                balance === 95 ? 'bg-amber-100 text-amber-800 border-amber-400 font-bold' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              ⚠️ Ingenuidade Excessiva (95% Positivo / 5% Negativo)
            </button>
          </div>

          {/* Slider Dialético com Guias Visuais */}
          <div className="space-y-2 mb-4 p-3 bg-white/80 rounded-xl border border-indigo-100">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-emerald-800">
                Polo Positivo ({currentStage.crisis.positive}): <strong>{balance}%</strong>
              </span>
              <span className="text-rose-800">
                Polo Negativo ({currentStage.crisis.negative}): <strong>{100 - balance}%</strong>
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min="10"
                max="95"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg cursor-pointer accent-indigo-700"
                aria-label={`Equilíbrio entre ${currentStage.crisis.positive} e ${currentStage.crisis.negative}`}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
              <span>◄ Arraste para a esquerda (predomínio negativo)</span>
              <span className="font-semibold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Faixa Saudável: 65% a 85%
              </span>
              <span>Arraste para a direita (predomínio positivo) ►</span>
            </div>
          </div>

          {/* Diagnóstico Pedagógico do Equilíbrio */}
          <div className="p-3.5 bg-white border border-indigo-200 rounded-xl space-y-2 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <HeartHandshake className={`w-4 h-4 ${dialectics.virtueActive ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span className="font-bold text-slate-900">
                O que acontece com a Força do Ego (Virtude: "{currentStage.virtue}")?
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {dialectics.summary}
            </p>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800 leading-relaxed">
              <strong>Implicação Psicológica:</strong> {dialectics.consequence}
            </div>
          </div>
        </SimulatorBox>
      )}

      {/* FERRAMENTA 2: COMPARADOR EPIGENÉTICO DE ESTÁGIOS */}
      {activeSubMode === 'comparador' && (
        <SimulatorBox>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 mb-4">
            <div>
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                <GitCompare className="w-4 h-4 text-indigo-600" />
                Comparador de Encadeamento Epigenético
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                Como as crises anteriores sustentam ou desestabilizam as posteriores?
              </h4>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600 font-medium">Comparar com:</span>
              <select
                value={comparisonStageId}
                onChange={(e) => setComparisonStageId(Number(e.target.value) as StageId)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
              >
                {STAGES_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}º Estágio ({s.virtue})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-indigo-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-700 font-mono">
                  Estágio A: {currentStage.id}º Estágio
                </span>
                <span className="text-[11px] bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded font-semibold">
                  {currentStage.virtue}
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900">{currentStage.name}</div>
              <p className="text-slate-600 leading-relaxed">{currentStage.overview}</p>
              <div className="text-slate-700 italic border-t pt-2 border-slate-100">
                <strong>Pergunta Central:</strong> {currentStage.developmentalQuestion}
              </div>
            </div>

            <div className="p-4 bg-white border border-teal-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-700 font-mono">
                  Estágio B: {comparisonStage.id}º Estágio
                </span>
                <span className="text-[11px] bg-teal-50 text-teal-900 px-2 py-0.5 rounded font-semibold">
                  {comparisonStage.virtue}
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900">{comparisonStage.name}</div>
              <p className="text-slate-600 leading-relaxed">{comparisonStage.overview}</p>
              <div className="text-slate-700 italic border-t pt-2 border-slate-100">
                <strong>Pergunta Central:</strong> {comparisonStage.developmentalQuestion}
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white border border-indigo-100 rounded-lg text-xs text-indigo-950 leading-relaxed">
            <strong>Relação Epigenética:</strong> {currentStage.id < comparisonStage.id 
              ? `O estágio ${currentStage.id} (${currentStage.virtue}) é um alicerce necessário para que o sujeito chegue ao estágio ${comparisonStage.id} (${comparisonStage.virtue}) com recursos psíquicos suficientes.`
              : currentStage.id > comparisonStage.id
              ? `As dificuldades sentidas no estágio ${currentStage.id} (${currentStage.virtue}) frequentemente exigem revisitar e retrabalhar os nós desenvolvimentais do estágio ${comparisonStage.id} (${comparisonStage.virtue}).`
              : 'Você está visualizando o mesmo estágio nos dois painéis.'}
          </div>
        </SimulatorBox>
      )}
    </MapContainer>
  );
};
