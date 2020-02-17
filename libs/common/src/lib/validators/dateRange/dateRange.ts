import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRange(
  startDateCtrlName: string,
  endDateControlName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startControl = group.get(startDateCtrlName)
    const endControl = group.get(endDateControlName)

    if (!startControl || !endControl) return null
    else
      return startControl.value >= endControl.value
        ? { invalidRange: true }
        : null
  }
}
