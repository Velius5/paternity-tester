import {Component, OnInit} from '@angular/core';
import {StorageKey, StorageService} from '../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {KidsService} from '../services/kids.service';
import {Kid} from '../model/kid';

@Component({
  selector: 'app-kid-details',
  templateUrl: 'kid-details.page.html',
  styleUrls: ['kid-details.page.scss']
})
export class KidDetailsPage implements OnInit{
  kid: Kid;

  constructor(public kidsService: KidsService,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      const kidId = paramMap.get('id');
      this.kidsService.getKidById(kidId).then(k => {
        console.log(k);
        this.kid = k;
      });
    });
  }

}
