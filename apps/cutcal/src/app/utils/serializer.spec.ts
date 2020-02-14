import { RouterStateSnapshot } from '@angular/router';
import { CustomSerializer } from './serializer';

it('Serializer functions', () => {
  const serializer = new CustomSerializer();

  const result = serializer.serialize(<RouterStateSnapshot>{
    url: 'a/url',
    root: {
      queryParams: <any>{ params: 'a query param' },
      firstChild: {
        firstChild: {
          queryParams: <any>{ params: 'a query param' },
          params: <any>{ params: 'a param' },
        },
      },
    },
  });

  expect(result).toEqual({
    url: 'a/url',
    params: { params: 'a param' },
    queryParams: { params: 'a query param' },
  });
});
