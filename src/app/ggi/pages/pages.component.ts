import { Component } from '@angular/core';

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
      background-color: red;
    }
    `
  ]
})
export class PagesComponent {
  opened = false;
}
