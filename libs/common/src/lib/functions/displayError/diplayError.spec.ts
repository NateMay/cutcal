import { FormControl, FormGroup, Validators } from '@angular/forms';
import { displayError } from './displayError';

describe('displayError() - shared/functions', () => {
  let formGroup;

  let control;

  beforeEach(() => {
    control = new FormControl('', [Validators.required]);
    formGroup = new FormGroup({ fieldName: control });
  });

  it('passwordVal function - return true when touched and error is present', () => {
    control.touched = true;
    control.errors['required'] = true;
    expect(displayError(formGroup, 'fieldName', 'required')).toBeTruthy();
  });

  it('passwordVal function - return false when untouched', () => {
    control.touched = false;
    control.errors['required'] = true;
    expect(displayError(formGroup, 'fieldName', 'required')).toBeFalsy();
  });

  it('passwordVal function - return false when no error', () => {
    control.touched = true;
    control.errors['required'] = false;
    expect(displayError(formGroup, 'fieldName', 'required')).toBeFalsy();
  });
});
