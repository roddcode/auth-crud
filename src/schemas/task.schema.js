import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string({ required_error: 'title is required' }),
  description: z.string({
    required_error: 'description is required',
  }).optional(),
  completed: z.boolean().optional(),
  completedAt: z.date().optional(),
})