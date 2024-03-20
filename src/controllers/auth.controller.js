import { compare } from "../libs/handleBcrypt.js"
import User from "../models/user.model.js"
import { createToken } from "../libs/jwt.js"
import { encrypt } from "../libs/handleBcrypt.js"

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const passwordHash = await encrypt(password)

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    })

    const userSaved = await newUser.save()
    const token = createToken(userSaved._id)
    
    res.cookie("token", token)
    res.json({ message: "user created successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: "user not found" })

    const isMatch = await compare(password, userFound.password)

    if (!isMatch) return res.status(400).json({ message: "invalid credentials" })

    const token = createToken(userFound._id)
    res.cookie("token", token)
    res.json({ id: userFound._id, username: userFound.username, email: userFound.email })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
} 

export const logout = (req, res) => {
  res.clearCookie("token")
  res.json({ message: "user logged out" })
}

export const profile = async (req, res) => {
  const { token } = req.cookies
  const user = await User.findById(req.user._id)
  res.json({ id: user._id, username: user.username, email: user.email })
}