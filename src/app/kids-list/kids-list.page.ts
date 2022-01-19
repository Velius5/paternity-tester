import {Component, OnInit} from '@angular/core';
import {KidsService} from '../services/kids.service';
import {Kid} from '../model/kid';
import {Observable} from 'rxjs';
import {ModalController, ToastController} from '@ionic/angular';
import {AddKidModalComponent} from './add-kid-modal/add-kid-modal.component';
import {StorageKey, StorageService} from "../services/storage.service";


@Component({
  selector: 'app-kids-list',
  templateUrl: 'kids-list.page.html',
  styleUrls: ['kids-list.page.scss']
})
export class KidsListPage implements OnInit {
  public kids$: Observable<Kid[][]>;

  constructor(private kidsService: KidsService,
              private storageService: StorageService,
              private modalController: ModalController,
              private toastController: ToastController) {
  }

  ngOnInit(): void {
    this.kids$ = this.kidsService.kidsList$;
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
