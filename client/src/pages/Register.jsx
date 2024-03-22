import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signup, isAuth, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    signup(data)
  })

  useEffect(() => {
    if (isAuth) navigate('/tasks')
  }, [isAuth])
  return (
    <div className='min-h-screen flex justify-center items-center text-lg mx-2'>
      <form onSubmit={onSubmit} className='form p-4'>
        <div className='flex flex-col gap-4 text-center mb-2'>
          <h2 className='text-5xl text-white font-semibold mb-2'>Register</h2>
          {registerErrors.map((error, index) => (
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
          {...register('username', { required: true })}
          className='input'
          placeholder='Username'
        />
        {errors.username && (
          <p className='text-red-500'>Username is required</p>
        )}
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
          <span className='text-white text-lg '>Already have an account?</span>
          <div className='flex justify-end gap-2'>
            <Link className='btn font-semibold my-2 inline-block' to='/login'>
              Login
            </Link>{' '}
            <button type='submit' className='btn font-semibold my-2'>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
