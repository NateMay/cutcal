/**
 * @description Debug utility decorator to console.log() the return value of a method
 * @example
 *   // replace "__" with the at symbol (breaks jsdocs)
 *   __ConsoleReturn('What is this?')
 *   someMethod(){
 *     return ...
 *   }
 */
export function ConsoleReturn(message: string = ''): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const original = descriptor.value

    descriptor.value = function (...args: any[]): any {
      const result = original.apply(this, args)
      console.log(key, message, result)
      return result
    }

    return descriptor
  }
}
