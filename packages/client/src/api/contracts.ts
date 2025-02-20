import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  ChangeContract,
  Contracts,
  NewContractName,
} from 'store/slices/contracts/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getContracts = createAsyncThunk(
  'contracts/getContracts',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Contracts[]>(
        ApiEndPoints.Contracts.getContracts,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по контрактам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getContractsByClientID = createAsyncThunk(
  'contracts/getContractsByClientID',
  async (id_client: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<Contracts[]>(
        ApiEndPoints.Contracts.getContractsByClientID,
        { id_client },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по контрактам ID клиента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newContract = createAsyncThunk(
  'contracts/newContract',
  async (contract: Contracts, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.newContract,
        contract,
      )
      return {
        data,
        message: {
          text: 'Новый контракт добавлен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый контракт: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newContractName = createAsyncThunk(
  'contracts/newContractName',
  async ({ contract, id }: NewContractName, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.newContractName,
        {
          contract,
          id,
        },
      )
      return {
        data,
        message: {
          text: 'Наименование контракта изменено!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый контракт: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteContract = createAsyncThunk(
  'contracts/deleteContract',
  async (selectedContracts: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.deleteContract,
        {
          selectedContracts,
        },
      )
      return {
        data,
        message: {
          text: 'Контракты удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить контракты: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeContract = createAsyncThunk(
  'contracts/changeContract',
  async (
    {
      number,
      date,
      sla,
      equipment,
      model,
      objects,
      incStatusses,
      id,
      notificationEmail,
    }: ChangeContract,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.changeContract,
        {
          number,
          date,
          notificationEmail,
          sla,
          equipment,
          model,
          objects,
          incStatusses,
          id,
        },
      )
      return {
        data,
        message: {
          text: 'Контракт изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить контракт: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
