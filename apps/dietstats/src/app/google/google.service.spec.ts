import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GoogleService } from './google.service';

describe('GoogleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const mockHttp = <HttpClient>{};
    const service: GoogleService = new GoogleService(mockHttp);
    expect(service).toBeTruthy();
  });
});
