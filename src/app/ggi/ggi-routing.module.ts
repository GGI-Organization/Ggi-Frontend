import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HistoryComponent } from "./pages/history/history.component";
import { NotificationsComponent } from "./pages/notifications/notifications.component";
import { PagesComponent } from "./pages/pages.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'history', component: HistoryComponent, data: { title: 'History' } },
      { path: 'notifications', component: NotificationsComponent, data: { title: 'Notifications' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
      { path: 'tutorial', component: TutorialComponent, data: { title: 'Tutorial' } },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GgiRoutingModule { }
