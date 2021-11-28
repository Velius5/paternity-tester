import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KidDetailsPage} from './kid-details.page';

const routes: Routes = [
  {
    path: '',
    component: KidDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class KidDetailsPageRoutingModule {}
