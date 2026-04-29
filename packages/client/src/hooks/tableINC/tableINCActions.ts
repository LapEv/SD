import { INC_HeadCell, Settings } from 'pages/ControlRoom/Incidents/interfaces'
import {
  IColumnOptions,
  IColumnX,
  IFilterListOptions,
  IModalINC,
} from 'store/slices/tableINC/interfaces'

export interface TableINCActions {
  setSettings: (data: Settings) => void
  setOrder: (data: string) => void
  setOrderBy: (data: string) => void
  setPage: (data: number) => void
  setRowsPerPage: (data: number) => void
  setDense: (data: boolean) => void
  setColumnBorder: (data: boolean) => void
  setCellBorder: (data: boolean) => void
  setTimeInterval: (data: number) => void
  setSelected: (data: string[]) => void
  setColumnOptions: (data: IColumnOptions[]) => void
  setColumnX: (data: IColumnX) => void
  setActiveDragCell: (data: INC_HeadCell | null) => void
  setFilterListOptions: (data: IFilterListOptions[] | null) => void
  setSearchValue: (data: string) => void
  setModal: (data: IModalINC) => void
}
