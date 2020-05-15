import { eventWithin } from './eventWithin';

it('eventWithin() - shared/functions', () => {
  const img = document.createElement('img');
  const input = document.createElement('input');
  const button = document.createElement('button');

  expect(eventWithin(<any>{ target: input }, [img, button])).toBe(false);

  expect(eventWithin(<any>{ target: input }, [img, button, input])).toBe(true);
});
