import type { Request, Response } from 'express'
import { SystemRepos, userRepos } from '../db'
import { User } from '/models/users'
import bcrypt from 'bcryptjs'
import { auth } from '../data/auth'
import { Result, validationResult } from 'express-validator'

export class systemService {
  getSystem = (_req: Request, res: Response) => {
    SystemRepos.findAll({})
      .then(system => res.status(200).json(system))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  setSystem = async (_req: Request, res: Response) => {
    try {
      const { id, ...newData } = _req.body
      const isUpdate = await SystemRepos.update(id, { ...newData })
      if (isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с изменением параметров системы! Попробуйте перезагрузить страницу и заново внести изменения. Или обратитесь к администратору.',
        })
      }
      const { general } = newData
      const superAdmin = (await userRepos.findOne({
        where: { status: 'SUPERADMIN' },
      })) as User
      await userRepos.update(superAdmin.id, {
        firstName: general.name,
        lastName: general.name,
        middleName: general.name,
        shortName: general.name,
        email: general.emailSystem,
      })
      res.status(200).json(_req.body)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changePasswordSystem = async (_req: Request, res: Response) => {
    const { oldPassword, newPassword } = _req.body
    const superAdmin = (await userRepos.findOne({
      where: { status: 'SUPERADMIN' },
    })) as User

    const validPassword = bcrypt.compareSync(oldPassword, superAdmin.password)
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: auth.notification.invalidOldPassword })
    }
    const errValidation: Result = validationResult(_req)
    if (!errValidation.isEmpty()) {
      const errors = errValidation.array()
      return res.status(400).json({
        message: `${auth.notification.errorValidation}: ${errors[0].msg}`,
        errValidation,
      })
    }
    const hashPassword = bcrypt.hashSync(newPassword, 7)
    try {
      await userRepos.update(superAdmin.id, { password: hashPassword })
      res.status(200).json('Ok')
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}
