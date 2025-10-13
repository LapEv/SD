import { createSlice } from '@reduxjs/toolkit'
import { Files, FilesState } from './interfaces'
import { getFiles, uploadFiles } from 'api/files'

const initialState: FilesState = {
  files: [],
  uploadedFiles: [],
  isLoadingFiles: false,
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    resetUploadFiles(state) {
      state.uploadedFiles = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getFiles.fulfilled, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = ''
      state.files = payload as Files[]
    })
    builder.addCase(getFiles.pending, state => {
      state.isLoadingFiles = true
    })
    builder.addCase(getFiles.rejected, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = payload as string
    })
    builder.addCase(uploadFiles.fulfilled, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = ''
      console.log('state.files = ', state.files)
      console.log('payload = ', payload)
      state.uploadedFiles = payload?.data as Files[]
    })
    builder.addCase(uploadFiles.pending, state => {
      state.isLoadingFiles = true
    })
    builder.addCase(uploadFiles.rejected, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = payload as string
    })
  },
})

export const filesReducer = filesSlice.reducer
export const { resetUploadFiles } = filesSlice.actions
