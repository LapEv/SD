import { Router } from 'express'
import { roleService } from '../services/roleService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const roleRouter = (apiRouter: Router) => {
  const service = new roleService()

  const router: Router = Router()

  router.post(
    '/newRole',
    roleMiddleware(['addNewRole', 'SUPERADMIN']),
    service.newRole,
  )
  router.post(
    '/deleteRoles',
    roleMiddleware(['deleteRoles', 'SUPERADMIN']),
    service.deleteRoles,
  )
  router.delete(
    '/fullDeleteRole',
    roleMiddleware(['fullDeleteRole', 'SUPERADMIN']),
    service.fullDeleteRole,
  )
  router.post(
    '/newRolesGroup',
    roleMiddleware(['addNewRolesGroup', 'SUPERADMIN']),
    service.newRolesGroup,
  )
  router.post(
    '/deleteRolesGroup',
    roleMiddleware(['deleteRolesGroup', 'SUPERADMIN']),
    service.deleteRolesGroup,
  )
  router.delete(
    '/fullDeleteRolesGroup',
    roleMiddleware(['fullDeleteRolesGroup', 'SUPERADMIN']),
    service.fullDeleteRolesGroup,
  )
  router.post(
    '/changeRolesGroup',
    roleMiddleware(['changeRolesGroup', 'SUPERADMIN']),
    service.changeRolesGroup,
  )
  router.post(
    '/changeNameRolesGroup',
    roleMiddleware(['changeNameRolesGroup', 'SUPERADMIN']),
    service.changeNameRolesGroup,
  )
  router.post(
    '/changeNameRole',
    roleMiddleware(['changeNameRole', 'SUPERADMIN']),
    service.changeNameRole,
  )

  router.get('/getRoles', service.getRoles)
  router.get('/getAllRoles', service.getAllRoles)
  router.get('/getRolesGroup', service.getRolesGroup)
  router.get('/getAllRolesGroup', service.getAllRolesGroup)
  router.get('/getRolesGroupNotRoles', service.getRolesGroupNotRoles)
  router.get('/getAllRolesGroupNotRoles', service.getAllRolesGroupNotRoles)

  router.post(
    '/pullRoleFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullRoleFromArchive']),
    service.pullRoleFromArchive,
  )
  router.post(
    '/pullRolesGroupFromArchive',
    roleMiddleware(['SUPERADMIN', 'pullRolesGroupFromArchive']),
    service.pullRolesGroupFromArchive,
  )
  router.post(
    '/getRolesGroupByID',
    roleMiddleware(['getRolesGroupByID', 'SUPERADMIN']),
    service.getRolesGroupByID,
  )

  apiRouter.use('/role', router)
}
