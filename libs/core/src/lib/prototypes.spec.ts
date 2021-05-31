describe('addDay() - Date.prototype', () => {
  it(`should add a single day to a date`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const jul7: Date = new Date(2018, 6, 7);
    expect(jul6.addDay()).toEqual(jul7);
  });

  it(`should add a single day accounting for the leap year`, () => {
    const feb28: Date = new Date(2016, 1, 28);
    const feb29: Date = new Date(2016, 1, 29);
    expect(feb28.addDay()).toEqual(feb29);
  });

  it(`should add a single day accounting for the next month`, () => {
    const feb28: Date = new Date(2017, 1, 28);
    const mar1: Date = new Date(2017, 2, 1);
    expect(feb28.addDay()).toEqual(mar1);
  });

  it(`should add a single day accounting for the next year`, () => {
    const dec31: Date = new Date(2016, 11, 31);
    const jan1: Date = new Date(2017, 0, 1);
    expect(dec31.addDay()).toEqual(jan1);
  });
});

describe('addDays() - Date.prototype', () => {
  it(`should add a single day if an argument is not passed`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const jul7: Date = new Date(2018, 6, 7);
    expect(jul6.addDays()).toEqual(jul7);
  });

  it(`should add multiple days if an argument is passed`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const jul16: Date = new Date(2018, 6, 16);
    expect(jul6.addDays(10)).toEqual(jul16);

    const jul26: Date = new Date(2018, 6, 26);
    expect(jul6.addDays(20)).toEqual(jul26);
  });

  it(`should subtract days if a negative argument is passed`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const jul5: Date = new Date(2018, 6, 5);
    expect(jul6.addDays(-1)).toEqual(jul5);

    const jun26: Date = new Date(2018, 5, 26);
    expect(jul6.addDays(-10)).toEqual(jun26);
  });
});

describe('addMonth() - Date.prototype', () => {
  it(`should add a single month to a date`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const aug6: Date = new Date(2018, 7, 6);
    expect(jul6.addMonth()).toEqual(aug6);
  });

  it(`should add a single month accounting months with fewer days`, () => {
    const mar31: Date = new Date(2016, 2, 31);
    const apr30: Date = new Date(2016, 3, 30);
    expect(mar31.addMonth()).toEqual(apr30);
  });

  it(`should add a single month accounting for the leap year`, () => {
    const jan31: Date = new Date(2016, 0, 31);
    const feb29: Date = new Date(2016, 1, 29);
    expect(jan31.addMonth()).toEqual(feb29);
  });

  it(`should add a single month accounting for the next year`, () => {
    const dec31: Date = new Date(2016, 11, 31);
    const jan31: Date = new Date(2017, 0, 31);
    expect(dec31.addMonth()).toEqual(jan31);
  });
});

describe('addMonths() - Date.prototype', () => {
  it(`should add a single month if an argument is not passed`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const aug6: Date = new Date(2018, 7, 6);
    expect(jul6.addMonths()).toEqual(aug6);
  });

  it(`should add multiple months if an argument is passed`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const sep6: Date = new Date(2018, 8, 6);
    expect(jul6.addMonths(2)).toEqual(sep6);

    const jul6_19: Date = new Date(2019, 6, 6);
    expect(jul6.addMonths(12)).toEqual(jul6_19);
  });

  it(`should subtract months if a negative argument is passed`, () => {
    const jul6: Date = new Date(2018, 6, 6);
    const jun6: Date = new Date(2018, 5, 6);
    expect(jul6.addMonths(-1)).toEqual(jun6);

    const sep6_17: Date = new Date(2017, 8, 6);
    expect(jul6.addMonths(-10)).toEqual(sep6_17);
  });
});

describe('addYear() - Date.prototype', () => {
  it(`should add a single year to a date`, () => {
    const j17: Date = new Date(2017, 6, 6);
    const j18: Date = new Date(2018, 6, 6);
    expect(j17.addYear()).toEqual(j18);
  });

  it(`should add a single year accounting for the leap year`, () => {
    const feb29_16: Date = new Date(2016, 1, 29);
    const feb28_17: Date = new Date(2017, 1, 28);
    expect(feb29_16.addYear()).toEqual(feb28_17);
  });
});

describe('addYears() - Date.prototype', () => {
  it(`should add a single year if an argument is not passed`, () => {
    const j17: Date = new Date(2017, 6, 6);
    const j18: Date = new Date(2018, 6, 6);
    expect(j17.addYears()).toEqual(j18);
  });

  it(`should add multiple years if an argument is passed`, () => {
    const j17: Date = new Date(2017, 6, 6);

    const j19: Date = new Date(2019, 6, 6);
    expect(j17.addYears(2)).toEqual(j19);

    const j29: Date = new Date(2029, 6, 6);
    expect(j17.addYears(12)).toEqual(j29);
  });

  it(`should subtract years if a negative argument is passed`, () => {
    const j17: Date = new Date(2017, 6, 6);

    const j16: Date = new Date(2016, 6, 6);
    expect(j17.addYears(-1)).toEqual(j16);

    const j10: Date = new Date(2007, 6, 6);
    expect(j17.addYears(-10)).toEqual(j10);
  });

  it(`should go from leap year to leap year`, () => {
    const j16: Date = new Date(2016, 1, 29);

    const j20: Date = new Date(2020, 1, 29);
    expect(j16.addYears(4)).toEqual(j20);
  });
});

