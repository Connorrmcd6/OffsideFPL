import { Injectable, NgZone } from '@angular/core';
import { UserInfo } from './user-info';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private http: HttpClient, // Inject HttpClient service
    public afs: AngularFirestore, // Inject Firestore service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  getUserInfo() {
    let placeholderTeamID: string = 'Not set';
    let placeholderManagerName: string = 'Not set';
    let placeholderTeamName: string = 'Not set';

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    if (userInfo.teamID == null) {
      return [placeholderTeamID, placeholderManagerName, placeholderTeamName];
    }

    return userInfo.teamID, userInfo.managerName, userInfo.teamName;  
  }


  fetchUserInfo(teamID: string) {
    let baseURL: string = `https://fantasy.premierleague.com/api/entry/${teamID}/`;

    return this.http.get(baseURL).pipe(
      map((response: any) => {
        const { player_first_name, player_last_name, name, player_region_name } = response;
        const manager_name = `${player_first_name} ${player_last_name}`;
        console.log(manager_name, name, player_region_name);
        return { manager_name, name, player_region_name };
      })
    );
  }

}
