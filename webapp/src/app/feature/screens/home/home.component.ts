import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FplDeatilsInputDialogComponent } from '../../modals/fpl-deatils-input-dialog/fpl-deatils-input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/shared/services/user-info.service';


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
    public userInfoService: UserInfoService
  ) {}


  goBack(): void {
    this.location.back();
  }

  openTeamIdDialog() {
    this.matDialog.open(FplDeatilsInputDialogComponent, {
      width:'350px'
    })
  }
}
