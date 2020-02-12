import { first } from 'rxjs/operators';
import { DEAFULT_DAILY_VALUE } from './daily-value';
import { DailyValueSvc } from './daily-value.service';

it('Daily Value service should return a reference to the daily value', () => {
  let result;
  const service = new DailyValueSvc();
  service.dailyValue$.pipe(first()).subscribe(value => result = value);
  expect(result).toEqual(DEAFULT_DAILY_VALUE)
})
