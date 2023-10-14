import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function verifyAccessToken(req, res, next) {
  if (!req.headers['authorization']) {
    return res.status(401).send({ message: 'Access Token not found.' });
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid Access Token.' });
    }
    req.payload = payload;
    next();
  });
}
