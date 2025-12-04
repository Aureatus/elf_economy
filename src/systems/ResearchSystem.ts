export enum ResearchType {
  PRODUCTION_SPEED = 'production_speed',
  UPGRADE_COST = 'upgrade_cost',
  COIN_VALUE = 'coin_value',
  BUILDING_EFFICIENCY = 'building_efficiency',
  TREE_GIFT_VALUE = 'tree_gift_value',
  TREE_RECOVERY_SPEED = 'tree_recovery_speed',
  TREE_PRESENT_BURST = 'tree_present_burst',
  FESTIVE_SPIRIT = 'festive_spirit',
  PLAYER_SPEED = 'player_speed',
  MAGNETIC_PULL = 'magnetic_pull'
}

export type ResearchCategory = 'tree' | 'building' | 'universal';

export interface TreeResearchEffects {
  coinValueMultiplier: number;
  cooldownMultiplier: number;
  coinBatchMultiplier: number;
}

export interface ResearchUpgrade {
  id: string;
  type: ResearchType;
  category: ResearchCategory;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  currentLevel: number;
  effectPerLevel: number;
  icon: string;
  effectDisplayType?: 'increase' | 'decrease';
  effectText?: string;
}

export class ResearchSystem {
  private upgrades: Map<string, ResearchUpgrade>;

  constructor() {
    this.upgrades = new Map();
    this.initializeUpgrades();
  }

  private initializeUpgrades() {
    const upgrades: ResearchUpgrade[] = [
      {
        id: 'tree_coin_value_1',
        type: ResearchType.TREE_GIFT_VALUE,
        category: 'tree',
        name: 'Gilded Ornaments',
        description: 'Increase tree coin value by 25%',
        cost: 80,
        maxLevel: 5,
        currentLevel: 0,
        effectPerLevel: 0.25,
        icon: '🎁'
      },
      {
        id: 'tree_cooldown_1',
        type: ResearchType.TREE_RECOVERY_SPEED,
        category: 'tree',
        name: 'Cocoa Breaks',
        description: 'Trees recover 10% faster between shakes',
        cost: 120,
        maxLevel: 5,
        currentLevel: 0,
        effectPerLevel: 0.1,
        icon: '☕'
      },
      {
        id: 'tree_present_burst_1',
        type: ResearchType.TREE_PRESENT_BURST,
        category: 'tree',
        name: 'Present Burst',
        description: 'Trees drop 15% more coins per shake',
        cost: 160,
        maxLevel: 5,
        currentLevel: 0,
        effectPerLevel: 0.15,
        icon: '🎄'
      },
      {
        id: 'prod_speed_1',
        type: ResearchType.PRODUCTION_SPEED,
        category: 'building',
        name: 'Faster Production',
        description: 'Increase all building production speed by 5%',
        cost: 100,
        maxLevel: 10,
        currentLevel: 0,
        effectPerLevel: 0.05,
        icon: '⚡'
      },
      {
        id: 'upgrade_cost_1',
        type: ResearchType.UPGRADE_COST,
        category: 'building',
        name: 'Cheaper Upgrades',
        description: 'Reduce all building upgrade costs by 3%',
        cost: 150,
        maxLevel: 10,
        currentLevel: 0,
        effectPerLevel: 0.03,
        icon: '💰',
        effectDisplayType: 'decrease'
      },
      {
        id: 'building_efficiency_1',
        type: ResearchType.BUILDING_EFFICIENCY,
        category: 'building',
        name: 'Efficient Buildings',
        description: 'All buildings produce 4% more income',
        cost: 250,
        maxLevel: 10,
        currentLevel: 0,
        effectPerLevel: 0.04,
        icon: '🏭'
      },
      {
        id: 'precision_tools_1',
        type: ResearchType.BUILDING_EFFICIENCY,
        category: 'building',
        name: 'Precision Tools',
        description: 'Workshops gain an extra 2% efficiency',
        cost: 320,
        maxLevel: 5,
        currentLevel: 0,
        effectPerLevel: 0.02,
        icon: '🛠️'
      },
      {
        id: 'coin_value_1',
        type: ResearchType.COIN_VALUE,
        category: 'universal',
        name: 'Valuable Coins',
        description: 'Increase coin value from all sources by 2%',
        cost: 200,
        maxLevel: 10,
        currentLevel: 0,
        effectPerLevel: 0.02,
        icon: '🪙'
      },
      {
        id: 'festive_synergy_1',
        type: ResearchType.FESTIVE_SPIRIT,
        category: 'universal',
        name: 'Festive Synergy',
        description: 'Trees and buildings earn 2% more together',
        cost: 220,
        maxLevel: 10,
        currentLevel: 0,
        effectPerLevel: 0.02,
        icon: '✨'
      },
      {
        id: 'magnet_perk_1',
        type: ResearchType.MAGNETIC_PULL,
        category: 'universal',
        name: 'Polar Magnetism',
        description: 'Coins gravitate toward you automatically',
        cost: 400,
        maxLevel: 3,
        currentLevel: 0,
        effectPerLevel: 0.25,
        icon: '🧲'
      },
      {
        id: 'speed_perk_1',
        type: ResearchType.PLAYER_SPEED,
        category: 'universal',
        name: 'Reindeer Boots',
        description: 'Increase movement speed by 10% per level',
        cost: 250,
        maxLevel: 5,
        currentLevel: 0,
        effectPerLevel: 0.1,
        icon: '👟'
      }
    ];

    upgrades.forEach(upgrade => {
      this.upgrades.set(upgrade.id, upgrade);
    });
  }

