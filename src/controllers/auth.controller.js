import { compare } from '../libs/handleBcrypt.js'
import User from '../models/user.model.js'
import { createToken } from '../libs/jwt.js'
import { encrypt } from '../libs/handleBcrypt.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (userFound) return res.status(400).json(['user already exists'])
    const passwordHash = await encrypt(password)

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    })

    const userSaved = await newUser.save()
    const token = await createToken({ id: userSaved.id })

    res.cookie('token', token)
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: 'user not found' })

    const isMatch = await compare(password, userFound.password)

    if (!isMatch)
      return res.status(400).json({ message: 'invalid credentials' })

    const token = await createToken({
      id: userFound.id,
      username: userFound.username,
    })
    res.cookie('token', token)

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const { token } = req.cookies
  const user = await User.findById(req.user.id)
  res.json({ id: user.id, username: user.username, email: user.email })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  jwt.verify(token, 'secret123', async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })

    const userFound = await User.findById(decoded.id)
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })
    res.json({
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    })
  })
}
