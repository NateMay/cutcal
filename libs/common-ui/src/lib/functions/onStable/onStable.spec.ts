import { EventEmitter, NgZone } from '@angular/core';
import { onStable } from './onStable';

class MockNgZone {
  onStable = new EventEmitter<void>();
  runOutsideAngular(func: () => void): void {
    func();
    return;
  }
}

describe('onStable() - shared/functions', () => {
  it('should get the extention string from a file path', () => {
    const zone = new MockNgZone();
    let called = false;
    onStable(<NgZone>zone, () => (called = true));
    zone.onStable.emit();
    expect(called).toBe(true);
  });
});
