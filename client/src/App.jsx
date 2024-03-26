import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import Tasks from './pages/Tasks'
import TaskForm from './pages/TaskForm'
import Profile from './pages/Profile'
import Protected from './Protected'
import { TasksProvider } from './context/TasksContext'
import Nav from './components/Nav'

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
            <Route element={<Protected />}>
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/add-task' element={<TaskForm />} />
              <Route path='/tasks/:id' element={<TaskForm />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
      </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  )
}

export default App
