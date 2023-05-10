import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../theme'


const Header = ({ title, subtitle }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box sx={{mb: '16px'}}>
      <Typography variant='h3' color={colors.grey[100]} fontWeight='bold'>{title}</Typography>
      <Typography variant='subtitle1' color={colors.grey[100]}>{subtitle}</Typography>
    </Box>
  )
}

export default Header