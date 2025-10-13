import { createSlice } from '@reduxjs/toolkit'
import { Roles, RolesGroup, RolesState } from './interfaces'
import {
  deleteRoles,
  deleteRolesGroup,
  getRoles,
  getRolesGroup,
  newRole,
  newRolesGroup,
  changeRolesGroup,
  getRolesGroupNotRoles,
  changeNameRolesGroup,
  changeNameRole,
} from 'api/roles'

const initialState: RolesState = {
  roles: [],
  rolesGroup: [],
  activeRolesGroup: '',
  isLoadingRoles: false,
}

export const rolesSlise = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setActiveRolesGroup(state, action) {
      state.activeRolesGroup = action.payload
    },
  },

  extraReducers: builder => {
    builder.addCase(getRoles.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = payload as Roles[]
    })
    builder.addCase(getRoles.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(getRoles.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(getRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = payload as RolesGroup[]
    })
    builder.addCase(getRolesGroup.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(getRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(getRolesGroupNotRoles.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = payload as RolesGroup[]
    })
    builder.addCase(getRolesGroupNotRoles.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(getRolesGroupNotRoles.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(newRole.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = payload?.data as Roles[]
    })
    builder.addCase(newRole.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(newRole.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(newRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = payload?.data as RolesGroup[]
    })
    builder.addCase(newRolesGroup.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(newRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(deleteRoles.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = payload?.data as Roles[]
    })
    builder.addCase(deleteRoles.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(deleteRoles.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(deleteRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = payload?.data as RolesGroup[]
    })
    builder.addCase(deleteRolesGroup.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(deleteRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(changeRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = payload?.data as RolesGroup[]
    })
    builder.addCase(changeRolesGroup.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(changeRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(changeNameRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = payload?.data as RolesGroup[]
    })
    builder.addCase(changeNameRolesGroup.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(changeNameRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
    builder.addCase(changeNameRole.fulfilled, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = payload?.data as Roles[]
    })
    builder.addCase(changeNameRole.pending, state => {
      state.isLoadingRoles = true
    })
    builder.addCase(changeNameRole.rejected, (state, { payload }) => {
      state.isLoadingRoles = false
      state.error = payload as string
    })
  },
})

export const rolesReducer = rolesSlise.reducer
export const { setActiveRolesGroup } = rolesSlise.actions
