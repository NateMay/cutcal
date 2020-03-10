import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WikipediaService } from './wikipedia.service';


describe('NextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const mockHttp = <HttpClient>{};
    const service: WikipediaService = new WikipediaService(mockHttp);
    expect(service).toBeTruthy();
  });
});
