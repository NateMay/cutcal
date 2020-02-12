import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';


describe('TimeAdapter', () => {

  describe('convertTimeToDateTime', () => {


    // it('shout convert string time into DateTime format', () => {
    //     const stringTime = '11:20 pm';
    //     const time = TimeAdapter.convertTimeToDateTime(stringTime);

    //     expect(time instanceof DateTime).toBeTruthy();
    //     expect(time.isValid).toBeTruthy();
    //     expect(time.hour).toBe(23, 'wrong hours');
    //     expect(time.minute).toBe(20, 'wrong minutes');
    // });

    // it('shout convert string time into DateTime format (24hours format)', () => {
    //     const stringTime = '23:20';
    //     const time = TimeAdapter.convertTimeToDateTime(stringTime, 24);

    //     expect(time instanceof DateTime).toBeTruthy();
    //     expect(time.isValid).toBeTruthy();
    //     expect(time.hour).toBe(23, 'wrong hours');
    //     expect(time.minute).toBe(20, 'wrong minutes');
    // });

    // it('should be invalid if pass incorrect value', () => {
    //     const time = 'time';
    //     expect(TimeAdapter.convertTimeToDateTime(time).isValid).toBeFalsy();
    // });
  });

  describe('parseTime', () => {

    it('should return 11:00 AM', () => {
      const expected = '11:00 AM';

      expect(TimeAdapter.parseTime('11:00')).toBe(expected);
      expect(TimeAdapter.parseTime('11:00 Am')).toBe(expected);
      expect(TimeAdapter.parseTime('11:00 am')).toBe(expected);
      expect(TimeAdapter.parseTime('11:00am')).toBe(expected);
    });

    it('should parse time to 12hours format', () => {
      const expected = '11:11 PM';

      expect(TimeAdapter.parseTime('23:11')).toBe(expected);
      expect(TimeAdapter.parseTime('11:11 PM')).toBe(expected);
      expect(TimeAdapter.parseTime('11:11 pm')).toBe(expected);
      expect(TimeAdapter.parseTime('11:11pm')).toBe(expected);
    });

    it('should parse time to 24hours format', () => {
      const format = 24;

      expect(TimeAdapter.parseTime('23:00', format)).toBe('23:00');
      expect(TimeAdapter.parseTime('11:00 pm', format)).toBe('23:00');
      expect(TimeAdapter.parseTime('11:00', format)).toBe('11:00');
      expect(TimeAdapter.parseTime('11:00 am', format)).toBe('11:00');
    });

    it('should return Invalid time', () => {
      const expected = 'Invalid time';

      expect(TimeAdapter.parseTime('11')).toBe(expected);
    });
  });

  describe('isTimeAvailable', () => {

    it('should return false if no time provided', () => {
      expect(TimeAdapter.isTimeAvailable('')).toBeFalsy();
      expect(TimeAdapter.isTimeAvailable(null)).toBeFalsy();
      expect(TimeAdapter.isTimeAvailable(undefined)).toBeFalsy();
    });

  });

  describe('formatHour', () => {

    it('should return hour without changes', () => {
      const hour = 23;
      expect(TimeAdapter.formatHour(hour, 24, TimePeriod.AM)).toBe(hour);
    });

    it('should return 10', () => {
      expect(TimeAdapter.formatHour(10, 12, TimePeriod.AM)).toBe(10);
    });

    it('should return 22', () => {
      expect(TimeAdapter.formatHour(10, 12, TimePeriod.PM)).toBe(22);
    });

    it('should return 0', () => {
      expect(TimeAdapter.formatHour(12, 12, TimePeriod.AM)).toBe(0);
    });

    it('should return 12', () => {
      expect(TimeAdapter.formatHour(12, 12, TimePeriod.PM)).toBe(12);
    });
  });
});
