export interface Clients {
  id?: string
  legalName: string
  client: string
  office?: string
  contracts?: string[]
  contacts?: string[]
  comments?: string
  active?: boolean
}
export interface ClientsGroup {
  id?: string
  groupName: string
  clients: string[]
  active?: boolean
}

export interface AnswerClients {
  data: Clients[]
  type: string
}

export interface AnswerClientsGroup {
  data: ClientsGroup[]
  type: string
}

export type ClientsState = {
  clients: Clients[]
  clientsGroup: ClientsGroup[]
  activeClient: string
  isLoadingClients: boolean
  error?: string
}

export interface ChangeClient {
  id?: string
  legalName: string
  client: string
  office?: string
  contracts?: string[]
  contacts?: string[]
  comments?: string
}
export interface ChangeClientsGroup {
  id?: string
  groupName: string
  clients: string[]
}

// export interface IServiceList {
//   name: string
//   label: string
// }
// export interface IServiceListData {
//   sla?: string
//   ola?: string
//   id?: string
//   time: string
//   timeStart: string
//   timeEnd: string
// }

// export interface ServiceListItem {
//   item: {
//     sla?: string
//     ola?: string
//     id?: string
//     time: string
//     timeStart: string
//     timeEnd: string
//   }[]
// }

// export interface SLAValues {
//   list: {
//     name: string
//     label: string
//     value: string
//     validation: object
//     disabled: boolean
//     type: string
//   }[]
// }
