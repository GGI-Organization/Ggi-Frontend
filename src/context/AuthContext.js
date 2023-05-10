import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import globals from '../utils/globals'

const MY_AUTH_APP = localStorage.getItem('token') ?? ''

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(MY_AUTH_APP !== '')
  const [token, setToken] = useState(MY_AUTH_APP)

  const login = useCallback(function (token) {
    localStorage.setItem('token', token)
    globals.token = token
    setToken(token)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(function () {
    localStorage.removeItem('token')
    globals.token = ''
    setIsAuthenticated(false)
  }, [])

  // Para que no se renderize
  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated,
    token
  }), [login, logout, isAuthenticated, token])

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.object
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}