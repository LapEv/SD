import { Router } from 'express'
import { incidentService } from '../services/incidentService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const incidentRouter = (apiRouter: Router) => {
  const service = new incidentService()

  const router: Router = Router()

  router.get(
    '/getIncidentStatuses',
    roleMiddleware(['getIncidentStatuses', 'SUPERADMIN']),
    service.getIncidentStatuses,
  )
  router.get(
    '/getAllIncidentStatuses',
    roleMiddleware(['getAllIncidentStatuses', 'SUPERADMIN']),
    service.getAllIncidentStatuses,
  )
  router.post(
    '/newIncidentStatuses',
    roleMiddleware(['newIncidentStatuses', 'SUPERADMIN']),
    service.newIncidentStatuses,
  )
  router.post(
    '/deleteIncidentStatuses',
    roleMiddleware(['deleteIncidentStatuses', 'SUPERADMIN']),
    service.deleteIncidentStatuses,
  )
  router.delete(
    '/fullDeleteIncidentStatuses',
    roleMiddleware(['fullDeleteIncidentStatuses', 'SUPERADMIN']),
    service.fullDeleteIncidentStatuses,
  )
  router.post(
    '/pullIncidentStatusesFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullIncidentStatusesFromArchive']),
    service.pullIncidentStatusesFromArchive,
  )
  router.post(
    '/changeIncidentStatuses',
    roleMiddleware(['changeIncidentStatuses', 'SUPERADMIN']),
    service.changeIncidentStatuses,
  )
  router.post(
    '/changeStateIncidentStatuses',
    roleMiddleware(['changeStateIncidentStatuses', 'SUPERADMIN']),
    service.changeStateIncidentStatuses,
  )

  router.get(
    '/getTypesOfWork',
    roleMiddleware(['getTypesOfWork', 'SUPERADMIN']),
    service.getTypesOfWork,
  )
  router.get(
    '/getAllTypesOfWork',
    roleMiddleware(['getAllTypesOfWork', 'SUPERADMIN']),
    service.getAllTypesOfWork,
  )
  router.post(
    '/newTypeOfWork',
    roleMiddleware(['newTypeOfWork', 'SUPERADMIN']),
    service.newTypeOfWork,
  )
  router.post(
    '/deleteTypesOfWork',
    roleMiddleware(['deleteTypesOfWork', 'SUPERADMIN']),
    service.deleteTypesOfWork,
  )
  router.delete(
    '/fullDeleteTypesOfWork',
    roleMiddleware(['fullDeleteTypesOfWork', 'SUPERADMIN']),
    service.fullDeleteTypesOfWork,
  )
  router.post(
    '/pullTypesOfWorkFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullTypesOfWorkFromArchive']),
    service.pullTypesOfWorkFromArchive,
  )
  router.post(
    '/changeTypesOfWork',
    roleMiddleware(['changeTypesOfWork', 'SUPERADMIN']),
    service.changeTypesOfWork,
  )

  router.get(
    '/getTypesCompletedWork',
    roleMiddleware(['getTypesCompletedWork', 'SUPERADMIN']),
    service.getTypesCompletedWork,
  )
  router.get(
    '/getAllTypesCompletedWork',
    roleMiddleware(['getAllTypesCompletedWork', 'SUPERADMIN']),
    service.getAllTypesCompletedWork,
  )
  router.post(
    '/newTypeCompletedWork',
    roleMiddleware(['newTypeCompletedWork', 'SUPERADMIN']),
    service.newTypeCompletedWork,
  )
  router.post(
    '/deleteTypesCompletedWork',
    roleMiddleware(['deleteTypesCompletedWork', 'SUPERADMIN']),
    service.deleteTypesCompletedWork,
  )
  router.delete(
    '/fullDeleteTypesCompletedWork',
    roleMiddleware(['fullDeleteTypesCompletedWork', 'SUPERADMIN']),
    service.fullDeleteTypesCompletedWork,
  )
  router.post(
    '/pullTypesCompletedWorkFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullTypesCompletedWorkFromArchive']),
    service.pullTypesCompletedWorkFromArchive,
  )
  router.post(
    '/changeTypesCompletedWork',
    roleMiddleware(['changeTypesCompletedWork', 'SUPERADMIN']),
    service.changeTypesCompletedWork,
  )

  router.get(
    '/getFilter',
    roleMiddleware(['getFilter', 'SUPERADMIN']),
    service.getFilter,
  )
  router.get(
    '/getINC',
    roleMiddleware(['getINC', 'SUPERADMIN']),
    service.getINC,
  )
  router.get(
    '/getINCs',
    roleMiddleware(['getINCs', 'SUPERADMIN']),
    service.getINCs,
  )
  router.get(
    '/getAllINC',
    roleMiddleware(['getAllINC', 'SUPERADMIN']),
    service.getAllINC,
  )
  router.post(
    '/newINC',
    roleMiddleware(['newINC', 'SUPERADMIN']),
    service.newINC,
  )
  router.post(
    '/deleteINC',
    roleMiddleware(['deleteINC', 'SUPERADMIN']),
    service.deleteINC,
  )
  router.delete(
    '/fullDeleteINC',
    roleMiddleware(['fullDeleteINC', 'SUPERADMIN']),
    service.fullDeleteINC,
  )
  router.post(
    '/pullINCFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullINCFromArchive']),
    service.pullINCFromArchive,
  )
  router.post(
    '/changeINC',
    roleMiddleware(['changeINC', 'SUPERADMIN']),
    service.changeINC,
  )
  router.post(
    '/changeExecutor',
    roleMiddleware(['changeExecutor', 'SUPERADMIN']),
    service.changeExecutor,
  )
  router.post(
    '/changeResponsible',
    roleMiddleware(['changeResponsible', 'SUPERADMIN']),
    service.changeResponsible,
  )
  router.post(
    '/changeStatus',
    roleMiddleware(['changeStatus', 'SUPERADMIN']),
    service.changeStatus,
  )
  router.post(
    '/changeUserClosingCheck',
    roleMiddleware(['changeUserClosingCheck', 'SUPERADMIN']),
    service.changeUserClosingCheck,
  )
  router.post(
    '/changeUserClosing',
    roleMiddleware(['changeUserClosing', 'SUPERADMIN']),
    service.changeUserClosing,
  )
  router.post(
    '/changeComment',
    roleMiddleware(['changeComment', 'SUPERADMIN']),
    service.changeComment,
  )

  router.get(
    '/getINCLogs',
    roleMiddleware(['getINCLogs', 'SUPERADMIN']),
    service.getINCLogs,
  )
  router.get(
    '/getAllINCLogs',
    roleMiddleware(['getAllINCLogs', 'SUPERADMIN']),
    service.getAllINCLogs,
  )

  router.get(
    '/getTimeSLAs',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getTimeSLAs,
  )

  router.post(
    '/changeTimeSLAs',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.changeTimeSLAs,
  )

  router.get(
    '/changetime',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.changetime,
  )

  apiRouter.use('/incidents', router)
}
