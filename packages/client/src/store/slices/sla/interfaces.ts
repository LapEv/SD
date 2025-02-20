import { TypesOfWork } from '../incidents/interfaces'

export interface SLA {
  id: string
  sla: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  active: boolean
  TypesOfWork: TypesOfWork
}

export interface AddSLA {
  sla: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}

export interface OLA {
  id: string
  ola: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  active: boolean
  TypesOfWork: TypesOfWork
}

export interface AddOLA {
  ola: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}

export interface AnswerSLA {
  data: SLA[]
  type: string
}

export interface AnswerOLA {
  data: OLA[]
  type: string
}

export type SLAState = {
  sla: SLA[]
  ola: OLA[]
  activeSLA: string
  activeList: string
  isLoadingSLA: boolean
  error?: string
}

export interface ChangeSLA {
  sla: string
  id?: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}
export interface ChangeOLA {
  ola: string
  id?: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}

export interface IServiceList {
  name: string
  label: string
}
export interface IServiceListDataPage {
  sla?: string
  ola?: string
  id?: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  TypesOfWork: TypesOfWork
}

export interface IServiceListData extends IServiceListDataPage {
  height: number
}

export interface SLAList {
  sla?: string
  ola?: string
  id?: string
  days: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  TypesOfWork: TypesOfWork
}

export interface ServiceListItem {
  item: {
    sla?: string
    ola?: string
    id?: string
    days: string
    time: string
    timeStart: string
    timeEnd: string
    id_typeOfWork: string
  }[]
}

export interface SLAValues {
  list: {
    name: string
    label: string
    value: string | TypesOfWork
    validation: object
    disabled: boolean
    type: string
    required: boolean
  }[]
}

export interface AddValuesAddContract {
  listAddContract: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required?: boolean
  }[]
}

export interface SLAforINC {
  id: string
  sla: string
  days: string
  time: string
  timeStart: string
  active: boolean
}
