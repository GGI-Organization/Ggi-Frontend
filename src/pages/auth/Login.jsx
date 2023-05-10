import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, Container, Grid, Hidden, Link, Stack, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiAuth from '../../services/apiAuth';
import globals from '../../utils/globals';
import { LoginRes } from '../../utils/entities';

const Login = () => {

  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const theme = useTheme()
  const colors = tokens(theme)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Correo no valido')
        .max(255)
        .required('Correo es requerido'),
      password: Yup
        .string()
        .max(255)
        .required('Contraseña es requerido')
    }),
    validate: async (values) => {
      const errors = {}
      return errors
    },
    onSubmit: async (values) => {
      setShowError(false)
      const response = await apiAuth.login({ email: values.email, password: values.password })
      if (response.error) {
        setShowError(true)
        return false
      }
      const loginRes = new LoginRes(response.result)
      localStorage.setItem('id', loginRes.id.toString())
      localStorage.setItem('fullname', loginRes.fullname)
      localStorage.setItem('email', loginRes.email)
      login(loginRes.token)
      navigate('/app')
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ my: 1 }}>
        <Typography
          variant="h1"
          fontWeight='bold'
          color={colors.grey[100]}
        >
          Iniciar Sesión
        </Typography>
        <Typography variant='h5' color={colors.grey[100]}>
          Bienvenido a GGI una plataforma que te ayuda generar interfaces en simples pasos.
        </Typography>
      </Box>
      {
        showError &&
        <Alert icon={false} severity="error">
          <strong>Correo o contraseña incorrecta</strong>
        </Alert>
      }
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
      <Box sx={{ py: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Button
          color='primary'
          disabled={formik.isSubmitting}
          // style={{background: colors.grey[200]}}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Ingresar
        </Button>
        <Button
          color='primary'
          disabled={formik.isSubmitting}
          fullWidth
          onClick={() => { navigate('/register') }}
          size="large"
          variant="contained"
        >
          Registrarse
        </Button>
      </Box>
    </form>
  );
};

export default Login;
