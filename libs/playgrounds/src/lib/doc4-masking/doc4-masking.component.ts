import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  template: `
    <h2>Masking</h2>
    <hr />

    <ds-fixed-mask mask="(999) 999-9999" [(value)]="value1">
      <input ccMaskedInput type="search" />
    </ds-fixed-mask>
    {{ value1 }}'
    <hr />

    <form [formGroup]="formGroup">
      <ds-fixed-mask mask="9999 9999 9999 9999" formControlName="card">
        <input ccMaskedInput />
      </ds-fixed-mask>

      <mat-form-field>
        <mat-label>Social Security Number</mat-label>
        <ds-fixed-mask mask="999-999-9999" formControlName="ssn">
          <input matInput ccMaskedInput type="tel" />
        </ds-fixed-mask>
        <mat-error>SSN is Required</mat-error>
      </mat-form-field>

      <hr />

      <ds-currency-mask>
        <input ccMaskedInput />
      </ds-currency-mask>

      <mat-form-field>
        <mat-label>Salary</mat-label>

        <ds-currency-mask>
          <input matInput ccMaskedInput type="number" />
        </ds-currency-mask>

        <mat-error>SSN is Required</mat-error>
      </mat-form-field>
    </form>
    <hr />
    <button mat-button (click)="reset()">Reset</button>
    {{ formGroup.value | json }}
  `,
  styleUrls: ['./doc4-masking.component.scss']
})
export class Doc4MaskingComponent {
  value1: number | string = '2342342'
  value2 = 1873642364827346
  formGroup: FormGroup

  defaultFormValues: {
    [key: string]: any;
} = {
    card: [null],
    ssn: [333, Validators.required]
  }
  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group(this.defaultFormValues)
  }

  reset(): void {
    this.value1 = '2342342'
    this.value2 = 1873642364827346
    this.formGroup.patchValue(this.defaultFormValues)
  }
}
