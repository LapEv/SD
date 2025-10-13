import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  AddINC,
  ChangeINC,
  INCStatuses,
  AddINCStatuses,
  ChangeINCStatuses,
  TypesOfWork,
  AddTypesOfWork,
  ChangeTypesOfWork,
  ChangeExecutor,
  ChangeResponsible,
  ChangeClosingCheck,
  ChangeClosing,
  ChangeStatus,
  TypesCompletedWork,
  AddTypesCompletedWork,
  ChangeTypesCompletedWork,
  GetINCsByParams,
  ChangeComment,
  AnswerGetINC,
} from 'store/slices/incidents/interfaces'
import axios from 'axios'
import { ICheckUser } from 'storeAuth/interfaces'

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

export const getFilter = createAsyncThunk(
  'incidents/getFilter',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ICheckUser>(
        ApiEndPoints.INC.getFilter,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по фильтрам: \n${
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
  async (
    { limit, nameSort, direction, page, filterOptions }: GetINCsByParams,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.get<AnswerGetINC>(
        ApiEndPoints.INC.getINCs,
        {
          params: { limit, nameSort, direction, page, filterOptions },
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

export const changeExecutor = createAsyncThunk(
  'incidents/changeExecutor',
  async (
    {
      id,
      id_incExecutor,
      incident,
      executor,
      userID,
      nameSort,
      direction,
      limit,
      page,
      filterOptions,
    }: ChangeExecutor,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeExecutor, {
        id,
        id_incExecutor,
        incident,
        executor,
        userID,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
      return {
        data,
        message: {
          text: id_incExecutor.length
            ? `${incident}: Назначен исполнитель "${executor}"`
            : `${incident}: Удален исполнитель!`,
          type: id_incExecutor.length ? 'success' : 'info',
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

export const changeResponsible = createAsyncThunk(
  'incidents/changeResponsible',
  async (
    {
      id,
      id_incResponsible,
      incident,
      responsible,
      userID,
      nameSort,
      direction,
      limit,
      page,
      filterOptions,
    }: ChangeResponsible,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeResponsible, {
        id,
        id_incResponsible,
        incident,
        responsible,
        userID,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
      return {
        data,
        message: {
          text: id_incResponsible.length
            ? `${incident}: Назначен ответственный "${responsible}"`
            : `${incident}: Удален ответственный!`,
          type: id_incResponsible.length ? 'success' : 'info',
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

export const changeStatus = createAsyncThunk(
  'incidents/changeStatus',
  async (
    {
      id,
      id_incStatus,
      incident,
      status,
      userID,
      timeSLA,
      commentCloseCheck,
      spaceParts,
      typeCompletedWork,
      nameSort,
      direction,
      limit,
      page,
      filterOptions,
    }: ChangeStatus,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeStatus, {
        id,
        id_incStatus,
        incident,
        status,
        userID,
        timeSLA,
        commentCloseCheck,
        spaceParts,
        typeCompletedWork,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
      return {
        data,
        message: {
          text: `${incident}: Назначен статус "${status}"`,
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

export const changeUserClosingCheck = createAsyncThunk(
  'incidents/changeUserClosingCheck',
  async ({ id, id_incClosingCheck }: ChangeClosingCheck, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeUserClosingCheck,
        {
          id,
          id_incClosingCheck,
        },
      )
      return {
        data,
        message: {
          text: `Назначен ответственный за выполнение!`,
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось назначить ответственного за выполнение: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeUserClosing = createAsyncThunk(
  'incidents/changeUserClosing',
  async ({ id, id_incClosing }: ChangeClosing, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeUserClosingCheck,
        {
          id,
          id_incClosing,
        },
      )
      return {
        data,
        message: {
          text: `Назначен ответственный за закрытие!`,
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось назначить ответственного за закрытие: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeComment = createAsyncThunk(
  'incidents/changeComment',
  async ({ id, comment }: ChangeComment, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeComment, {
        id,
        comment,
      })
      return {
        data,
        message: {
          text: 'Комментарий для инцидента изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить комментарий к инциденту: \n${
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
