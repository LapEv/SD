import { addressesReducer } from './addresses'
import { authReducer } from './auth'
import { classifierReducer } from './classifier'
import { messageReducer } from './message'
import { rolesReducer } from './roles'
import { structureReducer } from './structure'
import { slaReducer } from './sla'
import { clientsReducer } from './clients'
import { contractsReducer } from './contracts'
import { objectsReducer } from './objects'
import { incidentsReducer } from './incidents'
import { filesReducer } from './files'
import { appReducer } from './app'

export const rootReducer = {
  auth: authReducer,
  roles: rolesReducer,
  structure: structureReducer,
  message: messageReducer,
  addresses: addressesReducer,
  classifier: classifierReducer,
  sla: slaReducer,
  clients: clientsReducer,
  contracts: contractsReducer,
  objects: objectsReducer,
  incidents: incidentsReducer,
  files: filesReducer,
  app: appReducer,
}
