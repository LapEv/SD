import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'
import { IContracts } from './contracts'
import { IClients } from './clients'
import { IObjects } from './objects'
import {
  IClassifierEquipment,
  IClassifierModels,
  ITypicalMalfunctions,
} from './classifier'
import { IUser } from './users'
import { ISLA } from './sla'

export interface ITimeSLA {
  data: {
    id: string
    timeSLA: string
  }[]
}

export interface IIncindent {
  id: string
  numberINC: number
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  typeCompletedWork: string
  description: string
  comment: string
  commentCloseCheck: string
  commentClose: string
  report: string
  status: string
  responsible: string
  executor: string
  spaceParts: string[]
  active: boolean
  methodsReuqest: string
  rating: number
  parentalIncident: string
  relatedIncident: string
  applicant: string
  applicantContacts: string
  overdue: boolean
  Contract: IContracts
  IncindentStatus: IIncindentStatuses
  Client: IClients
  Object: IObjects
  ClassifierEquipment: IClassifierEquipment
  ClassifierModel: IClassifierModels
  TypicalMalfunction: ITypicalMalfunctions
  User: IUser
  UserExecutor: IUser
  UserResponsible: IUser
  SLA: ISLA
  id_incResponsible: string
  id_incClosingCheck: string
  id_typeCompletedWork: string
  id_incClosing: string
}

export interface Incindent {
  id: string
  numberINC: number
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  description: string
  comment: string
  commentCloseCheck: string
  commentClose: string
  report: string
  status: string
  responsible: string
  executor: string
  spaceParts: string[]
  active: boolean
  methodsReuqest: string
  rating: number
  parentalIncident: string
  relatedIncident: string
  applicant: string
  applicantContacts: string
  overdue: boolean
}

export const incident: ModelAttributes<Model, Incindent> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  numberINC: {
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  },
  incident: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  clientINC: {
    type: DataType.STRING,
    allowNull: true,
  },
  timeRegistration: {
    type: DataType.DATE,
    allowNull: true,
  },
  timeInWork: {
    type: DataType.DATE,
    allowNull: true,
  },
  timeSLA: {
    type: DataType.DATE,
    allowNull: false,
  },
  timeCloseCheck: {
    type: DataType.DATE,
    allowNull: true,
  },
  timeClose: {
    type: DataType.DATE,
    allowNull: true,
  },
  description: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  comment: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  commentCloseCheck: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  commentClose: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  report: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  spaceParts: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
  methodsReuqest: {
    type: DataType.STRING,
    allowNull: false,
  },
  status: {
    type: DataType.STRING,
    allowNull: false,
  },
  executor: {
    type: DataType.STRING,
    allowNull: true,
  },
  responsible: {
    type: DataType.STRING,
    allowNull: true,
  },

  rating: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  parentalIncident: {
    type: DataType.STRING,
    allowNull: true,
  },
  relatedIncident: {
    type: DataType.STRING,
    allowNull: true,
  },
  applicant: {
    type: DataType.STRING,
    allowNull: true,
  },
  applicantContacts: {
    type: DataType.STRING,
    allowNull: true,
  },
  overdue: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}

export interface IIncindentStatuses {
  id: string
  statusINC: string
  stateNumber: number
  modal: string
  active: boolean
}

export const incindentStatuses: ModelAttributes<Model, IIncindentStatuses> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  statusINC: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  stateNumber: {
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  },
  modal: {
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface ITypesOfWork {
  id: string
  typeOfWork: string
  active: boolean
}

export interface TypesOfWork {
  id: string
  typeOfWork: string
  active: boolean
}

export const typesOfWork: ModelAttributes<Model, TypesOfWork> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  typeOfWork: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface ITypesCompletedWork {
  id: string
  typeCompletedWork: string
  active: boolean
}

export interface TypesCompletedWork {
  id: string
  typeCompletedWork: string
  active: boolean
}

export const typesCompletedWork: ModelAttributes<Model, TypesCompletedWork> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  typeCompletedWork: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface IIncidentLogs {
  id: string
  time: string
  log: string
}

export interface IncidentLogs {
  id: string
  time: string
  log: string
}

export const incidentLogs: ModelAttributes<Model, IncidentLogs> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: DataType.DATE,
    allowNull: false,
  },
  log: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export interface INewINCFromMail {
  client: string
  contract: string
  clientINC: string
  object: string
  comment: string
  applicant: string
  applicantContacts: string
}
