import { uniqueID } from './uniqueID';

it('uniqueID() - shared/functions creates an id of length 20', () => {
  expect(uniqueID()).toHaveLength(20);
});
