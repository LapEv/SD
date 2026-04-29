import { IColumnOptions } from 'store/slices/tableINC/interfaces'

export const GetActiveColumnOptions = (columnOptions: IColumnOptions[]) => {
  return columnOptions.filter(({ disableColumn }) => !disableColumn)
}
