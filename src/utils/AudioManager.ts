import * as Phaser from 'phaser';

export class AudioManager {
  private scene: Phaser.Scene;
  private musicVolume: number = 0.12;
  private sfxVolume: number = 0.25;
  private bgMusic?: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  playBackgroundMusic() {
    this.playMusic('christmas_bg', true);
  }

  private playMusic(key: string, loop: boolean = true): void {
    if (this.bgMusic) {
      this.bgMusic.stop();
    }

    try {
      this.bgMusic = this.scene.sound.add(key, {
        loop,
        volume: this.musicVolume
      });
      this.bgMusic.play();
    } catch (error) {
      console.warn(`Missing music track: ${key}`, error);
    }
  }

  private playSFX(key: string, volume?: number): void {
    try {
      this.scene.sound.play(key, {
        volume: volume !== undefined ? volume : this.sfxVolume
      });
    } catch (error) {
      console.warn(`Missing SFX: ${key}`, error);
    }
  }

  stopMusic(): void {
    if (this.bgMusic) {
      this.bgMusic.stop();
    }
  }

  setMusicVolume(volume: number): void {
    this.musicVolume = Phaser.Math.Clamp(volume, 0, 1);
    if (this.bgMusic && 'setVolume' in this.bgMusic) {
      (this.bgMusic as any).setVolume(this.musicVolume);
    }
  }

  setSFXVolume(volume: number): void {
    this.sfxVolume = Phaser.Math.Clamp(volume, 0, 1);
  }

  playCoinCollectSound() {
    this.playSFX('coin_collect', 0.2);
  }

  playBuildingRepairSound() {
    this.playSFX('building_repair', 0.2);
  }

  playBuildingUpgradeSound() {
    this.playSFX('building_upgrade', 0.22);
  }

  playTreeShakeSound() {
    this.playSFX('tree_shake', 0.18);
  }

  playUIClickSound() {
    this.playSFX('ui_click', 0.15);
  }

  playResearchCompleteSound() {
    this.playSFX('research_complete', 0.22);
  }

  playCookiePurchaseSound() {
    this.playSFX('cookie_purchase', 0.18);
  }
}
