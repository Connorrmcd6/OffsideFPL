import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{

  constructor (
    public authService: AuthService
  ){}

    showCard: boolean = false;

  showTeamIdCard() {
    this.showCard = true;
  }
  hideTeamIdCard() {
    this.showCard = false; // Set the variable to false or perform any necessary logic
  }
  ngOnInit() { }
}
