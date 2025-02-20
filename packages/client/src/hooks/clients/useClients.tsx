import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { ClientsActions } from './clientsActions'
import {
  getClientGroups,
  newClientGroup,
  deleteClientGroup,
  changeClientGroup,
  getClients,
  newClient,
  deleteClient,
  changeClient,
} from 'api/clients'
import { ClientsState } from 'store/slices/clients/interfaces'
import { setActiveClient } from 'store/slices/clients'

export function useClients(): [ClientsState, ClientsActions] {
  const clients = useSelector((state: RootState) => state.clients)
  const dispatch = useAppDispatch()

  return [
    clients,
    {
      getClientGroups() {
        dispatch(getClientGroups())
      },
      getClients() {
        dispatch(getClients())
      },
      newClientGroup(data) {
        dispatch(newClientGroup(data))
      },
      newClient(data) {
        dispatch(newClient(data))
      },
      deleteClientGroup(data) {
        dispatch(deleteClientGroup(data))
      },
      deleteClient(data) {
        dispatch(deleteClient(data))
      },
      changeClientGroup(data) {
        dispatch(changeClientGroup(data))
      },
      changeClient(data) {
        dispatch(changeClient(data))
      },
      setActiveClient(id) {
        dispatch(setActiveClient(id))
      },
    },
  ]
}
