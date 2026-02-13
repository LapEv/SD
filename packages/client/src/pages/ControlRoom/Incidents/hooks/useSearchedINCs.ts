import { useMemo } from 'react'
import { INC } from 'store/slices/incidents/interfaces'

export const useSearchedINCs = (data: INC[], searchText: string | null) => {
  const filtered = useMemo(() => {
    return searchText
      ? data.filter(
          ({
            address,
            client,
            object,
            incident,
            contract,
            executor,
            responsible,
            status,
          }) =>
            checkNullIncludes(address, searchText) ||
            checkNullIncludes(client, searchText) ||
            checkNullIncludes(object, searchText) ||
            checkNullIncludes(contract, searchText) ||
            checkNullIncludes(executor, searchText) ||
            checkNullIncludes(responsible, searchText) ||
            checkNullIncludes(status, searchText) ||
            checkNullIncludes(incident, searchText),
        )
      : data
  }, [data, searchText])
  return filtered
}

export const checkNullIncludes = (data: string, searchText: string | null) => {
  if (!data) return false
  if (!searchText) return false
  return data.includes(searchText)
}
