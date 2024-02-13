import { Injectable, NgZone } from '@angular/core';
import { UserInfo } from './user-info';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


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


  getUserInfo(teamID: string) {
    const baseUrl = `https://fantasy.premierleague.com/api/entry/${teamID}/`;
    this.http
      .get(baseUrl, { headers: { 'Access-Control-Allow-Origin': '*' } }) // Add headers to allow CORS
      .subscribe((data) => {
        console.log(data);
      });

  }


  testBackend() {
    console.log('testBackend');
    return this.http.get('/api/test').subscribe((response: any) => {
      console.log(response.message);
    });
  }


}
