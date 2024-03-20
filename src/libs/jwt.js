import jwt from 'jsonwebtoken'
export const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    "secret123",
    { expiresIn: '1d' }
  )
}

