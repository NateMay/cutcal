export const STRICT_RUNTIME_CHECKS = {
  runtimeChecks: {
    strictActionSerializability: true,
    strictStateSerializability: true,
    strictStateImmutability: true,
    strictActionImmutability: true,
  },
}

export const WEAK_RUNTIME_CHECKS = {
  runtimeChecks: {
    strictActionSerializability: false,
    strictStateSerializability: false,
    strictStateImmutability: false,
    strictActionImmutability: false,
  },
}
