/**
 * @file adolescenceDeepData.ts
 * Dados detalhados para o Tópico 3: Adolescência em Profundidade
 * Identidade vs Confusão de Papéis, Paradigma de Marcia, Modelo U-MICS e Fatores Contextuais
 */

import { MarciaStatus, IdentityDomain, ContextualFactor, UMICSDimension } from '../types/adolescence';

export const MARCIA_STATUSES_DATA: MarciaStatus[] = [
  {
    id: 'difusao',
    name: 'Difusão da Identidade',
    nameEn: 'Identity Diffusion',
    exploration: 'Baixa',
    commitment: 'Baixo',
    description: 'Caracteriza-se pela ausência de busca ativa por direcionamentos de vida e escassez de compromissos firmados em ocupação, valores ou visão de mundo.',
    characteristics: [
      'Pouco interesse ou iniciativa em tomar decisões sobre o futuro.',
      'Mudança volúvel de postura conforme a conveniência do grupo momentâneo.',
      'Sensação de alienação ou ausência de rumo estável.',
      'Falta de urgência desenvolvimental para firmar convicções.',
    ],
    clinicalSignificance: 'Pode ser uma manifestação passageira no início da adolescência. Torna-se clinicamente relevante se associada a sofrimento emocional grave, apatia crônica e isolamento social (não confundir com diagnóstico!).',
    motto: '“Não sei o que quero fazer e nem tenho pensado nisso ultimamente.”',
    example: 'Um jovem de 17 anos que não se interessa por nenhum curso, não tem opiniões políticas ou religiosas e vive ao sabor do que os colegas sugerem no dia.',
  },
  {
    id: 'pre_fechamento',
    name: 'Pré-fechamento',
    nameEn: 'Foreclosure',
    exploration: 'Baixa',
    commitment: 'Alto',
    description: 'O indivíduo assume compromissos firmes e duradouros, mas sem ter passado por um período de exploração pessoal e questionamento reflexivo de alternativas.',
    characteristics: [
      'Adoção acrítica de modelos, crenças e expectativas parentais ou religiosas.',
      'Elevada certeza aparente e rigidez na manutenção das convicções.',
      'Baixa tolerância à ambiguidade ou a opiniões divergentes.',
      'Fragilidade potencial caso o plano pré-estabelecido seja bruscamente interrompido.',
    ],
    clinicalSignificance: 'Muitas vezes visto socialmente como o "jovem exemplar", mas pode apresentar crises severas na adultez quando exposto à pluralidade cultural na universidade.',
    motto: '“Sempre soube que seria médico como meu pai; nunca cogitei outra coisa.”',
    example: 'Uma estudante que entra no mesmo partido e mesma profissão da mãe aos 15 anos sem ter pesquisado ou comparado com outras profissões.',
  },
  {
    id: 'moratoria',
    name: 'Moratória Psicossocial',
    nameEn: 'Moratorium',
    exploration: 'Alta',
    commitment: 'Baixo ou instável',
    description: 'Estado de busca vigorosa e ativa. O indivíduo está explorando alternativas profissionais, ideológicas e relacionais antes de formalizar compromissos duradouros.',
    characteristics: [
      'Questionamento profundo dos valores herdados da família.',
      'Experimentação de estilos, cursos, grupos de amigos e militâncias.',
      'Ansiedade produtiva e reflexão crítica intensa.',
      'Comportamento normativo e amplamente adaptativo no ciclo de vida moderno.',
    ],
    clinicalSignificance: 'Essencial não patologizar! Experimentar e mudar de ideia 3 vezes aos 16 anos é moratória saudável, não confusão doentia. O papel do psicólogo é oferecer continência reflexiva.',
    motto: '“Estou pesquisando, conhecendo diferentes áreas e filosofias antes de me amarrar a uma decisão.”',
    example: 'Um jovem de 18 anos que faz disciplinas isoladas na universidade, voluntariado e estuda idiomas para descobrir onde residem seus talentos autênticos.',
  },
  {
    id: 'identidade_alcancada',
    name: 'Identidade Alcançada / Estabelecida',
    nameEn: 'Identity Achievement',
    exploration: 'Alta prévia',
    commitment: 'Alto',
    description: 'O indivíduo consolidou compromissos seguros em áreas nucleares da existência, após ter passado por um período prévio de exploração autônoma e reflexão crítica.',
    characteristics: [
      'Clareza quanto aos próprios valores, vocação e projetos de vida.',
      'Apropriação autoral das decisões ("esta escolha é minha").',
      'Flexibilidade cognitiva para reavaliar compromissos quando necessário (ciclos MAMA).',
      'Maior tolerância à frustração e bem-estar socioemocional consistente.',
    ],
    clinicalSignificance: 'Representa a virtude da Fidelidade de Erikson em ação. Não é uma linha de chegada eterna: adultos podem retornar à moratória após divórcio, migração ou transição de carreira.',
    motto: '“Pensei criticamente, experimentei, e hoje tenho clareza sobre os valores que guiam minha caminhada.”',
    example: 'Uma estudante que após hesitar entre artes e direito, engajou-se em estágios, conversou com profissionais e escolheu a Defensoria Pública com genuíno senso de propósito.',
  },
];

