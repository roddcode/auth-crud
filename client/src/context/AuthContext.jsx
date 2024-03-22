import { createContext, useContext, useEffect, useState } from 'react'
import { registerRequest, loginRequest } from '../api/auth'

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
      if(Array.isArray(error.response.data)){
        setErrors(error.response.data)
      }else{
        setErrors([error.response.data.message])
      }
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])
  return (
    <AuthContext.Provider value={{ user, signup, signin, isAuth, errors }}>
      {children}
    </AuthContext.Provider>
  )
}
