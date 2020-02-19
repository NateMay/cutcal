import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  createFood,
  createMeal,
  createUsage,
  MealService,
  MealsTripple,
} from '@cutcal/diet';
import { timestamp } from '@cutcal/fire';
import { MockHighChartsModule } from '@cutcal/ng-testing';
import { of } from 'rxjs';
import { createPortion } from '../../../../diet/src/lib/portion';
import { InspectNutrientDialogComponent } from './inspect-nutrient-dialog.component';
import { INSPECTION_DATA } from './inspection-data';

// TEST (analyze)

describe('Inspect Nutrient Dialog Component', () => {
  let component: InspectNutrientDialogComponent;
  let fixture: ComponentFixture<InspectNutrientDialogComponent>;

  const tripple: MealsTripple = [
    {
      meal1: createMeal('Breakfast', timestamp(), { fat: 2 }),
      meal2: createMeal('Lunch', timestamp(), { fat: 5 }),
    },
    {
      usage1: createUsage('apple', 1, 'food1', 'meal1', 'meal1'),
      usage2: createUsage('egg', 3, 'food2', 'meal1', 'meal1'),
      usage3: createUsage('strips', 3, 'food3', 'meal1', 'meal1'),
      usage4: createUsage('happy meal', 1, 'food4', 'meal1', 'meal2'),
      usage5: createUsage('oz', 12, 'food5', 'usage4', 'meal2'),
      usage6: createUsage('burger', 1, 'food6', 'usage4', 'meal2'),
      usage7: createUsage('g', 250, 'food7', 'usage4', 'meal2'),
    },
    {
      food1: createFood('Apple', { fat: 33 }, {}, createPortion('g', 0)),
      food2: createFood('Eggs', { fat: 72 }, {}, createPortion('g', 0)),
      food3: createFood('Bacon', { fat: 44 }, {}, createPortion('g', 0)),
      food4: createFood('Happy Meal', { fat: 310 }, {}, createPortion('g', 0)),
      food5: createFood('Soda', { fat: 10 }, {}, createPortion('g', 0)),
      food6: createFood('Burger', { fat: 200 }, {}, createPortion('g', 0)),
      food7: createFood('Fries', { fat: 100 }, {}, createPortion('g', 0)),
    },
  ];

  const mealSvc = {
    getMealRangeUsagesFoods: () => of(tripple),
  };

  const injectionData = {
    event: {
      point: {
        name: '',
        y: 0,
        series: {
          name: '2019, Aug 2',
          userOptions: {
            unit: 'g',
            nutrient: 'protein',
          },
        },
      },
    },
    day: <any>{ meals: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, NoopAnimationsModule, MockHighChartsModule],
      declarations: [InspectNutrientDialogComponent],
      providers: [
        { provide: MealService, useValue: mealSvc },
        { provide: INSPECTION_DATA, useValue: injectionData },
      ],
    });
    fixture = TestBed.createComponent(InspectNutrientDialogComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    jest.spyOn(component, 'date', 'get').mockReturnValue(new Date());
    jest.spyOn(component, 'dateString', 'get').mockReturnValue('2019-12-12');
    jest.spyOn(component, 'title', 'get').mockReturnValue('a title');
    jest.spyOn(component, 'nutrient', 'get').mockReturnValue('protein');
    jest.spyOn(component, 'unit', 'get').mockReturnValue('g');
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // it('sums the nutritions', () => {
  //   fixture.detectChanges();
  //   expect(component.nutrientTotal).toEqual({

  //   })
  // })
});
