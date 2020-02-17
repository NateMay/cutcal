import { timestamp } from './timestamp';

// FIXME
xit('timestamp getter returns a timestamp - shared/functions', () => {
  const stamp = timestamp(new Date());
  expect(typeof stamp.nanoseconds).toBe('number');
  expect(typeof stamp.seconds).toBe('number');
});
