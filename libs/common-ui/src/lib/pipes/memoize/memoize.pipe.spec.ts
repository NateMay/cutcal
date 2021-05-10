import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizePipe } from './memoize.pipe';

@Component({
  template: ` <div [innerHTML]="contextobj | memoize: method"></div> `
})
class TestMemoizeComp {
  contextobj = { value: 'hi 1' };

  method(obj: any): any {
    return obj.value;
  }

  renewContext(): void {
    this.contextobj = { value: 'hi 2' };
  }
}

describe('Memoize Pipe', () => {
  let component: TestMemoizeComp;
  let fixture: ComponentFixture<TestMemoizeComp>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemoizePipe, TestMemoizeComp]
    });
    fixture = TestBed.createComponent(TestMemoizeComp);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should only call the handler if a new object is received', () => {
    const spy1 = jest.spyOn(component, 'method');
    fixture.detectChanges();
    expect(spy1).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    expect(spy1).toHaveBeenCalledTimes(1);

    component.renewContext();
    fixture.detectChanges();
    expect(spy1).toHaveBeenCalledTimes(2);
  });
});
