import { FilterOptionsState } from '@mui/material'
import { Options } from './interface'

export const FilterOptions = (
  option: unknown[],
  { inputValue }: FilterOptionsState<unknown>,
): unknown[] => {
  if (inputValue === '') return option
  const value = inputValue.toLowerCase().trim()
  const displayOptions = option.filter((item): unknown => {
    if ((item as Options).label.toLowerCase().trim().includes(value)) {
      return item
    }
    if (
      (item as Options)?.description &&
      (item as Options)?.description?.length &&
      (item as Options)?.description?.toLowerCase().trim().includes(value)
    ) {
      return item
    }
    if (
      (item as Options)?.descriptionID &&
      (item as Options)?.descriptionID?.length &&
      (item as Options)?.descriptionID?.toLowerCase().trim().includes(value)
    ) {
      return item
    }
  })
  return displayOptions ?? []
}
