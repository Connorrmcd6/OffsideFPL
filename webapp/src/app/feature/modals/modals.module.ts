import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

import { FplDeatilsInputDialogComponent } from './fpl-deatils-input-dialog/fpl-deatils-input-dialog.component';
import { InstallPwaAlertComponent } from './install-pwa-alert/install-pwa-alert.component';
import { CreateLeagueComponent } from './create-league/create-league.component';
import { JoinLeagueComponent } from './join-league/join-league.component';

@NgModule({
  declarations: [
    FplDeatilsInputDialogComponent,
    InstallPwaAlertComponent,
    CreateLeagueComponent,
    JoinLeagueComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class ModalsModule { }
