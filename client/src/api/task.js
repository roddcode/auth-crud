import axios from './axios'

const API = 'http://localhost:3000/api'

export const getTasksRequest = async () => axios.get('/tasks')

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`)

export const createTaskRequest = async (task) => axios.post(`${API}/tasks`, task)

export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task.id}`, task)

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`)
