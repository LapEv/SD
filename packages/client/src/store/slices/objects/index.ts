import { createSlice } from '@reduxjs/toolkit'
import { Objects, ObjectsState } from './interfaces'
import { changeObject, deleteObjects, getObjects, newObject } from 'api/objects'

const initialState: ObjectsState = {
  objects: [],
  activeObject: '',
  isLoadingObjects: false,
}

export const objectsSlise = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    setActiveObject(state, action) {
      state.activeObject = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getObjects.fulfilled, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = ''
      state.objects = payload as Objects[]
    })
    builder.addCase(getObjects.pending, state => {
      state.isLoadingObjects = true
    })
    builder.addCase(getObjects.rejected, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = payload as string
    })
    builder.addCase(newObject.fulfilled, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = ''
      state.objects = payload?.data as Objects[]
    })
    builder.addCase(newObject.pending, state => {
      state.isLoadingObjects = true
    })
    builder.addCase(newObject.rejected, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = payload as string
    })
    builder.addCase(deleteObjects.fulfilled, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = ''
      state.objects = payload?.data as Objects[]
    })
    builder.addCase(deleteObjects.pending, state => {
      state.isLoadingObjects = true
    })
    builder.addCase(deleteObjects.rejected, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = payload as string
    })
    builder.addCase(changeObject.fulfilled, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = ''
      state.objects = payload?.data as Objects[]
    })
    builder.addCase(changeObject.pending, state => {
      state.isLoadingObjects = true
    })
    builder.addCase(changeObject.rejected, (state, { payload }) => {
      state.isLoadingObjects = false
      state.error = payload as string
    })
  },
})

export const objectsReducer = objectsSlise.reducer
export const { setActiveObject } = objectsSlise.actions
