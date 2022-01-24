import { Component } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private backButton;

  constructor(public authService: AuthenticationService,
              private platform: Platform) {}

  ionViewDidEnter() {
    this.backButton = this.platform.backButton.observers.pop();
  }

  ionViewWillLeave() {
    this.platform.backButton.observers.push(this.backButton);
  }

}
