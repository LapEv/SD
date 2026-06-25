import { createSlice } from '@reduxjs/toolkit'
import { ISystem, SystemState } from './interfaces'
import { getSystem, setSystem } from 'api/system'

const initialState: SystemState = {
  system: {
    general: {
      name: '',
      emailSystem: '',
    },
    auth: {
      passwordMinLength: 5,
      passwordMaxLength: 30,
    },
    additional: {
      maxSizeFileUpload: 50,
    },
    emailServer: {
      timeZoneForNotification: 3,
      host: '',
      port: 0,
      email: '',
      password: '',
    },
    incident: {
      daysForClose: 0,
      emailTechnicalSupport: '',
    },
  },
  isLoadingSystem: false,
}

export const systemSlise = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setSystem.fulfilled, (state, { payload }) => {
      state.isLoadingSystem = false
      state.error = ''
      state.system = payload?.data as ISystem
    })
    builder.addCase(setSystem.pending, state => {
      state.isLoadingSystem = true
    })
    builder.addCase(setSystem.rejected, (state, { payload }) => {
      state.isLoadingSystem = false
      state.error = payload as string
    })
    builder.addCase(getSystem.fulfilled, (state, { payload }) => {
      state.isLoadingSystem = false
      state.error = ''
      state.system = payload as ISystem
    })
    builder.addCase(getSystem.pending, state => {
      state.isLoadingSystem = true
    })
    builder.addCase(getSystem.rejected, (state, { payload }) => {
      state.isLoadingSystem = false
      state.error = payload as string
    })
  },
})

export const systemReducer = systemSlise.reducer
