import { Router } from "express"
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { loginSchema, registerSchema } from "../schemas/auth.schema.js"

const router = Router()

router.post("/login", validateSchema(loginSchema), login)

router.post("/register", validateSchema(registerSchema), register)

router.post("/logout", verifyToken, logout)

router.get("/validate", verifyToken)

export default router