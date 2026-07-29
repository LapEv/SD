import { DropDownINCFilter, DropDownINCFilterMobile } from 'components/DropDown'
import { empty_INClist } from 'pages/ControlRoom/Incidents/data'
import { IListFilter } from 'pages/ControlRoom/Incidents/interfaces'
import { memo, useEffect, useState } from 'react'
import { IListFilterComponents } from './interfaces'
import { useContracts } from 'hooks/contracts/useContracts'
import { useApp } from 'hooks/app/useApp'

export const ListContract = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    const [{ contracts }, { getContracts }] = useContracts()
    const [{ device }] = useApp()
    const [list, setList] = useState<IListFilter[]>(empty_INClist)

    useEffect(() => {
      setList(
        contracts
          .map(({ contract, id }) => {
            const isFiltered = filterList.find(
              ({ column, value }) => column === 'client' && value === contract,
            )
            return {
              label: contract,
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
    }, [contracts, filterList])

    useEffect(() => {
      if (!contracts.length) {
        getContracts()
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
