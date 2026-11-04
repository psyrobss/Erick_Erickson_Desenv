/**
 * @file soundService.ts
 * Sistema de feedback sonoro pedagógico 100% offline via Web Audio API nativo.
 * Zero dependências de arquivos externos de áudio para funcionar offline e instantaneamente.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private readonly STORAGE_KEY = 'erikson_sound_muted';

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        this.muted = stored === 'true';
      } catch {
        this.muted = false;
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    try {
      localStorage.setItem(this.STORAGE_KEY, String(this.muted));
    } catch {
      // Storage unavailable fallback
    }
    if (!this.muted) {
      this.playSuccessTone();
    }
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    try {
      localStorage.setItem(this.STORAGE_KEY, String(this.muted));
    } catch {
      // Storage unavailable fallback
    }
  }

  /**
   * Toca nota sintetizada senoidal com envelope ADSR suave
   */
  private playTone(freq: number, startTime: number, duration: number, peakGain: number = 0.15, type: OscillatorType = 'sine'): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Envelope suave anti-clipping
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Ignore audio synthesis errors on restricted platforms
    }
  }

  /**
   * Som de Acerto / Ganho de XP: Acorde harmônico ascendente suave (C5 -> E5 -> G5)
   */
  public playSuccessTone(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(523.25, now, 0.18, 0.12, 'sine');       // C5
    this.playTone(659.25, now + 0.08, 0.22, 0.14, 'sine'); // E5
    this.playTone(783.99, now + 0.16, 0.35, 0.16, 'triangle'); // G5
  }

  /**
   * Fanfarra triunfante de Subida de Patente (Level Up)
   */
  public playLevelUpFanfare(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [
      { f: 440.00, t: 0.00, d: 0.15 }, // A4
      { f: 554.37, t: 0.12, d: 0.15 }, // C#5
      { f: 659.25, t: 0.24, d: 0.20 }, // E5
      { f: 880.00, t: 0.38, d: 0.55 }, // A5 (sustenta)
    ];

    notes.forEach((n) => {
      this.playTone(n.f, now + n.t, n.d, 0.18, 'triangle');
    });
  }

  /**
   * Som de Desbloqueio de Medalha / Conquista (Chime cintilante)
   */
  public playBadgeUnlock(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(659.25, now, 0.2, 0.15, 'sine');        // E5
    this.playTone(830.61, now + 0.1, 0.2, 0.15, 'sine');  // G#5
    this.playTone(987.77, now + 0.2, 0.2, 0.15, 'sine');  // B5
    this.playTone(1318.51, now + 0.3, 0.45, 0.2, 'triangle'); // E6
  }

  /**
   * Feedback tátil de clique / virada de Flashcard (Pop suave de baixa frequência)
   */
  public playCardFlip(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(330, now, 0.08, 0.08, 'sine');
    this.playTone(440, now + 0.03, 0.1, 0.09, 'triangle');
  }

  /**
   * Chamada do Professor Mentor (Duplo sino amigável e acolhedor)
   */
  public playProfessorCall(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(698.46, now, 0.22, 0.12, 'sine');      // F5
    this.playTone(880.00, now + 0.14, 0.32, 0.14, 'sine'); // A5
  }

  /**
   * Micro-clique para seleção de alternativas
   */
  public playSelect(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.playTone(600, now, 0.04, 0.05, 'sine');
  }

  public playClick(): void {
    this.playSelect();
  }

  public playSuccess(): void {
    this.playSuccessTone();
  }
}

export const soundService = new SoundService();
