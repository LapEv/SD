import { IFilterListOptions } from 'store/slices/tableINC/interfaces'

export interface IListFilterComponents {
  item: IFilterListOptions
  filterList: IFilterListOptions[]
  onFilter: (data: string) => void
  disabled?: boolean
}
