import {
  ChangeINCEngineerAddFiles,
  ChangeStatusDone,
  GetEngineerData,
  GetEngineerINCbyID,
  ISortEngineerStatus,
  SetExecutor,
} from 'store/slices/engineer/interface'
import { ChangeStatus } from 'store/slices/incidents/interfaces'

export interface INCActions {
  changeFilterStatus: (data: string[]) => void
  setFilterStatus: (data: string[]) => void
  changeSortStatus: (data: ISortEngineerStatus) => void
  getINCsByFieldEngineer: (data: GetEngineerData) => void
  getINCbyID: (data: GetEngineerINCbyID) => void
  setTimeInterval: (data: number) => void
  setToCloud: (data: boolean) => void
  changeINCAddEngineerFiles: (data: ChangeINCEngineerAddFiles) => void
  changeStatusDone: (data: ChangeStatusDone) => void
  changeStatus: (data: ChangeStatus) => void
  setExecutor: (data: SetExecutor) => void
  clearINC: (id: string) => void
}
