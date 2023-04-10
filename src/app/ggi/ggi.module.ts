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
import { UploadMockupsComponent } from './pages/upload-mockups/upload-mockups.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { UploadBpmnComponent } from './pages/upload-bpmn/upload-bpmn.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
    NotificationsComponent,
    PagesComponent,
    ProfileComponent,
    TutorialComponent,
    UploadMockupsComponent,
    GeneratorComponent,
    UploadBpmnComponent
  ],
  imports: [
    CommonModule,
    GgiRoutingModule,
    MaterialModule
  ],
  exports: [
    DashboardComponent,
    HistoryComponent,
    NotificationsComponent,
    PagesComponent,
    ProfileComponent,
    TutorialComponent,
    UploadMockupsComponent,
    GeneratorComponent,
    UploadBpmnComponent
  ]
})
export class GgiModule { }
