import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  Clients,
  ClientsGroup,
  ChangeClient,
  ChangeClientsGroup,
} from 'store/slices/clients/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getClientGroups = createAsyncThunk(
  'client/getClientGroups',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClientsGroup[]>(
        ApiEndPoints.Clients.getClientGroups,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по группе клиентов: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newClientGroup = createAsyncThunk(
  'client/newClientGroup',
  async (clientGroup: ClientsGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.newClientGroup,
        clientGroup,
      )
      return {
        data,
        message: {
          text: 'Новая группа клиентов добавлена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новую группу клиентов: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteClientGroup = createAsyncThunk(
  'client/deleteClientGroup',
  async (selectedClientsGroup: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.deleteClientGroup,
        {
          selectedClientsGroup,
        },
      )
      return {
        data,
        message: {
          text: 'Группа клиентов удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить группу клиентов: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeClientGroup = createAsyncThunk(
  'client/changeClientGroup',
  async ({ groupName, clients, id }: ChangeClientsGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.changeClientGroup,
        {
          groupName,
          clients,
          id,
        },
      )
      return {
        data,
        message: {
          text: 'Группа клиентов изменена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить группу клиентов: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getClients = createAsyncThunk(
  'client/getClients',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Clients[]>(
        ApiEndPoints.Clients.getClients,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по клиентам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newClient = createAsyncThunk(
  'client/newClient',
  async (client: Clients, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.newClient,
        client,
      )
      return {
        data,
        message: {
          text: 'Новый клиент добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать нового клиента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteClient = createAsyncThunk(
  'client/deleteClient',
  async (selectedClients: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Clients.deleteClient, {
        selectedClients,
      })
      return {
        data,
        message: {
          text: 'Клиенты удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить клиентов: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeClient = createAsyncThunk(
  'client/changeClient',
  async (
    { client, legalName, contracts, contacts, comments, id }: ChangeClient,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Clients.changeClient, {
        client,
        legalName,
        contracts,
        contacts,
        comments,
        id,
      })
      return {
        data,
        message: {
          text: 'Клиент изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить клиента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
