import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './feature/screens/landing/landing.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { ForgotPasswordComponent } from './feature/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './feature/auth/verify-email/verify-email.component';
import { HomeComponent } from './feature/screens/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, data: { hideHeader: true } },
  { path: 'login', component: LoginComponent, data: { hideHeader: true } },
  { path: 'register', component: RegisterComponent, data: { hideHeader: true } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { hideHeader: true } },
  { path: 'verify-email', component: VerifyEmailComponent, data: { hideHeader: true } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
