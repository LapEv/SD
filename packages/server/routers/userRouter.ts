import { Router } from 'express'
import { userService } from '../services/userService'
import { authMiddleware } from '../middleware/authMiddleware'
import { checkRegDataMiddleware } from '../middleware/checkRegDataMiddleware'

const roleMiddleware = require('../middleware/roleMiddleware') /* tslint:disable no-var-requires */

export const userRouter = (apiRouter: Router) => {
  const service = new userService()
  const router: Router = Router()

  router.post(
    '/setUser',
    checkRegDataMiddleware,
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.setUser,
  )
  router.post(
    '/newUser',
    checkRegDataMiddleware,
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.newUser,
  )

  router.post('/login', service.login)
  router.post('/updateProfile', authMiddleware, service.updateProfile)

  router.post('/changePassword', authMiddleware, service.changePassword)
  router.post(
    '/resetPassword',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.resetPassword,
  )
  router.post('/changeAvatar', authMiddleware, service.changeAvatar)
  router.get('/checkUser', authMiddleware, service.check)
  router.post(
    '/getUserInfo',
    roleMiddleware(['getUsers', 'ADMIN', 'SUPERADMIN']),
    service.getUserInfo,
  )
  router.post(
    '/getUsers',
    roleMiddleware(['getUsers', 'ADMIN', 'SUPERADMIN']),
    service.getUsers,
  )
  router.post(
    '/getActiveUsers',
    roleMiddleware(['getUsers', 'ADMIN', 'SUPERADMIN']),
    service.getActiveUsers,
  )
  router.post(
    '/getFieldEngineers',
    roleMiddleware(['getFieldEngineers', 'ADMIN', 'SUPERADMIN']),
    service.getFieldEngineers,
  )
  router.post(
    '/getDispatchers',
    roleMiddleware(['getDispatchers', 'ADMIN', 'SUPERADMIN']),
    service.getDispatchers,
  )
  router.post(
    '/deleteUser',
    roleMiddleware(['SUPERADMIN', 'ADMIN', 'deleteUser']),
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
    roleMiddleware(['SUPERADMIN', 'ADMIN', 'updateUser']),
    service.updateUser,
  )
  router.post(
    '/changeUserAppOptions',
    roleMiddleware(['SUPERADMIN', 'ADMIN', 'changeUserAppOptions']),
    service.changeUserAppOptions,
  )

  apiRouter.use('/user', router)
}
