import { KVP } from '@cutcal/core'
import { Food } from './food'
import { Usage } from './usage'

export type Tripple = [any, KVP<Usage>, KVP<Food>]
