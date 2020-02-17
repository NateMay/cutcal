import { EventEmitter } from '@angular/core';
import { createSpyObj } from '@cutcal/ng-testing';
import { executeOnStable } from './executeOnStable';

export const mockNgZone = createSpyObj('mockNgZone', [
  'run',
  'runOutsideAngular',
]);
export class MockNgZone {
  onStable = new EventEmitter<any>();
  runOutsideAngular(func) {
    func();
    return;
  }
}

describe('executeOnStable() - shared/functions', () => {
  it('should get the extention string from a file path', () => {
    const zone = new MockNgZone();
    let called = false;
    executeOnStable(<any>zone, () => (called = true));
    zone.onStable.emit();
    expect(called).toBe(true);
  });
});