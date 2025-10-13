import { useMemo } from 'react'

export const useFilteredData = <T>(
  data: Array<T>,
  filterText: string,
  keys: string[],
): T[] => {
  const filtered = useMemo(() => {
    return filterText
      ? data.filter(
          (item: T) =>
            (keys as Array<keyof T>).findIndex(key =>
              (item[key] as string)
                .toLowerCase()
                .includes(filterText.toLowerCase()),
            ) > -1,
        )
      : data
  }, [data, filterText])
  return filtered
}
