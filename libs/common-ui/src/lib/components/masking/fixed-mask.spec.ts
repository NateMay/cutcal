import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcMaskingModule } from './masking.module';

@Component({
  template: `
    <cc-fixed-mask [mask]="mask" [(value)]="value">
      <input ccMaskedInput [attr.type]="type" />
    </cc-fixed-mask>
  `
})
class TestMaskingComponent {
  type: string;

  value: string | number;

  mask: string = '(999) 999-9999';
}

describe('CcFixedMask', () => {
  let fixture: ComponentFixture<TestMaskingComponent>;
  let consumer: TestMaskingComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestMaskingComponent],
      imports: [CcMaskingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMaskingComponent);
    consumer = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(consumer).toBeTruthy();
  });
});
