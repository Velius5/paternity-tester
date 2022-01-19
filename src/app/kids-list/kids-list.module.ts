import {IonDatetime, IonicModule} from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { KidsListPage } from './kids-list.page';

import { KidsListRoutingModule } from './kids-list-routing.module';
import {AddKidModalComponent} from './add-kid-modal/add-kid-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    KidsListRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    KidsListPage,
    AddKidModalComponent
  ]
})
export class KidsListPageModule {}
