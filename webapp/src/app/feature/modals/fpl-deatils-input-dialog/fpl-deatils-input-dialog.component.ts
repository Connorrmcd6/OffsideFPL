import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-fpl-deatils-input-dialog',
  templateUrl: './fpl-deatils-input-dialog.component.html',
  styleUrl: './fpl-deatils-input-dialog.component.scss'
})
export class FplDeatilsInputDialogComponent {
  panelOpenState = false;
  confirmationOpenState = false;
  teamID: string = ''; // Initialize the teamID property

  constructor(
    public userInfoService: UserInfoService
  ) { }

  async findTeam() {
    try {
      await this.userInfoService.fetchUserInfo(this.teamID); // Use the teamID property
      this.confirmationOpenState = true;
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
}
