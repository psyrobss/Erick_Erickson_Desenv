/**
 * @file StageDetailView.tsx
 * Visualização aprofundada dos detalhes de cada um dos 8 estágios,
 * com ilustração pedagógica figurativa acessível (alt text detalhado) e intervenção do Professor Mentor.
 */

import React from 'react';
import { PsychosocialStage } from '../../types/stage';
import { CheckCircle2, ArrowRight, HelpCircle, BookOpen, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import styled from 'styled-components';
import { STAGES_ILLUSTRATIONS } from '../../data/illustrationsData';
import { ProfessorCallout } from '../gamification/ProfessorCallout';

const DetailCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const TensionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1.5rem 0;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PoleCard = styled.div<{ $positive?: boolean }>`
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$positive ? '#bbf7d0' : '#fecaca')};
  background-color: ${(props) => (props.$positive ? '#f0fdf4' : '#fff1f2')};

  .pole-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .pole-badge {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${(props) => (props.$positive ? '#15803d' : '#be123c')};
  }

  h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.35rem;
  }

  p {
    font-size: 0.875rem;
    color: #475569;
    line-height: 1.5;
  }
`;

const PROFESSOR_STAGE_INSIGHTS: Record<number, { message: string; clinicalTip: string; examInsight: string }> = {
  1: {
    message: 'Preste muita atenção ao polo da Desconfiança aqui: Erikson não defende uma "confiança ingênua e cega". O bebê saudável desenvolve uma segurança afetuosa primordial, mas preserva a cautela necessária para se proteger!',
    clinicalTip: 'Em acolhimento infantil e bebês com histórico de negligência, a desconfiança pode aparecer como apatia ou recusa do olhar. A intervenção visa restaurar a previsibilidade ambiental com calor humano consistente.',
    examInsight: 'Ponto chave para exames e provas: "A resolução saudável do Estágio 1 elimina a desconfiança?". FALSO! A virtude da Esperança surge justamente do predomínio equilibrado da confiança sobre a desconfiança.',
  },
  2: {
    message: 'Aqui temos a fase do "EU FAÇO SOZINHO!". A criança quer caminhar, segurar a colher e controlar seus esfíncteres. Se os cuidadores a envergonham ou ridicularizam perante os outros, ela passa a duvidar de sua capacidade de agir no mundo.',
    clinicalTip: 'Na clínica com pais, oriente sobre a importância de dar opções controladas à criança (ex: "Quer a blusa azul ou a amarela?") em vez de impor ordens humilhantes ou ser permissivo demais.',
    examInsight: 'Lembre-se: O controle neuromuscular e o treinamento esfincteriano são a base somática para o autocontrole psíquico e a força do ego que Erikson chama de "Vontade".',
  },
  3: {
    message: 'Que fase fascinante! A criança na idade do brincar é uma verdadeira exploradora do cosmos: brinca de faz-de-conta, inventa mundos e estabelece objetivos. O desafio aqui é equilibrar a imaginação e a agressividade lúdica com a consciência moral.',
    clinicalTip: 'Cuidado ao rotular precocemente comportamentos enérgicos da criança como "hiperatividade". Muitas vezes é a iniciativa epigenética saudável buscando expressão simbólica e espaço para criar.',
    examInsight: 'A virtude desenvolvida no Estágio 3 é o PROPÓSITO. Quando os pais punem a curiosidade com culpabilização moralista exagerada, a criança pode se tornar inibida e temerosa.',
  },
  4: {
    message: 'A criança deixa a proteção exclusiva do lar e ingressa na escola formal e nas brincadeiras com regras sociais. Ela precisa sentir que consegue realizar tarefas, cooperar em equipe e produzir algo valorizado pela cultura.',
    clinicalTip: 'Crianças que repetem queixas de "eu não sei fazer nada" muitas vezes tiveram suas iniciativas comparadas pejorativamente com irmãos ou colegas. Fortalecer a competência exige reconhecer talentos diversos.',
    examInsight: 'Termo chave de prova: DILIGÊNCIA (também chamada de Indústria ou Laboriosidade em algumas traduções). A virtude emergente é a COMPETÊNCIA.',
  },
  5: {
    message: 'O ponto alto de Erikson e foco principal da ementa da disciplina! O adolescente busca sintetizar tudo o que foi na infância com quem deseja ser no futuro. E aqui entra o conceito brilhante de MORATÓRIA PSICOSSOCIAL: um tempo concedido pela cultura para experimentar papéis sem cobrança imediata!',
    clinicalTip: 'No consultório, evite a pressa de "enquadrar" o adolescente numa escolha fechada. O papel do terapeuta é legitimar a exploração ética de identidade e fornecer um continente seguro para suas incertezas.',
    examInsight: 'Atenção aos 4 status de James Marcia e à virtude da FIDELIDADE (lealdade aos próprios valores livremente escolhidos). Este é o conteúdo mais cobrado em avaliações acadêmicas!',
  },
  6: {
    message: 'Para se entregar verdadeiramente ao amor e à intimidade profunda com outra pessoa, o sujeito precisa antes ter um self sólido. Quem não sabe quem é, teme se anular no outro e foge para o isolamento ou para relações superficiais.',
    clinicalTip: 'Muitas queixas de isolamento afetivo ou relacionamentos destrutivos na clínica jovem-adulta decorrem de crises não resolvidas de identidade da fase anterior.',
    examInsight: 'Intimidade para Erikson inclui a capacidade de compromisso ético e afeição recíproca genuína, inclusive de admitir sacrifícios conjuntos. A virtude é o AMOR.',
  },
  7: {
    message: 'O adulto maduro sente a necessidade de transcender seu próprio ego e gerar frutos para a sociedade: ter filhos, orientar estagiários, produzir ciência, plantar árvores. Se não faz isso, cai na estagnação, no tédio e na sensação de vida sem sentido.',
    clinicalTip: 'A famosa "crise da meia-idade" é frequentemente uma manifestação aguda da generatividade bloqueada. O trabalho terapêutico busca reavivar fontes de contribuição social e afeto pelas gerações futuras.',
    examInsight: 'Virtude: CUIDADO. A generatividade engloba tanto a procriação biológica quanto a criação cultural, artística e de mentoria profissional.',
  },
  8: {
    message: 'Chegamos ao ápice do ciclo vital! Na maturidade tardia e velhice, o ser humano olha para trás em retrospectiva. Quem consegue aceitar sua história com seus erros e acertos alcança a Integridade do Ego e a Sabedoria; quem se arrepende amargamente sem tempo de recomeçar cai no Desespero.',
    clinicalTip: 'Na gerontologia e escuta clínica de idosos, técnicas de reminiscência e narrativa biográfica são potentes para integrar memórias dolorosas e promover a sensação de paz com o próprio legado.',
    examInsight: 'Virtude: SABEDORIA. Erikson e Joan Erikson salientam que a integridade transcende o medo da morte biológica ao reconhecer a finitude como parte orgânica do ciclo universal.',
  },
};

interface StageDetailViewProps {
  stage: PsychosocialStage;
  isCompleted: boolean;
  onToggleComplete: (stageId: number) => void;
}

export const StageDetailView: React.FC<StageDetailViewProps> = ({
  stage,
  isCompleted,
  onToggleComplete,
}) => {
  const illustration = STAGES_ILLUSTRATIONS[stage.id];
  const professorInsight = PROFESSOR_STAGE_INSIGHTS[stage.id];

  return (
    <DetailCard>
      {/* Header com indicador de conclusão e XP */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>{stage.id}º Estágio do Ciclo Vital</span>
            <span aria-hidden="true">·</span>
            <span>{stage.agePeriod}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 font-bold">+25 XP</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900">
            {stage.name}
          </h3>
          <p className="mt-1 text-base italic text-indigo-950 font-serif">
            {stage.developmentalQuestion}
          </p>
        </div>

        <button
          onClick={() => onToggleComplete(stage.id)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
          }`}
          title="Marcar estágio como estudado e sincronizar com cookies"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Estágio Concluído (+25 XP)' : 'Marcar como Concluído (+25 XP)'}</span>
        </button>
      </div>

      {/* Painel com Ilustração Figurativa Pedagógica Acessível */}
      {illustration && (
        <section 
          aria-label={`Ilustração do Estágio ${stage.id}: ${stage.name}`} 
          className="my-5 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          {/* Caixa de visualização do SVG figurativo com role="img" e aria-label para leitor de tela */}
          <div 
            className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center rounded-2xl shadow-sm bg-white p-1"
            role="img"
            aria-label={illustration.altText}
            dangerouslySetInnerHTML={{ __html: illustration.svgBadge }}
          />

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wide mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Cena Pedagógica Figurativa</span>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-snug">
              {illustration.sceneDescription}
            </p>
            {/* Texto audiodescritivo explícito para acessibilidade visual */}
            <p className="text-xs text-slate-500 mt-1.5 italic leading-relaxed">
              <strong>Audiodescrição para leitor de tela:</strong> {illustration.altText}
            </p>
          </div>
        </section>
      )}

      {/* Intervenção da disciplina com reflexão e dicas da prova */}
      {professorInsight && (
        <ProfessorCallout
          title={`Orientação Pedagógica · Reflexão do ${stage.id}º Estágio`}
          message={professorInsight.message}
          clinicalTip={professorInsight.clinicalTip}
          examInsight={professorInsight.examInsight}
          stageName={stage.name}
          xpRewardBadge="Dica da Disciplina"
        />
      )}

      {/* Visão Geral e Virtude */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Visão Desenvolvimental
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            {stage.overview}
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
            <strong>Desafio Central:</strong> {stage.keyChallenge}
          </div>
        </div>

        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            Força do Ego (Virtude)
          </div>
          <div className="text-xl font-display font-bold text-amber-900">
            {stage.virtue}
          </div>
          <p className="text-xs text-amber-950/80 leading-relaxed">
            {stage.virtueDescription}
          </p>
        </div>
      </div>

      {/* Polos da Tensão Psicossocial */}
      <TensionBox>
        <PoleCard $positive>
          <div className="pole-header">
            <span className="pole-badge">Polo Predominantemente Saudável</span>
          </div>
          <h4>{stage.crisis.positive}</h4>
          <p>{stage.crisis.positiveDescription}</p>
          <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-900">
            <strong>Resolução Esperada:</strong> {stage.healthyResolution}
          </div>
        </PoleCard>

        <PoleCard>
          <div className="pole-header">
            <span className="pole-badge">Polo de Tensão Problemática</span>
          </div>
          <h4>{stage.crisis.negative}</h4>
          <p>{stage.crisis.negativeDescription}</p>
          <div className="mt-3 pt-3 border-t border-rose-200 text-xs text-rose-900">
            <strong>Fragilidade Potencial:</strong> {stage.fragileResolution}
          </div>
        </PoleCard>
      </TensionBox>

      {/* Exemplos Práticos e Clínicos */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h4 className="font-semibold text-slate-900 text-sm mb-4">
          Exemplos Pedagógicos (Cotidiano e Hipotético Clínico)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stage.examples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  {ex.type === 'cotidiano' ? 'Cotidiano Familiar' : 'Cenário Clínico'}
                </span>
                <span className="text-xs text-slate-400">Exemplo {idx + 1}</span>
              </div>
              <h5 className="font-bold text-slate-900 text-sm">{ex.title}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{ex.description}</p>
              <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-800 font-medium">
                <strong>Análise:</strong> {ex.analysis}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DetailCard>
  );
};
