import { Router } from 'express'
import { contractService } from '../services/contractService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const contractRouter = (apiRouter: Router) => {
  const service = new contractService()

  const router: Router = Router()

  router.get(
    '/getContracts',
    roleMiddleware(['getContracts', 'ADMIN', 'SUPERADMIN']),
    service.getContracts,
  )
  router.post(
    '/getContractsByClientID',
    roleMiddleware(['getContractsByClientID', 'ADMIN', 'SUPERADMIN']),
    service.getContractsByClientID,
  )
  router.get(
    '/getAllContracts',
    roleMiddleware(['getAllContracts', 'ADMIN', 'SUPERADMIN']),
    service.getAllContracts,
  )
  router.post(
    '/newContract',
    roleMiddleware(['newContract', 'ADMIN', 'SUPERADMIN']),
    service.newContract,
  )
  router.post(
    '/newContractName',
    roleMiddleware(['newContractName', 'ADMIN', 'SUPERADMIN']),
    service.newContractName,
  )
  router.post(
    '/deleteContract',
    roleMiddleware(['deleteContract', 'SUPERADMIN']),
    service.deleteContract,
  )
  router.delete(
    '/fullDeleteContract',
    roleMiddleware(['fullDeleteContract', 'SUPERADMIN']),
    service.fullDeleteContract,
  )
  router.post(
    '/pullContractFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullContractFromArchive']),
    service.pullContractFromArchive,
  )
  router.post(
    '/changeContract',
    roleMiddleware(['changeContract', 'ADMIN', 'SUPERADMIN']),
    service.changeContract,
  )

  apiRouter.use('/contracts', router)
}
