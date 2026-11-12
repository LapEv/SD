import {
  AvatarClientProps,
  ChangeClient,
  ChangeClientsGroup,
  Clients,
  ClientsGroup,
  IClientContact,
  INewClientContact,
} from 'store/slices/clients/interfaces'

interface ErrObject {
  statusError: boolean
  id: number
}

export interface ClientsActions {
  getClientGroups: () => void
  getClients: () => void
  newClientGroup: (data: ClientsGroup) => void
  newClient: (data: Clients) => void
  deleteClientGroup: (data: string[]) => void
  deleteClient: (data: string[]) => void
  changeClientGroup: (data: ChangeClientsGroup) => void
  changeClient: (data: ChangeClient) => void
  newContact: (data: INewClientContact) => void
  changeContact: (data: IClientContact[]) => void
  setActiveClient: (id: string) => void
  setCheckError: (data: ErrObject) => void
  clearError: () => void
  setNewDataInputs: (data: Clients) => void
  changeClientAvatar: (data: AvatarClientProps) => void
  setClientAvatar: (data: string) => void
  deleteClientAvatar: (id: string) => void
}
