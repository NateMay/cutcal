import { AbstractControl, ValidationErrors } from '@angular/forms'

export function minLengthArray(min: number) {
  return (c: AbstractControl): ValidationErrors | null => {
    return c.value.length >= min
      ? null
      : {
          minLengthArray: {
            valid: false,
            required: min,
            actual: c.value.length,
          },
        }
  }
}
