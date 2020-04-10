import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { SharedModule } from 'app/shared/shared.module';
import { PlayerComponent } from './player/player.component';
import { DeckComponent } from './deck/deck.component';



@NgModule({
  declarations: [
    TableComponent,
    PlayerComponent,
    DeckComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TableModule { }
