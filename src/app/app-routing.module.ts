import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: '**',
    component: NoPageFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
