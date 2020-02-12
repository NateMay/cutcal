import { Attribute, Directive, forwardRef } from '@angular/core'
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms'

/**
 * Directive which pairs with a passord form control and ensures equality
 * @source [scotch.io] {@link https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2}
 */

@Directive({
  selector:
    '[ccConfirmPassword][formControlName],[ccConfirmPassword][formControl],[ccConfirmPassword][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ConfrmPasswordDir),
      multi: true,
    },
  ],
})
export class ConfrmPasswordDir implements Validator {
  constructor(@Attribute('confirmPassword') public confirmPassword: string) {}

  validate(confirm: AbstractControl): ValidationErrors | null {
    const password = confirm.root.get(this.confirmPassword)

    if (!password)
      throw new Error(
        '[CutCal] Confirm validator requires an accompanying password validator'
      )

    const noMatch = confirm.value != password.value

    return !password || noMatch ? { noMatch: true } : null
  }
}
