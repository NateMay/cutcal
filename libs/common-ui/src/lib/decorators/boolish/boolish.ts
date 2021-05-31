/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/**
 * @description Decorator which converts boolean string to boolean for @Input()
 */

export const Boolish: PropertyDecorator = (
  target: any,
  propertyKey: string | symbol
): any => {
  let val: boolean
  return {
    set: (value: any): void => {
      if (typeof value == 'boolean') val = value
      else if (typeof value == 'string' && value !== '')
        val = value == 'false' ? false : true
      else if (typeof value == 'number') val = !!value
      else val = target[propertyKey] as boolean
    },
    get: (): boolean => val,
    enumerable: true,
    configurable: true
  }
}
