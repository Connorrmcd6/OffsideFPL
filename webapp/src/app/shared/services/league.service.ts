import { Injectable, NgZone } from '@angular/core';
import { UserInfo } from './user-info';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  userInfoData: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  async generateLeague(leagueName: string, leagueMode: string, leaguePrivacy: string) {
    let data: any = {}; // Declare and initialize data as an empty object
    data.adminID = this.userInfoData?.uid; // Add null check
    data.leagueName = leagueName;
    data.leagueMode = leagueMode;
    data.leaguePrivacy = leaguePrivacy;

    // Generate a 6 character alphanumeric ID
    let id = this.generateId(6);

    // Check if a document with the same ID already exists
    let doc = await firstValueFrom(this.afs.collection('leagues').doc(id).get());
    while (doc?.exists) {
      // If it does, generate a new ID
      id = this.generateId(7);
      doc = await firstValueFrom(this.afs.collection('leagues').doc(id).get());
    }

    // Set the unique ID
    data.id = id;

    return this.afs.collection('leagues').doc(id).set(data)
      .then(() => {
        console.log('League data added successfully');
      })
      .catch(error => {
        console.error('Error adding league data: ', error);
        throw error;
      });
  }

  generateId(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

}




