import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { useAppDispatch } from 'store/hooks'
import { INCActions } from './incActions'
import { INCState } from 'store/slices/incidents/interfaces'
import {
  changeIncidentStatuses,
  changeTypesOfWork,
  changeTypesCompletedWork,
  deleteIncidentStatuses,
  deleteTypesOfWork,
  deleteTypesCompletedWork,
  getINC,
  getIncidentStatuses,
  getTypesOfWork,
  getTypesCompletedWork,
  newINC,
  newIncidentStatuses,
  newTypeOfWork,
  newTypeCompletedWork,
  getINCs,
  changeStateIncidentStatuses,
  getINCsByDate,
  changeExecutorSVR,
  changeResponsibleSVR,
  changeStatusSVR,
  changeINC,
} from 'api/incidents'
import {
  setLoadingINC,
  setFilteredLength,
  setFiltered,
  changeExecutor,
  changeResponsible,
  changeStatus,
} from 'store/slices/incidents'

export function useIncidents(): [INCState, INCActions] {
  const incidents = useSelector((state: RootState) => state.incidents)
  const dispatch = useAppDispatch()

  return [
    incidents,
    {
      getINC() {
        dispatch(getINC())
      },
      getINCs(data) {
        dispatch(getINCs(data))
      },
      getINCsByDate(data) {
        dispatch(getINCsByDate(data))
      },
      getIncidentStatuses() {
        dispatch(getIncidentStatuses())
      },
      getTypesOfWork() {
        dispatch(getTypesOfWork())
      },
      getTypesCompletedWork() {
        dispatch(getTypesCompletedWork())
      },
      newINC(data) {
        dispatch(newINC(data))
      },
      changeExecutor(data) {
        dispatch(changeExecutorSVR(data))
        dispatch(changeExecutor(data))
      },
      changeResponsible(data) {
        dispatch(changeResponsibleSVR(data))
        dispatch(changeResponsible(data))
      },
      changeStatus(data) {
        dispatch(changeStatusSVR(data))
        dispatch(changeStatus(data))
      },
      changeINC(data) {
        dispatch(changeINC(data))
      },
      newIncidentStatuses(data) {
        dispatch(newIncidentStatuses(data))
      },
      newTypesOfWork(data) {
        dispatch(newTypeOfWork(data))
      },
      newTypeCompletedWork(data) {
        dispatch(newTypeCompletedWork(data))
      },
      deleteIncidentStatuses(data) {
        dispatch(deleteIncidentStatuses(data))
      },
      deleteTypesOfWork(data) {
        dispatch(deleteTypesOfWork(data))
      },
      deleteTypesCompletedWork(data) {
        dispatch(deleteTypesCompletedWork(data))
      },
      changeIncidentStatuses(data) {
        dispatch(changeIncidentStatuses(data))
      },
      changeStateIncidentStatuses(data) {
        dispatch(changeStateIncidentStatuses(data))
      },
      changeTypesOfWork(data) {
        dispatch(changeTypesOfWork(data))
      },
      changeTypesCompletedWork(data) {
        dispatch(changeTypesCompletedWork(data))
      },
      setLoadingINC(data) {
        dispatch(setLoadingINC(data))
      },
      setFilteredLength(data) {
        dispatch(setFilteredLength(data))
      },
      setFiltered(data) {
        dispatch(setFiltered(data))
      },
    },
  ]
}
