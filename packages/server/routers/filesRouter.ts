import { Router } from 'express'
import { filesService } from '../services/filesService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const filesRouter = (apiRouter: Router) => {
  const service = new filesService()

  const router: Router = Router()

  router.get(
    '/getFilesData',
    roleMiddleware(['getFilesData', 'SUPERADMIN']),
    service.getFilesData,
  )
  router.post(
    '/getFile',
    roleMiddleware(['getFile', 'SUPERADMIN']),
    service.getFile,
  )
  router.post(
    '/getViewFile',
    roleMiddleware(['getFile', 'Dispatcher', 'ADMIN', 'SUPERADMIN']),
    service.getViewFile,
  )
  router.post(
    '/getAvatar',
    roleMiddleware(['getAvatar', 'SUPERADMIN']),
    service.getAvatar,
  )
  router.post(
    '/uploadFiles',
    roleMiddleware(['uploadFiles', 'SUPERADMIN']),
    service.uploadFiles,
  )
  router.post(
    '/uploadAvatars',
    roleMiddleware(['uploadAvatars', 'SUPERADMIN']),
    service.uploadAvatars,
  )
  router.post(
    '/deleteAvatar',
    roleMiddleware(['deleteAvatar', 'SUPERADMIN']),
    service.deleteAvatar,
  )

  apiRouter.use('/files', router)
}
