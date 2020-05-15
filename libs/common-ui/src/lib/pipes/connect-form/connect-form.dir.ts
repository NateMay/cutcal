import { Directive, Input, OnInit } from '@angular/core'
// import { FormGroupDirective } from '@angular/forms';
// import { Store } from '@ngrx/store';

/**
 * @description Replaces references with the docs for. Not currently used.
 * but might be an optimization to leverage
 *
 * @see {@link https://netbasal.com/connect-angular-forms-to-ngrx-store-c495d17e129 Natanel Basal}
 */

@Directive({
  selector: '[connectForm],[ccConnectForm]'
})
export class ConnectFormDirective implements OnInit {
  @Input('connectForm') path!: string

  // constructor(
  //   private formGroupDirective: FormGroupDirective,
  //   private store: Store<any>
  // ) { }

  ngOnInit(): void {
    // Update the form value based on the state
    // this.store.select(state => state.forms[this.path]).take(1).subscribe(formValue => {
    //   this.formGroupDirective.form.patchValue(formValue);
    // });
  }
}
