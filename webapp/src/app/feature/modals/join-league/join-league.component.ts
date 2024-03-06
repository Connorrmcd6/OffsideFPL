import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LeagueService } from 'src/app/shared/services/league.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-join-league',
  templateUrl: './join-league.component.html',
  styleUrl: './join-league.component.scss'
})
export class JoinLeagueComponent {
  joinLeagueForm = this.fb.group({
    leagueCode: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public leagueService: LeagueService,
    private snackBar: MatSnackBar
  ) { }

  async joinLeague() {
    try {
      const message = await this.leagueService.addUserLeague(this.leagueService.userInfoData.uid, this.joinLeagueForm.get('leagueCode')?.value as string);
      this.snackBar.open(message as unknown as string, 'Close', { duration: 5000 });
    } catch (error) {
      this.snackBar.open((error as Error).message, 'Close', { duration: 5000 });
    }
  }
}
