import { Injectable } from '@angular/core'
import { DailyValue, DEAFULT_DAILY_VALUE } from '@cutcal/nutrition'
import { BehaviorSubject, Observable } from 'rxjs'

// FEATURE (daily-value)

/**
 * @description Service which calculates and manages Daily Values information
 * @see {@link https://ods.od.nih.gov/Health_Information/Dietary_Reference_Intakes.aspx}
 * @see {@link https://www.nap.edu/read/10490/chapter/1}
 */

@Injectable({
  providedIn: 'root'
})
export class DailyValueSvc {
  private dailyValue = new BehaviorSubject<DailyValue>(DEAFULT_DAILY_VALUE)

  get dailyValue$(): Observable<DailyValue> {
    return this.dailyValue.asObservable()
  }

  get snapshot(): DailyValue {
    return this.dailyValue.getValue()
  }
}