it(`age() - Date.prototype - returns the age from the subject date`, () => {
  const n8: Date = new Date(1986, 7, 9);
  const asOf1: Date = new Date(2019, 1, 9);
  expect(n8.age(asOf1)).toBe(32);

  const asOf2: Date = new Date(2019, 9, 9);
  expect(n8.age(asOf2)).toBe(33);

  const asOf3: Date = new Date(1989, 7, 9);
  expect(n8.age(asOf3)).toBe(3);
});

it(`assignTime() - Date.prototype - shoud assign the argument time to the subject datetime`, () => {
  expect(
    new Date(2000, 1, 1, 0, 0, 0).assignTime(new Date(2018, 3, 3, 11, 22, 33))
  ).toEqual(new Date(2000, 1, 1, 11, 22, 33));
});

describe('daysBetween() - Date.prototype', () => {
  it(`should return the absolute, integer number of days between 2 dates`, () => {
    const mar1: Date = new Date(2017, 2, 1);
    const mar17: Date = new Date(2017, 2, 17);

    expect(mar17.daysBetween(mar1)).toBe(16);
    expect(mar1.daysBetween(mar1)).toBe(0);

    const feb29: Date = new Date(2016, 1, 29);
    const feb1: Date = new Date(2016, 1, 1);
    expect(feb1.daysBetween(feb29)).toBe(28);
  });

  it(`should round up if a half day remainder and down otherwise`, () => {
    const momentBefore: Date = new Date(2016, 1, 29, 9, 0, 0, 0);
    const momentAfter: Date = new Date(2016, 1, 29, 9, 0, 0, 1);
    expect(momentBefore.daysBetween(momentAfter)).toBe(0);
    expect(momentAfter.daysBetween(momentBefore)).toBe(0);

    const date1 = new Date(2016, 0, 1, 0, 0, 0);
    const _1159 = new Date(2016, 0, 1, 11, 59, 59, 999);
    expect(date1.daysBetween(_1159)).toBe(0);

    const _1200 = new Date(2016, 0, 1, 12, 0, 0, 0);
    expect(date1.daysBetween(_1200)).toBe(1);
  });
});

it(`endOfDay() - String.prototype - strips the time component of a date`, () => {
  expect(new Date(2018, 4, 5, 3, 4, 5, 23).endOfDay()).toEqual(
    new Date(2018, 4, 5, 23, 59, 59, 999)
  );
});

it(`getFileExtension() - shared/functions - should get the extention string from a file path`, () => {
  expect('asdugdahj/asd/asd/ads/s.fvg'.extension()).toBe('fvg');

  expect('this/is/the/path.ext'.extension()).toBe('ext');
});

it(`firstDayOfMonth() - Date.prototype - should calculate the first day of the subject date's month`, () => {
  const mar1: Date = new Date(2017, 2, 1);
  const mar17: Date = new Date(2017, 2, 17);

  expect(mar17.firstDayOfMonth()).toEqual(mar1);
  expect(mar1.firstDayOfMonth()).toEqual(mar1);

  const feb29: Date = new Date(2016, 1, 29);
  const feb1: Date = new Date(2016, 1, 1);
  expect(feb29.firstDayOfMonth()).toEqual(feb1);
});

describe('firstDayOfWeek() - Date.prototype', () => {
  it(`should calculate the first day of the subject dates's week`, () => {
    const mar17: Date = new Date(2017, 2, 17);
    const mar12: Date = new Date(2017, 2, 12);

    expect(mar17.firstDayOfWeek()).toEqual(mar12);
    expect(mar12.firstDayOfWeek()).toEqual(mar12);
  });
});

describe('getDaysInMonth() - Date.prototype', () => {
  it(`should get the number of days in the subject date's month`, () => {
    const mar: Date = new Date(2017, 2, 17);
    expect(mar.getDaysInMonth()).toBe(31);

    const dec: Date = new Date(2017, 11, 1);
    expect(dec.getDaysInMonth()).toBe(31);

    const nov: Date = new Date(2017, 10, 17);
    expect(nov.getDaysInMonth()).toBe(30);
  });

  it(`should get the number of days accounting for leap years`, () => {
    const feb16: Date = new Date(2016, 1, 1);
    expect(feb16.getDaysInMonth()).toBe(29);

    const feb17: Date = new Date(2017, 1, 1);
    expect(feb17.getDaysInMonth()).toBe(28);
  });
});

