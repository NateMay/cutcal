import { SeoService } from './seo.service';

it('SEO Service should updateTag()s X times when generateTags() is called', () => {
  const metaService: any = { updateTag: () => {} };
  const service = new SeoService(metaService);
  const spy = jest.spyOn(service['meta'], 'updateTag');
  service.generateTags({});
  expect(spy).toHaveBeenCalledTimes(10);
});
