import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GgiRoutingModule } from './ggi-routing.module';
import { MaterialModule } from '../material/material.module';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { HistoryComponent } from './pages/history/history.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProfileComponent,
    NotificationsComponent,
    TutorialComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    GgiRoutingModule,
    MaterialModule
  ]
})
export class GgiModule { }
