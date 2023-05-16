import { Box, Dialog, DialogContent, Divider, Modal, Stack, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import Carousel from 'react-material-ui-carousel'
import React, { useState } from 'react'

const items = [{ image: 'https://balsamiq.com/assets/wireframes/boogle-large.jpg' }, { image: 'https://balsamiq.com/assets/wireframes/boogle-large.jpg' }, { image: 'https://balsamiq.com/assets/wireframes/boogle-large.jpg' }]

const MockupDetailDialog = ({ open = false, handleClose, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [indexShow, setIndexShow] = useState(0)

  const renderComponent = (index) => {
    const { components } = data[index]
    const nameComponent = components.map(item => item.name)
    const setNameComponent = new Set([...nameComponent])
    const countComponents = [...setNameComponent].map(name => {
      const count = components.filter(component => component.name == name).length
      return `${name} x ${count}`
    })
    return (
      <>
        <Divider sx={{ mb: 1 }} />
        <Typography variant='h4'>Components detectados: </Typography>
        {countComponents.map((item, index) => (
          <Typography variant='h5' fontWeight='bold' key={index}>* {item}</Typography>
        ))}
      </>
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ backgroundColor: colors.primary[400], p: '20px', borderRadius: '5px', gap: 1, display: 'flex', flexDirection: 'column', width: { xs: '100% !important', md: '700px !important' } }}>
        <Typography variant="h5" fontWeight='bold'>
          Wireframes Subidos
        </Typography>
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
            onChange={(e) => { setIndexShow(e) }}
          >
            {
              data.map((item, i) => (
                <Stack sx={{ height: '100%' }} key={item.id} flexDirection='column' alignItems='center' display='flex'>
                  <Typography mb={1} variant='h5' fontWeight='bold'>{item.task}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      key={i}
                      style={{ width: '100%', height: 'auto' }}
                      src={`https://ggi-backend-production.up.railway.app/images/${item.path}`}
                      alt="image-preview"
                      loading="lazy"
                    />
                  </Box>
                </Stack>
              ))
            }
          </Carousel>
          {data.length > 0 &&
            renderComponent(indexShow)
          }
        </Box>
      </Box>
    </Modal>
  )
}

export default MockupDetailDialog