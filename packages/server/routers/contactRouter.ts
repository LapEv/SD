import { Router } from 'express'
import { contactService } from '../services/contactService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const contactRouter = (apiRouter: Router) => {
  const service = new contactService()

  const router: Router = Router()

  router.get(
    '/getContacts',
    roleMiddleware(['getContacts', 'ADMIN', 'SUPERADMIN']),
    service.getContacts,
  )
  router.get(
    '/getAllContacts',
    roleMiddleware(['getAllContacts', 'ADMIN', 'SUPERADMIN']),
    service.getAllContacts,
  )
  router.post(
    '/newContact',
    roleMiddleware(['newContact', 'ADMIN', 'SUPERADMIN']),
    service.newContact,
  )
  router.post(
    '/deleteContact',
    roleMiddleware(['deleteContact', 'SUPERADMIN']),
    service.deleteContact,
  )
  router.delete(
    '/fullDeleteContact',
    roleMiddleware(['fullDeleteContact', 'SUPERADMIN']),
    service.fullDeleteContact,
  )
  router.post(
    '/pullContactFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullContactFromArchive']),
    service.pullContactFromArchive,
  )
  router.post(
    '/changeContact',
    roleMiddleware(['changeContact', 'ADMIN', 'SUPERADMIN']),
    service.changeContact,
  )

  apiRouter.use('/contact', router)
}
