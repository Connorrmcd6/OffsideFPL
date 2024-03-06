import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LeagueService } from 'src/app/shared/services/league.service';


@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrl: './create-league.component.scss'
})
export class CreateLeagueComponent implements OnInit {
  createLeagueForm = this.fb.group({
    leagueName: ['', Validators.required],
    leagueMode: ['', Validators.required],
    leaguePrivacy: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public leagueService: LeagueService) { }

  ngOnInit(): void {
  }
}