import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  ChangeNameRole,
  ChangeNameRolesGroup,
  NewRole,
  NewRolesGroup,
  Roles,
  RolesGroup,
  СhangeRolesGroup,
} from 'store/slices/roles/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getRoles = createAsyncThunk(
  'user/getRoles',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Roles[]>(ApiEndPoints.Roles.getRoles)
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по ролям: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getRolesGroup = createAsyncThunk(
  'user/getRolesGroup',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<RolesGroup[]>(
        ApiEndPoints.Roles.getRolesGroup,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по группам ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getRolesGroupNotRoles = createAsyncThunk(
  'user/getRolesGroupNotRoles',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<RolesGroup[]>(
        ApiEndPoints.Roles.getRolesGroupNotRoles,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по группам ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getRolesGroupByID = createAsyncThunk(
  'user/getRolesGroupByID',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<RolesGroup>(
        ApiEndPoints.Roles.getRolesGroupByID,
        { id },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по списку ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newRole = createAsyncThunk(
  'role/newRole',
  async (role: NewRole, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Roles.newRole, role)
      return {
        data,
        message: { text: 'Новая роль добавлена', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новую роль: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteRoles = createAsyncThunk(
  'role/deleteRoles',
  async (selectedRoles: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Roles.deleteRoles, {
        selectedRoles,
      })
      return {
        data,
        message: { text: 'Роли перемещены в архив!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось переместить роли в архив: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newRolesGroup = createAsyncThunk(
  'role/newRolesGroup',
  async (rolesGroup: NewRolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.newRolesGroup,
        rolesGroup,
      )
      return {
        data,
        message: { text: 'Новая группа ролей добавлена', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новую группу ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteRolesGroup = createAsyncThunk(
  'role/deleteRolesGroup',
  async (selectedRolesGroup: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.deleteRolesGroup,
        { selectedRolesGroup },
      )
      return {
        data,
        message: { text: 'Группа ролей удалена!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить группу ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeRolesGroup = createAsyncThunk(
  'role/changeRolesGroup',
  async ({ selectedRoles, activeRolesGroup }: СhangeRolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.changeRolesGroup,
        {
          selectedRoles,
          activeRolesGroup,
        },
      )
      return {
        data,
        message: { text: 'Группа ролей изменена!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить группу ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeNameRolesGroup = createAsyncThunk(
  'role/changeNameRolesGroup',
  async ({ id, group, groupName }: ChangeNameRolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.changeNameRolesGroup,
        {
          id,
          group,
          groupName,
        },
      )
      return {
        data,
        message: { text: 'Название группы ролей изменено!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить название группы ролей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeNameRole = createAsyncThunk(
  'role/changeNameRole',
  async ({ id, role, nameRole }: ChangeNameRole, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Roles.changeNameRole, {
        id,
        role,
        nameRole,
      })
      return {
        data,
        message: { text: 'Название роли изменено!', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить название роли: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
