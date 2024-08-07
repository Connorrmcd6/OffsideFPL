import { Injectable, NgZone } from '@angular/core';
import { User } from './auth';
import { UserInfo } from './user-info';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged-in user data
  userInfoData: any; // Save logged-in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data and userInfoData in local storage when
       logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));

      if (user) {
        this.afs
          .doc(`user-info/${user.uid}`)
          .valueChanges()
          .subscribe((userInfo) => {
            this.userInfoData = userInfo || {}; // Set userInfoData to an empty object if it is undefined;
            localStorage.setItem('userInfo', JSON.stringify(this.userInfoData));
          });
      } else {
        localStorage.removeItem('userInfo');
      }
    });
  }


  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        let errorMessage;
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = "Your email is incorrect, if you don't have an account, please sign up.";
            break;
          case 'auth/invalid-credential':
            errorMessage = "Your password is incorrect, if you don't have an account, please sign up.";
            break;
          default:
          // errorMessage = error.message;
        }
        return Promise.reject(errorMessage);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        console.log('sending verification email');
        this.SendVerificationMail();
        console.log('setting user data');
        this.SetUserData(result.user);
        console.log('setting user info data');
        this.SetUserInfoData(result.user);
        if (result != null) {
          console.log(result.user);
        }
      })
      .catch((error) => {
        let errorMessage;
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'The email address is already in use by another account.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please check if your email is correct.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak.';
            break;
          case 'auth/missing-password':
            errorMessage = 'Please make sure to provide a password.';
            break;
          default:
          // errorMessage = error.message;
        }
        return Promise.reject(errorMessage);
      });
  }

  // Send email verification when new user signs up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when the user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false;
  }

  // Set up user data when signing in/up with username/password
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, { merge: true });
  }

  //create user info record linked to auth uid
  SetUserInfoData(user: any) {
    const userInfoRef: AngularFirestoreDocument<UserInfo> = this.afs.doc(`user-info/${user.uid}`);
    const userInfoData: UserInfo = {
      uid: user.uid,
      teamID: undefined,
      playerFirstName: undefined,
      playerLastName: undefined,
      playerName: undefined,
      teamName: undefined,
      playerRegion: undefined,
    };
    return userInfoRef.set(userInfoData, { merge: true });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.reload();
    });
  }
}