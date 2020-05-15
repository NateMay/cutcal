import { allImagesFromPrimary } from './allImagesFromPrimary';

it('allImagesFromPrimary - shared/functions', () => {
  expect(allImagesFromPrimary('http://AAA-meals%2F-ZZZ')).toEqual([
    'http://AAA-meals%2F-ZZZ',
    'http://AAA-meals%2Fthumb_-ZZZ'
  ]);
});
