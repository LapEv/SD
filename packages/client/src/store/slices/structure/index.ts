import { createSlice } from '@reduxjs/toolkit'
import { Department, Division, StructureState } from './interfaces'
import {
  getDepartments,
  getDivisions,
  newDepartment,
  newDivision,
  deleteDivision,
  deleteDepartment,
  changeNameDivision,
  changeNameDepartment,
} from 'api/structure'
import { deleteUser, newUser } from 'api/user'

const initialState: StructureState = {
  divisions: [],
  departaments: [],
  activeDivision: '',
  activeDepartment: '',
  isLoadingStructure: false,
}

export const structureSlise = createSlice({
  name: 'structure',
  initialState,
  reducers: {
    setActiveDivision(state, action) {
      state.activeDivision = action.payload
    },
    setActiveDepartment(state, action) {
      state.activeDepartment = action.payload
    },
  },

  extraReducers: builder => {
    builder.addCase(getDivisions.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = payload as Division[]
    })
    builder.addCase(getDivisions.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(getDivisions.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(getDepartments.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.departaments = payload as Department[]
    })
    builder.addCase(getDepartments.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(getDepartments.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(newDivision.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = payload?.data as Division[]
    })
    builder.addCase(newDivision.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(newDivision.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(newDepartment.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.departaments = payload?.data as Department[]
    })
    builder.addCase(newDepartment.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(newDepartment.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(deleteDivision.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = payload?.data as Division[]
    })
    builder.addCase(deleteDivision.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(deleteDivision.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(deleteDepartment.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.departaments = payload?.data as Department[]
    })
    builder.addCase(deleteDepartment.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(deleteDepartment.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = payload?.data as Division[]
    })
    builder.addCase(deleteUser.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(newUser.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = payload?.data as Division[]
    })
    builder.addCase(newUser.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(newUser.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(changeNameDivision.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = payload?.data as Division[]
    })
    builder.addCase(changeNameDivision.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(changeNameDivision.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
    builder.addCase(changeNameDepartment.fulfilled, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = ''
      state.departaments = payload?.data as Department[]
    })
    builder.addCase(changeNameDepartment.pending, state => {
      state.isLoadingStructure = true
    })
    builder.addCase(changeNameDepartment.rejected, (state, { payload }) => {
      state.isLoadingStructure = false
      state.error = payload as string
    })
  },
})

export const structureReducer = structureSlise.reducer
export const { setActiveDivision, setActiveDepartment } = structureSlise.actions
