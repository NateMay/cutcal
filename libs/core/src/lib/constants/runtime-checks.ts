export const STRICT_RUNTIME_CHECKS = {
  runtimeChecks: {
    strictActionSerializability: true,
    strictStateSerializability: true,
    strictStateImmutability: true,
    strictActionImmutability: true,
    strictActionWithinNgZone: true,
    strictActionTypeUniqueness: true
  }
}

export const WEAK_RUNTIME_CHECKS = {
  runtimeChecks: {
    strictActionSerializability: false,
    strictStateSerializability: false,
    strictStateImmutability: false,
    strictActionImmutability: false,
    strictActionWithinNgZone: false,
    strictActionTypeUniqueness: false
  }
}
