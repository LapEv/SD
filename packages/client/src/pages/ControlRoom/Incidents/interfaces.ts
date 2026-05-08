import { Dayjs } from 'dayjs'
import { FilesData } from 'store/slices/files/interfaces'
import { INC, Order } from 'store/slices/incidents/interfaces'
import {
  IColumnOptions,
  IFilterListOptions,
} from 'store/slices/tableINC/interfaces'

export interface INC_Data {
  edit: string
  indicator: string
  id: string
  incident: string
  numberINC: string
  clientINC: string
  timeSLA: Date
  status: string
  client: string
  legalName: string
  contract: string
  object: string
  address: string
  coordinates: string
  region: string
  userAccepted: string
  timeRegistration: Date
  sla: string
  methodsReuqest: methodsReuqest
  equipment: string
  model: string
  typicalMalfunction: string
  executor: string
  responsible: string
  timeInWork: Date
  description: string
  comment: string
  applicant: string
  applicantContacts: string
  userClosingCheck: string
  timeCloseCheck: Date
  typeOfWork: string
  typeCompletedWork: string
  commentCloseCheck: string
  overdue: boolean
  act: string
  spaceParts: string
  userClosing: string
  timeClose: Date
  commentClose: string
  rating: string
  parentalIncident: string
  relatedIncident: string
}

export interface INC_HeadCell {
  number: number
  id: keyof INC_Data
  label: string
  width: number
  type: INC_CellType
  minWidth: number
  maxWidth: number
  hideable?: boolean
  sortable?: boolean
  filterable?: boolean
  disableColumn: boolean
  disablePadding?: boolean
  numeric?: boolean
  noChangeSettings: boolean
}

export type INC_CellType =
  | 'value'
  | 'system'
  | 'custom'
  | 'dateTime'
  | 'boolean'
  | 'list'

export interface AnswerIndicatorData {
  percent: number
  value: number
  indicator: string
  timeleft?: string
}

export interface IIndicatorCell {
  timeSLA: string
  timeReg: string
  timeCloseCheck: string
  status?: string
  inc?: string
  classContainer?: string
}

export interface ICustomToolbar {}

export interface Settings {
  dense: boolean
  order: Order
  orderBy: keyof INC_Data
  page: number
  rowsPerPage: number
  showCellBorders: boolean
  showColumnBorders: boolean
  timeInterval: number
  selected: string[]
  columnOptions: IColumnOptions[]
  filterListOptions: IFilterListOptions[]
}

export interface IFilterTriggers {
  item: IFilterListOptions
  setFilterList: (data: IFilterListOptions[]) => void
  filterList: IFilterListOptions[]
}

export interface IFilterValue {
  item: IFilterListOptions
  onFilter: (data: string | Dayjs | boolean) => void
  disabled: boolean
  filterList: IFilterListOptions[]
}

export interface IFilter {
  handleCloseFilterPanel: () => void
}

export interface ICells {
  value: string
  type: string
  width: number
  minWidth: number
  labelId: string
  id: string
  row: INC
}

export interface IColumns {
  index: number
  cell: INC_HeadCell
}

export interface IOperator {
  id: number
  operator: IOperatorType
  operatorLabel: string
  needValue: boolean
  value: string
}

export type IOperatorType =
  | 'contains'
  | 'doesNotContain'
  | 'equals'
  | 'doesNotEqual'
  | 'startsWith'
  | 'endsWith'
  | 'isEmpty'
  | 'isNotEmpty'

export interface ModalImageProps {
  image?: string
  id: string
  incident: string
  inc?: INC
  options?: OptionsChangeINC
}

export interface OptionsChangeINC {
  contract: boolean
  object: boolean
  sla: boolean
  typeOfWork: boolean
  equipment: boolean
  model: boolean
  typicalMalfunction: boolean
  status?: string
  id_incStatus?: string
}

export interface ChooseModalProps {
  modalImage?: string
  handleModal: (state: boolean) => void
  title?: string
  id?: string
  incident?: string
  inc?: INC
  options?: OptionsChangeINC
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

export interface CloseINCProps {
  modalImage?: string
  handleModal: (data: DataCloseINC) => void
  title?: string
  data: Options
  incident: string
  id_incFiles: string
}

export interface DataCloseINC {
  state: boolean
  typeCompletedWork?: Options
  commentCloseCheck?: string
  files?: FileList[]
  spaceParts?: string[]
  act?: string[]
  data: Options
}

export interface Options {
  label: string
  id: string
  description?: string
  descriptionID?: string
}

export interface I_INCStatuses {
  statusINC: string
  id: string
  filterStatus: boolean
  idFilter: number
}

export interface I_INCClients {
  client: string
  id: string
  filterStatus: boolean
  idFilter: number
}

export interface I_INCContracts {
  contract: string
  id: string
  filterStatus: boolean
  idFilter: number
}

export interface IListFilter {
  label: string
  id: string
  filterStatus: boolean
  idFilter: number
}

export interface I_INCExecutor {
  shortName: string
  id: string
  filterStatus: boolean
  idFilter: number
}

export interface I_INCResponsible {
  shortName: string
  id: string
  filterStatus: boolean
  idFilter: number
}
export interface IListFilterComponent {
  setList: (data: IListFilter) => void
}

export enum methodsReuqest {
  manually = 'manually',
  email = 'email',
  web = 'web',
}

export enum overdueLabel {
  true = 'Просрочен',
  false = 'В срок',
}

export interface IStatus {
  value: string
  id: string
  incident: string
  responsible: string
  executor: string
  // currentStatus: string
  timeSLA: string
  // changeINC: ({ id, incident, incidents }: idINC) => void
}

export interface idINC {
  id: string
  incident: string
  incidents?: INC[]
}

export interface IModalStatus {
  status: boolean
  data: Options
  modalName?: string
  incident?: string
  id_incFiles?: string
}

export interface IExecutor {
  value: string
  id: string
  incident: string
  responsible: string
}

export interface IResponsible {
  value: string
  id: string
  incident: string
}

export interface IEditINC {
  row: INC
}

export interface ICellINC {
  label: string
  value: string | undefined
}

export interface ICellINCActs {
  label: string
  value: string | undefined
  files: FilesData[] | undefined
  idINC: string
}

export interface IDataINC {
  newINC: INC
}

export interface IEditDataINC {
  newINC: INC
  setNewINC: (data: INC) => void
}

export interface ITitleINC {
  newINC: INC
  handleModal: (data: boolean) => void
}

export interface IEditButtonsINC {
  inc: INC
  newINC: INC
  setNewINC: (data: INC) => void
  disabled: boolean
  handleModal: (data: boolean) => void
}
