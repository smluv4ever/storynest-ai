/**
 * Audio Mixer Utility
 * Handles layering voice narration with background music
 * Provides volume balancing and crossfade transitions
 */

export interface AudioTrack {
  url: string;
  volume: number;
  loop?: boolean;
}

export interface MixerConfig {
  voiceTrack: AudioTrack;
  musicTrack?: AudioTrack;
  masterVolume?: number;
  crossfadeDuration?: number; // in seconds
}

export class AudioMixer {
  private audioContext: AudioContext;
  private voiceSource: AudioBufferSourceNode | null = null;
  private musicSource: AudioBufferSourceNode | null = null;
  private voiceGain: GainNode;
  private musicGain: GainNode;
  private masterGain: GainNode;
  private voiceBuffer: AudioBuffer | null = null;
  private musicBuffer: AudioBuffer | null = null;
  private isPlaying = false;
  private startTime = 0;
  private pausedAt = 0;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create gain nodes for volume control
    this.voiceGain = this.audioContext.createGain();
    this.musicGain = this.audioContext.createGain();
    this.masterGain = this.audioContext.createGain();
    
    // Connect gain nodes
    this.voiceGain.connect(this.masterGain);
    this.musicGain.connect(this.masterGain);
    this.masterGain.connect(this.audioContext.destination);
  }

  /**
   * Load audio files and prepare for playback
   */
  async loadTracks(config: MixerConfig): Promise<void> {
    try {
      // Load voice track
      const voiceResponse = await fetch(config.voiceTrack.url);
      const voiceArrayBuffer = await voiceResponse.arrayBuffer();
      this.voiceBuffer = await this.audioContext.decodeAudioData(voiceArrayBuffer);
      
      // Set initial volumes
      this.voiceGain.gain.value = config.voiceTrack.volume;
      this.masterGain.gain.value = config.masterVolume || 1.0;
      
      // Load music track if provided
      if (config.musicTrack) {
        const musicResponse = await fetch(config.musicTrack.url);
        const musicArrayBuffer = await musicResponse.arrayBuffer();
        this.musicBuffer = await this.audioContext.decodeAudioData(musicArrayBuffer);
        this.musicGain.gain.value = config.musicTrack.volume;
      }
    } catch (error) {
      console.error('Error loading audio tracks:', error);
      throw error;
    }
  }

  /**
   * Start playback with optional crossfade
   */
  play(fromTime = 0, crossfadeDuration = 0.5): void {
    if (!this.voiceBuffer) {
      console.error('Voice buffer not loaded');
      return;
    }

    // Stop any existing playback
    this.stop();

    // Create and configure voice source
    this.voiceSource = this.audioContext.createBufferSource();
    this.voiceSource.buffer = this.voiceBuffer;
    this.voiceSource.connect(this.voiceGain);
    
    // Create and configure music source if available
    if (this.musicBuffer) {
      this.musicSource = this.audioContext.createBufferSource();
      this.musicSource.buffer = this.musicBuffer;
      this.musicSource.loop = true; // Background music loops
      this.musicSource.connect(this.musicGain);
      
      // Crossfade in background music
      this.musicGain.gain.setValueAtTime(0, this.audioContext.currentTime);
      this.musicGain.gain.linearRampToValueAtTime(
        this.musicGain.gain.value,
        this.audioContext.currentTime + crossfadeDuration
      );
      
      this.musicSource.start(0, fromTime % this.musicBuffer.duration);
    }

    // Start voice playback
    this.voiceSource.start(0, fromTime);
    this.startTime = this.audioContext.currentTime - fromTime;
    this.isPlaying = true;
  }

  /**
   * Pause playback
   */
  pause(): void {
    if (!this.isPlaying) return;
    
    this.pausedAt = this.audioContext.currentTime - this.startTime;
    this.stop();
  }

  /**
   * Resume playback from paused position
   */
  resume(crossfadeDuration = 0.3): void {
    this.play(this.pausedAt, crossfadeDuration);
  }

  /**
   * Stop playback with optional crossfade
   */
  stop(crossfadeDuration = 0.3): void {
    const currentTime = this.audioContext.currentTime;
    
    // Crossfade out
    if (this.voiceSource) {
      this.voiceGain.gain.setValueAtTime(this.voiceGain.gain.value, currentTime);
      this.voiceGain.gain.linearRampToValueAtTime(0, currentTime + crossfadeDuration);
      this.voiceSource.stop(currentTime + crossfadeDuration);
      this.voiceSource = null;
    }
    
    if (this.musicSource) {
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, currentTime);
      this.musicGain.gain.linearRampToValueAtTime(0, currentTime + crossfadeDuration);
      this.musicSource.stop(currentTime + crossfadeDuration);
      this.musicSource = null;
    }
    
    this.isPlaying = false;
  }

  /**
   * Set voice volume (0.0 to 1.0)
   */
  setVoiceVolume(volume: number): void {
    this.voiceGain.gain.setValueAtTime(
      Math.max(0, Math.min(1, volume)),
      this.audioContext.currentTime
    );
  }

  /**
   * Set music volume (0.0 to 1.0)
   */
  setMusicVolume(volume: number): void {
    this.musicGain.gain.setValueAtTime(
      Math.max(0, Math.min(1, volume)),
      this.audioContext.currentTime
    );
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  setMasterVolume(volume: number): void {
    this.masterGain.gain.setValueAtTime(
      Math.max(0, Math.min(1, volume)),
      this.audioContext.currentTime
    );
  }

  /**
   * Toggle music on/off with crossfade
   */
  toggleMusic(enabled: boolean, crossfadeDuration = 0.5): void {
    const currentTime = this.audioContext.currentTime;
    const targetVolume = enabled ? 0.3 : 0; // Music at 30% when enabled
    
    this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, currentTime);
    this.musicGain.gain.linearRampToValueAtTime(targetVolume, currentTime + crossfadeDuration);
  }

  /**
   * Get current playback position in seconds
   */
  getCurrentTime(): number {
    if (!this.isPlaying) return this.pausedAt;
    return this.audioContext.currentTime - this.startTime;
  }

  /**
   * Get total duration in seconds
   */
  getDuration(): number {
    return this.voiceBuffer?.duration || 0;
  }

  /**
   * Check if currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stop(0);
    this.voiceGain.disconnect();
    this.musicGain.disconnect();
    this.masterGain.disconnect();
    this.audioContext.close();
  }
}

/**
 * Helper function to create a mixer with default settings
 */
export function createAudioMixer(
  voiceUrl: string,
  musicUrl?: string,
  voiceVolume = 1.0,
  musicVolume = 0.3
): AudioMixer {
  const mixer = new AudioMixer();
  
  const config: MixerConfig = {
    voiceTrack: { url: voiceUrl, volume: voiceVolume },
    masterVolume: 0.7,
  };
  
  if (musicUrl) {
    config.musicTrack = { url: musicUrl, volume: musicVolume, loop: true };
  }
  
  mixer.loadTracks(config);
  return mixer;
}
