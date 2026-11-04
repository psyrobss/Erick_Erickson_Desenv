/**
 * @file DictionaryViewer.tsx
 * Dicionário Psicossocial de Erik Erikson com distinções conceituais claras
 */

import React, { useState } from 'react';
import { DICTIONARY_DATA } from '../../data/dictionaryData';
import { GlossaryTerm } from '../../types/dictionary';
import { StyledCard } from '../common/StyledComponents';
import { Search, BookA, CheckCircle, XCircle, ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import { InteractionGuide } from '../common/InteractionGuide';
import { ProfessorCallout } from '../gamification/ProfessorCallout';
import { soundService } from '../../services/soundService';
import styled from 'styled-components';

const DistinctionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const DictionaryViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos os Termos' },
    { id: 'Conceito Fundamental', label: 'Conceitos Fundamentais' },
    { id: 'Estados de Marcia', label: 'Estados de Marcia' },
    { id: 'Processos Modernos', label: 'Processos Modernos (U-MICS/MAMA)' },
    { id: 'Contexto Sociocultural', label: 'Contexto Sociocultural' },
    { id: 'Metodologia & Clínica', label: 'Metodologia & SATEPSI' },
  ];

  const filteredTerms = DICTIONARY_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatItMeans.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatItDoesNotMean.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
          Material de Apoio
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
          Dicionário & Glossário Psicossocial de Erikson
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl mt-1">
          Conceitos operacionais, distinções terminológicas rigorosas e alerta contra distorções conceituais comuns no estudo da Psicologia do Desenvolvimento.
        </p>
      </div>

      {/* Orientação Pedagógica da Disciplina */}
      <ProfessorCallout
        title="Orientação da Disciplina · Rigor Conceitual & Distinções Terminológicas"
        message="Atenção especial com os 'falsos sinônimos' na psicologia do desenvolvimento: 'Moratória' não significa procrastinação, e 'Crise' não se confunde com colapso patológico. Utilize este dicionário para calibrar seu vocabulário acadêmico e ganhe +10 XP por conceito examinado."
        clinicalTip="Na prática profissional, a precisão conceitual previne anacronismos e rotulações equivocadas. Observe atentamente a seção 'O que NÃO significa' em cada verbete."
        examInsight="Ponto crítico em avaliações acadêmicas: distinguir com clareza Difusão de Identidade de Moratória. Na moratória há exploração ativa e busca de valores; na difusão há apatia, ausência de busca e falta de compromisso."
        xpRewardBadge="+10 XP por termo"
      />

      {/* Guia de Interação Passo a Passo */}
      <InteractionGuide
        title="Como Explorar o Dicionário & Evitar Erros Conceituais"
        steps={[
          {
            number: 1,
            title: 'Busque ou Filtre por Categoria',
            instruction: 'Digite um termo na caixa de busca ou clique nas tags de categorias temáticas.',
          },
          {
            number: 2,
            title: 'Compare "O Que Significa" vs "O Que NÃO Significa"',
            instruction: 'Cada verbete contrasta a definição acadêmica precisa com o erro popular de interpretação (ex: Crise não é colapso mental).',
          },
          {
            number: 3,
            title: 'Acesse Termos Relacionados',
            instruction: 'Clique nas tags de termos correlatos para pular diretamente para conceitos complementares.',
          },
        ]}
        tip="Em provas acadêmicas e na prática clínica, atente-se sempre para o box vermelho 'O que NÃO significa', que previne anacronismos diagnósticos."
      />

      {/* Barra de Pesquisa e Filtros */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar termo, definição ou autor (ex: Moratória, U-MICS, Crise, SATEPSI)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            aria-label="Pesquisar termos no glossário"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundService.playSelect();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-700 text-white border-indigo-700 font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Listagem de Termos */}
      <div className="space-y-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <StyledCard key={term.id}>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {term.term}
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {term.category}
                  </span>
                </div>

                <p className="text-xs font-semibold text-indigo-900">
                  {term.shortDefinition}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {term.detailedExplanation}
                </p>

                {/* Bloco de Distinção Essencial */}
                <DistinctionGrid>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase text-[10px] tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Significa Aproximadamente:
                    </div>
                    <p className="text-emerald-950 leading-snug">{term.whatItMeans}</p>
                  </div>

                  <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-800 font-bold uppercase text-[10px] tracking-wider">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      NÃO Significa:
                    </div>
                    <p className="text-rose-950 leading-snug">{term.whatItDoesNotMean}</p>
                  </div>
                </DistinctionGrid>

                {/* Citação Acadêmica */}
                <div className="pt-2 text-[11px] text-slate-400 italic">
                  <strong>Referência:</strong> {term.academicCitation}
                </div>
              </div>
            </StyledCard>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              Nenhum termo encontrado para "{searchQuery}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
