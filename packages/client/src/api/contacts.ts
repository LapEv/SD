import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import axios from 'axios'
import {
  IClientContact,
  INewClientContact,
} from 'store/slices/clients/interfaces'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const newContact = createAsyncThunk(
  'client/newContact',
  async (contact: INewClientContact, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contacts.newContact,
        contact,
      )
      return {
        data,
        message: {
          text: 'Новый контакт добавлен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый контакт: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeContact = createAsyncThunk(
  'contact/changeContact',
  async (_data: IClientContact[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contacts.changeContact,
        _data,
      )
      return {
        data,
        message: {
          text: 'Контакт изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить контакт: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
