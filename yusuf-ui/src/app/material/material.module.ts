import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
