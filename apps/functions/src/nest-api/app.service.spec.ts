import { HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { WikiService } from './wikipedia.service';

class Httpmock {}
describe('AppService', () => {
  let service: WikiService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        WikiService,
        {
          provide: HttpService,
          useClass: Httpmock
        }
      ]
    }).compile();

    service = app.get<WikiService>(WikiService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ data: 'Welcome to api!' });
    });
  });
});
