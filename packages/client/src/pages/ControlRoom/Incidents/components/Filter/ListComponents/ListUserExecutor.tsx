import { DropDownINCFilter } from 'components/DropDown'
import { empty_INClist } from 'pages/ControlRoom/Incidents/data'
import { IListFilter } from 'pages/ControlRoom/Incidents/interfaces'
import { memo, useEffect, useState } from 'react'
import { IListFilterComponents } from './interfaces'
import { useAuth } from 'hooks/auth/useAuth'
import { useIncidents } from 'hooks/incidents/useINC'

export const ListUserExecutor = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    const [{ fieldEngineers, dispatchers }] = useAuth()
    const [{ incidents }] = useIncidents()
    const [list, setList] = useState<IListFilter[]>(empty_INClist)

    useEffect(() => {
      const userExecutor = incidents
        .map(({ UserExecutor }) => {
          return {
            id: UserExecutor?.id,
            shortName: UserExecutor?.shortName,
          }
        })
        .filter(({ id }) => id)
      const _list = [...fieldEngineers, ...dispatchers, ...userExecutor]
      setList(
        _list
          .map(({ shortName, id }) => {
            const isFiltered = filterList.find(
              ({ column, value }) => column === 'client' && value === shortName,
            )
            return {
              label: shortName as string,
              id: id as string,
              filterStatus: isFiltered ? true : false,
              idFilter: isFiltered ? isFiltered.id : 0,
            }
          })
          .filter(
            (obj, index, arr) => index === arr.findIndex(o => o.id === obj.id),
          )
          .sort((arr1, arr2) => (arr1['label'] > arr2['label'] ? 1 : -1)),
      )
    }, [fieldEngineers, dispatchers, filterList])

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
