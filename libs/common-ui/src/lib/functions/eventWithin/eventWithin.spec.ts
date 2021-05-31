import { eventWithin } from './eventWithin';

it('eventWithin() - shared/functions', () => {
  const img = document.createElement('img');
  const input = document.createElement('input');
  const button = document.createElement('button');

  const mockEvent = { target: input } as unknown as Event

  expect(eventWithin(mockEvent, [img, button])).toBe(false);

  expect(eventWithin(mockEvent, [img, button, input])).toBe(true);
});
