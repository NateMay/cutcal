import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getEl } from '../../../../../ng-testing/src/lib/getEl';
import { PluralPipeModule } from './plural-pipe.module';

@Component({
  template: `
    <div>{{ unit | plural: quantity }}</div>
  `
})
class TestPluralPipeComponent {
  unit = 'gram';
  quantity: number;
}

describe('Plural Pipe', () => {
  let parent: TestPluralPipeComponent;
  let fixture: ComponentFixture<TestPluralPipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPluralPipeComponent],
      imports: [PluralPipeModule]
    });
    fixture = TestBed.createComponent(TestPluralPipeComponent);
    parent = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(parent).toBeTruthy();
  });

  it('should pluralize if the quanity is greater than 1', () => {
    parent.quantity = 3;
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('grams');
  });

  it('should pluralize if the quanity is less than than 1', () => {
    parent.quantity = 0.1;
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('grams');
  });

  it('should not pluralize if the quanity is 1', () => {
    parent.quantity = 1;
    fixture.detectChanges();
    const div = getEl(fixture, 'div');
    expect(div.textContent).toContain('gram');
  });
});
