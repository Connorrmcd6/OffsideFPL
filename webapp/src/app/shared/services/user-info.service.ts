import { Injectable, NgZone } from '@angular/core';
import { UserInfo, UserInfoResponse } from './user-info';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userInfoData: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  constructor(
    private http: HttpClient, // Inject HttpClient service
    public afs: AngularFirestore, // Inject Firestore service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }


  // requests data from the go handler that requests from the public fpl api based on the team ID specified by the user
  // data is then stored in the session storage
  async fetchUserInfo(teamID: string): Promise<UserInfoResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Amz-Date': new Date().toISOString(),
    });

    const baseUrl = `https://uwaxlajf1b.execute-api.eu-north-1.amazonaws.com/qa/user-info?team_id=${teamID}`;

    const data = await this.http.get<UserInfoResponse>(baseUrl, { headers }).toPromise();

    return data as UserInfoResponse;
  }


  async updateUserInfo(userInfo: UserInfo, tempUserInfo: UserInfoResponse | undefined) {

    this.userInfoData.teamName = tempUserInfo?.name;
    this.userInfoData.teamID = tempUserInfo?.id;
    this.userInfoData.playerFirstName = tempUserInfo?.player_first_name;
    this.userInfoData.playerLastName = tempUserInfo?.player_last_name;
    this.userInfoData.playerName = tempUserInfo?.player_name;
    this.userInfoData.playerRegion = tempUserInfo?.player_region_name;

    // Store data in local storage
    localStorage.setItem('userInfo', JSON.stringify(this.userInfoData));


    const userInfoRef: AngularFirestoreDocument<UserInfo> = this.afs.doc(`user-info/${userInfo.uid}`);

    return userInfoRef.set(userInfo, { merge: true })
      .catch(error => {
        console.error('Error updating user info: ', error);
        throw error;
      });

  }




  testBackend() {
    console.log('testBackend');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Amz-Date': new Date().toISOString(),
    });

    this.http.get('https://uwaxlajf1b.execute-api.eu-north-1.amazonaws.com/qa/test?name=connor', { headers })
      .subscribe((response: any) => {
        console.log(response);
      });
  }


}



