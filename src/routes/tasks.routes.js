import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks.controller.js'
const router = Router()
import { validateSchema } from '../middlewares/validateSchema.js'
import { createTaskSchema } from '../schemas/task.schema.js'
router.get('/tasks', validateToken, getTasks)

router.get('/tasks/:id', validateToken, getTask)
router.post('/tasks', validateToken, validateSchema(createTaskSchema), createTask)
router.put('/tasks/:id', validateToken, updateTask)
router.delete('/tasks/:id', validateToken, deleteTask)

export default router
