import { getComparator, Order } from 'utils/getComparator'
import { useMemo } from 'react'

export const useFilteredSortedDataByArray = <T>(
  data: Array<T>,
  filterArray: string[],
  key: string,
  orderBy: string,
  order: Order,
): T[] => {
  const filtered = useMemo(() => {
    return filterArray && filterArray.length > 0
      ? data
          .filter((item: T) =>
            filterArray.includes(item[key as keyof typeof item] as string),
          )
          .sort(
            getComparator(order, orderBy) as
              | ((a: T, b: T) => number)
              | undefined,
          )
      : data.sort(
          getComparator(order, orderBy) as ((a: T, b: T) => number) | undefined,
        )
  }, [data, filterArray, orderBy, order])
  return filtered
}
