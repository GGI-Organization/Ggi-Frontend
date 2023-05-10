import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
// import Topbar from "../../scenes/global/Topbar"
import globals from "../../utils/globals"
import Sidebar from "../Layout/Sidebar"
import { experimentalStyled } from "@mui/material"
import Box from "@mui/material/Box"
import Navbar from "../Layout/Navbar"

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    // height: '100%',
    height: '100vh',
    overflow: 'hidden',
    // width: '100%'
    width: '100vw'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    // paddingTop: 64,
    // height: 'calc(100vh - 80px) !important',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  // height: '100%',
  overflow: 'auto',
  paddingTop: '64px',
  paddingLeft: '0px',
  paddingRight: '0px',
  zIndex: 1,
});


const PrivateRoute = () => {

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { isAuthenticated, token } = useAuthContext()

  useEffect(() => {
    const init = () => {
      console.log('init private', token)
      globals.token = token
    }
    init()
  }, [])

  if (!isAuthenticated) return <Navigate to='/login' replace />

  return (
    // <div className="app">
    // </div>
    <DashboardLayoutRoot>
      <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Sidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        {/* <main className='content'> */}
        {/* <Topbar /> */}
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Box sx={{
              minHeight: '100% !important',
              width: '100%',
              display: 'flex',
              px: { xs: 2, sm: 3, md: 4, lg: 4 }, py: { xs: 2, sm: 3, md: 3 }
            }}>
              <Outlet />
            </Box>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
        {/* </main> */}
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  )
}

export default PrivateRoute