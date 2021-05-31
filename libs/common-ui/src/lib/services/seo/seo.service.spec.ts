import { SeoService } from './seo.service';
import { Meta } from '@angular/platform-browser';

it('SEO Service should updateTag()s X times when generateTags() is called', () => {
  const service = new SeoService({ updateTag: () => ({}) } as unknown as Meta);
  const spy = jest.spyOn(service['meta'], 'updateTag');
  service.generateTags({});
  expect(spy).toHaveBeenCalledTimes(10);
});
