import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  opened: boolean = true;
  menuItems: any[] = [];

  constructor( private sidebarService: SidebarService ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }
}
