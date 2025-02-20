import { MUIDataTableOptions } from 'mui-datatables'
import { INC } from 'store/slices/incidents/interfaces'

export interface IDataTable {
  title: string
  data: INC[]
  columns: Column[]
  options: MUIDataTableOptions
}

interface Column {
  name: string
  label: string
  options: {
    filter: boolean
    sort: boolean
  }
}
