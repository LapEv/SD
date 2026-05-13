import { createSlice } from '@reduxjs/toolkit'
import {
  INC,
  INCStatuses,
  TypesOfWork,
  INCState,
  TypesCompletedWork,
  AnswerGetINC,
  ChangeExecutor,
  ChangeResponsible,
  IncidentLogsForINC,
  AnswerAddINCFile,
} from './interfaces'
import {
  getINC,
  getIncidentStatuses,
  newINC,
  newIncidentStatuses,
  deleteIncidentStatuses,
  changeIncidentStatuses,
  getTypesOfWork,
  newTypeOfWork,
  deleteTypesOfWork,
  changeTypesOfWork,
  getTypesCompletedWork,
  newTypeCompletedWork,
  deleteTypesCompletedWork,
  changeTypesCompletedWork,
  getINCs,
  getINCsByDate,
  changeStateIncidentStatuses,
  changeExecutorSVR,
  changeResponsibleSVR,
  changeINC,
  changeStatusSVR,
  changeINCAddFiles,
} from 'api/incidents'
import { emptyINC } from 'pages/ControlRoom/Incidents/data'

const initialState: INCState = {
  incidents: [],
  filtered: [],
  filteredLength: 0,
  incStatuses: [],
  typesOfWork: [],
  typesCompletedWork: [],
  isLoadingINC: false,
  oldINC: emptyINC,
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

export const incidentsSlise = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setLoadingINC(state, action) {
      state.isLoadingINC = action.payload
    },
    setFilteredLength(state, action) {
      state.filteredLength = action.payload
    },
    setFiltered(state, action) {
      state.filtered = action.payload
    },
    changeExecutor(state, action) {
      const { id, id_incExecutor, executor, userID, userShortName, incident } =
        action.payload as ChangeExecutor
      state.oldINC = state.incidents.find(item => item.id === id)
      state.incidents = state.incidents.map(item =>
        item.id !== id
          ? item
          : ({
              ...item,
              id_incExecutor,
              executor,
              UserExecutor: {
                ...item.UserExecutor,
                shortName: executor,
                id: id_incExecutor,
              },
              logs: [
                ...(item?.logs as IncidentLogsForINC[]),
                {
                  User: { id: userID, shortName: userShortName },
                  id: `log_${id}_${item?.logs?.length}`,
                  time: new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60 * 1000,
                  ).toISOString(),
                  log: `Для инцидента под номером ${incident} изменён исполнитель ${executor}`,
                },
              ],
            } as INC),
      )
    },
    changeResponsible(state, action) {
      const {
        id,
        id_incResponsible,
        responsible,
        userID,
        userShortName,
        incident,
      } = action.payload as ChangeResponsible
      state.oldINC = state.incidents.find(item => item.id === id)
      state.incidents = state.incidents.map(item =>
        item.id !== id
          ? item
          : ({
              ...item,
              id_incResponsible,
              responsible,
              UserResponsible: {
                ...item.UserResponsible,
                shortName: responsible,
                id: id_incResponsible,
              },
              logs: [
                ...(item?.logs as IncidentLogsForINC[]),
                {
                  User: { id: userID, shortName: userShortName },
                  id: `log_${id}_${item?.logs?.length}`,
                  time: new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60 * 1000,
                  ).toISOString(),
                  log: `Для инцидента под номером ${incident} изменён ответственный ${responsible}`,
                },
              ],
            } as INC),
      )
    },
    changeStatus(state, { payload }) {
      const { id, log, ...data } = payload
      state.oldINC = state.incidents.find(item => item.id === id)
      state.incidents = state.incidents.map(item =>
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
  },
  extraReducers: builder => {
    builder.addCase(getINC.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs } = payload as AnswerGetINC
      const _incs = createINCData(incs)
      state.incidents = _incs
      state.filtered = _incs
      state.filteredLength = incs.length
    })
    builder.addCase(getINC.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getINC.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(getINCs.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs } = payload as AnswerGetINC
      const _incs = createINCData(incs)
      state.incidents = _incs
      state.filtered = _incs
      state.filteredLength = incs.length
    })
    builder.addCase(getINCs.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getINCs.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(getINCsByDate.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs } = payload as AnswerGetINC
      const _incs = createINCData(incs)
      state.incidents = _incs
      state.filtered = _incs
      state.filteredLength = incs.length
    })
    builder.addCase(getINCsByDate.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getINCsByDate.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })

    builder.addCase(changeINCAddFiles.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { data } = payload as AnswerAddINCFile
      const _incs = createINCData(data)
      state.incidents = _incs
      state.filtered = _incs
      state.filteredLength = data.length
    })
    builder.addCase(changeINCAddFiles.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeINCAddFiles.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(newINC.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs } = payload?.data as AnswerGetINC
      state.incidents = createINCData(incs)
    })
    builder.addCase(newINC.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(newINC.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeINC.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs } = payload?.data as AnswerGetINC
      const _incs = createINCData(incs)
      state.incidents = _incs
      state.filtered = _incs
      state.filteredLength = incs.length
    })
    builder.addCase(changeINC.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeINC.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })

    builder.addCase(changeExecutorSVR.rejected, (state, { meta }) => {
      state.incidents = state.incidents.map(item =>
        item.id === meta.arg.id ? (state.oldINC as INC) : item,
      )
    })
    builder.addCase(changeResponsibleSVR.rejected, (state, { meta }) => {
      state.incidents = state.incidents.map(item =>
        item.id === meta.arg.id ? (state.oldINC as INC) : item,
      )
    })
    builder.addCase(changeStatusSVR.rejected, (state, { meta }) => {
      state.incidents = state.incidents.map(item =>
        item.id === meta.arg.id ? (state.oldINC as INC) : item,
      )
    })
    builder.addCase(getIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = payload as INCStatuses[]
    })
    builder.addCase(getIncidentStatuses.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(newIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = payload?.data as INCStatuses[]
    })
    builder.addCase(newIncidentStatuses.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(newIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(deleteIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = payload?.data as INCStatuses[]
    })
    builder.addCase(deleteIncidentStatuses.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(deleteIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = payload?.data as INCStatuses[]
    })
    builder.addCase(changeIncidentStatuses.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(
      changeStateIncidentStatuses.fulfilled,
      (state, { payload }) => {
        state.isLoadingINC = false
        state.error = ''
        state.incStatuses = payload?.data as INCStatuses[]
      },
    )
    builder.addCase(changeStateIncidentStatuses.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(
      changeStateIncidentStatuses.rejected,
      (state, { payload }) => {
        state.isLoadingINC = false
        state.error = payload as string
      },
    )
    builder.addCase(getTypesOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = payload as TypesOfWork[]
    })
    builder.addCase(getTypesOfWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getTypesOfWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(newTypeOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = payload?.data as TypesOfWork[]
    })
    builder.addCase(newTypeOfWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(newTypeOfWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(deleteTypesOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = payload?.data as TypesOfWork[]
    })
    builder.addCase(deleteTypesOfWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(deleteTypesOfWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeTypesOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = payload?.data as TypesOfWork[]
    })
    builder.addCase(changeTypesOfWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeTypesOfWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(getTypesCompletedWork.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesCompletedWork = payload as TypesCompletedWork[]
    })
    builder.addCase(getTypesCompletedWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getTypesCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(newTypeCompletedWork.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesCompletedWork = payload?.data as TypesCompletedWork[]
    })
    builder.addCase(newTypeCompletedWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(newTypeCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(
      deleteTypesCompletedWork.fulfilled,
      (state, { payload }) => {
        state.isLoadingINC = false
        state.error = ''
        state.typesCompletedWork = payload?.data as TypesCompletedWork[]
      },
    )
    builder.addCase(deleteTypesCompletedWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(deleteTypesCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(
      changeTypesCompletedWork.fulfilled,
      (state, { payload }) => {
        state.isLoadingINC = false
        state.error = ''
        state.typesCompletedWork = payload?.data as TypesCompletedWork[]
      },
    )
    builder.addCase(changeTypesCompletedWork.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeTypesCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
  },
})

export const incidentsReducer = incidentsSlise.reducer
export const {
  setLoadingINC,
  setFilteredLength,
  setFiltered,
  changeExecutor,
  changeResponsible,
  changeStatus,
} = incidentsSlise.actions
