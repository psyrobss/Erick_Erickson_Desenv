/**
 * @file illustrationsData.ts
 * Ilustrações figurativas vetoriais e audiodescrições detalhadas para os 8 estágios do ciclo vital
 * e 4 casos clínicos de Erik Erikson, com foco em acessibilidade e funcionamento 100% offline.
 */

export interface StageIllustration {
  stageId: number;
  stageName: string;
  themeColor: string;
  altText: string;
  svgBadge: string; // SVG vetorial estilizado
  sceneDescription: string;
}

export const STAGES_ILLUSTRATIONS: Record<number, StageIllustration> = {
  1: {
    stageId: 1,
    stageName: 'Confiança vs. Desconfiança (0 a 1 ano)',
    themeColor: '#0284c7',
    altText: 'Ilustração de um bebê acolhido no colo de um cuidador atento em ambiente iluminado por tons azuis e dourados. O olhar mútuo transmite segurança e afeto primordial, simbolizando a virtude da Esperança.',
    sceneDescription: 'O vínculo primordial de apego seguro: a resposta afetuosa e previsível do cuidador funda a confiança básica.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3"/>
      <!-- Silhueta acolhedora: Cuidador abraçando bebê -->
      <circle cx="50" cy="42" r="14" fill="#0284C7"/>
      <path d="M30 84C30 68 42 62 58 62C68 62 76 67 80 76C74 82 62 86 48 86C38 86 32 85 30 84Z" fill="#0369A1"/>
      <!-- Bebê nos braços -->
      <circle cx="70" cy="56" r="9" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5"/>
      <ellipse cx="68" cy="72" rx="14" ry="10" fill="#38BDF8"/>
      <!-- Raio sutil de luz simbolizando Esperança -->
      <path d="M60 14L63 24L73 24L65 30L68 40L60 34L52 40L55 30L47 24L57 24Z" fill="#F59E0B" opacity="0.85"/>
    </svg>`,
  },
  2: {
    stageId: 2,
    stageName: 'Autonomia vs. Vergonha e Dúvida (1 a 3 anos)',
    themeColor: '#0d9488',
    altText: 'Ilustração de uma criança na primeira infância dando passos firmes e segurando um brinquedo com determinação, enquanto explora o chão com as próprias pernas, simbolizando a virtude da Vontade.',
    sceneDescription: 'A exploração motora e o controle esfincteriano: o nascimento do autocontrole e da livre escolha.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3"/>
      <!-- Criança ativa dando passos firmes -->
      <circle cx="60" cy="38" r="13" fill="#0D9488"/>
      <path d="M46 56H74L70 82H50L46 56Z" fill="#14B8A6"/>
      <!-- Perninhas em movimento -->
      <rect x="48" y="80" width="8" height="22" rx="4" fill="#0F766E"/>
      <rect x="64" y="80" width="8" height="18" rx="4" fill="#0F766E"/>
      <!-- Brinquedo cubo que a criança explora -->
      <rect x="76" y="52" width="16" height="16" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      <circle cx="60" cy="18" r="4" fill="#14B8A6"/>
    </svg>`,
  },
  3: {
    stageId: 3,
    stageName: 'Iniciativa vs. Culpa (3 a 6 anos)',
    themeColor: '#16a34a',
    altText: 'Ilustração de uma criança usando uma capa lúdica de super-herói ou exploradora, empunhando uma luneta de faz-de-conta apontada para as estrelas, simbolizando a virtude do Propósito.',
    sceneDescription: 'A idade do brincar e do faz-de-conta: planejamento de metas, imaginação criativa e equilíbrio com o senso moral.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3"/>
      <!-- Capa de explorador/fantasia -->
      <path d="M40 50L25 90L55 80Z" fill="#EA580C"/>
      <!-- Criança imaginativa -->
      <circle cx="58" cy="36" r="13" fill="#15803D"/>
      <path d="M48 52H68L65 84H51L48 52Z" fill="#22C55E"/>
      <!-- Luneta de brinquedo apontada para o alto -->
      <rect x="64" y="38" width="28" height="8" rx="2" transform="rotate(-30 64 38)" fill="#F59E0B"/>
      <!-- Estrela imaginária guiando o propósito -->
      <polygon points="95,20 98,28 106,28 100,34 102,42 95,37 88,42 90,34 84,28 92,28" fill="#EAB308"/>
    </svg>`,
  },
  4: {
    stageId: 4,
    stageName: 'Diligência vs. Inferioridade (6 a 12 anos)',
    themeColor: '#ea580c',
    altText: 'Ilustração de uma criança em idade escolar sentada em uma mesa organizando engrenagens e réguas de um projeto escolar, expressando foco e domínio prático, simbolizando a virtude da Competência.',
    sceneDescription: 'A idade escolar: domínio das ferramentas da cultura, cooperação com colegas e o sentimento de eficácia.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3"/>
      <!-- Mesa de trabalho/escola -->
      <rect x="24" y="78" width="72" height="6" rx="2" fill="#9A3412"/>
      <!-- Criança focada criando -->
      <circle cx="60" cy="40" r="13" fill="#C2410C"/>
      <path d="M46 56C46 56 50 78 60 78C70 78 74 56 74 56H46Z" fill="#F97316"/>
      <!-- Engrenagem da cooperação e técnica -->
      <circle cx="78" cy="68" r="9" fill="#0284C7"/>
      <circle cx="78" cy="68" r="4" fill="#FFEDD5"/>
      <!-- Lápis/ferramenta na mão -->
      <line x1="42" y1="62" x2="34" y2="76" stroke="#EAB308" strokeWidth="4" strokeLinecap="round"/>
    </svg>`,
  },
  5: {
    stageId: 5,
    stageName: 'Identidade vs. Confusão de Papéis (12 a 18+ anos)',
    themeColor: '#8b5cf6',
    altText: 'Ilustração de dois jovens em diálogo aberto sob uma bússola dourada que orienta suas escolhas e valores no horizonte, simbolizando a busca de identidade, a moratória e a virtude da Fidelidade.',
    sceneDescription: 'A encruzilhada da adolescência: quem sou eu? O grupo de iguais, a experimentação vocacional e a lealdade ética.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3"/>
      <!-- Bússola central da Fidelidade aos próprios valores -->
      <circle cx="60" cy="60" r="28" stroke="#7C3AED" strokeWidth="2.5" strokeDasharray="3 3"/>
      <polygon points="60,36 66,58 60,54 54,58" fill="#EC4899"/>
      <polygon points="60,84 66,62 60,66 54,62" fill="#6366F1"/>
      <circle cx="60" cy="60" r="4" fill="#4338CA"/>
      <!-- Silhuetas jovens em busca do self -->
      <circle cx="34" cy="62" r="9" fill="#8B5CF6"/>
      <circle cx="86" cy="62" r="9" fill="#6D28D9"/>
    </svg>`,
  },
  6: {
    stageId: 6,
    stageName: 'Intimidade vs. Isolamento (Jovem Adulto)',
    themeColor: '#ec4899',
    altText: 'Ilustração de duas pessoas adultas lado a lado conectadas por um entrelaço harmônico que respeita suas individualidades, simbolizando a reciprocidade, a vulnerabilidade e a virtude do Amor.',
    sceneDescription: 'A capacidade de fundir a própria identidade com a do outro sem receio de perder o self.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#FCE7F3" stroke="#EC4899" strokeWidth="3"/>
      <!-- Coração e laço entrelaçado simétrico -->
      <path d="M60 84C60 84 38 68 38 50C38 40 46 32 55 34C60 36 60 40 60 40C60 40 60 36 65 34C74 32 82 40 82 50C82 68 60 84 60 84Z" fill="#F43F5E" opacity="0.85"/>
      <!-- Silhuetas de cumplicidade mútua -->
      <circle cx="48" cy="46" r="7" fill="#BE185D"/>
      <circle cx="72" cy="46" r="7" fill="#BE185D"/>
    </svg>`,
  },
  7: {
    stageId: 7,
    stageName: 'Generatividade vs. Estagnação (Adulto Maduro)',
    themeColor: '#d97706',
    altText: 'Ilustração de um adulto plantando e regando uma árvore frondosa enquanto uma criança colhe seus frutos, simbolizando a transmissão de legado, orientação das novas gerações e a virtude do Cuidado.',
    sceneDescription: 'O compromisso com o futuro da comunidade: orientar, nutrir, produzir e cuidar das novas gerações.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#FEF3C7" stroke="#D97706" strokeWidth="3"/>
      <!-- Árvore do Cuidado e Legado -->
      <path d="M60 88V62" stroke="#78350F" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="60" cy="46" r="22" fill="#15803D" opacity="0.9"/>
      <circle cx="48" cy="42" r="14" fill="#22C55E"/>
      <circle cx="72" cy="44" r="14" fill="#16A34A"/>
      <!-- Frutos do conhecimento -->
      <circle cx="54" cy="40" r="3" fill="#EF4444"/>
      <circle cx="66" cy="48" r="3" fill="#EF4444"/>
      <circle cx="62" cy="34" r="3" fill="#EF4444"/>
      <!-- Mão de suporte à base -->
      <path d="M42 90C50 86 70 86 78 90" stroke="#B45309" strokeWidth="4" strokeLinecap="round"/>
    </svg>`,
  },
  8: {
    stageId: 8,
    stageName: 'Integridade vs. Desespero (Velhice / Maturidade Tardia)',
    themeColor: '#4f46e5',
    altText: 'Ilustração de uma pessoa idosa serena contemplando um pôr do sol dourado sobre águas calmas, segurando um livro da história de sua vida, simbolizando a virtude da Sabedoria.',
    sceneDescription: 'A retrospectiva de vida: aceitar o próprio ciclo como algo que teve significado único, transcendendo o medo do fim.',
    svgBadge: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="54" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="3"/>
      <!-- Sol poente dourado sobre o mar calmo -->
      <circle cx="60" cy="56" r="20" fill="#F59E0B"/>
      <path d="M25 76C40 73 80 73 95 76" stroke="#4338CA" strokeWidth="3" strokeLinecap="round"/>
      <path d="M30 84C45 82 75 82 90 84" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/>
      <!-- Livro aberto da vida integrada -->
      <path d="M48 68L60 72L72 68L70 80L60 83L50 80Z" fill="#312E81"/>
      <!-- Luz da Sabedoria irradiando -->
      <line x1="60" y1="26" x2="60" y2="32" stroke="#D97706" strokeWidth="3" strokeLinecap="round"/>
      <line x1="40" y1="34" x2="44" y2="39" stroke="#D97706" strokeWidth="3" strokeLinecap="round"/>
      <line x1="80" y1="34" x2="76" y2="39" stroke="#D97706" strokeWidth="3" strokeLinecap="round"/>
    </svg>`,
  },
};

