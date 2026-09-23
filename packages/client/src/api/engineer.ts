import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import axios from 'axios'
import {
  AnswerGetEngineerINC,
  ChangeINCEngineerAddFiles,
  ChangeStatusDone,
  GetEngineerData,
  GetEngineerINCbyID,
} from 'store/slices/engineer/interface'
import { AnswerGetINC, INC } from 'store/slices/incidents/interfaces'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getINCsByFieldEngineer = createAsyncThunk(
  'engineer/getINCsByFieldEngineer',
  async ({ id, endDate }: GetEngineerData, thunkAPI) => {
    try {
      const { data } = await authhost.get<AnswerGetEngineerINC>(
        ApiEndPoints.Engineer.getINCsByFieldEngineer,
        { params: { id, endDate } },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по инцидентам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getINCbyID = createAsyncThunk(
  'engineer/getINCbyID',
  async ({ id }: GetEngineerINCbyID, thunkAPI) => {
    try {
      const { data } = await authhost.get<INC>(
        ApiEndPoints.Engineer.getINCbyID,
        { params: { id } },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по инцидентам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeINCAddEngineerFiles = createAsyncThunk(
  'engineer/changeINCAddEngineerFiles',
  async (dataINC: ChangeINCEngineerAddFiles, thunkAPI) => {
    try {
      const { data } = await authhost.post<AnswerGetINC>(
        ApiEndPoints.Engineer.changeINCAddEngineerFiles,
        dataINC,
      )
      return {
        data,
        message: {
          text: 'Акты добавлены!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось добавить акты: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeStatusDoneSVR = createAsyncThunk(
  'engineer/changeStatusDoneSVR',
  async (_data: ChangeStatusDone, thunkAPI) => {
    try {
      await authhost.post(ApiEndPoints.Engineer.changeStatusDone, _data)
      return {
        message: {
          text: `${_data.incident}: Назначен статус "Выполнено"`,
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить статус: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
