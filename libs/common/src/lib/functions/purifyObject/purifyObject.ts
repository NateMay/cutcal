/**
 * @description Remove keys for nulls and undefined members
 * @param {object} obj
 * @example
 *   purifyObject({ a: null, b: true}); => { a: null }
 */
export const purifyObject = (obj: object): object => {
  Object.keys(obj).forEach(key => {
    if (!!obj[key] && typeof obj[key] == 'object')
      obj[key] = purifyObject(obj[key])
    else if (obj[key] == null) delete obj[key]
  })
  return obj
  // return _.pickBy(obj, _.identity);
}
