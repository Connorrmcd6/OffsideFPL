import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

// LoginComponent handles the login functionality.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthService
  ) {
    this.errorMessage = '';
  }

  signIn(email: string, password: string): void {
    this.authService.SignIn(email, password)
      .then(() => {
        // Handle successful sign in
      })
      .catch(errorMessage => {
        this.errorMessage = errorMessage;
      });
  }

  // Navigates back to the previous page.

  goBack(): void {
    this.location.back();
  }

  ngOnInit() { }
}