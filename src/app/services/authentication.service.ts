import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {User, UserSource} from '../model/user';
import firebase from 'firebase/compat/app';
import {StorageKey, StorageService} from './storage.service';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthenticationService {
  userData$ = new BehaviorSubject(null);

  constructor(
    private afStore: AngularFirestore,
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private storageService: StorageService
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData$.next(user);
        this.storageService.setObject(StorageKey.User, user);
      } else {
        this.storageService.remove(StorageKey.User);
      }
    });
  }

  // Login in with email/password
  login(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password).then(loginUserResponse => {
      this.storageService.setObject(StorageKey.User, loginUserResponse.user);
      this.userData$.next(loginUserResponse.user);
    });
  }

  // Register user with email/password
  signup(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
      .then(operation => {
        this.saveUserData(operation.user, UserSource.DIRECT);
      });
  }

  // Email verification when new user register
  sendVerificationMail() {
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  // Recover password
  recoverPassword(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  // Returns true when user is looged in
  get isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(this.userData$.getValue() != null) {
        resolve(true);
      }
      resolve(false);
    });
  }

  // Returns true when user's email is verified
  get isEmailVerified(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storageService.get(StorageKey.User).then(u => {
        if(u.emailVerified) {
          resolve(true);
        }
        reject(u);
      });
    });
  }

  loginUsingGoogleAccount() {
    return this.loginUsingProvider(new firebase.auth.GoogleAuthProvider());
  }

  // Auth providers
  loginUsingProvider(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['menu']);
        });
        this.saveUserData(result.user, UserSource.GOOGLE);
      }).catch((err) => {
        window.alert(err);
      });
  }

  // Store created user
  saveUserData(user, source: UserSource) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      createdAt: Date.now(),
      source
    };
    this.storageService.setObject(StorageKey.User, userData);
    this.userData$.next(userData);
    return userRef.set(userData, {
      merge: true
    });
  }

  logout() {
    return this.ngFireAuth.signOut().then(() => {
      this.storageService.clear();
      this.userData$.next(null);
      this.router.navigate(['login']);
    });
  }

}
