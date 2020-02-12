import { closeSearch, openSearch, searchReducer } from './search.store';

describe('reducer', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('rootDate - GOT_TO_TODAY', () => {
    expect(searchReducer(state, closeSearch()).isOpen).toEqual(false);

    expect(searchReducer(state, openSearch()).isOpen).toEqual(true);
  });

  it('rootDate - default', () => {
    expect(searchReducer(state, { type: '[Test] Action' })).toBe(state);
  });
});
