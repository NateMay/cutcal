import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesModule } from '@cutcal/common-ui';
import { MockHighChartsModule } from '@cutcal/ng-testing';
import { NutrientWindRoseComponent } from './nutrient-wind-rose.component';

describe('NutrientWindRoseComponent', () => {
  let component: NutrientWindRoseComponent;
  let fixture: ComponentFixture<NutrientWindRoseComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [NutrientWindRoseComponent],
      imports: [MockHighChartsModule, PipesModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientWindRoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
