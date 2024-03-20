import { Router } from "express"
import { login, logout, register, profile } from "../controllers/auth.controller.js"
import { validateToken } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { loginSchema, registerSchema } from "../schemas/auth.schema.js"

const router = Router()

router.post("/login", validateSchema(loginSchema), login)

router.post("/register", validateSchema(registerSchema), register)

router.post("/logout", logout)

router.get("/profile", validateToken, profile)

export default router