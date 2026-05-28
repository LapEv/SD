import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import axios from 'axios'
import { ISystem } from 'store/slices/system/interfaces'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getSystem = createAsyncThunk(
  'system/getSystem',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ISystem>(
        ApiEndPoints.System.getSystem,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить параметры системы: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const setSystem = createAsyncThunk(
  'system/setSystem',
  async (system: ISystem, thunkAPI) => {
    try {
      const { data } = await authhost.post<ISystem>(
        ApiEndPoints.System.setSystem,
        system,
      )
      return {
        data,
        message: {
          text: 'Параметры системы добавлены!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось добавить новые параметры системы: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
