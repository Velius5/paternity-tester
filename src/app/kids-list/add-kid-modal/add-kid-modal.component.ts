import {Component, Input, OnInit} from '@angular/core';
import {Kid} from '../../model/kid';
import {ModalController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {KidsService} from '../../services/kids.service';

@Component({
  selector: 'app-add-kid-modal',
  templateUrl: './add-kid-modal.component.html',
  styleUrls: ['./add-kid-modal.component.scss'],
})
export class AddKidModalComponent implements OnInit {
  @Input() kid: Kid;
  public form: FormGroup;
  public date;

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private kidsService: KidsService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async save() {
    if(!this.form.invalid) {
      if(this.kid == null) {
        const newKid = {
          name: this.form.get('name').value,
          gender: this.form.get('gender').value,
          dateOfBirth: this.form.get('dateOfBirth').value,
          userId: null,
          tests: {
            eyeColorTest: null,
            hairColorTest: null,
            bloodTest: null
          },
          summary: null
        };
        this.kidsService.addKid(newKid).then(() => {
          this.successToast();
          this.modalController.dismiss(newKid);
        }).catch(err => {
          this.errorToast();
        });
      } else {
        this.kid.name = this.form.get('name').value;
        this.kid.gender = this.form.get('gender').value;
        this.kid.dateOfBirth = this.form.get('dateOfBirth').value;
        this.kidsService.updateKid(this.kid).then(() => {
          this.successToast();
          this.modalController.dismiss(this.kid);
        }).catch(err => {
          this.errorToast();
        });
      }
    }
  }

  async closeModal() {
    await this.modalController.dismiss('Cancel');
  }

  async successToast() {
    const toast = await this.toastController.create({
      header: 'Kid added successfully',
      message: 'Now you can start testing your paternity',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      header: 'Kid cannot be added',
      message: 'Please, try again later',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
