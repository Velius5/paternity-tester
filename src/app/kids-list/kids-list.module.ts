import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KidsListPage } from './kids-list.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { KidsListRoutingModule } from './kids-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    KidsListRoutingModule
  ],
  declarations: [
    KidsListPage
  ]
})
export class KidsListPageModule {}
