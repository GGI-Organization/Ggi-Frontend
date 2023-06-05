import dayjs from 'dayjs';
// import * as FileSaver from 'file-saver';
import JSZip from 'jszip';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import globals from './globals';

const MySwal = withReactContent(Swal)

export const alertMessage = ({ icon, message, title }) => {
  MySwal.fire({ title: title, text: message, icon, timer: 3000, showConfirmButton: false })
}

export const guid = () => {
  let buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length,
    length = 5;

  for (var i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }
  return buf.join('');
}

const typeCom = {
  BLOCK_TEXT: 'BLOCK_TEXT',
  BUTTON: 'BUTTON',
  CHECKBOX: 'CHECKBOX',
  INPUT: 'INPUT',
  INPUT_SEARCH: 'INPUT_SEARCH',
  LABEL: 'LABEL',
  SELECT: 'SELECT',
  TABLE: 'TABLE',
  OTHER: 'OTHER'
}

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

// REACT CODE SOURCE
const countPage = ['PageOne', 'PageTwo', 'PageThree', 'PageFour', 'PageFive', 'PageSix', 'PageSeven', 'PageEight']
// Step One
const generateIndexReactPage = (pages) => {
  // page = {components: [], task : {task : "tarea 1","type" : "create","keyWord" : "registrar"}}
  let mainApp = `
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import LayoutDrawer from './pages/LayoutDrawer';
  `

  let index = 0
  for (const page of pages) {
    mainApp += `import ${countPage[index]} from './pages/${countPage[index]}';\n`;
    index++
  }

  mainApp += `

  const router = createBrowserRouter([`;

  index = 0
  for (const page of pages) {
    const path = page.task.task.trim().toLowerCase().replace(' ', '-');
    if (index == 0) {
      mainApp += `
      {
        path: "/",
        element:
          <LayoutDrawer>
            <${countPage[index]} />
          </LayoutDrawer>
      },
      {
        path: "/${path}",
        element:
          <LayoutDrawer>
            <${countPage[index]} />
          </LayoutDrawer>
      },
      `;
    } else {
      mainApp += `
      {
        path: "/${path}",
        element:
          <LayoutDrawer>
            <${countPage[index]} />
          </LayoutDrawer>
      },
      `;
    }
    index++
  }

  mainApp += `
  ]);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  `
  return mainApp
  // index.js
  // const src = zip.folder('src')
  // pages.file(`index.js`, mainApp)
}
// Step Two
const generateReactAllPages = (pages) => {
  let index = 0
  const templatePages = []
  for (const page of pages) {
    let newPage = `
    import React, { useEffect, useState } from 'react'
    import BlockText from '../components/BlockText'
    import ButtonC from '../components/Button'
    import CheckboxC from '../components/Checkbox'
    import Input from '../components/Input'
    import Label from '../components/Label'
    import SelectC from '../components/SelectC'
    import InputSearch from '../components/InputSearch'
    import TableC from '../components/TableC'
    
    const ${countPage[index]} = () => {
      return(
        <div style={{position: 'relative'}}> 
    `;

    let indexOption = 1
    for (const component of page.components) {
      switch (component.type) {
        case typeCom.BLOCK_TEXT:
          const length = parseInt((component.width / 10) * (component.height / 20))
          const blockText = `<BlockText width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} label="${lorem.substring(0, length)}" />\n`
          newPage += blockText
          break
        case typeCom.BUTTON:
          const button = `<ButtonC width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} />\n`
          newPage += button
          break
        case typeCom.CHECKBOX:
          const checkbox = `<CheckboxC width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} label='Opcion ${indexOption}' />\n`
          indexOption++
          newPage += checkbox
          break
        case typeCom.INPUT:
          const input = `<Input width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} />\n`
          newPage += input
          break
        case typeCom.INPUT_SEARCH:
          const inputSearch = `<InputSearch width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} />\n`
          newPage += inputSearch
          break
        case typeCom.LABEL:
          const label = `<Label width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} />\n`
          newPage += label
          break
        case typeCom.SELECT:
          const select = `<SelectC width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} />\n`
          newPage += select
          break
        case typeCom.TABLE:
          const table = `<TableC width={${component.width}} height={${component.height}} positionX={${component.posX}} positionY={${component.posY}} />\n`
          newPage += table
          break
        default:
          break
      }
    }
    newPage += `
        </div>
      )
    }

    export default ${countPage[index]};
    `
    index++
    templatePages.push(newPage)
  }
  return templatePages
  // pages
  // const pages = zip.folder('src/pages')
  // pages.file(`page-one(task).jsx`, templatePage)
}
// Step three
const createRouteReactFile = (pages) => {
  let routerFile = `export const routes = [`
  for (const page of pages) {
    const path = page.task.task.trim().toLowerCase().replace(' ', '-');
    routerFile += `
    {
      path: "/${path}",
      name: "${page.task.task.trim()}"
    },`;
  }
  routerFile += `]`
  return routerFile
}
// Step four
// CREATE REACT ZIP 
export const generateReactZip = (mockups) => {
  const headers = { Authorization: `Bearer ${globals.token}` }
  fetch('https://ggi-backend-production.up.railway.app/api/flow-processor/react-zip', { headers })
    // fetch('http://localhost:8080/api/flow-processor/react-zip', { headers })
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      return JSZip.loadAsync(arrayBuffer);
    })
    .then(zip => {
      // index.js
      const src = zip.folder('src')
      const indexJSX = generateIndexReactPage(mockups)
      src.file('index.js', indexJSX)
      // pages
      const pages = zip.folder('src/pages')
      let i = 0
      const pagesTemplate = generateReactAllPages(mockups)
      for (const page of pagesTemplate) {
        pages.file(`${countPage[i]}.jsx`, page)
        i++
      }
      // routes
      const routerFile = createRouteReactFile(mockups)
      const utilsFolder = zip.folder('src/utils')
      utilsFolder.file('routes.js', routerFile)
      return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    })
    .then(function (contenidoZip) {
      // Descarga del archivo zip actualizado
      const linkDescarga = document.createElement('a');
      linkDescarga.href = URL.createObjectURL(contenidoZip);
      const date = dayjs().format('DD-MM')
      linkDescarga.download = `react-project-${date}.zip`;
      linkDescarga.click();
    });
}

