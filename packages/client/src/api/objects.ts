import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { ChangeObject, Objects } from 'store/slices/objects/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getObjects = createAsyncThunk(
  'objects/getObjects',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Objects[]>(
        ApiEndPoints.Objects.getObjects,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по объектам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newObject = createAsyncThunk(
  'objects/newObject',
  async (object: Objects, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Objects.newObject,
        object,
      )
      return {
        data,
        message: {
          text: 'Новый объект добавлен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый объект: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteObjects = createAsyncThunk(
  'objects/deleteObjects',
  async (selectedObjects: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Objects.deleteObjects, {
        selectedObjects,
      })
      return {
        data,
        message: {
          text: 'Объекты удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить объект: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeObject = createAsyncThunk(
  'objects/changeObject',
  async (
    {
      object,
      id_address,
      id_region,
      id_client,
      internalClientID,
      internalClientName,
      id,
    }: ChangeObject,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Objects.changeObject, {
        object,
        id_address,
        id_region,
        id_client,
        internalClientID,
        internalClientName,
        id,
      })
      return {
        data,
        message: {
          text: 'Объект изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить объект: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
