/**
 * @file Step1Fundamentals.tsx
 * Etapa 1 da Trilha Linear: Fundamentos conceituais simples e didáticos de Erik Erikson
 */

import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, User, CheckCircle2, ArrowRight, HelpCircle, 
  Lightbulb, ShieldCheck, HeartHandshake, Building2
} from 'lucide-react';
import { soundService } from '../../../services/soundService';

interface Step1FundamentalsProps {
  studentName?: string;
  studentId?: string;
  onUpdateStudentInfo: (name: string, studentId: string) => void;
  onNextStep: () => void;
  completed: boolean;
  onMarkCompleted: () => void;
}

export const Step1Fundamentals: React.FC<Step1FundamentalsProps> = ({
  studentName = '',
  studentId = '',
  onUpdateStudentInfo,
  onNextStep,
  completed,
  onMarkCompleted,
}) => {
  const [nameInput, setNameInput] = useState(studentName);
  const [idInput, setIdInput] = useState(studentId);
  const [savedIdentity, setSavedIdentity] = useState(Boolean(studentName));
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onUpdateStudentInfo(nameInput.trim(), idInput.trim());
    setSavedIdentity(true);
    soundService.playSuccess();
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedQuizOption(optionIndex);
    setQuizAnswered(true);
    if (optionIndex === 1) {
      soundService.playSuccess();
      if (!completed) {
        onMarkCompleted();
      }
    } else {
      soundService.playClick();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Cabeçalho da Etapa 1 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Etapa 1 de 4 · Ponto de Partida da Aula</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
          O Que é a Teoria do Desenvolvimento de Erik Erikson?
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
          Bem-vindo ao estudo guiado de Psicologia do Desenvolvimento II! Aqui você aprenderá os conceitos centrais de Erikson de forma simples, direta e com exemplos do cotidiano.
        </p>
      </div>

      {/* 2. Identificação do Estudante (Local e Seguro) */}
      <div className="bg-indigo-50/60 rounded-2xl border border-indigo-100 p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <User className="w-5 h-5 text-indigo-700" />
          <h2 className="text-base sm:text-lg font-bold text-indigo-950 font-display">
            1. Sua Identificação para o Relatório Oficial
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-indigo-900/80 mb-5 leading-relaxed">
          Este aplicativo é <strong className="text-indigo-950">100% estático e offline</strong>. Seus dados não são enviados para nenhum banco de dados na internet; eles ficam salvos apenas neste navegador para preencher seu relatório final em PDF e para o SIGAA.
        </p>

        <form onSubmit={handleSaveIdentity} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <label htmlFor="student-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Seu Nome Completo:
            </label>
            <input
              id="student-name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Ex: Maria Clara Medeiros"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="student-id" className="block text-xs font-semibold text-slate-700 mb-1">
              Matrícula na UFRN:
            </label>
            <input
              id="student-id"
              type="text"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Ex: 20240012345"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              {savedIdentity ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : null}
              <span>{savedIdentity ? 'Salvo' : 'Salvar'}</span>
            </button>
          </div>
        </form>

        {savedIdentity && (
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Identificação pronta! Seus comprovantes sairão com esses dados no final da trilha.</span>
          </div>
        )}
      </div>

      {/* 3. Bloco Conceitual Simples 1: Quem foi Erikson e o que ele mudou? */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-sm flex items-center justify-center font-mono">
            A
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            A Grande Ideia de Erikson: O Desenvolvimento Dura a Vida Inteira
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Antes de Erikson, acreditava-se frequentemente que a nossa personalidade já estava praticamente "pronta" até os 5 ou 6 anos de idade. Erikson rompeu com essa ideia e propôs que <strong>o ser humano continua crescendo, mudando e aprendendo do nascimento até a velhice</strong>.
        </p>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Além disso, o desenvolvimento não acontece isolado dentro da cabeça: ele é <strong>psicossocial</strong> porque depende das nossas relações com a família, amigos, escola, cultura e comunidade.
        </p>
      </div>

      {/* 4. Bloco Conceitual Simples 2: Metáfora do Princípio Epigenético */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold text-sm flex items-center justify-center font-mono">
            B
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            O Que é o "Princípio Epigenético"? (A Metáfora da Construção)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p>
              A palavra parece difícil, mas a ideia é como a construção de uma casa ou prédio:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-600 text-sm">
              <li><strong>Cada andar tem sua hora certa de ser construído:</strong> Você não coloca o telhado antes da fundação.</li>
              <li><strong>Um andar apoia o próximo:</strong> Se a fundação (a infância) for firme, o segundo andar (a adolescência) tem muito mais segurança para subir.</li>
              <li><strong>Sempre é possível fazer reformas:</strong> Se um andar teve rachaduras, na vida adulta podemos revisitar esse tema na terapia ou em relações saudáveis.</li>
            </ul>
          </div>

          <div className="md:col-span-4 bg-amber-50/70 border border-amber-200/70 rounded-xl p-4 text-center space-y-2">
            <Building2 className="w-10 h-10 text-amber-700 mx-auto" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Metáfora Prática
            </h3>
            <p className="text-xs text-amber-950/80 leading-relaxed">
              O desenvolvimento humano acontece em etapas pré-programadas, onde cada estágio adiciona uma nova força psicológica (virtude).
            </p>
          </div>
        </div>
      </div>

      {/* 5. Bloco Conceitual Simples 3: O que significa a palavra "Crise"? */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center font-mono">
            C
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Para Erikson, "Crise" NÃO é Doença nem Colapso
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          No vocabulário médico, crise parece algo ruim. Mas na psicologia do desenvolvimento de Erikson, a <strong>crise é uma encruzilhada de crescimento</strong>. É o momento em que a vida nos convida a dar um passo à frente.
        </p>

        {/* Exemplo no Cotidiano */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Exemplo no Cotidiano</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Pense em quando uma criança pequena quer amarrar o próprio sapato: existe a tensão entre tentar sozinha (autonomia) e ter medo de não conseguir (dúvida). Se os pais deixam ela tentar com carinho, ela ganha a virtude da <strong>Vontade</strong>. O objetivo nunca é eliminar o medo 100%, mas inclinar a balança para o lado saudável.
          </p>
        </div>
      </div>

      {/* 6. Checagem Rápida de Compreensão (1 Pergunta Interativa Direta) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Mini-Checagem de Aprendizagem
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          De acordo com a teoria de Erikson, o que melhor define o conceito de "crise psicossocial"?
        </p>

        <div className="space-y-2.5">
          {[
            {
              id: 0,
              text: 'Um transtorno mental que deve ser curado rapidamente com remédios.',
              correct: false,
              feedback: 'Incorreto. Em Erikson, crise não é categoria diagnóstica ou doença psiquiátrica.',
            },
            {
              id: 1,
              text: 'Um momento natural de virada e desafio desenvolvimental que gera oportunidade de amadurecimento.',
              correct: true,
              feedback: 'Exato! A crise é a tensão dialética normal entre dois polos que nos impulsiona a crescer.',
            },
            {
              id: 2,
              text: 'Um trauma infantil irreversível que impede o indivíduo de evoluir para o próximo estágio.',
              correct: false,
              feedback: 'Incorreto. Erikson enfatiza que estágios posteriores podem reformular e ressignificar temas anteriores.',
            },
          ].map((opt) => {
            const isSelected = selectedQuizOption === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleQuizAnswer(opt.id)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? opt.correct
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                  isSelected 
                    ? opt.correct 
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'border-slate-400 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + opt.id)}
                </span>
                <div className="space-y-1">
                  <div>{opt.text}</div>
                  {quizAnswered && isSelected && (
                    <div className={`text-xs mt-1 font-sans ${opt.correct ? 'text-emerald-700 font-semibold' : 'text-rose-700'}`}>
                      {opt.feedback}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Botão Direcionador de Avanço para a Etapa 2 */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100/80 p-5 rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
          {completed ? (
            <span className="text-emerald-700 font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4" /> Etapa 1 Concluída! Você entendeu os fundamentos básicos.
            </span>
          ) : (
            <span>Conclua a leitura e responda à pergunta acima para liberar o próximo passo.</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            if (!completed) onMarkCompleted();
            onNextStep();
          }}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Avançar para Etapa 2: Os 8 Estágios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
