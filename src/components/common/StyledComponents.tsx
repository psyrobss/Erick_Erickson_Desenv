/**
 * @file StyledComponents.tsx
 * Componentes modulares e reutilizáveis estilizados via styled-components
 */

import styled, { css } from 'styled-components';

export const StyledCard = styled.div<{ $interactive?: boolean; $active?: boolean }>`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);

  ${(props) =>
    props.$interactive &&
    css`
      cursor: pointer;
      &:hover {
        border-color: #cbd5e1;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }
    `}

  ${(props) =>
    props.$active &&
    css`
      border-color: #4338ca;
      box-shadow: 0 0 0 2px rgba(67, 56, 202, 0.15);
    `}
`;

export const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  /* Touch accessibility target >= 44px on mobile/standard */
  min-height: 42px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;

  ${(props) =>
    props.$size === 'sm' &&
    css`
      min-height: 36px;
      padding: 0.35rem 0.75rem;
      font-size: 0.8125rem;
    `}

  ${(props) =>
    props.$size === 'lg' &&
    css`
      min-height: 48px;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    `}

  /* Variants */
  ${(props) =>
    (!props.$variant || props.$variant === 'primary') &&
    css`
      background-color: #4338ca;
      color: #ffffff;
      border: 1px solid #4338ca;
      &:hover:not(:disabled) {
        background-color: #3730a3;
        border-color: #3730a3;
      }
    `}

  ${(props) =>
    props.$variant === 'secondary' &&
    css`
      background-color: #0f766e;
      color: #ffffff;
      border: 1px solid #0f766e;
      &:hover:not(:disabled) {
        background-color: #115e59;
      }
    `}

  ${(props) =>
    props.$variant === 'outline' &&
    css`
      background-color: transparent;
      color: #334155;
      border: 1px solid #cbd5e1;
      &:hover:not(:disabled) {
        background-color: #f8fafc;
        border-color: #94a3b8;
        color: #0f172a;
      }
    `}

  ${(props) =>
    props.$variant === 'ghost' &&
    css`
      background-color: transparent;
      color: #475569;
      border: 1px solid transparent;
      &:hover:not(:disabled) {
        background-color: #f1f5f9;
        color: #0f172a;
      }
    `}

  ${(props) =>
    props.$variant === 'danger' &&
    css`
      background-color: #b91c1c;
      color: #ffffff;
      border: 1px solid #b91c1c;
      &:hover:not(:disabled) {
        background-color: #991b1b;
      }
    `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #4338ca;
    outline-offset: 2px;
  }
`;

export const SectionHeader = styled.header`
  margin-bottom: 2rem;

  .kicker {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #4338ca;
    margin-bottom: 0.35rem;
  }

  h2 {
    font-family: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 700;
    color: #0f172a;
    line-height: 1.25;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: #475569;
    max-width: 48rem;
    line-height: 1.6;
  }
`;

export const CalloutBox = styled.div<{ $type?: 'info' | 'warning' | 'caution' | 'academic' }>`
  padding: 1.25rem;
  border-radius: 10px;
  margin: 1.25rem 0;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;

  ${(props) =>
    (!props.$type || props.$type === 'info') &&
    css`
      border-color: #bfdbfe;
      background-color: #eff6ff;
      color: #1e3a8a;
    `}

  ${(props) =>
    props.$type === 'caution' &&
    css`
      border-color: #fecaca;
      background-color: #fff1f2;
      color: #9f1239;
    `}

  ${(props) =>
    props.$type === 'warning' &&
    css`
      border-color: #fed7aa;
      background-color: #fff7ed;
      color: #9a3412;
    `}

  ${(props) =>
    props.$type === 'academic' &&
    css`
      border-color: #c7d2fe;
      background-color: #eef2ff;
      color: #312e81;
    `}

  .callout-title {
    font-weight: 600;
    font-size: 0.9375rem;
    margin-bottom: 0.35rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .callout-body {
    font-size: 0.875rem;
    line-height: 1.55;
  }
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${(props) => Math.min(Math.max(props.$percentage, 0), 100)}%;
  background: linear-gradient(90deg, #4338ca 0%, #0d9488 100%);
  border-radius: 9999px;
  transition: width 0.4s ease-out;
`;
