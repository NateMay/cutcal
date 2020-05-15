import { Pipe, PipeTransform } from '@angular/core'

/**
 * @description memoizes methods bound in the template that would otherwise
 * execute on every ngDoCheck() cycle
 *
 * @see {@link https://medium.com/ineedsomemeat/angular-optimization-memoized-pipe-functions-in-templates-75f62e16df5a Medium}
 *
 * @example
 * ```html
 *  <element [attr]="methodName(value)">Was this</element>
 *
 *  <element [attr]="value | memoize : methodName">Now this</element>
 * ```
 */

@Pipe({
  name: 'memoize'
})
export class MemoizePipe implements PipeTransform {
  public transform(
    value: any,
    handler: (value: any) => any,
    context?: any
  ): any {
    return context ? handler.call(context, value) : handler(value)
  }
}
