import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './feature/auth/auth.module';
import { HomeModule } from './feature/home/home.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    HomeModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDpV78yFkZd7DM1hDURZkNa1PeNJKzSVi0",
      authDomain: "offsidefpl-3d9e0.firebaseapp.com",
      projectId: "offsidefpl-3d9e0",
      storageBucket: "offsidefpl-3d9e0.appspot.com",
      messagingSenderId: "844762550560",
      appId: "1:844762550560:web:e285bb53f4edc78e258745"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
