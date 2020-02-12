import { analyzeParams } from './analyzeParams';

describe('analyzeParams() - shared/functions', () => {
  it('should create queryParams obj by accepting a date and the timeframe "week"', () => {
    expect(analyzeParams(new Date(2019, 0, 24), 'week')).toEqual({
      queryParams: { start: '20-1-2019', end: '26-1-2019' },
    });

    expect(analyzeParams(new Date(2022, 4, 17), 'week')).toEqual({
      queryParams: { start: '15-5-2022', end: '21-5-2022' },
    });
  });

  it('should create queryParams obj by accepting a date and the timeframe "month"', () => {
    expect(analyzeParams(new Date(2020, 1, 24), 'month')).toEqual({
      queryParams: { start: '1-2-2020', end: '29-2-2020' },
    });

    expect(analyzeParams(new Date(2022, 4, 17), 'month')).toEqual({
      queryParams: { start: '1-5-2022', end: '31-5-2022' },
    });
  });

  it('should create queryParams obj by accepting a date and the timeframe "year"', () => {
    expect(analyzeParams(new Date(2020, 1, 24), 'year')).toEqual({
      queryParams: { start: '1-1-2020', end: '31-12-2020' },
    });
  });

  it('should create queryParams obj by accepting 2 dates', () => {
    expect(analyzeParams(new Date(2020, 1, 24), new Date(2020, 8, 11))).toEqual(
      {
        queryParams: { start: '24-2-2020', end: '11-9-2020' },
      }
    );
  });
});
