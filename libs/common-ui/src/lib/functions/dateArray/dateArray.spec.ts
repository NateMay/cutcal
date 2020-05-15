import { dateArray } from './dateArray';

describe('dateArray() - shared/functions', () => {
  it('should result in an array of the specified number of days, and shouod not require the "startDate" argument', () => {
    expect(dateArray(10)).toHaveLength(10);
  });

  it('should result in an array of incrmenting dates starting from the provided "startDate" argument', () => {
    const date = new Date(2019, 5, 10);
    expect(dateArray(10, date)[0]).toEqual(date);
    expect(dateArray(10, date)[4]).toEqual(new Date(2019, 5, 14));
    expect(dateArray(10, date)[9]).toEqual(new Date(2019, 5, 19));
  });
});
