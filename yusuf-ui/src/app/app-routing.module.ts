import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './views/create-game/create-game.component';
import { WaitingRoomComponent } from './views/waiting-room/waiting-room.component';

const routes: Routes = [
  { path: '', component: CreateGameComponent },
  { path: 'waiting-room', component: WaitingRoomComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