// VUE CODE SOURCE
// const countPage = ['PageOne', 'PageTwo', 'PageThree', 'PageFour', 'PageFive', 'PageSix', 'PageSeven', 'PageEight']
// Step One
const generateIndexVuePage = (pages) => {
  // page = {components: [], task : {task : "tarea 1","type" : "create","keyWord" : "registrar"}}
  let mainApp = `
  import { createRouter, createWebHistory } from 'vue-router'
  `

  let index = 0
  for (const page of pages) {
    mainApp += `import ${countPage[index]} from '../views/${countPage[index]}.vue';\n`;
    index++
  }

  mainApp += `

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [ 
    `;

  index = 0
  for (const page of pages) {
    const path = page.task.task.trim().toLowerCase().replace(' ', '-');
    if (index == 0) {
      mainApp += `
      {
        path: "/",
        name: "",
        component: ${countPage[index]}
      },
      {
        path: "/${path}",
        name: "${path}",
        component: ${countPage[index]}
      },
      `;
    } else {
      mainApp += `
      {
        path: "/${path}",
        name: "${path}",
        component: ${countPage[index]}
      },
      `;
    }
    index++
  }

  mainApp += `
    ]
    })

    export default router
  `
  return mainApp
  // index.js
  // const src = zip.folder('src')
  // pages.file(`index.js`, mainApp)
}
// Step Two
const generateVueAllPages = (pages) => {
  let index = 0
  const templatePages = []
  for (const page of pages) {
    let newPage = `
    <script setup>
    import BlockText from '../components/BlockText.vue'
    import ButtonC from '../components/Button.vue'
    import CheckboxC from '../components/Checkbox.vue'
    import Input from '../components/Input.vue'
    import Label from '../components/Label.vue'
    import SelectC from '../components/SelectC.vue'
    import InputSearch from '../components/InputSearch.vue'
    import TableC from '../components/TableC.vue'
    </script>
    
    <template>
      <main style="position: relative;">
    `;

    let indexOption = 1
    for (const component of page.components) {
      switch (component.type) {
        case typeCom.BLOCK_TEXT:
          const length = parseInt((component.width / 10) * (component.height / 20))
          const blockText = `<BlockText width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' label='${lorem.substring(0, length)}' />\n`
          newPage += blockText
          break
        case typeCom.BUTTON:
          const button = `<ButtonC width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' />\n`
          newPage += button
          break
        case typeCom.CHECKBOX:
          const checkbox = `<CheckboxC width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' label='Opcion ${indexOption}' />\n`
          indexOption++
          newPage += checkbox
          break
        case typeCom.INPUT:
          const input = `<Input width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' />\n`
          newPage += input
          break
        case typeCom.INPUT_SEARCH:
          const inputSearch = `<InputSearch width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' />\n`
          newPage += inputSearch
          break
        case typeCom.LABEL:
          const label = `<Label width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' />\n`
          newPage += label
          break
        case typeCom.SELECT:
          const select = `<SelectC width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' />\n`
          newPage += select
          break
        case typeCom.TABLE:
          const table = `<TableC width='${component.width}' height='${component.height}' positionX='${component.posX}' positionY='${component.posY}' />\n`
          newPage += table
          break
        default:
          break
      }
    }
    newPage += `
        </main>
    </template>
    `
    index++
    templatePages.push(newPage)
  }
  return templatePages
  // pages
  // const pages = zip.folder('src/pages')
  // pages.file(`page-one(task).jsx`, templatePage)
}
// Step three
const generateAppVueDrawer = (pages) => {
  let app = `
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" class="q-mr-md" />
        <q-toolbar-title>
          Mi Aplicación
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="600" :content-class="'bg-grey-2'">
      <q-list>
        <q-item clickable v-for="item in menuItems" :key="item.label" @click="navigateTo(item.route)">
          <q-item-section>
            <q-item-label>
              {{ item.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        `
  for (const page of pages) {
    const path = page.task.task.trim().toLowerCase().replace(' ', '-');
    app += `
            {
              route: "/${path}",
              label: "${path}",
            },
            `;
  }
  app += `
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.drawer = false;
    },
  },
};
</script>
`
  return app
}
// Step four
// CREATE VUE ZIP 
export const generateVueZip = (mockups) => {
  const headers = { Authorization: `Bearer ${globals.token}` }
  fetch('https://ggi-backend-production.up.railway.app/api/flow-processor/vue-zip', { headers })
    // fetch('http://localhost:8080/api/flow-processor/vue-zip', { headers })
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      return JSZip.loadAsync(arrayBuffer);
    })
    .then(zip => {
      // index.js
      const router = zip.folder('src/router')
      const indexJSX = generateIndexVuePage(mockups)
      router.file('index.js', indexJSX)
      // app.vue
      const src = zip.folder('src')
      const appvue = generateAppVueDrawer(mockups)
      src.file('App.vue', appvue)
      // pages
      const pages = zip.folder('src/views')
      let i = 0
      const pagesTemplate = generateVueAllPages(mockups)
      for (const page of pagesTemplate) {
        pages.file(`${countPage[i]}.vue`, page)
        i++
      }
      return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    })
    .then(function (contenidoZip) {
      // Descarga del archivo zip actualizado
      const linkDescarga = document.createElement('a');
      linkDescarga.href = URL.createObjectURL(contenidoZip);
      const date = dayjs().format('DD-MM')
      linkDescarga.download = `vue-project-${date}.zip`;
      linkDescarga.click();
    });
}

