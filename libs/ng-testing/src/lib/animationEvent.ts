export function mockAnimationEvent(fromState: string, toState: string): any {
  return {
    preventDefault: () => {},
    fromState,
    toState,
  }
}
