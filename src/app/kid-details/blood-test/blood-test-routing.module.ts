import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BloodTestPage} from './blood-test.page';


const routes: Routes = [
  {
    path: '',
    component: BloodTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodTestPageRoutingModule {}
