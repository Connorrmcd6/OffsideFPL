import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeDashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ]
})
export class HomeModule { }
