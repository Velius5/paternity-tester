import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Kid} from '../model/kid';
import {StorageKey, StorageService} from './storage.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import * as _ from 'lodash';
import {AuthenticationService} from './authentication.service';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class KidsService {
  public kidsList$ = new BehaviorSubject([]);
  private kidsRef: AngularFirestoreCollection<Kid> = null;
  private kidsListSubscription$: Subscription;

  constructor(public firestore: AngularFirestore,
              private storageService: StorageService,
              private authService: AuthenticationService) {
    this.kidsRef = firestore.collection('/kids');
    this.authService.userData$.subscribe(loggedUser => {
      if(loggedUser == null && this.kidsListSubscription$ != null) {
        this.kidsListSubscription$.unsubscribe();
      }
      if(loggedUser != null) {
        const kidsRef$: Observable<Kid[][]> = this.firestore.collection<Kid[]>('kids', ref =>
          ref.where('userId', '==', this.authService.userData$.getValue().uid))
          .snapshotChanges()
          .pipe(
            map(changes =>
              changes.map(c =>
                ({ id: c.payload.doc.id, ...c.payload.doc.data() })
              ))
          );
        this.kidsListSubscription$ = kidsRef$.subscribe(kidsList => {
          this.storageService.setObject(StorageKey.Kids, kidsList);
          this.kidsList$.next(kidsList);
        });
      }
    });
  }



  getKids(): Kid[][] {
    return this.kidsList$.getValue();
  }

  getKidById(id: string): Promise<Kid> {
    return new Promise((resolve, reject) => {
      this.storageService.getObject(StorageKey.Kids).then(kidsList => {
        const kidsWithGivenId = _.find(kidsList, (kid) => kid.id === id);
        if(kidsWithGivenId != null) {
          resolve(kidsWithGivenId);
        } else {
          reject(null);
        }
      }).catch(err => reject(null));
    });

    // const noteDocRef = doc(this.firestore, `kids/${id}`);
    // return docData(noteDocRef, { idField: 'id' }) as Observable<Kid>;
  }
  //
  // addKid(kid: Kid) {
  //   const notesRef = collection(this.firestore, 'kids');
  //   return addDoc(notesRef, kid);
  // }
  //
  // deleteKid(id: string) {
  //   const kidDocRef = doc(this.firestore, `kids/${id}`);
  //   return deleteDoc(kidDocRef);
  // }
  //
  updateKid(kid: Kid) {
    this.recalculateSummary(kid);
    return this.firestore.doc(`kids/${kid.id}`).update(kid);
  }

  addKid(kid: Kid): any {
    kid.userId = this.authService.userData$.getValue().uid;
    return this.kidsRef.add({ ...kid });
  }

  recalculateSummary(kid: Kid) {
    let sum = 0;
    let size = 0;
    Object.keys(kid.tests)
      .filter(testKey => kid.tests[testKey] != null)
      .forEach(testKey => {
        console.log(kid.tests[testKey]);
        sum += kid.tests[testKey].summary;
        size++;
      });
    kid.summary = Math.round((sum) / size);
    if(kid.tests.eyeColorTest && kid.tests.eyeColorTest.summary === 0 || kid.tests.hairColorTest && kid.tests.hairColorTest.summary === 0) {
      kid.summary = 0;
    }
  }
}
