import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getAllDe } from '../../../../../ng-testing/src/lib/getAllDe';
import { CollectionPipe } from './collection.pipe';


@Component({
  template: `<div *ngFor="let prop of collection | coll">{{ prop }}</div>`
})
class TestColPipeComp {
  collection = { a: 1, b: 2, c: 3 }
}

describe('Collection Pipe', () => {
  let component: TestColPipeComp;
  let fixture: ComponentFixture<TestColPipeComp>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionPipe,
        TestColPipeComp
      ]
    });
    fixture = TestBed.createComponent(TestColPipeComp);
    component = fixture.componentInstance;
  });


  it('can load instance', () => {
    expect(component).toBeTruthy();
  });


  it('can load instance', () => {
    fixture.detectChanges();
    expect(getAllDe(fixture, 'div').length).toBe(3)
  });

})
