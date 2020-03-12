import { keys } from 'lodash'
import { KVP } from '../../../../../core/src/lib/key-value-pair'
/**
 * @description Remove keys for nulls and undefined members
 * @param {object} obj
 * @example
 *   purifyObject({ a: null, b: true}); => { a: null }
 */
export const purifyObject = (obj: KVP<any>): object => {
  for (const key of keys(obj)) {
    if (!!obj[key] && typeof obj[key] == 'object')
      obj[key] = purifyObject(obj[key])
    else if (obj[key] == null) delete obj[key]
  }
  // Object.keys(obj).forEach(key => {
  //   if (!!obj[key] && typeof obj[key] == 'object')
  //     obj[key] = purifyObject(obj[key])
  //   else if (obj[key] == null) delete obj[key]
  // })
  return obj
  // return _.pickBy(obj, _.identity);
}
