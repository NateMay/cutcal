import { Food, Usage } from '@cutcal/diet';


export interface IngredientPortionChange {
  usage: Usage;
  food: Food;
  unit: string;
  quantity: number;
}
