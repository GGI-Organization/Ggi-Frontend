import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { GeneratorComponent } from "./pages/generator/generator.component";
import { HistoryComponent } from "./pages/history/history.component";
import { NotificationsComponent } from "./pages/notifications/notifications.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";
import { UploadBpmnComponent } from "./pages/upload-bpmn/upload-bpmn.component";
import { UploadMockupsComponent } from './pages/upload-mockups/upload-mockups.component';

const childRoutes: Routes = [
  { path: 'history', component: HistoryComponent, data: { title: 'History' } },
  { path: 'notifications', component: NotificationsComponent, data: { title: 'Notifications' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'tutorial', component: TutorialComponent, data: { title: 'Tutorial' } },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: UploadBpmnComponent, data: { title: 'Upload BPMN'} },
      { path: 'upload-mockups', component: UploadMockupsComponent, data: { title: 'Upload Mockups'} },
      { path: 'generator', component: GeneratorComponent, data: { title: 'Generator' } },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
