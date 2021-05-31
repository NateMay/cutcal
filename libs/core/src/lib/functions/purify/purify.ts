import { RawType, toRawType } from '../toRawType/toRawType'
/**
 * @description Remove keys for nulls and undefined members
 * @param {object} obj
 * @example
 *   purifyObject({ a: null, b: true}); => { a: null }
 */
export const purifyObject = <T extends Record<any, any>>(obj: T): T => {
  if (!obj) return obj
  for (const prop of Object.keys(obj) as (keyof T)[]) {
    const value = obj[prop]
    const rawType: RawType = toRawType(value)
    if (['Undefined', 'Null'].includes(rawType)) delete obj[prop]
    else if (rawType == 'Array') obj[prop] = purifyArray(value) as unknown as T[keyof T]
    else if (rawType == 'Object') obj[prop] = purifyObject(value)
    else obj[prop] = value
  }
  return obj
}

export const purifyArray = <U>(array: U[]): U[] =>
  array.filter((el) => el != null)
