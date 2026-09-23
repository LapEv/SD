import { createSlice } from '@reduxjs/toolkit'
import {
  changeINCAddEngineerFiles,
  changeStatusDoneSVR,
  getINCsByFieldEngineer,
  getINCbyID,
} from 'api/engineer'
import { AnswerGetEngineerINC, INCEngineerState } from './interface'
import { INC, IncidentLogsForINC } from '../incidents/interfaces'
import { SETTINGS_DEFAULT, SETTINGS_STORAGE_KEY } from 'pages/EngineerRoom/data'
import { emptyINC } from 'pages/ControlRoom/Incidents/data'

const initialState: INCEngineerState = {
  incs: [],
  isLoadingEngineerINC: false,
  filterEngineerStatus: SETTINGS_DEFAULT.filterEngineerStatus,
  sortEngineerStatus: SETTINGS_DEFAULT.sortEngineerStatus,
  timeInterval: SETTINGS_DEFAULT.timeInterval,
  toCloud: false,
  oldINC: emptyINC,
}

const setLocalStorage = (state: INCEngineerState) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { incs, isLoadingEngineerINC, toCloud, oldINC, error, ...newState } =
    state
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return newState
}

const createINCData = (data: INC[]) => {
  return data.map(item => {
    return {
      ...item,
      client: item.Client?.client as string,
      legalName: item.Client?.legalName as string,
      contract: item.Contract?.contract as string,
      object: item.Object?.object as string,
      address: item.Object?.Address?.address as string,
      coordinates: item.Object?.Address?.coordinates as string,
      region: item.Object?.Region?.region as string,
      sla: item.SLA?.sla as string,
      typeOfWork: item.TypesOfWork?.typeOfWork as string,
      typeCompletedWork: item.TypesCompletedWork?.typeCompletedWork as string,
      userAccepted: item.User?.shortName as string,
      userDone: item.UserDone?.shortName as string,
      userClosingCheck: item.UserClosingCheck?.shortName as string,
      userClosing: item.UserClosing?.shortName as string,
      equipment: item.ClassifierEquipment?.equipment as string,
      model: item.ClassifierModel?.model as string,
      typicalMalfunction: item.TypicalMalfunction?.typicalMalfunction as string,
      logs: item.IncidentLogs,
      files: item.Files,
      act: item.Files?.map(item => item.name) as string[],
    }
  })
}

const createINC = (item: INC) => {
  return {
    ...item,
    client: item.Client?.client as string,
    legalName: item.Client?.legalName as string,
    contract: item.Contract?.contract as string,
    object: item.Object?.object as string,
    address: item.Object?.Address?.address as string,
    coordinates: item.Object?.Address?.coordinates as string,
    region: item.Object?.Region?.region as string,
    sla: item.SLA?.sla as string,
    typeOfWork: item.TypesOfWork?.typeOfWork as string,
    typeCompletedWork: item.TypesCompletedWork?.typeCompletedWork as string,
    userAccepted: item.User?.shortName as string,
    userDone: item.UserDone?.shortName as string,
    userClosingCheck: item.UserClosingCheck?.shortName as string,
    userClosing: item.UserClosing?.shortName as string,
    equipment: item.ClassifierEquipment?.equipment as string,
    model: item.ClassifierModel?.model as string,
    typicalMalfunction: item.TypicalMalfunction?.typicalMalfunction as string,
    logs: item.IncidentLogs,
    files: item.Files,
    act: item.Files?.map(item => item.name) as string[],
  }
}

export const engineerSlise = createSlice({
  name: 'engineer',
  initialState,
  reducers: {
    changeFilterStatus(state, { payload }) {
      state.filterEngineerStatus = payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          filterEngineerStatus: payload,
        }),
      )
      state.toCloud = true
    },
    changeSortStatus(state, { payload }) {
      state.sortEngineerStatus = payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          sortEngineerStatus: payload,
        }),
      )
      state.toCloud = true
    },
    setFilterStatus(state, { payload }) {
      state.filterEngineerStatus = payload
    },
    setTimeInterval(state, action) {
      state.timeInterval = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          timeInterval: action.payload,
        }),
      )
      state.toCloud = true
    },
    setToCloud(state, action) {
      state.toCloud = action.payload
    },
    changeStatusDone(state, { payload }) {
      const { id, log, ...data } = payload
      state.oldINC = state.incs.find(item => item.id === id)
      state.incs = state.incs.map(item =>
        item.id !== id
          ? item
          : ({
              ...item,
              ...data,
              logs: [
                ...(item?.logs as IncidentLogsForINC[]),
                {
                  User: log.User,
                  id: `log_${log.log.id_incLog}_${item?.logs?.length}`,
                  time: log.log.time,
                  log: log.log.log,
                },
              ],
            } as INC),
      )
    },
    changeStatus(state, { payload }) {
      const { id, ...data } = payload
      state.oldINC = state.incs.find(item => item.id === id)
      state.incs = state.incs.map(item =>
        item.id !== id
          ? item
          : ({
              ...item,
              ...data,
            } as INC),
      )
    },
    setExecutor(state, { payload }) {
      state.incs = [...state.incs, payload]
    },
    clearINC(state, { payload }) {
      state.incs = state.incs.filter(({ id }) => id !== payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(getINCsByFieldEngineer.fulfilled, (state, { payload }) => {
      state.isLoadingEngineerINC = false
      state.error = ''
      const { incs } = payload as AnswerGetEngineerINC
      const _incs = createINCData(incs)
      state.incs = _incs
    })
    builder.addCase(getINCsByFieldEngineer.pending, state => {
      state.isLoadingEngineerINC = true
    })
    builder.addCase(getINCsByFieldEngineer.rejected, (state, { payload }) => {
      state.isLoadingEngineerINC = false
      state.error = payload as string
    })
    builder.addCase(getINCbyID.fulfilled, (state, { payload }) => {
      state.isLoadingEngineerINC = false
      state.error = ''
      const inc = createINC(payload as INC)
      state.incs = [...state.incs, inc]
    })
    builder.addCase(getINCbyID.pending, state => {
      state.isLoadingEngineerINC = false
    })
    builder.addCase(getINCbyID.rejected, (state, { payload }) => {
      state.isLoadingEngineerINC = false
      state.error = payload as string
    })
    builder.addCase(
      changeINCAddEngineerFiles.fulfilled,
      (state, { payload }) => {
        state.isLoadingEngineerINC = false
        state.error = ''
        const { incs } = payload?.data as AnswerGetEngineerINC
        const _incs = createINCData(incs)
        state.incs = _incs
      },
    )
    builder.addCase(changeINCAddEngineerFiles.pending, state => {
      state.isLoadingEngineerINC = true
    })
    builder.addCase(
      changeINCAddEngineerFiles.rejected,
      (state, { payload }) => {
        state.isLoadingEngineerINC = false
        state.error = payload as string
      },
    )
    builder.addCase(changeStatusDoneSVR.rejected, (state, { meta }) => {
      state.incs = state.incs.map(item =>
        item.id === meta.arg.id ? (state.oldINC as INC) : item,
      )
    })
  },
})

export const engineerReducer = engineerSlise.reducer
export const {
  changeFilterStatus,
  setTimeInterval,
  setToCloud,
  setFilterStatus,
  changeSortStatus,
  changeStatusDone,
  changeStatus,
  setExecutor,
  clearINC,
} = engineerSlise.actions
