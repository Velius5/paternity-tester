import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {BabytesterService} from '../../services/babytester.service';
import {StorageKey, StorageService} from '../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {KidsService} from '../../services/kids.service';
import {Kid} from '../../model/kid';
import {Tests} from '../../model/tests';

@Component({
  selector: 'app-blood-test',
  templateUrl: './blood-test.page.html',
  styleUrls: ['./blood-test.page.scss'],
})
export class BloodTestPage implements OnInit {
  step = 0;
  form: FormGroup;
  kid: Kid;
  results;
  loading = false;

  constructor(public babytesterService: BabytesterService,
              public storageService: StorageService,
              private kidsService: KidsService,
              public router: Router,
              private route: ActivatedRoute) {
    this.babytesterService = babytesterService;
    this.form = new FormGroup({
      fathersGroup: new FormControl('', Validators.required),
      fathersRH: new FormControl('', Validators.required),
      mothersGroup: new FormControl('', Validators.required),
      mothersRH: new FormControl('', Validators.required),
      kidsGroup: new FormControl('', Validators.required),
      kidsRH: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const kidId = paramMap.get('id');
      this.kidsService.getKidById(kidId).then(k => {
        this.kid = k;
        if(this.kid.tests.bloodTest != null) {
          this.results = this.kid.tests.bloodTest.results;
          this.step = 2;
        }
      });
    });
  }

  startTest() {
    this.step = 1;
  }

  checkBlood() {
    if(!this.form.invalid) {
      this.loading = true;
      setTimeout(() => {
        const mother = {
          group: this.form.get('mothersGroup').value,
          rh: this.form.get('mothersRH').value
        };
        const father = {
          group: this.form.get('fathersGroup').value,
          rh: this.form.get('fathersRH').value
        };
        this.results = this.babytesterService.getPossibleBloodTypes(mother, father).map(result => result.group + result.rh);
        this.kid.tests.bloodTest = {
          kidParameterValue: this.form.get('kidsGroup').value + this.form.get('kidsRH').value,
          results: this.results,
          summary:  0
        };
        if(this.cisABPossible()) {
          if(this.form.get('mothersRH').value === '-' && this.form.get('fathersRH').value === '-') {
            this.kid.tests.bloodTest.results.push('AB-');
          } else {
            this.kid.tests.bloodTest.results.push('AB-');
            this.kid.tests.bloodTest.results.push('AB+');
          }
          this.kid.tests.bloodTest.summary = 1;
        } else {
          if(this.results.indexOf(this.kid.tests.bloodTest.kidParameterValue) > -1) {
            this.kid.tests.bloodTest.summary = 50;
          } else {
            this.kid.tests.bloodTest.summary = 0;
          }
        }

        this.kidsService.updateKid(this.kid).then(() => {
          this.step = 2;
          this.loading = false;
        }).catch(err => {
          window.alert(err);
          this.step = 1;
          this.loading = false;
        });
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

  public cisABPossible() {
    if(this.kid.tests.bloodTest != null && this.kid.tests.bloodTest.results.indexOf('AB') > -1) {
      return true;
    }
    if(this.form.get('fathersRH').value === '-' && this.form.get('mothersRH').value === '-' && this.form.get('kidsRH').value === '+') {
      return false;
    }
    return (this.form.get('fathersGroup').value === '0' && this.form.get('mothersGroup').value === 'AB')
      || (this.form.get('mothersGroup').value === '0' && this.form.get('fathersGroup').value === 'AB');
  }

}
