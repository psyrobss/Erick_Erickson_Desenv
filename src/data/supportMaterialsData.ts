/**
 * @file supportMaterialsData.ts
 * Material de apoio acadêmico, links institucionais e bibliografia comentada
 * Disciplina: Psicologia do Desenvolvimento II - FACISA UFRN
 */

export interface AcademicSource {
  id: string;
  category: 'Fonte Primária' | 'Operacionalização Clássica' | 'Pesquisa Brasileira' | 'Metanálise & Síntese Contemporânea' | 'Recurso Institucional';
  author: string;
  year: number | string;
  title: string;
  publication: string;
  url?: string;
  annotation: string;
  readingLayer: 1 | 2 | 3; // 1: Erikson original; 2: Marcia e modelos empíricos; 3: Crítica contextual e metanálises
}

export const SUPPORT_MATERIALS_DATA: AcademicSource[] = [
  // Camada 1: Fontes Primárias de Erikson
  {
    id: 'erikson-1950',
    category: 'Fonte Primária',
    author: 'ERIKSON, Erik H.',
    year: '1950/1963',
    title: 'Childhood and Society',
    publication: 'New York: W. W. Norton & Company',
    url: 'https://wwnorton.com/books/9780393310689',
    annotation: 'Obra matricial onde Erikson apresenta o esquema dos oito estágios do ciclo vital, articulando psicanálise, antropologia e história.',
    readingLayer: 1,
  },
  {
    id: 'erikson-1956',
    category: 'Fonte Primária',
    author: 'ERIKSON, Erik H.',
    year: 1956,
    title: 'The Problem of Ego Identity',
    publication: 'Journal of the American Psychoanalytic Association, v. 4, n. 1, p. 56–121',
    url: 'https://journals.sagepub.com/doi/10.1177/000306515600400104',
    annotation: 'O texto seminal e aprofundado onde o autor desenvolve a complexidade clínica da identidade do ego antes das simplificações didáticas dos manuais.',
    readingLayer: 1,
  },
  {
    id: 'erikson-1968',
    category: 'Fonte Primária',
    author: 'ERIKSON, Erik H.',
    year: 1968,
    title: 'Identity: Youth and Crisis',
    publication: 'New York: W. W. Norton & Company',
    url: 'https://books.google.com/books?id=SKidSuluprgC',
    annotation: 'Elaboração madura e definitiva da teoria da identidade na adolescência, detalhando a moratória psicossocial, a fidelidade e o contexto da juventude.',
    readingLayer: 1,
  },
  {
    id: 'erikson-1982',
    category: 'Fonte Primária',
    author: 'ERIKSON, Erik H.; ERIKSON, Joan M.',
    year: 1982,
    title: 'The Life Cycle Completed',
    publication: 'New York: W. W. Norton & Company',
    url: 'https://books.google.com/books/about/The_Life_Cycle_Completed_Extended_Versio.html',
    annotation: 'Revisão tardia do ciclo vital com foco especial na velhice avançada e na integração dos estágios adultos.',
    readingLayer: 1,
  },

  // Camada 2: Operacionalização Clássica e Pesquisas Brasileiras
  {
    id: 'marcia-1966',
    category: 'Operacionalização Clássica',
    author: 'MARCIA, James E.',
    year: 1966,
    title: 'Development and validation of ego-identity status',
    publication: 'Journal of Personality and Social Psychology, v. 3, n. 5, p. 551–558',
    url: 'https://link.springer.com/rwe/10.1007/978-0-387-79061-9_1445',
    annotation: 'Artigo histórico que fundou o paradigma de 4 estados de identidade (Difusão, Pré-fechamento, Moratória e Identidade Alcançada) a partir de exploração e compromisso.',
    readingLayer: 2,
  },
  {
    id: 'oliveira-2006',
    category: 'Pesquisa Brasileira',
    author: 'OLIVEIRA, Maria Cláudia S. L.',
    year: 2006,
    title: 'Identidade, narrativa e desenvolvimento na adolescência: uma revisão crítica',
    publication: 'Psicologia em Estudo (Maringá), SciELO Brasil',
    url: 'https://www.scielo.br/j/pe/a/pB6Rn6NbJgKzRb3dnv35qtn/?lang=pt',
    annotation: 'Excelente revisão crítica brasileira que questiona as visões abstratas e normativas da adolescência, propondo a psicologia dialógica e narrativa.',
    readingLayer: 2,
  },
  {
    id: 'scielo-prc-2018',
    category: 'Pesquisa Brasileira',
    author: 'SCHOEN-FERREIRA, T. H.; AZNAR-FARIAS, M.; SILVARES, E. F. M.',
    year: 2018,
    title: 'Desenvolvimento da identidade em adolescentes estudantes do ensino médio',
    publication: 'Psicologia: Reflexão e Crítica, SciELO Brasil',
    url: 'https://www.scielo.br/j/prc/a/79tPzJPS8XyZj3wkGCnyncK/?lang=pt',
    annotation: 'Investigação empírica brasileira analisando o modelo de Marcia e moratória em estudantes de ensino médio no contexto nacional.',
    readingLayer: 2,
  },

  // Camada 3: Metanálises e Pesquisas Contemporâneas
  {
    id: 'potterton-2022',
    category: 'Metanálise & Síntese Contemporânea',
    author: 'POTTERTON, R. et al.',
    year: 2022,
    title: 'Identity Development and Social-Emotional Disorders During Adolescence and Emerging Adulthood: A Systematic Review and Meta-Analysis',
    publication: 'Journal of Youth and Adolescence (Springer Nature)',
    url: 'https://link.springer.com/article/10.1007/s10964-021-01536-7',
    annotation: 'Metanálise seminal com 20 estudos longitudinais e 13.787 participantes; demonstra que mudanças na identidade não predizem linearmente mudanças em depressão.',
    readingLayer: 3,
  },
  {
    id: 'crocetti-2008',
    category: 'Metanálise & Síntese Contemporânea',
    author: 'CROCETTI, Elisabetta; RUBINI, Monica; MEEUS, Wim',
    year: 2008,
    title: 'Capturing the dynamics of identity, in-depth exploration, and reconsideration of commitment: validation of the U-MICS',
    publication: 'Journal of Adolescence, v. 31, p. 207–222',
    url: 'https://www.elisabettacrocetti.com/u-mics/',
    annotation: 'Apresentação e validação da escala U-MICS, introduzindo o modelo de ciclo duplo da identidade.',
    readingLayer: 3,
  },
  {
    id: 'avci-2024',
    category: 'Metanálise & Síntese Contemporânea',
    author: 'AVCI, E.; BAAMS, L.; KRETSCHMER, T.',
    year: '2024/2025',
    title: 'A Systematic Review of Social Media Use and Adolescent Identity Development',
    publication: 'Adolescent Research Review (Springer Nature)',
    url: 'https://link.springer.com/article/10.1007/s40894-024-00251-1',
    annotation: 'Revisão sistemática de 32 estudos com 19.658 jovens demonstrando que o tipo de uso e a autenticidade online importam mais que o tempo de tela.',
    readingLayer: 3,
  },
  {
    id: 'rivas-drake-2014',
    category: 'Metanálise & Síntese Contemporânea',
    author: 'RIVAS-DRAKE, Deborah et al.',
    year: 2014,
    title: 'Ethnic and racial identity in adolescence: Implications for psychosocial, academic, and health-related outcomes',
    publication: 'Child Development, v. 85, n. 1, p. 40–57',
    url: 'https://srcd.onlinelibrary.wiley.com/doi/abs/10.1111/cdev.12175',
    annotation: 'Metanálise fundamental sobre o papel protetor da identidade étnico-racial em contextos multiculturais.',
    readingLayer: 3,
  },

  // Recursos Institucionais Abertos
  {
    id: 'openstax-psychology',
    category: 'Recurso Institucional',
    author: 'OPENSTAX',
    year: 2024,
    title: 'Psychology 2e - Chapter 9.2: Lifespan Theories (Erikson)',
    publication: 'Rice University / OpenStax (Creative Commons)',
    url: 'https://openstax.org/books/psychology-2e/pages/9-2-lifespan-theories',
    annotation: 'Livro-texto universitário aberto com introdução didática aos 8 estágios do ciclo vital.',
    readingLayer: 1,
  },
  {
    id: 'satepsi-site',
    category: 'Recurso Institucional',
    author: 'CONSELHO FEDERAL DE PSICOLOGIA (CFP)',
    year: 2022,
    title: 'SATEPSI - Sistema de Avaliação de Testes Psicológicos & Resolução CFP nº 31/2022',
    publication: 'Brasília: CFP',
    url: 'https://satepsi.cfp.org.br/',
    annotation: 'Portal oficial de consulta de testes aprovados para aplicação profissional de psicólogos no Brasil.',
    readingLayer: 3,
  },
];
