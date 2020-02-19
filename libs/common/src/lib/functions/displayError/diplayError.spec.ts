import { FormControl, FormGroup, Validators } from '@angular/forms';
import { displayError } from './displayError';

describe('displayError() - shared/functions', () => {
  let formGroup: FormGroup;

  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('', [Validators.required]);
    formGroup = new FormGroup({ fieldName: control });
  });

  it('passwordVal function - return true when touched and error is present', () => {
    control.markAsTouched();
    control.setErrors({ required: true });
    expect(displayError(formGroup, 'fieldName', 'required')).toBeTruthy();
  });

  it('passwordVal function - return false when untouched', () => {
    control.markAsUntouched();
    control.setErrors({ required: true });
    expect(displayError(formGroup, 'fieldName', 'required')).toBeFalsy();
  });

  it('passwordVal function - return false when no error', () => {
    control.markAsTouched();
    control.setErrors({ required: false });
    expect(displayError(formGroup, 'fieldName', 'required')).toBeFalsy();
  });
});
