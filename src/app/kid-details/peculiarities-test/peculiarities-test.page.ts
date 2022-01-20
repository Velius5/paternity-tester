import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {BabytesterService} from '../../services/babytester.service';
import {StorageKey, StorageService} from '../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {KidsService} from '../../services/kids.service';
import {Kid} from '../../model/kid';
import {Tests} from '../../model/tests';
import {PeculiaritiesTestType} from '../../model/peculiarities-test-type';
import * as moment from 'moment';

@Component({
  selector: 'app-peculiarities-test',
  templateUrl: './peculiarities-test.page.html',
  styleUrls: ['./peculiarities-test.page.scss'],
})
export class PeculiaritiesTestPage implements OnInit {
  pecularitiesTestType: PeculiaritiesTestType;
  step = 0;
  form: FormGroup;
  kid: Kid;
  kidAgeInMonths: number;
  results;
  error;
  testModel;
  loading = false;

  constructor(public babytesterService: BabytesterService,
              public storageService: StorageService,
              private kidsService: KidsService,
              public router: Router,
              private route: ActivatedRoute) {
    this.babytesterService = babytesterService;
    this.route.paramMap.subscribe( paramMap => {
      this.pecularitiesTestType = paramMap.get('type') as PeculiaritiesTestType;
    });
    this.form = new FormGroup({
      father: new FormControl('', Validators.required),
      mother: new FormControl('', Validators.required),
      kid: new FormControl('', Validators.required),
      fatherFather: new FormControl('-1'),
      fatherMother: new FormControl('-1'),
      motherFather: new FormControl('-1'),
      motherMother: new FormControl('-1')
    });
    this.testModel = _.find(babytesterService.models, (m) => m.id === 'cleftchin');
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const kidId = paramMap.get('id');
      this.kidsService.getKidById(kidId).then(k => {
        this.kid = k;
        this.kidAgeInMonths = moment(new Date()).diff(moment(this.kid.dateOfBirth, 'DD-MM-YYYY'), 'months', true);
        if(this.kid.tests[this.pecularitiesTestType] != null) {
          this.form.get('kid').setValue(this.kid.tests[this.pecularitiesTestType].kidParameterValue);
          this.results = this.kid.tests[this.pecularitiesTestType].results;
          this.step = 2;
        }
      });
    });
  }

  startTest() {
    this.step = 1;
  }

  check() {
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
            this.results = {yesPossibility: out[0].prob, noPossibility: out[1].prob};
            console.log(this.results);
            this.kid.tests[this.pecularitiesTestType] = {
              kidParameterValue: this.form.get('kid').value,
              results: this.results,
              summary:  Math.round(out[this.form.get('kid').value].prob)
            };
            this.kidsService.updateKid(this.kid).then(k => {
              this.step = 2;
              this.loading = false;
            });
          }
        } else {
          console.log('Error OnCalcQuick');
        }
      }, this.getRandomInt(2000, 4000));
    }
  }

  testAgain() {
    this.step = 1;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  youngerThen(months: number) {
    return this.kidAgeInMonths < months;
  }

}
