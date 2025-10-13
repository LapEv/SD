import {
  AddINC,
  AddINCStatuses,
  AddTypesOfWork,
  ChangeClosing,
  ChangeClosingCheck,
  ChangeExecutor,
  ChangeINC,
  ChangeINCStatuses,
  ChangeResponsible,
  ChangeTypesOfWork,
  ChangeStatus,
  AddTypesCompletedWork,
  ChangeTypesCompletedWork,
  GetINCsByParams,
  ChangeComment,
  INCStatuses,
  OutputFilter,
} from 'store/slices/incidents/interfaces'

export interface INCActions {
  getINC: () => void
  getFilter: () => void
  getINCs: (data: GetINCsByParams) => void
  getIncidentStatuses: () => void
  getTypesOfWork: () => void
  getTypesCompletedWork: () => void
  newINC: (data: AddINC) => void
  newIncidentStatuses: (data: AddINCStatuses) => void
  newTypesOfWork: (data: AddTypesOfWork) => void
  newTypeCompletedWork: (data: AddTypesCompletedWork) => void
  deleteIncidentStatuses: (data: string[]) => void
  deleteTypesOfWork: (data: string[]) => void
  deleteTypesCompletedWork: (data: string[]) => void
  changeINC: (data: ChangeINC) => void
  changeExecutor: (data: ChangeExecutor) => void
  changeResponsible: (data: ChangeResponsible) => void
  changeStatus: (data: ChangeStatus) => void
  changeUserClosingCheck: (data: ChangeClosingCheck) => void
  changeUserClosing: (data: ChangeClosing) => void
  changeComment: (data: ChangeComment) => void
  changeIncidentStatuses: (data: ChangeINCStatuses) => void
  changeStateIncidentStatuses: (data: INCStatuses[]) => void
  changeTypesOfWork: (data: ChangeTypesOfWork) => void
  changeTypesCompletedWork: (data: ChangeTypesCompletedWork) => void
  setActiveINC: (id: string) => void
  setLoadingINC: (data: boolean) => void
  setStateOutputFilter: (data: OutputFilter) => void
}
