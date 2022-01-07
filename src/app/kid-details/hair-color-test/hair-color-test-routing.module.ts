import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HairColorTestPage } from './hair-color-test.page';

const routes: Routes = [
  {
    path: '',
    component: HairColorTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HairColorTestPageRoutingModule {}
