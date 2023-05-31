import { Box, Dialog, DialogContent, Divider, Modal, Stack, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import React from 'react'
import Carousel from 'react-material-ui-carousel';

const COMPONENTS = [
  {name: 'Tabla', img: 'https://storage.googleapis.com/ggi_bucket/table.png'},
  {name: 'Select', img: 'https://storage.googleapis.com/ggi_bucket/select.png'},
  {name: 'Busqueda', img: 'https://storage.googleapis.com/ggi_bucket/search.png'},
  {name: 'Input', img: 'https://storage.googleapis.com/ggi_bucket/input.png'},
  {name: 'Label', img: 'https://storage.googleapis.com/ggi_bucket/label.png'},
  {name: 'Checkbox', img: 'https://storage.googleapis.com/ggi_bucket/checkbox.png'},
  {name: 'Boton', img: 'https://storage.googleapis.com/ggi_bucket/button.png'},
  {name: 'Bloque de texto', img: 'https://storage.googleapis.com/ggi_bucket/block-text.png'},
]

const WirefrimeInfoDialog = ({ open = false, handleClose }) => {
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
          Componentes detectables
        </Typography>
        <Typography variant='h5'>Usamos balsamiq para la deteccion de componentes, puedes hacer click <a style={{fontWeight: 'bold'}} href='https://chrome.google.com/webstore/detail/balsamiq-wireframes-free/imbfadckkgblfbkinjejdeobpfbcopgb?hl=es' target='_blank'>aqui</a> para crear tu propio wireframe.</Typography>
        <Box>
          <Carousel
            autoPlay={false}
            indicators
            height={'400px'}
            swipe={false}
            cycleNavigation={false}
            navButtonsAlwaysVisible={true}
            fullHeightHover={true}
            animation='slide'
          >
            {
              COMPONENTS.map((item, i) => (
                <Stack sx={{ height: '100%' }} key={item.name} flexDirection='column' alignItems='center' display='flex'>
                  <Typography mb={1} variant='h5' fontWeight='bold'>{item.name}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      key={i}
                      style={{ width: '100%', height: 'auto' }}
                      src={`${item.img}`}
                      alt="image-preview"
                      loading="lazy"
                    />
                  </Box>
                </Stack>
              ))
            }
          </Carousel>
        </Box>
      </Box>
    </Modal>
  )
}

export default WirefrimeInfoDialog