import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
    `
    mat-sidenav-container {
      height: 100vh;
    }

    mat-sidenav {
      width: 200px;
    }

    .sidenav-header {
      margin: 22px 0 20px 16px;
    }
    h1 {
      color: black;
      font-size: 32px;
      font-weight: bold;
    }
    `
  ]
})
export class PagesComponent implements OnInit {
  menuItems: any[] = [];

  constructor( private sidebarService: SidebarService ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }
}
