import { Pipe, PipeTransform } from '@angular/core'
import { safePlural } from '../../functions/safePlural'

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(string: any, quantity: number): any {
    return safePlural(string, quantity)
  }
}
