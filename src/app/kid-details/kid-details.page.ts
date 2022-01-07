import {Component, OnInit} from '@angular/core';
import {StorageKey, StorageService} from '../services/storage.service';

@Component({
  selector: 'app-kid-details',
  templateUrl: 'kid-details.page.html',
  styleUrls: ['kid-details.page.scss']
})
export class KidDetailsPage implements OnInit{
  matching: number;
  eyeColorTestPercentage: number;
  hairColorTestPercentage: number;

  constructor(public storageService: StorageService) {
  }

  ngOnInit() {
    Promise.all([
      this.storageService.get(StorageKey.EyeColorTest),
      this.storageService.get(StorageKey.HairColorTest)
    ]).then((values) => {
      this.eyeColorTestPercentage = values[0];
      this.hairColorTestPercentage = values[1];
      this.matching = Math.round((this.eyeColorTestPercentage + this.hairColorTestPercentage) / 2);
      if(this.eyeColorTestPercentage === 0 || this.hairColorTestPercentage === 0) {
        this.matching = 0;
      }
    });
  }

}
