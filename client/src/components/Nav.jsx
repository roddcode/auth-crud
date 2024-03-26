import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const Nav = () => {
  const { isAuth, logout } = useAuth()
  return (
    <nav className='flex justify-between items-center w-full p-4 bg-zinc-700 mb-12 rounded-lg mt-2'>
      <Link to='/' className='text-2xl font-semibold'>
        Task Manager
      </Link>
      <ul className='text-xl flex gap-5 items-center '>
        {isAuth ? (
          <>
            <li>
              <Link to='/' onClick={logout}>
                Logout
              </Link>
            </li>
            <li>
              <Link to='/tasks'>Tasks</Link>
            </li>
            <li>
              <Link to='/add-task'>Add Task</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
