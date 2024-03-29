export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw Error(`Expected 'val' to be defined, but received ${val}`)
  }
}
