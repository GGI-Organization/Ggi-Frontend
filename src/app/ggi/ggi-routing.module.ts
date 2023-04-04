import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GgiRoutingModule { }
