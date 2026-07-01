import { Router } from 'express'
import { systemService } from '../services/systemService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const systemRouter = (apiRouter: Router) => {
  const service = new systemService()

  const router: Router = Router()

  router.get(
    '/getSystem',
    roleMiddleware(['SUPERADMIN', 'ADMIN']),
    service.getSystem,
  )
  router.post('/setSystem', roleMiddleware(['SUPERADMIN']), service.setSystem)
  apiRouter.use('/system', router)
}
