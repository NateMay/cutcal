import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirestoreService } from '@cutcal/common-ui';
import { Observable, of } from 'rxjs';
import { DocPipe } from './doc.pipe';

@Component({
  template: `
    {{ (docRef | doc | async).prop }}
  `
})
class TestDocPipeComp {
  docRef = {};
}

describe('Doc (firebase) Pipe', () => {
  let component: TestDocPipeComp;
  let fixture: ComponentFixture<TestDocPipeComp>;

  beforeEach(() => {
    const dbStub = {
      doc$: (): Observable<any> => of({ prop: 'Hello World' })
    };
    TestBed.configureTestingModule({
      declarations: [DocPipe, TestDocPipeComp],
      providers: [{ provide: FirestoreService, useValue: dbStub }]
    });
    fixture = TestBed.createComponent(TestDocPipeComp);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('unwraps a document in the template', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'Hello World'
    );
  });
});
