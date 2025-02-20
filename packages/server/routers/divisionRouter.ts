import { Router } from 'express'
import { divisionService } from '../services/divisionService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const divisionRouter = (apiRouter: Router) => {
  const service = new divisionService()

  const router: Router = Router()

  router.post(
    '/newDivision',
    roleMiddleware(['newDivision', 'SUPERADMIN']),
    service.newDivision,
  )
  router.get(
    '/getDivisions',
    roleMiddleware(['getDivisions', 'SUPERADMIN']),
    service.getDivisions,
  )
  router.get(
    '/getAllDivisions',
    roleMiddleware(['getAllDivisions', 'SUPERADMIN']),
    service.getAllDivisions,
  )
  router.post(
    '/deleteDivision',
    roleMiddleware(['deleteDivision', 'SUPERADMIN', 'ADMIN']),
    service.deleteDivision,
  )
  router.post(
    '/pullDivisionFromArchive',
    roleMiddleware(['pullDivisionFromArchive', 'SUPERADMIN', 'ADMIN']),
    service.pullDivisionFromArchive,
  )
  router.delete(
    '/fullDeleteDivision',
    roleMiddleware(['fullDeleteDivision', 'SUPERADMIN']),
    service.fullDeleteDivision,
  )
  router.post(
    '/changeNameDivision',
    roleMiddleware(['changeNameDivision', 'SUPERADMIN']),
    service.changeNameDivision,
  )

  apiRouter.use('/structure', router)
}
