import { FormGroup } from '@angular/forms'

/**
 * Common form template error handling function
 * @param {FormGroup} form
 * @param {string} controlName
 * @param {string} errorName
 * @example
 *   get pwdLt6(): boolean {
 *     return this.showError('username', 'lessthan6');
 *   }
 *
 *   showError(controlName: string, errorName: string): boolean {
 *     return displayError(this.form, controlName, errorName);
 *   }
 */

export function displayError(
  form: FormGroup,
  controlName: string,
  errorName: string
): boolean {
  const control = form.get(controlName)
  if (!control)
    throw new Error(
      `[CutCal] displayError() could not find control "${controlName}"`
    )
  else return control.touched && control.hasError(errorName)
}
