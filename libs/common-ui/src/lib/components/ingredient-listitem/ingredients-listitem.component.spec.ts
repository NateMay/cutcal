import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DndModule, PipesModule } from '@cutcal/common-ui';
import { createImage } from '@cutcal/core';
import {
  createMealWithId,
  createUsage,
  Ingredient
} from '@cutcal/diet';
import { timestamp } from '@cutcal/fire';
import {
  bread,
  getAllDe,
  getByDir,
  getEl,
  MOCK_HAMMER_LOADER
} from '@cutcal/ng-testing';
import { IngredientsListitemComponent } from './ingredients-listitem.component';
describe('IngredientsListitemComponent', () => {
  let fixture: ComponentFixture<IngredientsListitemComponent>;
  let component: IngredientsListitemComponent;
  let goToButton: DebugElement;
  let goToButtonEl: HTMLButtonElement;
  let editButton: DebugElement;
  let editButtonEl: HTMLButtonElement;
  let quantityInput: () => HTMLInputElement;
  let unitInput: DebugElement;

  const ingredient: Ingredient = {
    food: bread,
    usage: createUsage('g', 10, bread._id, 'parentId', 'roodId', 'userId')
  };
  ingredient.usage._id = 'usageId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsListitemComponent],
      imports: [
        RouterTestingModule,
        MatSliderModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        DndModule,
        FormsModule,
        PipesModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [MOCK_HAMMER_LOADER]
    });
    fixture = TestBed.createComponent(IngredientsListitemComponent);
    component = fixture.componentInstance;
    component.ingredient = ingredient;
    component.root = createMealWithId(
      'roodId',
      'name',
      timestamp(),
      {},
      '',
      [],
      createImage(''),
      'userId'
    );

    [goToButton, editButton] = getAllDe(fixture, 'button');
    goToButtonEl = goToButton.nativeElement as HTMLButtonElement
    editButtonEl = editButton.nativeElement as HTMLButtonElement
    quantityInput = (): HTMLInputElement => getEl(fixture, 'input');
    unitInput = getByDir(fixture, MatSelect);
  });

  it('should load instance', () => {
    expect(component).toBeTruthy();
  });

  it('calculates properties', () => {
    fixture.detectChanges();

    expect(component.usage).toBe(ingredient.usage);
    expect(component.food).toBe(ingredient.food);
    expect(component.step).toBe(1);
    expect(component.min).toBe(0);
    expect(component.max).toBe(20);
    expect(component.quantity).toBe(10);
    expect(component.unit).toBe('g');
    expect(component.showing).toBe(false);
  });

  it('should disaplay the correct information', () => {
    fixture.detectChanges();
    expect(goToButtonEl.textContent).toContain(bread.name);
    expect(goToButtonEl.textContent).toContain(
      ingredient.usage.unit
    );
    expect(goToButtonEl.textContent).toContain(
      ingredient.usage.quantity.toString()
    );
  });

  it('should route away when clicked', () => {
    const spy = jest.spyOn(TestBed.inject(Router), 'navigate');
    fixture.detectChanges();
    goToButtonEl.click();
    expect(spy).toHaveBeenCalledWith([
      'meal',
      'roodId',
      'ingredient',
      'usageId'
    ]);
  });

  it('should reveal the portion inputs when edit is clicked', () => {
    fixture.detectChanges();
    expect(quantityInput()).toBeFalsy();
    expect(unitInput).toBeFalsy();

    editButtonEl.click();
    fixture.detectChanges();
    unitInput = getByDir(fixture, MatSelect);

    expect(quantityInput()).toBeTruthy();
    expect(unitInput).toBeTruthy();
  });

  it('should emit the details when save is clicked', () => {
    fixture.detectChanges();
    editButtonEl.click();
    fixture.detectChanges();
    const spy = jest.spyOn(component.portionChange, 'emit');
    const input = quantityInput();
    input.value = '25';
    input.dispatchEvent(new Event('input'));
    const matSelect = getByDir(fixture, MatSelect).componentInstance as MatSelect
    matSelect.valueChange.emit('a unit');

    getEl(fixture, '.save-button').click();

    expect(spy).toHaveBeenCalledWith({
      usage: ingredient.usage,
      food: bread,
      unit: 'a unit',
      quantity: 25
    });
  });
});
