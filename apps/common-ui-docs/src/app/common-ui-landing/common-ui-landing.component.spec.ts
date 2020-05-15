import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonUiLandingComponent } from './common-ui-landing.component';

describe('CommonUiLandingComponent', () => {
  let component: CommonUiLandingComponent;
  let fixture: ComponentFixture<CommonUiLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommonUiLandingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonUiLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
