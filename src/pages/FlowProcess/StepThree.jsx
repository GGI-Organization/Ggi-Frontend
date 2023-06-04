import { Box, Button, Radio, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../theme";
import { alertMessage, generateAngularZip, generateReactZip, generateVueZip } from "../../utils/functions";
import { FlowContext } from "./Dashboard";
import ProjectDialog from "../../components/Dialog/ProjectDialog";
import apiFlowProcessor from "../../services/apiFlowProcessor";
import LoadingDialog from "../../components/Dialog/LoadingDialog";

const technologies = {
  REACT: 'react',
  ANGULAR: 'angular',
  VUE: 'vue'
}

const StepThree = () => {

  const theme = useTheme();
  const [tec, setTec] = useState(technologies.REACT)
  const colors = tokens(theme.palette.mode);
  const { data, updateData } = useContext(FlowContext)
  const [isSavedInfo, setIsSavedInfo] = useState(false)
  const [showNameRequest, setShowNameRequest] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  const handleChange = (event) => {
    setTec(event.target.value);
  };

  const saveNameProject = async (name) => {
    setShowLoading(true)
    const response = await apiFlowProcessor.saveProject({ name, pathDiagramBPMN: data.pathDiagramBPMN, pathMockupGroup: data.pathMockupGroup })
    if (response.error === true) {
      setShowLoading(false)
      setShowNameRequest(false)
      alertMessage({ icon: 'error', message: 'Ocurrio un error en los servicios, por favor intentelo nuevamente.', title: 'Oh no' })
      return
    }
    setShowLoading(false)
    setShowNameRequest(false)
    setIsSavedInfo(true)
    getProjectZip()
  }

  const getProjectZip = () => {
    switch (tec) {
      default:
      case technologies.REACT:
        generateReactZip(data.mockups)
        break;
      case technologies.VUE:
        generateVueZip(data.mockups)
        break;
      case technologies.ANGULAR:
        generateAngularZip(data.mockups)
        break;
    }
  }

  const handTect = () => {
    if (!isSavedInfo) {
      setShowNameRequest(true)
    } else {
      getProjectZip()
    }
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
      <LoadingDialog open={showLoading} />
      <ProjectDialog open={showNameRequest} handAccept={saveNameProject} handleClose={() => { setShowNameRequest(false) }} />
      <Typography variant="h1" fontWeight='bold'>PASO 3 de 3: Elija la tecnología</Typography>
      <Typography variant="h3">Ya estás muy cerca en obtener tu página web, solo falta que selecciones en que tecnología lo quieres.</Typography>
      <Typography variant="h2" fontWeight='bold'>Tecnologías</Typography>
      <Stack direction='row' gap={10} flexWrap='wrap' justifyContent='space-evenly'>
        <Stack alignItems='center'>
          <img src="../assets/react.png" width={100} height={100} />
          <Radio
            checked={tec === technologies.REACT}
            onChange={handleChange}
            value={technologies.REACT}
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Stack>
        <Stack alignItems='center'>
          <img src="../assets/angular.png" width={100} height={100} />
          <Radio
            checked={tec === technologies.ANGULAR}
            onChange={handleChange}
            value={technologies.ANGULAR}
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Stack>
        <Stack alignItems='center'>
          <img src="../assets/vue.png" width={100} height={100} />
          <Radio
            checked={tec === technologies.VUE}
            onChange={handleChange}
            value={technologies.VUE}
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Stack>
      </Stack>
      <Button
        // color='primary'
        onClick={handTect}
        style={{ background: colors.greenAccent[600] }}
        size="large"
        variant="contained"
        sx={{ textTransform: 'none', padding: '20px 100px' }}>
        <Typography variant="h3" fontWeight='bold'>Generar Proyecto</Typography>
      </Button>
    </Box>
  )
}

export default StepThree