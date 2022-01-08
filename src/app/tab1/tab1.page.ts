import { Component } from '@angular/core';
import {StorageKey, StorageService} from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // eyeColorTestPercentage: number;

  constructor(private storageService: StorageService) {
    // storageService.get(StorageKey.EYE_COLOR_TEST_PERCENTAGE).then(value => this.eyeColorTestPercentage = value);
  }

}
