import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn.then(loggedIn => {
      if(loggedIn) {
        this.router.navigate(['menu']);
      } else {
        this.router.navigate(['login']);
      }
    })
  }

}
