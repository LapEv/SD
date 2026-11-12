import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
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
  changeClientAvatar,
  deleteClientAvatar,
} from 'api/clients'
import { ClientsState } from 'store/slices/clients/interfaces'
import {
  setActiveClient,
  setCheckError,
  clearError,
  setNewDataInputs,
  setClientAvatar,
} from 'store/slices/clients'
import { changeContact, newContact } from 'api/contacts'

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
      newContact(data) {
        dispatch(newContact(data))
      },
      changeContact(data) {
        dispatch(changeContact(data))
      },
      setActiveClient(id) {
        dispatch(setActiveClient(id))
      },
      setCheckError(data) {
        dispatch(setCheckError(data))
      },
      clearError() {
        dispatch(clearError())
      },
      setNewDataInputs(data) {
        dispatch(setNewDataInputs(data))
      },
      changeClientAvatar(data) {
        dispatch(changeClientAvatar(data))
      },
      setClientAvatar(data) {
        dispatch(setClientAvatar(data))
      },
      deleteClientAvatar(id) {
        dispatch(deleteClientAvatar(id))
      },
    },
  ]
}
