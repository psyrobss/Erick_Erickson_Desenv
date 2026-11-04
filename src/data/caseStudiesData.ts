/**
 * @file caseStudiesData.ts
 * Estudos de caso interativos para aplicação clínica e reflexão de Psicologia do Desenvolvimento II
 */

import { CaseStudy } from '../types/caseStudy';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'caso-lucas-16',
    studentName: 'Lucas',
    age: 16,
    context: 'Estudante do 2º ano do Ensino Médio, filho de advogados em cidade de médio porte.',
    narrativeQuote: '“Meu pai já tem o escritório pronto para mim. Ele diz que quem faz arte morre de fome. Mas quando passo o fim de semana desenhando identidades visuais para os projetos da escola, sinto que sou eu mesmo. Não sei se tenho coragem de dizer isso a ele.”',
    scenario: 'Lucas está sob forte pressão familiar para se inscrever em cursinho focado na faculdade de Direito. Ele cumpre as tarefas escolares com notas regulares, mas demonstra desânimo evidente e sintomas somáticos (cefaleia frequente nas segundas-feiras). Passa as noites desenhando e estudando tipografia por conta própria.',
    developmentalTension: 'Tensão entre Pré-fechamento (Foreclosure induzido pela família) e Moratória Psicossocial autêntica com exploração artística.',
    options: [
      {
        id: 'opt-1-1',
        label: 'Impor o Direito como garantia de segurança financeira imediata.',
        actionText: 'Orientar Lucas a aceitar o Direito, alegando que "a arte pode ficar como hobby seguro nos fins de semana".',
        marciaClassification: 'Indução ao Pré-fechamento (Foreclosure)',
        theoreticalRationale: 'Essa postura fecha prematuramente o ciclo de moratória do adolescente, priorizando a estabilidade instrumental em detrimento da apropriação do projeto de vida.',
        clinicalFeedback: 'Embora pragmática à primeira vista, essa abordagem frequentemente gera estagnação e crises existenciais graves na adultez média (7º estágio), quando o indivíduo percebe que viveu a vida desejada pelos pais.',
        isPedagogicallyOptimal: false,
      },
      {
        id: 'opt-1-2',
        label: 'Estimular a ruptura rebelde e corte imediato de laços com os pais.',
        actionText: 'Incentivar Lucas a confrontar agressivamente o pai e sair de casa se necessário para provar sua independência.',
        marciaClassification: 'Identidade Negativa / Rebelião Reativa',
        theoreticalRationale: 'Erikson alertou que a "identidade negativa" (fazer o oposto apenas para se opor à família) continua dependente das referências parentais, sem construir autonomia verdadeira.',
        clinicalFeedback: 'Rompimentos familiares sem base de apoio deixam o adolescente desamparado economicamente e emocionalmente em um momento de vulnerabilidade.',
        isPedagogicallyOptimal: false,
      },
      {
        id: 'opt-1-3',
        label: 'Promover Moratória Estruturada e Diálogo com Base Segura.',
        actionText: 'Ajudar Lucas a mapear áreas interdisciplinares (Design Gráfico, Comunicação, Arquitetura), entrevistar profissionais e formular uma conversa assertiva com os pais apresentando planos concretos.',
        marciaClassification: 'Moratória Ativa com Projeção para Identidade Alcançada',
        theoreticalRationale: 'Permite exploração reflexiva (moratória) mantendo o vínculo de pertencimento com a família. O jovem experimenta a virtude da Fidelidade aos próprios interesses com realismo.',
        clinicalFeedback: 'Excelente conduta! O psicólogo atua como facilitador da exploração, ajudando o jovem a sustentar a angústia da escolha e a construir pontes comunicativas com os cuidadores.',
        isPedagogicallyOptimal: true,
      },
    ],
    debriefing: {
      eriksonianAnalysis: 'Lucas vive a clássica tensão do 5º estágio: articular a lealdade às identificações infantis com a emergência de uma síntese vocacional original.',
      contextualAnalysis: 'A classe social familiar oferece segurança econômica, mas exige em contrapartida a reprodução do capital simbólico e profissional da linhagem.',
      clinicalPrecaution: 'Diferenciar a angústia da indecisão vocacional de um episódio depressivo maior. A cefaleia aponta para somatização do conflito de lealdade.',
    },
  },
  {
    id: 'caso-beatriz-19',
    studentName: 'Beatriz',
    age: 19,
    context: 'Universitária do 4º período do curso de Odontologia, residente no interior do RN.',
    narrativeQuote: '“Passei na federal de primeira e todos fizeram festa na minha cidade. No começo achei que era isso mesmo. Mas agora que começamos as clínicas com pacientes, sinto uma angústia sufocante. Toda noite penso em trancar tudo, mas como olhar para os meus pais que venderam uma moto para me manter aqui?”',
    scenario: 'Beatriz ingressou no curso com alto compromisso inicial. No entanto, o contato prático com procedimentos cirúrgicos revelou extrema aversão ao ambiente hospitalar/odontológico, gerando insônia e crises de choro. Ela começou a frequentar palestras na área de Gestão em Saúde Pública e Políticas Sociais, sentindo-se profundamente atraída.',
    developmentalTension: 'Transição da Adultez Emergente e dinâmica U-MICS: Reconsideração do Compromisso e novo ciclo de Moratória (ciclo MAMA).',
    options: [
      {
        id: 'opt-2-1',
        label: 'Exigir conclusão forçada do curso para não "desperdiçar investimento".',
        actionText: 'Instruir Beatriz a terminar o curso a qualquer custo, pois "diploma universitário não se joga fora".',
        marciaClassification: 'Perpetuação de Pré-fechamento Forçado',
        theoreticalRationale: 'Ignora a função desenvolvimental da reconsideração do compromisso (U-MICS), forçando o indivíduo a operar em dissonância crônica com seus valores.',
        clinicalFeedback: 'Risco expressivo de adoecimento psíquico, burnout acadêmico precoce e abandono posterior da profissão após anos de sofrimento.',
        isPedagogicallyOptimal: false,
      },
      {
        id: 'opt-2-2',
        label: 'Avaliar a Reconsideração e Possibilidades de Transição Interna.',
        actionText: 'Trabalhar narrativamente a culpa pelo investimento familiar, explorar opções de equivalência de disciplinas (como Saúde Coletiva/Gestão) e planejar uma transição gradual e consciente.',
        marciaClassification: 'Ciclo MAMA (Moratória-Achievement-Moratória-Achievement)',
        theoreticalRationale: 'O modelo de ciclo duplo da U-MICS reconhece que a identidade adulta é dinâmica; reavaliar um compromisso à luz de novas experiências é sinal de plasticidade psicológica.',
        clinicalFeedback: 'Intervenção clínica exemplar. Acolhe o sentimento de responsabilidade familiar e constrói alternativas viáveis sem demonizar a trajetória percorrida.',
        isPedagogicallyOptimal: true,
      },
    ],
    debriefing: {
      eriksonianAnalysis: 'Beatriz ilustra o conceito de Adultez Emergente (Arnett) e a continuidade entre o 5º estágio (Identidade) e o 6º (Intimidade/Compromisso). A estabilização vocacional contemporânea estende-se frequentemente até os 25 anos.',
      contextualAnalysis: 'O peso do sacrifício financeiro familiar em famílias de trabalhadores do interior potiguar adiciona uma camada de dívida simbólica complexa ao processo de diferenciação.',
      clinicalPrecaution: 'Verificar sintomas de transtorno de pânico ou ansiedade generalizada decorrentes da sobrecarga clínica.',
    },
  },
  {
    id: 'caso-mateus-15',
    studentName: 'Mateus',
    age: 15,
    context: 'Estudante do 9º ano em escola pública, com histórico de reprovação.',
    narrativeQuote: '“Os professores já entram na sala me olhando torto. Dizem que não sirvo para exatas nem para nada que precise pensar. Na internet achei um grupo que pensa como eu: nada presta e tudo vai acabar mesmo.”',
    scenario: 'Mateus acumula histórico de notas baixas e repreensões públicas. Na escola, isolou-se dos colegas da turma e passa o intervalo em cantos isolados. Em fóruns digitais anônimos, consome conteúdos niilistas e discursos de ódio, encontrando ali um senso distorcido de pertencimento.',
    developmentalTension: 'Fracasso no 4º estágio (Inferioridade escolar crônica) repercutindo no 5º estágio (Identidade Negativa e Difusão).',
    options: [
      {
        id: 'opt-3-1',
        label: 'Punição disciplinar e suspensão escolar imediata.',
        actionText: 'Aplicar suspensões escolares frequentes e encaminhar o aluno com rótulo de "problema de conduta indisciplinar".',
        marciaClassification: 'Aprofundamento da Identidade Negativa',
        theoreticalRationale: 'A punição apenas confirma a profecia autorrealizável de inferioridade e incapacidade, empurrando o jovem ainda mais para comunidades radicais online.',
        clinicalFeedback: 'Aumenta drasticamente o risco de evasão escolar definitiva e radicalização violenta em subculturas digitais.',
        isPedagogicallyOptimal: false,
      },
      {
        id: 'opt-3-2',
        label: 'Resgate da Competência e Integração Comunitária.',
        actionText: 'Mapear habilidades não acadêmicas de Mateus (edição de vídeo, montagem de computadores, esportes), oferecer apoio pedagógico individualizado sem humilhação e integrá-lo em projetos colaborativos.',
        marciaClassification: 'Fortalecimento da Competência (4º estágio) como alicerce da Identidade',
        theoreticalRationale: 'Erikson postulou que a identidade reorganiza os estágios prévios. Sem recuperar a experiência concreta de competência ("eu consigo realizar algo de valor"), a identidade fica sem alicerce.',
        clinicalFeedback: 'Perfeito alinhamento com a teoria eriksoniana. A experiência de competência prática e reconhecimento pelos pares quebra o ciclo de inferioridade generalizada.',
        isPedagogicallyOptimal: true,
      },
    ],
    debriefing: {
      eriksonianAnalysis: 'Exemplo contundente do princípio epigenético: uma crise mal resolvida no estágio da Diligência/Inferioridade compromete a capacidade de construir compromissos afirmativos na adolescência.',
      contextualAnalysis: 'A internet funciona como arena substitutiva de reconhecimento onde a rejeição escolar e social encontra acolhimento sectário.',
      clinicalPrecaution: 'Investigar riscos de autolesão não suicida, ideação suicida e consumo de conteúdos de violência extremista.',
    },
  },
  {
    id: 'caso-juliana-17',
    studentName: 'Juliana',
    age: 17,
    context: 'Estudante negra de escola técnica pública na região do Trairi / RN.',
    narrativeQuote: '“Quando cheguei para apresentar meu projeto de iniciação científica na capital, me perguntaram se eu era da equipe de apoio ou da limpeza. Naquele dia chorei no banheiro. Mas minha avó me ensinou que nosso povo tem história de reis e guerreiras, e não vou deixar que me diminuam.”',
    scenario: 'Juliana é bolsista de iniciação científica e almeja vaga no curso de Medicina. Enfrenta microagressões raciais constantes e escassez de representatividade de médicos negros. Com o apoio de uma professora mentora, começou um clube de leitura sobre escritoras negras brasileiras (Carolina Maria de Jesus, Conceição Evaristo).',
    developmentalTension: 'Construção da Identidade Étnico-Racial positiva como escudo resiliente contra o racismo estrutural.',
    options: [
      {
        id: 'opt-4-1',
        label: 'Desconsiderar a dimensão racial como "vitimismo desnecessário".',
        actionText: 'Dizer a Juliana que "a cor da pele não importa para a ciência e que o mérito individual resolve tudo".',
        marciaClassification: 'Negação do Contexto Sociocultural / Cegueira Racial',
        theoreticalRationale: 'Ignora as evidências científicas sólidas (Rivas-Drake et al., 2014) de que a discriminação étnico-racial causa estresse real e que a identidade racial positiva é fator de proteção comprovado.',
        clinicalFeedback: 'Invalidação violenta da experiência do sujeito, perpetuando o silenciamento e a solidão da aluna racializada.',
        isPedagogicallyOptimal: false,
      },
      {
        id: 'opt-4-2',
        label: 'Apoiar o Fortalecimento da Identidade Étnico-Racial e Redes de Mentoria.',
        actionText: 'Validar a indignação legítima frente à discriminação, apoiar o protagonismo no clube de leitura e conectá-la a redes de universitários e médicos negros cotistas.',
        marciaClassification: 'Identidade Alcançada com Afirmação Étnico-Racial Coletiva',
        theoreticalRationale: 'Combina exploração histórica da ancestralidade com compromisso afirmativo. Transforma a dor do preconceito em força comunitária e propósito de vida.',
        clinicalFeedback: 'Atuação exemplar orientada pelas diretrizes éticas contemporâneas da psicologia em direitos humanos e relações raciais.',
        isPedagogicallyOptimal: true,
      },
    ],
    debriefing: {
      eriksonianAnalysis: 'Erikson destacou que a identidade pessoal precisa de mútuo reconhecimento social. Quando a sociedade dominante impõe estigmas raciais, a identificação com a comunidade e com a ancestralidade fornece a matriz de sustentação da fidelidade do ego.',
      contextualAnalysis: 'A interiorização do ensino superior público no RN (políticas de expansão e cotas) expandiu o horizonte de selves possíveis para juventudes historicamente marginalizadas.',
      clinicalPrecaution: 'Acolher a exaustão decorrente do estresse de minoria e evitar colocar sobre a estudante o fardo solitário de "educar o ambiente".',
    },
  },
];