export const IDENTITY_DOMAINS: IdentityDomain[] = [
  {
    domain: 'Continuidade Autobiográfica',
    characteristicQuestions: ['“Como minha história de vida explica quem sou hoje?”', '“Como conecto meu passado na infância com meus projetos futuros?”'],
    explanation: 'A capacidade de alinhar acontecimentos dispersos em uma narrativa coesa com sentido e continuidade histórica.',
    contextImpact: 'Eventos traumáticos ou rupturas bruscas podem desafiar a sensação de continuidade do self.',
  },
  {
    domain: 'Valores e Ética',
    characteristicQuestions: ['“No que acredito quando não estou apenas repetindo minha família ou amigos?”', '“Quais princípios guiam minhas escolhas morais?”'],
    explanation: 'Diferenciação crítica entre normas introjetadas passivamente e valores internalizados com autoria.',
    contextImpact: 'Culturas coletivistas versus individualistas moldam o equilíbrio entre dever grupal e autoria pessoal.',
  },
  {
    domain: 'Educação e Trabalho (Vocacional)',
    characteristicQuestions: ['“Que capacidades quero desenvolver no mundo?”', '“Que futuro profissional consigo vislumbrar para mim?”'],
    explanation: 'O domínio mais tradicionalmente pesquisado desde Marcia (1966); consolidação do sentimento de competência produtiva.',
    contextImpact: 'Condicionado pelas oportunidades do mercado de trabalho e pelo capital cultural da família.',
  },
  {
    domain: 'Relações Interpessoais',
    characteristicQuestions: ['“Que tipo de amigo, parceiro afetivo ou membro de comunidade quero ser?”', '“Como estabeleço limites nos meus vínculos?”'],
    explanation: 'Articulação entre autonomia e pertencimento: ser leal a outros sem anular o próprio self.',
    contextImpact: 'O grupo de pares funciona como espelho social e arena de experimentação de papéis.',
  },
  {
    domain: 'Corpo e Imagem Corporal',
    characteristicQuestions: ['“Como interpreto as transformações do meu corpo na puberdade?”', '“Como esse corpo entra na minha identidade?”'],
    explanation: 'Integração das rápidas mudanças puberais em um esquema corporal aceito e investido com carinho.',
    contextImpact: 'Pressões estéticas intensificadas pelas redes sociais digitais e filtros visuais.',
  },
  {
    domain: 'Gênero e Sexualidade',
    characteristicQuestions: ['“Como compreendo e nomeio minha experiência de gênero e atração afetivo-sexual?”', '“Onde encontro espaços seguros para ser eu mesmo?”'],
    explanation: 'Acolhimento da própria orientação e vivência de gênero; superação do estigma social.',
    contextImpact: 'O sofrimento muitas vezes deriva de preconceito e estresse de minoria, não de patologia interna.',
  },
  {
    domain: 'Cultura, Raça e Etnia',
    characteristicQuestions: ['“A que grupos étnico-raciais pertenço?”', '“O que esse pertencimento significa para mim e para a sociedade?”'],
    explanation: 'Construção da identidade étnico-racial em contextos marcados por desigualdades estruturais.',
    contextImpact: 'Identidade grupal positiva pode atuar como escudo protetor contra a discriminação.',
  },
  {
    domain: 'Política e Religião (Visão de Mundo)',
    characteristicQuestions: ['“Que visão de sociedade e de espiritualidade considero defensável?”', '“Como me posiciono frente às injustiças do mundo?”'],
    explanation: 'Posicionamento ideológico reflexivo frente às grandes questões da pólis e do sentido existencial.',
    contextImpact: 'Polarização em ambientes digitais pode estimular fechamento sectário precoce.',
  },
  {
    domain: 'Futuro e Selves Possíveis',
    characteristicQuestions: ['“Que versões possíveis de mim considero desejáveis e realizáveis?”', '“Quais versões de mim desejo evitar a todo custo?”'],
    explanation: 'A projeção de metas no horizonte temporal futuro, gerando motivação desenvolvimental.',
    contextImpact: 'Jovens em vulnerabilidade social necessitam de políticas públicas para expandir seus horizontes possíveis.',
  },
];

