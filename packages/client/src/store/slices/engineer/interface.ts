import { Order } from 'utils/getComparator'
import { ChangeLogsEditINC, INC } from '../incidents/interfaces'

export type INCEngineerState = {
  incs: INC[]
  isLoadingEngineerINC: boolean
  filterEngineerStatus: string[]
  sortEngineerStatus: ISortEngineerStatus
  error?: string
  timeInterval: number
  toCloud: boolean
  oldINC?: INC
}

export interface AnswerGetEngineerINC {
  incs: INC[]
  count: number
}

export interface AnswerGetEngineerINCbyID {
  incs: INC[]
}

export interface ChangeINCEngineerAddFiles {
  endDate: Date | number
  logs: ChangeLogsEditINC[]
  id: string
  userId: string
}

export interface GetEngineerData {
  id: string
  endDate: Date
}

export interface GetEngineerINCbyID {
  id: string
}

export interface ISortEngineerStatus {
  order: Order
  orderBy: string
}

export interface ChangeStatusDone {
  id: string
  incident?: string
  id_incUser?: string
  log?: IINCLogs
  typeCompletedWork?: string
  id_typeCompletedWork?: string
  commentCloseCheck?: string
  timeDone?: string
  id_incDone?: string
  userDone?: string
  id_incStatus?: string
  status?: string
  act?: string[]
  spaceParts?: string[]
  files?: FileList[]
  Files?: FileList[]
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

export interface SetExecutor {
  id: string | null
  id_incExecutor: string
  incident: string
  executor: string | null
  userID: string
  userShortName: string
}
