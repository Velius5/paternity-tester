import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {BabytesterService} from '../../services/babytester.service';
import {StorageKey, StorageService} from '../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {KidsService} from "../../services/kids.service";
import {Kid} from "../../model/kid";
import {Tests} from "../../model/tests";

@Component({
  selector: 'app-eye-color-test',
  templateUrl: './eye-color-test.page.html',
  styleUrls: ['./eye-color-test.page.scss'],
})
export class EyeColorTestPage implements OnInit {
  step = 0;
  form: FormGroup;
  kid: Kid;
  results;
  error;
  testModel;
  loading: boolean = false;

  constructor(public babytesterService: BabytesterService,
              public storageService: StorageService,
              private kidsService: KidsService,
              public router: Router,
              private route: ActivatedRoute) {
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
    this.testModel = _.find(babytesterService.models, (m) => m.id === 'eyecolor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const kidId = paramMap.get('id');
      this.kidsService.getKidById(kidId).then(k => {
        this.kid = k;
        if(this.kid.tests.eyeColorTest != null) {
          this.form.get('kid').setValue(this.kid.tests.eyeColorTest.kidParameterValue);
          this.results = this.kid.tests.eyeColorTest.results;
          this.step = 2;
        }
      });
    });
  }

  startTest() {
    this.step = 1;
  }

  checkEyeColor() {
    if(!this.form.invalid) {
      this.loading = true;
      setTimeout(() => {
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
              brownPossibility: out[0].prob,
              bluePossibility: out[1].prob,
              greenPossibility: out[2].prob
            };
            this.kid.tests.eyeColorTest = {
              kidParameterValue: this.form.get('kid').value,
              results: this.results,
              summary:  Math.round(out[this.form.get('kid').value].prob)
            };
            this.kidsService.updateKid(this.kid).then(k => {
              this.step = 2;
              this.loading = false;
            }).catch(err => {
              window.alert(err);
              this.step = 1;
              this.loading = false;
            });
          }
        } else {
          window.alert('Please, check given params. This combination is impossible.');
          this.step = 1;
          this.loading = false;
          console.log('Error OnCalcQuick');
        }
      }, this.getRandomInt(2000, 4000));
    }
  }

  testAgain() {
    this.step = 0;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
