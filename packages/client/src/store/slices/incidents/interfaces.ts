import { UserForINC } from 'storeAuth/interfaces'
import { Clients } from '../clients/interfaces'
import { ContractsForINC } from '../contracts/interfaces'
import { ObjectsForINC } from '../objects/interfaces'
import { SLAforINC } from '../sla/interfaces'
import {
  ClassifierEquipmentForINC,
  ClassifierModelForINC,
  TypicalMalfunctionForINC,
} from '../classifier/interfaces'
import { FilesData } from '../files/interfaces'
import { methodsReuqest } from 'pages/ControlRoom/Incidents/interfaces'

export interface INC {
  id: string
  edit: string
  indicator: string
  numberINC: number
  incident: string
  clientINC: string
  status: string
  client: string
  contract: string
  sla: string
  typeOfWork: string
  object: string
  address: string
  coordinates: string
  region: string
  userAccepted: string
  equipment: string
  model: string
  typicalMalfunction: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  executor: string
  responsible: string
  applicant: string
  applicantContacts: string
  userClosingCheck: string
  userClosing: string
  description: string
  comment: string
  report: string
  spaceParts: string[]
  act: string[]
  active: boolean
  typeCompletedWork: string
  IncindentStatus?: INCStatuses
  TypesOfWork?: TypesOfWork
  TypesCompletedWork?: TypesCompletedWork
  SLA?: SLAforINC
  Client?: Clients
  Contract?: ContractsForINC
  Object?: ObjectsForINC
  User?: UserForINC
  UserExecutor?: UserForINC
  UserResponsible?: UserForINC
  UserClosing?: UserForINC
  UserClosingCheck?: UserForINC
  ClassifierEquipment?: ClassifierEquipmentForINC
  ClassifierModel?: ClassifierModelForINC
  TypicalMalfunction?: TypicalMalfunctionForINC
  IncidentLogs?: IncidentLogsForINC[]
  Files?: FilesData[] | undefined
  files: FilesData[] | undefined
  legalName: string
  overdue: string
  commentCloseCheck: string
  commentClose: string
  rating: string
  parentalIncident: string
  relatedIncident: string
  methodsReuqest: methodsReuqest
  id_incContract?: string
  id_incClient?: string
  id_incEquipment?: string
  id_incModel?: string
  id_incTypicalMalfunction?: string
  id_incExecutor?: string
  id_incResponsible?: string
  id_incClosingCheck?: string
  id_incClosing?: string
  id_typeCompletedWork?: string
  id_typeOfWork?: string
  id_incSLA?: string
  logs?: IncidentLogsForINC[]
}

export interface AddINC {
  id_incStatus: string
  clientID: string
  contractID: string
  objectID: string
  SLAID: string
  typeOfWorkID: string
  slaDiff: number
  clientINC: string
  responsibleID: string
  equipmentId: string
  modelId: string
  typicalMalfunctionID: string
  description: string
  comment: string
  applicant: string
  applicantContacts: string
  methodsReuqest: methodsReuqest
  nameSort?: string
  direction?: string
  limit?: number
  page?: number
  filterOptions?: []
  timeInterval?: number
}

export interface INCStatuses {
  id: string
  statusINC: string
  stateNumber: number
  active?: boolean
  modal?: string
}

export interface AddINCStatuses {
  statusINC: string
  stateNumber: number
}

export interface IncidentLogsForINC {
  id: string
  time: string
  log: string
  User: {
    id: string
    username: string
    firstName: string
    lastname: string
    middleName: string
    shortName: string
    active: boolean
  }
}

export interface TypesOfWork {
  id: string
  typeOfWork: string
  active?: boolean
}

export interface TypesCompletedWork {
  id: string
  typeCompletedWork: string
  active?: boolean
}

export interface AddTypesOfWork {
  typeOfWork: string
}

export interface AddTypesCompletedWork {
  typeCompletedWork: string
}

export interface AnswerGetINC {
  incs: INC[]
  count: number
  filterListData: {
    status: string[]
    client: string[]
    legalName: string[]
    contract: string[]
    object: string[]
    address: string[]
    region: string[]
    userAccepted: string[]
    equipment: string[]
    model: string[]
    executor: string[]
    responsible: string[]
    overdue: string[]
    sla: string[]
  }
}

export interface AnswerAddINCFile {
  data: DataINC
  message: {
    text: string
    type: string
  }
}

export interface DataINC {
  incs: INC[]
  count: number
}

