import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { INCActions } from './incActions'
import { INCState } from 'store/slices/incidents/interfaces'
import {
  changeExecutor,
  changeINC,
  changeIncidentStatuses,
  changeResponsible,
  changeStatus,
  changeTypesOfWork,
  changeTypesCompletedWork,
  changeUserClosing,
  changeUserClosingCheck,
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
  getFilter,
  changeComment,
  changeStateIncidentStatuses,
} from 'api/incidents'
import {
  setActiveINC,
  setLoadingINC,
  setStateOutputFilter,
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
      getFilter() {
        dispatch(getFilter())
      },
      getINCs(data) {
        dispatch(getINCs(data))
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
      changeINC(data) {
        dispatch(changeINC(data))
      },
      changeExecutor(data) {
        dispatch(changeExecutor(data))
      },
      changeResponsible(data) {
        dispatch(changeResponsible(data))
      },
      changeStatus(data) {
        dispatch(changeStatus(data))
      },
      changeUserClosingCheck(data) {
        dispatch(changeUserClosingCheck(data))
      },
      changeUserClosing(data) {
        dispatch(changeUserClosing(data))
      },
      changeComment(data) {
        dispatch(changeComment(data))
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
      setActiveINC(id) {
        dispatch(setActiveINC(id))
      },
      setLoadingINC(data) {
        dispatch(setLoadingINC(data))
      },
      setStateOutputFilter(data) {
        dispatch(setStateOutputFilter(data))
      },
    },
  ]
}
