import { DropDownINCFilter, DropDownINCFilterMobile } from 'components/DropDown'
import { empty_INClist } from 'pages/ControlRoom/Incidents/data'
import { IListFilter } from 'pages/ControlRoom/Incidents/interfaces'
import { memo, useEffect, useState } from 'react'
import { IListFilterComponents } from './interfaces'
import { useClients } from 'hooks/clients/useClients'
import { useApp } from 'hooks/app/useApp'

export const ListClientLegalName = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    const [{ clients }, { getClients }] = useClients()
    const [{ device }] = useApp()
    const [list, setList] = useState<IListFilter[]>(empty_INClist)

    useEffect(() => {
      setList(
        clients
          .map(({ legalName, id }) => {
            const isFiltered = filterList.find(
              ({ column, value }) => column === 'client' && value === legalName,
            )
            return {
              label: legalName,
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
    }, [clients, filterList])

    useEffect(() => {
      if (!clients.length) {
        getClients()
      }
    }, [])

    if (device === 'mobile') {
      return (
        <DropDownINCFilterMobile
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
    }

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
