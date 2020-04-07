import { NgModule } from '@angular/core';
import { CreateGameComponent } from './create-game.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    CreateGameComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CreateGameModule { }
