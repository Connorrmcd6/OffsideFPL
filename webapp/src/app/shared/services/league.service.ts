import { Injectable, NgZone } from '@angular/core';
import { UserInfo, LeagueData, UserLeague } from './user-info';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  userInfoData: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone
  ) { }

  async generateLeague(leagueName: string, leagueMode: string, leaguePrivacy: string) {
    const data = this.createLeagueData(leagueName, leagueMode, leaguePrivacy);


    try {
      await this.afs.collection('leagues').doc(data.code).set(data);
      console.log('League data added successfully');
    } catch (error) {
      console.error('Error adding league data: ', error);
      throw error;
    }

    return data.code;
  }

  async createAndJoinLeague(leagueName: string, leagueMode: string, leaguePrivacy: string, userId: string) {
    const leagueId = await this.generateLeague(leagueName, leagueMode, leaguePrivacy);
    return this.addUserLeague(userId, leagueId);
  }

  async addUserLeague(userId: string | undefined, leagueId: string) {
    if (!userId) {
      throw new Error('User ID is undefined');
    }

    const upperCaseLeagueId = leagueId.toUpperCase();
    const now = new Date().toISOString();
    const userLeagueData = {
      uid: userId,
      code: upperCaseLeagueId,
      rank: 0, // default rank
      joinedAt: now, // joined at timestamp
      updatedAt: now // updated at timestamp
    };

    const leagueDoc = await this.afs.collection('leagues').doc(upperCaseLeagueId).get().toPromise();
    if (!leagueDoc?.exists) {
      console.error('Error: League ID does not exist');
      throw new Error('League does not exist');
    }

    const snapshot = await firstValueFrom(this.afs.collection('user-leagues', ref => ref.where('uid', '==', userId).where('code', '==', upperCaseLeagueId)).get());
    if (!snapshot?.empty) {
      console.error('Error: user-league data already exists');
      throw new Error('You have already joined this league.');
    }

    try {
      await this.afs.collection('user-leagues').add(userLeagueData);
      console.log('User-league data added successfully');
    } catch (error) {
      console.error('Error adding user-league data: ', error);
      throw error;
    }
  }

  createLeagueData(leagueName: string, leagueMode: string, leaguePrivacy: string) {
    return {
      adminID: this.userInfoData?.uid,
      leagueName: leagueName,
      leagueMode: leagueMode,
      leaguePrivacy: leaguePrivacy,
      code: this.generateId(6),
      createdAt: new Date().toISOString(),
    };
  }

  async generateUniqueLeagueId() {
    let id = this.generateId(6);
    let doc = await firstValueFrom(this.afs.collection('leagues').doc(id).get());

    while (doc?.exists) {
      id = this.generateId(6);
      doc = await firstValueFrom(this.afs.collection('leagues').doc(id).get());
    }

    return id;
  }

  generateId(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async fetchUserLeaguesArray(): Promise<string[]> {
    const userID = this.userInfoData?.uid;
    if (!userID) {
      throw new Error('User ID is undefined');
    }

    try {
      const snapshot = await firstValueFrom(this.afs.collection('user-leagues', ref => ref.where('uid', '==', userID)).get());

      const leagueCodes: string[] = [];

      snapshot.forEach(doc => {
        const data = doc.data() as UserLeague;
        if (data.code) {
          leagueCodes.push(data.code);
        }
      });

      return leagueCodes;
    } catch (error) {
      console.error('Error fetching user leagues array:', error);
      throw error;
    }
  }

  async fetchUserLeagues(): Promise<LeagueData[]> {
    try {
      const userLeagueCodes = await this.fetchUserLeaguesArray();

      const leaguePromises = userLeagueCodes.map(userLeague =>
        firstValueFrom(this.afs.collection('leagues').doc(userLeague).get())
      );

      const leagueDocs = await Promise.all(leaguePromises);

      const LEAGUE_DATA: LeagueData[] = leagueDocs
        .filter(leagueDoc => leagueDoc.exists)
        .map(leagueDoc => {
          const data = leagueDoc.data();
          if (!data) {
            throw new Error(`No data for league document ${leagueDoc.id}`);
          }
          return data as LeagueData;
        });
      console.log(LEAGUE_DATA);
      return LEAGUE_DATA;
    } catch (error) {
      console.error('Error fetching user leagues:', error);
      throw error;
    }
  }
}