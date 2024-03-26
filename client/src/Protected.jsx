import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
  const { loading, isAuth } = useAuth()
  if (loading) return <h2>Loading...</h2>
  if (!loading && !isAuth) return <Navigate to='/login' replace />

  return <Outlet />
}

export default Protected
