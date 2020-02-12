import { plural } from 'pluralize'

export function safePlural(unit: string, quantity: number): string {
  return quantity == 1 ? unit : plural(unit)
}
