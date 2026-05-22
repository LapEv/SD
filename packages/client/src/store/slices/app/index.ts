import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './interfaces'

const initialState: AppState = {
  dataWidth: 0,
  appOptions: {
    font: 'large',
    theme: 'light',
  },
  timeZone: new Date().getTimezoneOffset(),
  UTCDateTS: Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
    new Date().getUTCHours(),
    new Date().getUTCMinutes(),
    new Date().getUTCSeconds(),
    new Date().getUTCMilliseconds(),
  ),
}

export const appSlise = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDataWidth(state, action) {
      state.dataWidth = action.payload - 15
    },
    getUTCDateTS(state) {
      state.dataWidth = Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        new Date().getUTCSeconds(),
        new Date().getUTCMilliseconds(),
      )
    },
  },
})

export const appReducer = appSlise.reducer
export const { setDataWidth, getUTCDateTS } = appSlise.actions
