import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BabytesterService } from './services/babytester.service';
import {IonicStorageModule} from '@ionic/storage-angular';
import {StorageService} from './services/storage.service';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireAuthModule, USE_DEVICE_LANGUAGE} from '@angular/fire/compat/auth';
import {AngularFireAuthGuardModule} from '@angular/fire/compat/auth-guard';
import {AngularFireRemoteConfigModule} from '@angular/fire/compat/remote-config';
import {AngularFireMessagingModule} from '@angular/fire/compat/messaging';
import {AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from '@angular/fire/compat/analytics';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireRemoteConfigModule,
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    // provide modular style for AppCheck, see app.browser/server
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BabytesterService,
    StorageService,
    AngularFirestoreModule,
    UserTrackingService,
    ScreenTrackingService,
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
