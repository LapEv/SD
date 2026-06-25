// import { ContextRunner } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { SystemRepos, userRepos } from '../db'
import { ISystem } from '/models/system'

// export const checkRegDataMiddleware = (validations: ContextRunner[]) => {
export const checkRegDataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const systemOptions = (await SystemRepos.findAll({})) as ISystem[]
  const { passwordMinLength, passwordMaxLength } = systemOptions[0].auth

  const lengthLimit = `Пароль должен содержать не менее ${passwordMinLength} и не более ${passwordMinLength} символов!`
  const emptyUsername = 'Пользователь не может быть пустым!'
  const doubleUser = 'Пользователь с таким логином уже существует!'
  const emailCheck = 'Некорректный email!'
  const doubleEmail = 'Пользователь с таким email уже существует!'

  const validateArray = [
    check('username', emptyUsername)
      .notEmpty()
      .custom(async value => {
        const checkUserNotInUse = await userRepos.findOne({
          where: { username: value },
        })
        if (checkUserNotInUse) {
          throw new Error(doubleUser)
        }
      }),
    check('password', lengthLimit).isLength({
      min: passwordMinLength,
      max: passwordMaxLength,
    }),
    check('email', emailCheck)
      .trim()
      .isEmail()
      .custom(async value => {
        const checkUserNotInUse = await userRepos.findOne({
          where: { email: value },
        })
        if (checkUserNotInUse) {
          throw new Error(doubleEmail)
        }
      }),
  ]
  for (const validation of validateArray) {
    const result = await validation.run(req)
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ message: result.array()[0].msg, error: result.array()[0] })
    }
  }

  next()
}
