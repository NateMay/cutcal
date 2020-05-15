import { FormControl, FormGroup } from '@angular/forms';
import { CCValidators } from '../ccValidators';

describe('DateRangePasswordDir', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup(
      {
        startDate: new FormControl(new Date(2019, 0, 1)),

        endDate: new FormControl(new Date(2019, 0, 2))
      },
      CCValidators.dateRange('startDate', 'endDate')
    );
  });

  it('test formGroup created', () => {
    expect(formGroup).toBeTruthy();
  });

  it('should have a valid state with a valid dateRange', () => {
    expect(formGroup.valid).toBe(true);
    expect(formGroup.errors).toBe(null);
  });

  it('should be invalid for inverted ranges', () => {
    formGroup.patchValue({ startDate: new Date(2019, 0, 3) });
    expect(formGroup.valid).toBe(false);
    expect(formGroup.errors).toEqual({ invalidRange: true });
  });

  it('should be invalid for equal dates', () => {
    formGroup.patchValue({ startDate: new Date(2019, 0, 2, 0, 0, 1) });
    expect(formGroup.valid).toBe(false);
    expect(formGroup.errors).toEqual({ invalidRange: true });
  });
});
