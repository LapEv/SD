import {
  INC_CellType,
  INC_Data,
  INC_HeadCell,
  INotificationINCData,
  IOperatorType,
} from 'pages/ControlRoom/Incidents/interfaces'
import { INC, INCStatuses, Order } from '../incidents/interfaces'

export interface TableINCState {
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
  columnX: IColumnX
  filterListOptions: IFilterListOptions[]
  searchValue: string
  activeDragCell: INC_HeadCell | null
  modal: IModalINC
  columnDataList: {
    incStatuses: INCStatuses[]
  }
  notificationsINC: INotificationINCData
  toCloud: boolean
}

export interface IDispatcherOptions {
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
  notificationsINC: INotificationINCData
}

export interface IColumnOptions {
  number: number
  id: string
  width: number
  disableColumn: boolean
  label: string
  type: INC_CellType
}

export interface IColumnX {
  position: number
  id: string
  width: number
}

export interface IFilterListOptions {
  id: number
  column: string
  columnLabel: string
  columnType: INC_CellType
  operator: IOperatorType
  logicOperator?: ILogicOperator | undefined
  logicOperatorLabel?: ILogicOperatorLabel | undefined
  operatorLabel: string
  needValue: boolean
  value: string | boolean | Date
}

export interface IModalINC {
  active: boolean
  image: string
  id?: string
  incident?: string
  inc?: INC
}

export interface ILogicOperatorModel {
  id: number
  logicOperator: 'and' | 'or'
  logicOperatorLabel: 'И' | 'ИЛИ'
}

export enum ILogicOperator {
  and = 'and',
  or = 'or',
}

export enum ILogicOperatorLabel {
  and = 'И',
  or = 'ИЛИ',
}
