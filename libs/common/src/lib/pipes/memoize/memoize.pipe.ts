import { Pipe, PipeTransform } from '@angular/core'

/**
 * [attr]="methodName(value)"
 * becomes [attr]="value
 * [attr]="value | memoize : methodName"
 * @refernce https://medium.com/@ineedsomemeat/angular-optimization-memoized-pipe-functions-in-templates-75f62e16df5a
 */

@Pipe({
  name: 'memoize',
})
export class MemoizePipe implements PipeTransform {
  public transform(
    value: any,
    handler: (value: any) => any,
    context?: any
  ): any {
    return Boolean(context) ? handler.call(context, value) : handler(value)
  }
}
