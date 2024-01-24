import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './core/landing/landing.component'; 
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { ForgotPasswordComponent } from './feature/auth/forgot-password/forgot-password.component';
import { HomeDashboardComponent } from './feature/home/home-dashboard/home-dashboard.component';
import { ProfileComponent } from './feature/home/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeDashboardComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }