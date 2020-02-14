import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MOCK_HAMMER_LOADER } from '../../../testing/nodeModules/mockHammerProvider';
import { MockRouterSvc } from '../../../testing/nodeModules/router.mock';
import { AnalyzeRangePickerComponent } from './analyze-range-picker.component';

describe('AnalyzeRangePickerComponent', () => {
  let component: AnalyzeRangePickerComponent;
  let fixture: ComponentFixture<AnalyzeRangePickerComponent>;

  let router: MockRouterSvc;

  const URL_DATE_STR = '01-01-2019';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyzeRangePickerComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useClass: MockRouterSvc },
        MOCK_HAMMER_LOADER,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Router], (testRouter: MockRouterSvc) => {
    router = testRouter;
    router.triggerNavEvents(`calendar/day/(dmy:${URL_DATE_STR})`);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
