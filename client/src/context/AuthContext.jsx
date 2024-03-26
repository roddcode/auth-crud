import { createContext, useContext, useEffect, useState } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      setIsAuth(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuth(true)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      } else {
        setErrors([error.response.data.message])
      }
    }
  }

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
  };


  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()
      if (!cookies) {
        setIsAuth(false)
        setLoading(false)
        return
      }
      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data) return setIsAuth(false)
        setIsAuth(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuth(false)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])
  return (
    <AuthContext.Provider
      value={{ user, signup, signin, isAuth, errors, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