// ANGULAR CODE SOURCE
// Step One
// Create routing file
const generateAngularRouting = (pages) => {
  // page = {components: [], task : {task : "tarea 1","type" : "create","keyWord" : "registrar"}}
  let mainApp = `
  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
  `

  let index = 0
  for (const page of pages) {
    mainApp += `import { ${countPage[index]}Component } from './pages/${countPage[index]}/${countPage[index]}.component';`
    index++
  }

  mainApp += `

  const routes: Routes = [
    {
      path: '',
      children: [
    `;

  index = 0
  for (const page of pages) {
    const path = page.task.task.trim().toLowerCase().replace(' ', '-');
    if (index == 0) {
      mainApp += `
      { path: '${path}', component: ${countPage[index]}Component },
      { path: '', redirectTo: '${path}'},      
      `;
    } else {
      mainApp += `
      { path: '${path}', component: ${countPage[index]}Component },
      `;
    }
    index++
  }

  mainApp += `
    ],
    },
  ];

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
  })
  export class AppRoutingModule { }
  `
  return mainApp
}
// Step Two
// Create main html 
const generateAngularMainHTML = (pages) => {
  let main = `
  <mat-sidenav-container>

    <mat-sidenav mode="side" opened="">
      <h1 class="sidenav-header">Mi Aplicación</h1>
      <mat-nav-list>`

  let index = 0
  for (const page of pages) {
    const path = page.task.task.trim().toLowerCase().replace(' ', '-');

    main += `
    <mat-list-item routerLink="${path}">
      <div matListItemTitle>${path}</div>
    </mat-list-item>
    `;
    index++
  }
  main += `
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content style="background-color: white;">
      <router-outlet></router-outlet>
    </mat-sidenav-content>

  </mat-sidenav-container>
  `
  return main
}
// Step three
// Create pages angular

