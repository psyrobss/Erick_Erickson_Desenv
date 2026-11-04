/**
 * @file MaterialsViewer.tsx
 * Material de Apoio Acadêmico, Bibliografia Comentada e Links Institucionais
 */

import React, { useState } from 'react';
import { SUPPORT_MATERIALS_DATA, AcademicSource } from '../../data/supportMaterialsData';
import { SATEPSI_GUIDELINES } from '../../data/clinicalPracticeData';
import { StyledCard, CalloutBox } from '../common/StyledComponents';
import { ExternalLink, BookOpen, Layers, ShieldCheck, Scale, FileText } from 'lucide-react';
import styled from 'styled-components';

export const MaterialsViewer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | 'all'>('all');

  const filteredSources = activeLayer === 'all'
    ? SUPPORT_MATERIALS_DATA
    : SUPPORT_MATERIALS_DATA.filter((s) => s.readingLayer === activeLayer);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
          Material Complementar
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
          Fontes Bibliográficas, Links & Metodologia
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl mt-1">
          Obras primárias de Erikson, artigos indexados na SciELO Brasil, metanálises internacionais e a regulamentação do CFP.
        </p>
      </div>

      {/* Guia de Estudo em 3 Camadas */}
      <StyledCard>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h3 className="font-display font-bold text-lg text-slate-900">
            Estratégia Pedagógica: Como Estudar Erikson em 3 Camadas
          </h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Para evitar anacronismos e confusões conceituais, a formação universitária em Psicologia do Desenvolvimento recomenda a leitura em três etapas progressivas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 block">
              1ª Camada: Erikson em seus próprios termos
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Obras Originais (1950–1982)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leitura de <em>Childhood and Society</em> e <em>Identity: Youth and Crisis</em>. Compreender a articulação entre psicanálise, antropologia e história sem resumos de terceira mão.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 block">
              2ª Camada: Operacionalizações Empíricas
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Marcia & Pesquisas Brasileiras</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paradigma de 4 estados de identidade (1966) e estudos pioneiros na SciELO Brasil sobre adolescentes do ensino médio.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 block">
              3ª Camada: Crítica Contemporânea
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Metanálises & Perspectiva Crítica</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modelos de ciclo duplo (U-MICS), metanálise de Potterton (2022), crítica sociológica da moratória (Oliveira, 2006) e diversidade étnico-racial.
            </p>
          </div>
        </div>
      </StyledCard>

      {/* Diretriz do CFP / SATEPSI */}
      <CalloutBox $type="academic">
        <div className="callout-title">
          <Scale className="w-5 h-5 text-indigo-700" />
          {SATEPSI_GUIDELINES.regulation} — Uso de Testes e Avaliação Psicológica
        </div>
        <div className="callout-body space-y-2 mt-1">
          <p>
            No Brasil, instrumentos utilizados privativamente por psicólogos com finalidade diagnóstica, pericial ou avaliativa oficial estão estritamente submetidos ao sistema <strong>SATEPSI</strong>.
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
            {SATEPSI_GUIDELINES.rules.map((rule, idx) => (
              <li key={idx} className="leading-relaxed">{rule}</li>
            ))}
          </ul>
        </div>
      </CalloutBox>

      {/* Filtro de Fontes */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Filtrar por camada de leitura:</span>
        <button
          onClick={() => setActiveLayer('all')}
          className={`px-2.5 py-1 text-xs rounded border ${
            activeLayer === 'all'
              ? 'bg-slate-900 text-white border-slate-900 font-semibold'
              : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveLayer(1)}
          className={`px-2.5 py-1 text-xs rounded border ${
            activeLayer === 1
              ? 'bg-indigo-700 text-white border-indigo-700 font-semibold'
              : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          1ª Camada (Originais)
        </button>
        <button
          onClick={() => setActiveLayer(2)}
          className={`px-2.5 py-1 text-xs rounded border ${
            activeLayer === 2
              ? 'bg-indigo-700 text-white border-indigo-700 font-semibold'
              : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          2ª Camada (Marcia & SciELO)
        </button>
        <button
          onClick={() => setActiveLayer(3)}
          className={`px-2.5 py-1 text-xs rounded border ${
            activeLayer === 3
              ? 'bg-indigo-700 text-white border-indigo-700 font-semibold'
              : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          3ª Camada (Metanálises & SATEPSI)
        </button>
      </div>

      {/* Lista de Referências */}
      <div className="space-y-3">
        {filteredSources.map((source) => (
          <StyledCard key={source.id}>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-indigo-700 font-mono">
                  {source.category} · Camada {source.readingLayer}
                </span>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    <span>Acessar Fonte</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="font-semibold text-slate-900 text-sm">
                {source.author} ({source.year}). <em>{source.title}</em>. {source.publication}.
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {source.annotation}
              </p>
            </div>
          </StyledCard>
        ))}
      </div>
    </div>
  );
};
