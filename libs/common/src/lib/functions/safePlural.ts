import { plural } from 'pluralize'

export const safePlural = (unit: string, quantity: number): string =>
  quantity == 1 ? unit : plural(unit)
