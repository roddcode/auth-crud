/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
} from '../api/task'
const TasksContext = createContext()

export const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within an TasksProvider')
  }
  return context
}

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      setTasks([...tasks, res.data])
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <TasksContext.Provider
      value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask}}
    >
      {children}
    </TasksContext.Provider>
  )
}
