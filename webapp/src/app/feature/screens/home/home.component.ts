import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FplDeatilsInputDialogComponent } from '../../modals/fpl-deatils-input-dialog/fpl-deatils-input-dialog.component';
import { CreateLeagueComponent } from '../../modals/create-league/create-league.component';
import { JoinLeagueComponent } from '../../modals/join-league/join-league.component';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { LeagueService } from 'src/app/shared/services/league.service';



export interface LeagueData {
  leagueName: string;
  rank: number;
  leagueMode: string;
}

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
    private matDialog: MatDialog,
    public userInfoService: UserInfoService,
    public leagueService: LeagueService
  ) { }


  goBack(): void {
    this.location.back();
  }

  openTeamIdDialog() {
    this.matDialog.open(FplDeatilsInputDialogComponent, {
      width: '350px'
    })
  }

  openCreateLeagueDialog() {
    this.matDialog.open(CreateLeagueComponent, {
      width: '350px'
    })
  }

  openJoinLeagueDialog() {
    this.matDialog.open(JoinLeagueComponent, {
      width: '350px'
    })
  }


  displayedColumns: string[] = ['leagueName', 'rank', 'leagueMode'];
  dataSource: LeagueData[] = [];

  async ngOnInit() {
    try {
      this.dataSource = await this.leagueService.fetchUserLeagues();
    } catch (error) {
      console.error('Error fetching user leagues:', error);
    }
  }
}
