import { InjectionToken } from '@angular/core'

export const DATE_PICKER_DATA = new InjectionToken<unknown>('DatePickerData')

export interface DatePickerDialogData {
  selectedDate: Date
  monthBtnDisabled: boolean
  close: () => void
  select: (date: Date) => void
}
