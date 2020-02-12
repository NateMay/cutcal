
 /**
  * Converts boolean string to boolean for @Input()
  * @type decorator
  */

export function Boolish(target: any, property: string): any {
  let val: boolean;
  return {
    set: (value: any): void => {
      if (typeof value == 'boolean') val = value;
      else if (typeof value == 'string' && value !== '')
        val = (value == 'false') ? false : true;
      else if (typeof value == 'number') val = !!value;
      else val = target[property];
    },
    get: (): boolean => val,
    enumerable: true,
    configurable: true
  };
};
