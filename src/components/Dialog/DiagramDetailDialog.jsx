import { Box, Dialog, DialogContent, Divider, Modal, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import React from 'react'

const DiagramDetailDialog = ({ open = false, handleClose, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { imgSrc, tasks } = data
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ backgroundColor: colors.primary[400], p: '20px', borderRadius: '5px', gap: 1, display: 'flex', flexDirection: 'column', width: { xs: '100% !important', md: '700px !important' } }}>
        <Typography variant="h5" fontWeight='bold'>
          Imagen del Diagrama BPMN
        </Typography>
        <img
          src={imgSrc}
          alt="image-preview"
          loading="lazy"
        />
        <Divider />
        <Typography fontWeight='bold'>Tareas detectadas: </Typography>
        {
          tasks.map((item, index) => (
            <Typography fontWeight='bold' sx={{textTransform: 'uppercase'}} key={item.id}>* {item.name}</Typography>
          ))
        }
      </Box>
    </Modal>
  )
}

export default DiagramDetailDialog