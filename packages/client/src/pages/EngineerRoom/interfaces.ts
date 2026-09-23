import { DataList } from 'components/CheckBoxGroup/interface'
import { ISortEngineerStatus } from 'store/slices/engineer/interface'
import { FilesData } from 'store/slices/files/interfaces'
import { INC } from 'store/slices/incidents/interfaces'

export interface IFilterEngineer {
  dataGroup: DataList[]
  onChooseItems: (check: boolean, item: DataList) => void
}

export interface ISortEngineer {
  dataSort: DataList[]
  onChooseItems: (check: boolean, item: DataList) => void
}

export interface ICellEngineerINC {
  label: string
  value: string | undefined
}

export interface IIncidentData {
  item: INC
}

export interface ICountdown {
  timeSLA: string
}

export interface ICountdownRender {
  hours: number
  minutes: number
  seconds: number
  completed: boolean
  days: number
}

export interface IEngineerTitle {
  incident: string
  status: string
}

export interface IEngineerINC {
  item: INC
}

export interface IEngineerAdditionallyINC {
  item: INC
  open: boolean
}

export interface ICellEngineerINCActs {
  label: string
  value: string | undefined
  files: FilesData[] | undefined
  idINC: string
  incident: string
  inc: INC
}

export interface ITimeIntervalEngineerComponent {
  label: string
  value: number
  setSettingsMenuOpen: (data: boolean) => void
}

export interface SettingsEngineer {
  timeInterval: number
  filterEngineerStatus: string[]
  sortEngineerStatus: ISortEngineerStatus
}

export interface IEngineerOptions {
  timeInterval: number
  filterEngineerStatus: string[]
  sortEngineerStatus: ISortEngineerStatus
}

export interface DataAddAct {
  state: boolean
  files?: FilesData[]
  act?: string[]
  incident?: string
  id_incFiles?: string
  incData?: INC
}

export interface AddActProps {
  modalImage?: string
  handleModalAddAct: (data: DataAddAct) => void
  title?: string
  incident: string
  id_incFiles: string
  files: FilesData[] | undefined
}

export interface CloseEngineerINCProps {
  modalImage?: string
  handleModal: (data: DataCloseEngineerINC) => void
  title?: string
  // data: Options
  incident: string
  id_incFiles: string
}

export interface DataCloseEngineerINC {
  state: boolean
  typeCompletedWork?: Options
  commentCloseCheck?: string
  files?: FileList[]
  spaceParts?: string[]
  act?: string[]
  // data: Options
}

export interface Options {
  label: string
  id: string
  description?: string
  descriptionID?: string
}

export interface AddValuesProps {
  list: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required: boolean
    tabIndex: number
  }[]
}

export interface IMenuEngineer {
  filtered: INC[]
}

export interface IMenu {
  open: boolean
  setOpen: (data: boolean) => void
}

export interface ISettingsEngineer {
  filtered: INC[]
}
