import { Router } from 'express'
import { engineerService } from '../services/engineerService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const engineerRouter = (apiRouter: Router) => {
  const service = new engineerService()

  const router: Router = Router()

  router.get(
    '/getINCsByFieldEngineer',
    roleMiddleware([
      'getINCsByFieldEngineer',
      'SUPERADMIN',
      'ADMIN',
      'Dispatcher',
      'FieldEngineers',
    ]),
    service.getINCsByFieldEngineer,
  )

  router.get(
    '/getINCbyID',
    roleMiddleware([
      'getINCbyID',
      'SUPERADMIN',
      'ADMIN',
      'Dispatcher',
      'FieldEngineers',
    ]),
    service.getINCbyID,
  )

  router.post(
    '/changeINCAddEngineerFiles',
    roleMiddleware([
      'changeINCAddEngineerFiles',
      'AdministrationCCA',
      'ADMIN',
      'Dispatcher',
      'SUPERADMIN',
      'FieldEngineers',
    ]),
    service.changeINCAddEngineerFiles,
  )
  router.post(
    '/changeStatusDone',
    roleMiddleware([
      'changeStatusDone',
      'AdministrationCCA',
      'ADMIN',
      'Dispatcher',
      'SUPERADMIN',
      'FieldEngineers',
    ]),
    service.changeStatusDone,
  )

  apiRouter.use('/engineer', router)
}
