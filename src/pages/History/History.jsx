import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Grid, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material'
import DefaultButton from '../../components/Button/DefaultButton'
import DefaultIconButton from '../../components/Button/DefaultIconButton'
import DefaultTable from '../../components/Table/DefaultTable'
import apiMockup from '../../services/apiMockup'
import apiDiagram from '../../services/apiDiagram'
import DiagramDetailDialog from '../../components/Dialog/DiagramDetailDialog'
import MockupDetailDialog from '../../components/Dialog/MockupDetailDialog'

const headers = ['Nombre', 'Tipo', 'Fecha de creación', '']

const typesFile = { ALL: 'ALL', MOCKUP: 'MOCKUP', DIAGRAM: 'DIAGRAM' }

function History() {

  const [toggleSearch, setToggleSearch] = useState(false)
  const [typeFile, setTypeFile] = useState(typesFile.ALL)
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [showDiagramDetail, setShowDiagramDetail] = useState(false)
  const [showMockupDetail, setShowMockupDetail] = useState(false)
  const [mockupDetail, setMockupDetail] = useState([])
  const [diagramDetail, setDiagramDetail] = useState({tasks: [], path: ''})


  const apiContent = useCallback(
    async () => {
      let diagramas = []
      if (typeFile == typesFile.ALL || typeFile == typesFile.DIAGRAM) {
        const responseDiagram = await apiDiagram.getAll({ name })
        diagramas = responseDiagram.result.content.map((item) => ({ id: item.id, name: item.name, date: item.updatedAt, type: 'Diagrama BPMN', path: item.path, tasks: item.tasks }))
        if (responseDiagram.error) {
          return;
        }
      }
      let mockups = []
      if (typeFile == typesFile.ALL || typeFile == typesFile.MOCKUP) {
        const responseMockup = await apiMockup.getAll({ name })
        if (responseMockup.error) {
          return;
        }
        mockups = responseMockup.result.content.map((item) => ({ id: item.id, name: item.name, date: item.updatedAt, type: 'Wireframe', mockups: item.mockups }))
      }
      const infoHistory = [].concat(diagramas, mockups)
      infoHistory.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      setData(infoHistory)
    }, [name, typeFile])


  useEffect(() => {
    apiContent()
  }, [toggleSearch])

  const renderBody = (row, index) => {
    const { id, name, type, date } = row
    return (
      <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <CustomCell><Typography variant="h6" fontWeight="bold">{name}</Typography></CustomCell>
        <CustomCell><Typography variant="h6" fontWeight="bold">{type}</Typography></CustomCell>
        <CustomCell><Typography variant="h6" fontWeight="bold">{date}</Typography></CustomCell>
        <CustomCell>
          <DefaultIconButton
            onClick={() => {
              if (type == 'Diagrama BPMN'){
                setDiagramDetail({imgSrc: `https://ggi-backend-production.up.railway.app/images/${row.path}/bpmn.png`, tasks: row.tasks})
                setShowDiagramDetail(true)
              }else{
                setMockupDetail(row.mockups)
                setShowMockupDetail(true)
              }
             }} icon='detail' />
        </CustomCell>
      </TableRow>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <MockupDetailDialog open={showMockupDetail} handleClose={() => setShowMockupDetail(false)} data={mockupDetail}  />
      <DiagramDetailDialog open={showDiagramDetail} handleClose={() => setShowDiagramDetail(false)} data={diagramDetail} />
      <Header title='Historial' />
      <Grid container spacing={2}>
        <Grid item md={5.5} sm={5.25} xs={12}>
          <TextField size='small' fullWidth label="Nombre" value={name} onChange={e => setName(e.target.value)} variant="outlined" />
        </Grid>
        <Grid item md={5.5} sm={5.25} xs={12}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size='small'
            fullWidth
            value={typeFile}
            label="Tipo"
            onChange={(e) => setTypeFile(e.target.value)}
          >
            <MenuItem value={typesFile.ALL}>Todos</MenuItem>
            <MenuItem value={typesFile.DIAGRAM}>BPMN</MenuItem>
            <MenuItem value={typesFile.MOCKUP}>Wireframes</MenuItem>
          </Select>
        </Grid>
        <Grid item md={1} sm={1.5} xs={12}>
          <DefaultButton onClick={() => setToggleSearch(!toggleSearch)} label='Buscar' />
        </Grid>
      </Grid>
      <br />
      <DefaultTable
        headers={headers}
        data={data}
        renderBody={renderBody}
      />
    </Box>
  )
}

const CustomCell = (props) => {
  return (
    <TableCell align='center'>{props.children}</TableCell>
  )
}

export default History