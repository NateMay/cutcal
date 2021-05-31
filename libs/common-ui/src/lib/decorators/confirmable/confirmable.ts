/**
 * @description Decorator that prevents the execution of the method until the user confirms via dialog
 */
export const Confirmable = (message: string): MethodDecorator => (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const original = descriptor.value as () => any

    descriptor.value = function (...args: any[]): any {
      return confirm(message) ? original.apply(this, args) as boolean : null
    }

    return descriptor
  };
