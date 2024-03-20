import jwf from "jsonwebtoken"
export const validateToken = (req, res, next) => {
  const {token} = req.cookies
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  jwf.verify(token, 'secret123', (err, decoded) => {
    if(err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = decoded
    next()
  })
}