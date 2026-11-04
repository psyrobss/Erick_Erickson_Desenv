/**
 * @file clinicalPracticeData.ts
 * Recomendações práticas para Psicólogos Clínicos, Educadores, Pais e Normas do CFP/SATEPSI
 */

export interface ClinicalQuestionItem {
  id: string;
  dimension: string;
  question: string;
  clinicalObjective: string;
  redFlags: string;
}

export interface ParentingGuideline {
  insteadOf: string;
  moreProductive: string;
  developmentalRationale: string;
}

export const CLINICAL_INTERVIEW_QUESTIONS: ClinicalQuestionItem[] = [
  {
    id: 'cq-1',
    dimension: 'Continuidade Autobiográfica',
    question: '“Você se reconhece como a mesma pessoa em diferentes momentos da sua história?”',
    clinicalObjective: 'Avaliar o senso de persistência temporal do ego entre passado, presente e futuro.',
    redFlags: 'Sensação profunda de alienação, despersonalização ou fratura irreconciliável da própria história.',
  },
  {
    id: 'cq-2',
    dimension: 'Compromissos Nucleares',
    question: '“Existem coisas, causas ou atividades que hoje são genuinamente importantes e inegociáveis para você?”',
    clinicalObjective: 'Identificar a presença ou ausência de compromissos firmados e o grau de segurança que eles conferem.',
    redFlags: 'Apatia generalizada, anedonia e ausência completa de vínculos afetivos ou ideológicos.',
  },
  {
    id: 'cq-3',
    dimension: 'Oportunidades de Exploração',
    question: '“Que alternativas de estudo, trabalho e modos de vida você teve oportunidade real e segura de experimentar?”',
    clinicalObjective: 'Investigar se o ambiente social e material concedeu espaço efetivo para moratória psicossocial.',
    redFlags: 'Ambientes hipercontroladores que punem qualquer divergência ou precariedade socioeconômica extrema que inviabiliza escolhas.',
  },
  {
    id: 'cq-4',
    dimension: 'Autoria das Decisões',
    question: '“Essa escolha parece genuinamente sua ou é algo que você sente que estão esperando e cobrando de você?”',
    clinicalObjective: 'Distinguir entre apropriação pessoal autêntica (identidade alcançada) e conformismo passivo (pré-fechamento).',
    redFlags: 'Sentimento de falsidade crônica ("falso self"), medo paralisante de desapontar figuras parentais.',
  },
  {
    id: 'cq-5',
    dimension: 'Flexibilidade e Revisão',
    question: '“Você consegue mudar de ideia sobre um plano ou amizade sem sentir que o seu chão desapareceu?”',
    clinicalObjective: 'Avaliar a capacidade de reconsideração de compromissos sem colapso da integridade pessoal.',
    redFlags: 'Rigidez obsessiva ou pânico catastrófico frente à necessidade de adaptação a mudanças.',
  },
  {
    id: 'cq-6',
    dimension: 'Contexto e Reconhecimento',
    question: '“Existem ambientes (família, escola, internet) onde você precisa esconder partes fundamentais de quem você é?”',
    clinicalObjective: 'Mapear estresse de minoria, discriminação étnico-racial ou LGBTQIA+ e incongruência ambiental.',
    redFlags: 'Necessidade constante de hipervigilância para evitar violência física ou psicológica.',
  },
  {
    id: 'cq-7',
    dimension: 'Projeção de Futuro',
    question: '“Você consegue imaginar uma versão possível e satisfatória da sua vida daqui a 3 ou 5 anos?”',
    clinicalObjective: 'Verificar a capacidade de construção de "selves possíveis" e presença de esperança orientada para o porvir.',
    redFlags: 'Desesperança absoluta, ausência de perspectiva temporal ou ideação suicida ativa.',
  },
];

export const PARENTING_RECOMMENDATIONS: ParentingGuideline[] = [
  {
    insteadOf: '“Você precisa decidir agora o que vai fazer da vida toda!”',
    moreProductive: '“Que caminhos você tem considerado? O que descobriu sobre cada um até agora?”',
    developmentalRationale: 'Estimula a exploração informada e a pesquisa ativa, reduzindo a ansiedade paralisante do fechamento prematuro.',
  },
  {
    insteadOf: '“Nesta família todo mundo pensa e vota assim; você não pode inventar moda.”',
    moreProductive: '“Quero entender com calma por que você chegou a essa conclusão diferente da nossa.”',
    developmentalRationale: 'Favorece a diferenciação psicológica sem romper o vínculo de pertencimento e apego seguro.',
  },
  {
    insteadOf: '“Isso é só modinha de adolescente, semana que vem passa.”',
    moreProductive: '“O que essa causa ou estilo significa para você neste momento da sua vida?”',
    developmentalRationale: 'Valida a experiência presente do jovem, transformando a experimentação em espaço de diálogo autêntico.',
  },
  {
    insteadOf: 'Controlar obsessivamente cada escolha de roupa, amigos e leitura.',
    moreProductive: 'Estabelecer limites inegociáveis de segurança física e emocional, concedendo autonomia gradual.',
    developmentalRationale: 'Apoia a autonomia conquistada nos estágios prévios e prepara para a auto-regulação adulta.',
  },
  {
    insteadOf: 'Vigiar unicamente a contagem bruta de horas de tela no celular.',
    moreProductive: 'Conversar sobre sentimentos de comparação, comunidades de apoio e autenticidade online.',
    developmentalRationale: 'A pesquisa científica recente comprova que a qualidade do engajamento digital é o fator preditor real de bem-estar.',
  },
];

export const SATEPSI_GUIDELINES = {
  regulation: 'Conselho Federal de Psicologia (CFP) - Resolução nº 31/2022',
  systemName: 'SATEPSI - Sistema de Avaliação de Testes Psicológicos',
  rules: [
    'Instrumentos de pesquisa científica (como escalas de Marcia, U-MICS ou DIDS) NÃO são automaticamente testes psicológicos privativos aprovados para uso clínico no Brasil.',
    'No exercício profissional regulamentado pelo CFP, o psicólogo deve consultar obrigatoriamente a lista de testes com parecer FAVORÁVEL no SATEPSI antes de qualquer aplicação com fins diagnósticos ou periciais.',
    'Instrumentos que mensuram dimensões de identidade podem ser utilizados como instrumentos de pesquisa acadêmica ou fontes complementares não privativas, desde que respeitados os parâmetros éticos da Resolução CFP nº 31/2022.',
    'Nunca emita laudo ou atestado psicológico fundamentado em "falha de estágio psicossocial eriksoniano", uma vez que estágios são conceitos teóricos heurísticos, não classificações nosológicas.',
  ],
};
