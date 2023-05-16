// eslint-disable-line react-hooks/exhaustive-deps
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import './sidebar.css'
import { DASHBOARD, HISTORY, LOGIN, NOTIFICATION, PROFILE, TUTORIAL } from "../../config/routes/path";
import { useAuthContext } from "../../context/AuthContext";

const items = [
  {
    name: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    link: DASHBOARD
  },
  {
    name: 'Historial',
    icon: <ReorderOutlinedIcon />,
    link: HISTORY
  },
  {
    name: 'Perfil',
    icon: <PersonOutlinedIcon />,
    link: PROFILE
  },
  {
    name: 'Notificaciones',
    icon: <NotificationsOutlinedIcon />,
    link: NOTIFICATION
  },
  {
    name: 'Tutorial',
    icon: <OndemandVideoOutlinedIcon />,
    link: TUTORIAL
  },
]

const Sidebar = ({ onMobileClose, openMobile }) => {

  const { logout } = useAuthContext()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const logOut = () => {
    logout()
    navigate(LOGIN)
  }

  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", }}>
      <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", m: '20px 0' }}>
        <Typography fontWeight="bold" variant="h4">
          GIG
        </Typography>
      </Box>
      <Box sx={{ p: 0 }}>
        <List>
          {items.map((item) => (
            <ListItem key={item.name}>
              <ListItemButton disableRipple style={{ borderRadius: 5, backgroundColor: 'transparent' }} onClick={() => navigate(item.link)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {/* <ExitItem onClick={logOut} /> */}
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{ sx: { width: 256 } }}>
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              // top: 64,
              top: 0,
              // height: "calc(100% - 64px)",
              height: "calc(100% - 0px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

Sidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
};

export default Sidebar;
