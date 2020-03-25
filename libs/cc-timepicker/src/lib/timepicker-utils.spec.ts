import {
  getHours,
  getMinutes,
  isBetween,
  isSameOrAfter,
  isSameOrBefore,
} from './timepicker-utils';

describe('TimepickerUtils', () => {
  describe('isSameOrAfter', () => {
    it('should return true if time the same or more than min value', () => {
      expect(isSameOrAfter(new Date(), new Date())).toBeTruthy();

      expect(
        isSameOrAfter(new Date(2020, 3, 10, 5, 10), new Date(2020, 3, 10, 5, 7))
      ).toBeTruthy();
    });

    it('should return false if hour less than min value', () => {
      expect(
        isSameOrAfter(new Date(2020, 3, 10, 5, 6), new Date(2020, 3, 10, 5, 7))
      ).toBeFalsy();
    });

    it('should return false', () => {
      expect(
        isSameOrAfter(
          new Date(2020, 3, 10, 4, 6),
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
      expect(
        isSameOrBefore(
          new Date(2020, 3, 10, 6, 6),
          new Date(2020, 3, 10, 5, 7),
          'hours'
        )
      ).toBeFalsy();
    });

    it('should return false', () => {
      expect(
        isSameOrBefore(
          new Date(2020, 3, 10, 5, 9),
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

describe('TimepickerTime', () => {
  describe('Hour', () => {
    it('should return 12 hours', () => {
      const hours = getHours(12);
      for (let i = 0; i < hours.length; i++) {
        const angleStep = 30;
        expect(hours[i]).toEqual({ time: i + 1, angle: (i + 1) * angleStep });
      }
    });

    it('should return 24 hours', () => {
      const hours = getHours(24);
      for (let i = 0; i < hours.length; i++) {
        const angleStep = 30;
        const time = i + 1;

        expect(hours[i]).toEqual({
          time: time === 24 ? 0 : time,
          angle: time * angleStep,
        });
      }
    });
  });

  describe('Minute', () => {
    const minutes = getMinutes();

    it('should return array with 60 minutes by default', () => {
      const angleStep = 360 / 60;

      expect(minutes).toHaveLength(60);

      for (let i = 0; i < minutes.length; i++) {
        const angle = i * angleStep;

        expect(minutes[i]).toEqual({
          time: i,
          angle: angle !== 0 ? angle : 360,
        });
      }
    });

    it('should return minutes with gap in 5 minutes', () => {
      const gap = 5;
      const minutesWithGap = getMinutes(gap);
      const angleStep = 360 / 60;

      expect(minutesWithGap).toHaveLength(12);

      for (let i = 0; i < minutesWithGap.length; i++) {
        const angle = i * angleStep * gap;

        expect(minutesWithGap[i]).toEqual({
          time: i * gap,
          angle: angle !== 0 ? angle : 360,
        });
      }
    });
  });
});
