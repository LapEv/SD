import { Router } from 'express'
import { userService } from '../services/userService'
import { check } from 'express-validator'
import { auth } from '../data/auth'
import { authMiddleware } from '../middleware/authMiddleware'

const roleMiddleware = require('../middleware/roleMiddleware') /* tslint:disable no-var-requires */

export const userRouter = (apiRouter: Router) => {
  const service = new userService()
  const router: Router = Router()

  router.post(
    '/setUser',
    [
      check(auth.username, auth.emptyUsername).notEmpty(),
      check(auth.password, auth.checkPassword()).isLength({
        min: auth.passwordMinLength,
        max: auth.passwordMaxLength,
      }),
    ],
    service.setUser,
  )
  router.post(
    '/newUser',
    [
      check(auth.username, auth.emptyUsername).notEmpty(),
      check(auth.password, auth.checkPassword()).isLength({
        min: auth.passwordMinLength,
        max: auth.passwordMaxLength,
      }),
    ],
    service.newUser,
  )

  router.post('/login', service.login)
  router.post('/updateProfile', authMiddleware, service.updateProfile)

  router.post('/changePassword', authMiddleware, service.changePassword)
  router.post('/changeAvatar', authMiddleware, service.changeAvatar)
  router.get('/checkUser', authMiddleware, service.check)
  router.post(
    '/getUserInfo',
    roleMiddleware(['getUsers', 'SUPERADMIN']),
    service.getUserInfo,
  )
  router.post(
    '/getUsers',
    roleMiddleware(['getUsers', 'SUPERADMIN']),
    service.getUsers,
  )
  router.post(
    '/getActiveUsers',
    roleMiddleware(['getUsers', 'SUPERADMIN']),
    service.getActiveUsers,
  )
  router.post(
    '/getFieldEngineers',
    roleMiddleware(['getFieldEngineers', 'SUPERADMIN']),
    service.getFieldEngineers,
  )
  router.post(
    '/getDispatchers',
    roleMiddleware(['getDispatchers', 'SUPERADMIN']),
    service.getDispatchers,
  )
  router.post(
    '/deleteUser',
    roleMiddleware(['SUPERADMIN', 'deleteUser']),
    service.deleteUser,
  )
  router.post(
    '/pullUserInArchive',
    roleMiddleware(['SUPERADMIN', 'pullUserInArchive']),
    service.pullUserInArchive,
  )

  router.delete(
    '/fullDeleteUser',
    roleMiddleware(['SUPERADMIN', 'fullDeleteUser']),
    service.fullDeleteUser,
  )

  router.post(
    '/updateUser',
    roleMiddleware(['SUPERADMIN', 'updateUser']),
    service.updateUser,
  )
  router.post(
    '/changeUserAppOptions',
    roleMiddleware(['SUPERADMIN', 'changeUserAppOptions']),
    service.changeUserAppOptions,
  )

  apiRouter.use('/user', router)
}
