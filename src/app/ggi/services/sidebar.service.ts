import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      redirectTo: '/dashboard'
    },
    {
      title: 'Profile',
      icon: 'person',
      redirectTo: 'profile'
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      redirectTo: 'notifications'
    },
    {
      title: 'Tutorial',
      icon: 'play_circle',
      redirectTo: 'tutorial'
    },
    {
      title: 'History',
      icon: 'history',
      redirectTo: 'history'
    },
  ];

  constructor() { }
}
