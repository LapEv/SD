import {
  ChangeClient,
  ChangeClientsGroup,
  Clients,
  ClientsGroup,
} from 'store/slices/clients/interfaces'

export interface ClientsActions {
  getClientGroups: () => void
  getClients: () => void
  newClientGroup: (data: ClientsGroup) => void
  newClient: (data: Clients) => void
  deleteClientGroup: (data: string[]) => void
  deleteClient: (data: string[]) => void
  changeClientGroup: (data: ChangeClientsGroup) => void
  changeClient: (data: ChangeClient) => void
  setActiveClient: (id: string) => void
}
