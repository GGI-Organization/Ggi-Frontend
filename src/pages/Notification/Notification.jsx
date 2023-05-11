import { Box, Paper, Typography } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import Header from '../../components/Header'
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import apiNotification from '../../services/apiNotification';
import dayjs from 'dayjs';


function Notification() {

  const [data, setData] = useState([])

  const callAPI = useCallback(
    async () => {
      const response = await apiNotification.getAll()
      if (response.error) {
        return
      }
      setData(response.result.content)
    },
    [],
  )


  useEffect(() => {

    callAPI()

  }, [])


  const renderItem = (item) => (
    <Paper sx={{ p: '20px' }} key={item.id}>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' gap={1}>
          <Person4OutlinedIcon sx={{ width: '20px', height: '20px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='h6'>Administrador</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant='body2'>{dayjs(item.updatedAt).format('DD/MM/YYYY HH:mm')}</Typography>
        </Box>
      </Box>
      <Typography variant='h5' textAlign='justify'>
        {item.description}
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