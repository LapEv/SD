import {
  MUIDataTableCustomHeadRenderer,
  MUIDataTableMeta,
} from 'mui-datatables'
import { INC } from 'store/slices/incidents/interfaces'

export type Order = 'asc' | 'desc'

export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof INC) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export interface EnhancedTableToolbarProps {
  numSelected: number
}

export interface INC_Column {
  name: string
  label: string
  index?: number
  options: {
    filter: boolean
    filterList?: string[]
    filterOptions?: {
      names: string[]
    }
    sort: boolean
    customBodyRender?: (value: string, { rowData }: MUIDataTableMeta) => void
    setCellHeaderProps?:
      | ((columnMeta: MUIDataTableCustomHeadRenderer) => object)
      | undefined
    display?: boolean
    viewColumns?: boolean
    draggable?: boolean
  }
}

export interface IIndicatorCell {
  timeSLA: string
  timeReg: string
  timeCloseCheck: string
  status?: string
  inc?: string
}

export interface AnswerIndicatorData {
  percent: number
  value: number
  indicator: string
}

export interface ICustomHeaderCell {
  label: string
}

export interface ITableMeta {
  rowData: string[]
}
