import { throughModelRolesGroup } from './models/roles'
import { ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Repository } from './types/Repository'
import {
  roles,
  rolesGroup,
  division,
  department,
  users,
  userStatus,
  clients,
  clientsGroup,
  contracts,
  objects,
  classifierEquipment,
  classifierModels,
  typicalMalfunctions,
  sla,
  ola,
} from './models/index.models'
import { firstStart } from './data/firstStart/index.startData'
import { addresses, regions } from './models/adresses'
import {
  throughContractsEquipments,
  throughContractsObjects,
  throughContractsSLA,
  throughContractsModels,
  throughContractsIncStatusses,
} from './models/contracts'
import {
  incident,
  incidentLogs,
  incindentStatuses,
  typesCompletedWork,
  typesOfWork,
} from './models/incidents'
import { throughModelTypMalfunctions } from './models/classifier'
import { files } from './models/files'
import dotenv from 'dotenv'
import { isDev } from './data/app'

dotenv.config({ path: '../../.env' })

const {
  POSTGRES_USER_SD,
  POSTGRES_PASSWORD_SD,
  POSTGRES_DB_SD,
  POSTGRES_PORT_SD,
  POSTGRES_HOST_SD,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: isDev ? 'localhost' : POSTGRES_HOST_SD, //db - для докера; localhost - для npm run dev:ssr
  port: Number(POSTGRES_PORT_SD),
  username: POSTGRES_USER_SD,
  password: POSTGRES_PASSWORD_SD,
  database: POSTGRES_DB_SD,
  dialect: 'postgres',
  minifyAliases: true,
}

export const sequelize = new Sequelize(sequelizeOptions)

export const Roles = sequelize.define('Roles', roles, {})
export const RolesGroup = sequelize.define('RolesGroup', rolesGroup, {})
export const ThroughModelRolesGroup = sequelize.define(
  'ThroughModelRolesGroup',
  throughModelRolesGroup,
  {},
)

export const Division = sequelize.define('Division', division, {})
export const Department = sequelize.define('Department', department, {})
export const Users = sequelize.define('Users', users, {})
export const UserStatus = sequelize.define('UserStatus', userStatus, {})

export const ClientsGroup = sequelize.define('ClientsGroup', clientsGroup, {})
export const Clients = sequelize.define('Clients', clients, {})
export const Contracts = sequelize.define('Contracts', contracts, {})
export const Objects = sequelize.define('Objects', objects, {})
export const Addresses = sequelize.define('Addresses', addresses, {})
export const Regions = sequelize.define('Regions', regions, {})

export const ClassifierEquipment = sequelize.define(
  'ClassifierEquipment',
  classifierEquipment,
  {},
)
export const ClassifierModels = sequelize.define(
  'ClassifierModels',
  classifierModels,
  {},
)
export const TypicalMalfunctions = sequelize.define(
  'TypicalMalfunctions',
  typicalMalfunctions,
  {},
)
export const ThroughModelTypMalfunctions = sequelize.define(
  'ThroughModelTypMalfunctions',
  throughModelTypMalfunctions,
  {},
)
export const SLA = sequelize.define('SLA', sla, {})
export const OLA = sequelize.define('OLA', ola, {})
export const ThroughContractsSLA = sequelize.define(
  'ThroughContractsSLA',
  throughContractsSLA,
  {},
)
export const ThroughContractsEquipments = sequelize.define(
  'ThroughContractsEquipments',
  throughContractsEquipments,
  {},
)
export const ThroughContractsModels = sequelize.define(
  'ThroughContractsModels',
  throughContractsModels,
  {},
)
export const ThroughContractsObjects = sequelize.define(
  'ThroughContractsObjects',
  throughContractsObjects,
  {},
)

export const ThroughContractsIncStatusses = sequelize.define(
  'ThroughContractsIncStatusses',
  throughContractsIncStatusses,
  {},
)

export const Incidents = sequelize.define('Incidents', incident, {})
export const IncindentStatuses = sequelize.define(
  'IncindentStatuses',
  incindentStatuses,
  {},
)
export const TypesCompletedWork = sequelize.define(
  'TypesCompletedWork',
  typesCompletedWork,
  {},
)
export const TypesOfWork = sequelize.define('TypesOfWork', typesOfWork, {})
export const IncidentLogs = sequelize.define('IncidentLogs', incidentLogs, {})

