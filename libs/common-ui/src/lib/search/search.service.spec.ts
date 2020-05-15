import { first } from 'rxjs/operators';
import { SearchService } from './search.service';

it('Search Service emits and can be subscribed to', () => {
  const service = new SearchService();
  let emitted = 0;
  service.listenFocusFirst.pipe(first()).subscribe(() => {
    emitted++;
  });
  service.focusFirst();
  expect(emitted).toBe(1);
});
