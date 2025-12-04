import { Building } from '../entities/Building';

export class EconomySystem {
  private coins: number;
  private totalEarned: number;
  private buildings: Building[];
  private passiveIncomeModifier: number;
 
  constructor(initialCoins: number = 0, passiveIncomeModifier: number = 0.85) {
    this.coins = initialCoins;
    this.totalEarned = 0;
    this.buildings = [];
    this.passiveIncomeModifier = passiveIncomeModifier;
  }


  addCoins(amount: number) {
    this.coins += amount;
    this.totalEarned += amount;
  }

  spendCoins(amount: number): boolean {
    if (this.coins >= amount) {
      this.coins -= amount;
      return true;
    }
    return false;
  }

  getCoins(): number {
    return this.coins;
  }

  getTotalEarned(): number {
    return this.totalEarned;
  }

  setCoins(amount: number) {
    this.coins = amount;
  }

  setTotalEarned(amount: number) {
    this.totalEarned = amount;
  }

  addBuilding(building: Building) {
    this.buildings.push(building);
  }

  getBuildings(): Building[] {
    return this.buildings;
  }

  calculateIncome(): number {
    return this.buildings.reduce((total, building) => {
      return total + building.getIncome();
    }, 0);
  }

  processIncome() {
    const income = this.calculateIncome();
    const adjustedIncome = Math.floor(income * this.passiveIncomeModifier);
    this.addCoins(adjustedIncome);
    return adjustedIncome;
  }
}
