import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { APP } from "../../config/routes/path"
import { Box, Container, Hidden, Stack } from "@mui/material"

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext()
  if (isAuthenticated) {
    return <Navigate to={APP} replace />
  }
  return (
    <div className="app">
      <main className='content'>
        <Stack flexDirection='row' display='flex' width='100%' height='100%'>
          <Box
            component="main"
            sx={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              minHeight: '100%'
            }}
          >
            <Container maxWidth="sm">
              <Outlet />
            </Container>
          </Box>
          <Hidden mdDown>
            <Box sx={{
              display: 'flex',
              flex: 1,
              background: "url('https://c1.wallpaperflare.com/preview/640/831/586/layout-sketch-ux-web-design-thumbnail.jpg')",
              backgroundSize: 'cover'
            }} />
          </Hidden>
        </Stack>
      </main>
    </div>
  )
}

export default PublicRoute