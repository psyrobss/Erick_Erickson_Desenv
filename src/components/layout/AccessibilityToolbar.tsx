/**
 * @file AccessibilityToolbar.tsx
 * Barra de recursos de acessibilidade (WCAG AA): contraste, tamanho de fonte e modo foco
 */

import React from 'react';
import { Type, Eye, Volume2, ShieldCheck } from 'lucide-react';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background-color: #0f172a;
  color: #f8fafc;
  font-size: 0.75rem;
  border-bottom: 1px solid #1e293b;
`;

const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ToolButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  background: ${(props) => (props.$active ? '#334155' : 'transparent')};
  color: #f8fafc;
  border: 1px solid ${(props) => (props.$active ? '#64748b' : '#334155')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.15s;

  &:hover {
    background: #334155;
  }

  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 1px;
  }
`;

interface AccessibilityToolbarProps {
  highContrast: boolean;
  onToggleContrast: () => void;
  fontScale: 'normal' | 'large' | 'larger';
  onChangeFontScale: (scale: 'normal' | 'large' | 'larger') => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  highContrast,
  onToggleContrast,
  fontScale,
  onChangeFontScale,
}) => {
  const nextFontScale = () => {
    if (fontScale === 'normal') onChangeFontScale('large');
    else if (fontScale === 'large') onChangeFontScale('larger');
    else onChangeFontScale('normal');
  };

  return (
    <ToolbarContainer role="region" aria-label="Recursos de Acessibilidade">
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <span className="font-semibold text-slate-200">FACISA / UFRN</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span className="text-slate-400 hidden sm:inline">Psicologia do Desenvolvimento II</span>
        <span className="text-emerald-400 inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
          <ShieldCheck className="w-3 h-3" /> Offline (Cookies)
        </span>
      </div>

      <ControlsGroup>
        <ToolButton
          onClick={onToggleContrast}
          $active={highContrast}
          aria-pressed={highContrast}
          title="Alternar modo de alto contraste para baixa visão"
        >
          <Eye className="w-3 h-3" />
          <span>Contraste</span>
        </ToolButton>

        <ToolButton
          onClick={nextFontScale}
          title="Aumentar tamanho tipográfico"
        >
          <Type className="w-3 h-3" />
          <span>Fonte: {fontScale === 'normal' ? 'A' : fontScale === 'large' ? 'A+' : 'A++'}</span>
        </ToolButton>
      </ControlsGroup>
    </ToolbarContainer>
  );
};
