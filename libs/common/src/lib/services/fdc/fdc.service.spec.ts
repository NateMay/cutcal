import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { FdcService } from './fdc.service';

describe('FdcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const mockHttp = <HttpClient>{};
    const mockAuth = <AuthService>{};
    const service: FdcService = new FdcService(mockHttp, mockAuth);
    expect(service).toBeTruthy();
  });
});
