import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { FplDeatilsInputDialogComponent } from './fpl-deatils-input-dialog/fpl-deatils-input-dialog.component';
import { InstallPwaAlertComponent } from './install-pwa-alert/install-pwa-alert.component';

@NgModule({
  declarations: [
    FplDeatilsInputDialogComponent,
    InstallPwaAlertComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class ModalsModule { }
