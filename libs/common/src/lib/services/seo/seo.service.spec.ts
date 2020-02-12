import { SeoService } from './seo.service';

it('SEO Service should updateTag()s X times when generateTags() is called', () => {
  const metaService: any = { updateTag: () => {} };
  const service = new SeoService(metaService);
  spyOn(service['meta'], 'updateTag');
  service.generateTags({});
  expect(service['meta'].updateTag).toHaveBeenCalledTimes(10);
});
