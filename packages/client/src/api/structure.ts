import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  ChangeNameDepartment,
  ChangeNameDivision,
  Department,
  Division,
  NewDepartment,
  NewDivision,
} from 'store/slices/structure/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getDivisions = createAsyncThunk(
  'structure/getDivisions',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Division[]>(
        ApiEndPoints.Structure.getDivisions,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по дивизионам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getDepartments = createAsyncThunk(
  'structure/getRolesGroup',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Department[]>(
        ApiEndPoints.Structure.getDepartments,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по департаментам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newDivision = createAsyncThunk(
  'structure/newDivision',
  async ({ division, divisionName }: NewDivision, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Structure.newDivision, {
        division,
        divisionName,
      })
      return {
        data,
        message: { text: 'Новый дивизион добавлен!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать дивизион: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newDepartment = createAsyncThunk(
  'structure/newDepartment',
  async (
    { department, departmentName, division, id_division }: NewDepartment,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.newDepartment,
        { department, departmentName, division, id_division },
      )
      return {
        data,
        message: { text: 'Новый отдел добавлен!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый отдел: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteDivision = createAsyncThunk(
  'structure/deleteDivision',
  async (selectedDivisions: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.updateDivision,
        { selectedDivisions },
      )
      return {
        data,
        message: { text: 'Дивизионы перемещены в архив', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить дивизион: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteDepartment = createAsyncThunk(
  'structure/deleteDepartment',
  async (selectedDepartments: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.updateDepartment,
        { selectedDepartments },
      )
      return {
        data,
        message: { text: 'Отделы перемещены в архив', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить отдел: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeNameDivision = createAsyncThunk(
  'structure/changeNameDivision',
  async ({ id, division, divisionName }: ChangeNameDivision, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.changeNameDivision,
        {
          id,
          division,
          divisionName,
        },
      )
      return {
        data,
        message: { text: 'Название дивизиона изменено!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить название дивизиона: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeNameDepartment = createAsyncThunk(
  'structure/changeNameDepartment',
  async (
    { id, department, departmentName }: ChangeNameDepartment,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.changeNameDepartment,
        {
          id,
          department,
          departmentName,
        },
      )
      return {
        data,
        message: { text: 'Название отдела изменено!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить название отдела: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
