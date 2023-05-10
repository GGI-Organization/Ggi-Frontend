import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material'

import PublicRoute from './components/Route/PublicRoute';
import PrivateRoute from './components/Route/PrivateRoute';

import { APP, DASHBOARD, HISTORY, LOGIN, NOTIFICATION, PROFILE, REGISTER, TUTORIAL } from './config/routes/path';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import Dashboard from './pages/FlowProcess/Dashboard';
import History from './pages/History/History';
import Profile from './pages/Profile/Profile';
import Notification from './pages/Notification/Notification';
import Tutorial from './pages/Tutorial/Tutorial';

import { ColorModeContext, useMode } from './theme'
import { AuthContextProvider } from './context/AuthContext';

function App() {

  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <CssBaseline>
            <Routes>
              <Route path='/' element={<PublicRoute />}>
                <Route index element={<Login />} />
                <Route path={LOGIN} element={<Login />} />
                <Route path={REGISTER} element={<Register />} />
              </Route>
              <Route path={APP} element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
                <Route path={DASHBOARD} element={<Dashboard />} />
                <Route path={HISTORY} element={<History />} />
                <Route path={PROFILE} element={<Profile />} />
                <Route path={NOTIFICATION} element={<Notification />} />
                <Route path={TUTORIAL} element={<Tutorial />} />
              </Route>
            </Routes>
          </CssBaseline>
        </AuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