it(`insertText() - String.prototype`, () => {
  expect('Helorld'.insertText('lo W', 'before', 'orl')).toBe('Hello World');

  expect('Helld'.insertText('o Worl', 'after', 'ell')).toBe('Hello World');
});

describe('isBefore() - Date.prototype', () => {
  it(`should determine if the subject date is before the argument date`, () => {
    const mar: Date = new Date(2017, 2, 17);
    const apr: Date = new Date(2017, 3, 17);
    expect(mar.isBefore(apr)).toBe(true);
    expect(apr.isBefore(mar)).toBe(false);
  });

  it(`should resolve false if the dates are the same`, () => {
    const date1: Date = new Date(2017, 2, 17);
    const date2: Date = new Date(date1);
    expect(date1.isBefore(date2)).toBe(false);
  });
});

describe('isBetween() - Date.prototype', () => {
  const mar: Date = new Date(2017, 2, 17);
  const apr: Date = new Date(2017, 3, 17);
  const may: Date = new Date(2017, 4, 17);

  it(`should be true if the subject date is between the argument dates`, () => {
    expect(apr.isBetween(mar, may)).toBe(true);
  });

  it(`should be false if the subject date is below the min date`, () => {
    expect(mar.isBetween(apr, may)).toBe(false);
  });

  it(`should be false if the subject date is above the max date`, () => {
    expect(may.isBetween(mar, apr)).toBe(false);
  });
});

it(`isLeapYear() - Date.prototype - returns true is the subject date is in a leap year`, () => {
  const j16: Date = new Date(2016, 1, 29);
  expect(j16.isLeapYear()).toBe(true);

  const j17: Date = new Date(2017, 1, 29);
  expect(j17.isLeapYear()).toBe(false);

  const j20: Date = new Date(2020, 1, 29);
  expect(j20.isLeapYear()).toBe(true);
});

describe('isSameDay() - Date.prototype', () => {
  const today_9am: Date = new Date(2017, 4, 17, 9, 0, 0);
  const today_11pm: Date = new Date(2017, 4, 17, 23, 0, 0);
  const tomorrow: Date = new Date(2017, 4, 18);

  it(`should return true if the date is the same day is the argument date`, () => {
    expect(today_9am.isSameDay(today_11pm)).toBe(true);
  });

  it(`should returnu false if the date is not the same day is the argument date`, () => {
    expect(tomorrow.isSameDay(today_9am)).toBe(false);
    expect(tomorrow.isSameDay(today_11pm)).toBe(false);
  });
});

describe('isSameMonth() - Date.prototype', () => {
  const mar1: Date = new Date(2017, 2, 1);
  const mar17: Date = new Date(2017, 2, 17);
  const apr1: Date = new Date(2017, 3, 1);

  it(`should return true if the date is the same month is the argument date`, () => {
    expect(mar1.isSameMonth(mar17)).toBe(true);
  });

  it(`should returnu false if the date is not the same month is the argument date`, () => {
    expect(apr1.isSameMonth(mar1)).toBe(false);
    expect(apr1.isSameMonth(mar17)).toBe(false);
  });
});

describe('isToday() - Date.prototype', () => {
  it(`should be true if the argument date is the same day as the subject date`, () => {
    const today = new Date();
    today.setHours(6, 6, 6);
    expect(today.isToday()).toBe(true);
  });

  it(`should be false if the argument date is not the same day as the subject date`, () => {
    const nottoday = new Date(2016, 4, 4);
    expect(nottoday.isToday()).toBe(false);
  });
});

it(`lastDayOfMonth() - Date.prototype - returns the last day of the subject date's month`, () => {
  const date = new Date(2018, 2, 4);
  const lastDay = new Date(2018, 2, 31);
  expect(date.lastDayOfMonth()).toEqual(lastDay);

  const feb16 = new Date(2016, 1, 16);
  const feb29 = new Date(2016, 1, 29);
  expect(feb16.lastDayOfMonth()).toEqual(feb29);
});

it(`stripTime() - String.prototype - strips the time component of a date`, () => {
  expect(new Date(2018, 4, 5, 3, 4, 5).stripTime()).toEqual(
    new Date(2018, 4, 5, 0, 0, 0)
  );
});

it(`toUrlString() - String.prototype - converts a date to a url string "X(X)-X(X)-XXXX"`, () => {
  expect(/^\d{1,2}-\d{1,2}-\d{4}/.test(new Date().toUrlString())).toBe(true);
});

it(`urlToDate() - String.prototype - converts a url string into a date`, () => {
  expect('2-4-2018'.urlToDate()).toEqual(new Date(2018, 3, 2));
  expect('02-04-2018'.urlToDate()).toEqual(new Date(2018, 3, 2));
  expect('2-12-2018'.urlToDate()).toEqual(new Date(2018, 11, 2));
});
