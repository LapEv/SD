import { createSlice } from '@reduxjs/toolkit'
import { Clients, ClientsGroup, ClientsState } from './interfaces'
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
import { newContact } from 'api/contacts'
import {
  getAvatarByClientId,
  getAvatarListClient,
  getClientAvatar,
} from 'api/files'

const initialState: ClientsState = {
  clients: [],
  newDataInputs: { legalName: '', client: '' },
  clientsGroup: [],
  checkError: [],
  activeClient: '',
  avatarClient: '',
  avatarListClient: '',
  isLoadingClients: false,
}
const prepareClients = (data: Clients[]) => {
  return data.map(item => {
    return {
      ...item,
      password: '',
    }
  })
}

export const clientsSlise = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setActiveClient(state, { payload }) {
      state.activeClient = payload
      state.avatarClient = ''
    },
    setCheckError(state, { payload }) {
      const find = state.checkError.find(obj => obj.id === payload.id)
      const checkAllErrors = find
        ? state.checkError.map(obj =>
            obj.id === payload.id
              ? { ...obj, statusError: payload.statusError }
              : obj,
          )
        : [...state.checkError, payload]
      state.checkError = checkAllErrors
    },
    clearError(state) {
      state.checkError = []
    },
    setNewDataInputs(state, { payload }) {
      state.newDataInputs = payload
    },
    setClientAvatar(state, action) {
      state.avatarClient = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getClientGroups.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clientsGroup = payload as ClientsGroup[]
    })
    builder.addCase(getClientGroups.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(getClientGroups.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(newClientGroup.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clientsGroup = payload?.data as ClientsGroup[]
    })
    builder.addCase(newClientGroup.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(newClientGroup.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(deleteClientGroup.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clientsGroup = payload?.data as ClientsGroup[]
    })
    builder.addCase(deleteClientGroup.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(deleteClientGroup.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(changeClientGroup.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clientsGroup = payload?.data as ClientsGroup[]
    })
    builder.addCase(changeClientGroup.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(changeClientGroup.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(getClients.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(payload as Clients[])
    })
    builder.addCase(getClients.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(getClients.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(newClient.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(payload?.data as Clients[])
    })
    builder.addCase(newClient.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(newClient.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(deleteClient.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(payload?.data as Clients[])
    })
    builder.addCase(deleteClient.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(deleteClient.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(changeClient.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(payload?.data as Clients[])
    })
    builder.addCase(changeClient.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(changeClient.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(newContact.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(
        state.clients.map(item =>
          payload?.data[0].id === item.id ? payload?.data[0] : item,
        ),
      )
    })
    builder.addCase(newContact.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(newContact.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(getClientAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.avatarClient = payload as string
    })
    builder.addCase(getClientAvatar.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(getClientAvatar.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(getAvatarByClientId.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.avatarClient = payload as string
    })
    builder.addCase(getAvatarByClientId.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(getAvatarByClientId.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(getAvatarListClient.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.avatarListClient = payload as string
    })
    builder.addCase(getAvatarListClient.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(getAvatarListClient.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(changeClientAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(payload?.data as Clients[])
    })
    builder.addCase(changeClientAvatar.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(changeClientAvatar.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
    builder.addCase(deleteClientAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = ''
      state.clients = prepareClients(payload?.data as Clients[])
      state.avatarClient = ''
    })
    builder.addCase(deleteClientAvatar.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(deleteClientAvatar.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
  },
})

export const clientsReducer = clientsSlise.reducer
export const {
  setActiveClient,
  setCheckError,
  clearError,
  setNewDataInputs,
  setClientAvatar,
} = clientsSlise.actions
