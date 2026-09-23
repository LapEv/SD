import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { useAppDispatch } from 'store/hooks'
import { INCActions } from './incActions'
import { INCEngineerState } from 'store/slices/engineer/interface'
import {
  changeFilterStatus,
  changeSortStatus,
  setTimeInterval,
  setToCloud,
  setFilterStatus,
  changeStatusDone,
  changeStatus,
  setExecutor,
  clearINC,
} from 'store/slices/engineer'
import {
  changeINCAddEngineerFiles,
  changeStatusDoneSVR,
  getINCsByFieldEngineer,
  getINCbyID,
} from 'api/engineer'

export function useEngineer(): [INCEngineerState, INCActions] {
  const engineer = useSelector((state: RootState) => state.engineer)
  const dispatch = useAppDispatch()

  return [
    engineer,
    {
      changeFilterStatus(data) {
        dispatch(changeFilterStatus(data))
      },
      changeSortStatus(data) {
        dispatch(changeSortStatus(data))
      },
      setFilterStatus(data) {
        dispatch(setFilterStatus(data))
      },
      getINCsByFieldEngineer(data) {
        dispatch(getINCsByFieldEngineer(data))
      },
      getINCbyID(data) {
        dispatch(getINCbyID(data))
      },
      setTimeInterval(data) {
        dispatch(setTimeInterval(data))
      },
      setToCloud(data) {
        dispatch(setToCloud(data))
      },
      changeINCAddEngineerFiles(data) {
        dispatch(changeINCAddEngineerFiles(data))
      },
      changeStatusDone(data) {
        dispatch(changeStatusDoneSVR(data))
        dispatch(changeStatusDone(data))
      },
      changeStatus(data) {
        dispatch(changeStatus(data))
      },
      setExecutor(data) {
        dispatch(setExecutor(data))
      },
      clearINC(data) {
        dispatch(clearINC(data))
      },
    },
  ]
}
