/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AbstractControl, ValidationErrors } from '@angular/forms'

export const minLengthArray = (min: number) => (
  c: AbstractControl
): ValidationErrors | null =>
  c.value.length >= min
    ? null
    : {
        minLengthArray: {
          valid: false,
          required: min,
          actual: c.value.length as number
        }
      }