export const UMICS_DIMENSIONS: UMICSDimension[] = [
  {
    name: 'Commitment',
    namePt: 'Compromisso (5 itens)',
    itemCount: 5,
    description: 'Refere-se a decisões relativamente firmes tomadas em áreas importantes da vida e à confiança e segurança pessoal derivadas dessas escolhas.',
    questionPrompt: 'Exemplo de item: “Meus estudos/meu trabalho me dão segurança sobre o que quero para o meu futuro.”',
    clinicalRelevance: 'Alto compromisso prediz estabilidade emocional e senso de direção existencial.',
  },
  {
    name: 'In-depth Exploration',
    namePt: 'Exploração em Profundidade (5 itens)',
    itemCount: 5,
    description: 'Refere-se ao monitoramento reflexivo das escolhas atuais: buscar informações adicionais, conversar com outros e aprofundar o significado do compromisso assumido.',
    questionPrompt: 'Exemplo de item: “Converso bastante com outras pessoas sobre meus planos para entender melhor minha escolha.”',
    clinicalRelevance: 'Diferencia o compromisso cego e rígido (pré-fechamento) de um compromisso vivo, dinâmico e flexível.',
  },
  {
    name: 'Reconsideration of Commitment',
    namePt: 'Reconsideração do Compromisso (3 itens)',
    itemCount: 3,
    description: 'Refere-se à comparação ativa das escolhas atuais com possíveis alternativas, avaliando se o compromisso presente ainda é satisfatório ou se deve ser modificado.',
    questionPrompt: 'Exemplo de item: “Frequentemente me pego pensando se não seria melhor mudar completamente de área/plano.”',
    clinicalRelevance: 'Alta reconsideração contínua pode indicar instabilidade ou desencadear um novo ciclo de moratória.',
  },
];

