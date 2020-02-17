import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PluralPipeModule, UnitPipeModule } from '@cutcal/common';
import { createPortion } from '@cutcal/diet';
import { getDe } from '@cutcal/ng-testing';
import { DailyValueSvc, DEAFULT_DAILY_VALUE } from '@cutcal/nutrition';
import { MOCK_NUTRITION } from '../../../../../data/nutrition1.mock';
import { NutrLabelComponent } from './nutr-label.component';

@Component({
  template: `
    <cc-nutrition-label
      [nutrition]="nutrition"
      [portion]="portion"
    ></cc-nutrition-label>
  `,
})
class TestNutrLabelComponent {
  nutrition = MOCK_NUTRITION;
  portion = createPortion('tons', 42);
}

describe('Nutrition Label Component', () => {
  let fixture: ComponentFixture<TestNutrLabelComponent>;
  let parent: TestNutrLabelComponent;
  let component: NutrLabelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TestNutrLabelComponent, NutrLabelComponent],
      imports: [PluralPipeModule, UnitPipeModule],
      providers: [
        { provide: DailyValueSvc, useValue: { snapshot: DEAFULT_DAILY_VALUE } },
      ],
    });

    fixture = TestBed.createComponent(TestNutrLabelComponent);
    parent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(NutrLabelComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('Serving Size label is present', () => {
    expect(getDe(fixture, '.serving-size').nativeElement.textContent).toContain(
      'Serving Size 42 tons'
    );
  });

  it('Total Calories label is present', () => {
    expect(
      getDe(fixture, '.label.calories').nativeElement.textContent
    ).toContain('Calories 300');
  });

  it('Calories From Fat label is present', () => {
    expect(
      getDe(fixture, '.label.cal_from_fat').nativeElement.textContent
    ).toContain('From Fat 165');
  });

  it('Total Fat label is present', () => {
    const fat = getDe(fixture, '.label.total_fat').nativeElement.textContent;
    expect(fat).toContain('Total Fat');
    expect(fat).toContain('20g');
  });

  it('Saturated Fat label is present', () => {
    const sat = getDe(fixture, '.label.sat_fat').nativeElement.textContent;
    expect(sat).toContain('Saturated Fat');
    expect(sat).toContain('5g');
  });

  it('Trans Fat label is present', () => {
    const trans = getDe(fixture, '.label.trans_fat').nativeElement.textContent;
    expect(trans).toContain('Trans Fat');
    expect(trans).toContain('6g');
  });

  it('Cholesterol label is present', () => {
    const chol = getDe(fixture, '.label.cholesterol').nativeElement.textContent;
    expect(chol).toContain('Cholesterol');
    expect(chol).toContain('10mg');
  });

  it('Sodium label is present', () => {
    const sodium = getDe(fixture, '.label.sodium').nativeElement.textContent;
    expect(sodium).toContain('Sodium');
    expect(sodium).toContain('90mg');
  });

  it('Carbs label is present', () => {
    const carbs = getDe(fixture, '.label.carbs').nativeElement.textContent;
    expect(carbs).toContain('Total Carbohydrates');
    expect(carbs).toContain('23g');
  });

  it('Fiber label is present', () => {
    const fiber = getDe(fixture, '.label.fiber').nativeElement.textContent;
    expect(fiber).toContain('Dietary Fiber');
    expect(fiber).toContain('10g');
  });

  it('Sugar label is present', () => {
    const sugar = getDe(fixture, '.label.sugar').nativeElement.textContent;
    expect(sugar).toContain('Sugars');
    expect(sugar).toContain('13g');
  });

  it('Protein label is present', () => {
    const protein = getDe(fixture, '.label.protein').nativeElement.textContent;
    expect(protein).toContain('Protein');
    expect(protein).toContain('14g');
  });

  it('Vitamin A label is present', () => {
    const vit_a = getDe(fixture, '.vit_a .label').nativeElement.textContent;
    expect(vit_a).toContain('Vitamin A');

    const vit_a_value = getDe(fixture, '.vit_a').nativeElement.textContent;
    expect(vit_a_value).toContain('9%');
  });

  it('Vitamin C label is present', () => {
    const vit_c = getDe(fixture, '.vit_c').nativeElement.textContent;
    expect(vit_c).toContain('Vitamin C');
    expect(vit_c).toContain('62%');
  });

  it('Calcium label is present', () => {
    const calcium = getDe(fixture, '.calcium .label').nativeElement.textContent;
    expect(calcium).toContain('Calcium');

    const calcium_value = getDe(fixture, '.calcium').nativeElement.textContent;
    expect(calcium_value).toContain('6%');
  });

  it('Iron label is present', () => {
    const iron = getDe(fixture, '.iron').nativeElement.textContent;
    expect(iron).toContain('Iron');
    expect(iron).toContain('31%');
  });
});
