import { KVP } from '@cutcal/core'
/**
 * @description Removes all members of an oject from among those passed in
 * @param {KVP<any>} objIn the object to modify
 * @param {string[]} props key names to remove
 */

export function removePropsDeeply(objIn: KVP<any>, props: string[]): {} {
  const objOut: KVP<any> = {}

  Object.keys(objIn)
    .filter(key => !props.includes(key))
    .map(key => (objOut[key] = objIn[key]))

  for (const property in objOut) {
    if (typeof objOut[property] == 'object')
      objOut[property] = removePropsDeeply(objOut[property], props)
  }

  return objOut
}
