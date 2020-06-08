import { Pipe, PipeTransform } from '@angular/core'
import { ordinalSuffixOf } from '../../functions'

@Pipe({
  name: 'ordinalSuffix'
})
export class OrdinalSuffixPipe implements PipeTransform {
  transform(i: number): any {
    return ordinalSuffixOf(i)
  }
}
