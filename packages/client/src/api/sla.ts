import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  SLA,
  OLA,
  ChangeSLA,
  ChangeOLA,
  AddSLA,
  AddOLA,
} from 'store/slices/sla/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getSLA = createAsyncThunk('sla/getSLA', async (_, thunkAPI) => {
  try {
    const { data } = await authhost.get<SLA[]>(ApiEndPoints.SLA.getSLA)
    return data
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по SLA: \n${
          error.response?.data.message ?? error.response?.data
        }`,
      )
    } else {
      console.error(error)
    }
  }
})

export const newSLA = createAsyncThunk(
  'sla/newSLA',
  async (sla: AddSLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.newSLA, sla)
      return {
        data,
        message: {
          text: 'Новый SLA добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый SLA: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteSLA = createAsyncThunk(
  'sla/deleteSLA',
  async (selectedSLA: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.deleteSLA, {
        selectedSLA,
      })
      return {
        data,
        message: {
          text: 'SLA удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить SLA: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeSLA = createAsyncThunk(
  'sla/changeSLA',
  async (
    { sla, id, days, time, timeStart, timeEnd, id_typeOfWork }: ChangeSLA,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeSLA, {
        sla,
        id,
        days,
        time,
        timeStart,
        timeEnd,
        id_typeOfWork,
      })
      return {
        data,
        message: {
          text: 'SLA изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить SLA: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getOLA = createAsyncThunk('sla/getOLA', async (_, thunkAPI) => {
  try {
    const { data } = await authhost.get<OLA[]>(ApiEndPoints.SLA.getOLA)
    return data
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по OLA: \n${
          error.response?.data.message ?? error.response?.data
        }`,
      )
    } else {
      console.error(error)
    }
  }
})

export const newOLA = createAsyncThunk(
  'sla/newOLA',
  async (ola: AddOLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.newOLA, ola)
      return {
        data,
        message: {
          text: 'Новый OLA добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый OLA: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteOLA = createAsyncThunk(
  'sla/deleteOLA',
  async (selectedOLA: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.deleteOLA, {
        selectedOLA,
      })
      return {
        data,
        message: {
          text: 'OLA удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить OLA: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeOLA = createAsyncThunk(
  'sla/changeOLA',
  async (
    { ola, id, days, time, timeStart, timeEnd, id_typeOfWork }: ChangeOLA,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeOLA, {
        ola,
        id,
        days,
        time,
        timeStart,
        timeEnd,
        id_typeOfWork,
      })
      return {
        data,
        message: {
          text: 'OLA изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить OLA: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
