import {Component, Input, OnInit} from '@angular/core';
import {Kid} from '../../model/kid';
import {ModalController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {KidsService} from '../../services/kids.service';
import * as moment from 'moment';

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
      name: new FormControl(this.kid ? this.kid.name : '', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if(this.kid) {
      this.form.get('name').setValue(this.kid.name);
      this.form.get('gender').setValue(this.kid.gender);
      const dateOfBirth = moment(this.kid.dateOfBirth, 'DD-MM-YYYY');
      this.form.get('dateOfBirth').setValue(dateOfBirth.format());
    }
  }

  async save() {
    if(!this.form.invalid) {
      const dateOfBirth  = moment(this.form.get('dateOfBirth').value);
      if(this.kid == null) {
        const newKid = {
          name: this.form.get('name').value,
          gender: this.form.get('gender').value,
          dateOfBirth: dateOfBirth.format('DD-MM-YYYY'),
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
        this.kid.dateOfBirth = dateOfBirth.format('DD-MM-YYYY');
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
      header: this.kid ? 'Kid updated successfully' : 'Kid added successfully',
      message: 'Now you can start testing your paternity',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      header: this.kid ? 'Kid cannot be updated' : 'Kid cannot be added',
      message: 'Please, try again later',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
