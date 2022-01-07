import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {BabytesterService} from '../../services/babytester.service';
import {StorageKey, StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-eye-color-test',
  templateUrl: './eye-color-test.page.html',
  styleUrls: ['./eye-color-test.page.scss'],
})
export class EyeColorTestPage implements OnInit {
  step = 0;
  form: FormGroup;
  results;
  error;
  testModel;

  constructor(public babytesterService: BabytesterService,
              public storageService: StorageService) {
    this.babytesterService = babytesterService;
    this.form = new FormGroup({
      father: new FormControl('1', Validators.required),
      mother: new FormControl('2', Validators.required),
      kid: new FormControl('', Validators.required),
      fatherFather: new FormControl('-1'),
      fatherMother: new FormControl('-1'),
      motherFather: new FormControl('-1'),
      motherMother: new FormControl('-1')
    });
    this.testModel = _.find(babytesterService.models, (m) => m.id === "eyecolor");
  }

  ngOnInit() {
  }

  startTest() {
    this.step = 1;
  }

  checkEyeColor() {
    if(!this.form.invalid) {
      if (this.testModel) {
        const out = this.babytesterService.getResultsQuick(
          this.testModel,
          this.form.get('father').value,
          this.form.get('mother').value,
          this.form.get('fatherFather').value,
          this.form.get('fatherMother').value,
          this.form.get('motherFather').value,
          this.form.get('motherMother').value
        );
        if (out[0].fail) {
          this.error = out;
        } else {
          this.results = {brownPossibility: out[0].prob, bluePossibility: out[1].prob, greenPossibility: out[2].prob};
          this.storageService.set(StorageKey.EyeColorTest, Math.round(out[this.form.get('kid').value].prob));
        }
      } else {
        console.log('Error OnCalcQuick');
      }
      this.step = 2;
    }
  }

}
