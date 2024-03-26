import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const TaskForm = () => {
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const { user } = useAuth()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function fetchTask() {
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    fetchTask()
  }, [])

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateTask({ ...data, userId: user._id, id: params.id })
      } else {
        const userData = { ...data, userId: user._id }
        await createTask(userData)
      }

      navigate('/tasks')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center text-lg mx-2'>
      <form onSubmit={handleSubmit(onSubmit)} className='form p-4 min-w-80'>
        <h1 className='text-3xl text-center text-slate-100 font-bold mb-2'>
          Add Task
        </h1>
        <input
          type='text'
          placeholder='Title'
          {...register('title')}
          autoFocus
          className='input'
        />
        <textarea
          rows={5}
          placeholder='Description'
          {...register('description')}
          className='input resize-none'
        />

        <button type='submit' className='btn mt-2 text-slate-100'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default TaskForm
