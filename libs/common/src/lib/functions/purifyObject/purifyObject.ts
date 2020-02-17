import { KVP } from '@cutcal/core';
/**
 * Remove keys for nulls and undefined members
 * @param {Object} obj
 * @example
 *   purifyObject({ a: null, b: true}); => { a: null }
 */
export const purifyObject = (obj: KVP<any>) => {
  Object.keys(obj).forEach(key => {
    if (!!obj[key] && typeof obj[key] == 'object')
      obj[key] = purifyObject(obj[key])
    else if (obj[key] == null) delete obj[key]
  })
  return obj
  // return _.pickBy(obj, _.identity);
}
