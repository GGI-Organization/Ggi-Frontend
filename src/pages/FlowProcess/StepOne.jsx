import React, { useContext } from 'react'
import { Box, Button, IconButton, Stack, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme";
import { useRef, useState } from "react";
import ImagePreview from "../../components/Dialog/ImagePreview";
import apiFlowProcessor from '../../services/apiFlowProcessor';
import { FlowContext } from './Dashboard';
import { alertMessage, guid } from '../../utils/functions'
import LoadingDialog from '../../components/Dialog/LoadingDialog';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BPMNInfoDialog from '../../components/Dialog/BPMNInfoDialog';

const StepOne = ({ setStep }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, updateData } = useContext(FlowContext)

  const fileRef = useRef(null)
  const [imageBPMN, setImageBPMN] = useState(null)
  const [imgSrc, setImgSrc] = useState('')
  const [showImg, setShowImg] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const requestBPMNImage = () => {
    fileRef.current.click()
  }

  const getBPMNImage = async (e) => {
    const file = e.target.files[0]
    setImageBPMN(file)
    setImgSrc(URL.createObjectURL(file))
  }

  const processBPMN = async () => {
    setShowLoading(true)
    const response = await apiFlowProcessor.bpmnTasks({ files: [imageBPMN] })
    if (response.error === true) {
      setShowLoading(false)
      alertMessage({ icon: 'error', message: 'Ocurrio un error en los servicios, por favor intentelo nuevamente.', title: 'Oh no' })
      return
    }
    const tasks = response.result.tasks.map((item) => ({ ...item, id: guid() }))
    setShowLoading(false)
    updateData({ tasks: [...tasks], pathDiagramBPMN: response.result.path })
    setStep('two')
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1.5,
      flex: 1,
      textAlign: 'center'
    }}>
      <BPMNInfoDialog open={showInfo} handleClose={() => setShowInfo(false)} /> 
      <LoadingDialog open={showLoading} />
      <input ref={fileRef} onChange={getBPMNImage} hidden type="file" accept=".jpg,.jpeg,.png" />
      <Typography variant="h1" fontWeight='bold'>Generador de Interfaces Gráficas</Typography>
      <Typography variant="h3">Convierte tu diagrama BPMN junto a tus wireframes en una interfaz gráfica</Typography>
      <Stack flexDirection='row' gap={1} display='flex' >
        <Typography variant="h1" fontWeight='bold'>PASO 1 de 3: Sube tu imagen BPMN</Typography>
        <IconButton onClick={() => setShowInfo(true)} aria-label="delete" size="large">
          <InfoOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Button
        // color='primary'
        style={{ background: colors.greenAccent[600] }}
        onClick={() => requestBPMNImage()}
        size="large"
        variant="contained"
        sx={{ textTransform: 'none', width: '300px', paddingY: '10px' }}>
        <Typography variant="h3" fontWeight='bold'>Subir BPMN</Typography>
      </Button>
      {imgSrc != '' && (
        <React.Fragment>
          <Button
            onClick={() => setShowImg(true)}
            variant="contained"
            sx={{ textTransform: 'none', width: '300px', paddingY: '10px' }}>
            <Typography variant="h3" fontWeight='bold'>Mostrar Imagen</Typography>
          </Button>
          <ImagePreview open={showImg} handleClose={() => setShowImg(false)} imgSrc={imgSrc} />
          <Button variant="contained" onClick={processBPMN}
            sx={{ textTransform: 'none', width: '300px', paddingY: '10px' }}>
            <Typography variant="h3" fontWeight='bold'>Continuar</Typography>
          </Button>
        </React.Fragment>
      )}
    </Box>
  )
}

export default StepOne