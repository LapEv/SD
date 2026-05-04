import { Router } from 'express'
import { objectsService } from '../services/objectsService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const objectsRouter = (apiRouter: Router) => {
  const service = new objectsService()

  const router: Router = Router()

  router.get(
    '/getObjects',
    roleMiddleware(['getObjects', 'SUPERADMIN']),
    service.getObjects,
  )
  router.get(
    '/getAllObjects',
    roleMiddleware(['getAllObjects', 'SUPERADMIN']),
    service.getAllObjects,
  )
  router.post(
    '/newObject',
    roleMiddleware(['newObject', 'SUPERADMIN']),
    service.newObject,
  )
  router.post(
    '/deleteObjects',
    roleMiddleware(['deleteObjects', 'SUPERADMIN']),
    service.deleteObjects,
  )
  router.delete(
    '/fullDeleteObjects',
    roleMiddleware(['fullDeleteObjects', 'SUPERADMIN']),
    service.fullDeleteObjects,
  )
  router.post(
    '/pullObjectFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullObjectFromArchive']),
    service.pullObjectFromArchive,
  )
  router.post(
    '/changeObject',
    roleMiddleware(['changeObject', 'SUPERADMIN']),
    service.changeObject,
  )

  apiRouter.use('/objects', router)
}
