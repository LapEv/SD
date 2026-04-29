import { DropDownINCFilter } from 'components/DropDown'
import { useIncidents } from 'hooks/incidents/useINC'
import { empty_INClist } from 'pages/ControlRoom/Incidents/data'
import { IListFilter } from 'pages/ControlRoom/Incidents/interfaces'
import { memo, useEffect, useState } from 'react'
import { IListFilterComponents } from './interfaces'

export const ListTypesOfWork = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
    const [list, setList] = useState<IListFilter[]>(empty_INClist)

    useEffect(() => {
      setList(
        typesOfWork.map(({ typeOfWork, id }) => {
          const isFiltered = filterList.find(
            ({ column, value }) => column === 'status' && value === typeOfWork,
          )
          return {
            label: typeOfWork,
            id,
            filterStatus: isFiltered ? true : false,
            idFilter: isFiltered ? isFiltered.id : 0,
          }
        }),
      )
    }, [typesOfWork, filterList])

    useEffect(() => {
      if (!typesOfWork.length) {
        getTypesOfWork()
      }
    }, [])

    return (
      <DropDownINCFilter
        data={list.map(({ label, id }) => {
          return {
            ['label']: label as string,
            ['id']: id as string,
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