  getUpgrade(id: string): ResearchUpgrade | undefined {
    return this.upgrades.get(id);
  }

  getAllUpgrades(): ResearchUpgrade[] {
    return Array.from(this.upgrades.values());
  }

  getUpgradesByCategory(category: ResearchCategory): ResearchUpgrade[] {
    return this.getAllUpgrades().filter(upgrade => upgrade.category === category);
  }

  unlockUpgradeLevel(id: string): boolean {
    const upgrade = this.upgrades.get(id);
    if (!upgrade) return false;

    if (upgrade.currentLevel >= upgrade.maxLevel) return false;

    upgrade.currentLevel++;
    
    // Increase cost for next level
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    
    return true;
  }

  private getTotalEffectByType(type: ResearchType): number {
    let total = 0;
    this.upgrades.forEach(upgrade => {
      if (upgrade.type === type) {
        total += upgrade.currentLevel * upgrade.effectPerLevel;
      }
    });
    return total;
  }

  // Get multipliers based on research
  getProductionSpeedMultiplier(): number {
    const totalBonus = this.getTotalEffectByType(ResearchType.PRODUCTION_SPEED);
    return 1 + totalBonus;
  }


  getUpgradeCostMultiplier(): number {
    const reduction = this.getTotalEffectByType(ResearchType.UPGRADE_COST);
    return Math.max(0.25, 1 - reduction);
  }

  getCoinValueMultiplier(): number {
    const bonus = this.getTotalEffectByType(ResearchType.COIN_VALUE);
    return 1 + bonus;
  }

  getBuildingEfficiencyMultiplier(): number {
    const bonus = this.getTotalEffectByType(ResearchType.BUILDING_EFFICIENCY);
    return 1 + bonus;
  }

  getHolidaySynergyMultiplier(): number {
    const bonus = this.getTotalEffectByType(ResearchType.FESTIVE_SPIRIT);
    return 1 + bonus;
  }

  hasPermanentMagnet(): boolean {
    return this.getMagnetResearchLevel() > 0;
  }

  getMagnetResearchLevel(): number {
    const upgrade = this.upgrades.get('magnet_perk_1');
    return upgrade ? upgrade.currentLevel : 0;
  }

  getPlayerSpeedMultiplier(): number {
    const bonus = this.getTotalEffectByType(ResearchType.PLAYER_SPEED);
    return 1 + bonus;
  }

  getTreeResearchEffects(): TreeResearchEffects {
    const treeValueBonus = this.getTotalEffectByType(ResearchType.TREE_GIFT_VALUE);
    const cooldownBoost = this.getTotalEffectByType(ResearchType.TREE_RECOVERY_SPEED);
    const coinBurstBonus = this.getTotalEffectByType(ResearchType.TREE_PRESENT_BURST);

    const coinValueMultiplier = (1 + treeValueBonus) * this.getCoinValueMultiplier() * this.getHolidaySynergyMultiplier();
    const cooldownMultiplier = Math.max(0.4, 1 / (1 + cooldownBoost));
    const coinBatchMultiplier = 1 + coinBurstBonus;

    return {
      coinValueMultiplier,
      cooldownMultiplier,
      coinBatchMultiplier
    };
  }

  // Save/Load functionality
  getSaveData(): any {
    return {
      upgrades: Array.from(this.upgrades.values()).map(u => ({
        id: u.id,
        currentLevel: u.currentLevel,
        cost: u.cost
      }))
    };
  }


  loadSaveData(data: any) {
    if (data.upgrades) {
      data.upgrades.forEach((savedUpgrade: any) => {
        const upgrade = this.upgrades.get(savedUpgrade.id);
        if (upgrade) {
          upgrade.currentLevel = savedUpgrade.currentLevel;
          upgrade.cost = savedUpgrade.cost;
        }
      });
    }
  }
}
