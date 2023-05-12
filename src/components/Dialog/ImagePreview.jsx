import React from 'react'
import { Box, Modal, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';

const ImagePreview = ({ open = false, handleClose, imgSrc = '' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ backgroundColor: colors.primary[400], p: '20px', borderRadius: '5px', gap: 1, display: 'flex', flexDirection: 'column', width: { sm: '100% !important', md: '700px !important' } }}>
        <Typography variant="h5" fontWeight='bold'>
          Imagen de Vista Previa
        </Typography>
        <img
          src={imgSrc}
          alt="image-preview"
          loading="lazy"
        />
      </Box>
    </Modal>
  )
}

export default ImagePreview