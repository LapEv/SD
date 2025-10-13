import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  ClassifierEquipment,
  ClassifierModels,
  TypicalMalfunctions,
  ChangeClassifierEquipment,
  ChangeClassifierModel,
  ChangeTypicalMalfunction,
  ChangeModelsInTypicalMalfunction,
} from 'store/slices/classifier/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getClassifierEquipments = createAsyncThunk(
  'classifier/getClassifierEquipments',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClassifierEquipment[]>(
        ApiEndPoints.Classifier.getClassifierEquipments,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по класиффикатору оборудования: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newClassifierEquipment = createAsyncThunk(
  'classifier/newClassifierEquipment',
  async (equipment: ClassifierEquipment, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newClassifierEquipment,
        equipment,
      )
      return {
        data,
        message: {
          text: 'Новый классификатор оборудования добавлен',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новый классификатор оборудования: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteClassifierEquipment = createAsyncThunk(
  'classifier/deleteClassifierEquipment',
  async (selectedClassifierEquipments: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteClassifierEquipment,
        { selectedClassifierEquipments },
      )
      return {
        data,
        message: {
          text: 'Классификатор оборудования удалены',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить классификатор оборудования: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeClassifierEquipment = createAsyncThunk(
  'classifier/changeClassifierEquipment',
  async ({ equipment, id }: ChangeClassifierEquipment, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeClassifierEquipment,
        { equipment, id },
      )
      return {
        data,
        message: {
          text: 'Классификатор оборудования изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить классификатор оборудования: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getClassifierModels = createAsyncThunk(
  'classifier/getClassifierModels',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClassifierModels[]>(
        ApiEndPoints.Classifier.getClassifierModels,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по списку моделей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getClassifierModelsById = createAsyncThunk(
  'classifier/getClassifierModelsById',
  async (id_equipment: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<ClassifierModels[]>(
        ApiEndPoints.Classifier.getClassifierModelsById,
        { id_equipment },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по списку моделей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newClassifierModel = createAsyncThunk(
  'classifier/newClassifierModel',
  async (model: ClassifierModels, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newClassifierModel,
        model,
      )
      return {
        data,
        message: {
          text: 'Новый модель добавлена',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новую модель: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteClassifierModel = createAsyncThunk(
  'classifier/deleteClassifierModel',
  async (selectedClassifierModels: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteClassifierModel,
        { selectedClassifierModels },
      )
      return {
        data,
        message: {
          text: 'Модель удалена',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить модель: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeClassifierModel = createAsyncThunk(
  'classifier/changeClassifierModel',
  async (
    { model, id, selectedTypicalMalfunctions }: ChangeClassifierModel,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeClassifierModel,
        { model, id, selectedTypicalMalfunctions },
      )
      return {
        data,
        message: {
          text: 'Модель изменена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить модель: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getTypicalMalfunctions = createAsyncThunk(
  'classifier/getTypicalMalfunctions',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<TypicalMalfunctions[]>(
        ApiEndPoints.Classifier.getTypicalMalfunctions,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по списку типовых неисправностей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getTypicalMalfunctionsById = createAsyncThunk(
  'classifier/getTypicalMalfunctionsById',
  async (id_equipment: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<TypicalMalfunctions[]>(
        ApiEndPoints.Classifier.getTypicalMalfunctionsById,
        { id_equipment },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по списку типовых неисправностей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newTypicalMalfunction = createAsyncThunk(
  'classifier/newTypicalMalfunction',
  async (newTypicalMalfunction: TypicalMalfunctions, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newTypicalMalfunction,
        newTypicalMalfunction,
      )
      return {
        data,
        message: {
          text: 'Новая типовая неисправность добавлена',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось создать новую типовую неисправность: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteTypicalMalfunction = createAsyncThunk(
  'classifier/deleteTypicalMalfunction',
  async (selectedtypicalMalfunctions: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteTypicalMalfunction,
        { selectedtypicalMalfunctions },
      )
      return {
        data,
        message: {
          text: 'Типовая  неисправность удалена',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось удалить типоваю неисправность: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeTypicalMalfunction = createAsyncThunk(
  'classifier/changeTypicalMalfunction',
  async ({ typicalMalfunction, id }: ChangeTypicalMalfunction, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeTypicalMalfunction,
        { typicalMalfunction, id },
      )
      return {
        data,
        message: {
          text: 'Типовая неисправность изменена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить типовую неисправность: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeModelsInTypicalMalfunction = createAsyncThunk(
  'classifier/changeModelsInTypicalMalfunction',
  async (
    { id_equipment, newTypicalMalfunction }: ChangeModelsInTypicalMalfunction,
    thunkAPI,
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeModelsInTypicalMalfunction,
        { id_equipment, newTypicalMalfunction },
      )
      return {
        data,
        message: {
          text: 'Модель изменена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить модель: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
