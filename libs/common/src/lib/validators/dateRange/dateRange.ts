import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const dateRange = (
  startDateCtrlName: string,
  endDateControlName: string
): ValidatorFn => (group: AbstractControl): ValidationErrors | null => {
  const startControl = group.get(startDateCtrlName)
  const endControl = group.get(endDateControlName)

  if (!startControl || !endControl) return null
  else
    return startControl.value >= endControl.value
      ? { invalidRange: true }
      : null
}
