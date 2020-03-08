/**
 * Prevents the execution of the method until the user confirms via dialog
 * @type decorator
 */
export function Confirmable(message: string): MethodDecorator {
  return (
    target: {},
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value

    descriptor.value = function(...args: any[]) {
      return confirm(message) ? original.apply(this, args) : null
    }

    return descriptor
  }
}
