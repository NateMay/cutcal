/**
 * Directive which applies the standard password rules
 */

import { Directive } from '@angular/core'
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms'

@Directive({
  selector:
    '[dsPassword][formControlName],[dsPassword][formControl],[dsPassword][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDir,
      multi: true
    }
  ]
})
export class PasswordValidatorDir implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return password(control)
  }
}

export const password: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (isPresent(Validators.required(control))) return null

  const v = control.value as string
  const hasCap = !!v && /[A-Z]/.test(v)
  const hasNum = !!v && /[0-9]/.test(v)
  const atLeast6 = !!v && v.length >= 6
  const atMost20 = !!v && v.length <= 20

  return hasCap && hasNum && atLeast6 && atMost20
    ? null
    : {
        noCap: !hasCap,
        noNum: !hasNum,
        lessthan6: !atLeast6,
        moreThan20: !atMost20
      }
}

export const isPresent = (obj: unknown): boolean =>
  obj !== undefined && obj !== null
