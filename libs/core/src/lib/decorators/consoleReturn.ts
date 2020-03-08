/**
 * Debug utility to console.log() the return value of a method
 * @type decorator
 * @example
 *   @ConsoleReturn('What is this?')
 *   someMethod(){
 *     return ...
 *   }
 */
export function ConsoleReturn(message: string = ''): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value

    descriptor.value = function(...args: any[]) {
      const result = original.apply(this, args)
      // tslint:disable:no-console
      console.log(key, message, result)
      return result
    }

    return descriptor
  }
}
