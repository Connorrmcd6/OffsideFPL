import { Injectable, NgZone } from '@angular/core';
import { UserInfo, UserInfoSession } from './user-info';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userInfoData: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userInfoDataSession: UserInfoSession = JSON.parse(sessionStorage.getItem('userInfoDataSession') || '{} ');

  constructor(
    private http: HttpClient, // Inject HttpClient service
    public afs: AngularFirestore, // Inject Firestore service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }


  fetchUserInfo(teamID: string) {
    const baseUrl = `/api/user?teamID=${teamID}`;
    let data; // Declare the 'data' variable
    this.http
      .get(baseUrl, { headers: { 'Access-Control-Allow-Origin': '*' } }) // Add headers to allow CORS
      .subscribe((responseData: any) => {
        data = responseData; // Assign the value to 'data'
        console.log(data);
        this.userInfoData.teamName = data?.name;
        this.userInfoData.playerFirstName = data?.player_first_name;
        this.userInfoData.playerLastName = data?.player_last_name;
        this.userInfoData.playerName = data?.player_name;

        // Store data in session storage
        sessionStorage.setItem('userInfoDataSession', JSON.stringify(data));
      });

    return data;
  }


  updateUserInfo(userInfo: UserInfoSession) {
    const userInfoRef: AngularFirestoreDocument<UserInfo> = this.afs.doc(`user-info/${this.userInfoData.uid}`);
    this.userInfoData.teamName = userInfo.name;
    this.userInfoData.playerFirstName = userInfo.player_first_name;
    this.userInfoData.playerLastName = userInfo.player_last_name;
    this.userInfoData.playerName = userInfo.player_name;
    this.userInfoData.teamID = userInfo.id;

    localStorage.setItem('userInfo', JSON.stringify(this.userInfoData));

    return userInfoRef.set(this.userInfoData, { merge: true })
      .catch(error => {
        console.error('Error updating user info: ', error);
        throw error;
      });
  }

  testBackend() {
    console.log('testBackend');
    this.http.get('/api/test').subscribe((response: any) => {
      console.log(response.message);
    });
  }


}