export const CONTEXTUAL_FACTORS_DATA: ContextualFactor[] = [
  {
    factor: 'familia_e_pares',
    title: 'Família e Grupo de Pares',
    summary: 'A autonomia saudável não nasce da destruição dos laços familiares, mas da diferenciação com suporte seguro.',
    keyPoints: [
      'Famílias que combinam afeto incondicional com incentivo à discordância dialógica favorecem a melhor exploração.',
      'Dois extremos familiares prejudicam: o controle autocrático (induz ao pré-fechamento) e a negligência afetiva (induz à difusão desamparada).',
      'Os pares expandem o catálogo de "selves possíveis", funcionando como laboratório social para testar estilos e opiniões.',
      'A pressão de conformidade dos pares pode restringir a autenticidade se o jovem não tiver base segura interna.',
    ],
    scientificEvidence: 'Branje et al. (2021) demonstraram que a regulação emocional e os conflitos familiares construtivos são preditores-chave de trajetórias identitárias maduras.',
  },
  {
    factor: 'escola_e_educacao',
    title: 'Escola e Projetos de Vida',
    summary: 'A escola atua muito além das notas acadêmicas: ela categoriza quem é visto como "inteligente", "criativo" ou "sem futuro".',
    keyPoints: [
      'A escola é a arena central para a consolidação da competência (4º estágio) que alimenta a identidade (5º estágio).',
      'Rotular precocemente alunos em "área de exatas" ou "fraco em leitura" cristaliza sentimentos destrutivos de inferioridade.',
      'A orientação vocacional moderna deve focar na exploração reflexiva do repertório cultural, não em testes prescritivos fechados.',
      'Atividades extracurriculares (grêmio, teatro, ciências, esportes) fornecem matéria-prima concreta para experimentação.',
    ],
    scientificEvidence: 'Programas de intervenção escolar estruturada (ex: Identity Project) evidenciam aumento na resolução identitária e redução de preconceitos em sala de aula.',
  },
  {
    factor: 'classe_social',
    title: 'Classe Social e Moratória Desigual',
    summary: 'A moratória psicossocial não é universalmente acessível: requer condições materiais que permitam adiar o ingresso no trabalho.',
    keyPoints: [
      'Experimentar estágios não remunerados, trocar de graduação ou viajar para "se encontrar" exige capital econômico familiar.',
      'Jovens de classes populares precisam conjugar precocemente estudo, trabalho braçal e sustento da casa.',
      'Uma escolha vocacional rápida não pode ser estigmatizada automaticamente como "falha de maturidade", mas sim como adaptação a constrangimentos reais.',
      'A psicologia brasileira crítica (Oliveira, 2006) destaca que a teoria clássica adotou o modelo de jovem burguês como padrão de maturidade universal.',
    ],
    scientificEvidence: 'Estudos sociodemográficos mostram que a Adultez Emergente (Arnett) é um fenômeno predominantemente restrito a classes médias e altas urbanas.',
  },
  {
    factor: 'cultura_raca_etnia',
    title: 'Cultura, Raça e Etnicidade',
    summary: 'A identidade é indissociável das dinâmicas raciais, históricas e comunitárias.',
    keyPoints: [
      'Em sociedades marcadas pelo racismo estrutural, adolescentes negros e indígenas enfrentam estereótipos que afetam sua autoimagem.',
      'A identidade étnico-racial positiva (exploração da ancestralidade e pertencimento) funciona como amortecedor psicológico contra a discriminação.',
      'Erikson reconheceu a dimensão cultural já em seus estudos com os povos Oglala Sioux em Yale.',
      'Modelos norte-americanos clássicos hipervalorizaram a independência individual, ignorando que em muitas culturas a maturidade reside na interdependência comunitária.',
    ],
    scientificEvidence: 'Rivas-Drake et al. (2014) revelam em metanálise que a afirmação étnico-racial correlaciona-se com melhor autoestima e engajamento escolar.',
  },
  {
    factor: 'diversidade_genero_lgbtqia',
    title: 'Diversidade de Gênero e Orientação Sexual',
    summary: 'A vivência LGBTQIA+ não é sintoma de "confusão identitária", mas expressão da diversidade humana.',
    keyPoints: [
      'O sofrimento relatado por adolescentes trans e homoafetivos decorre do estresse de minoria (rejeição, bullying, invisibilidade familiar).',
      'O papel do psicólogo nunca é conduzir para uma norma cis-heteronormativa, mas acolher e validar a autoria da experiência do paciente.',
      'A teoria clássica de meados do século XX reproduzia concepções binárias de papéis que hoje são superadas pela pesquisa científica afirmativa.',
    ],
    scientificEvidence: 'Pesquisas clínicas contemporâneas comprovam que o apoio familiar e escolar à identidade de jovens LGBTQ+ reduz expressivamente índices de ideação suicida.',
  },
  {
    factor: 'redes_sociais_digital',
    title: 'Redes Sociais e Identidade Digital',
    summary: 'O padrão de uso e o tipo de interação importam muito mais do que a simples contagem de "tempo de tela".',
    keyPoints: [
      'A metanálise recente de Avci, Baams & Kretschmer (32 estudos, 19.658 participantes) revelou que a qualidade da presença online é o fator decisivo.',
      'Apresentação autêntica de si e busca por comunidades de interesses comuns relacionam-se a maior clareza de autoconceito.',
      'A comparação social tóxica e a dependência de validação algorítmica por curtidas associam-se a sofrimento identitário e instabilidade do self.',
      'As redes funcionam tanto como arena de experimentação de selves possíveis quanto como amplificador de pressão estética conformista.',
    ],
    scientificEvidence: 'A maior parte dos estudos é transversal; portanto, não se pode afirmar causalidade simplista de que redes sociais "destroem a identidade".',
  },
];
