import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../../components/Header'
import styled from 'styled-components'

const Code = styled.code`
  background-color: #404756;
  border-radius: 5px;
  display: flex;
  color: white;
  padding: 10px;
  margin: 10px 0;
`

function Tutorial() {
  return (
    <Box sx={{ width: '100%' }}>
      <Header title='Tutorial' />
      <Box>
        <Typography variant='body1'>En esta seccion le mostraremos un video corto para generar tu codigo fuente con la ayuda de tu diagrmaa BPMN y Mockups.</Typography>
        <br />
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <video controls style={{width: '100%', maxHeight: '400px'}}>
            <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm" type="video/webm" />
          </video>
        </Box>
        <br />
        <Typography>
          Antes de poder realizar cualquier comando para iniciar tu proyecto debe tener instalado <a href="https://nodejs.org/en">Node.Js</a> validando colocando en su aplicacion de comando
        </Typography>
        <Code>node -v</Code>
        <Typography>
          Luego de tenerlo instalado puede seguir los siguientes pasos dependiendo que tipo de tecnologia esta desarrollada su aplicación.
        </Typography>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>¿Como levantar un proyecto en <b>Angular</b>?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">1. Preparando el ambiente</Typography>
            <Typography variant="body1">Primero instalemos Angular-Cli, ejecutamos:</Typography>
            <Code> npm install -g @angular/cli </Code>
            <Typography variant="body1">Esto instalará globalmente la herramienta angular-cli. Si todo salio bien, el comando “ng -v” nos
              mostrara las versiones instaladas: </Typography>
            <Code> ng -v</Code>
            <Typography variant="body1">2. Abrir el proyecto creado</Typography>
            <Typography variant="body1">Vamos al directorio en el que creamos el proyecto:</Typography>
            <Code>cd nombre-del-proyecto</Code>
            <Typography variant="body1">3. Ejecutar la aplicación</Typography>
            <Typography variant="body1">Para ver la aplicaicon en el navegador ejecutamos:</Typography>
            <Code>ng serve --open</Code>
            <Typography variant="body1">Usando la opción — open (o simplemente -o) nos abrirá automáticamente la aplicación en el navegador
              en “http: // localhost: 4200 /”</Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>¿Como levantar un proyecto en <b>React</b>?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">1. Abrir el proyecto creado</Typography>
            <Typography variant="body1">Vamos al directorio en el que creamos el proyecto:</Typography>
            <Code>cd nombre-del-proyecto</Code>
            <Typography variant="body1">2. Ejecutar la aplicación</Typography>
            <Typography variant="body1">Para ver la aplicaicon en el navegador ejecutamos:</Typography>
            <Code>npm start</Code>
            <Typography variant="body1">Se levantar la pagina web en tu navegador predeterminado</Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>¿Como iniciar rapido un proyecto en <b>VueJs</b>?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">1. Preparando el ambiente</Typography>
            <Typography variant="body1">Primero instalemos Vue-Cli, ejecutamos:</Typography>
            <Code> npm install -g @vue/cli </Code>
            <Typography variant="body1">Esto instalará globalmente la herramienta angular-cli. Si todo salio bien, el comando “vue -v” nos
              mostrara las versiones instaladas: </Typography>
            <Code> vu -v</Code>
            <Typography variant="body1">2. Abrir el proyecto creado</Typography>
            <Typography variant="body1">Vamos al directorio en el que creamos el proyecto:</Typography>
            <Code>cd nombre-del-proyecto</Code>
            <Typography variant="body1">3. Ejecutar la aplicación</Typography>
            <Typography variant="body1">Para ver la aplicaicon en el navegador ejecutamos:</Typography>
            <Code>ng run serve</Code>
            <Typography variant="body1">Una vez hemos hecho esto, tendremos arrancado un servidor de desarrollo en nuestro equipo para ver el
              proyecto en un navegador a medida que modificamos el código.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}

export default Tutorial