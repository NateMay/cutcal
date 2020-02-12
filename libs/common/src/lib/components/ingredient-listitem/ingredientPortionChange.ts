import { Food } from '../../models/food';
import { Usage } from '../../models/usage';

export interface IngredientPortionChange {
  usage: Usage;
  food: Food;
  unit: string;
  quantity: number;
}
