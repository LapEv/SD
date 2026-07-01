import { Router } from 'express'
import { incidentService } from '../services/incidentService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const incidentRouter = (apiRouter: Router) => {
  const service = new incidentService()

  const router: Router = Router()

  router.get(
    '/getIncidentStatuses',
    roleMiddleware(['getIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.getIncidentStatuses,
  )
  router.get(
    '/getAllIncidentStatuses',
    roleMiddleware(['getAllIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.getAllIncidentStatuses,
  )
  router.post(
    '/newIncidentStatuses',
    roleMiddleware(['newIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
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
    roleMiddleware(['getTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.getTypesOfWork,
  )
  router.get(
    '/getAllTypesOfWork',
    roleMiddleware(['getAllTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.getAllTypesOfWork,
  )
  router.post(
    '/newTypeOfWork',
    roleMiddleware(['newTypeOfWork', 'ADMIN', 'SUPERADMIN']),
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
    roleMiddleware(['changeTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.changeTypesOfWork,
  )

  router.get(
    '/getTypesCompletedWork',
    roleMiddleware(['getTypesCompletedWork', 'ADMIN', 'SUPERADMIN']),
    service.getTypesCompletedWork,
  )
  router.get(
    '/getAllTypesCompletedWork',
    roleMiddleware(['getAllTypesCompletedWork', 'ADMIN', 'SUPERADMIN']),
    service.getAllTypesCompletedWork,
  )
  router.post(
    '/newTypeCompletedWork',
    roleMiddleware(['newTypeCompletedWork', 'ADMIN', 'SUPERADMIN']),
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
    roleMiddleware(['changeTypesCompletedWork', 'ADMIN', 'SUPERADMIN']),
    service.changeTypesCompletedWork,
  )

  router.get(
    '/getFilter',
    roleMiddleware(['getFilter', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getFilter,
  )
  router.get(
    '/getINC',
    roleMiddleware(['getINC', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getINC,
  )
  router.get(
    '/getINCs',
    roleMiddleware(['getINCs', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getINCs,
  )
  router.get(
    '/getINCsByDate',
    roleMiddleware(['getINCsByDate', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getINCsByDate,
  )
  router.get(
    '/getAllINC',
    roleMiddleware(['getAllINC', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getAllINC,
  )
  router.post(
    '/newINC',
    roleMiddleware(['newINC', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
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
    roleMiddleware([
      'changeINC',
      'AdministrationCCA',
      'ADMIN',
      'Dispatcher',
      'SUPERADMIN',
    ]),
    service.changeINC,
  )
  router.post(
    '/changeINCAddFiles',
    roleMiddleware([
      'changeINC',
      'AdministrationCCA',
      'ADMIN',
      'Dispatcher',
      'SUPERADMIN',
    ]),
    service.changeINCAddFiles,
  )
  router.post(
    '/changeExecutor',
    roleMiddleware(['changeExecutor', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.changeExecutor,
  )
  router.post(
    '/changeResponsible',
    roleMiddleware(['changeResponsible', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.changeResponsible,
  )
  router.post(
    '/changeStatus',
    roleMiddleware(['changeStatus', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.changeStatus,
  )
  router.post(
    '/changeUserClosingCheck',
    roleMiddleware([
      'changeUserClosingCheck',
      'SUPERADMIN',
      'ADMIN',
      'Dispatcher',
    ]),
    service.changeUserClosingCheck,
  )
  router.post(
    '/changeUserClosing',
    roleMiddleware(['changeUserClosing', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.changeUserClosing,
  )
  router.post(
    '/changeComment',
    roleMiddleware(['changeComment', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.changeComment,
  )

  router.get(
    '/getINCLogs',
    roleMiddleware(['getINCLogs', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getINCLogs,
  )
  router.get(
    '/getAllINCLogs',
    roleMiddleware(['getAllINCLogs', 'SUPERADMIN', 'ADMIN', 'Dispatcher']),
    service.getAllINCLogs,
  )

  router.get(
    '/getTimeSLAs',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'Dispatcher']),
    service.getTimeSLAs,
  )

  router.post(
    '/changeTimeSLAs',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'Dispatcher']),
    service.changeTimeSLAs,
  )
  router.get(
    '/checkForCloseINC',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'Dispatcher']),
    service.checkForCloseINC,
  )
  apiRouter.use('/incidents', router)
}
