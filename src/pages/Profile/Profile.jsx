import { Box, Button, Card, CardContent, Divider, Icon, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { alertMessage } from '../../utils/functions'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import apiUser from '../../services/apiUser';
import LoadingDialog from '../../components/Dialog/LoadingDialog';
import { useAuthContext } from '../../context/AuthContext';


const Profile = () => {

  const [showLoading, setShowLoading] = useState(false)
  const { login } = useAuthContext()

  const id = localStorage.getItem('id')

  const callAPI = async () => {
    const response = await apiUser.getById({ id })
    if (response.error) {
      return
    }
    const { fullname, email } = response.result
    formik.setValues({ fullname, email, password: '' })
  }

  useEffect(() => {
    callAPI()
  }, [])


  const formik = useFormik({
    initialValues: {
      fullname: localStorage.getItem('fullname') ?? '',
      email: localStorage.getItem('email') ?? '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup
        .string()
        .max(255)
        .required('Nombre completo es requerido'),
      email: Yup
        .string()
        .email('Correo no valido')
        .max(255)
        .required('Correo es requerido'),
      password: Yup
        .string()
        .max(255)
        .required('Contraseña es requerido'),
    }),
    validate: async (values) => {
      const errors = {}
      return errors
    },
    onSubmit: async (values) => {
      setShowLoading(true)
      const { fullname, email, password } = values
      const response = await apiUser.update({ id, fullname, email, password })
      if (response.error) {
        alertMessage({ icon: 'error', message: response.message, title: 'Oh no!' })
      } else {
        login(response.result)
        alertMessage({ icon: 'success', message: 'Información actualizada exitosamente', title: 'Listo!' })
      }
      setShowLoading(false)
      return false
    }
  });

  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoadingDialog open={showLoading} /> 
      <Box>
        <Box display='flex' justifyContent='center'>
          <AccountCircleOutlinedIcon sx={{ width: '200px', height: '200px' }} />
        </Box>
        <Paper sx={{ p: '20px' }}>
          <Box flexDirection='row' display='flex' justifyContent='space-around'>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Typography variant='h5' fontWeight='bold'>BPMN Subidos</Typography>
              <Typography variant='h3' fontWeight='bold'>10</Typography>
            </Box>
            <Box sx={{ width: '1px', backgroundColor: 'black' }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Typography variant='h5' fontWeight='bold'>Mockup Subidos</Typography>
              <Typography variant='h3' fontWeight='bold'>10</Typography>
            </Box>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={Boolean(formik.touched.fullname && formik.errors.fullname)}
              fullWidth
              helperText={formik.touched.fullname && formik.errors.fullname}
              label="Nombre Completo"
              margin="normal"
              name="fullname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullname}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Correo"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Contraseña"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2, display: 'flex', flexDirection: 'column' }}>
              <Button
                color='primary'
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Guardar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default Profile