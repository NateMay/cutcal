import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CheckableNutrientsModule } from '@cutcal/common-ui';
import { NutrientComponent } from './nutrient.component';

describe('NutrientComponent', () => {
  let component: NutrientComponent;
  let fixture: ComponentFixture<NutrientComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [NutrientComponent],
      imports: [CheckableNutrientsModule, NoopAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
