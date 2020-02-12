import { Food } from './food';
import { KVP } from './key-value-pair';
import { Usage } from './usage';

export type Tripple = [any, KVP<Usage>, KVP<Food>];
