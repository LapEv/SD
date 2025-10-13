import { createSlice } from '@reduxjs/toolkit'
import { Contracts, ContractsState } from './interfaces'
import {
  changeContract,
  deleteContract,
  getContracts,
  getContractsByClientID,
  newContract,
  newContractName,
} from 'api/contracts'

const initialState: ContractsState = {
  contracts: [],
  activeContract: '',
  isLoadingContracts: false,
}

export const contractsSlise = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setActiveContract(state, action) {
      state.activeContract = action.payload
    },
    resetContracts(state) {
      state.contracts = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getContracts.fulfilled, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = payload as Contracts[]
    })
    builder.addCase(getContracts.pending, state => {
      state.isLoadingContracts = true
    })
    builder.addCase(getContracts.rejected, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = payload as string
    })
    builder.addCase(getContractsByClientID.fulfilled, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = payload as Contracts[]
    })
    builder.addCase(getContractsByClientID.pending, state => {
      state.isLoadingContracts = true
    })
    builder.addCase(getContractsByClientID.rejected, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = payload as string
    })
    builder.addCase(newContract.fulfilled, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = payload?.data as Contracts[]
    })
    builder.addCase(newContract.pending, state => {
      state.isLoadingContracts = true
    })
    builder.addCase(newContract.rejected, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = payload as string
    })
    builder.addCase(newContractName.fulfilled, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = payload?.data as Contracts[]
    })
    builder.addCase(newContractName.pending, state => {
      state.isLoadingContracts = true
    })
    builder.addCase(newContractName.rejected, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = payload as string
    })
    builder.addCase(deleteContract.fulfilled, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = payload?.data as Contracts[]
    })
    builder.addCase(deleteContract.pending, state => {
      state.isLoadingContracts = true
    })
    builder.addCase(deleteContract.rejected, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = payload as string
    })
    builder.addCase(changeContract.fulfilled, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = payload?.data as Contracts[]
    })
    builder.addCase(changeContract.pending, state => {
      state.isLoadingContracts = true
    })
    builder.addCase(changeContract.rejected, (state, { payload }) => {
      state.isLoadingContracts = false
      state.error = payload as string
    })
  },
})

export const contractsReducer = contractsSlise.reducer
export const { setActiveContract, resetContracts } = contractsSlise.actions
