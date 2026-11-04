/**
 * @file metaAnalysisData.ts
 * Dados e cautelas científicas da Metanálise Longitudinal de Potterton et al. (2022)
 * Fonte: Journal of Youth and Adolescence / Springer Nature
 */

export interface MetaAnalysisStudyMetric {
  outcome: string;
  studyCount: number;
  participantsCount: number;
  smd: number;
  ciLower: number;
  ciUpper: number;
  heterogeneityI2: string;
  interpretation: string;
  scientificMeaning: string;
}

export const POTTERTON_METANALYSIS = {
  reference: 'Potterton et al. (2022). Identity Development and Social-Emotional Disorders During Adolescence and Emerging Adulthood: A Systematic Review and Meta-Analysis. Journal of Youth and Adolescence.',
  totalStudies: 20,
  totalParticipants: 13787,
  qualityDistribution: {
    good: '0%',
    fair: '55% (11 estudos)',
    poor: '45% (9 estudos)',
  },
  metrics: [
    {
      outcome: 'Síntese de Identidade (Identity Synthesis)',
      studyCount: 9,
      participantsCount: 8692,
      smd: 0.11,
      ciLower: 0.02,
      ciUpper: 0.20,
      heterogeneityI2: '84.2%',
      interpretation: 'Pequeno aumento médio ao longo do tempo (estatisticamente significativo, mas de magnitude modesta).',
      scientificMeaning: 'Mostra tendência desenvolvimental média à maturação identitária, mas com expressiva estabilidade e heterogeneidade entre trajetórias individuais.',
    },
    {
      outcome: 'Confusão de Identidade (Identity Confusion)',
      studyCount: 7,
      participantsCount: 5837,
      smd: -0.01,
      ciLower: -0.16,
      ciUpper: 0.14,
      heterogeneityI2: '91.1%',
      interpretation: 'Nenhuma mudança longitudinal significativa (o intervalo de confiança engloba o zero).',
      scientificMeaning: 'Desmistifica a tese de que a confusão simplesmente "evapora" magicamente com a passagem cronológica da idade.',
    },
    {
      outcome: 'Sintomas de Depressão e Ansiedade',
      studyCount: 9,
      participantsCount: 8692,
      smd: -0.11,
      ciLower: -0.18,
      ciUpper: -0.03,
      heterogeneityI2: '75.9%',
      interpretation: 'Pequena redução média ao longo da transição para a adultez jovem.',
      scientificMeaning: 'Sintomas emocionais flutuam por múltiplos determinantes biopsicossociais, e não exclusivamente por resoluções identitárias.',
    },
  ] as MetaAnalysisStudyMetric[],

  epistemologicalCautions: [
    {
      rule: 'Correlação não equivale a Causalidade',
      detail: 'As metarregressões não demonstraram que mudanças nos indicadores de identidade previssem significativamente mudanças subsequentes em depressão ou ansiedade.',
    },
    {
      rule: 'Qualidade Metodológica Frágil na Literatura',
      detail: 'Nenhum dos 20 estudos analisados obteve classificação de qualidade metodológica "Boa" (todos foram avaliados como "Regular" ou "Fraca"), demandando máxima prudência interpretativa.',
    },
    {
      rule: 'Confusão de Identidade NÃO é Diagnóstico',
      detail: 'O 5º estágio de Erikson não é uma categoria nosológica da CID-11 ou do DSM-5-TR. Não diagnostique um paciente como "portador de crise eriksoniana".',
    },
    {
      rule: 'Ausência de Ensaios Clínicos Manualizados',
      detail: 'Nenhum estudo longitudinal avaliou a eficácia de uma psicoterapia centrada exclusivamente no modelo de estágios de Erikson. Erikson fornece mapa heurístico, não protocolo farmacológico ou psicoterápico.',
    },
  ],
};
