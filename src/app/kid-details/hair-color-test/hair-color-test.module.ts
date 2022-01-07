import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HairColorTestPageRoutingModule } from './hair-color-test-routing.module';

import { HairColorTestPage } from './hair-color-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HairColorTestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HairColorTestPage]
})
export class HairColorTestPageModule {}