/**
 * Ilustrações e audiodescrições detalhadas para os 4 casos clínicos da disciplina
 */
export const CLINICAL_CASES_ILLUSTRATIONS: Record<string, { altText: string; svgArt: string }> = {
  'caso-lucas-16': {
    altText: 'Ilustração clínica de Lucas (16 anos) em sua escrivaninha dividida: de um lado livros pesados de Direito empilhados e do outro folhas com esboços de tipografia e design visual iluminadas por uma luminária amarela, expressando o conflito de identidade vocacional.',
    svgArt: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2.5"/>
      <circle cx="50" cy="36" r="11" fill="#7C3AED"/>
      <!-- Dois caminhos bifurcados vocacionais -->
      <path d="M50 56V66L34 82" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 66L66 82" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="34" cy="82" r="3" fill="#4F46E5"/>
      <circle cx="66" cy="82" r="3" fill="#EC4899"/>
    </svg>`,
  },
  'caso-beatriz-19': {
    altText: 'Ilustração clínica de Beatriz (19 anos) em ambiente universitário, com jaleco odontológico pendurado ao fundo enquanto ela segura cadernos de políticas de saúde coletiva sob luz inspiradora, representando a reconsideração reflexiva do compromisso (ciclo MAMA).',
    svgArt: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5"/>
      <circle cx="50" cy="36" r="11" fill="#B45309"/>
      <!-- Balança reflexiva entre expectativa familiar e realização genuína -->
      <path d="M30 64H70" stroke="#78350F" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="34" cy="72" r="7" fill="#0284C7"/>
      <circle cx="66" cy="72" r="7" fill="#10B981"/>
    </svg>`,
  },
  'caso-mateus-15': {
    altText: 'Ilustração clínica de Mateus (15 anos) isolado na quadra escolar diante de telas de smartphone, com terapeuta se aproximando com prancheta de projetos práticos e ferramentas de montagem para resgatar sua sensação de competência e quebrar o ciclo de inferioridade.',
    svgArt: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.5"/>
      <circle cx="50" cy="38" r="11" fill="#C2410C"/>
      <!-- Quebra do muro de inferioridade -->
      <rect x="28" y="60" width="44" height="20" rx="3" fill="#CBD5E1"/>
      <line x1="36" y1="70" x2="64" y2="70" stroke="#0284C7" strokeWidth="2.5"/>
      <circle cx="50" cy="70" r="4" fill="#EA580C"/>
    </svg>`,
  },
  'caso-juliana-17': {
    altText: 'Ilustração clínica de Juliana (17 anos) em frente a um palco de simpósio científico, altiva e confiante com seus livros de literatura afro-brasileira e seu jaleco científico, representando a identidade étnico-racial positiva como força emancipadora.',
    svgArt: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5"/>
      <circle cx="50" cy="36" r="11" fill="#15803D"/>
      <!-- Coroa/Emblema de resiliência e ancestralidade -->
      <polygon points="50,56 42,74 50,70 58,74" fill="#EAB308"/>
      <circle cx="50" cy="80" r="4" fill="#16A34A"/>
    </svg>`,
  },
};

