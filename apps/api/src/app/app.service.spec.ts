import { HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

class Httpmock {}
describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useClass: Httpmock,
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
