import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockHighChartsModule } from '../../../testing/nodeModules/highcharts.mock.module';
import { AnalysisChartComponent } from './analysis-chart.component';

// TEST (analyze)

describe('Analysis Chart Component', () => {
  let component: AnalysisChartComponent;
  let fixture: ComponentFixture<AnalysisChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        MockHighChartsModule,
      ],
      declarations: [AnalysisChartComponent],
    });
    fixture = TestBed.createComponent(AnalysisChartComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
