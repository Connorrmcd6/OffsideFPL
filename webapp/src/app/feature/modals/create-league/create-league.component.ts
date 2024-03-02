import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrl: './create-league.component.scss'
})
export class CreateLeagueComponent implements OnInit {
  leagueForm = this.fb.group({
    leagueName: ['', Validators.required],
    gameMode: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
}