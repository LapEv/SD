import {
  AddINC,
  AddINCStatuses,
  AddTypesOfWork,
  ChangeINCStatuses,
  ChangeTypesOfWork,
  AddTypesCompletedWork,
  ChangeTypesCompletedWork,
  INCStatuses,
  GetINCsByParams,
  INC,
  ChangeExecutor,
  ChangeResponsible,
  ChangeStatus,
  ChangeINC,
  ChangeINCAddFiles,
} from 'store/slices/incidents/interfaces'

export interface INCActions {
  getINC: () => void
  getINCs: (data: GetINCsByParams) => void
  getINCsByDate: (endDate: Date) => void
  getIncidentStatuses: () => void
  getTypesOfWork: () => void
  getTypesCompletedWork: () => void
  newINC: (data: AddINC) => void
  newINCSocket: (data: AddINC) => void
  newINCfromMailSocket: (data: AddINC) => void
  newIncidentStatuses: (data: AddINCStatuses) => void
  newTypesOfWork: (data: AddTypesOfWork) => void
  newTypeCompletedWork: (data: AddTypesCompletedWork) => void
  deleteIncidentStatuses: (data: string[]) => void
  deleteTypesOfWork: (data: string[]) => void
  deleteTypesCompletedWork: (data: string[]) => void
  changeExecutor: (data: ChangeExecutor) => void
  changeExecutorSocket: (data: ChangeExecutor) => void
  changeResponsible: (data: ChangeResponsible) => void
  changeResponsibleSocket: (data: ChangeResponsible) => void
  changeStatus: (data: ChangeStatus) => void
  changeStatusSocket: (data: ChangeStatus) => void
  changeINC: (data: ChangeINC) => void
  changeINCAddFiles: (data: ChangeINCAddFiles) => void
  changeIncidentStatuses: (data: ChangeINCStatuses) => void
  changeStateIncidentStatuses: (data: INCStatuses[]) => void
  changeTypesOfWork: (data: ChangeTypesOfWork) => void
  changeTypesCompletedWork: (data: ChangeTypesCompletedWork) => void
  setLoadingINC: (data: boolean) => void
  setFilteredLength: (data: number) => void
  setFiltered: (data: INC[]) => void
  checkForCloseINC: () => void
}
