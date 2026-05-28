import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  AddINC,
  INCStatuses,
  AddINCStatuses,
  ChangeINCStatuses,
  TypesOfWork,
  AddTypesOfWork,
  ChangeTypesOfWork,
  TypesCompletedWork,
  AddTypesCompletedWork,
  ChangeTypesCompletedWork,
  AnswerGetINC,
  GetINCsByParams,
  ChangeResponsible,
  ChangeExecutor,
  ChangeStatus,
  ChangeINC,
  ChangeINCAddFiles,
} from 'store/slices/incidents/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getINC = createAsyncThunk(
  'incidents/getINC',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<AnswerGetINC>(ApiEndPoints.INC.getINC)
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

export const getINCs = createAsyncThunk(
  'incidents/getINCs',
  async (params: GetINCsByParams, thunkAPI) => {
    try {
      const { data } = await authhost.get<AnswerGetINC>(
        ApiEndPoints.INC.getINCs,
        {
          params: { params },
        },
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

export const getINCsByDate = createAsyncThunk(
  'incidents/getINCsByDate',
  async (endDate: Date, thunkAPI) => {
    try {
      const { data } = await authhost.get<AnswerGetINC>(
        ApiEndPoints.INC.getINCsByDate,
        { params: { endDate } },
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

export const newINC = createAsyncThunk(
  'incidents/newINC',
  async (inc: AddINC, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.newINC, inc)
      return {
        data,
        message: {
          text: 'Новый инцидент добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый инцидент: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeExecutorSVR = createAsyncThunk(
  'incidents/changeExecutorSVR',
  async (_data: ChangeExecutor, thunkAPI) => {
    try {
      await authhost.post(ApiEndPoints.INC.changeExecutor, _data)
      return {
        message: {
          text: _data.id_incExecutor.length
            ? `${_data.incident}: Назначен исполнитель "${_data.executor}"`
            : `${_data.incident}: Удален исполнитель!`,
          type: _data.id_incExecutor.length ? 'success' : 'info',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось назначить исполнителя: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeResponsibleSVR = createAsyncThunk(
  'incidents/changeResponsibleSVR',
  async (_data: ChangeResponsible, thunkAPI) => {
    try {
      await authhost.post(ApiEndPoints.INC.changeResponsible, _data)
      return {
        message: {
          text: _data.id_incResponsible.length
            ? `${_data.incident}: Назначен ответственный "${_data.responsible}"`
            : `${_data.incident}: Удален ответственный!`,
          type: _data.id_incResponsible.length ? 'success' : 'info',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось назначить ответственного: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeStatusSVR = createAsyncThunk(
  'incidents/changeStatusSVR',
  async (_data: ChangeStatus, thunkAPI) => {
    try {
      await authhost.post(ApiEndPoints.INC.changeStatus, _data)
      return {
        message: {
          text: `${_data._incident}: Назначен статус "${_data.status}"`,
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

export const changeINC = createAsyncThunk(
  'incidents/changeINC',
  async (dataINC: ChangeINC, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeINC, dataINC)
      return {
        data,
        message: {
          text: 'Инцидент изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить инцидент: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeINCAddFiles = createAsyncThunk(
  'incidents/changeINCAddFiles',
  async (dataINC: ChangeINCAddFiles, thunkAPI) => {
    try {
      const { data } = await authhost.post<AnswerGetINC>(
        ApiEndPoints.INC.changeINCAddFiles,
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

export const getIncidentStatuses = createAsyncThunk(
  'incidents/getIncidentStatuses',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<INCStatuses[]>(
        ApiEndPoints.INC.getIncidentStatuses,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по статусам инцидентов: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newIncidentStatuses = createAsyncThunk(
  'incidents/newIncidentStatuses',
  async ({ statusINC, stateNumber }: AddINCStatuses, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.newIncidentStatuses,
        { statusINC, stateNumber },
      )
      return {
        data,
        message: {
          text: 'Новый статус инцидента добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый статус инцидента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteIncidentStatuses = createAsyncThunk(
  'incidents/deleteIncidentStatuses',
  async (selectedINCStatuses: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.deleteIncidentStatuses,
        {
          selectedINCStatuses,
        },
      )
      return {
        data,
        message: {
          text: 'Статус инцидента удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить статус инцидента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeIncidentStatuses = createAsyncThunk(
  'incidents/changeIncidentStatuses',
  async ({ statusINC, id }: ChangeINCStatuses, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeIncidentStatuses,
        {
          statusINC,
          id,
        },
      )
      return {
        data,
        message: {
          text: 'Статус инцидента изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить статус инцидента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeStateIncidentStatuses = createAsyncThunk(
  'incidents/changeStateIncidentStatuses',
  async (dataINCStatuses: INCStatuses[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeStateIncidentStatuses,
        dataINCStatuses,
      )
      return {
        data,
        message: {
          text: 'Порядок статусов инцидента изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить порядок статусов инцидента: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getTypesOfWork = createAsyncThunk(
  'incidents/getTypesOfWork',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<TypesOfWork[]>(
        ApiEndPoints.INC.getTypesOfWork,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по типам работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newTypeOfWork = createAsyncThunk(
  'incidents/newTypeOfWork',
  async (typeOfWork: AddTypesOfWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.newTypeOfWork,
        typeOfWork,
      )
      return {
        data,
        message: {
          text: 'Новый тип работ добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `е удалось создать новый тип работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteTypesOfWork = createAsyncThunk(
  'incidents/deleteTypesOfWork',
  async (selectedTypesOfWork: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.deleteTypesOfWork, {
        selectedTypesOfWork,
      })
      return {
        data,
        message: {
          text: 'Типы работ удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить типы работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeTypesOfWork = createAsyncThunk(
  'incidents/changeTypesOfWork',
  async ({ typeOfWork, id }: ChangeTypesOfWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeTypesOfWork, {
        typeOfWork,
        id,
      })
      return {
        data,
        message: {
          text: 'Тип работ изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить тип работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getTypesCompletedWork = createAsyncThunk(
  'incidents/getTypesCompletedWork',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<TypesCompletedWork[]>(
        ApiEndPoints.INC.getTypesCompletedWork,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по типам выполненных работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newTypeCompletedWork = createAsyncThunk(
  'incidents/newTypeCompletedWork',
  async (typeCompletedWork: AddTypesCompletedWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.newTypeCompletedWork,
        typeCompletedWork,
      )
      return {
        data,
        message: {
          text: 'Новый тип выполненных работ добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый тип выполненных работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteTypesCompletedWork = createAsyncThunk(
  'incidents/deleteTypesCompletedWork',
  async (selectedTypeCompletedWork: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.deleteTypesCompletedWork,
        {
          selectedTypeCompletedWork,
        },
      )
      return {
        data,
        message: {
          text: 'Типы выполненных работ удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить типы выполненных работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeTypesCompletedWork = createAsyncThunk(
  'incidents/changeTypesCompletedWork',
  async ({ typeCompletedWork, id }: ChangeTypesCompletedWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeTypesCompletedWork,
        {
          typeCompletedWork,
          id,
        },
      )
      return {
        data,
        message: {
          text: 'Тип выполненных работ изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить тип выполненных работ: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const checkForCloseINC = createAsyncThunk(
  'incidents/checkForCloseINC',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get(ApiEndPoints.INC.checkForCloseINC)
      return {
        data,
        message: {
          text: 'Автозакртыие инцидентов по истечению срока завершена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось закрыть инциденты по истечениб срока!: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
