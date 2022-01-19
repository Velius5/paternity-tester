import {Component, OnInit} from '@angular/core';
import {KidsService} from '../services/kids.service';
import {Kid} from '../model/kid';
import {Observable} from 'rxjs';
import {ModalController, ToastController} from '@ionic/angular';
import {AddKidModalComponent} from './add-kid-modal/add-kid-modal.component';


@Component({
  selector: 'app-kids-list',
  templateUrl: 'kids-list.page.html',
  styleUrls: ['kids-list.page.scss']
})
export class KidsListPage implements OnInit {
  public kids$: Observable<Kid[][]>;

  constructor(private kidsService: KidsService,
              private modalController: ModalController,
              private toastController: ToastController) {
  }

  ngOnInit(): void {
    this.kids$ = this.kidsService.kidsList$;
  }

  async openModal(kid: Kid) {
    const modal = await this.modalController.create({
      component: AddKidModalComponent,
      componentProps: {
        kid,
      },
      breakpoints: [0.2, 0.5, 0.75, 1],
      initialBreakpoint: 1,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== 'Cancel') {
        console.log('saved');
      }
      else {
        console.log('canceled');
      }
    });
    return await modal.present();
  }

  async errorKidLimitToast() {
    const toast = await this.toastController.create({
      header: 'Kid cannot be added',
      message: 'There is a limit of 10 kids per account',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }




}
