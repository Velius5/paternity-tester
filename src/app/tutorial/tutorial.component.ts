import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  public navigateToLogin() {
    this.router.navigate(['/menu']);
  }

}
