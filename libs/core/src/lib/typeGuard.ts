/**
 * @description protect against types in observables
 * @see {@link https://medium.com/angular-in-depth/rxjs-how-to-use-type-guards-with-observables-11cc4d4f380f Medium}
 * @example
 * const person = http.get(`/people/${id}`).map(guard(isPerson));
 */

export const guard = <T, R extends T>(
  r: (value: T) => value is R,
  message?: string
): ((value: T) => R) => (value) => {
  if (r(value)) {
    return value
  }
  throw new Error(message || 'Guard rejection.')
}
