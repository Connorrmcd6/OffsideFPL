import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-league',
  templateUrl: './join-league.component.html',
  styleUrl: './join-league.component.scss'
})
export class JoinLeagueComponent {
  leagueForm = this.fb.group({
    leagueName: ['', Validators.required],
    gameMode: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
}
