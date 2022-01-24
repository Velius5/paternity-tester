import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {BloodTestPageRoutingModule} from './blood-test-routing.module';
import {BloodTestPage} from './blood-test.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodTestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BloodTestPage]
})
export class BloodTestPageModule {}
