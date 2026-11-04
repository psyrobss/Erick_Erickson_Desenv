/**
 * @file CaseStudyViewer.tsx
 * Laboratório Prático de Estudos de Caso com tomada de decisão e debriefing formativo
 */

import React, { useState } from 'react';
import { CASE_STUDIES_DATA } from '../../data/caseStudiesData';
import { CaseStudy, DecisionOption } from '../../types/caseStudy';
import { StyledCard, CalloutBox } from '../common/StyledComponents';
import { UserCheck, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, MessageSquareQuote, Eye, Sparkles } from 'lucide-react';
import { CLINICAL_CASES_ILLUSTRATIONS } from '../../data/illustrationsData';
import { ProfessorCallout } from '../gamification/ProfessorCallout';
import { soundService } from '../../services/soundService';
import styled from 'styled-components';

interface CaseStudyViewerProps {
  savedDecisions: Record<string, string>;
  onSaveDecision: (caseId: string, optionId: string) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({
  savedDecisions,
  onSaveDecision,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = CASE_STUDIES_DATA[activeCaseIndex];
  const selectedOptionId = savedDecisions[currentCase.id];
  const selectedOption = currentCase.options.find((opt) => opt.id === selectedOptionId);

  const handleSelectOption = (caseId: string, optId: string) => {
    soundService.playSuccessTone();
    onSaveDecision(caseId, optId);
  };

  const illustration = CLINICAL_CASES_ILLUSTRATIONS[currentCase.id];

  const PROFESSOR_CASE_TIPS: Record<string, { message: string; clinicalTip: string; examInsight: string }> = {
    'caso-lucas-16': {
      message: 'Ao analisar a situação de Lucas, observe a encruzilhada típica: a família busca induzir o pré-fechamento (Direito), enquanto o adolescente necessita de moratória reflexiva para testar suas aptidões em design visual. A intervenção busca abrir canais de diálogo sem forçar rupturas abruptas.',
      clinicalTip: 'Atenção aos sintomas somáticos como a cefaleia nas segundas-feiras. O corpo expressa o sofrimento ético e o conflito de lealdade familiar.',
      examInsight: 'Termo chave de avaliação: FORECLOSURE (Pré-fechamento). Ocorre quando há alto compromisso com papéis herdados sem ter havido crise ou exploração prévia.',
    },
    'caso-beatriz-19': {
      message: 'Beatriz retrata um dilema frequente na adultez emergente: a culpa pelo investimento familiar frente à descoberta da incompatibilidade com a rotina odontológica. O modelo U-MICS explica que reconsiderar compromissos diante da prática real é sinal de flexibilidade psicológica.',
      clinicalTip: 'No manejo clínico com universitários, valide a coragem da dúvida e trabalhe o luto das expectativas parentais para permitir a reconstrução de um projeto de vida autêntico.',
      examInsight: 'Modelo U-MICS (Crocetti et al.): Compromisso, Exploração em Profundidade e Reconsideração do Compromisso formam um ciclo duplo dinâmico (ciclo MAMA).',
    },
    'caso-mateus-15': {
      message: 'Observe o Princípio Epigenético em evidência: dificuldades não resolvidas no 4º estágio (Diligência vs. Inferioridade) fragilizam o senso de competência e alimentam a adesão à "identidade negativa" em comunidades virtuais extremas.',
      clinicalTip: 'Em adolescentes com histórico de fracasso escolar, descubra talentos extracurriculares (esportes, edição digital, mecânica) para refundar a autoeficácia antes de intervir nas notas.',
      examInsight: 'Identidade Negativa: conceito de Erikson para quando o jovem prefere assumir o papel estigmatizado a permanecer em difusão sem identidade definida.',
    },
    'caso-juliana-17': {
      message: 'A trajetória de Juliana demonstra que a identidade não se constrói no isolamento. Frente às barreiras da discriminação, a identificação positiva com a ancestralidade e redes de mentoria fortalece a resiliência do ego e a fidelidade aos próprios objetivos.',
      clinicalTip: 'Nunca minimize a queixa de preconceito como "sensibilidade excessiva". Acolha o impacto subjetivo do estresse de minoria e fortaleça a rede de sustentação comunitária.',
      examInsight: 'A teoria contemporânea integra Erikson com a Abordagem Bioecológica e a Identidade Étnico-Racial: o macrossistema social molda diretamente a síntese do ego.',
    },
  };

  const caseTip = PROFESSOR_CASE_TIPS[currentCase.id];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Tópico 6 · Laboratório Aplicado (+65 XP por caso resolvido)
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
            Estudos de Caso Clínico-Desenvolvimentais
          </h2>
          <p className="text-slate-600 text-sm max-w-3xl mt-1">
            Analise situações reais de jovens e adolescentes em diferentes contextos socioculturais. Tome decisões de intervenção pedagógica/clínica e receba feedback teórico imediato fundamentado na literatura científica.
          </p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
          }`}
          title="Salvar conclusão do laboratório nos cookies"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Casos Concluídos (+65 XP)' : 'Marcar como Concluído (+65 XP)'}</span>
        </button>
      </div>

      {/* Navegação entre casos */}
      <div className="flex flex-wrap gap-2">
        {CASE_STUDIES_DATA.map((c, idx) => {
          const isDone = !!savedDecisions[c.id];
          return (
            <button
              key={c.id}
              onClick={() => {
                soundService.playCardFlip();
                setActiveCaseIndex(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                activeCaseIndex === idx
                  ? 'bg-indigo-700 text-white border-indigo-700 shadow-md scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{c.studentName}, {c.age} anos</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
            </button>
          );
        })}
      </div>

      {/* Painel do Caso Ativo */}
      <StyledCard>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900">
                Caso: {currentCase.studentName} ({currentCase.age} anos)
              </h3>
              <p className="text-xs text-slate-500">{currentCase.context}</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Caso {activeCaseIndex + 1} de {CASE_STUDIES_DATA.length}
            </span>
          </div>

          {/* Ilustração Figurativa do Caso Clínico com Acessibilidade */}
          {illustration && (
            <div 
              aria-label={`Ilustração do caso clínico de ${currentCase.studentName}`} 
              className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80 flex items-center gap-4"
            >
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white rounded-xl shadow-xs p-1 flex items-center justify-center"
                role="img"
                aria-label={illustration.altText}
                dangerouslySetInnerHTML={{ __html: illustration.svgArt }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Cena Clínica Ilustrada
                </span>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed italic">
                  {illustration.altText}
                </p>
              </div>
            </div>
          )}

          {/* Orientação Pedagógica da Disciplina */}
          {caseTip && (
            <ProfessorCallout
              title={`Reflexão Clínica da Disciplina · Caso ${currentCase.studentName}`}
              message={caseTip.message}
              clinicalTip={caseTip.clinicalTip}
              examInsight={caseTip.examInsight}
              xpRewardBadge="Raciocínio Clínico"
            />
          )}

          {/* Citação da Fala do Aluno */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-indigo-900 text-xs font-bold uppercase tracking-wider">
              <MessageSquareQuote className="w-4 h-4 text-indigo-700" />
              Fala do Sujeito em Entrevista
            </div>
            <p className="font-serif italic text-indigo-950 text-sm leading-relaxed">
              {currentCase.narrativeQuote}
            </p>
          </div>

          {/* Descrição do Cenário */}
          <div className="text-sm text-slate-700 leading-relaxed space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Cenário Clínico / Escolar
            </h4>
            <p>{currentCase.scenario}</p>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
              <strong>Tensão Desenvolvimental Central:</strong> {currentCase.developmentalTension}
            </div>
          </div>

          {/* Opções de Intervenção */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">
              Qual intervenção você recomenda como profissional de Psicologia?
            </h4>
            <div className="space-y-2.5">
              {currentCase.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentCase.id, opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${
                      isSelected
                        ? opt.isPedagogicallyOptimal
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? opt.isPedagogicallyOptimal
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-rose-600 border-rose-600 text-white'
                          : 'border-slate-400'
                      }`}>
                        {isSelected && <span className="text-[10px]">✓</span>}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 mb-0.5">
                          {opt.label}
                        </div>
                        <div className="text-slate-600 leading-snug">
                          {opt.actionText}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Formativo Imediato */}
          {selectedOption && (
            <div className={`p-4 rounded-xl border space-y-2 mt-4 ${
              selectedOption.isPedagogicallyOptimal
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                {selectedOption.isPedagogicallyOptimal ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Conduta Pedagogicamente Adequada
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Conduta Problemática ou Incompleta
                  </>
                )}
                {selectedOption.marciaClassification && (
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/70 border border-black/10">
                    {selectedOption.marciaClassification}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed">
                <strong>Justificativa Teórica:</strong> {selectedOption.theoreticalRationale}
              </p>
              <p className="text-xs leading-relaxed">
                <strong>Implicações Clínicas:</strong> {selectedOption.clinicalFeedback}
              </p>
            </div>
          )}

          {/* Debriefing Completo */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Debriefing & Síntese Conceitual
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-indigo-900 block">Análise Eriksoniana:</span>
                <p className="text-slate-600 leading-relaxed">{currentCase.debriefing.eriksonianAnalysis}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-teal-900 block">Análise Contextual:</span>
                <p className="text-slate-600 leading-relaxed">{currentCase.debriefing.contextualAnalysis}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-rose-900 block">Cautela Clínica:</span>
                <p className="text-slate-600 leading-relaxed">{currentCase.debriefing.clinicalPrecaution}</p>
              </div>
            </div>
          </div>
        </div>
      </StyledCard>
    </div>
  );
};
