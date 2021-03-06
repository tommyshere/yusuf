import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { SharedModule } from 'app/shared/shared.module';
import { PlayerComponent } from './player/player.component';
import { DeckComponent } from './deck/deck.component';
import { LoginComponent } from './login/login.component';
import { HandComponent } from './hand/hand.component';



@NgModule({
  declarations: [
    TableComponent,
    PlayerComponent,
    DeckComponent,
    LoginComponent,
    HandComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TableModule { }
