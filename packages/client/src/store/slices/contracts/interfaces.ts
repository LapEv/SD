import { ClassifierEquipment, ClassifierModels } from '../classifier/interfaces'
import { Clients } from '../clients/interfaces'
import { INCStatuses } from '../incidents/interfaces'
import { Objects } from '../objects/interfaces'
import { SLA } from '../sla/interfaces'

export interface Contracts {
  id?: string
  contract: string
  number: string
  date: string
  notificationEmail: string
  sla?: string[]
  equipment?: string[]
  model?: string[]
  objects?: string[]
  id_client: string
  active?: boolean
  SLAs?: SLA[] | []
  ClassifierEquipments?: ClassifierEquipment[] | []
  ClassifierModels?: ClassifierModels[] | []
  Objects?: Objects[] | []
  Client?: Clients[] | []
  IncindentStatuses?: INCStatuses[] | []
}

export interface ContractsPage extends Contracts {
  height: number
}

export interface IContractData {
  id?: string
  contract: string
  number: string
  date: string
  notificationEmail: string
  // sla?: string[]
  // equipment?: string[]
  // objects?: string[]
  id_client: string
  // SLAs?: SLA[] | []
  // ClassifierEquipment?: ClassifierEquipment[] | []
  // Objects?: Objects[] | []
}

export interface AnswerContracts {
  data: Contracts[]
  type: string
}

export type ContractsState = {
  contracts: Contracts[]
  activeContract: string
  isLoadingContracts: boolean
  error?: string
}

export interface ChangeContract {
  id?: string
  contract?: string
  number: string
  notificationEmail: string
  date: string
  sla?: string[]
  equipment?: string[]
  model?: string[]
  objects?: string[]
  incStatusses?: string[]
}
export interface NewContractName {
  contract: string
  id: string
}

export interface ContractsForINC {
  id: string
  contract: string
  active: true
}
