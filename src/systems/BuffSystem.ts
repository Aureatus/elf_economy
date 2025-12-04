export enum BuffType {
  PRODUCTION_BOOST = 'production_boost',
  COLLECTION_SPEED = 'collection_speed',
  UPGRADE_DISCOUNT = 'upgrade_discount',
  MAGNETIC_PULL = 'magnetic_pull',
  SPEED_BOOST = 'speed_boost'
}

export type CookieType = 'basic' | 'chocolate' | 'gingerbread' | 'magnet' | 'speed';

export interface Buff {
  id: string;
  type: BuffType;
  name: string;
  description: string;
  multiplier: number;
  duration: number; // in milliseconds
  startTime: number;
  icon: string;
}

export class BuffSystem {
  private activeBuffs: Map<string, Buff>;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.activeBuffs = new Map();
    this.scene = scene;
  }

  addBuff(buff: Buff): void {
    // Remove existing buff of same type if present
    this.removeBuffByType(buff.type);
    
    this.activeBuffs.set(buff.id, buff);
    
    // Schedule buff removal
    this.scene.time.delayedCall(buff.duration, () => {
      this.removeBuff(buff.id);
    });
  }

  removeBuff(buffId: string): void {
    this.activeBuffs.delete(buffId);
  }

  removeBuffByType(type: BuffType): void {
    for (const [id, buff] of this.activeBuffs) {
      if (buff.type === type) {
        this.activeBuffs.delete(id);
        break;
      }
    }
  }

  getBuff(id: string): Buff | undefined {
    return this.activeBuffs.get(id);
  }

  getActiveBuffs(): Buff[] {
    return Array.from(this.activeBuffs.values());
  }

  getBuffsByType(type: BuffType): Buff[] {
    return Array.from(this.activeBuffs.values()).filter(buff => buff.type === type);
  }

  getMultiplier(type: BuffType): number {
    let totalMultiplier = 1;
    
    for (const buff of this.activeBuffs.values()) {
      if (buff.type === type) {
        totalMultiplier *= buff.multiplier;
      }
    }
    
    return totalMultiplier;
  }

  hasBuffOfType(type: BuffType): boolean {
    return this.getBuffsByType(type).length > 0;
  }

  getRemainingTime(buffId: string): number {
    const buff = this.activeBuffs.get(buffId);
    if (!buff) return 0;
    
    const elapsed = Date.now() - buff.startTime;
    const remaining = Math.max(0, buff.duration - elapsed);
    return remaining;
  }

  update(): void {
    // Remove expired buffs
    const now = Date.now();
    for (const [id, buff] of this.activeBuffs) {
      if (now - buff.startTime >= buff.duration) {
        this.activeBuffs.delete(id);
      }
    }
  }

  // Cookie consumption methods
  consumeCookie(cookieType: CookieType): void {
    let buff: Buff | undefined;
    
    switch (cookieType) {
      case 'basic':
        buff = {
          id: `basic_cookie_${Date.now()}`,
          type: BuffType.PRODUCTION_BOOST,
          name: 'Basic Cookie',
          description: 'Production +25% for 60s',
          multiplier: 1.25,
          duration: 60000,
          startTime: Date.now(),
          icon: '🍪'
        };
        break;
      case 'chocolate':
        buff = {
          id: `chocolate_cookie_${Date.now()}`,
          type: BuffType.PRODUCTION_BOOST,
          name: 'Chocolate Cookie',
          description: 'Production +50% for 90s',
          multiplier: 1.5,
          duration: 90000,
          startTime: Date.now(),
          icon: '🍫'
        };
        break;
      case 'gingerbread':
        buff = {
          id: `gingerbread_${Date.now()}`,
          type: BuffType.PRODUCTION_BOOST,
          name: 'Gingerbread Cookie',
          description: 'Production +100% for 45s',
          multiplier: 2.0,
          duration: 45000,
          startTime: Date.now(),
          icon: '🍪'
        };
        break;
      case 'magnet':
        buff = {
          id: `magnet_cookie_${Date.now()}`,
          type: BuffType.MAGNETIC_PULL,
          name: 'Magnet Perk',
          description: 'Coins fly toward you for 45s',
          multiplier: 1,
          duration: 45000,
          startTime: Date.now(),
          icon: '🧲'
        };
        break;
      case 'speed':
        buff = {
          id: `speed_cookie_${Date.now()}`,
          type: BuffType.SPEED_BOOST,
          name: 'Speed Perk',
          description: 'Movement speed +50% for 45s',
          multiplier: 1.5,
          duration: 45000,
          startTime: Date.now(),
          icon: '⚡'
        };
        break;
      default:
        buff = undefined;
    }
    
    if (buff) {
      this.addBuff(buff);
    }
  }

  // Save/Load functionality
  getSaveData(): any {
    const now = Date.now();
    const activeBuffs = Array.from(this.activeBuffs.values())
      .filter(buff => now - buff.startTime < buff.duration)
      .map(buff => ({
        ...buff,
        remainingTime: buff.duration - (now - buff.startTime)
      }));
    
    return { activeBuffs };
  }

  loadSaveData(data: any): void {
    if (data.activeBuffs) {
      data.activeBuffs.forEach((savedBuff: any) => {
        const buff: Buff = {
          ...savedBuff,
          startTime: Date.now() - (savedBuff.duration - savedBuff.remainingTime)
        };
        this.activeBuffs.set(buff.id, buff);
      });
    }
  }
}