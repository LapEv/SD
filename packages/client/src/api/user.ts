import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
import {
  Login,
  SignUp,
  User,
  ChangePasswordProps,
  AvatarProps,
  UserStatus,
  delData,
  ICheckUser,
  NewUser,
  ChangeAppProps,
} from 'storeAuth/interfaces'
import { authhost, host, ApiEndPoints, authFileHost } from './config'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

interface Token {
  token: string
  id: string
}

export const signin = createAsyncThunk(
  'user/signin',
  async (loginData: Login, thunkAPI) => {
    try {
      const { data } = await host.post<ICheckUser>(
        ApiEndPoints.User.Login,
        loginData,
      )
      localStorage.setItem('token', data.token as string)
      const { id } = jwt_decode(data.token as string) as Token
      return {
        ...data,
        id,
        message: {
          text: 'Успешный вход в систему!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось авторизоваться: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const signup = createAsyncThunk(
  'user/setUser',
  async (signUpData: SignUp, thunkAPI) => {
    try {
      const { data } = await host.post(ApiEndPoints.User.SetUser, signUpData)
      return {
        data,
        message: {
          text: 'Пользователь зарегистрирован успешно!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось зарегистрироваться: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const newUser = createAsyncThunk(
  'user/newUser',
  async (newUserData: NewUser, thunkAPI) => {
    try {
      const { data } = await host.post(ApiEndPoints.User.newUser, newUserData)
      return {
        data,
        message: {
          text: 'Пользователь зарегистрирован успешно!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось зарегистрироваться: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(ApiEndPoints.User.UserInfo, {
        id,
      })
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные пользователя: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const GetActiveUsers = createAsyncThunk(
  'user/getActiveUsers',
  async (dataFind: User, thunkAPI) => {
    try {
      const { data } = await authhost.post<User[]>(
        ApiEndPoints.User.GetUsers,
        dataFind,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные пользователей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const GetDispatchers = createAsyncThunk(
  'user/getDispatchers',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(
        ApiEndPoints.User.GetDispatchers,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные пользователей по диспетчерам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const GetFieldEngineers = createAsyncThunk(
  'user/getFieldEngineers',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(
        ApiEndPoints.User.GetFieldEngineers,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные пользователей по инженерам: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const CheckUser = createAsyncThunk(
  'user/checkUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ICheckUser>(
        ApiEndPoints.User.CheckUser,
      )
      const { id } = jwt_decode(data.token as string) as Token
      return { ...data, id }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные пользователя: \n${
            error.response?.data.message ?? error
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (newProfile: User, thunkAPI) => {
    try {
      const { data } = await authhost.put<User[]>(
        ApiEndPoints.User.UpdateProfile,
        newProfile,
      )
      return {
        data,
        message: {
          text: 'Данные пользователя успешно изменены!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось обновить данные пользователя: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const ChangeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async ({ id_avatarFiles, selectedFile, id }: AvatarProps, thunkAPI) => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile.info as File)
      formData.append('id', id)
      formData.append('fileName', selectedFile?.info?.name as string)
      formData.append('id_avatarFiles', id_avatarFiles)
      const { data } = await authFileHost.post(
        ApiEndPoints.Files.uploadAvatars,
        formData,
      )
      return {
        data,
        message: {
          text: 'Новая аватарка успешно сохранена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось обновить аватар пользователя: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (value: ChangePasswordProps, thunkAPI) => {
    try {
      const { data } = await authhost.post<User[]>(
        ApiEndPoints.User.ChangePassword,
        value,
      )
      return {
        data,
        message: {
          text: 'Пароль успешно изменен!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось изменить пароль: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const changeUserAppOptions = createAsyncThunk(
  'user/changeUserAppOptions',
  async (appOptions: ChangeAppProps, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(
        ApiEndPoints.User.ChangeUserAppOptions,
        appOptions,
      )
      return {
        data,
        message: {
          text: 'Настройки изменены!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось обновить настройки приложения: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const getUserStatus = createAsyncThunk(
  'user/getUserStatus',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<UserStatus[]>(
        ApiEndPoints.User.GetUserStatus,
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить статусы пользователей: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id, reasonOfDelete }: delData, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.User.DeleteUser, {
        id,
        reasonOfDelete,
      })
      return {
        data,
        message: { text: 'Пользователь перемещен в архив', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось переместить пользователя в архив: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: User, thunkAPI) => {
    try {
      const id = userData.id
      const { data } = await authhost.post(ApiEndPoints.User.UpdateUser, {
        id,
        userData,
      })
      return {
        data,
        message: { text: 'Данные пользователя обновлены', type: 'success' },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось обновить данные пользователя: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)

export const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await authFileHost.post(
        ApiEndPoints.Files.deleteAvatar,
        { id },
      )
      return {
        data,
        message: {
          text: 'Аватарка удалена!',
          type: 'success',
        },
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось обновить аватар пользователя: \n${
            error.response?.data.message ?? error.response?.data
          }`,
        )
      } else {
        console.error(error)
      }
    }
  },
)
