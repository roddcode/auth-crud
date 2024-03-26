import { useEffect } from 'react'
import { useTasks } from '../context/TasksContext'
import Card from '../components/Card'
const Tasks = () => {
  const { tasks, getTasks } = useTasks()
  useEffect(() => {
    getTasks()
  }, [])

  if(tasks.length === 0) {
    return <h1>No tasks</h1>
  }
  return (
    <div className='grid grid-cols-2 gap-4'>
      {
        tasks.map((task, index) => (
          <Card key={index} task={task} />
        ))
      }
    </div>
  )
}

export default Tasks