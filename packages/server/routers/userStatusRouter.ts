import { Router } from 'express'
import { userStatusService } from '../services/userStatusService'
import { roleMiddleware } from '../middleware/roleMiddleware'

export const userStatusRouter = (apiRouter: Router) => {
  const service = new userStatusService()

  const router: Router = Router()

  router.post(
    '/setNewUserStatus',
    roleMiddleware(['setNewUserStatus', 'SUPERADMIN']),
    service.setNewUserStatus,
  )
  router.get(
    '/getUserStatus',
    roleMiddleware(['getUserStatus', 'SUPERADMIN']),
    service.getUserStatus,
  )
  router.post(
    '/deleteUserStatus',
    roleMiddleware(['deleteUserStatus', 'SUPERADMIN']),
    service.deleteUserStatus,
  )
  router.delete(
    '/fullDeleteUserStatus',
    roleMiddleware(['fullDeleteUserStatus', 'SUPERADMIN']),
    service.fullDeleteUserStatus,
  )

  apiRouter.use('/user', router)
}
