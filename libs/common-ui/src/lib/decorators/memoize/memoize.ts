/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * @description Decorator which memoizes the output of a function
 */
export const Memoize = (
  hashFunction?: (...args: any[]) => any
): MethodDecorator => (
  target: unknown,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void | never => {
  if (descriptor.value != null)
    descriptor.value = getNewFunction(descriptor.value, hashFunction)
  else if (descriptor.get != null)
    descriptor.get = getNewFunction(descriptor.get, hashFunction)
  else
    throw Error(
      '[CutCal] Only put a Memoize() decorator on a method or get accessor.'
    )
}

let counter = 0
function getNewFunction(
  originalMethod: () => void,
  hashFunction?: (...args: any[]) => any
): () => any {
  const identifier = ++counter

  // The function returned here gets called instead of originalMethod.
  return function (this: any, ...args: any[]): any {
    const propValName = `__memoized_value_${identifier}`
    const propMapName = `__memoized_map_${identifier}`

    let returnedValue: any

    if (hashFunction || args.length > 0) {
      // Get or create map
      if (!Object.prototype.hasOwnProperty.call(this, propMapName)) {
        Object.defineProperty(this, propMapName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: new Map<any, any>()
        })
      }
      const myMap: Map<any, any> = this[propMapName]

      const hashKey = hashFunction ? hashFunction.apply(this, args) : args[0]

      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey)
      } else {
        returnedValue = originalMethod.apply(this, args)
        myMap.set(hashKey, returnedValue)
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(this, propValName)) {
        returnedValue = this[propValName]
      } else {
        returnedValue = originalMethod.apply(this, args)
        Object.defineProperty(this, propValName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: returnedValue
        })
      }
    }

    return returnedValue as unknown
  }
}
