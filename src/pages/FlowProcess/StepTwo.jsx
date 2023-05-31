import { Alert, AlertTitle, Box, Button, Card, CardContent, Container, Grid, IconButton, Snackbar, Stack, TextField, Typography, useTheme } from "@mui/material"
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { tokens } from "../../theme";
import { useContext } from "react";
import { FlowContext } from "./Dashboard";
import { useEffect, useState, useRef } from "react";
import ImagePreview from "../../components/Dialog/ImagePreview";
import NewTaskDialog from "../../components/Dialog/NewTaskDialog";
import { alertMessage, guid } from "../../utils/functions";
import apiFlowProcessor from "../../services/apiFlowProcessor";
import LoadingDialog from "../../components/Dialog/LoadingDialog";
import WirefrimeInfoDialog from "../../components/Dialog/WirefrimeInfoDialog";


const StepTwo = ({ setStep }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, updateData } = useContext(FlowContext)
  const [mockups, setMockups] = useState([])
  const fileRef = useRef(null)
  const [idRequest, setIdRequest] = useState(null)
  const [showImg, setShowImg] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [showTask, setShowTask] = useState(false)
  const [showRequiredImg, setShowRequiredImg] = useState(false)
  const [showLimitTask, setShowLimitTask] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showEmptyTask, setShowEmptyTask] = useState(false)
  const [showNameEmptyTask, setShowNameEmptyTask] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  // initial task from step one
  useEffect(() => {
    const initData = () => {
      const initMockups = data.tasks.map((item) => ({ ...item, mockup: null, uri: '' }))
      setMockups(initMockups)
    }
    initData()
  }, [])

  // Mockup Image Request
  const requesMockupImage = (id) => {
    setIdRequest(id)
    fileRef.current.click()
  }

  const saveMockupImage = (e) => {
    const file = e.target.files[0]
    const newMockups = mockups.map((item) => {
      if (item.id == idRequest) {
        item.mockup = file
        item.uri = URL.createObjectURL(file)
        return ({ ...item, mockup: file, uri: URL.createObjectURL(file) })
      } else {
        return item
      }
    })
    setMockups([...newMockups])
  }

  // Mockup Image Preview 
  const handleImagePreview = (image) => {
    setImagePreview(image)
    setShowImg(true)
  }

  // Add new task
  const addTask = (value = '') => {
    // if (value.trim() === '') {
    //   setShowTask(false)
    //   return
    // }
    if (mockups.length === 8) {
      setShowLimitTask(true)
      return
    }
    setMockups(pre => [...pre, { task: '', uri: '', mockup: null, id: guid(), tyep: '', keyWord: '' }])
    // setShowTask(false)
  }

  // Delete task
  const deleteRow = (id) => {
    const newMockups = mockups.filter(item => item.id !== id)
    setMockups([...newMockups])
  }

  // Process Mockups 
  const processMockups = async () => {
    if (mockups.length === 0) {
      setShowEmptyTask(true)
      return
    }
    if (mockups.length > 8) {
      setShowLimitTask(true)
      return
    }
    if (mockups.some((item) => item.uri === '')) {
      setShowRequiredImg(true)
      return
    }
    if (mockups.some((item) => item.task.trim() === '')) {
      setShowNameEmptyTask(true)
      return
    }
    setShowLoading(true)
    const images = mockups.map((item) => item.mockup)
    const tasks = mockups.map((item) => ({ task: item.task, type: item.type, keyWord: item.keyWord }))
    const response = await apiFlowProcessor.mockupsComponents({ files: images, tasks: JSON.stringify({ tasks }) })
    if (response.error === true) {
      setShowLoading(false)
      alertMessage({ icon: 'error', message: 'Ocurrio un error en los servicios, por favor intentelo nuevamente.', title: 'Oh no' })
      return
    }
    setShowLoading(false)
    updateData({ ...data, mockups: response.result.mockups, pathMockupGroup: response.result.path })
    setStep('three')
  }

  const handleChangeTask = (id, value) => {
    let copyMockups = mockups
    copyMockups = copyMockups.map((item) => {
      if (item.id == id) {
        item.task = value
      }
      return item
    })
    setMockups([...copyMockups])
  }

  const styleCell = { borderBottom: 0 }
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    }}>
      <LoadingDialog open={showLoading} />
      <WirefrimeInfoDialog open={showInfo} handleClose={() => setShowInfo(false)} />
      {/* <NewTaskDialog open={showTask} handleClose={() => setShowTask(false)} addTask={addTask} /> */}
      <ImagePreview open={showImg} handleClose={() => setShowImg(false)} imgSrc={imagePreview} />
      <input ref={fileRef} onChange={saveMockupImage} hidden type="file" accept=".jpg,.jpeg,.png" />
      <Typography align="center" variant="h1" fontWeight='bold'>PASO 2 de 3: Sube tus imágenes de wireframes</Typography>
      <Card>
        <CardContent>
          <Snackbar open={showLimitTask} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setShowLimitTask(false)}>
            <Alert onClose={() => setShowLimitTask(false)} severity="error" sx={{ width: '100%', mt: 7 }}>
              El maximo de tareas a procesar es de <strong>8 tareas.</strong>.
            </Alert>
          </Snackbar>
          <Snackbar open={showNameEmptyTask} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setShowLimitTask(false)}>
            <Alert onClose={() => setShowNameEmptyTask(false)} severity="error" sx={{ width: '100%', mt: 7 }}>
              Todas las <strong>tareas</strong> tienen que tener su nombre.
            </Alert>
          </Snackbar>
          <Snackbar open={showEmptyTask} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setShowEmptyTask(false)}>
            <Alert onClose={() => setShowEmptyTask(false)} severity="info" sx={{ width: '100%', mt: 7 }}>
              Debe tener por lo menos una tarea registrada.
            </Alert>
          </Snackbar>
          <Snackbar open={showRequiredImg} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setShowRequiredImg(false)}>
            <Alert onClose={() => setShowRequiredImg(false)} severity="info" sx={{ width: '100%', mt: 7 }}>
              Debe subir todas las <strong>imágenes de los wireframes</strong>.
            </Alert>
          </Snackbar>
          <Typography align="justify" variant="h5">De tu diagrama BPMN hemos detectado diferentes tareas que están relacionados con el desarrollo web, por favor sube los wireframes relacionado con las tareas correspondientes.</Typography>
          <Typography variant="h5">Para ver los componentes entrenados para generar pagina web haga click <a href="#" onClick={() => setShowInfo(true)} style={{ cursor: 'pointer', fontWeight: 'bold', textDecorationLine:'none', color: 'black' }}>aqui</a></Typography>
          <br />
          <TableContainer>
            <Table sx={{ minWidth: 'auto' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={styleCell} align="center">
                    <Typography fontWeight='bold' variant="h5">Tareas Detectadas</Typography>
                  </TableCell>
                  <TableCell style={styleCell} align="center">
                    <Typography fontWeight='bold' variant="h5">Wireframes</Typography>
                  </TableCell>
                  <TableCell style={styleCell} align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockups.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={styleCell} align="center">
                      <TextField value={row.task} onChange={(e) => handleChangeTask(row.id, e.target.value)} id={row.id} variant="outlined" />
                      {/* <Typography variant="body1" fontWeight='bold'>
                        {row.task.trim()}
                      </Typography> */}
                    </TableCell>
                    <TableCell style={styleCell} align="center">
                      <Stack spacing={1}>
                        <Button onClick={() => requesMockupImage(row.id)} variant="contained">
                          <Typography variant="h6">Subir Wireframe</Typography>
                        </Button>
                        {
                          row.uri != '' &&
                          (
                            <Button onClick={() => handleImagePreview(row.uri)} variant="contained">
                              <Typography variant="h6">Mostrar Wireframe</Typography>
                            </Button>
                          )
                        }
                      </Stack>
                    </TableCell>
                    <TableCell onClick={() => deleteRow(row.id)} style={styleCell} align="center">
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            // spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent='space-between'
            gap={2}
          >
            <Button onClick={() => setStep('one')} variant="contained" startIcon={<ChevronLeftOutlinedIcon />} sx={{ textTransform: 'none' }}>
              <Typography variant="h6">Regresar</Typography>
            </Button>
            <Button variant="contained" onClick={() => addTask()} startIcon={<AddOutlinedIcon />} sx={{ textTransform: 'none' }}>
              <Typography variant="h6">Agregar</Typography>
            </Button>
            <Button variant="contained" onClick={processMockups} endIcon={<ChevronRightOutlinedIcon />} sx={{ textTransform: 'none' }}>
              <Typography variant="h6">Continuar</Typography>
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default StepTwo