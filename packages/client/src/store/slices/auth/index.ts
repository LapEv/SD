import { createSlice } from '@reduxjs/toolkit'
import {
  getUserInfo,
  updateProfile,
  ChangeAvatar,
  CheckUser,
  GetActiveUsers,
  getUserStatus,
  updateUser,
  GetFieldEngineers,
  GetDispatchers,
  deleteUser,
  deleteAvatar,
  changeUserAppOptions,
} from 'api/user'
import { signin, signup } from 'api/user'
import { AuthState, ICheckUser, User, UserStatus } from './interfaces'
import { getAvatar } from 'api/files'
import { ThemeColor } from 'themes/themeConfig'

const initialState: AuthState = {
  user: {},
  userInfo: {},
  activeUserInfo: '',
  userData: {},
  users: [],
  userStatus: [],
  fieldEngineers: [],
  dispatchers: [],
  avatar: '',
  userByDepartment: [],
  colorTheme: {
    colorLight: ThemeColor.light,
    colorDark: ThemeColor.dark,
  },
  admin: false,
  superAdmin: false,
  isLoadingAuth: true,
}

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData(state, action) {
      state.userData = action.payload
    },
    clearUser(state) {
      state.user = {}
    },
    signout(state) {
      localStorage.removeItem('token')
      state.error = ''
      state.user = {}
      state.userData = {}
    },
    setActiveUserInfo(state, action) {
      state.activeUserInfo = action.payload
    },
    setAvatar(state, action) {
      state.avatar = action.payload
    },
    changeColorTheme(state, action) {
      state.colorTheme = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      const { user } = payload as ICheckUser
      state.user = user
      state.userData = user
      localStorage.setItem('theme', user.theme ?? 'light')
      state.admin =
        (user.RolesGroup?.group.includes('ADMIN') ||
          user.RolesGroup?.group.includes('SUPERADMIN')) ??
        false
      state.superAdmin = user.RolesGroup?.group.includes('SUPERADMIN') ?? false
    })
    builder.addCase(signin.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(signin.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload as User
      state.userData = payload as User
    })
    builder.addCase(signup.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.userInfo = payload as User
    })
    builder.addCase(getUserInfo.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(getUserInfo.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetFieldEngineers.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.fieldEngineers = payload as User[]
    })
    builder.addCase(GetFieldEngineers.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetFieldEngineers.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetDispatchers.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.dispatchers = payload as User[]
    })
    builder.addCase(GetDispatchers.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetDispatchers.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetActiveUsers.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.users = payload as User[]
    })
    builder.addCase(GetActiveUsers.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetActiveUsers.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(CheckUser.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      const { user } = payload as ICheckUser
      if (user) {
        state.user = user
        state.userData = user
        localStorage.setItem('theme', user.theme ?? 'light')
        state.admin =
          (user.RolesGroup?.group.includes('ADMIN') ||
            user.RolesGroup?.group.includes('SUPERADMIN')) ??
          false
        state.superAdmin =
          user.RolesGroup?.group.includes('SUPERADMIN') ?? false
      } else {
        localStorage.setItem('theme', 'light')
      }
    })
    builder.addCase(CheckUser.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(CheckUser.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload as User
    })
    builder.addCase(updateProfile.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(ChangeAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload?.data as User
    })
    builder.addCase(ChangeAvatar.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(ChangeAvatar.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(deleteAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload?.data as User
      state.avatar = ''
    })
    builder.addCase(deleteAvatar.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(deleteAvatar.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(changeUserAppOptions.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload?.data as User
    })
    builder.addCase(changeUserAppOptions.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(changeUserAppOptions.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(getUserStatus.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.userStatus = payload as UserStatus[]
    })
    builder.addCase(getUserStatus.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(getUserStatus.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.userInfo = payload?.data as User
    })
    builder.addCase(updateUser.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(deleteUser.fulfilled, state => {
      state.isLoadingAuth = false
      state.error = ''
      state.userInfo = {}
      state.userData = {}
    })
    builder.addCase(deleteUser.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(getAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.avatar = payload as string
    })
    builder.addCase(getAvatar.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(getAvatar.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
  },
})

export const authReducer = authSlise.reducer
export const {
  updateUserData,
  clearUser,
  signout,
  setActiveUserInfo,
  setAvatar,
  changeColorTheme,
} = authSlise.actions
