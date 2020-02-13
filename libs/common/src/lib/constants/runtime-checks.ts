import { RuntimeChecks } from '@ngrx/store';

export const RUNTIME_CHECKS: RuntimeChecks = {
    strictActionSerializability: true,
    strictStateSerializability: true,
    strictStateImmutability: true,
    strictActionImmutability: true,
}