export interface AnswerGetINCs {
  data: {
    incs: INC[]
    count: number
    filterListData: {
      status: string[]
      client: string[]
      legalName: string[]
      contract: string[]
      object: string[]
      address: string[]
      region: string[]
      userAccepted: string[]
      equipment: string[]
      model: string[]
      executor: string[]
      responsible: string[]
      overdue: string[]
      sla: string[]
    }
  }
}

export interface AnswerINCsData {
  data: {
    incs: INC[]
    filterListData: {
      status: string[]
      client: string[]
      legalName: string[]
      contract: string[]
      object: string[]
      address: string[]
      region: string[]
      userAccepted: string[]
      equipment: string[]
      model: string[]
      executor: string[]
      responsible: string[]
      overdue: string[]
      sla: string[]
    }
  }
  type: string
}

export interface AnswerINC {
  data: INC[]
  type: string
}

export interface AnswerINCStatuses {
  data: INCStatuses[]
  type: string
}

export interface AnswerTypesOfWork {
  data: TypesOfWork[]
  type: string
}

export interface AnswerTypesCompletedWork {
  data: TypesCompletedWork[]
  type: string
}

export type INCState = {
  incidents: INC[]
  filtered: INC[]
  filteredLength: number
  incStatuses: INCStatuses[]
  typesOfWork: TypesOfWork[]
  typesCompletedWork: TypesCompletedWork[]
  isLoadingINC: boolean
  error?: string
  oldINC?: INC
}

export interface ChangeINCStatuses {
  statusINC: string
  id?: string
}

export interface ChangeTypesOfWork {
  typeOfWork: string
  id?: string
}

export interface ChangeTypesCompletedWork {
  typeCompletedWork: string
  id?: string
}

export interface GetINCsByParams {}

export type Order = 'asc' | 'desc'

export interface ChangeExecutor {
  id: string | null
  id_incExecutor: string
  incident: string
  executor: string | null
  userID: string
  userShortName: string
}

export interface ChangeResponsible {
  id: string
  id_incResponsible: string
  incident: string
  responsible: string
  userID: string
  notImportant?: boolean
  userShortName: string
}

export interface ChangeStatus {
  id: string
  id_incStatus: string
  _incident?: string
  status: string
  // userID: string
  timeSLA?: string
  id_incUser?: string
  userAccepted?: string
  id_incResponsible?: string
  responsible?: string
  timeRegistration?: string
  timeInWork?: string
  log?: IINCLogs
  typeCompletedWork?: string
  id_typeCompletedWork?: string
  commentCloseCheck?: string
  timeCloseCheck?: string
  id_incClosingCheck?: string
  userClosingCheck?: string
  act?: string[]
  spaceParts?: string[]
  files?: FileList[]
  Files?: FileList[]
}

export interface ChangeINC {
  editINC: INCEdit
  endDate: Date
  logs: ChangeLogsEditINC[]
}

export interface ChangeINCAddFiles {
  endDate: Date | number
  logs: ChangeLogsEditINC[]
}

export interface IINCLogs {
  User: {
    id: string
    shortName: string
  }
  log: {
    id_incLog: string
    time: string
    log: string
    id_incLogUser: string
  }
}

export interface ChangeLogsEditINC {
  id_incLog: string
  time: Date
  log: string
  id_incLogUser: string
}

export interface INCEditAddFiles {
  id: string
  act: string[]
  files: FilesData[]
}
export interface INCEdit {
  id: string
  act: string[]
  applicant: string
  applicantContacts: string
  clientINC: string
  commentClose: string
  commentCloseCheck: string
  contract: string
  id_incContract: string
  description: string
  equipment: string
  id_incEquipment: string
  executor: string
  id_incExecutor: string
  files?: FilesData[]
  model: string
  id_incModel: string
  responsible: string
  id_incResponsible: string
  sla: string
  id_incSLA: string
  typicalMalfunction: string
  id_incTypicalMalfunction: string
  typeCompletedWork: string
  id_typeCompletedWork: string
  typeOfWork: string
  id_typeOfWork: string
  relatedIncident: string
  parentalIncident: string
  spaceParts: string[]
  timeClose: Date | null
  timeCloseCheck: Date | null
  timeInWork: Date | null
  timeSLA: Date | null
  userClosing: string
  id_incClosing: string | undefined
  userClosingCheck: string
  id_incClosingCheck: string | undefined
}
