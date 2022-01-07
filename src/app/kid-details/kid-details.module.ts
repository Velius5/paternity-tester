import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {KidDetailsPage} from './kid-details.page';
import {KidDetailsPageRoutingModule} from './kid-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    KidDetailsPageRoutingModule,
  ],
  declarations: [KidDetailsPage]
})
export class KidDetailsPageModule {}
