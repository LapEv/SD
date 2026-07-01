import { Router } from 'express'
import { clientService } from '../services/clientService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const clientRouter = (apiRouter: Router) => {
  const service = new clientService()

  const router: Router = Router()

  router.get(
    '/getClientGroups',
    roleMiddleware(['getClientGroups', 'ADMIN', 'SUPERADMIN']),
    service.getClientGroups,
  )
  router.get(
    '/getAllClientGroups',
    roleMiddleware(['getAllClientGroups', 'ADMIN', 'SUPERADMIN']),
    service.getAllClientGroups,
  )
  router.post(
    '/newClientGroup',
    roleMiddleware(['newClientGroup', 'ADMIN', 'SUPERADMIN']),
    service.newClientGroup,
  )
  router.delete(
    '/deleteClientGroup',
    roleMiddleware(['deleteClientGroup', 'SUPERADMIN']),
    service.deleteClientGroup,
  )
  router.delete(
    '/fulldeleteClientsGroup',
    roleMiddleware(['fulldeleteClientsGroup', 'SUPERADMIN']),
    service.fulldeleteClientsGroup,
  )
  router.post(
    '/pullClientsGroupFromArchive',
    roleMiddleware(['pullClientsGroupFromArchive', 'SUPERADMIN']),
    service.pullClientsGroupFromArchive,
  )
  router.post(
    '/changeClientGroup',
    roleMiddleware(['changeClientGroup', 'ADMIN', 'SUPERADMIN']),
    service.changeClientGroup,
  )
  router.get(
    '/getAllClients',
    roleMiddleware(['getAllClients', 'ADMIN', 'SUPERADMIN']),
    service.getAllClients,
  )
  router.get(
    '/getClients',
    roleMiddleware(['getClients', 'ADMIN', 'SUPERADMIN']),
    service.getClients,
  )
  router.post(
    '/newClient',
    roleMiddleware(['newClient', 'ADMIN', 'SUPERADMIN']),
    service.newClient,
  )
  router.delete(
    '/deleteClient',
    roleMiddleware(['deleteClient', 'SUPERADMIN']),
    service.deleteClient,
  )
  router.delete(
    '/fulldeleteClient',
    roleMiddleware(['fulldeleteClient', 'SUPERADMIN']),
    service.fulldeleteClient,
  )
  router.post(
    '/changeClient',
    roleMiddleware(['changeClient', 'ADMIN', 'SUPERADMIN']),
    service.changeClient,
  )
  router.post(
    '/pullClientFromArchive',
    roleMiddleware(['pullClientFromArchive', 'SUPERADMIN']),
    service.pullClientFromArchive,
  )

  apiRouter.use('/client', router)
}
