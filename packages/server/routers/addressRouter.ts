import { Router } from 'express'
import { addressService } from '../services/addressService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const addressRouter = (apiRouter: Router) => {
  const service = new addressService()

  const router: Router = Router()

  router.get(
    '/getAddresses',
    roleMiddleware(['getAddresses', 'SUPERADMIN']),
    service.getAddresses,
  )
  router.get(
    '/getAllAddresses',
    roleMiddleware(['getAllAddresses', 'SUPERADMIN']),
    service.getAllAddresses,
  )
  router.post(
    '/newAddress',
    roleMiddleware(['newAddress', 'SUPERADMIN']),
    service.newAddress,
  )
  router.post(
    '/deleteAddress',
    roleMiddleware(['deleteAddress', 'SUPERADMIN']),
    service.deleteAddress,
  )
  router.delete(
    '/fullDeleteAddress',
    roleMiddleware(['fullDeleteAddress', 'SUPERADMIN']),
    service.fullDeleteAddress,
  )
  router.post(
    '/pullAddressFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullAddressFromArchive']),
    service.pullAddressFromArchive,
  )
  router.post(
    '/changeAddress',
    roleMiddleware(['changeAddress', 'SUPERADMIN']),
    service.changeAddress,
  )
  router.get(
    '/getRegions',
    roleMiddleware(['getRegions', 'SUPERADMIN']),
    service.getRegions,
  )
  router.get(
    '/getAllRegions',
    roleMiddleware(['getAllRegions', 'SUPERADMIN']),
    service.getAllRegions,
  )

  router.post(
    '/newRegion',
    roleMiddleware(['newRegion', 'SUPERADMIN']),
    service.newRegion,
  )
  router.post(
    '/deleteRegion',
    roleMiddleware(['deleteRegion', 'SUPERADMIN']),
    service.deleteRegion,
  )
  router.delete(
    '/fullDeleteRegion',
    roleMiddleware(['fullDeleteRegion', 'SUPERADMIN']),
    service.fullDeleteRegion,
  )
  router.post(
    '/pullRegionFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullRegionFromArchive']),
    service.pullRegionFromArchive,
  )
  router.post(
    '/changeRegion',
    roleMiddleware(['changeRegion', 'SUPERADMIN']),
    service.changeRegion,
  )

  apiRouter.use('/addresses', router)
}
