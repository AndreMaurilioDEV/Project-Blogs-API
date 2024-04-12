const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {

  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Token not found' })
  }

  const [type] = req.headers.authorization.split(' ') 

  if(type !== 'Bearer') {
    return res.status(401).json({ message: 'Expired or invalid token' })
  }

  next();
}

module.exports = authenticateToken;