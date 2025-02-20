import { Router } from 'express'
import { classifierService } from '../services/classifierService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const classifierRouter = (apiRouter: Router) => {
  const service = new classifierService()

  const router: Router = Router()

  router.get(
    '/getClassifierEquipments',
    roleMiddleware(['getClassifierEquipments', 'SUPERADMIN']),
    service.getClassifierEquipments,
  )
  router.get(
    '/getAllClassifierEquipments',
    roleMiddleware(['getAllClassifierEquipments', 'SUPERADMIN']),
    service.getAllClassifierEquipments,
  )
  router.post(
    '/newClassifierEquipment',
    roleMiddleware(['newClassifierEquipment', 'SUPERADMIN']),
    service.newClassifierEquipment,
  )
  router.post(
    '/deleteClassifierEquipment',
    roleMiddleware(['deleteClassifierEquipment', 'SUPERADMIN']),
    service.deleteClassifierEquipment,
  )
  router.delete(
    '/fullDeleteClassifierEquipment',
    roleMiddleware(['fullDeleteClassifierEquipment', 'SUPERADMIN']),
    service.fullDeleteClassifierEquipment,
  )
  router.post(
    '/pullClassifierEquipmentFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullClassifierEquipmentFromArchive']),
    service.pullClassifierEquipmentFromArchive,
  )
  router.post(
    '/changeClassifierEquipment',
    roleMiddleware(['changeClassifierEquipment', 'SUPERADMIN']),
    service.changeClassifierEquipment,
  )
  router.get(
    '/getClassifierModels',
    roleMiddleware(['getClassifierModels', 'SUPERADMIN']),
    service.getClassifierModels,
  )
  router.post(
    '/getClassifierModelsById',
    roleMiddleware(['getClassifierModelsById', 'SUPERADMIN']),
    service.getClassifierModelsById,
  )
  router.get(
    '/getAllClassifierModels',
    roleMiddleware(['getAllClassifierModels', 'SUPERADMIN']),
    service.getAllClassifierModels,
  )
  router.post(
    '/newClassifierModel',
    roleMiddleware(['newClassifierModel', 'SUPERADMIN']),
    service.newClassifierModel,
  )
  router.post(
    '/deleteClassifierModel',
    roleMiddleware(['deleteClassifierModel', 'SUPERADMIN']),
    service.deleteClassifierModel,
  )
  router.delete(
    '/fullDeleteClassifierModel',
    roleMiddleware(['fullDeleteClassifierModel', 'SUPERADMIN']),
    service.fullDeleteClassifierModel,
  )
  router.post(
    '/pullClassifierModelFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullClassifierModelFromArchive']),
    service.pullClassifierModelFromArchive,
  )
  router.post(
    '/changeClassifierModel',
    roleMiddleware(['changeClassifierModel', 'SUPERADMIN']),
    service.changeClassifierModel,
  )
  router.get(
    '/getTypicalMalfunctions',
    roleMiddleware(['getTypicalMalfunctions', 'SUPERADMIN']),
    service.getTypicalMalfunctions,
  )
  router.get(
    '/getAllTypicalMalfunctions',
    roleMiddleware(['getAllTypicalMalfunctions', 'SUPERADMIN']),
    service.getAllTypicalMalfunctions,
  )
  router.post(
    '/getTypicalMalfunctionsById',
    roleMiddleware(['getTypicalMalfunctionsById', 'SUPERADMIN']),
    service.getTypicalMalfunctionsById,
  )
  router.post(
    '/newTypicalMalfunction',
    roleMiddleware(['newTypicalMalfunction', 'SUPERADMIN']),
    service.newTypicalMalfunction,
  )
  router.post(
    '/deleteTypicalMalfunction',
    roleMiddleware(['deleteTypicalMalfunction', 'SUPERADMIN']),
    service.deleteTypicalMalfunction,
  )
  router.delete(
    '/fullDeleteTypicalMalfunction',
    roleMiddleware(['fullDeleteTypicalMalfunction', 'SUPERADMIN']),
    service.fullDeleteTypicalMalfunction,
  )
  router.post(
    '/pullTypicalMalfunctionFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullTypicalMalfunctionFromArchive']),
    service.pullTypicalMalfunctionFromArchive,
  )
  router.post(
    '/changeTypicalMalfunction',
    roleMiddleware(['changeTypicalMalfunction', 'SUPERADMIN']),
    service.changeTypicalMalfunction,
  )

  apiRouter.use('/classifier', router)
}
