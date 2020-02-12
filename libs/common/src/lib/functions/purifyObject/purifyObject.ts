// with object descructuring I've found this useful to avoid FireBase write errors

/**
 * Remove keys for nulls and undefined members
 * @param {Object} obj
 * @example
 *   purifyObject({ a: null, b: true}); => { a: null }
 */
export const purifyObject = (obj: {}) => {
  Object.keys(obj).forEach(key => {
    if (!!obj[key] && typeof obj[key] == 'object')
      obj[key] = purifyObject(obj[key])
    else if (obj[key] == null) delete obj[key]
  })
  return obj
}
