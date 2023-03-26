import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GgiRoutingModule } from './ggi-routing.module';
import { MaterialModule } from '../material/material.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistoryComponent } from './pages/history/history.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
    NotificationsComponent,
    PagesComponent,
    ProfileComponent,
    TutorialComponent
  ],
  imports: [
    CommonModule,
    GgiRoutingModule,
    MaterialModule
  ]
})
export class GgiModule { }
