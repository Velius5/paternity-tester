import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {BabytesterService} from '../../services/babytester.service';
import {StorageKey, StorageService} from '../../services/storage.service';
import {Kid} from "../../model/kid";
import {KidsService} from "../../services/kids.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-hair-color-test',
  templateUrl: './hair-color-test.page.html',
  styleUrls: ['./hair-color-test.page.scss'],
})
export class HairColorTestPage implements OnInit {
  step = 0;
  form: FormGroup;
  kid: Kid;
  results;
  error;
  testModel;
  loading: boolean = false;


  constructor(private babytesterService: BabytesterService,
              private storageService: StorageService,
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
    this.testModel = _.find(babytesterService.models, (m) => m.id === 'haircolor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const kidId = paramMap.get('id');
      this.kidsService.getKidById(kidId).then(k => {
        this.kid = k;
        if(this.kid.tests.hairColorTest != null) {
          this.form.get('kid').setValue(this.kid.tests.hairColorTest.kidParameterValue);
          this.results = this.kid.tests.hairColorTest.results;
          this.step = 2;
        }
      });
    });
  }

  startTest() {
    this.step = 1;
  }

  checkHairColor() {
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
              blackPossibility: out[0].prob,
              brownPossibility: out[1].prob,
              redPossibility: out[2].prob,
              strawberryBlondPossibility: out[3].prob,
              blondPossibility: out[4].prob
            };
            this.kid.tests.hairColorTest = {
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
        this.step = 2;
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
