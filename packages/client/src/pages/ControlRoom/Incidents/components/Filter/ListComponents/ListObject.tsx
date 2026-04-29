import { DropDownINCFilter } from 'components/DropDown'
import { empty_INClist } from 'pages/ControlRoom/Incidents/data'
import { IListFilter } from 'pages/ControlRoom/Incidents/interfaces'
import { memo, useEffect, useState } from 'react'
import { IListFilterComponents } from './interfaces'
import { useObjects } from 'hooks/objects/useObjects'

export const ListObject = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    const [{ objects }, { getObjects }] = useObjects()
    const [list, setList] = useState<IListFilter[]>(empty_INClist)

    useEffect(() => {
      setList(
        objects
          .map(({ object, id }) => {
            const isFiltered = filterList.find(
              ({ column, value }) => column === 'client' && value === object,
            )
            return {
              label: object,
              id: id as string,
              filterStatus: isFiltered ? true : false,
              idFilter: isFiltered ? isFiltered.id : 0,
            }
          })
          .filter(
            (obj, index, arr) => index === arr.findIndex(o => o.id === obj.id),
          ),
      )
    }, [objects, filterList])

    useEffect(() => {
      if (!objects.length) {
        getObjects()
      }
    }, [])

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
