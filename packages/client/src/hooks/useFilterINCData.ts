import { operators } from 'pages/ControlRoom/Incidents/data'
import { useMemo } from 'react'
import { INC } from 'store/slices/incidents/interfaces'
import {
  IFilterListOptions,
  ILogicOperator,
} from 'store/slices/tableINC/interfaces'

export const useFilterINCData = (
  dataINCs: INC[],
  filterListOptions: IFilterListOptions[],
  searchValue: string,
): INC[] => {
  const filtered = useMemo(() => {
    const checkFilter = filterListOptions.filter(item => {
      if (item.operator === operators[6].operator) {
        return item
      }
      if (item.operator === operators[7].operator) {
        return item
      }
      if (
        item.operator !== operators[6].operator &&
        item.operator !== operators[7].operator &&
        item.value !== ''
      ) {
        return item
      }
    })
    if (!checkFilter.length) return dataINCs

    const _filtered = checkFilter.reduce((acc, filter) => {
      const INCfiltered =
        filter.logicOperator === ILogicOperator.and ||
        !filter.logicOperator ||
        checkFilter.length === 1
          ? checkData(acc, filter)
          : checkData(dataINCs, filter, acc)

      return INCfiltered ?? dataINCs
    }, dataINCs)
    return _filtered
  }, [dataINCs, filterListOptions])
  const searched = searchValue ? getSearched(searchValue, filtered) : filtered
  return searched
}

const checkData = (incs: INC[], filter: IFilterListOptions, acc?: INC[]) => {
  switch (filter.operator) {
    case 'contains':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        if (typeof item[filter.column as keyof INC] === 'number') {
          return item[filter.column as keyof INC]
            ?.toString()
            .toLocaleLowerCase()
            .includes((filter.value as string).trim().toLocaleLowerCase())
        }
        if (typeof item[filter.column as keyof INC] === 'string') {
          return (item[filter.column as keyof INC] as string)
            ?.toLocaleLowerCase()
            .includes((filter.value as string).trim().toLocaleLowerCase())
        }
        return incs
      })
    case 'doesNotContain':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        if (typeof item[filter.column as keyof INC] === 'number') {
          return !item[filter.column as keyof INC]
            ?.toString()
            .toLocaleLowerCase()
            .includes((filter.value as string).trim().toLocaleLowerCase())
        }
        if (typeof item[filter.column as keyof INC] === 'string') {
          return !(item[filter.column as keyof INC] as string)
            ?.toLocaleLowerCase()
            .includes((filter.value as string).trim().toLocaleLowerCase())
        }
        return incs
      })
    case 'equals':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        if (typeof item[filter.column as keyof INC] === 'boolean') {
          return item[filter.column as keyof INC] === filter.value
        }
        if (item[filter.column as keyof INC]) {
          return (
            (item[filter.column as keyof INC] as string).trim() ===
            (filter.value as string).trim()
          )
        }
      })
    case 'doesNotEqual':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        if (typeof item[filter.column as keyof INC] === 'boolean') {
          return item[filter.column as keyof INC] === filter.value
        }
        if (item[filter.column as keyof INC]) {
          return (
            (item[filter.column as keyof INC] as string).trim() !==
            (filter.value as string).trim()
          )
        }
      })
    case 'startsWith':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        const _item = item[filter.column as keyof INC] as string
        const _value = filter.value as string
        if (
          Date.parse(_item) &&
          Date.parse(_value) &&
          Date.parse(_item) < 2524597200000 &&
          Date.parse(_item) > 315522000000
        ) {
          const tz = new Date(_item).getTimezoneOffset() * 60 * 1000
          return Date.parse(_item) + tz > Date.parse(_value)
        }
        if (typeof _item === 'string') {
          return (
            _item.slice(0, _value.toString().length).trim() === _value.trim()
          )
        }
        if (typeof item[filter.column as keyof INC] === 'number') {
          const _item = item[filter.column as keyof INC] as number
          return (
            _item?.toString().slice(0, _value.toString().length).trim() ===
            _value.trim()
          )
        }
      })
    case 'endsWith':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        const _item = item[filter.column as keyof INC] as string
        const _value = filter.value as string
        if (
          Date.parse(_item) &&
          Date.parse(_value) &&
          Date.parse(_item) < 2524597200000 &&
          Date.parse(_item) > 315522000000
        ) {
          const tz = new Date(_item).getTimezoneOffset() * 60 * 1000
          return Date.parse(_item) + tz < Date.parse(_value)
        }
        if (typeof _item === 'string') {
          const itemLength = _item.length
          const valueLength = _value.toString().length
          return (
            _item.slice(itemLength - 1 - valueLength).trim() === _value.trim()
          )
        }
        if (typeof item[filter.column as keyof INC] === 'number') {
          const _item = (item[filter.column as keyof INC] as number).toString()
          const itemLength = _item.length
          const valueLength = _value.toString().length
          return (
            _item.slice(itemLength - valueLength, valueLength).trim() ===
            _value.trim()
          )
        }
        return incs
      })
    case 'isEmpty':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        return !item[filter.column as keyof INC]
      })
    case 'isNotEmpty':
      return incs.filter(item => {
        const isEqual = acc?.find(({ id }) => id === item.id)
        if (isEqual) return item
        return item[filter.column as keyof INC]
      })
  }
}

const getSearched = (searchValue: string, filtered: INC[]) => {
  return filtered.filter(item => {
    const incsJSON = JSON.stringify(item)
      .replace(/("\w+":)/g, '')
      .toLowerCase()
    if (incsJSON.includes(searchValue)) {
      return item
    }
  })
}
