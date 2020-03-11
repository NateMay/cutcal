/**
 * @description Decorator that prevents the execution of the method until the user confirms via dialog
 */
export function Confirmable(message: string): MethodDecorator {
  return (
    target: {},
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const original = descriptor.value

    descriptor.value = function(...args: any[]): any {
      return confirm(message) ? original.apply(this, args) : null
    }

    return descriptor
  }
}
