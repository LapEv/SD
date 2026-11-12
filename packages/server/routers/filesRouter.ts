import { Router } from 'express'
import { filesService } from '../services/filesService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const filesRouter = (apiRouter: Router) => {
  const service = new filesService()

  const router: Router = Router()

  router.get(
    '/getFilesData',
    roleMiddleware(['getFilesData', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getFilesData,
  )
  router.post(
    '/getFile',
    roleMiddleware(['getFile', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getFile,
  )
  router.post(
    '/getViewFile',
    roleMiddleware([
      'getFile',
      'Dispatcher',
      'ADMIN',
      'SUPERADMIN',
      'FieldEngineers',
    ]),
    service.getViewFile,
  )
  router.post(
    '/getAvatar',
    roleMiddleware(['getAvatar', 'ALL']),
    service.getAvatar,
  )
  router.post(
    '/getClientAvatar',
    roleMiddleware(['getClientAvatar', 'ALL']),
    service.getClientAvatar,
  )
  router.post(
    '/getAvatarByClientId',
    roleMiddleware(['getAvatarByClientId', 'ALL']),
    service.getAvatarByClientId,
  )
  router.post(
    '/getAvatarListUser',
    roleMiddleware(['getAvatarListUser', 'ALL']),
    service.getAvatarListUser,
  )
  router.post(
    '/getAvatarListClient',
    roleMiddleware(['getAvatarListClient', 'ALL']),
    service.getAvatarListClient,
  )
  router.post(
    '/uploadFiles',
    roleMiddleware([
      'uploadFiles',
      'SUPERADMIN',
      'ADMIN',
      'Dispatcher',
      'FieldEngineers',
    ]),
    service.uploadFiles,
  )
  router.post(
    '/uploadAvatars',
    roleMiddleware(['uploadAvatars', 'ALL']),
    service.uploadAvatars,
  )
  router.post(
    '/uploadClientAvatars',
    roleMiddleware(['uploadClientAvatars', 'ALL']),
    service.uploadClientAvatars,
  )
  router.post(
    '/deleteAvatar',
    roleMiddleware(['deleteAvatar', 'ALL']),
    service.deleteAvatar,
  )
  router.post(
    '/deleteClientAvatar',
    roleMiddleware(['deleteClientAvatar', 'ALL']),
    service.deleteClientAvatar,
  )

  apiRouter.use('/files', router)
}
