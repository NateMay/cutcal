import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import {
  RESULT_FOOD,
  RESULT_NUTRITION,
  RESULT_PORTIONS,
  USDA_FOOD,
  USDA_RESPONSE,
} from '../../../../testing/mocks/usda-reponse.mock';
import { KVP } from '../../models/key-value-pair';
import { USDANutrient } from '../../models/usda';
import { USDAService } from './usda.service';

xdescribe('USDA service', () => {
  let usdaSvc: USDAService;
  let httpStub: any;

  beforeEach(() => {
    httpStub = { get: (...args: any) => of(USDA_RESPONSE) };
    usdaSvc = new USDAService(httpStub);
  });

  it('getPortions() should extract the Portion properly', () => {
    expect(usdaSvc.getPortions(USDA_FOOD)).toEqual(RESULT_PORTIONS);
  });

  it('getUsdaFoodResponse', () => {
    const usdaFood$ = usdaSvc.getUsdaFoodResponse('00000');
    let result;
    usdaFood$
      .pipe(
        first(),
        tap(res => (result = res))
      )
      .subscribe();

    expect(result).toEqual(USDA_RESPONSE);
  });

  it('getNutrition() takes a USDA nutrient and returns a nutrion object', () => {
    expect(usdaSvc.getNutrition(USDA_FOOD)).toEqual(RESULT_NUTRITION);
  });

  it('convertUSDAFoodToCCFood() recieves a USDAResponse and returns and Observable of a CutCal Food', () => {
    let result;
    usdaSvc
      .convertUSDAFoodToCCFood('test endpoint')
      .pipe(first())
      .subscribe(food => (result = food));

    expect(result).toEqual(RESULT_FOOD);
  });

  it('getUsdaNutrition() recieves a USDAResponse and returns and Observable of a Nutrition Object', () => {
    let result;
    usdaSvc
      .getUsdaNutrition('test endpoint')
      .pipe(first())
      .subscribe(nutition => (result = nutition));

    expect(result).toEqual(RESULT_NUTRITION);
  });

  it('createNullNutrientForUnprovided() creates a zero value USDANutrient, if not provided by the USDA response', () => {
    const nutrients: KVP<USDANutrient> = {};

    expect(nutrients[208]).toBeUndefined();

    usdaSvc.createNullNutrientForUnprovided(nutrients, 'calories');

    expect(nutrients[208]).toBeDefined();
    expect(nutrients[208].value).toBe(0);
  });

  it('catchUnitMismatch() ', () => {
    const nutrients: KVP<USDANutrient> = {
      208: {
        nutrient_id: 208,
        name: 'calories',
        unit: 'pounds',
        value: 234,
        measures: [],
      },
    };
    expect(() => usdaSvc.catchUnitMismatch(nutrients, 'calories')).toThrowError(
      'Unit mismatch for Calories. Our unit: cal. Their unit pounds. Please inform N8.'
    );
  });
});
