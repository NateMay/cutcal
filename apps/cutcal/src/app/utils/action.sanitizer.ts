import { Action } from '@ngrx/store'

/**
 * Fixes breaking issue related to lazy loading ngrx forFeature() modules
 * @reference [Overlay-Stackblitz] {@link https://github.com/ngrx/platform/issues/825}
 * @source wesselvdv comment on Feb 23
 * @note must be exported for --aot build
 */
export function actionSanitizer(action: any) {
  return JSON.parse(stringify(action))
}

export function stringify(
  obj: any,
  replacer?: () => any,
  spaces?: any,
  cycleReplacer?: () => any
): string {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer: any, cycleReplacer: any) {
  const stack: Action[] = []
  const keys: string[] = []

  if (cycleReplacer == null) {
    cycleReplacer = (key: string, value: any) => {
      if (stack[0] === value) return '[Circular ~]'
      return `[Circular ~.${keys.slice(0, stack.indexOf(value)).join('.')}]`
    }
  }

  return function(this: any, key: string, value: any) {
    if (stack.length > 0) {
      const thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    } else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}
