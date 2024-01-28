import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class SharedModule { }
