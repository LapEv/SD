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
} from 'api/clients'

const initialState: ClientsState = {
  clients: [],
  clientsGroup: [],
  activeClient: '',
  isLoadingClients: false,
}

export const clientsSlise = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setActiveClient(state, action) {
      state.activeClient = action.payload
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
      state.clients = payload as Clients[]
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
      state.clients = payload?.data as Clients[]
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
      state.clients = payload?.data as Clients[]
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
      state.clients = payload?.data as Clients[]
    })
    builder.addCase(changeClient.pending, state => {
      state.isLoadingClients = true
    })
    builder.addCase(changeClient.rejected, (state, { payload }) => {
      state.isLoadingClients = false
      state.error = payload as string
    })
  },
})

export const clientsReducer = clientsSlise.reducer
export const { setActiveClient } = clientsSlise.actions
