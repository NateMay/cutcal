import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DailyValueSvc,
  PluralPipeModule,
  UnitPipeModule
} from '@cutcal/common-ui';
import { createPortion } from '@cutcal/core';
import { MOCK_NUTRITION, getEl } from '@cutcal/ng-testing';
import { DEAFULT_DAILY_VALUE } from '@cutcal/nutrition';
import { NutrLabelComponent } from './nutr-label.component';

@Component({
  template: `
    <ds-nutrition-label
      [nutrition]="nutrition"
      [portion]="portion"
    ></ds-nutrition-label>
  `
})
class TestNutrLabelComponent {
  nutrition = MOCK_NUTRITION;
  portion = createPortion('g', 42);
}

describe('Nutrition Label Component', () => {
  let fixture: ComponentFixture<TestNutrLabelComponent>;
  // let parent: TestNutrLabelComponent;
  let component: NutrLabelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TestNutrLabelComponent, NutrLabelComponent],
      imports: [PluralPipeModule, UnitPipeModule],
      providers: [
        { provide: DailyValueSvc, useValue: { snapshot: DEAFULT_DAILY_VALUE } }
      ]
    });

    fixture = TestBed.createComponent(TestNutrLabelComponent);
    // parent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(NutrLabelComponent))
      .componentInstance as NutrLabelComponent;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('Serving Size label is present', () => {
    expect(getEl(fixture, '.serving-size').textContent).toContain(
      'Serving Size 42 g'
    );
  });

  it('Total Calories label is present', () => {
    expect(getEl(fixture, '.label.calories').textContent).toContain(
      'Calories 300'
    );
  });

  it('Calories From Fat label is present', () => {
    expect(getEl(fixture, '.label.cal_from_fat').textContent).toContain(
      'From Fat 165'
    );
  });

  it('Total Fat label is present', () => {
    const fat = getEl(fixture, '.label.total_fat').textContent;
    expect(fat).toContain('Total Fat');
    expect(fat).toContain('20g');
  });

  it('Saturated Fat label is present', () => {
    const sat = getEl(fixture, '.label.sat_fat').textContent;
    expect(sat).toContain('Saturated Fat');
    expect(sat).toContain('5g');
  });

  it('Trans Fat label is present', () => {
    const trans = getEl(fixture, '.label.trans_fat').textContent;
    expect(trans).toContain('Trans Fat');
    expect(trans).toContain('6g');
  });

  it('Cholesterol label is present', () => {
    const chol = getEl(fixture, '.label.cholesterol').textContent;
    expect(chol).toContain('Cholesterol');
    expect(chol).toContain('10mg');
  });

  it('Sodium label is present', () => {
    const sodium = getEl(fixture, '.label.sodium').textContent;
    expect(sodium).toContain('Sodium');
    expect(sodium).toContain('90mg');
  });

  it('Carbs label is present', () => {
    const carbs = getEl(fixture, '.label.carbs').textContent;
    expect(carbs).toContain('Total Carbohydrates');
    expect(carbs).toContain('23g');
  });

  it('Fiber label is present', () => {
    const fiber = getEl(fixture, '.label.fiber').textContent;
    expect(fiber).toContain('Dietary Fiber');
    expect(fiber).toContain('10g');
  });

  it('Sugar label is present', () => {
    const sugar = getEl(fixture, '.label.sugar').textContent;
    expect(sugar).toContain('Sugars');
    expect(sugar).toContain('13g');
  });

  it('Protein label is present', () => {
    const protein = getEl(fixture, '.label.protein').textContent;
    expect(protein).toContain('Protein');
    expect(protein).toContain('14g');
  });

  it('Vitamin A label is present', () => {
    const vitA = getEl(fixture, '.vit_a .label').textContent;
    expect(vitA).toContain('Vitamin A');

    const vitAValue = getEl(fixture, '.vit_a').textContent;
    expect(vitAValue).toContain('9%');
  });

  it('Vitamin C label is present', () => {
    const vitC = getEl(fixture, '.vit_c').textContent;
    expect(vitC).toContain('Vitamin C');
    expect(vitC).toContain('62%');
  });

  it('Calcium label is present', () => {
    const calcium = getEl(fixture, '.calcium .label').textContent;
    expect(calcium).toContain('Calcium');

    const calciumValue = getEl(fixture, '.calcium').textContent;
    expect(calciumValue).toContain('6%');
  });

  it('Iron label is present', () => {
    const iron = getEl(fixture, '.iron').textContent;
    expect(iron).toContain('Iron');
    expect(iron).toContain('31%');
  });
});
