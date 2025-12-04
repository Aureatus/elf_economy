export class AudioManager {
  private scene: Phaser.Scene;
  private musicVolume: number = 0.3;
  private sfxVolume: number = 0.5;
  private bgMusic?: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  playBackgroundMusic() {
    this.playMusic('christmas_bg', true);
  }

  playMusic(key: string, loop: boolean = true): void {
    if (this.bgMusic) {
      this.bgMusic.stop();
    }
    
    if (this.scene.sound.get(key)) {
      this.bgMusic = this.scene.sound.add(key, { 
        loop, 
        volume: this.musicVolume 
      });
      this.bgMusic.play();
    }
  }

  playSFX(key: string, volume?: number): void {
    if (this.scene.sound.get(key)) {
      this.scene.sound.play(key, { 
        volume: volume !== undefined ? volume : this.sfxVolume 
      });
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

  // Enhanced sound effects
  playCoinCollectSound() {
    this.playSFX('coin_collect', 0.6);
  }

  playBuildingRepairSound() {
    this.playSFX('building_repair', 0.7);
  }

  playBuildingUpgradeSound() {
    this.playSFX('building_upgrade', 0.8);
  }

  playTreeShakeSound() {
    this.playSFX('tree_shake', 0.5);
  }

  playUIClickSound() {
    this.playSFX('ui_click', 0.4);
  }

  playResearchCompleteSound() {
    this.playSFX('research_complete', 0.9);
  }

  playCookiePurchaseSound() {
    this.playSFX('cookie_purchase', 0.6);
  }
}
