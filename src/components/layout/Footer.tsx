/**
 * @file Footer.tsx
 * Rodapé acadêmico sóbrio e informativo
 */

import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #0f172a;
  color: #94a3b8;
  padding: 3rem 1.5rem 2.5rem;
  border-top: 1px solid #1e293b;
  font-size: 0.8125rem;
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <div>
          <h3 className="text-white font-display font-semibold text-base mb-2">
            PsicoDev II · Estudo Guiado Erik Erikson
          </h3>
          <p className="leading-relaxed mb-3 text-slate-400 max-w-md">
            Ambiente educacional de aprendizagem ativa desenvolvido para os estudantes de Psicologia do Desenvolvimento II da Faculdade de Ciências da Saúde do Trairi (FACISA) — Universidade Federal do Rio Grande do Norte (UFRN).
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>UFRN Santa Cruz/RN</span>
            <span aria-hidden="true">·</span>
            <span>Estático & Offline (Cookies)</span>
            <span aria-hidden="true">·</span>
            <span>Sem Rastreadores</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
            Eixos do Conteúdo
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>8 Estágios do Ciclo Vital</li>
            <li>Adolescência & Fidelidade</li>
            <li>Matriz de James Marcia</li>
            <li>Modelo U-MICS Ciclo Duplo</li>
            <li>Metanálise Potterton (2022)</li>
            <li>Diretrizes SATEPSI CFP</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
            Normas & Ética
          </h4>
          <p className="text-slate-400 leading-relaxed text-xs">
            Material pedagógico fundamentado em fontes primárias e revisões sistemáticas indexadas. As noções de crise psicossocial operam como modelo heurístico do desenvolvimento e não como classificações nosológicas diagnósticas (CFP Resolução 31/2022).
          </p>
        </div>
      </FooterContainer>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-xs text-center text-slate-500">
        © 2026 FACISA / UFRN — Uso Educacional Aberto para Estudantes de Graduação em Psicologia.
      </div>
    </FooterWrapper>
  );
};
