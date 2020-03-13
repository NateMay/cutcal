import { EventEmitter } from '@angular/core';
import { executeOnStable } from './executeOnStable';

class MockNgZone {
  onStable = new EventEmitter<any>();
  runOutsideAngular(func: () => any): void {
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
