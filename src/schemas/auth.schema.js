import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ required_error: 'email is required' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(5, 'password must be at least 5 characters long'),
})

export const registerSchema = z.object({
  username: z.string({ required_error: 'username is required' }),
  email: z.string().email({ required_error: 'email is required' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(5, 'password must be at least 5 characters long'),
})