export const Files = sequelize.define('Files', files, {})

RolesGroup.belongsToMany(Roles, {
  through: 'ThroughModelRolesGroup',
  foreignKey: 'id_rolesGroup',
})
Roles.belongsToMany(RolesGroup, {
  through: 'ThroughModelRolesGroup',
  foreignKey: 'id_roles',
})

RolesGroup.hasMany(Users, { foreignKey: 'id_rolesGroup' })
Users.belongsTo(RolesGroup, { foreignKey: 'id_rolesGroup', targetKey: 'id' })

Division.hasMany(Users, { foreignKey: 'id_division' })
Users.belongsTo(Division, { foreignKey: 'id_division', targetKey: 'id' })

Users.hasMany(Files, { foreignKey: 'id_avatarFiles' })
Files.belongsTo(Users, { foreignKey: 'id_avatarFiles', targetKey: 'id' })

Department.hasMany(Users, { foreignKey: 'id_department' })
Users.belongsTo(Department, { foreignKey: 'id_department', targetKey: 'id' })

Division.hasMany(Department, { foreignKey: 'id_division' })
Department.belongsTo(Division, { foreignKey: 'id_division', targetKey: 'id' })

Regions.hasMany(Addresses, { foreignKey: 'id_region' })
Addresses.belongsTo(Regions, { foreignKey: 'id_region', targetKey: 'id' })

Addresses.hasMany(Objects, { foreignKey: 'id_address' })
Objects.belongsTo(Addresses, { foreignKey: 'id_address' })

Regions.hasMany(Objects, { foreignKey: 'id_region' })
Objects.belongsTo(Regions, { foreignKey: 'id_region' })

ClassifierEquipment.hasMany(ClassifierModels, { foreignKey: 'id_equipment' })
ClassifierModels.belongsTo(ClassifierEquipment, {
  foreignKey: 'id_equipment',
  targetKey: 'id',
})

ClassifierEquipment.hasMany(TypicalMalfunctions, { foreignKey: 'id_equipment' })
TypicalMalfunctions.belongsTo(ClassifierEquipment, {
  foreignKey: 'id_equipment',
  targetKey: 'id',
})

ClassifierModels.belongsToMany(TypicalMalfunctions, {
  through: ThroughModelTypMalfunctions,
  foreignKey: 'id_model',
})
TypicalMalfunctions.belongsToMany(ClassifierModels, {
  through: ThroughModelTypMalfunctions,
  foreignKey: 'id_typicalMalfunction',
})

ClientsGroup.hasMany(Clients, { foreignKey: 'id_clientsGroup' })
Clients.belongsTo(ClientsGroup, {
  foreignKey: 'id_clientsGroup',
  targetKey: 'id',
})

Clients.hasMany(Contracts, { foreignKey: 'id_client' })
Contracts.belongsTo(Clients, { foreignKey: 'id_client' })

Clients.hasMany(Objects, { foreignKey: 'id_client' })
Objects.belongsTo(Clients, { foreignKey: 'id_client' })

Clients.belongsToMany(Users, { through: 'ThroughUserClients' })
Users.belongsToMany(Clients, { through: 'ThroughUserClients' })

Contracts.belongsToMany(SLA, {
  through: ThroughContractsSLA,
  foreignKey: 'id_contract',
})
SLA.belongsToMany(Contracts, {
  through: ThroughContractsSLA,
  foreignKey: 'id_sla',
})

Contracts.belongsToMany(Objects, {
  through: ThroughContractsObjects,
  foreignKey: 'id_contract',
})
Objects.belongsToMany(Contracts, {
  through: ThroughContractsObjects,
  foreignKey: 'id_object',
})

Contracts.belongsToMany(IncindentStatuses, {
  through: ThroughContractsIncStatusses,
  foreignKey: 'id_contract',
})
IncindentStatuses.belongsToMany(Contracts, {
  through: ThroughContractsIncStatusses,
  foreignKey: 'id_incStatusses',
})

