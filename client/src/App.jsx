import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import Tasks from './pages/Tasks'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
