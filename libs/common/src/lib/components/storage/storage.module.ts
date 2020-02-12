import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { StorageComponent } from './storage.component'

@NgModule({
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  declarations: [StorageComponent],
  exports: [StorageComponent],
})
export class Storagemodule {}
