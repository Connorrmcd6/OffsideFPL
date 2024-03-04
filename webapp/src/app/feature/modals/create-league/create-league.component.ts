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
    gameMode: ['', Validators.required],
    check1: [false],
    check2: [false],
    check3: [false]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
}