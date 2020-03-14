import {
  closeSearch,
  openSearch,
  searchReducer,
  SearchState,
} from './search.store';

describe('reducer', () => {
  let state: SearchState;

  beforeEach(() => {
    state = {
      isOpen: false,
    };
  });

  it('rootDate - GOT_TO_TODAY', () => {
    expect(searchReducer(state, closeSearch()).isOpen).toEqual(false);

    expect(searchReducer(state, openSearch()).isOpen).toEqual(true);
  });

  it('rootDate - default', () => {
    expect(searchReducer(state, { type: '[Test] Action' })).toBe(state);
  });
});
