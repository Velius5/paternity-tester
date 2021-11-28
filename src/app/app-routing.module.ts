import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TutorialComponent} from "./tutorial/tutorial.component";
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./kid-details/kid-details.module').then(m => m.KidDetailsPageModule)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
  },
  {
    path: '**',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
