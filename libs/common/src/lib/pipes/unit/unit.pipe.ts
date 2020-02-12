import { Pipe, PipeTransform } from '@angular/core'
import { KVP } from '../../models/key-value-pair'

const UNIT_MAP: KVP<string> = {
  g: 'gram',
  lb: 'pound',
  tsp: 'teaspoons',
  tbsp: 'tablespoons',
}

@Pipe({
  name: 'unit',
})
export class UnitPipe implements PipeTransform {
  transform(unit: any): any {
    return UNIT_MAP[unit] || unit
  }
}
