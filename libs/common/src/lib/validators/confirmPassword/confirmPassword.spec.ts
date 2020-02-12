import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidatorDir as PasswordValidator } from '../password/password';
import { ConfrmPasswordDir } from './confirmPassword';


@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="password" name="password" password>
      <input formControlName="confirm" name="confirm" confirmPassword="password">
    </form>`
})
class TestConfirmValidatorComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: 'CutCal!$123',
      confirm: undefined
    });
  }
}

describe('confirmPassword Validator', () => {

  let component: TestConfirmValidatorComponent;
  let fixture: ComponentFixture<TestConfirmValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfrmPasswordDir,
        TestConfirmValidatorComponent,
        PasswordValidator
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TestConfirmValidatorComponent);
    component = fixture.componentInstance;
  });




  it('test component created', () => {
    expect(component).toBeTruthy();
  });




  it('should add the "noMatch" error for the confirm field', () => {
    component.form.patchValue({ confirm: 'not a match' })
    fixture.detectChanges();
    expect(component.form.controls['confirm'].hasError('noMatch')).toBeTruthy();
  });



  it('should not have an error is the password matches', () => {
    component.form.patchValue({ confirm: 'CutCal!$123' })
    fixture.detectChanges();
    expect(component.form.controls['confirm'].hasError('noMatch')).toBeFalsy();
  });



});


