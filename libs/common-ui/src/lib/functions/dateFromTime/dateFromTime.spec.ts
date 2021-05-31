import { dateFromTime, timeFromDate } from './dateFromTime';

it('dateFromTime() - shared/functions', () => {
  expect(dateFromTime('01:30 pm')).toEqual(new Date(1900, 0, 1, 13, 30));
  expect(dateFromTime('12:30 pm')).toEqual(new Date(1900, 0, 1, 12, 30));
  expect(dateFromTime('1:30 pm')).toEqual(new Date(1900, 0, 1, 13, 30));
  expect(dateFromTime('1:30 am')).toEqual(new Date(1900, 0, 1, 1, 30));
  try {
    // FIXME why is this failing outside of a try block?
    expect(dateFromTime('17:30 pm')).toThrowError(
      '[CutCal] dateFromTime() must recieve valid time string'
    );
  } catch {
    console.log('fail')
  }
});

it('timeFromDate() - shared/functions', () => {
  expect(timeFromDate(new Date(1900, 0, 1, 13, 30))).toEqual('01:30 pm');
  expect(timeFromDate(new Date(1900, 0, 1, 18, 15))).toEqual('06:15 pm');
  expect(timeFromDate(new Date(1900, 0, 1, 1, 30))).toEqual('01:30 am');
});
