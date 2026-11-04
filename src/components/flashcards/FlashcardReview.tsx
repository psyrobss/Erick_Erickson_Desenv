/**
 * @file FlashcardReview.tsx
 * Cartões de Revisão Rápida e Memorização Ativa para Estudantes de Psicologia
 */

import React, { useState } from 'react';
import { StyledCard } from '../common/StyledComponents';
import { RotateCw, Check, BookOpen, Layers, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundService } from '../../services/soundService';
import styled from 'styled-components';

const FlashcardContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  min-height: 280px;
  cursor: pointer;
`;

const CardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  min-height: 280px;
  text-align: center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${(props) => (props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #0f172a;
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  color: #ffffff;
  transform: rotateY(180deg);
  border-color: #4338ca;
`;

interface FlashcardItem {
  id: number;
  category: string;
  frontQuestion: string;
  frontHint?: string;
  backAnswer: string;
  backExplanation: string;
}

const FLASHCARDS: FlashcardItem[] = [
  {
    id: 1,
    category: '1º Estágio',
    frontQuestion: 'Qual é a força do ego (virtude) emergente de Confiança versus Desconfiança?',
    frontHint: 'Nascimento até 1 ano',
    backAnswer: 'Esperança',
    backExplanation: 'A crença duradoura na viabilidade dos desejos e necessidades, sem cair na ingenuidade absoluta.',
  },
  {
    id: 2,
    category: '2º Estágio',
    frontQuestion: 'Qual virtude surge de Autonomia versus Vergonha e Dúvida?',
    frontHint: '1 a 3 anos',
    backAnswer: 'Vontade',
    backExplanation: 'A determinação inabalável de exercer livre escolha e autocontenção dentro de limites seguros.',
  },
  {
    id: 3,
    category: '3º Estágio',
    frontQuestion: 'Qual virtude surge de Iniciativa versus Culpa?',
    frontHint: '3 a 6 anos (idade do brinquedo)',
    backAnswer: 'Propósito',
    backExplanation: 'A coragem de idealizar e perseguir metas lúdicas e sociais sem ser paralisado por culpa fantasmática.',
  },
  {
    id: 4,
    category: '4º Estágio',
    frontQuestion: 'Qual virtude surge de Produtividade (Diligência) versus Inferioridade?',
    frontHint: '6 a 12 anos (idade escolar)',
    backAnswer: 'Competência',
    backExplanation: 'A sensação realista de maestria no manejo de ferramentas intelectuais e culturais.',
  },
  {
    id: 5,
    category: '5º Estágio',
    frontQuestion: 'Qual é a virtude associada ao quinto estágio (Identidade × Confusão de Papéis)?',
    frontHint: 'Adolescência (~12 a 18 anos)',
    backAnswer: 'Fidelidade',
    backExplanation: 'A capacidade de sustentar lealdades voluntárias a valores, causas e comunidades sem anular o próprio self.',
  },
  {
    id: 6,
    category: '6º Estágio',
    frontQuestion: 'Qual virtude surge de Intimidade versus Isolamento?',
    frontHint: '19 a 39 anos (jovem adulto)',
    backAnswer: 'Amor',
    backExplanation: 'A mútua devoção que supera os antagonismos inerentes a toda convivência e vulnerabilidade íntima.',
  },
  {
    id: 7,
    category: '7º Estágio',
    frontQuestion: 'Qual virtude surge de Generatividade versus Estagnação?',
    frontHint: '40 a 64 anos (meia-idade)',
    backAnswer: 'Cuidado',
    backExplanation: 'A preocupação em acolher, orientar e transmitir saberes e valores para as futuras gerações.',
  },
  {
    id: 8,
    category: '8º Estágio',
    frontQuestion: 'Qual virtude coroa a Integridade versus Desespero na velhice?',
    frontHint: '65 anos em diante',
    backAnswer: 'Sabedoria',
    backExplanation: 'A reconciliação serena com a história vivida e aceitação reflexiva da finitude.',
  },
  {
    id: 9,
    category: 'James Marcia',
    frontQuestion: 'O que define o estado de Pré-fechamento (Foreclosure)?',
    frontHint: 'Exploração × Compromisso',
    backAnswer: 'Baixa Exploração + Alto Compromisso',
    backExplanation: 'Compromissos firmes adotados acriticamente de modelos familiares, sem exploração reflexiva prévia.',
  },
  {
    id: 10,
    category: 'James Marcia',
    frontQuestion: 'O que define o estado de Moratória Psicossocial?',
    frontHint: 'Exploração × Compromisso',
    backAnswer: 'Alta Exploração + Baixo/Instável Compromisso',
    backExplanation: 'Busca ativa e questionamento de alternativas em andamento. É adaptativo e normativo na adolescência.',
  },
  {
    id: 11,
    category: 'Metanálise Potterton',
    frontQuestion: 'Confusão de identidade pode ser tratada como diagnóstico clínico oficial (DSM/CID)?',
    frontHint: 'Metanálise de Potterton et al. (2022)',
    backAnswer: 'NÃO!',
    backExplanation: 'Não é diagnóstico de psicopatologia e a metanálise não demonstrou que mudanças na identidade prevejam linearmente mudanças em depressão.',
  },
  {
    id: 12,
    category: 'Normas CFP',
    frontQuestion: 'Qual é o papel do SATEPSI segundo a Resolução CFP nº 31/2022?',
    frontHint: 'Exercício profissional do psicólogo no Brasil',
    backAnswer: 'Avaliar e aprovar testes psicológicos privativos oficiais',
    backExplanation: 'Escalas de pesquisa acadêmica (como U-MICS) não podem ser usadas para emitir laudos periciais privativos sem parecer favorável no SATEPSI.',
  },
];

