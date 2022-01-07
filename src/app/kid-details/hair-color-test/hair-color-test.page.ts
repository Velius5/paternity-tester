import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {BabytesterService} from '../../services/babytester.service';
import {StorageKey, StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-hair-color-test',
  templateUrl: './hair-color-test.page.html',
  styleUrls: ['./hair-color-test.page.scss'],
})
export class HairColorTestPage implements OnInit {
  step = 0;
  form: FormGroup;
  results;
  error;
  testModel;


  constructor(public babytesterService: BabytesterService,
              public storageService: StorageService) {
    this.babytesterService = babytesterService;
    this.form = new FormGroup({
      father: new FormControl('', Validators.required),
      mother: new FormControl('', Validators.required),
      kid: new FormControl('', Validators.required),
      fatherFather: new FormControl('-1'),
      fatherMother: new FormControl('-1'),
      motherFather: new FormControl('-1'),
      motherMother: new FormControl('-1')
    });
    this.testModel = _.find(babytesterService.models, (m) => m.id === 'haircolor');
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
          this.results = {
            blackPossibility: out[0].prob,
            brownPossibility: out[1].prob,
            redPossibility: out[2].prob,
            strawberryBlondPossibility: out[3].prob,
            blondPossibility: out[4].prob
          };
          this.storageService.set(StorageKey.HairColorTest, Math.round(out[this.form.get('kid').value].prob));
        }
      } else {
        console.log('Error OnCalcQuick');
      }
      this.step = 2;
    }
  }


}
