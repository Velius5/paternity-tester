import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {StorageKey, StorageService} from "../services/storage.service";

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

  constructor(private authService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.storageService.getObject(StorageKey.User).then(loggedUser => {
      if(loggedUser) {
        this.router.navigate(['menu']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

}
