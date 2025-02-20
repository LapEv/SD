import { createSlice } from '@reduxjs/toolkit'
import { Addresses, Regions, AddressesState } from './interfaces'
import {
  getAddresses,
  newAddress,
  deleteAddress,
  changeAddress,
  getRegions,
  newRegion,
  deleteRegion,
  changeRegion,
} from 'api/address'

const initialState: AddressesState = {
  addresses: [],
  regions: [],
  isLoadingAddress: false,
}

export const addressesSlise = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(getAddresses.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.addresses = payload as Addresses[]
    })
    builder.addCase(getAddresses.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(getAddresses.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(newAddress.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.addresses = payload?.data as Addresses[]
    })
    builder.addCase(newAddress.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(newAddress.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(deleteAddress.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.addresses = payload?.data as Addresses[]
    })
    builder.addCase(deleteAddress.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(deleteAddress.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(changeAddress.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.addresses = payload?.data as Addresses[]
    })
    builder.addCase(changeAddress.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(changeAddress.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(getRegions.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.regions = payload as Regions[]
    })
    builder.addCase(getRegions.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(getRegions.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(newRegion.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.regions = payload?.data as Regions[]
    })
    builder.addCase(newRegion.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(newRegion.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(deleteRegion.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.regions = payload?.data as Regions[]
    })
    builder.addCase(deleteRegion.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(deleteRegion.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
    builder.addCase(changeRegion.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.regions = payload?.data as Regions[]
    })
    builder.addCase(changeRegion.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(changeRegion.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })
  },
})

export const addressesReducer = addressesSlise.reducer
export const { addAddress } = addressesSlise.actions
