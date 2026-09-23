import { useMemo } from 'react'

export const useFilteredDataByArray = <T>(
  data: Array<T>,
  filterArray: string[],
  key: string,
): T[] => {
  const filtered = useMemo(() => {
    return filterArray && filterArray.length > 0
      ? data.filter((item: T) =>
          filterArray.includes(item[key as keyof typeof item] as string),
        )
      : data
  }, [data, filterArray])
  return filtered
}
