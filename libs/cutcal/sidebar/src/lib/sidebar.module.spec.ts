import { async, TestBed } from '@angular/core/testing';
import { SidebarModule } from './sidebar.module';

describe('SidebarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SidebarModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SidebarModule).toBeDefined();
  });
});
