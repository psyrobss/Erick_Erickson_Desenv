/**
 * @file Navbar.tsx
 * Top Bar estrita de 3 zonas limpa e sem poluição, com foco na Trilha Didática Linear
 */

import React from 'react';
import { FileText, Volume2, VolumeX, Sparkles } from 'lucide-react';
import styled from 'styled-components';
import { soundService } from '../../services/soundService';

const NavHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.85rem 1.25rem;
`;

const BrandWordmark = styled.button`
  font-family: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0f172a;
  white-space: nowrap;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;

  span.highlight {
    color: #4338ca;
  }

  &:hover {
    color: #4338ca;
  }
`;

interface NavbarProps {
  completionPercentage: number;
  onOpenReportModal: () => void;
  onResetToStart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completionPercentage,
  onOpenReportModal,
  onResetToStart,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundService.isMuted());

  const handleToggleSound = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <NavHeader>
      <NavContainer>
        {/* Zone 1: Brand Wordmark */}
        <BrandWordmark onClick={onResetToStart} title="Ir para o início da Trilha de Estudos">
          PsicoDev II <span className="highlight">· Erikson</span>
        </BrandWordmark>

        {/* Zone 2: Informação da Disciplina */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>FACISA / UFRN</span>
          <span aria-hidden="true">·</span>
          <span>Psicologia do Desenvolvimento II</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
            Trilha Guiada Linear
          </span>
        </div>

        {/* Zone 3: Ações Rápidas (Som e Relatório) */}
        <div className="flex items-center gap-2">
          {/* Botão de Som */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Ativar sons didáticos' : 'Desativar sons didáticos'}
            title={isMuted ? 'Sons desativados (clique para ligar)' : 'Sons ativados (clique para mutar)'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Botão de Relatório Oficial */}
          <button
            type="button"
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-700 hover:bg-indigo-800 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Abrir o Relatório Oficial de Conclusão e Baixar PDF"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Relatório & PDF</span>
            <span className="font-mono bg-indigo-900/60 text-indigo-200 px-1.5 py-0.5 rounded text-[11px]">
              {completionPercentage}%
            </span>
          </button>
        </div>
      </NavContainer>
    </NavHeader>
  );
};
