import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { signin, errors: loginErrors, isAuth } = useAuth()
  const onSubmit = handleSubmit(async (data) => {
    signin(data)
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/tasks')
  }, [isAuth])
  return (
    <div className=' flex justify-center items-center text-lg mx-2'>
      <form onSubmit={onSubmit} className='form p-4'>
        <div className='flex flex-col gap-4 text-center mb-2'>
          <h2 className='text-5xl text-white font-semibold mb-2'>Login</h2>
          {loginErrors.map((error, index) => (
            <p
              key={index}
              className='text-red-500 text-lg bg-red-200 py-2 px-8 w-full'
            >
              {error}
            </p>
          ))}
        </div>
        <input
          type='text'
          {...register('email', { required: true })}
          className='input'
          placeholder='Email'
        />
        {errors.email && <p className='text-red-500'>Email is required</p>}

        <input
          type='text'
          {...register('password', { required: true })}
          className='input'
          placeholder='Password'
        />
        {errors.password && (
          <p className='text-red-500'>Password is required</p>
        )}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-white text-lg '>
            Don&apos;t have an account?
          </span>
          <div className='flex justify-end gap-2'>
            <Link
              className='btn font-semibold my-2 inline-block'
              to='/register'
            >
              Register
            </Link>{' '}
            <button type='submit' className='btn font-semibold my-2'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
