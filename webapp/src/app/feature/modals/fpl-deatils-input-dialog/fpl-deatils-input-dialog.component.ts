import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { UserInfoResponse } from 'src/app/shared/services/user-info';

@Component({
  selector: 'app-fpl-deatils-input-dialog',
  templateUrl: './fpl-deatils-input-dialog.component.html',
  styleUrls: ['./fpl-deatils-input-dialog.component.scss']
})
export class FplDeatilsInputDialogComponent {
  confirmationOpenState = false;
  panelOpenState = false;
  tempUserInfo: UserInfoResponse | undefined; // Use the UserInfoResponse model

  constructor(
    public userInfoService: UserInfoService,
  ) { }

  async findUser(teamID: string) {
    try {
      this.tempUserInfo = await this.userInfoService.fetchUserInfo(teamID);
      this.confirmationOpenState = true;
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

}