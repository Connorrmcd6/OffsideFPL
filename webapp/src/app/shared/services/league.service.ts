import { Injectable, NgZone } from '@angular/core';
import { UserInfo } from './user-info';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { generate } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  userInfoData: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  generateLeague(leagueName: string, leagueMode: string, leaguePrivacy: string) {
    let data: any = {}; // Declare and initialize data as an empty object
    data.adminID = this.userInfoData?.uid; // Add null check
    data.leagueName = leagueName;
    data.leagueMode = leagueMode;
    data.leaguePrivacy = leaguePrivacy;

    return this.afs.collection('leagues').add(data)
      .then(() => {
        console.log('League data added successfully');
      })
      .catch(error => {
        console.error('Error adding league data: ', error);
        throw error;
      });
  }
}




