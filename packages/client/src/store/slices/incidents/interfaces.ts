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
import { Files } from '../files/interfaces'
import { Options } from 'components/DropDown/interface'

export interface INC {
  id: string
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
  spaceParts: string | string[]
  act: string
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
  Files?: Files[]
  legalName: string
  overdue: string
  commentCloseCheck: string
  commentClose: string
  rating: string
  parentalIncident: string
  relatedIncident: string
}

export interface AddINC {
  id_incStatus: string
  clientID: string
  contractID: string
  objectID: string
  SLAID: string
  typeOfWorkID: string
  timeSLA: string
  clientINC: string
  responsibleID: string
  equipmentId: string
  modelId: string
  typicalMalfunctionID: string
  description: string
  comment: string
  applicant: string
  applicantContacts: string
  methodsReuqest: string
  nameSort?: string
  direction?: string
  limit?: number
  page?: number
  filterOptions?: []
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

export interface AnswerGetFilter {
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

export interface FilterListData {
  status: string[]
  legalName: string[]
  client: string[]
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

export type INCState = {
  countIncidents: number
  incidents: INC[]
  incStatuses: INCStatuses[]
  typesOfWork: TypesOfWork[]
  typesCompletedWork: TypesCompletedWork[]
  filterListData: FilterListData
  activeINC: string
  isLoadingINC: boolean
  outputFilter: OutputFilter
  error?: string
}

export interface GetINCsByParams {
  limit: number
  nameSort: string
  direction: string
  page: number
  filterOptions?: (
    | {
        [x: string]: string
      }[]
    | undefined
  )[]
}

export interface ChangeINC {
  id?: string
  numberINC?: number
  clientID?: string
  contractID?: string
  objectID?: string
  SLAID?: string
  typeOfWorkID?: string
  incident: string
  clientINC: string
  timeRegistration?: string
  timeInWork?: string
  timeSLA: string
  timeCloseCheck?: string
  timeClose?: string
  executor?: string
  responsible?: string
  description: string
  comment: string
  report?: string
  spaceParts?: string

  responsibleID?: string
  equipmentId?: string
  modelId?: string
  typicalMalfunctionID?: string
  applicant?: string
  applicantContacts?: string
  nameSort?: string
  direction?: string
  limit?: number
  page?: number
  filterOptions?: []
}

// export interface ChangeINCData {
//   clientINC: string
//   responsibleID: string
//   equipmentId: string
//   modelId: string
//   typicalMalfunctionID: string
//   description: string
//   comment: string
//   applicant: string
//   applicantContacts: string
//   nameSort?: string
//   direction?: string
//   limit?: number
//   page?: number
//   filterOptions?: []
// }

export interface ChangeExecutor {
  id: string
  id_incExecutor: string
  incident: string
  executor: string
  userID: string
  nameSort?: string
  direction?: string
  limit?: number
  page?: number
  filterOptions?: (
    | {
        [x: string]: string
      }[]
    | undefined
  )[]
}

export interface ChangeResponsible {
  id: string
  id_incResponsible: string
  incident: string
  responsible: string
  userID: string
  nameSort?: string
  direction?: string
  limit?: number
  page?: number
  filterOptions?: (
    | {
        [x: string]: string
      }[]
    | undefined
  )[]
}

export interface ChangeStatus {
  id: string
  id_incStatus: string
  incident: string
  status: string
  userID: string
  timeSLA: string
  typeCompletedWork?: Options
  commentCloseCheck?: string
  act?: string[]
  spaceParts?: string[]
  nameSort?: string
  direction?: string
  limit?: number
  page?: number
  filterOptions?: (
    | {
        [x: string]: string
      }[]
    | undefined
  )[]
}

export interface ChangeClosingCheck {
  id: string
  id_incClosingCheck: string
}

export interface ChangeClosing {
  id: string
  id_incClosing: string
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

export interface ChangeComment {
  id: string
  comment: string
}

export interface IServiceList {
  name: string
  label: string
}

export interface IncidentDataINC {
  id: string
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
  spaceParts: string
  act: string
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
  Files?: Files[]
  legalName: string
  overdue: string
}

export interface OutputFilter {
  isOutputFilter: boolean
  filterID: string
  filterText: string
}
