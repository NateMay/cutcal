import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FdcService } from './fdc.service';

describe('FdcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const mockHttp = <HttpClient>{};
    const service: FdcService = new FdcService(mockHttp);
    expect(service).toBeTruthy();
  });
});
