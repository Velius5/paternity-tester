import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KidDetailsPage} from './kid-details.page';

const routes: Routes = [
  {
    path: '',
    component: KidDetailsPage
  },
  {
    path: 'eye-color-test',
    loadChildren: () => import('./eye-color-test/eye-color-test.module').then(m => m.EyeColorTestPageModule)
  },
  {
    path: 'hair-color-test',
    loadChildren: () => import('./hair-color-test/hair-color-test.module').then(m => m.HairColorTestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class KidDetailsPageRoutingModule {}
