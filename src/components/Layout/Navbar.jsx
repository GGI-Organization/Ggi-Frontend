import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  useTheme
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { ColorModeContext, tokens } from "../../theme";
import { useAuthContext } from '../../context/AuthContext';

const Navbar = ({ onMobileNavOpen, ...rest }) => {

  const { logout } = useAuthContext()
  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const closeSession = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar
      elevation={0}
      sx={{ background: colors.primary[400], width: { xl: "calc(100% - 256px)", xs: '100%'} }}
      style={{}}
      {...rest}
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton onClick={closeSession}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default Navbar;