import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './views/create-game/create-game.component';
import { TableComponent } from './views/table/table.component';

const routes: Routes = [
  { path: '', component: CreateGameComponent },
  { path: 'yusuf', component: TableComponent }
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
