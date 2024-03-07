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
  async fetchUserInfo(teamID: string): Promise<void> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Amz-Date': new Date().toISOString(),
    });


    const baseUrl = `https://uwaxlajf1b.execute-api.eu-north-1.amazonaws.com/qa/user-info?team_id=${teamID}`;
    let data; // Declare the 'data' variable
    this.http
      .get(baseUrl, { headers }) // Add headers to allow CORS
      .subscribe((responseData: UserInfoResponse) => {
        data = responseData; // Assign the value to 'data'
        console.log(data);
        this.userInfoData.teamName = data?.name;
        this.userInfoData.teamID = data?.id;
        this.userInfoData.playerFirstName = data?.player_first_name;
        this.userInfoData.playerLastName = data?.player_last_name;
        this.userInfoData.playerName = data?.player_name;
        this.userInfoData.playerRegion = data?.player_region_name;

        // // Store data in local storage
        localStorage.setItem('userInfo', JSON.stringify(this.userInfoData));

      });

    return data;
  }



  updateUserInfo(userInfo: UserInfo) {
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



