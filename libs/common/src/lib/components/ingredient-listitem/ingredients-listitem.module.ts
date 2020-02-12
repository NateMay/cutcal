import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BasicsModule } from '../../basics.module';
import { DndModule } from '../../modules/dnd/dnd.module';
import { IngredientsListitemComponent } from './ingredients-listitem.component';

@NgModule({
  imports: [
    MatSliderModule,
    MatIconModule,
    BasicsModule,
    MatSelectModule,
    DndModule
  ],
  declarations: [IngredientsListitemComponent],
  exports: [IngredientsListitemComponent]
})
export class IngredientsListItemModule {}
