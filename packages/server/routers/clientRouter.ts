import { Router } from 'express'
import { clientService } from '../services/clientService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const clientRouter = (apiRouter: Router) => {
  const service = new clientService()

  const router: Router = Router()

  router.get(
    '/getClientGroups',
    roleMiddleware(['getClientGroups', 'SUPERADMIN']),
    service.getClientGroups,
  )
  router.get(
    '/getAllClientGroups',
    roleMiddleware(['getAllClientGroups', 'SUPERADMIN']),
    service.getAllClientGroups,
  )
  router.post(
    '/newClientGroup',
    roleMiddleware(['newClientGroup', 'SUPERADMIN']),
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
    roleMiddleware(['changeClientGroup', 'SUPERADMIN']),
    service.changeClientGroup,
  )
  router.get(
    '/getAllClients',
    roleMiddleware(['getAllClients', 'SUPERADMIN']),
    service.getAllClients,
  )
  router.get(
    '/getClients',
    roleMiddleware(['getClients', 'SUPERADMIN']),
    service.getClients,
  )
  router.post(
    '/newClient',
    roleMiddleware(['newClient', 'SUPERADMIN']),
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
    roleMiddleware(['changeClient', 'SUPERADMIN']),
    service.changeClient,
  )
  router.post(
    '/pullClientFromArchive',
    roleMiddleware(['pullClientFromArchive', 'SUPERADMIN']),
    service.pullClientFromArchive,
  )

  apiRouter.use('/client', router)
}
