import { createSlice } from '@reduxjs/toolkit'
import {
  ClassifierEquipment,
  ClassifierModels,
  TypicalMalfunctions,
  ClassifierState,
} from './interfaces'
import {
  getClassifierEquipments,
  getClassifierModels,
  getTypicalMalfunctions,
  newClassifierEquipment,
  newClassifierModel,
  newTypicalMalfunction,
  deleteClassifierEquipment,
  deleteClassifierModel,
  deleteTypicalMalfunction,
  changeClassifierEquipment,
  changeClassifierModel,
  changeTypicalMalfunction,
  getClassifierModelsById,
  getTypicalMalfunctionsById,
  changeModelsInTypicalMalfunction,
} from 'api/classifier'

const initialState: ClassifierState = {
  equipments: [],
  models: [],
  typicalMalfunctions: [],
  activeEquipment: '',
  activeModel: '',
  isLoadingClassifier: false,
}

export const classifierSlise = createSlice({
  name: 'classifier',
  initialState,
  reducers: {
    setActiveEquipment(state, action) {
      state.activeEquipment = action.payload
    },
    setActiveModel(state, action) {
      state.activeModel = action.payload
    },
    resetTypicalMalfunction(state) {
      state.typicalMalfunctions = []
    },
    resetModels(state) {
      state.models = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getClassifierEquipments.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = payload as ClassifierEquipment[]
    })
    builder.addCase(getClassifierEquipments.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(getClassifierEquipments.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(newClassifierEquipment.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = payload?.data as ClassifierEquipment[]
    })
    builder.addCase(newClassifierEquipment.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(newClassifierEquipment.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(
      deleteClassifierEquipment.fulfilled,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = ''
        state.equipments = payload?.data as ClassifierEquipment[]
      },
    )
    builder.addCase(deleteClassifierEquipment.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(
      deleteClassifierEquipment.rejected,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = payload as string
      },
    )
    builder.addCase(
      changeClassifierEquipment.fulfilled,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = ''
        state.equipments = payload?.data as ClassifierEquipment[]
      },
    )
    builder.addCase(changeClassifierEquipment.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(
      changeClassifierEquipment.rejected,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = payload as string
      },
    )
    builder.addCase(getClassifierModels.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.models = payload as ClassifierModels[]
    })
    builder.addCase(getClassifierModels.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(getClassifierModels.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(getClassifierModelsById.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.models = payload as ClassifierModels[]
    })
    builder.addCase(getClassifierModelsById.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(getClassifierModelsById.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(newClassifierModel.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = payload?.data as ClassifierEquipment[]
    })
    builder.addCase(newClassifierModel.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(newClassifierModel.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(deleteClassifierModel.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = payload?.data as ClassifierEquipment[]
    })
    builder.addCase(deleteClassifierModel.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(deleteClassifierModel.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(changeClassifierModel.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = payload?.data as ClassifierEquipment[]
    })
    builder.addCase(changeClassifierModel.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(changeClassifierModel.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(getTypicalMalfunctions.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = payload as TypicalMalfunctions[]
    })
    builder.addCase(getTypicalMalfunctions.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(getTypicalMalfunctions.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(
      getTypicalMalfunctionsById.fulfilled,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = ''
        state.typicalMalfunctions = payload as TypicalMalfunctions[]
      },
    )
    builder.addCase(getTypicalMalfunctionsById.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(
      getTypicalMalfunctionsById.rejected,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = payload as string
      },
    )
    builder.addCase(newTypicalMalfunction.fulfilled, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = payload?.data as ClassifierEquipment[]
    })
    builder.addCase(newTypicalMalfunction.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(newTypicalMalfunction.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(
      deleteTypicalMalfunction.fulfilled,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = ''
        state.equipments = payload?.data as ClassifierEquipment[]
      },
    )
    builder.addCase(deleteTypicalMalfunction.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(deleteTypicalMalfunction.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(
      changeTypicalMalfunction.fulfilled,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = ''
        state.equipments = payload?.data as ClassifierEquipment[]
      },
    )
    builder.addCase(changeTypicalMalfunction.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(changeTypicalMalfunction.rejected, (state, { payload }) => {
      state.isLoadingClassifier = false
      state.error = payload as string
    })
    builder.addCase(
      changeModelsInTypicalMalfunction.fulfilled,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = ''
        state.typicalMalfunctions = payload?.data as TypicalMalfunctions[]
      },
    )
    builder.addCase(changeModelsInTypicalMalfunction.pending, state => {
      state.isLoadingClassifier = true
    })
    builder.addCase(
      changeModelsInTypicalMalfunction.rejected,
      (state, { payload }) => {
        state.isLoadingClassifier = false
        state.error = payload as string
      },
    )
  },
})

export const classifierReducer = classifierSlise.reducer
export const {
  setActiveEquipment,
  setActiveModel,
  resetTypicalMalfunction,
  resetModels,
} = classifierSlise.actions
