import { Link } from 'react-router-dom'
import { useTasks } from '../context/TasksContext'

const Card = ({ task }) => {
  const { deleteTask } = useTasks()
  const handleDelete = () => {
    deleteTask(task._id)
  }
  return (
    <div className='bg-zinc-700 text-slate-50 p-4 rounded-lg h-auto' key={task._id}>
      <h1 className='text-2xl font-medium'>{task.title}</h1>
      <p className='text-lg text-gray-200'>{task.description}</p>
      <div className='flex gap-4 justify-center items-center pt-2'>
        <Link to={`/tasks/${task._id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Card
