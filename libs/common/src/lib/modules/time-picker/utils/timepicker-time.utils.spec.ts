import { getHours, getMinutes } from './timepicker-time.utils';

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
