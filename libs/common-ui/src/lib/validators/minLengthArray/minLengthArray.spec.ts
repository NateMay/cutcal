import { FormArray, FormControl } from '@angular/forms';
import { CCValidators } from '../ccValidators';

describe('MinLengthArray Validator', () => {
  let formArray: FormArray;

  beforeEach(() => {
    formArray = new FormArray(
      [new FormControl(1), new FormControl(2)],
      CCValidators.minLengthArray(2)
    );
  });

  it('test FormArray created', () => {
    expect(formArray).toBeTruthy();
  });

  it('should have a valid state with a valid array', () => {
    expect(formArray.valid).toBe(true);
    expect(formArray.errors).toBe(null);
  });

  it('should be invalid below the minimum specified', () => {
    formArray.removeAt(1);
    expect(formArray.valid).toBe(false);
    expect(formArray.errors).toEqual({
      minLengthArray: { valid: false, required: 2, actual: 1 }
    });
  });
});
