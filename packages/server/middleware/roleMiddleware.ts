import { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Roles, roleGroupRepos } from '../db'
import { IRolesGroup, IRoles } from '/models/roles'
const { SECRET_KEY } = process.env

const include = [
  {
    model: Roles,
    required: true,
    attributes: ['id', 'role', 'nameRole'],
  },
]

module.exports = function (roles: []) {
  return async function (_req: Request, res: Response, next: NextFunction) {
    if (_req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = _req.header('Authorization')?.replace('Bearer ', '')
      if (!token) {
        return res.status(403).json({ message: 'The user is not logged in' })
      }
      const verifycode = jwt.verify(token, SECRET_KEY as Secret)
      const { rolesGroup } = verifycode as JwtPayload
      let hasRole = false

      const groupRoles = (await roleGroupRepos.findAll({
        where: { group: rolesGroup },
        include,
      })) as IRolesGroup[]
      groupRoles[0].Roles.forEach(({ role }: IRoles) => {
        if (roles.includes(role as never)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: "You don't have access!" })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'The user is not logged in' })
    }
  }
}
