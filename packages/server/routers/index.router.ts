import { Router } from 'express'
import { userRouter } from './userRouter'
import { roleRouter } from './roleRouter'
import { divisionRouter } from './divisionRouter'
import { departmentRouter } from './departmentRouter'
import { userStatusRouter } from './userStatusRouter'
import { addressRouter } from './addressRouter'
import { clientRouter } from './clientRouter'
import { classifierRouter } from './classifierRouter'
import { slaRouter } from './slaRouter'
import { contractRouter } from './contractRouter'
import { objectsRouter } from './objectsRouter'
import { incidentRouter } from './IncidentRouter'
import { filesRouter } from './filesRouter'

export const apiRouter: Router = Router()

userRouter(apiRouter)
roleRouter(apiRouter)
divisionRouter(apiRouter)
departmentRouter(apiRouter)
userStatusRouter(apiRouter)
addressRouter(apiRouter)
addressRouter(apiRouter)
clientRouter(apiRouter)
classifierRouter(apiRouter)
slaRouter(apiRouter)
contractRouter(apiRouter)
objectsRouter(apiRouter)
incidentRouter(apiRouter)
filesRouter(apiRouter)
