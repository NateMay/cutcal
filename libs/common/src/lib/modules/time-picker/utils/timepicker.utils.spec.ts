import { isBetween, isSameOrAfter, isSameOrBefore } from './timepicker.utils';

describe('TimepickerUtils', () => {
  describe('isSameOrAfter', () => {
    it('should return true if time the same or more than min value', () => {
      expect(isSameOrAfter(new Date(), new Date())).toBeTruthy();

      expect(
        isSameOrAfter(new Date(2020, 3, 10, 5, 6), new Date(2020, 3, 10, 5, 7))
      ).toBeTruthy();
    });

    it('should return false if hour less than min value', () => {
      expect(
        isSameOrAfter(new Date(2020, 3, 10, 5, 6), new Date(2020, 3, 10, 5, 7))
      ).toBeTruthy();
    });

    it('should return false', () => {
      expect(
        isSameOrAfter(
          new Date(2020, 3, 10, 5, 6),
          new Date(2020, 3, 10, 5, 7),
          undefined
        )
      ).toBeFalsy();
    });
  });

  describe('isSameOrBefore', () => {
    it('should return true if time before or equal max value', () => {
      expect(
        isSameOrBefore(new Date(2020, 3, 10, 5, 6), new Date(2020, 3, 10, 5, 7))
      ).toBeTruthy();

      expect(
        isSameOrBefore(new Date(2020, 3, 10, 5, 6), new Date(2020, 3, 10, 5, 7))
      ).toBeTruthy();
    });

    it('should return false if hour more than max', () => {
      // const max = TimeAdapter.convertTimeToDateTime('11:11 am');
      // const time = TimeAdapter.convertTimeToDateTime('12:10 pm');
      expect(
        isSameOrBefore(
          new Date(2020, 3, 10, 6, 6),
          new Date(2020, 3, 10, 5, 7),
          'hours'
        )
      ).toBeFalsy();
    });

    it('should return false', () => {
      // const max = TimeAdapter.convertTimeToDateTime('11:11 am');
      // const time = TimeAdapter.convertTimeToDateTime('12:10 pm');
      expect(
        isSameOrBefore(
          new Date(2020, 3, 10, 6, 6),
          new Date(2020, 3, 10, 5, 7),
          undefined
        )
      ).toBeFalsy();
    });
  });

  describe('isBetween', () => {
    it('should return true if time between min(inclusively) and max(inclusively) value', () => {
      const min = new Date(2020, 3, 10, 9, 0, 0);
      const max = new Date(2020, 3, 10, 15, 0, 0);

      expect(isBetween(new Date(2020, 3, 10, 12, 0, 0), min, max)).toBeTruthy();

      expect(isBetween(min, min, max)).toBeTruthy();

      expect(isBetween(max, min, max)).toBeTruthy();
    });

    it('should return false if hour is not between min(inclusively) and max(inclusively) value', () => {
      const min = new Date(2020, 3, 10, 9, 0, 0);
      const max = new Date(2020, 3, 10, 15, 0, 0);
      const time = new Date(2020, 3, 10, 16, 5, 0);

      expect(isBetween(time, min, max, 'hours')).toBeFalsy();
    });

    it('should return false', () => {
      const min = new Date(2020, 3, 10, 9, 0, 0);
      const max = new Date(2020, 3, 10, 15, 0, 0);
      const time = new Date(2020, 3, 10, 16, 5, 0);

      expect(isBetween(time, min, max, undefined)).toBeFalsy();
    });
  });
});