const getAngularHTML = (page) => {
  let newPage = `
  <div style="width: 100%;height: 100vh;position: relative;">
  `;

  let indexOption = 1
  for (const component of page.components) {
    switch (component.type) {
      case typeCom.BLOCK_TEXT:
        const length = parseInt((component.width / 10) * (component.height / 20))
        const blockText =
          `
        <div style="position: absolute; width: ${component.width}px;height: ${component.height}px;left: ${component.posX}px;top: ${component.posY}px;">
          <p class="h6">${lorem.substring(0, length)}</p>
        </div>
        `
        newPage += blockText
        break
      case typeCom.BUTTON:
        const button =
          `
        <button style="position: absolute;left: ${component.posX}px;top: ${component.posY}px;" mat-raised-button color="primary">Boton</button>
        `
        newPage += button
        break
      case typeCom.CHECKBOX:
        const checkbox =
          `
        <div style="style="position: absolute;left: ${component.posX}px;top: ${component.posY}px;">
          <mat-checkbox class="example-margin">Opcion ${indexOption}</mat-checkbox>
        <div/>
        `
        indexOption++
        newPage += checkbox
        break
      case typeCom.INPUT:
        const input =
          `
        <mat-form-field style="position: absolute;left: ${component.posX}px;top: ${component.posY}px;width:${component.width}px">
          <mat-label>Ingrese texto</mat-label>
          <input matInput>
        </mat-form-field>
        `
        newPage += input
        break
      case typeCom.INPUT_SEARCH:
        const inputSearch =
          `
        <mat-form-field appearance="outline" style="position: absolute;left: ${component.posX}px;top: ${component.posY}px;width:${component.width}px">
          <mat-icon matPrefix>search</mat-icon>
          <mat-label>Ingrese texto</mat-label>
          <input matInput>
        </mat-form-field>
        `
        newPage += inputSearch
        break
      case typeCom.LABEL:
        const label =
          `
        <p style="position: absolute;left: ${component.posX}px;top: ${component.posY}px;" class="h5">Titulo</p>
        `
        newPage += label
        break
      case typeCom.SELECT:
        const select =
          `
        <mat-form-field style="position: absolute;left: ${component.posX}px;top: ${component.posY}px;width:${component.width}px">
          <mat-label>Seleccione</mat-label>
          <mat-select>
            <mat-option value="one">Opcion 1</mat-option>
            <mat-option value="two">Opcion 2</mat-option>
          </mat-select>
        </mat-form-field>
        `
        newPage += select
        break
      case typeCom.TABLE:
        const table = `
        <div style="position: absolute; width: ${component.width}px;height: ${component.height}px;left: ${component.posX}px;top: ${component.posY}px;overflow-x: auto;">
          <table style="overflow-y: auto;" mat-table [dataSource]="dataSource" class="mat-elevation-z8">
              <!--- Note that these columns can be defined in any order.
                The actual rendered columns are set as a property on the row definition" -->
        
              <!-- Position Column -->
              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef> No. </th>
                <td mat-cell *matCellDef="let element"> {{element.position}} </td>
              </ng-container>
        
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> Name </th>
                <td mat-cell *matCellDef="let element"> {{element.name}} </td>
              </ng-container>
        
              <!-- Weight Column -->
              <ng-container matColumnDef="weight">
                <th mat-header-cell *matHeaderCellDef> Weight </th>
                <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
              </ng-container>
        
              <!-- Symbol Column -->
              <ng-container matColumnDef="symbol">
                <th mat-header-cell *matHeaderCellDef> Symbol </th>
                <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
              </ng-container>
        
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        `
        newPage += table
        break
      default:
        break
    }
  }
  newPage += `
      </div>
  `
  return newPage
}
const getAngularComponent = (mockup, index) => {
  let page = ``
  let components = mockup.components
  if (components.some(e => e.type === typeCom.TABLE)) {
    page =
      `
    import { Component } from '@angular/core';
    export interface PeriodicElement {
      name: string;
      position: number;
      weight: number;
      symbol: string;
    }

    const ELEMENT_DATA: PeriodicElement[] = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ];

    @Component({
      selector: 'app-page${index++}',
      templateUrl: './${countPage[index]}.component.html',
      styleUrls: ['../layout.component.css'],
    })
    export class ${countPage[index]}Component {
      displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
      dataSource = ELEMENT_DATA;
    }
  `
  } else {
    page =
      `
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-page2',
      templateUrl: './${countPage[index]}.component.html',
      styleUrls: ['../layout.component.css']
    })
    export class ${countPage[index]}Component {
    }
    `
  }
  return page
}

