import { NgModule } from '@angular/core';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule
  ]
})
export class MaterialModule { }
