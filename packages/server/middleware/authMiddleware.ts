import type { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { auth } from '../data/auth'
const { SECRET_KEY } = process.env

interface jwtAnswer {
  id?: string
  rolesGroup?: string[]
  username?: string
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: auth.notification.notLogged })
    }
    const verify = jwt.verify(token, SECRET_KEY as Secret)
    const { id, rolesGroup, username } = verify as jwtAnswer
    req.body = { ...req.body, id, rolesGroup, username }
    next()
  } catch (e) {
    res.status(401).json({ message: auth.notification.notLogged })
  }
}
