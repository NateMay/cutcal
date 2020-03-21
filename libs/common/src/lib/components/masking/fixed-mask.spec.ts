import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcFixedMask } from './fixed-mask';

describe('CcFixedMask', () => {
  let component: CcFixedMask;
  let fixture: ComponentFixture<CcFixedMask>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcFixedMask],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcFixedMask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
