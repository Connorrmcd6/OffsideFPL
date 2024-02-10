import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

/**
 * LoginComponent handles the login functionality.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthService
  ) {}

  /**
   * Navigates back to the previous page.
   */
  goBack(): void {
    this.location.back();
  }

  ngOnInit() { }
}