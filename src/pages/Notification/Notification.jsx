import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';

const data = [1, 2, 3, 4, 5, 6]

function Notification() {

  const renderItem = (item) => (
    <Paper sx={{ p: '20px' }} key={item}>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' gap={1}>
          <Person4OutlinedIcon sx={{ width: '30px', height: '30px' }} />
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant='h4' fontWeight='bold' >Administrador</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant='body2' >01/04/2023 22:10</Typography>
        </Box>
      </Box>
      <Typography variant='body1' textAlign='justify'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography>
    </Paper>
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Header title='Mis Notificaciones' />
      <Box display='flex' gap={3} flexDirection='column'>
        {data.map((item) => (
          renderItem(item)
        ))}
      </Box>
    </Box>
  )
}

export default Notification