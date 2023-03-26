import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GgiRoutingModule } from './ggi-routing.module';
import { MaterialModule } from '../material/material.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistoryComponent } from './pages/history/history.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
    NotificationsComponent,
    PagesComponent,
    ProfileComponent,
    SideNavComponent,
    ToolbarComponent,
    TutorialComponent
  ],
  imports: [
    CommonModule,
    GgiRoutingModule,
    MaterialModule
  ]
})
export class GgiModule { }
