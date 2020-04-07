import { NgModule } from '@angular/core';
import { WaitingRoomComponent } from './waiting-room.component';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    WaitingRoomComponent
  ],
  imports: [
    SharedModule
  ]
})
export class WaitingRoomModule { }