Contracts.belongsToMany(ClassifierEquipment, {
  through: ThroughContractsEquipments,
  foreignKey: 'id_contract',
})
ClassifierEquipment.belongsToMany(Contracts, {
  through: ThroughContractsEquipments,
  foreignKey: 'id_equipment',
})

Contracts.belongsToMany(ClassifierModels, {
  through: ThroughContractsModels,
  foreignKey: 'id_contract',
})
ClassifierModels.belongsToMany(Contracts, {
  through: ThroughContractsModels,
  foreignKey: 'id_model',
})

TypesOfWork.hasOne(SLA, { foreignKey: 'id_typeOfWork', sourceKey: 'id' })
SLA.belongsTo(TypesOfWork, { foreignKey: 'id_typeOfWork', targetKey: 'id' })

TypesOfWork.hasOne(OLA, { foreignKey: 'id_typeOfWork', sourceKey: 'id' })
OLA.belongsTo(TypesOfWork, { foreignKey: 'id_typeOfWork', targetKey: 'id' })

IncindentStatuses.hasOne(Incidents, {
  foreignKey: 'id_incStatus',
  sourceKey: 'id',
})
Incidents.belongsTo(IncindentStatuses, {
  foreignKey: 'id_incStatus',
  targetKey: 'id',
})

TypesOfWork.hasOne(Incidents, {
  foreignKey: 'id_typeOfWork',
  sourceKey: 'id',
})
Incidents.belongsTo(TypesOfWork, {
  foreignKey: 'id_typeOfWork',
  targetKey: 'id',
})

TypesCompletedWork.hasOne(Incidents, {
  foreignKey: 'id_typeCompletedWork',
  sourceKey: 'id',
})
Incidents.belongsTo(TypesCompletedWork, {
  foreignKey: 'id_typeCompletedWork',
  targetKey: 'id',
})

SLA.hasOne(Incidents, { foreignKey: 'id_incSLA', sourceKey: 'id' })
Incidents.belongsTo(SLA, { foreignKey: 'id_incSLA', targetKey: 'id' })

Clients.hasOne(Incidents, { foreignKey: 'id_incClient', sourceKey: 'id' })
Incidents.belongsTo(Clients, { foreignKey: 'id_incClient', targetKey: 'id' })

Contracts.hasOne(Incidents, { foreignKey: 'id_incContract', sourceKey: 'id' })
Incidents.belongsTo(Contracts, {
  foreignKey: 'id_incContract',
  targetKey: 'id',
})

Objects.hasOne(Incidents, { foreignKey: 'id_incObject', sourceKey: 'id' })
Incidents.belongsTo(Objects, { foreignKey: 'id_incObject', targetKey: 'id' })

Users.hasOne(Incidents, {
  foreignKey: 'id_incExecutor',
  sourceKey: 'id',
  as: 'UserExecutor',
})
Incidents.belongsTo(Users, {
  foreignKey: 'id_incExecutor',
  targetKey: 'id',
  as: 'UserExecutor',
})

Users.hasOne(Incidents, {
  foreignKey: 'id_incResponsible',
  sourceKey: 'id',
  as: 'UserResponsible',
})
Incidents.belongsTo(Users, {
  foreignKey: 'id_incResponsible',
  targetKey: 'id',
  as: 'UserResponsible',
})

Users.hasOne(Incidents, {
  foreignKey: 'id_incClosingCheck',
  sourceKey: 'id',
  as: 'UserClosingCheck',
})
Incidents.belongsTo(Users, {
  foreignKey: 'id_incClosingCheck',
  targetKey: 'id',
  as: 'UserClosingCheck',
})

Users.hasOne(Incidents, {
  foreignKey: 'id_incClosing',
  sourceKey: 'id',
  as: 'UserClosing',
})
Incidents.belongsTo(Users, {
  foreignKey: 'id_incClosing',
  targetKey: 'id',
  as: 'UserClosing',
})

Users.hasOne(Incidents, { foreignKey: 'id_incUser', sourceKey: 'id' })
Incidents.belongsTo(Users, { foreignKey: 'id_incUser', targetKey: 'id' })

// Department.hasOne(Incidents, {
//   foreignKey: 'id_incDepartment',
//   sourceKey: 'id',
// })
// Incidents.belongsTo(Department, {
//   foreignKey: 'id_incDepartment',
//   targetKey: 'id',
// })

