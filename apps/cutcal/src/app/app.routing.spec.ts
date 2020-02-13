import { async, TestBed } from '@angular/core/testing';
import { RoutingModule } from './app.routing';

describe('RoutingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RoutingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RoutingModule).toBeDefined();
  });
});
