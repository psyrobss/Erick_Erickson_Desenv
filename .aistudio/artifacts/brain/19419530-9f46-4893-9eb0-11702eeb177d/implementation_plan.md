# PsicoDev II · Reformulação Didática da Trilha Linear de Erik Erikson

Plano de reformulação completa da experiência do estudante, transformando a interface dispersa de 8 abas em uma **Trilha de Aprendizagem Linear e Direcionada em 4 Fases Sequenciais**, com explicações conceituais simples, exemplos cotidianos e navegação clara com botões de *"Próximo Passo"*.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões Alinhadas com o Usuário**:
> - **Navegação Linear Estrita**: Fim do menu superior de 8 abas dispersas. O estudante agora segue uma jornada orientada passo a passo (Fases 1, 2, 3 e 4) com fluxo guiado e botões explícitos de *"Avançar para a Próxima Fase"* e *"Voltar"*.
> - **Didática Acessível e Conceitos Claros**: Substituição de tabelas e textos acadêmicos densos por explicações concisas em linguagem natural, ancoradas em metáforas do dia a dia (ex: como a confiança na infância afeta a autonomia e os relacionamentos adultos).
> - **Redução Drástica da Poluição Visual**: Layout focado em uma única lição por vez, sem múltiplos blocos, cards clonados ou menus competindo pela atenção do aluno.

---

### 1. Overview & Core Concept

- **O Que É**: Uma plataforma web estática, acolhedora e direta que conduz o aluno de graduação em Psicologia através de uma aula estruturada sobre a Teoria do Desenvolvimento Psicossocial de Erik Erikson.
- **Público-Alvo**: Estudantes de Psicologia da FACISA/UFRN que precisam de um guia seguro e claro para estudar e emitir seu comprovante acadêmico, sem se sentirem perdidos com excesso de opções.
- **Proposta de Valor**: Clareza pedagógica imediata — o aluno sempre sabe onde está, o que acabou de aprender, qual é o conceito central e o que deve fazer em seguida.

---

### 2. User Experience & Visual Design

#### A. Estrutura da Trilha em 4 Fases Sequenciais

A interface inteira passa a ser organizada em 4 estações de estudo consecutivas:

1. **Fase 1: Fundamentos sem Complicação (O que é a Teoria?)**
   - **Conceito Explicado**: O que significa desenvolvimento psicossocial? Por que Erikson rompeu com o determinismo infantil? O que é o *Princípio Epigenético* (a metáfora da construção de um prédio) e o que realmente significa *Crise* (uma encruzilhada de crescimento, não uma doença).
   - **Exemplo Cotidiano**: A diferença entre confiar nos pais para aprender a andar versus ter medo de errar.
   - **Ação Direcionada**: Mini-checagem de compreensão (1 pergunta interativa simples) $\to$ Botão *"Avançar para a Fase 2: Os 8 Estágios"*.

2. **Fase 2: Os 8 Estágios do Ciclo Vital (Do Berço à Velhice)**
   - **Apresentação Clara**: Apresentação visual limpa, estágio por estágio (ou carrossel guiado com seletor linear de idade), onde cada estágio possui:
     - *Dilema Central*: (ex: Autonomia vs. Vergonha).
     - *Virtude Conquistada*: (ex: Vontade).
     - *Exemplo Real da Vida*: O que acontece quando a criança ouve "não faça isso, você não sabe" versus "tente de novo com calma".
   - **Ação Direcionada**: Contador de estágios visualizados $\to$ Botão *"Avançar para a Fase 3: Adolescência & Casos Clínicos"*.

3. **Fase 3: O Ponto Alto — Adolescência & Casos Práticos**
   - **Conceitos Essenciais**: A pergunta "Quem sou eu?", a *Moratória Psicossocial* (o tempo necessário para experimentar sem pressão) e a *Fidelidade*.
   - **Os 4 Status de James Marcia Explicados com Simplicidade**:
     - *Difusão*: "Nem procurei e nem decidi ainda."
     - *Pré-fechamento*: "Decidi o que meus pais escolheram sem questionar."
     - *Moratória*: "Estou experimentando várias coisas para descobrir."
     - *Identidade Conquistada*: "Pensei, testei e me comprometi com quem sou."
   - **Prática Direcionada**: 4 casos clínicos simples (Lucas, Beatriz, Mateus e Juliana), onde o aluno escolhe a conduta adequada com explicação clara do porquê.
   - **Ação Direcionada**: Botão *"Avançar para a Fase 4: Avaliação & Relatório"*.

