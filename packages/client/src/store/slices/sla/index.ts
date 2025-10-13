import { createSlice } from '@reduxjs/toolkit'
import { SLA, OLA, SLAState } from './interfaces'
import {
  getSLA,
  getOLA,
  newSLA,
  newOLA,
  deleteSLA,
  deleteOLA,
  changeSLA,
  changeOLA,
} from 'api/sla'

const initialState: SLAState = {
  sla: [],
  ola: [],
  activeSLA: '',
  activeList: '',
  isLoadingSLA: false,
}

export const slaSlise = createSlice({
  name: 'sla',
  initialState,
  reducers: {
    setActiveSLA(state, action) {
      state.activeSLA = action.payload
    },
    setActiveList(state, action) {
      state.activeList = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getSLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = payload as SLA[]
    })
    builder.addCase(getSLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(getSLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(newSLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = payload?.data as SLA[]
    })
    builder.addCase(newSLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(newSLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(deleteSLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = payload?.data as SLA[]
    })
    builder.addCase(deleteSLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(deleteSLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(changeSLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = payload?.data as SLA[]
    })
    builder.addCase(changeSLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(changeSLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(getOLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = payload as OLA[]
    })
    builder.addCase(getOLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(getOLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(newOLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = payload?.data as OLA[]
    })
    builder.addCase(newOLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(newOLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(deleteOLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = payload?.data as OLA[]
    })
    builder.addCase(deleteOLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(deleteOLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
    builder.addCase(changeOLA.fulfilled, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = payload?.data as OLA[]
    })
    builder.addCase(changeOLA.pending, state => {
      state.isLoadingSLA = true
    })
    builder.addCase(changeOLA.rejected, (state, { payload }) => {
      state.isLoadingSLA = false
      state.error = payload as string
    })
  },
})

export const slaReducer = slaSlise.reducer
export const { setActiveSLA, setActiveList } = slaSlise.actions
