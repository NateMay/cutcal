import { InjectionToken } from '@angular/core';

export const TIME_PICKER_DATA = new InjectionToken<{}>('TimePickerData');

export interface TimePickerData {
  input: any; // prevents circular reference
  close: () => void;
  timeSet: (time: string) => void;
}
