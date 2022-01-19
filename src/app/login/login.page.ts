import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {StorageKey, StorageService} from '../services/storage.service';
import {KidsService} from '../services/kids.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public storageService: StorageService,
    private kidsService: KidsService
  ) {}

  ngOnInit() {
    this.storageService.get(StorageKey.User).then(user => {
      if(user) {
        this.router.navigate(['menu']);
      }
    });
  }

  login(email, password) {
    this.authService.login(email.value, password.value)
      .then((res) => {
        this.router.navigate(['tutorial']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
