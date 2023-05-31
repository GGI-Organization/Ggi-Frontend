import { Box, Dialog, DialogContent, Divider, Modal, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import React from 'react'

const BPMNInfoDialog = ({ open = false, handleClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ backgroundColor: colors.primary[400], p: '20px', borderRadius: '5px', gap: 1, display: 'flex', flexDirection: 'column', width: { xs: '100% !important', md: '700px !important' } }}>
        <Typography variant="h4" fontWeight='bold'>
          Informacion de ayuda para cargar BPMN
        </Typography>
        <Typography fontWeight='bold'>Puede usar los ejemplos de bpmn que tenemos en el siguiente <a target='_blank' href='https://drive.google.com/drive/folders/1IW2QNQxpSyyr3j9C1br4CFLHZtpANYD5?usp=sharing'>drive</a>   </Typography>
      </Box>
    </Modal>
  )
}

export default BPMNInfoDialog