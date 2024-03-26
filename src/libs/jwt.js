import jwt from 'jsonwebtoken'
export const createToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'secret123', { expiresIn: '1h' }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
