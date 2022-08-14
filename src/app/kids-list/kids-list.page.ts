import {Component, OnInit} from '@angular/core';
import {KidsService} from '../services/kids.service';
import {Kid} from '../model/kid';
import {Observable} from 'rxjs';
import {ModalController, ToastController} from '@ionic/angular';
import {AddKidModalComponent} from './add-kid-modal/add-kid-modal.component';
import {StorageKey, StorageService} from "../services/storage.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-kids-list',
  templateUrl: 'kids-list.page.html',
  styleUrls: ['kids-list.page.scss']
})
export class KidsListPage implements OnInit {
  public loading: boolean;
  public kids$: Observable<Kid[]>;
  public emptyList: boolean;

  constructor(public authService: AuthenticationService,
              public router: Router,
              private kidsService: KidsService,
              private storageService: StorageService,
              private modalController: ModalController,
              private toastController: ToastController) {
    if(authService.googleTesterLogged) {
      this.router.navigate(['menu', 'fertilization']);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.kids$ = this.kidsService.kidsList$;
    this.kids$.subscribe(kidsList => {
      this.loading = false;
      if(kidsList.length === 0) {
        this.emptyList = true;
      } else {
        this.emptyList = false;
      }
    })
  }

  async openModal(kid: Kid) {
    let kidsCounter = 0;
    await this.storageService.getObject(StorageKey.Kids).then((kidsList: Kid[][]) => {
      kidsCounter = kidsList.length;
    });
    if(kid != null || kidsCounter < 101) {
      const modal = await this.modalController.create({
        component: AddKidModalComponent,
        componentProps: {
          kid,
        },
        breakpoints: [0.2, 0.5, 0.75, 1],
        initialBreakpoint: 1,
      });

      modal.onDidDismiss().then((dataReturned) => {
      });
      return await modal.present();
    } else {
      this.errorKidLimitToast();
    }
    return null;
  }

  async errorKidLimitToast() {
    const toast = await this.toastController.create({
      header: 'Kid cannot be added',
      message: 'There is a limit of 100 kids per account. Please, contact us to extend this limit.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }



}