4. **Fase 4: Fixação & Emissão do Relatório Acadêmico**
   - **Quiz Formativo Curto**: Perguntas diretas com feedback explicativo instantâneo.
   - **Emissão do Relatório Oficial**: Geração em PDF formal e cópia para o SIGAA, já preenchido com nome, matrícula e o aproveitamento auditado da trilha.

#### B. Hierarquia Visual & Eliminação de Poluição

- **Top Bar Enxuta**:
  - Título limpo: `PsicoDev II · Erikson`.
  - Indicador da trilha atual com progresso (ex: `Etapa 2 de 4: Os 8 Estágios`).
  - Apenas 2 botões de suporte: Mudo/Som e Atalho do Relatório.
- **Sem Telas Sobrecarregadas**:
  - Eliminação de banners repetitivos, múltiplos callouts redundantes e links soltos.
  - Cartão central focado na lição atual, com tipografia legível (`Plus Jakarta Sans` / `Outfit`), margens arejadas e contrastes acessíveis.
  - Rodapé fixo na parte inferior com botões de navegação: `[← Voltar à Etapa Anterior]` e `[Avançar para Próxima Etapa →]`.

---

### 3. Key Product Decisions & Trade-Offs

- **Trilha Linear vs. Exploração Livre**:
  - *Decisão*: Trilha linear orientada com navegação dirigida (botões Próximo/Anterior) e indicador numérico de etapa.
  - *Por quê*: Alunos ficam desmotivados e confusos quando expostos a mais de 8 abas simultâneas sem uma ordem de leitura clara.
  - *Flexibilidade*: O aluno ainda pode clicar nos números do topo da trilha (1, 2, 3, 4) se quiser revisitar uma etapa anterior.
- **Explicações com Exemplos Cotidianos vs. Citações Densas**:
  - *Decisão*: Linguagem didática direta com caixas de *"Exemplo no Cotidiano"* e *"Por que isso importa na prática?"*.
  - *Por quê*: O papel do aplicativo é apoiar a aula e fixar o conhecimento de forma motivadora e acolhedora.
- **Preservação dos Dados em Navegador (Offline-First)**:
  - *Decisão*: Mantém o armazenamento 100% local em Cookies/localStorage.
  - *Por quê*: Respeita a privacidade, funciona sem internet e mantém a facilidade de deploy estático gratuito na Vercel e GitHub.

---

### 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TopBar (Trilha: Etapas 1 → 2 → 3 → 4)                │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   StageController (Gerenciador da Trilha)              │
│                                                                        │
│  ┌───────────────────────┐             ┌─────────────────────────┐     │
│  │  Fase 1: Fundamentos  │ ──Próximo──>│  Fase 2: Os 8 Estágios  │     │
│  │  - O que é Epigênese  │             │  - Navegador dos 8      │     │
│  │  - Conceito de Crise  │             │  - Crises e Virtudes    │     │
│  │  - Exemplo Prático    │             │  - Exemplos da Vida     │     │
│  └───────────────────────┘             └─────────────────────────┘     │
│                                                     │                  │
│                                                  Próximo               │
│                                                     ▼                  │
│  ┌───────────────────────┐             ┌─────────────────────────┐     │
│  │ Fase 4: Avaliação &   │<──Próximo── │ Fase 3: Adolescência    │     │
│  │ Relatório             │             │ - Moratória & Marcia    │     │
│  │ - Quiz Formativo      │             │ - 4 Casos Clínicos      │     │
│  │ - Gerar PDF / SIGAA   │             │ - Feedback Didático     │     │
│  └───────────────────────┘             └─────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Bottom Navigation Bar [← Voltar | Avançar →]             │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 5. Plano de Execução em Arquivos

1. **`src/components/layout/Navbar.tsx` & `src/App.tsx`**:
   - Simplificar para a barra de etapas sequenciais (1. Fundamentos $\to$ 2. Oito Estágios $\to$ 3. Adolescência & Casos $\to$ 4. Relatório Final).
2. **`src/components/guided/GuidedLinearTrack.tsx`**:
   - Componente mestre da trilha linear com suporte a avanço progressivo, salvamento automático e transições suaves.
3. **`src/components/guided/steps/Step1Fundamentals.tsx`**:
   - Apresentação didática simples com conceitos explicados em linguagem acolhedora e exemplos práticos.
4. **`src/components/guided/steps/Step2LifeStages.tsx`**:
   - Navegação limpa estágio por estágio, destacando polos em conflito, virtudes e casos do cotidiano.
5. **`src/components/guided/steps/Step3AdolescenceCases.tsx`**:
   - Explicação concisa de James Marcia e resolução orientada dos 4 estudos de caso.
6. **`src/components/guided/steps/Step4EvaluationReport.tsx`**:
   - Quiz formativo amigável e geração instantânea do relatório PDF formal e colorido.
