import { createSlice } from '@reduxjs/toolkit'
import { FilesData, FilesState } from './interfaces'
import { getFile, getFilesData, getViewFile, uploadFiles } from 'api/files'

const initialState: FilesState = {
  filesData: [],
  files: '',
  uploadedFiles: [],
  isLoadingFiles: false,
  viewFilePanel: false,
  viewFiles: {
    idINC: '',
    files: [],
  },
  addAct: { status: false, incident: '', id_incFiles: '', files: [] },
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    resetUploadFiles(state) {
      state.uploadedFiles = []
    },
    setViewFiles(state, action) {
      state.viewFiles = action.payload
    },
    setViewFilePanel(state, action) {
      state.viewFilePanel = action.payload
    },
    setAddAct(state, action) {
      state.addAct = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getFilesData.fulfilled, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = ''
      state.filesData = payload as FilesData[]
    })
    builder.addCase(getFilesData.pending, state => {
      state.isLoadingFiles = true
    })
    builder.addCase(getFilesData.rejected, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = payload as string
    })
    builder.addCase(getFile.fulfilled, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = ''
      state.files = payload as string
    })
    builder.addCase(getFile.pending, state => {
      state.isLoadingFiles = true
    })
    builder.addCase(getFile.rejected, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = payload as string
    })
    builder.addCase(getViewFile.fulfilled, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = ''
      const _newViewFiles = state.viewFiles.files?.map(item =>
        item.id === payload?.id ? { ...item, src: payload?.data } : item,
      )
      state.viewFiles.files = _newViewFiles
    })
    builder.addCase(getViewFile.pending, state => {
      state.isLoadingFiles = true
    })
    builder.addCase(getViewFile.rejected, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = payload as string
    })
    builder.addCase(uploadFiles.fulfilled, (state, { payload }) => {
      state.isLoadingFiles = false
      state.error = ''
      state.uploadedFiles = payload?.data as FilesData[]
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
export const { resetUploadFiles, setViewFiles, setViewFilePanel, setAddAct } =
  filesSlice.actions
