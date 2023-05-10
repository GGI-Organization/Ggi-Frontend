import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import apiAuth from '../../services/apiAuth';
import { alertMessage } from '../../utils/functions';

const Register = () => {

  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const theme = useTheme()
  const colors = tokens(theme)

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      repassword: ''
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
      repassword: Yup
        .string()
        .max(255)
        .required('Repetir contraseña es requerido')
    }),
    validate: async (values) => {
      const errors = {}
      if (values.password != values.repassword)
        errors.repassword = 'Las contraseñas no coinciden'
      return errors
    },
    onSubmit: async (values, { resetForm }) => {
      setShowError(false)
      const response = await apiAuth.register({ email: values.email, password: values.password, fullname: values.fullname })
      if (response.error) {
        setShowError(true)
        return false
      } else {
        resetForm()
        alertMessage({ icon: 'success', message: 'Cuenta registrada correctamente', title: 'Listo!' })
        setInterval(() => {
          navigate('/login')
        }, 3000);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ my: 3 }}>
        <Typography
          variant="h1"
          fontWeight='bold'
          color={colors.grey[100]}
        >
          Crear Cuenta
        </Typography>
      </Box>
      {
        showError &&
        <Alert icon={false} severity="error">
          <strong>Correo o contraseña incorrecta</strong>
        </Alert>
      }
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
      <TextField
        error={Boolean(formik.touched.repassword && formik.errors.repassword)}
        fullWidth
        helperText={formik.touched.repassword && formik.errors.repassword}
        label="Repetir Contraseña"
        margin="normal"
        name="repassword"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.repassword}
        variant="outlined"
      />
      <Box sx={{ py: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Button
          color='primary'
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Registrarse
        </Button>
        <Button
          color='primary'
          disabled={formik.isSubmitting}
          fullWidth
          onClick={() => { navigate('/login') }}
          size="large"
          variant="contained"
        >
          Regresar
        </Button>
      </Box>
    </form>
  );
};

export default Register;
