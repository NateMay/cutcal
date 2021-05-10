import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getEl } from '../../../../../ng-testing/src/lib/getEl';
import { UnitPipeModule } from './unit-pipe.module';

@Component({
  template: ` <div>{{ unit | unit }}</div> `
})
class TestUnitPipeComponent {
  unit = 'g';
}

describe('unit Pipe', () => {
  let parent: TestUnitPipeComponent;
  let fixture: ComponentFixture<TestUnitPipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestUnitPipeComponent],
      imports: [UnitPipeModule]
    });
    fixture = TestBed.createComponent(TestUnitPipeComponent);
    parent = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(parent).toBeTruthy();
  });

  it('should pluralize if the quanity is greater than 1', () => {
    parent.unit = 'g';
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('gram');
  });

  it('should pluralize if the quanity is less than than 1', () => {
    parent.unit = 'lb';
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('pound');
  });

  it('should pluralize if the quanity is not 1 (tsp)', () => {
    parent.unit = 'tsp';
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('teaspoons');
  });
  it('should pluralize if the quanity is not 1 (tbsp)', () => {
    parent.unit = 'tbsp';
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('tablespoons');
  });
});
