/**
 * @file curriculumTopics.ts
 * Estrutura curricular dos tópicos de aprendizagem para Psicologia do Desenvolvimento II - FACISA UFRN
 */

export interface CurriculumTopic {
  id: string;
  order: number;
  title: string;
  shortDescription: string;
  durationMinutes: number;
  badge: string;
  iconName: string;
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  {
    id: 'topico-1',
    order: 1,
    title: 'Fundamentos & Arquitetura Epigenética',
    shortDescription: 'Biografia de Erikson, ruptura com o determinismo freudiano, o conceito de crise psicossocial e o princípio epigenético.',
    durationMinutes: 25,
    badge: 'Módulo 1',
    iconName: 'Compass',
  },
  {
    id: 'topico-2',
    order: 2,
    title: 'Os Oito Estágios do Ciclo Vital',
    shortDescription: 'Estudo guiado detalhado do nascimento à velhice: polos em tensão, virtudes do ego, perguntas centrais e casos práticos.',
    durationMinutes: 45,
    badge: 'Módulo 2',
    iconName: 'Layers',
  },
  {
    id: 'topico-3',
    order: 3,
    title: 'Adolescência em Profundidade: Identidade',
    shortDescription: 'O 5º estágio, a virtude da Fidelidade, paradigma de James Marcia (4 estados), Modelo U-MICS e fatores contextuais.',
    durationMinutes: 50,
    badge: 'Módulo 3',
    iconName: 'UserCheck',
  },
  {
    id: 'topico-4',
    order: 4,
    title: 'Evidências Científicas & Metanálise',
    shortDescription: 'Revisão da metanálise de Potterton et al. (2022): o que a ciência sustenta e a proibição de transformar crise em patologia.',
    durationMinutes: 30,
    badge: 'Módulo 4',
    iconName: 'BarChart2',
  },
  {
    id: 'topico-5',
    order: 5,
    title: 'Prática Clínica, Escolar e SATEPSI',
    shortDescription: 'Roteiro de 7 perguntas clínicas, orientações parentais e escolares, e a legislação do CFP (Resolução nº 31/2022).',
    durationMinutes: 35,
    badge: 'Módulo 5',
    iconName: 'Briefcase',
  },
  {
    id: 'topico-6',
    order: 6,
    title: 'Laboratório Prático: Casos & Avaliação',
    shortDescription: 'Simulações interativas de casos clínicos e educacionais com tomada de decisão e exercícios de fixação com gabarito comentado.',
    durationMinutes: 40,
    badge: 'Módulo 6',
    iconName: 'Award',
  },
];
