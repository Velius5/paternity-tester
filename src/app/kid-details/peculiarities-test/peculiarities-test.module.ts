import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {PeculiaritiesTestPageRoutingModule} from './peculiarities-test-routing.module';
import {PeculiaritiesTestPage} from './peculiarities-test.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeculiaritiesTestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PeculiaritiesTestPage]
})
export class PeculiaritiesTestPageModule {}
