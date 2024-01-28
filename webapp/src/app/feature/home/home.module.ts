import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    HomeDashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule
  ]
})
export class HomeModule { }
