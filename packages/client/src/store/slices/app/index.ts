import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './interfaces'

const initialState: AppState = {
  dataWidth: 0,
  appOptions: {
    font: 'large',
    theme: 'light',
  },
}

export const appSlise = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDataWidth(state, action) {
      state.dataWidth = action.payload - 15
    },
  },
})

export const appReducer = appSlise.reducer
export const { setDataWidth } = appSlise.actions
