import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Doc4MaskingComponent } from './doc4-masking.component';

describe('Doc4MaskingComponent', () => {
  let component: Doc4MaskingComponent;
  let fixture: ComponentFixture<Doc4MaskingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Doc4MaskingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Doc4MaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
