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
  import Layout from './pages/Layout';
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
          <Layout>
            <${countPage[index]} />
          </Layout>
      },
      {
        path: "/${path}",
        element:
          <Layout>
            <${countPage[index]} />
          </Layout>
      },
      `;
    } else {
      mainApp += `
      {
        path: "/${path}",
        element:
          <Layout>
            <${countPage[index]} />
          </Layout>
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