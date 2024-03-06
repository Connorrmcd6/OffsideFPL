import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LeagueService } from 'src/app/shared/services/league.service';

@Component({
  selector: 'app-join-league',
  templateUrl: './join-league.component.html',
  styleUrl: './join-league.component.scss'
})
export class JoinLeagueComponent {
  leagueForm = this.fb.group({
    leagueCode: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public leagueService: LeagueService) { }

  ngOnInit(): void {
  }
}