const generateAngularPagesFromMockups = (zip, pages) => {

  let index = 0
  for (const page of pages) {
    // const path = page.task.task.trim().toLowerCase().replace(' ', '-');
    const pages = zip.folder(`src/app/pages/${countPage[index]}`)
    const file = getAngularHTML(page)
    pages.file(`${countPage[index]}.component.html`, file)
    const component = getAngularComponent(page, index)
    pages.file(`${countPage[index]}.component.ts`, component)
    index++
  }

}

// Step four
const generateAngularAppModule = (zip, pages) => {
  let mainApp =
    `
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  // Angular Material Components
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { MatIconModule } from '@angular/material/icon';
  import { MatListModule } from '@angular/material/list';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatTableModule } from '@angular/material/table';
  import {MatSelectModule} from '@angular/material/select';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { MatInputModule } from '@angular/material/input';
  import {MatCheckboxModule} from '@angular/material/checkbox';
  `
  let index = 0
  for (const page of pages) {
    mainApp += `import { ${countPage[index]}Component } from './pages/${countPage[index]}/${countPage[index]}.component';`
    index++
  }

  mainApp += `

  @NgModule({
    declarations: [
      AppComponent,
      `
  index = 0
  for (const page of pages) {
    mainApp += ` ${countPage[index]}Component,`
    index++
  }
  mainApp += `
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      // Material
      MatButtonModule,
      MatCardModule,
      MatSelectModule,
      MatIconModule,
      MatListModule,
      MatSidenavModule,
      MatTableModule,
      MatToolbarModule,
      MatInputModule,
      MatCheckboxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  `
  const pathMainModule = zip.folder('src/app')
  pathMainModule.file('app.module.ts', mainApp)
}

// Step five
// CREATE Angular ZIP 
export const generateAngularZip = (mockups) => {
  const headers = { Authorization: `Bearer ${globals.token}` }
  fetch('https://ggi-backend-production.up.railway.app/api/flow-processor/angular-zip', { headers })
    // fetch('http://localhost:8080/api/flow-processor/angular-zip', { headers })
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      return JSZip.loadAsync(arrayBuffer);
    })
    .then(zip => {
      // 1. routing
      const routing = generateAngularRouting(mockups)
      const pathRouting = zip.folder('src/app')
      pathRouting.file('app-routing.module.ts', routing)
      // 2. tamplate drawer
      const drawer = generateAngularMainHTML(mockups)
      const pathDrawer = zip.folder('src/app')
      pathDrawer.file('app.component.html', drawer)
      // 3. pages 
      generateAngularPagesFromMockups(zip, mockups)
      // 4. main module
      generateAngularAppModule(zip, mockups)
      return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    })
    .then(function (contenidoZip) {
      // Descarga del archivo zip actualizado
      const linkDescarga = document.createElement('a');
      linkDescarga.href = URL.createObjectURL(contenidoZip);
      const date = dayjs().format('DD-MM')
      linkDescarga.download = `angular-project-${date}.zip`;
      linkDescarga.click();
    });
}