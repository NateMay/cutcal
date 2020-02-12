import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { password, PasswordValidatorDir as PasswordValidator } from './password';


@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="password" name="password" password>
    </form>
  `
})
class TestPasswordValidatorComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ password: null });
  }
}


describe('password validator', () => {



  it('passwordVal fucntion - valid', () => {
    expect(password(<AbstractControl>{ value: '123456ABC' })).toBeNull()
  });



  it('passwordVal fucntion - No Capital', () => {
    expect(password(<AbstractControl>{ value: '123456' }))
      .toEqual({
        noCap: true,
        noNum: false,
        lessthan6: false,
        moreThan20: false
      });
  });



  it('passwordVal fucntion - No Number', () => {
    expect(password(<AbstractControl>{ value: 'ABCDEF' }))
      .toEqual({
        noCap: false,
        noNum: true,
        lessthan6: false,
        moreThan20: false
      });
  });



  it('passwordVal fucntion - More than 20', () => {
    expect(password(<AbstractControl>{ value: 'ABCDEF' }))
      .toEqual({
        noCap: false,
        noNum: true,
        lessthan6: false,
        moreThan20: false
      });
  });



  it('passwordVal fucntion - Less Than 6', () => {
    expect(password(<AbstractControl>{ value: '123456ABCjjhgdciuvadcivsdiuwe2r2rq4' }))
      .toEqual({
        noCap: false,
        noNum: false,
        lessthan6: false,
        moreThan20: true
      });
  });


  describe('password validator directive', () => {

    let component: TestPasswordValidatorComponent;
    let fixture: ComponentFixture<TestPasswordValidatorComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          TestPasswordValidatorComponent,
          PasswordValidator
        ],
        imports: [
          ReactiveFormsModule,
          FormsModule
        ]
      });
      fixture = TestBed.createComponent(TestPasswordValidatorComponent);
      component = fixture.componentInstance;
    });


    it('test component created', () => {
      expect(component).toBeTruthy();
    });



    it('should require capitals letters', () => {
      component.form.patchValue({ password: 'asdhg234234' })
      fixture.detectChanges();
      expect(component.form.controls['password'].hasError('noCap')).toBe(true);
    });



    it('should require a number', () => {
      component.form.patchValue({ password: 'CutCal' })
      fixture.detectChanges();
      expect(component.form.controls['password'].hasError('noNum')).toBe(true);
    });



    it('should require 6 characters', () => {
      component.form.patchValue({ password: 'ABC12' })
      fixture.detectChanges();
      expect(component.form.controls['password'].hasError('lessthan6')).toBe(true);
    });


    it('should be a valid control when the password meets the requirements', () => {
      component.form.patchValue({ password: 'CutCal1' })
      fixture.detectChanges();
      expect(component.form.controls['password'].valid).toBe(true);
    });



  });

});

