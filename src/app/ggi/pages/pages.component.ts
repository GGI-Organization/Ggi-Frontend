import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
    `
    mat-sidenav-container {
      height: calc(205vh - 115vh);
    }

    mat-sidenav {
      width: 200px;
    }
    `
  ]
})
export class PagesComponent implements OnInit {
  opened = false;
  menuItems: any[] = [];

  constructor( private sidebarService: SidebarService ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }
}
