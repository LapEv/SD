import { createSlice } from '@reduxjs/toolkit'
import {
  INC,
  INCStatuses,
  TypesOfWork,
  INCState,
  TypesCompletedWork,
  AnswerGetINC,
} from './interfaces'
import {
  getINC,
  getIncidentStatuses,
  newINC,
  newIncidentStatuses,
  deleteIncidentStatuses,
  changeINC,
  changeIncidentStatuses,
  getTypesOfWork,
  newTypeOfWork,
  deleteTypesOfWork,
  changeTypesOfWork,
  changeExecutor,
  changeResponsible,
  changeUserClosingCheck,
  changeUserClosing,
  changeStatus,
  getTypesCompletedWork,
  newTypeCompletedWork,
  deleteTypesCompletedWork,
  changeTypesCompletedWork,
  getINCs,
  getFilter,
  changeComment,
  changeStateIncidentStatuses,
} from 'api/incidents'
import {
  convertDateToStringFromDB,
  convertDateToStringFromDBT,
} from 'utils/convertDate'
import { CheckUser, signin } from 'api/user'
import { ICheckUser } from 'storeAuth/interfaces'

const initialState: INCState = {
  countIncidents: 0,
  incidents: [],
  incStatuses: [],
  typesOfWork: [],
  typesCompletedWork: [],
  filterListData: {
    status: [],
    client: [],
    legalName: [],
    contract: [],
    object: [],
    address: [],
    region: [],
    userAccepted: [],
    equipment: [],
    model: [],
    executor: [],
    responsible: [],
    overdue: [],
    sla: [],
  },
  activeINC: '',
  isLoadingINC: false,
  outputFilter: {
    isOutputFilter: false,
    filterID: '',
    filterText: '',
  },
}

const createINCData = (data: INC[]) => {
  return data.map(item => {
    return {
      ...item,
      // status: item.IncindentStatus?.statusINC as string,
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
      // executor: item.UserExecutor?.shortName as string,
      // responsible: item.UserResponsible?.shortName as string,
      userClosingCheck: item.UserClosingCheck?.shortName as string,
      userClosing: item.UserClosing?.shortName as string,
      equipment: item.ClassifierEquipment?.equipment as string,
      model: item.ClassifierModel?.model as string,
      typicalMalfunction: item.TypicalMalfunction?.typicalMalfunction as string,
      logs: item.IncidentLogs,
      files: item.Files,
      act: item.Files?.map(item => item.name).toString() as string,
      timeRegistration: convertDateToStringFromDBT(
        item.timeRegistration,
      ) as string,
      timeSLA: convertDateToStringFromDBT(item.timeSLA) as string,
      timeInWork: convertDateToStringFromDBT(item.timeInWork) as string,
      timeCloseCheck: convertDateToStringFromDBT(item.timeCloseCheck) as string,
      timeClose: convertDateToStringFromDBT(item.timeClose) as string,
      spaceParts: Array.isArray(item.spaceParts)
        ? item.spaceParts.join(', ')
        : item.spaceParts,
    }
  })
}

export const incidentsSlise = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setActiveINC(state, action) {
      state.activeINC = action.payload
    },
    setLoadingINC(state, action) {
      state.isLoadingINC = action.payload
    },
    setStateOutputFilter(state, action) {
      state.outputFilter = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { filterData } = payload as ICheckUser
      state.filterListData = filterData
    })
    builder.addCase(CheckUser.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { filterData } = payload as ICheckUser
      state.filterListData = filterData
    })
    builder.addCase(getFilter.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { filterData } = payload as ICheckUser
      state.filterListData = filterData
    })
    builder.addCase(getFilter.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getFilter.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(getINC.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs, count } = payload as AnswerGetINC
      state.incidents = createINCData(incs)
      state.countIncidents = count
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
      const { incs, count, filterListData } = payload as AnswerGetINC
      state.incidents = createINCData(incs)
      state.countIncidents = count
      state.filterListData = filterListData
    })
    builder.addCase(getINCs.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(getINCs.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(newINC.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs, count, filterListData } = payload?.data as AnswerGetINC
      state.incidents = createINCData(incs)
      state.countIncidents = count
      state.filterListData = filterListData
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
      const { incs, count, filterListData } = payload?.data as AnswerGetINC
      state.incidents = createINCData(incs)
      state.countIncidents = count
      state.filterListData = filterListData
    })
    builder.addCase(changeINC.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeINC.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeExecutor.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs, filterListData } = payload?.data as AnswerGetINC
      state.filterListData = filterListData
      state.incidents = createINCData(incs)
    })
    builder.addCase(changeExecutor.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeExecutor.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeResponsible.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs, filterListData } = payload?.data as AnswerGetINC
      state.filterListData = filterListData
      state.incidents = createINCData(incs)
    })
    builder.addCase(changeResponsible.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeResponsible.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeStatus.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const { incs, filterListData } = payload?.data as AnswerGetINC
      state.filterListData = filterListData
      state.incidents = createINCData(incs)
    })
    builder.addCase(changeStatus.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeStatus.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeUserClosingCheck.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(payload?.data)
    })
    builder.addCase(changeUserClosingCheck.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeUserClosingCheck.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeUserClosing.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(payload?.data)
    })
    builder.addCase(changeUserClosing.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeUserClosing.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
    })
    builder.addCase(changeComment.fulfilled, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = ''
      const incs = state.incidents
      const newincs = incs.map((item: INC) => {
        if (item.id === payload?.data.id) {
          return { ...item, comment: payload?.data.comment }
        }
        return item
      })
      state.incidents = newincs
    })
    builder.addCase(changeComment.pending, state => {
      state.isLoadingINC = true
    })
    builder.addCase(changeComment.rejected, (state, { payload }) => {
      state.isLoadingINC = false
      state.error = payload as string
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
export const { setActiveINC, setLoadingINC, setStateOutputFilter } =
  incidentsSlise.actions