ClassifierEquipment.hasOne(Incidents, {
  foreignKey: 'id_incEquipment',
  sourceKey: 'id',
})
Incidents.belongsTo(ClassifierEquipment, {
  foreignKey: 'id_incEquipment',
  targetKey: 'id',
})

ClassifierModels.hasOne(Incidents, {
  foreignKey: 'id_incModel',
  sourceKey: 'id',
})
Incidents.belongsTo(ClassifierModels, {
  foreignKey: 'id_incModel',
  targetKey: 'id',
})

TypicalMalfunctions.hasOne(Incidents, {
  foreignKey: 'id_incTypicalMalfunction',
  sourceKey: 'id',
})
Incidents.belongsTo(TypicalMalfunctions, {
  foreignKey: 'id_incTypicalMalfunction',
  targetKey: 'id',
})

Users.hasOne(IncidentLogs, { foreignKey: 'id_incLogUser', sourceKey: 'id' })
IncidentLogs.belongsTo(Users, { foreignKey: 'id_incLogUser', targetKey: 'id' })

Incidents.hasMany(Files, { foreignKey: 'id_incFiles' })
Files.belongsTo(Incidents, { foreignKey: 'id_incFiles' })

Incidents.hasMany(IncidentLogs, { foreignKey: 'id_incLog' })
IncidentLogs.belongsTo(Incidents, { foreignKey: 'id_incLog' })

export const userRepos = new Repository(Users as ModelCtor)
export const roleGroupRepos = new Repository(RolesGroup as ModelCtor)
export const roleRepos = new Repository(Roles as ModelCtor)
export const ThroughModelRolesGroupRepos = new Repository(
  ThroughModelRolesGroup as ModelCtor,
)
export const DivisionRepos = new Repository(Division as ModelCtor)
export const DepartmentRepos = new Repository(Department as ModelCtor)
export const UserStatusRepos = new Repository(UserStatus as ModelCtor)

export const RegionsRepos = new Repository(Regions as ModelCtor)
export const AddressesRepos = new Repository(Addresses as ModelCtor)

export const ClientsGroupRepos = new Repository(ClientsGroup as ModelCtor)
export const ClientsRepos = new Repository(Clients as ModelCtor)
export const ContractsRepos = new Repository(Contracts as ModelCtor)
export const ObjectsRepos = new Repository(Objects as ModelCtor)

export const ClassifierEquipmentRepos = new Repository(
  ClassifierEquipment as ModelCtor,
)
export const ClassifierModelsRepos = new Repository(
  ClassifierModels as ModelCtor,
)
export const TypicalMalfunctionsRepos = new Repository(
  TypicalMalfunctions as ModelCtor,
)
export const ThroughModelTypMalfunctionsRepos = new Repository(
  ThroughModelTypMalfunctions as ModelCtor,
)

export const SLARepos = new Repository(SLA as ModelCtor)
export const OLARepos = new Repository(OLA as ModelCtor)

export const ThroughContractsSLARepos = new Repository(
  ThroughContractsSLA as ModelCtor,
)
export const ThroughContractsEquipmentsRepos = new Repository(
  ThroughContractsEquipments as ModelCtor,
)
export const ThroughContractsModelsRepos = new Repository(
  ThroughContractsModels as ModelCtor,
)
export const ThroughContractsObjectsRepos = new Repository(
  ThroughContractsObjects as ModelCtor,
)
export const ThroughContractsIncStatussesRepos = new Repository(
  ThroughContractsIncStatusses as ModelCtor,
)

export const IncidentStatusesRepos = new Repository(
  IncindentStatuses as ModelCtor,
)
export const IncidentRepos = new Repository(Incidents as ModelCtor)
export const TypesOfWorkRepos = new Repository(TypesOfWork as ModelCtor)
export const TypesCompletedWorkRepos = new Repository(
  TypesCompletedWork as ModelCtor,
)
export const IncidentLogsRepos = new Repository(IncidentLogs as ModelCtor)

export const FilesRepos = new Repository(Files as ModelCtor)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully!')
    await firstStart()
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
