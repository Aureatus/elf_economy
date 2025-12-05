import { BuildingType } from '../entities/Building';
 
 export const BUILDING_SEQUENCE: BuildingType[] = [
   BuildingType.TOY_MAKER,
   BuildingType.GIFT_WRAPPER,
   BuildingType.COOKIE_FACTORY,
   BuildingType.ELF_HOUSE,
   BuildingType.REINDEER_STABLE,
   BuildingType.CANDY_CANE_FORGE,
   BuildingType.STOCKING_STUFFER,
   BuildingType.SNOWGLOBE_FACTORY,
   BuildingType.ORNAMENT_WORKSHOP,
   BuildingType.COOKIE_BAKERY,
   BuildingType.GIFT_WRAPPING_STATION,
   BuildingType.ELF_DORMITORY,
   BuildingType.REINDEER_STABLES,
   BuildingType.SANTAS_OFFICE
 ];
 
 export interface BuildingSpot {

  id: string;
  type: BuildingType;
  x: number;
  y: number;
  unlockOrder: number;
  repaired: boolean;
}

export interface TreeSpot {
  id: string;
  x: number;
  y: number;
  unlockOrder: number;
  planted: boolean;
  cost: number;
}

export class WorkshopLayout {
  // Default layouts removed for boundless play; arrays retained for backwards compatibility
  static readonly BUILDING_SPOTS: BuildingSpot[] = [];

  // Trees give active income but require clicking
  static readonly TREE_SPOTS: TreeSpot[] = [];

  static getInitialBuildingSpots(): BuildingSpot[] {
    return this.BUILDING_SPOTS.map(spot => ({ ...spot }));
  }

  static getInitialTreeSpots(): TreeSpot[] {
    return this.TREE_SPOTS.map(spot => ({ ...spot }));
  }

  static getNextUnrepairedBuilding(spots: BuildingSpot[]): BuildingSpot | null {
    return spots
      .filter(spot => !spot.repaired)
      .sort((a, b) => a.unlockOrder - b.unlockOrder)[0] || null;
  }

  static getNextUnplantedTree(spots: TreeSpot[]): TreeSpot | null {
    return spots
      .filter(spot => !spot.planted)
      .sort((a, b) => a.unlockOrder - b.unlockOrder)[0] || null;
  }

  static getRepairedBuildingCount(spots: BuildingSpot[]): number {
    return spots.filter(spot => spot.repaired).length;
  }

  static getPlantedTreeCount(spots: TreeSpot[]): number {
    return spots.filter(spot => spot.planted).length;
  }

  static getTotalBuildingCount(): number {
    return this.BUILDING_SPOTS.length;
  }

  static getTotalTreeCount(): number {
    return this.TREE_SPOTS.length;
  }
}
