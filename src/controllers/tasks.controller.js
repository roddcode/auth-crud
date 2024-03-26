import Task from '../models/task.model.js'

export const createTask = async (req, res) => {
  const { title, description, completedAt } = req.body
  const newTask = new Task({
    title,
    description,
    completedAt,
    user: req.user.id,
  })
  const savedTask = await newTask.save()
  res.json(savedTask)
}

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate('user')
  res.json(tasks)
}

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate('user')
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json(task)
}

export const updateTask = async (req, res) => {
  const { title, description, completedAt } = req.body
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, completedAt },
    { new: true }
  )
  if (!updatedTask) return res.status(404).json({ message: 'Task not found' })
  res.json(updatedTask)
}

export const deleteTask = async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id)
  if (!deletedTask) return res.status(404).json({ message: 'Task not found' })
  res.status(204).json({ message: 'Task deleted' })
}
