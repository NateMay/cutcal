import { Validators } from '@angular/forms'
import { dateRange } from './dateRange/dateRange'
import { minLengthArray } from './minLengthArray/minLengthArray'
import { password } from './password/password'

/**
 * CutCal Custome Validators for Reactive Forms
 */

export class CCValidators extends Validators {
  static password = password
  static dateRange = dateRange
  static minLengthArray = minLengthArray

  constructor() {
    super()
  }
}
