import { DropDownINCFilter } from 'components/DropDown'
import { empty_INClist } from 'pages/ControlRoom/Incidents/data'
import {
  IListFilter,
  methodsReuqest,
} from 'pages/ControlRoom/Incidents/interfaces'
import { memo, useEffect, useState } from 'react'
import { IListFilterComponents } from './interfaces'

export const ListMethodRequest = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    const [list, setList] = useState<IListFilter[]>(empty_INClist)

    useEffect(() => {
      setList(
        (Object.keys(methodsReuqest) as Array<keyof typeof methodsReuqest>)
          .map((key, index) => {
            const isFiltered = filterList.find(
              ({ column, value }) => column === 'client' && value === key,
            )
            return {
              label: key,
              id: `${index}`,
              filterStatus: isFiltered ? true : false,
              idFilter: isFiltered ? isFiltered.id : 0,
            }
          })
          .filter(
            (obj, index, arr) => index === arr.findIndex(o => o.id === obj.id),
          )
          .sort((arr1, arr2) => (arr1['label'] > arr2['label'] ? 1 : -1)),
      )
    }, [filterList])

    return (
      <DropDownINCFilter
        data={list.map(({ label, id }) => {
          return {
            ['label']: label,
            ['id']: id,
          }
        })}
        onChange={({ label }) => onFilter(label)}
        value={(item.value as string) ?? ''}
        label="Значение"
        disableClearable={false}
        disabled={disabled}
      />
    )
  },
)
