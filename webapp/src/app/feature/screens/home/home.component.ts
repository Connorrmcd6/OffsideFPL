import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthService,
  ) {}


  goBack(): void {
    this.location.back();
  }

  openDetailsDialog() {
    console.log("Button clicked!");
  }
}
