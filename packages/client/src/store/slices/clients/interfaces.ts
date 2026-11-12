import { FileProps } from '../auth/interfaces'
import { FilesData } from '../files/interfaces'

export interface Clients {
  id?: string
  legalName: string
  client: string
  office?: string
  officePhone?: string
  contracts?: string[]
  comments?: string
  active?: boolean
  login?: string
  password?: string
  Contacts?: IClientContact[] | []
  Files?: FilesData[]
}

export interface IClientContact {
  id: string
  id_client: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  post: string
  phone: string
  comment: string
  active: boolean
}

export interface INewClientContact {
  id_client: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  post: string
  phone: string
  comment: string
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

interface ErrObject {
  statusError: boolean
  id: number
}

export type ClientsState = {
  clients: Clients[]
  newDataInputs: Clients
  clientsGroup: ClientsGroup[]
  checkError: ErrObject[]
  activeClient: string
  avatarClient: string
  avatarListClient: string
  isLoadingClients: boolean
  error?: string
}

export interface ChangeClient {
  id?: string
  legalName: string
  client: string
  office?: string
  officePhone?: string
  contracts?: string[]
  contacts?: IClientContact[] | null | undefined
  comments?: string
  login?: string
  password?: string
}

export interface ChangeClientsGroup {
  id?: string
  groupName: string
  clients: string[]
}

export interface INewDataContact {
  id: string
  [key: string]: string | boolean
}

export interface AvatarClientProps {
  selectedFile: FileProps
  id_avatarClientFiles: string
  id: string
}
