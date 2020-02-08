import { async, TestBed } from '@angular/core/testing';
import { NgTestingModule } from './ng-testing.module';

describe('NgTestingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgTestingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgTestingModule).toBeDefined();
  });
});
