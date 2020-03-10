/**
 * @Reference {@link https://medium.com/javascript-in-plain-english/you-must-understand-these-14-javasript-functions-1f4fa1c620e2 Medium}
 */
export function toRawType(value): string {
  const _toString = Object.prototype.toString

  const str = _toString.call(value)

  return str.slice(8, -1)
}
