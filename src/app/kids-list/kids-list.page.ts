import { Component } from '@angular/core';
import {StorageKey, StorageService} from '../services/storage.service';

@Component({
  selector: 'app-kids-list',
  templateUrl: 'kids-list.page.html',
  styleUrls: ['kids-list.page.scss']
})
export class KidsListPage {
  // eyeColorTestPercentage: number;

  constructor(private storageService: StorageService) {
    // storageService.get(StorageKey.EYE_COLOR_TEST_PERCENTAGE).then(value => this.eyeColorTestPercentage = value);
  }

}
