export type KeysIn<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]
