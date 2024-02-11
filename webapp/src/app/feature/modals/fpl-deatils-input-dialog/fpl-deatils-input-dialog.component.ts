import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-fpl-deatils-input-dialog',
  templateUrl: './fpl-deatils-input-dialog.component.html',
  styleUrl: './fpl-deatils-input-dialog.component.scss'
})
export class FplDeatilsInputDialogComponent {
  panelOpenState = false;

  constructor(
    public userInfoService: UserInfoService
    ) {}
}