export const FlashcardReview: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);

  const card = FLASHCARDS[currentIdx];
  const isKnown = knownCards.includes(card.id);

  const handleNext = () => {
    soundService.playSelect();
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    soundService.playSelect();
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const handleFlip = () => {
    soundService.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  const toggleKnown = () => {
    if (isKnown) {
      setKnownCards(knownCards.filter((id) => id !== card.id));
      soundService.playSelect();
    } else {
      setKnownCards([...knownCards, card.id]);
      soundService.playSuccessTone();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Modo Revisão Ativa
          </span>
          <h3 className="text-xl font-display font-bold text-slate-900 mt-0.5">
            Cartões de Memorização Rápida (Flashcards)
          </h3>
          <p className="text-xs text-slate-500">
            Revisão ativa para provas: teste sua memória antes de virar o cartão para checar a resposta.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
            Dominados: {knownCards.length} / {FLASHCARDS.length}
          </span>
        </div>
      </div>

      {/* Guia Didático */}
      <div className="max-w-xl mx-auto p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1">
        <div className="font-bold text-indigo-900 flex items-center gap-1.5">
          <span>💡 Como Praticar Memorização Ativa:</span>
        </div>
        <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
          <li><strong>Tente responder mentalmente</strong> à pergunta na frente do cartão.</li>
          <li><strong>Clique no cartão</strong> (ou no botão roxo "Virar Cartão") para conferir o verso.</li>
          <li>Se você acertou com segurança, clique em <strong>"Marcar como Dominado ✓"</strong>!</li>
        </ol>
      </div>

      {/* Cartão Flip 3D */}
      <FlashcardContainer onClick={handleFlip}>
        <CardInner $isFlipped={isFlipped}>
          {/* Frente */}
          <CardFront>
            <div className="flex items-center justify-between w-full text-xs font-mono text-slate-400">
              <span className="font-semibold text-indigo-600 uppercase tracking-wider">
                {card.category}
              </span>
              <span>{currentIdx + 1} de {FLASHCARDS.length}</span>
            </div>

            <div className="my-auto space-y-3">
              <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
                {card.frontQuestion}
              </h4>
              {card.frontHint && (
                <div className="text-xs text-slate-500 italic">
                  Dica: {card.frontHint}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Toque ou clique aqui para VIRAR O CARTÃO</span>
            </div>
          </CardFront>

          {/* Verso */}
          <CardBack>
            <div className="flex items-center justify-between w-full text-xs font-mono text-indigo-300">
              <span className="font-semibold uppercase tracking-wider">
                Resposta & Fundamento
              </span>
              <span>{currentIdx + 1} de {FLASHCARDS.length}</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="text-2xl sm:text-3xl font-display font-bold text-amber-300">
                {card.backAnswer}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                {card.backExplanation}
              </p>
            </div>

            <div className="text-xs text-indigo-200 font-bold bg-indigo-900/80 px-3 py-1 rounded-full border border-indigo-700">
              Clique para voltar à pergunta
            </div>
          </CardBack>
        </CardInner>
      </FlashcardContainer>

      {/* Botão Explícito de Virar Cartão */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleFlip}
          className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
        >
          <RotateCw className="w-4 h-4" />
          <span>{isFlipped ? 'Voltar para a Pergunta' : 'Virar Cartão (Ver Resposta)'}</span>
        </button>
      </div>

      {/* Controles do Flashcard */}
      <div className="flex items-center justify-center gap-4 max-w-sm mx-auto">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          aria-label="Cartão anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={toggleKnown}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            isKnown
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isKnown ? 'Dominado ✓' : 'Marcar como Dominado'}</span>
        </button>

        <button
          onClick={handleNext}
          className="p-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          aria-label="Próximo cartão"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
