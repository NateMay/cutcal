/**
 * @description Debug utility decorator to console.log() the return value of a method
 * @example
 *   // replace "__" with the at symbol (breaks jsdocs)
 *   __ConsoleReturn('What is this?')
 *   someMethod(){
 *     return ...
 *   }
 */
export const ConsoleReturn = (message: string = ''): MethodDecorator => (
    target: unknown,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const original = descriptor.value as () => any

    descriptor.value = function (...args: any[]): any {
      const result = original.apply(this, args) as unknown
      console.log(key, message, result)
      return result
    }

    return descriptor
  };
