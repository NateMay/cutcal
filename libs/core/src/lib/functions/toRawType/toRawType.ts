/**
 * @see {@link https://medium.com/javascript-in-plain-english/you-must-understand-these-14-javasript-functions-1f4fa1c620e2 Medium}
 */
export type RawType =
  | 'Null'
  | 'String'
  | 'Number'
  | 'Function'
  | 'Date'
  | 'Array'
  | 'Boolean'
  | 'Object'
  | 'Undefined'

export function toRawType(value: any): RawType {
  const _toString = Object.prototype.toString
  const stringified = _toString.call(value)
  return stringified.slice ? stringified.slice(8, -1) : 'Undefined'
}
