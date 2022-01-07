import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EyeColorTestPage } from './eye-color-test.page';

const routes: Routes = [
  {
    path: '',
    component: EyeColorTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EyeColorTestPageRoutingModule {}
