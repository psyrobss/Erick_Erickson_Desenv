# PsicoDev II · Estudo Guiado Erik Erikson

**Plataforma Educacional Estática e Offline de Aprendizagem Ativa**  
*Desenvolvida para a disciplina Psicologia do Desenvolvimento II — Faculdade de Ciências da Saúde do Trairi (FACISA) / Universidade Federal do Rio Grande do Norte (UFRN).*

---

## 🌟 Visão Geral & Características Principais

- **100% Estático & Offline-First**: Não requer servidor backend ou banco de dados externo (PostgreSQL/MySQL/Firebase).
- **Privacidade Total**: O nome, a matrícula e o progresso do estudante são gravados exclusivamente no navegador (Cookies e localStorage). Nenhum dado pessoal é transmitido para a nuvem.
- **COMECE AQUI · Guia da Aula**: Banner introdutório no topo com orientações de estudo, cadastro rápido do aluno e checklist de 5 metas pedagógicas.
- **Gamificação Educacional**: Sistema de XP, patentes acadêmicas (do *Calouro de Psicologia* ao *Mestre do Desenvolvimento Humano*), medalhas por conquistas e feedback sonoro via Web Audio API (com botão de mute persistente).
- **Conteúdo Curricular Completo**:
  1. **8 Estágios do Ciclo Vital**: Tensão dialética dos polos, perguntas reflexivas e virtudes do ego.
  2. **Adolescência em Profundidade**: Virtude da Fidelidade, Matriz de James Marcia (4 status) e Modelo U-MICS (ciclos de exploração e compromisso).
  3. **4 Estudos de Casos Clínicos**: Análise contextual com feedback fundamentado na teoria.
  4. **Metanálise Científica**: Síntese dos dados de Potterton et al. (2022) e diretrizes éticas do CFP (Resolução nº 31/2022).
  5. **12 Exercícios de Fixação**: Quiz com justificativas detalhadas para cada alternativa.
- **Relatório Oficial & PDF para o SIGAA**:
  - Boletim colorido e formal com matriz de estágios e tabela de resoluções clínicas.
  - Otimizado para impressão e download em PDF (folha A4) pelo próprio navegador.
  - Botão de cópia rápida formatada em texto puro para postagem em tarefas do SIGAA.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) + Styled Components
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Testes Unitários**: Node Test Runner (`node:test` + `node:assert/strict`) via `tsx`
- **Áudio**: Web Audio API nativa do navegador (sintetizador estático sem arquivos externos de mídia pesados)

---

## 🚀 Como Hospedar Grátis no GitHub + Vercel

Por ser um projeto puramente estático (`SPA`), o custo de hospedagem é **zero**, e o deploy leva menos de 2 minutos.

### Passo 1: Subir o código para o seu GitHub

1. No terminal do seu computador (na pasta do projeto), inicialize o Git caso ainda não tenha feito:
   ```bash
   git init
   git add .
   git commit -m "feat: PsicoDev II - versão estática completa"
   ```

2. Crie um novo repositório no seu [GitHub](https://github.com/new) (por exemplo, com o nome `psicodev-erikson-facisa`).

3. Vincule e envie o código:
   ```bash
   git remote add origin https://github.com/SEU-USUARIO/psicodev-erikson-facisa.git
   git branch -M main
   git push -u origin main
   ```

---

### Passo 2: Publicar Gratuitamente na Vercel

1. Acesse **[vercel.com](https://vercel.com/)** e faça login com a sua conta do GitHub.
2. Clique no botão **"Add New..."** → **"Project"**.
3. Na lista de repositórios do GitHub, localize `psicodev-erikson-facisa` e clique em **"Import"**.
4. A Vercel detectará automaticamente o framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (ou `vite build`)
   - **Output Directory**: `dist`
5. Clique no botão azul **"Deploy"**.
6. Em cerca de 30 segundos, o site estará no ar com HTTPS gratuito (ex: `https://psicodev-erikson-facisa.vercel.app`).

> **Dica**: O arquivo `vercel.json` já está incluído na raiz do projeto com o redirecionamento de rotas SPA configurado. Toda vez que você fizer um `git push` no GitHub, a Vercel atualizará o site automaticamente!

---

## 💻 Desenvolvimento Local & Testes

Para rodar ou testar o projeto no seu computador:

```bash
# 1. Instalar as dependências
npm install

# 2. Executar os testes unitários (regras de cálculo, marcia e gamificação)
npm test # ou: npx --yes tsx --test src/utils/*.test.ts src/services/*.test.ts

# 3. Iniciar o servidor de desenvolvimento
npm run dev

# 4. Gerar build estático de produção
npm run build
```

---

## 📜 Licença e Créditos

- Desenvolvido para uso acadêmico na **Universidade Federal do Rio Grande do Norte (UFRN)** — **Faculdade de Ciências da Saúde do Trairi (FACISA)**.
- Material aberto para fins educacionais e didáticos na graduação em Psicologia.
