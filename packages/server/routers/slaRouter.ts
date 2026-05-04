import { Router } from 'express'
import { slaService } from '../services/slaService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const slaRouter = (apiRouter: Router) => {
  const service = new slaService()

  const router: Router = Router()

  router.get(
    '/getSLA',
    roleMiddleware(['getSLA', 'SUPERADMIN']),
    service.getSLA,
  )
  router.get(
    '/getAllSLA',
    roleMiddleware(['getAllSLA', 'SUPERADMIN']),
    service.getAllSLA,
  )
  router.post(
    '/newSLA',
    roleMiddleware(['newSLA', 'SUPERADMIN']),
    service.newSLA,
  )
  router.post(
    '/deleteSLA',
    roleMiddleware(['deleteSLA', 'SUPERADMIN']),
    service.deleteSLA,
  )
  router.delete(
    '/fullDeleteSLA',
    roleMiddleware(['fullDeleteSLA', 'SUPERADMIN']),
    service.fullDeleteSLA,
  )
  router.post(
    '/pullSLAFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullSLAFromArchive']),
    service.pullSLAFromArchive,
  )
  router.post(
    '/changeSLA',
    roleMiddleware(['changeSLA', 'SUPERADMIN']),
    service.changeSLA,
  )
  router.get(
    '/getOLA',
    roleMiddleware(['getOLA', 'SUPERADMIN']),
    service.getOLA,
  )
  router.get(
    '/getAllOLA',
    roleMiddleware(['getAllOLA', 'SUPERADMIN']),
    service.getAllOLA,
  )
  router.post(
    '/newOLA',
    roleMiddleware(['newOLA', 'SUPERADMIN']),
    service.newOLA,
  )
  router.post(
    '/deleteOLA',
    roleMiddleware(['deleteOLA', 'SUPERADMIN']),
    service.deleteOLA,
  )
  router.delete(
    '/fullDeleteOLA',
    roleMiddleware(['fullDeleteOLA', 'SUPERADMIN']),
    service.fullDeleteOLA,
  )
  router.post(
    '/pullOLAFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullOLAFromArchive']),
    service.pullOLAFromArchive,
  )
  router.post(
    '/changeOLA',
    roleMiddleware(['changeOLA', 'SUPERADMIN']),
    service.changeOLA,
  )

  apiRouter.use('/sla', router)
}
